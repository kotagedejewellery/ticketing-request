import { redirect } from "next/navigation";

import { AdminManagement } from "@/components/admin/admin-management";
import { getActiveSessionUser } from "@/lib/security/session";

export default async function UsersPage() {
  const user = await getActiveSessionUser();
  if (!user || user.role !== "admin") redirect("/engineer");
  return <AdminManagement user={user} section="users" />;
}
