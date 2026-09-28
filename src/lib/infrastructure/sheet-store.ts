import { randomBytes } from "node:crypto";

import { google } from "googleapis";

import {
  getInitialAdminPassword,
  hashPassword,
  sanitizeUser,
  userInputSchema,
  userRecordSchema,
  userUpdateSchema,
  type EngineerUser,
  type PublicEngineerUser,
} from "../domain/auth";
import { createSystem, systemInputSchema, systemRecordSchema, type ManagedSystem } from "../domain/systems";
import { createTicketEvent, ticketEventSchema, type TicketEvent, type TicketEventActor } from "../domain/ticket-events";
import {
  changeTicket,
  createTicket,
  getRequesterName,
  getTicketTitle,
  ticketRecordSchema,
  type RequestInput,
  type Ticket,
  type TicketChanges,
} from "../domain/tickets";

const TICKET_HEADERS = [
  "id",
  "type",
  "title",
  "requesterName",
  "division",
  "systemName",
  "urgency",
  "status",
  "publicProgress",
  "technicalClassification",
  "trackingToken",
  "createdAt",
  "updatedAt",
  "payload",
] as const;

const LEGACY_TICKET_HEADERS = ["id", "payload"] as const;
const TICKET_EVENT_HEADERS = ["id", "ticketId", "createdAt", "actorId", "actorName", "previousStatus", "status", "publicProgress", "technicalClassification"] as const;

const TABS = {
  tickets: { title: "Tickets", headers: TICKET_HEADERS },
  ticketEvents: { title: "TicketEvents", headers: TICKET_EVENT_HEADERS },
  systems: { title: "Systems", headers: ["id", "name", "active", "createdAt", "updatedAt"] },
  users: { title: "EngineerUsers", headers: ["id", "username", "name", "role", "active", "passwordHash", "createdAt", "updatedAt"] },
} as const;

type SheetTab = (typeof TABS)[keyof typeof TABS];
type RowWithIndex<T> = { value: T; row: number };

function configuration() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!spreadsheetId || !email || !privateKey) {
    throw new Error("Penyimpanan spreadsheet belum dikonfigurasi.");
  }
  return { spreadsheetId, email, privateKey };
}

async function client() {
  const { email, privateKey } = configuration();
  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function ensureTab(tab: SheetTab) {
  const sheets = await client();
  const { spreadsheetId } = configuration();
  const metadata = await sheets.spreadsheets.get({ spreadsheetId, fields: "sheets.properties" });
  const exists = metadata.data.sheets?.some((sheet) => sheet.properties?.title === tab.title);
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: tab.title } } }] },
    });
  }

  const header = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${tab.title}!1:1` });
  const currentHeaders = header.data.values?.[0] ?? [];
  if (tab === TABS.tickets && currentHeaders.join("|") === LEGACY_TICKET_HEADERS.join("|")) {
    await migrateLegacyTicketRows(sheets, spreadsheetId);
  }
  if (currentHeaders.join("|") !== tab.headers.join("|")) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tab.title}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [[...tab.headers]] },
    });
  }
  return { sheets, spreadsheetId, wasCreated: !exists };
}

async function readRows(tab: SheetTab) {
  const { sheets, spreadsheetId, wasCreated } = await ensureTab(tab);
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${tab.title}!A2:Z` });
  return { rows: response.data.values ?? [], wasCreated };
}

async function appendRow(tab: SheetTab, row: string[]) {
  const { sheets, spreadsheetId } = await ensureTab(tab);
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab.title}!A:Z`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

async function overwriteRow(tab: SheetTab, row: number, values: string[]) {
  const { sheets, spreadsheetId } = await ensureTab(tab);
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${tab.title}!A${row}`,
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}

async function clearRow(tab: SheetTab, row: number) {
  const { sheets, spreadsheetId } = await ensureTab(tab);
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `${tab.title}!A${row}:Z${row}`,
  });
}

