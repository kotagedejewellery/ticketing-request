import { redirect } from "next/navigation";

import { EngineerWorkspace } from "@/components/admin/engineer-workspace";
import { getActiveSessionUser } from "@/lib/security/session";

export default async function EngineerPage() {
  const user = await getActiveSessionUser();
  if (!user) redirect("/login");
  return <EngineerWorkspace user={user} />;
}
