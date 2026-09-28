import { Clock3Icon } from "lucide-react";

import { TicketStatusBadge } from "@/components/shared/ticket-status-badge";
import type { TicketEvent, PublicTicketEvent } from "@/lib/domain/ticket-events";

type TimelineEvent = PublicTicketEvent | TicketEvent;

export function TicketTimeline({ events, createdAt, internal = false }: { events: TimelineEvent[]; createdAt: string; internal?: boolean }) {
  const hasInitialEvent = events.some((event) => "initial" in event ? event.initial : "actorId" in event && event.actorId === "system" && !event.previousStatus);

  return <ol className="mt-5 grid gap-0 border-l document-rule">
    {!hasInitialEvent ? <li className="relative pl-5 pb-7"><TimelineMarker /><p className="font-medium">Tiket dibuat</p><p className="mt-1 text-sm text-muted-foreground">{formatDate(createdAt)}. Riwayat pembaruan akan tercatat setelah fitur ini aktif.</p></li> : null}
    {events.map((event) => <TimelineEntry key={event.id} event={event} internal={internal} />)}
  </ol>;
}

function TimelineEntry({ event, internal }: { event: TimelineEvent; internal: boolean }) {
  const previousStatus = "previousStatus" in event ? event.previousStatus : undefined;
  const actorName = "actorName" in event ? event.actorName : undefined;
  const initial = "initial" in event ? event.initial : "actorId" in event && event.actorId === "system" && !previousStatus;
  const title = initial ? "Request diterima" : previousStatus && previousStatus !== event.status ? "Status diperbarui" : "Progres diperbarui";

  return <li className="relative pl-5 pb-7 last:pb-0"><TimelineMarker /><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-medium">{title}</p><p className="mt-1 text-sm text-muted-foreground">{formatDate(event.createdAt)}{internal && actorName ? ` · ${actorName}` : ""}</p></div><TicketStatusBadge status={event.status} /></div><p className="mt-3 max-w-2xl whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{event.publicProgress}</p></li>;
}

function TimelineMarker() {
  return <span className="absolute -left-1.5 top-1.5 flex size-3 items-center justify-center rounded-full bg-background ring-1 ring-border"><Clock3Icon aria-hidden="true" className="size-2.5 text-accent" /></span>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
