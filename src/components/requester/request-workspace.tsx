"use client";

import { CheckCircle2Icon, ClipboardCheckIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { RequestForm } from "@/components/requester/request-form";
import { RequestTypePicker } from "@/components/requester/request-type-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RequestInput, Ticket } from "@/lib/domain/tickets";

type RequestWorkspaceProps = {
  onTrackTicket: (ticketId: string) => void;
};

export function RequestWorkspace({ onTrackTicket }: RequestWorkspaceProps) {
  const [selectedType, setSelectedType] = useState<RequestInput["type"]>();
  const [createdTicket, setCreatedTicket] = useState<Ticket>();

  const submitRequest = async (request: RequestInput) => {
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const payload = await response.json().catch(() => undefined) as { ticket?: Ticket; message?: string } | undefined;
    if (!response.ok || !payload?.ticket) throw new Error(payload?.message ?? "Request belum dapat dikirim. Silakan coba lagi.");
    setCreatedTicket(payload.ticket);
  };

  if (createdTicket) {
    return (
      <section className="mx-auto w-full max-w-2xl pt-2 sm:pt-6">
        <Card className="border-primary/20 shadow-[0_16px_36px_oklch(0.28_0.055_258_/_0.08)]">
          <CardHeader className="gap-4 border-b border-border">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <CheckCircle2Icon aria-hidden="true" className="size-6" />
            </span>
            <div>
              <p className="text-sm font-medium text-primary">Request tercatat</p>
              <CardTitle className="mt-2 text-2xl tracking-[-0.025em]">Terima kasih, request Anda sudah masuk.</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Simpan nomor tiket ini untuk melihat pembaruan progres Anda.</p>
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-muted p-4">
              <ClipboardCheckIcon aria-hidden="true" className="size-5 shrink-0" />
              <code className="font-mono text-lg font-semibold tracking-wide">{createdTicket.id}</code>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 w-full sm:w-auto" onClick={() => onTrackTicket(createdTicket.id)}>
                Lacak tiket ini
              </Button>
              <Button variant="outline" size="lg" className="h-12 w-full sm:w-auto" onClick={() => { setCreatedTicket(undefined); setSelectedType(undefined); }}>
                <PlusIcon aria-hidden="true" /> Buat request lain
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return selectedType ? (
    <RequestForm type={selectedType} onBack={() => setSelectedType(undefined)} onSubmit={submitRequest} />
  ) : (
    <RequestTypePicker onSelect={setSelectedType} />
  );
}
