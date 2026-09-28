import { getPublicTicket, trackingTokenSchema } from "@/lib/domain/tickets";
import { getPublicTicketEvent } from "@/lib/domain/ticket-events";
import { getTicketByTrackingToken, listTicketEvents } from "@/lib/infrastructure/sheet-store";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ trackingToken: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { trackingToken } = await context.params;
  if (!trackingTokenSchema.safeParse(trackingToken).success) {
    return Response.json({ message: "Tautan pelacakan tidak valid." }, { status: 404 });
  }

  try {
    const ticket = await getTicketByTrackingToken(trackingToken);
    if (!ticket) return Response.json({ message: "Tiket tidak ditemukan atau tautan sudah tidak berlaku." }, { status: 404 });
    return Response.json({ ticket: getPublicTicket(ticket), history: (await listTicketEvents(ticket.id)).map(getPublicTicketEvent) });
  } catch {
    return Response.json({ message: "Tiket belum dapat dimuat. Silakan coba lagi." }, { status: 503 });
  }
}
