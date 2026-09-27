import { getActiveSessionUser } from "@/lib/security/session";
import { deleteEngineerUser, updateEngineerUser } from "@/lib/infrastructure/sheet-store";

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

export async function DELETE(_request: Request, context: RouteContext) {
  const currentUser = await getActiveSessionUser();
  if (currentUser?.role !== "admin") return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });

  try {
    const { userId } = await context.params;
    if (userId === currentUser.id) return Response.json({ message: "Akun yang sedang digunakan tidak dapat dihapus." }, { status: 400 });
    await deleteEngineerUser(userId);
    return Response.json({ deletedUserId: userId });
  } catch {
    return Response.json({ message: "User engineer belum dapat dihapus." }, { status: 400 });
  }
}
