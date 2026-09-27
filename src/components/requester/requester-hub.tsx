import { RequestWorkspace } from "@/components/requester/request-workspace";
import { RequesterShell } from "@/components/requester/requester-shell";

export function RequesterHub() {
  return <RequesterShell><RequestWorkspace /></RequesterShell>;
}
