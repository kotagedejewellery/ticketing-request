import { getActiveSessionUser } from "@/lib/security/session";

export async function GET() {
  try {
    const user = await getActiveSessionUser();
    return Response.json({ user: user ?? null });
  } catch {
    return Response.json({ user: null });
  }
}
