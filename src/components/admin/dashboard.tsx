"use client";

import { ArrowUpRightIcon, ClipboardListIcon, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { TicketStatusBadge } from "@/components/shared/ticket-status-badge";
import { getRequesterName, getTicketTitle, type Ticket } from "@/lib/domain/tickets";

export function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void fetch("/api/tickets")
      .then(async (response) => {
        const payload = await response.json().catch(() => undefined) as { tickets?: Ticket[]; message?: string } | undefined;
        if (!response.ok) throw new Error(payload?.message ?? "Tiket belum dapat dimuat.");
        if (active) setTickets(payload?.tickets ?? []);
      })
      .catch((cause) => { if (active) setMessage(cause instanceof Error ? cause.message : "Tiket belum dapat dimuat."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const needsReview = tickets.filter((ticket) => ["Baru", "Ditinjau", "Menunggu Informasi"].includes(ticket.status)).length;
  const inProgress = tickets.filter((ticket) => ["Dijadwalkan", "Dikerjakan"].includes(ticket.status)).length;
  const completed = tickets.filter((ticket) => ticket.status === "Selesai").length;

  return (
    <section aria-labelledby="dashboard-title" className="w-full">
      <div className="max-w-2xl">
        <h1 id="dashboard-title" className="document-title text-balance text-4xl sm:text-5xl">Ringkasan pekerjaan.</h1>
        <p className="mt-3 leading-7 text-muted-foreground">Lihat kondisi request saat ini, lalu buka daftar tiket untuk menindaklanjutinya.</p>
      </div>

      <dl className="mt-10 grid divide-y border-y document-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Metric label="Perlu ditinjau" value={needsReview} />
        <Metric label="Dalam proses" value={inProgress} />
        <Metric label="Selesai" value={completed} />
      </dl>

      <section aria-labelledby="recent-tickets-title" className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b document-rule pb-4">
          <div>
            <h2 id="recent-tickets-title" className="text-xl font-semibold tracking-[-0.02em]">Tiket terbaru</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enam request terakhir yang masuk ke register.</p>
          </div>
          <Link href="/engineer/tickets" className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Lihat semua tiket <ArrowUpRightIcon aria-hidden="true" className="size-4" /></Link>
        </div>

        {isLoading ? <p role="status" className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircleIcon aria-hidden="true" className="size-4 animate-spin" /> Memuat tiket...</p> : null}
        {message ? <p role="alert" className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{message}</p> : null}
        {!isLoading && !message && tickets.length ? <RecentTickets tickets={tickets.slice(0, 6)} /> : null}
        {!isLoading && !message && !tickets.length ? <div className="mt-6 border-y document-rule py-12 text-center"><ClipboardListIcon aria-hidden="true" className="mx-auto size-5 text-muted-foreground" /><h2 className="mt-3 font-medium">Belum ada tiket masuk</h2><p className="mt-1 text-sm text-muted-foreground">Request baru akan muncul di sini setelah dikirim.</p></div> : null}
      </section>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="flex items-baseline justify-between gap-4 px-1 py-5 sm:px-5"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="font-mono text-3xl font-semibold tracking-[-0.04em] tabular-nums text-primary">{value}</dd></div>;
}

function RecentTickets({ tickets }: { tickets: Ticket[] }) {
  return <div className="divide-y document-rule">
    {tickets.map((ticket) => <Link key={ticket.id} href={`/engineer/tickets/${encodeURIComponent(ticket.id)}`} className="grid gap-3 py-5 transition-colors hover:bg-muted/50 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center sm:px-4">
      <p className="font-mono text-xs text-muted-foreground">{ticket.id}</p>
      <div className="min-w-0"><p className="truncate font-medium">{getTicketTitle(ticket)}</p><p className="mt-1 truncate text-sm text-muted-foreground">{getRequesterName(ticket)} · {ticket.division}</p></div>
      <TicketStatusBadge status={ticket.status} />
    </Link>)}
  </div>;
}
