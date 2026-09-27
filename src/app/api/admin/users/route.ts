import { getActiveSessionUser } from "@/lib/security/session";
import { createEngineerUser, listEngineerUsers } from "@/lib/infrastructure/sheet-store";

export const runtime = "nodejs";

export async function GET() {
  if ((await getActiveSessionUser())?.role !== "admin") return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });
  try {
    return Response.json({ users: await listEngineerUsers() });
  } catch {
    return Response.json({ message: "User engineer belum dapat dimuat." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if ((await getActiveSessionUser())?.role !== "admin") return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });
  try {
    return Response.json({ user: await createEngineerUser(await request.json()) }, { status: 201 });
  } catch {
    return Response.json({ message: "User engineer belum dapat ditambahkan." }, { status: 400 });
  }
}
