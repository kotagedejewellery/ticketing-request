import { getActiveSessionUser } from "@/lib/security/session";
import { updateEngineerUser } from "@/lib/infrastructure/sheet-store";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ userId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if ((await getActiveSessionUser())?.role !== "admin") return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });

  try {
    const { userId } = await context.params;
    return Response.json({ user: await updateEngineerUser(userId, await request.json()) });
  } catch {
    return Response.json({ message: "User engineer belum dapat diperbarui." }, { status: 400 });
  }
}
