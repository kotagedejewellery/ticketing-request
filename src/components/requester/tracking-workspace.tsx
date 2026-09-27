import { RequesterShell } from "@/components/requester/requester-shell";
import { TrackingPanel } from "@/components/requester/tracking-panel";

export function TrackingWorkspace({ trackingToken }: { trackingToken: string }) {
  return <RequesterShell><TrackingPanel trackingToken={trackingToken} /></RequesterShell>;
}
