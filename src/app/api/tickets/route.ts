import { sendFonnteTicketNotification } from "@/lib/infrastructure/fonnte";
import { getActiveSessionUser } from "@/lib/security/session";
import { createStoredTicket, listTickets } from "@/lib/infrastructure/sheet-store";
import { requestSchema } from "@/lib/domain/tickets";

export const runtime = "nodejs";

export async function GET() {
  if (!(await getActiveSessionUser())) return Response.json({ message: "Silakan login sebagai engineer." }, { status: 401 });
  try {
    return Response.json({ tickets: await listTickets() });
  } catch {
    return Response.json({ message: "Tiket belum dapat dimuat." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => undefined));
  if (!parsed.success) return Response.json({ message: "Data request belum lengkap atau tidak valid." }, { status: 400 });

  try {
    const ticket = await createStoredTicket(parsed.data);
    await sendFonnteTicketNotification(ticket);
    return Response.json({ ticket }, { status: 201 });
  } catch {
    return Response.json({ message: "Request belum dapat disimpan. Silakan coba lagi." }, { status: 503 });
  }
}
