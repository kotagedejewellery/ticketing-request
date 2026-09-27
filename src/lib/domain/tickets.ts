import { z } from "zod";


const requiredText = (message: string) => z.string().trim().min(1, message);
const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().min(1).optional(),
);
const optionalHttpUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.url("Masukkan tautan yang valid.")
    .refine((value) => getSafeExternalUrl(value) !== undefined, "Gunakan tautan http atau https.")
    .optional(),
);

export const URGENCY_LEVELS = ["Rendah", "Sedang", "Tinggi", "Mendesak"] as const;
export const WORK_IMPACTS = [
  "Tidak",
  "Sebagian terganggu",
  "Tidak bisa bekerja sama sekali",
] as const;
export const TICKET_STATUSES = [
  "Baru",
  "Ditinjau",
  "Menunggu Informasi",
  "Dijadwalkan",
  "Dikerjakan",
  "Selesai",
  "Ditolak / Dibatalkan",
] as const;

export const newSystemRequestSchema = z.object({
  type: z.literal("new-system"),
  requesterName: requiredText("Masukkan nama Anda."),
  division: requiredText("Masukkan divisi Anda."),
  needName: requiredText("Tuliskan nama kebutuhan sistem."),
  currentProblem: requiredText("Ceritakan masalah yang sedang terjadi."),
  expectedOutcome: requiredText("Ceritakan hasil yang Anda harapkan."),
  users: requiredText("Jelaskan siapa yang akan menggunakan sistem."),
  urgency: z.enum(URGENCY_LEVELS, { message: "Pilih tingkat urgensi." }),
  deadline: optionalText,
  attachmentUrl: optionalHttpUrl,
});

export const enhancementRequestSchema = z.object({
  type: z.literal("enhancement"),
  requesterName: requiredText("Masukkan nama Anda."),
  division: requiredText("Masukkan divisi Anda."),
  systemName: requiredText("Pilih atau tuliskan sistem yang ingin dikembangkan."),
  requestedChange: requiredText("Jelaskan perubahan yang Anda inginkan."),
  reason: requiredText("Jelaskan alasan perubahan."),
  urgency: z.enum(URGENCY_LEVELS, { message: "Pilih tingkat urgensi." }),
  attachmentUrl: optionalHttpUrl,
});

export const bugRequestSchema = z.object({
  type: z.literal("bug"),
  reporterName: requiredText("Masukkan nama pelapor."),
  division: requiredText("Masukkan divisi Anda."),
  affectedSystem: requiredText("Masukkan sistem yang bermasalah."),
  incident: requiredText("Ceritakan apa yang terjadi."),
  since: requiredText("Jelaskan sejak kapan masalah terjadi."),
  workImpact: z.enum(WORK_IMPACTS, { message: "Pilih dampak terhadap pekerjaan." }),
  attachmentUrl: optionalHttpUrl,
  additionalNotes: optionalText,
});

export const requestSchema = z.discriminatedUnion("type", [
  newSystemRequestSchema,
  enhancementRequestSchema,
  bugRequestSchema,
]);

export type RequestInput = z.infer<typeof requestSchema>;
export type TicketStatus = (typeof TICKET_STATUSES)[number];
export const trackingTokenSchema = z.string().min(24).max(128);
const ticketMetadataSchema = z.object({
  id: z.string().min(1),
  trackingToken: trackingTokenSchema.optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  status: z.enum(TICKET_STATUSES),
  publicProgress: requiredText("Progres requester wajib diisi."),
  technicalClassification: optionalText,
});

export const ticketRecordSchema = z.discriminatedUnion("type", [
  newSystemRequestSchema.extend(ticketMetadataSchema.shape),
  enhancementRequestSchema.extend(ticketMetadataSchema.shape),
  bugRequestSchema.extend(ticketMetadataSchema.shape),
]);

export type Ticket = z.infer<typeof ticketRecordSchema>;
export type PublicTicket = Pick<Ticket, "id" | "type" | "status" | "publicProgress" | "updatedAt"> & { title: string };

export const ticketChangesSchema = z.object({
  status: z.enum(TICKET_STATUSES),
  publicProgress: requiredText("Progres requester wajib diisi."),
  technicalClassification: optionalText,
});

export type TicketChanges = z.infer<typeof ticketChangesSchema>;

export const REQUEST_TYPE_LABELS = {
  "new-system": "Sistem Baru",
  enhancement: "Pengembangan",
  bug: "Error / Bug",
} as const;

export function createTicket(
  request: RequestInput,
  now = new Date(),
  sequence = 1,
): Ticket {
  const id = formatTicketId(now, sequence);
  const createdAt = now.toISOString();

  return {
    ...request,
    id,
    createdAt,
    updatedAt: createdAt,
    status: "Baru",
    publicProgress: "Tiket Anda telah diterima dan akan segera ditinjau oleh tim engineer.",
  };
}

export function formatTicketId(date: Date, sequence: number) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const serial = String(sequence).padStart(3, "0");

  return `IRH-${year}${month}${day}-${serial}`;
}

export function getTicketTitle(ticket: Ticket) {
  if (ticket.type === "new-system") return ticket.needName;
  if (ticket.type === "enhancement") return ticket.systemName;
  return ticket.affectedSystem;
}

export function getRequesterName(ticket: Ticket) {
  return ticket.type === "bug" ? ticket.reporterName : ticket.requesterName;
}

export function getTicketSummary(ticket: Ticket) {
  if (ticket.type === "new-system") return ticket.currentProblem;
  if (ticket.type === "enhancement") return ticket.requestedChange;
  return ticket.incident;
}

export function getPublicTicket(ticket: Ticket): PublicTicket {
  return {
    id: ticket.id,
    type: ticket.type,
    title: getTicketTitle(ticket),
    status: ticket.status,
    publicProgress: ticket.publicProgress,
    updatedAt: ticket.updatedAt,
  };
}

export function getSafeExternalUrl(value?: string) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? value : undefined;
  } catch {
    return undefined;
  }
}

export function changeTicket(
  tickets: Ticket[],
  ticketId: string,
  changes: TicketChanges,
  updatedAt = new Date(),
) {
  return tickets.map((ticket) =>
    ticket.id === ticketId
      ? { ...ticket, ...changes, updatedAt: updatedAt.toISOString() }
      : ticket,
  );
}
