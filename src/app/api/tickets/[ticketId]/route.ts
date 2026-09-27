import { getActiveSessionUser } from "@/lib/security/session";
import { updateStoredTicket } from "@/lib/infrastructure/sheet-store";
import { ticketChangesSchema } from "@/lib/domain/tickets";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ ticketId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await getActiveSessionUser())) return Response.json({ message: "Silakan login sebagai engineer." }, { status: 401 });
  const parsed = ticketChangesSchema.safeParse(await request.json().catch(() => undefined));
  if (!parsed.success) return Response.json({ message: "Pembaruan tiket tidak valid." }, { status: 400 });

  try {
    const { ticketId } = await context.params;
    return Response.json({ ticket: await updateStoredTicket(ticketId, parsed.data) });
  } catch {
    return Response.json({ message: "Tiket belum dapat diperbarui." }, { status: 503 });
  }
}
