"use client";

import { ArrowUpRightIcon, FolderOpenIcon, LoaderCircleIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { TicketStatusBadge } from "@/components/shared/ticket-status-badge";
import { getRequesterName, getTicketSummary, getTicketTitle, REQUEST_TYPE_LABELS, TICKET_STATUSES, type Ticket } from "@/lib/domain/tickets";

export function TicketsWorkspace() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [query, setQuery] = useState("");
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

  const divisions = useMemo(() => [...new Set(tickets.map((ticket) => ticket.division))].sort(), [tickets]);
  const displayedTickets = tickets.filter((ticket) => {
    const searchable = `${ticket.id} ${getTicketTitle(ticket)} ${getRequesterName(ticket)} ${ticket.division}`.toLowerCase();
    return (typeFilter === "all" || ticket.type === typeFilter)
      && (statusFilter === "all" || ticket.status === statusFilter)
      && (divisionFilter === "all" || ticket.division === divisionFilter)
      && (!query.trim() || searchable.includes(query.trim().toLowerCase()));
  });

  return <section aria-labelledby="tickets-title">
    <div className="max-w-2xl"><h1 id="tickets-title" className="document-title text-balance text-4xl sm:text-5xl">Tiket masuk.</h1><p className="mt-3 leading-7 text-muted-foreground">Cari, saring, dan buka request yang memerlukan tindak lanjut.</p></div>

    <div className="mt-10 grid gap-3 border-y document-rule py-5 lg:grid-cols-[minmax(15rem,1.5fr)_repeat(3,minmax(10rem,1fr))]">
      <label className="grid gap-2 text-sm font-medium"><span>Cari tiket</span><span className="relative"><SearchIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nomor, request, requester" className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-base font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" /></span></label>
      <FilterSelect label="Jenis request" value={typeFilter} onChange={setTypeFilter} options={[["all", "Semua jenis"], ...Object.entries(REQUEST_TYPE_LABELS)]} />
      <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={[["all", "Semua status"], ...TICKET_STATUSES.map((status) => [status, status])]} />
      <FilterSelect label="Divisi" value={divisionFilter} onChange={setDivisionFilter} options={[["all", "Semua divisi"], ...divisions.map((division) => [division, division])]} />
    </div>

    {isLoading ? <p role="status" className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircleIcon aria-hidden="true" className="size-4 animate-spin" /> Memuat tiket dari spreadsheet...</p> : null}
    {message ? <p role="alert" className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{message}</p> : null}
    {!isLoading && !message && displayedTickets.length ? <TicketList tickets={displayedTickets} /> : null}
    {!isLoading && !message && !displayedTickets.length ? <EmptyState /> : null}
  </section>;
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <label className="grid gap-2 text-sm font-medium">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 rounded-xl border border-input bg-background px-3 text-base font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>;
}

function TicketList({ tickets }: { tickets: Ticket[] }) {
  return <div className="mt-6 divide-y border-y document-rule">
    {tickets.map((ticket) => <Link key={ticket.id} href={`/engineer/tickets/${encodeURIComponent(ticket.id)}`} className="grid gap-3 px-1 py-5 transition-colors hover:bg-muted/50 sm:grid-cols-[9rem_minmax(0,1.5fr)_minmax(10rem,1fr)_auto] sm:items-center sm:px-4">
      <p className="font-mono text-xs text-muted-foreground">{ticket.id}</p>
      <div className="min-w-0"><p className="truncate font-medium">{getTicketTitle(ticket)}</p><p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{getTicketSummary(ticket)}</p></div>
      <p className="text-sm">{getRequesterName(ticket)} <span className="text-muted-foreground">· {ticket.division}</span></p>
      <span className="flex items-center justify-between gap-3"><TicketStatusBadge status={ticket.status} /><ArrowUpRightIcon aria-hidden="true" className="size-4 text-muted-foreground" /></span>
    </Link>)}
  </div>;
}

function EmptyState() {
  return <div role="status" className="mt-6 border-y document-rule py-12 text-center"><FolderOpenIcon aria-hidden="true" className="mx-auto size-5 text-muted-foreground" /><h2 className="mt-3 font-medium">Tidak ada tiket yang sesuai</h2><p className="mt-1 text-sm text-muted-foreground">Ubah filter atau kata pencarian untuk melihat request lain.</p></div>;
}
