import { clearSessionUser } from "@/lib/security/session";

export async function POST() {
  await clearSessionUser();
  return new Response(null, { status: 204 });
}
