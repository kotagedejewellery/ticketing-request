import { Badge } from "@/components/ui/badge";
import type { TicketStatus } from "@/lib/domain/tickets";

const statusClasses: Record<TicketStatus, string> = {
  Baru: "border-border bg-muted text-foreground",
  Ditinjau: "border-border bg-secondary text-secondary-foreground",
  "Menunggu Informasi": "border-warning/25 bg-warning/10 text-warning-foreground",
  Dijadwalkan: "border-border bg-secondary text-secondary-foreground",
  Dikerjakan: "bg-primary text-primary-foreground",
  Selesai: "border-success/25 bg-success/10 text-success-foreground",
  "Ditolak / Dibatalkan": "border-destructive/25 bg-destructive/10 text-destructive",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return <Badge variant="outline" className={statusClasses[status]}>{status}</Badge>;
}
