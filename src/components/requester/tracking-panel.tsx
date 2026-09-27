"use client";

import { CalendarClockIcon, LoaderCircleIcon, ShieldCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { TicketStatusBadge } from "@/components/shared/ticket-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { REQUEST_TYPE_LABELS, type PublicTicket } from "@/lib/domain/tickets";

type TrackingPanelProps = {
  trackingToken: string;
};

export function TrackingPanel({ trackingToken }: TrackingPanelProps) {
  const [ticket, setTicket] = useState<PublicTicket>();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadTicket = async () => {
    setIsLoading(true);
    setMessage("");
    setTicket(undefined);
    try {
      const response = await fetch(`/api/tracking/${encodeURIComponent(trackingToken)}`);
      const payload = await response.json().catch(() => undefined) as { ticket?: PublicTicket; message?: string } | undefined;
      if (!response.ok || !payload?.ticket) {
        setMessage(payload?.message ?? "Tiket tidak ditemukan atau tautan sudah tidak berlaku.");
        return;
      }
      setTicket(payload.ticket);
    } catch {
      setMessage("Tiket belum dapat dimuat. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTicket();
  }, [trackingToken]);

  return (
    <section aria-labelledby="tracking-title" className="mx-auto w-full max-w-3xl">
      <div className="max-w-2xl">
        <h1 id="tracking-title" className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Progres request Anda.</h1>
        <p className="mt-3 leading-7 text-muted-foreground">Berikut pembaruan terbaru dari tim engineer untuk request Anda.</p>
      </div>

      {isLoading ? <p role="status" className="mt-7 flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircleIcon aria-hidden="true" className="size-4 animate-spin" /> Memuat progres request...</p> : null}
      {message ? <div role="status" className="mt-5 rounded-lg border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive">{message}</div> : null}
      {ticket ? <TicketProgress ticket={ticket} /> : null}
      {message && !isLoading ? <Button type="button" variant="outline" className="mt-4 h-11" onClick={() => void loadTicket()}>Coba lagi</Button> : null}
    </section>
  );
}

function TicketProgress({ ticket }: { ticket: PublicTicket }) {
  return (
    <Card className="mt-6 border-primary/15 shadow-[0_16px_36px_oklch(0.28_0.055_258_/_0.08)]">
      <CardHeader className="gap-4 border-b border-border sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted-foreground">{ticket.id}</p>
          <CardTitle className="mt-2 text-2xl">{ticket.title}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{REQUEST_TYPE_LABELS[ticket.type]}</p>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </CardHeader>
      <CardContent className="grid gap-6 pt-6">
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <p className="text-sm font-medium">Pembaruan dari tim</p>
          <p className="mt-2 leading-7 text-muted-foreground">{ticket.publicProgress}</p>
        </div>
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <p className="flex items-center gap-2"><CalendarClockIcon aria-hidden="true" className="size-4" /> Diperbarui {formatDate(ticket.updatedAt)}</p>
          <p className="flex items-center gap-2"><ShieldCheckIcon aria-hidden="true" className="size-4" /> Detail teknis hanya untuk tim internal</p>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
