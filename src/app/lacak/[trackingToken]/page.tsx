import { TrackingWorkspace } from "@/components/requester/tracking-workspace";

export default async function TrackingPage({ params }: { params: Promise<{ trackingToken: string }> }) {
  const { trackingToken } = await params;
  return <TrackingWorkspace trackingToken={trackingToken} />;
}
