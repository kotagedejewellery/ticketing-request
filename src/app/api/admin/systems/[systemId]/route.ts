import { getActiveSessionUser } from "@/lib/security/session";
import { updateManagedSystem } from "@/lib/infrastructure/sheet-store";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ systemId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if ((await getActiveSessionUser())?.role !== "admin") return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });
  try {
    const { systemId } = await context.params;
    return Response.json({ system: await updateManagedSystem(systemId, await request.json()) });
  } catch {
    return Response.json({ message: "Sistem belum dapat diperbarui." }, { status: 400 });
  }
}