export async function listTickets() {
  const rows = await readTicketRows();
  return rows
    .map((row) => row.value)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function getTicket(ticketId: string) {
  const rows = await readTicketRows();
  return rows.find((row) => row.value.id === ticketId)?.value;
}

export async function getTicketByTrackingToken(trackingToken: string) {
  const rows = await readTicketRows();
  return rows.find((row) => row.value.trackingToken === trackingToken)?.value;
}

export async function createStoredTicket(request: RequestInput) {
  const tickets = await listTickets();
  const now = new Date();
  const datePrefix = now.toISOString().slice(0, 10).replaceAll("-", "");
  const sequence = tickets.filter((ticket) => ticket.id.startsWith(`IRH-${datePrefix}`)).length + 1;
  const ticket = ticketRecordSchema.parse({
    ...createTicket(request, now, sequence),
    trackingToken: randomBytes(24).toString("base64url"),
  });
  await appendRow(TABS.tickets, ticketToRow(ticket));
  await appendTicketEvent(createTicketEvent(
    ticket.id,
    { status: ticket.status, publicProgress: ticket.publicProgress, technicalClassification: ticket.technicalClassification },
    { actorId: "system", actorName: "Sistem" },
  ));
  return ticket;
}

export async function updateStoredTicket(ticketId: string, changes: TicketChanges, actor: TicketEventActor) {
  const stored = await readTicketRows();
  const current = stored.find((row) => row.value.id === ticketId);
  if (!current) throw new Error("Tiket tidak ditemukan.");

  const nextTicket = changeTicket([current.value], ticketId, changes)[0];
  const ticket = ticketRecordSchema.parse(nextTicket);
  await overwriteRow(TABS.tickets, current.row, ticketToRow(ticket));
  await appendTicketEvent(createTicketEvent(
    ticket.id,
    { status: ticket.status, publicProgress: ticket.publicProgress, technicalClassification: ticket.technicalClassification },
    actor,
    current.value.status,
  ));
  return ticket;
}

export async function listTicketEvents(ticketId: string) {
  const { rows } = await readRows(TABS.ticketEvents);
  return rows
    .map((row) => ticketEventSchema.safeParse({
      id: row[0], ticketId: row[1], createdAt: row[2], actorId: row[3], actorName: row[4], previousStatus: row[5], status: row[6], publicProgress: row[7], technicalClassification: row[8],
    }))
    .flatMap((result) => result.success && result.data.ticketId === ticketId ? [result.data] : [])
    .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
}

export async function listSystems(includeInactive = false) {
  const { rows, wasCreated } = await readSystemRows();
  if (!rows.length && wasCreated) {
    const defaults = ["CRM", "POS Outlet", "HRIS"];
    const now = new Date();
    const created = defaults.map((name, index) => createSystem({ name }, new Date(now.getTime() + index)));
    await Promise.all(created.map((system) => appendRow(TABS.systems, systemToRow(system))));
    return includeInactive ? created : created.filter((system) => system.active);
  }
  return rows.map((row) => row.value).filter((system) => includeInactive || system.active).sort((left, right) => left.name.localeCompare(right.name, "id"));
}

export async function createManagedSystem(input: unknown) {
  const system = createSystem(systemInputSchema.parse(input));
  await appendRow(TABS.systems, systemToRow(system));
  return system;
}

export async function updateManagedSystem(systemId: string, input: unknown) {
  const patch = systemInputSchema.partial().extend({ active: systemRecordSchema.shape.active.optional() }).refine((value) => Object.keys(value).length > 0, "Pilih perubahan sistem.").parse(input);
  const { rows } = await readSystemRows();
  const current = rows.find((row) => row.value.id === systemId);
  if (!current) throw new Error("Sistem tidak ditemukan.");

  const system = systemRecordSchema.parse({ ...current.value, ...patch, updatedAt: new Date().toISOString() });
  await overwriteRow(TABS.systems, current.row, systemToRow(system));
  return system;
}

export async function deleteManagedSystem(systemId: string) {
  const { rows } = await readSystemRows();
  const current = rows.find((row) => row.value.id === systemId);
  if (!current) throw new Error("Sistem tidak ditemukan.");

  await clearRow(TABS.systems, current.row);
}

export async function listEngineerUsers(): Promise<PublicEngineerUser[]> {
  const rows = await ensureInitialAdmin();
  return rows.map((row) => sanitizeUser(row.value)).sort((left, right) => left.name.localeCompare(right.name, "id"));
}

export async function findEngineerUser(username: string) {
  const rows = await ensureInitialAdmin();
  return rows.find((row) => row.value.username === username.toLowerCase())?.value;
}

export async function createEngineerUser(input: unknown) {
  const values = userInputSchema.parse(input);
  const users = await ensureInitialAdmin();
  if (users.some((user) => user.value.username === values.username)) throw new Error("Username sudah digunakan.");

  const now = new Date().toISOString();
  const user = userRecordSchema.parse({
    id: `USR-${Date.now()}`,
    username: values.username,
    name: values.name,
    role: values.role,
    active: true,
    passwordHash: hashPassword(values.password),
    createdAt: now,
    updatedAt: now,
  });
  await appendRow(TABS.users, userToRow(user));
  return sanitizeUser(user);
}

export async function updateEngineerUser(userId: string, input: unknown) {
  const patch = userUpdateSchema.parse(input);
  const users = await ensureInitialAdmin();
  const current = users.find((user) => user.value.id === userId);
  if (!current) throw new Error("User engineer tidak ditemukan.");

  const candidate = userRecordSchema.parse({
    ...current.value,
    ...patch,
    passwordHash: patch.password ? hashPassword(patch.password) : current.value.passwordHash,
    updatedAt: new Date().toISOString(),
  });
  const remainingActiveAdmins = users.filter((user) => {
    const value = user.value.id === userId ? candidate : user.value;
    return value.active && value.role === "admin";
  });
  if (!remainingActiveAdmins.length) throw new Error("Setidaknya satu admin aktif wajib tersedia.");

  await overwriteRow(TABS.users, current.row, userToRow(candidate));
  return sanitizeUser(candidate);
}

export async function deleteEngineerUser(userId: string) {
  const users = await ensureInitialAdmin();
  const current = users.find((user) => user.value.id === userId);
  if (!current) throw new Error("User engineer tidak ditemukan.");

  const remainingActiveAdmins = users.filter((user) => user.value.id !== userId && user.value.active && user.value.role === "admin");
  if (!remainingActiveAdmins.length) throw new Error("Setidaknya satu admin aktif wajib tersedia.");

  await clearRow(TABS.users, current.row);
}

async function readTicketRows(): Promise<RowWithIndex<Ticket>[]> {
  const { rows } = await readRows(TABS.tickets);
  return rows.flatMap((row, index) => {
    const result = ticketRecordSchema.safeParse(parseJson(row[TICKET_HEADERS.length - 1] ?? row[1]));
    return result.success ? [{ value: result.data, row: index + 2 }] : [];
  });
}

async function readSystemRows(): Promise<{ rows: RowWithIndex<ManagedSystem>[]; wasCreated: boolean }> {
  const { rows, wasCreated } = await readRows(TABS.systems);
  return { wasCreated, rows: rows.flatMap((row, index) => {
    const result = systemRecordSchema.safeParse({ id: row[0], name: row[1], active: row[2] === "true", createdAt: row[3], updatedAt: row[4] });
    return result.success ? [{ value: result.data, row: index + 2 }] : [];
  }) };
}

async function ensureInitialAdmin(): Promise<RowWithIndex<EngineerUser>[]> {
  const rows = await readUserRows();
  if (rows.length) return rows;

  const now = new Date().toISOString();
  const admin = userRecordSchema.parse({
    id: "USR-ADMIN",
    username: "admin",
    name: "Administrator Software Engineering",
    role: "admin",
    active: true,
    passwordHash: hashPassword(getInitialAdminPassword()),
    createdAt: now,
    updatedAt: now,
  });
  await appendRow(TABS.users, userToRow(admin));
  return [{ value: admin, row: 2 }];
}

async function readUserRows(): Promise<RowWithIndex<EngineerUser>[]> {
  const { rows } = await readRows(TABS.users);
  return rows.flatMap((row, index) => {
    const result = userRecordSchema.safeParse({
      id: row[0], username: row[1], name: row[2], role: row[3], active: row[4] === "true", passwordHash: row[5], createdAt: row[6], updatedAt: row[7],
    });
    return result.success ? [{ value: result.data, row: index + 2 }] : [];
  });
}

function systemToRow(system: ManagedSystem) {
  return [system.id, system.name, String(system.active), system.createdAt, system.updatedAt];
}

function userToRow(user: EngineerUser) {
  return [user.id, user.username, user.name, user.role, String(user.active), user.passwordHash, user.createdAt, user.updatedAt];
}

function ticketToRow(ticket: Ticket) {
  return [
    ticket.id,
    ticket.type,
    getTicketTitle(ticket),
    getRequesterName(ticket),
    ticket.division,
    getTicketSystemName(ticket),
    ticket.type === "bug" ? "" : ticket.urgency,
    ticket.status,
    ticket.publicProgress,
    ticket.technicalClassification ?? "",
    ticket.trackingToken ?? "",
    ticket.createdAt,
    ticket.updatedAt,
    JSON.stringify(ticket),
  ];
}

function ticketEventToRow(event: TicketEvent) {
  return [event.id, event.ticketId, event.createdAt, event.actorId, event.actorName, event.previousStatus ?? "", event.status, event.publicProgress, event.technicalClassification ?? ""];
}

async function appendTicketEvent(event: TicketEvent) {
  await appendRow(TABS.ticketEvents, ticketEventToRow(event));
}

function getTicketSystemName(ticket: Ticket) {
  if (ticket.type === "enhancement") return ticket.systemName;
  if (ticket.type === "bug") return ticket.affectedSystem;
  return "";
}

async function migrateLegacyTicketRows(
  sheets: Awaited<ReturnType<typeof client>>,
  spreadsheetId: string,
) {
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${TABS.tickets.title}!A2:B` });
  const legacyRows = response.data.values ?? [];
  if (!legacyRows.length) return;

  const rows = legacyRows.map((row) => {
    const ticket = ticketRecordSchema.safeParse(parseJson(row[1]));
    if (ticket.success) return ticketToRow(ticket.data);

    return [row[0] ?? "", ...Array(TICKET_HEADERS.length - 2).fill(""), row[1] ?? ""];
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${TABS.tickets.title}!A2`,
    valueInputOption: "RAW",
    requestBody: { values: rows },
  });
}

function parseJson(value: string | undefined) {
  try {
    return value ? JSON.parse(value) : undefined;
  } catch {
    return undefined;
  }
}
