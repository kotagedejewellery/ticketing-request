"use client";

import { CalendarClockIcon, LoaderCircleIcon, ShieldCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { TicketStatusBadge } from "@/components/shared/ticket-status-badge";
import { TicketTimeline } from "@/components/shared/ticket-timeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { REQUEST_TYPE_LABELS, type PublicTicket } from "@/lib/domain/tickets";
import type { PublicTicketEvent } from "@/lib/domain/ticket-events";

type TrackingPanelProps = {
  trackingToken: string;
};

type TrackingResponse = { ticket: PublicTicket; history: PublicTicketEvent[] };

export function TrackingPanel({ trackingToken }: TrackingPanelProps) {
  const [ticket, setTicket] = useState<PublicTicket>();
  const [history, setHistory] = useState<PublicTicketEvent[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadTicket = async () => {
    setIsLoading(true);
    setMessage("");
    setTicket(undefined);
    setHistory([]);
    try {
      const payload = await getTrackingTicket(trackingToken);
      setTicket(payload.ticket);
      setHistory(payload.history);
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Tiket belum dapat dimuat. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    void getTrackingTicket(trackingToken)
      .then((payload) => {
        if (!active) return;
        setTicket(payload.ticket);
        setHistory(payload.history);
      })
      .catch((cause) => { if (active) setMessage(cause instanceof Error ? cause.message : "Tiket belum dapat dimuat. Silakan coba lagi."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [trackingToken]);

  return (
    <section aria-labelledby="tracking-title" className="mx-auto w-full max-w-4xl">
      <div className="max-w-2xl">
        <p className="document-kicker">Lacak transmittal</p>
        <h1 id="tracking-title" className="document-title mt-3 text-balance text-4xl sm:text-5xl">Progres request Anda.</h1>
        <p className="mt-3 leading-7 text-muted-foreground">Berikut pembaruan terbaru dari tim engineer untuk request Anda.</p>
      </div>

      {isLoading ? <p role="status" className="mt-7 flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircleIcon aria-hidden="true" className="size-4 animate-spin" /> Memuat progres request...</p> : null}
      {message ? <div role="status" className="mt-5 rounded-lg border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive">{message}</div> : null}
      {ticket ? <TicketProgress ticket={ticket} history={history} /> : null}
      {message && !isLoading ? <Button type="button" variant="outline" className="mt-4 h-11" onClick={() => void loadTicket()}>Coba lagi</Button> : null}
    </section>
  );
}

async function getTrackingTicket(trackingToken: string): Promise<TrackingResponse> {
  const response = await fetch(`/api/tracking/${encodeURIComponent(trackingToken)}`);
  const payload = await response.json().catch(() => undefined) as { ticket?: PublicTicket; history?: PublicTicketEvent[]; message?: string } | undefined;
  if (!response.ok || !payload?.ticket) throw new Error(payload?.message ?? "Tiket tidak ditemukan atau tautan sudah tidak berlaku.");
  return { ticket: payload.ticket, history: payload.history ?? [] };
}

function TicketProgress({ ticket, history }: { ticket: PublicTicket; history: PublicTicketEvent[] }) {
  return (
    <Card className="document-panel mt-8 rounded-lg">
      <CardHeader className="gap-4 border-b document-rule sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted-foreground">{ticket.id}</p>
          <CardTitle className="document-title mt-2 text-3xl">{ticket.title}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{REQUEST_TYPE_LABELS[ticket.type]}</p>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </CardHeader>
      <CardContent className="grid gap-6 pt-6">
        <div className="border-l border-accent bg-muted/40 p-5">
          <p className="document-kicker">Pembaruan dari tim</p>
          <p className="mt-2 leading-7 text-muted-foreground">{ticket.publicProgress}</p>
        </div>
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <p className="flex items-center gap-2"><CalendarClockIcon aria-hidden="true" className="size-4" /> Diperbarui {formatDate(ticket.updatedAt)}</p>
          <p className="flex items-center gap-2"><ShieldCheckIcon aria-hidden="true" className="size-4" /> Detail teknis hanya untuk tim internal</p>
        </div>
        <section aria-labelledby="tracking-history-title" className="border-t document-rule pt-6">
          <h2 id="tracking-history-title" className="text-lg font-semibold">Riwayat pembaruan</h2>
          <p className="mt-1 text-sm text-muted-foreground">Status dan pesan yang dibagikan oleh tim engineer.</p>
          <TicketTimeline events={history} createdAt={ticket.createdAt} />
        </section>
      </CardContent>
    </Card>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
