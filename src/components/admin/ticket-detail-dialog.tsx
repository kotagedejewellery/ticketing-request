"use client";

import { ExternalLinkIcon, SaveIcon } from "lucide-react";
import { useState } from "react";

import { TicketStatusBadge } from "@/components/shared/ticket-status-badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSafeExternalUrl, TICKET_STATUSES, type Ticket, type TicketChanges } from "@/lib/domain/tickets";

type TicketDetailDialogProps = {
  ticket: Ticket;
  onClose: () => void;
  onSave: (ticketId: string, changes: TicketChanges) => Promise<void>;
};

export function TicketDetailDialog({ ticket, onClose, onSave }: TicketDetailDialogProps) {
  const [status, setStatus] = useState(ticket.status);
  const [publicProgress, setPublicProgress] = useState(ticket.publicProgress);
  const [technicalClassification, setTechnicalClassification] = useState(ticket.technicalClassification ?? "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const save = async () => {
    if (!publicProgress.trim()) return;
    setError("");
    setIsSaving(true);
    try {
      await onSave(ticket.id, { status, publicProgress: publicProgress.trim(), technicalClassification: technicalClassification.trim() || undefined });
      onClose();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Pembaruan tiket belum dapat disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[calc(100dvh-1rem)] max-w-3xl overflow-y-auto rounded-2xl p-0 sm:max-w-3xl">
        <DialogHeader className="border-b border-border p-5 pr-12 sm:p-6 sm:pr-14">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted-foreground">{ticket.id}</p>
              <DialogTitle className="mt-2 text-xl">{getTicketHeading(ticket)}</DialogTitle>
              <DialogDescription className="mt-1">Detail request dan pembaruan internal.</DialogDescription>
            </div>
            <TicketStatusBadge status={ticket.status} />
          </div>
        </DialogHeader>

        <div className="grid gap-7 p-5 sm:p-6">
          <TicketInformation ticket={ticket} />
          <section aria-labelledby="update-title" className="grid gap-4 border-t border-border pt-6">
            <div>
              <h3 id="update-title" className="font-semibold">Perbarui tiket</h3>
              <p className="mt-1 text-sm text-muted-foreground">Progres requester tampil di halaman tracking. Klasifikasi teknis hanya untuk engineer.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ticket-status">Status</Label>
              <select id="ticket-status" value={status} onChange={(event) => setStatus(event.target.value as Ticket["status"])} className="h-12 rounded-xl border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                {TICKET_STATUSES.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="public-progress">Progres untuk requester <span className="text-destructive">*</span></Label>
              <Textarea id="public-progress" value={publicProgress} onChange={(event) => setPublicProgress(event.target.value)} className="min-h-28 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technical-classification">Klasifikasi teknis internal</Label>
              <Input id="technical-classification" value={technicalClassification} onChange={(event) => setTechnicalClassification(event.target.value)} className="h-12 rounded-xl" placeholder="Contoh: Investigasi alur transaksi" />
            </div>
            {error ? <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p> : null}
            <div className="flex justify-end border-t border-border pt-5">
              <Button type="button" size="lg" className="h-12 w-full sm:w-auto" disabled={!publicProgress.trim() || isSaving} onClick={() => void save()}><SaveIcon aria-hidden="true" /> {isSaving ? "Menyimpan..." : "Simpan pembaruan"}</Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TicketInformation({ ticket }: { ticket: Ticket }) {
  const attachmentUrl = getSafeExternalUrl(ticket.attachmentUrl);
  const shared = [["Requester", ticket.type === "bug" ? ticket.reporterName : ticket.requesterName], ["Divisi", ticket.division]];
  const details = ticket.type === "new-system"
    ? [["Masalah", ticket.currentProblem], ["Harapan", ticket.expectedOutcome], ["Pengguna", ticket.users], ["Urgensi", ticket.urgency], ["Deadline", ticket.deadline ?? "—"]]
    : ticket.type === "enhancement"
      ? [["Perubahan", ticket.requestedChange], ["Alasan", ticket.reason], ["Urgensi", ticket.urgency]]
      : [["Kejadian", ticket.incident], ["Sejak", ticket.since], ["Dampak kerja", ticket.workImpact], ["Keterangan", ticket.additionalNotes ?? "—"]];

  return <section aria-label="Data pengajuan" className="grid gap-4">
    <div className="grid gap-3 sm:grid-cols-2">
      {shared.map(([label, value]) => <InfoRow key={label} label={label} value={value} compact />)}
    </div>
    <InfoRow label={ticket.type === "new-system" ? "Nama kebutuhan" : "Sistem"} value={getTicketHeading(ticket)} />
    <div className="grid gap-3">{details.map(([label, value]) => <InfoRow key={label} label={label} value={value} />)}</div>
    {attachmentUrl ? <a href={attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"><ExternalLinkIcon aria-hidden="true" className="size-4" /> Buka lampiran</a> : null}
  </section>;
}

function InfoRow({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return <div className={compact ? "rounded-lg border border-border p-3" : "rounded-lg bg-muted/50 p-4"}>
    <dt className="text-xs font-medium tracking-wide text-muted-foreground">{label}</dt>
    <dd className="mt-1 whitespace-pre-wrap text-sm leading-6">{value}</dd>
  </div>;
}

function getTicketHeading(ticket: Ticket) {
  if (ticket.type === "new-system") return ticket.needName;
  return ticket.type === "enhancement" ? ticket.systemName : ticket.affectedSystem;
}
