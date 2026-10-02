"use client";

import { ArrowLeftIcon, ExternalLinkIcon, LoaderCircleIcon, SaveIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { TicketTimeline } from "@/components/shared/ticket-timeline";
import { TicketStatusBadge } from "@/components/shared/ticket-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSafeExternalUrl, getTicketTitle, TICKET_STATUSES, type Ticket, type TicketChanges } from "@/lib/domain/tickets";
import type { TicketEvent } from "@/lib/domain/ticket-events";

type DetailResponse = { ticket: Ticket; history: TicketEvent[] };

export function TicketDetailWorkspace({ ticketId }: { ticketId: string }) {
  const [detail, setDetail] = useState<DetailResponse>();
  const [status, setStatus] = useState<Ticket["status"]>();
  const [publicProgress, setPublicProgress] = useState("");
  const [technicalClassification, setTechnicalClassification] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const applyDetail = (next: DetailResponse) => {
    setDetail(next);
    setStatus(next.ticket.status);
    setPublicProgress(next.ticket.publicProgress);
    setTechnicalClassification(next.ticket.technicalClassification ?? "");
  };

  useEffect(() => {
    let active = true;
    void fetch(`/api/tickets/${encodeURIComponent(ticketId)}`)
      .then(async (response) => {
        const payload = await response.json().catch(() => undefined) as Partial<DetailResponse> & { message?: string };
        if (!response.ok || !payload.ticket || !payload.history) throw new Error(payload.message ?? "Detail tiket belum dapat dimuat.");
        if (active) applyDetail({ ticket: payload.ticket, history: payload.history });
      })
      .catch((cause) => { if (active) setMessage(cause instanceof Error ? cause.message : "Detail tiket belum dapat dimuat."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [ticketId]);

  const save = async () => {
    if (!status || !publicProgress.trim()) return;
    setMessage("");
    setIsSaving(true);
    try {
      const changes: TicketChanges = { status, publicProgress: publicProgress.trim(), technicalClassification: technicalClassification.trim() || undefined };
      const response = await fetch(`/api/tickets/${encodeURIComponent(ticketId)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(changes) });
      const payload = await response.json().catch(() => undefined) as { message?: string } | undefined;
      if (!response.ok) throw new Error(payload?.message ?? "Pembaruan tiket belum dapat disimpan.");
      const refreshed = await fetch(`/api/tickets/${encodeURIComponent(ticketId)}`);
      const next = await refreshed.json().catch(() => undefined) as Partial<DetailResponse> & { message?: string };
      if (!refreshed.ok || !next.ticket || !next.history) throw new Error(next.message ?? "Pembaruan tersimpan, tetapi detail terbaru belum dapat dimuat.");
      applyDetail({ ticket: next.ticket, history: next.history });
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Pembaruan tiket belum dapat disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircleIcon aria-hidden="true" className="size-4 animate-spin" /> Memuat detail tiket...</p>;
  if (message && !detail) return <div role="alert" className="max-w-xl"><Link href="/engineer/tickets" className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"><ArrowLeftIcon aria-hidden="true" className="size-4" /> Kembali ke tiket masuk</Link><p className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{message}</p></div>;
  if (!detail || !status) return null;

  return <section aria-labelledby="ticket-title">
    <Link href="/engineer/tickets" className="inline-flex h-10 items-center gap-2 rounded-md px-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowLeftIcon aria-hidden="true" className="size-4" /> Semua tiket</Link>
    <div className="mt-6 flex flex-wrap items-start justify-between gap-5 border-b document-rule pb-6"><div><p className="font-mono text-xs font-semibold tracking-[0.12em] text-muted-foreground">{detail.ticket.id}</p><h1 id="ticket-title" className="document-title mt-2 text-balance text-4xl sm:text-5xl">{getTicketTitle(detail.ticket)}</h1></div><TicketStatusBadge status={detail.ticket.status} /></div>

    {message ? <p role="alert" className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{message}</p> : null}
    <div className="engineer-detail-grid mt-8 grid gap-10">
      <section aria-labelledby="request-data-title" className="engineer-request-data"><h2 id="request-data-title" className="text-xl font-semibold tracking-[-0.02em]">Data pengajuan</h2><TicketInformation ticket={detail.ticket} /></section>
      <section aria-labelledby="update-title" className="engineer-detail-update h-fit border-y document-rule py-6"><div><h2 id="update-title" className="text-xl font-semibold tracking-[-0.02em]">Perbarui tiket</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Progres requester akan terlihat pada halaman pelacakan. Klasifikasi teknis tetap internal.</p></div><div className="mt-6 grid gap-4"><div className="grid gap-2"><Label htmlFor="ticket-status">Status</Label><select id="ticket-status" value={status} onChange={(event) => setStatus(event.target.value as Ticket["status"])} className="h-12 rounded-xl border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">{TICKET_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></div><div className="grid gap-2"><Label htmlFor="public-progress">Progres untuk requester <span className="text-destructive">*</span></Label><Textarea id="public-progress" value={publicProgress} onChange={(event) => setPublicProgress(event.target.value)} className="min-h-32 rounded-xl" /></div><div className="grid gap-2"><Label htmlFor="technical-classification">Klasifikasi teknis internal</Label><Input id="technical-classification" value={technicalClassification} onChange={(event) => setTechnicalClassification(event.target.value)} className="h-12 rounded-xl" placeholder="Contoh: Investigasi alur transaksi" /></div><Button type="button" size="lg" className="mt-2 h-12 w-full" disabled={!publicProgress.trim() || isSaving} onClick={() => void save()}><SaveIcon aria-hidden="true" className={isSaving ? "animate-pulse" : undefined} /> {isSaving ? "Menyimpan..." : "Simpan pembaruan"}</Button></div></section>
      <section aria-labelledby="history-title" className="engineer-ticket-history border-t document-rule pt-7"><h2 id="history-title" className="text-xl font-semibold tracking-[-0.02em]">Riwayat tiket</h2><p className="mt-1 text-sm text-muted-foreground">Catatan perubahan disimpan untuk pelacakan operasional.</p><TicketTimeline events={detail.history} createdAt={detail.ticket.createdAt} internal /></section>
    </div>
  </section>;
}

function TicketInformation({ ticket }: { ticket: Ticket }) {
  const attachmentUrl = getSafeExternalUrl(ticket.attachmentUrl);
  const shared = [["Requester", ticket.type === "bug" ? ticket.reporterName : ticket.requesterName], ["Divisi", ticket.division]];
  const details = ticket.type === "new-system"
    ? [["Masalah", ticket.currentProblem], ["Harapan", ticket.expectedOutcome], ["Pengguna", ticket.users], ["Urgensi", ticket.urgency], ["Deadline", ticket.deadline ?? "—"]]
    : ticket.type === "enhancement"
      ? [["Perubahan", ticket.requestedChange], ["Alasan", ticket.reason], ["Urgensi", ticket.urgency]]
      : [["Kejadian", ticket.incident], ["Sejak", ticket.since], ["Dampak kerja", ticket.workImpact], ["Keterangan", ticket.additionalNotes ?? "—"]];

  return <div className="mt-5 grid gap-4"><div className="grid gap-3 sm:grid-cols-2">{shared.map(([label, value]) => <InfoRow key={label} label={label} value={value} compact />)}</div><InfoRow label={ticket.type === "new-system" ? "Nama kebutuhan" : "Sistem"} value={getTicketTitle(ticket)} /><div className="grid gap-3">{details.map(([label, value]) => <InfoRow key={label} label={label} value={value} />)}</div>{attachmentUrl ? <a href={attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"><ExternalLinkIcon aria-hidden="true" className="size-4" /> Buka lampiran</a> : null}</div>;
}

function InfoRow({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return <div className={compact ? "rounded-lg border border-border p-3" : "rounded-lg bg-muted/50 p-4"}><dt className="text-xs font-medium tracking-wide text-muted-foreground">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-6">{value}</dd></div>;
}
