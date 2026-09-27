import { getRequesterName, getTicketTitle, REQUEST_TYPE_LABELS, type Ticket } from "../domain/tickets";

const FONNTE_SEND_URL = "https://api.fonnte.com/send";

export function formatFonnteTicketMessage(ticket: Ticket) {
  const priorityLabel = ticket.type === "bug" ? "Dampak pekerjaan" : "Urgensi";
  const priorityValue = ticket.type === "bug" ? ticket.workImpact : ticket.urgency;

  return [
    "Request internal baru masuk",
    `Tiket: ${ticket.id}`,
    `Jenis: ${REQUEST_TYPE_LABELS[ticket.type]}`,
    `Judul: ${getTicketTitle(ticket)}`,
    `Requester: ${getRequesterName(ticket)} (${ticket.division})`,
    `${priorityLabel}: ${priorityValue}`,
  ].join("\n");
}

export async function sendFonnteTicketNotification(ticket: Ticket) {
  const token = process.env.FONNTE_TOKEN;
  const target = process.env.FONNTE_TARGET;
  if (!token || !target) return { delivered: false, skipped: true };

  const body = new URLSearchParams({ target, message: formatFonnteTicketMessage(ticket), countryCode: "62" });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(FONNTE_SEND_URL, {
      method: "POST",
      headers: { Authorization: token },
      body,
      redirect: "error",
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => undefined) as { status?: boolean } | undefined;
    return { delivered: response.ok && payload?.status !== false, skipped: false };
  } catch {
    return { delivered: false, skipped: false };
  } finally {
    clearTimeout(timeout);
  }
}
