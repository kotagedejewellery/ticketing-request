import { listSystems } from "@/lib/infrastructure/sheet-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json({ systems: await listSystems() });
  } catch {
    return Response.json({ message: "Daftar sistem belum dapat dimuat." }, { status: 503 });
  }
}
