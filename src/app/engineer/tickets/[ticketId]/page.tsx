import { TicketDetailWorkspace } from "@/components/admin/ticket-detail-workspace";

type PageProps = { params: Promise<{ ticketId: string }> };

export default async function TicketDetailPage({ params }: PageProps) {
  const { ticketId } = await params;
  return <TicketDetailWorkspace ticketId={ticketId} />;
}
