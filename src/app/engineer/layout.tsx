import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { EngineerWorkspace } from "@/components/admin/engineer-workspace";
import { getActiveSessionUser } from "@/lib/security/session";

export default async function EngineerLayout({ children }: { children: ReactNode }) {
  const user = await getActiveSessionUser();
  if (!user) redirect("/login");
  return <EngineerWorkspace user={user}>{children}</EngineerWorkspace>;
}
