import { loginInputSchema, sanitizeUser, verifyPassword } from "@/lib/domain/auth";
import { canAttemptLogin, recordFailedLogin, resetLoginAttempts } from "@/lib/security/login-rate-limit";
import { setSessionUser } from "@/lib/security/session";
import { findEngineerUser } from "@/lib/infrastructure/sheet-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const clientKey = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!canAttemptLogin(clientKey)) return Response.json({ message: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit." }, { status: 429 });

  const parsed = loginInputSchema.safeParse(await request.json().catch(() => undefined));
  if (!parsed.success) return Response.json({ message: "Username dan password tidak valid." }, { status: 400 });

  try {
    const user = await findEngineerUser(parsed.data.username);
    if (!user || !user.active || !verifyPassword(parsed.data.password, user.passwordHash)) {
      recordFailedLogin(clientKey);
      return Response.json({ message: "Username atau password salah." }, { status: 401 });
    }

    resetLoginAttempts(clientKey);
    await setSessionUser(user);
    return Response.json({ user: sanitizeUser(user) });
  } catch {
    return Response.json({ message: "Login belum dapat diproses. Periksa konfigurasi internal." }, { status: 503 });
  }
}
