"use client";

import { FilterIcon, FolderOpenIcon, ListFilterIcon, RefreshCwIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AdminManagement } from "@/components/admin/admin-management";
import type { EngineerSession } from "@/components/auth/engineer-login-form";
import { TicketDetailDialog } from "@/components/admin/ticket-detail-dialog";
import { TicketStatusBadge } from "@/components/shared/ticket-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRequesterName, getTicketSummary, getTicketTitle, REQUEST_TYPE_LABELS, TICKET_STATUSES, type Ticket, type TicketChanges } from "@/lib/domain/tickets";

export function Dashboard({ user }: { user: EngineerSession }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string>();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/tickets");
      const payload = await response.json().catch(() => undefined) as { tickets?: Ticket[]; message?: string } | undefined;
      if (!response.ok) throw new Error(payload?.message ?? "Tiket belum dapat dimuat.");
      setTickets(payload?.tickets ?? []);
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Tiket belum dapat dimuat.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void loadTickets(); }, [loadTickets]);

  const updateTicket = async (ticketId: string, changes: TicketChanges) => {
    const response = await fetch(`/api/tickets/${encodeURIComponent(ticketId)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(changes) });
    const payload = await response.json().catch(() => undefined) as { ticket?: Ticket; message?: string } | undefined;
    if (!response.ok || !payload?.ticket) throw new Error(payload?.message ?? "Tiket belum dapat diperbarui.");
    setTickets((current) => current.map((ticket) => ticket.id === ticketId ? payload.ticket! : ticket));
  };

  const divisions = useMemo(() => [...new Set(tickets.map((ticket) => ticket.division))].sort(), [tickets]);
  const displayedTickets = tickets.filter((ticket) => (typeFilter === "all" || ticket.type === typeFilter) && (statusFilter === "all" || ticket.status === statusFilter) && (divisionFilter === "all" || ticket.division === divisionFilter));
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId);

  return (
    <section aria-labelledby="dashboard-title" className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h1 id="dashboard-title" className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Request untuk ditindaklanjuti.</h1><p className="mt-2 text-sm text-muted-foreground">Masuk sebagai {user.name} · {user.role === "admin" ? "Admin" : "Engineer"}</p></div>
        <Button type="button" variant="outline" className="h-11" onClick={() => void loadTickets()} disabled={isLoading} aria-busy={isLoading}><RefreshCwIcon aria-hidden="true" className={isLoading ? "animate-spin" : undefined} /> {isLoading ? "Memuat..." : "Muat ulang"}</Button>
      </div>

      <div className="mt-7 grid gap-3 border-y border-border py-4 sm:grid-cols-3 sm:py-5">
        <Metric label="Perlu ditinjau" value={tickets.filter((ticket) => ["Baru", "Ditinjau"].includes(ticket.status)).length} />
        <Metric label="Sedang dikerjakan" value={tickets.filter((ticket) => ticket.status === "Dikerjakan").length} />
        <Metric label="Selesai" value={tickets.filter((ticket) => ticket.status === "Selesai").length} />
      </div>

      <div className="mt-7 rounded-2xl border border-border bg-card p-4 sm:p-5"><div className="flex items-center gap-2"><FilterIcon aria-hidden="true" className="size-4" /><h2 className="font-medium">Filter request</h2></div><div className="mt-4 grid gap-3 md:grid-cols-3"><FilterSelect label="Jenis request" value={typeFilter} onChange={setTypeFilter} options={[["all", "Semua jenis"], ...Object.entries(REQUEST_TYPE_LABELS)]} /><FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={[["all", "Semua status"], ...TICKET_STATUSES.map((status) => [status, status])]} /><FilterSelect label="Divisi" value={divisionFilter} onChange={setDivisionFilter} options={[["all", "Semua divisi"], ...divisions.map((division) => [division, division])]} /></div></div>

      {message ? <p role="alert" className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{message}</p> : null}
      {isLoading ? <p role="status" className="mt-6 text-sm text-muted-foreground">Memuat tiket dari spreadsheet...</p> : displayedTickets.length ? <TicketList tickets={displayedTickets} onOpen={setSelectedId} /> : <EmptyState />}
      {selectedTicket ? <TicketDetailDialog key={selectedTicket.id} ticket={selectedTicket} onClose={() => setSelectedId(undefined)} onSave={updateTicket} /> : null}
      <AdminManagement user={user} />
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <Card className="rounded-xl bg-transparent ring-0"><CardContent className="flex items-end justify-between px-1 py-2 sm:px-3"><p className="text-sm text-muted-foreground">{label}</p><p className="font-mono text-3xl font-semibold tracking-[-0.04em] text-primary tabular-nums">{value}</p></CardContent></Card>;
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <label className="grid gap-2 text-sm font-medium">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 rounded-xl border border-input bg-background px-3 text-base font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>;
}

function TicketList({ tickets, onOpen }: { tickets: Ticket[]; onOpen: (id: string) => void }) {
  return <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card"><div className="hidden overflow-x-auto md:block"><table className="w-full min-w-200 text-left text-sm"><thead className="border-b border-border bg-muted/50 text-xs font-medium tracking-wide text-muted-foreground"><tr><th className="px-5 py-3">Tiket</th><th className="px-5 py-3">Request</th><th className="px-5 py-3">Requester</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"><span className="sr-only">Aksi</span></th></tr></thead><tbody className="divide-y divide-border">{tickets.map((ticket) => <tr key={ticket.id} className="hover:bg-muted/30"><td className="px-5 py-4 font-mono text-xs">{ticket.id}</td><td className="max-w-80 px-5 py-4"><p className="font-medium">{getTicketTitle(ticket)}</p><p className="mt-1 line-clamp-1 text-muted-foreground">{getTicketSummary(ticket)}</p></td><td className="px-5 py-4"><p>{getRequesterName(ticket)}</p><p className="mt-1 text-muted-foreground">{ticket.division}</p></td><td className="px-5 py-4"><TicketStatusBadge status={ticket.status} /></td><td className="px-5 py-4 text-right"><Button variant="outline" size="sm" onClick={() => onOpen(ticket.id)}>Buka</Button></td></tr>)}</tbody></table></div><div className="grid divide-y divide-border md:hidden">{tickets.map((ticket) => <article key={ticket.id} className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-mono text-xs text-muted-foreground">{ticket.id}</p><h2 className="mt-1 font-medium">{getTicketTitle(ticket)}</h2></div><TicketStatusBadge status={ticket.status} /></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{getTicketSummary(ticket)}</p><div className="mt-4 flex items-center justify-between gap-3"><p className="text-sm">{getRequesterName(ticket)} · <span className="text-muted-foreground">{ticket.division}</span></p><Button variant="outline" size="sm" className="h-10 px-3" onClick={() => onOpen(ticket.id)}>Buka</Button></div></article>)}</div></div>;
}

function EmptyState() {
  return <div role="status" className="mt-5 rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center"><span className="mx-auto flex size-11 items-center justify-center rounded-full bg-muted"><FolderOpenIcon aria-hidden="true" className="size-5" /></span><h2 className="mt-4 font-semibold">Tidak ada tiket yang sesuai</h2><p className="mt-2 text-sm text-muted-foreground">Ubah atau kosongkan filter untuk melihat request lain.</p><ListFilterIcon aria-hidden="true" className="sr-only" /></div>;
}
