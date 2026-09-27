import { getActiveSessionUser } from "@/lib/security/session";
import { createManagedSystem, listSystems } from "@/lib/infrastructure/sheet-store";

export const runtime = "nodejs";

function isAdmin(user: Awaited<ReturnType<typeof getActiveSessionUser>>) {
  return user?.role === "admin";
}

export async function GET() {
  if (!isAdmin(await getActiveSessionUser())) return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });
  try {
    return Response.json({ systems: await listSystems(true) });
  } catch {
    return Response.json({ message: "Daftar sistem belum dapat dimuat." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isAdmin(await getActiveSessionUser())) return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });
  try {
    return Response.json({ system: await createManagedSystem(await request.json()) }, { status: 201 });
  } catch {
    return Response.json({ message: "Sistem belum dapat ditambahkan." }, { status: 400 });
  }
}
