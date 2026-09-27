"use client";

import { ClipboardListIcon, LayoutDashboardIcon, LogOutIcon, SearchIcon, UserRoundIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Dashboard } from "@/components/admin/dashboard";
import { LoginDialog, type EngineerSession } from "@/components/auth/login-dialog";
import { RequestWorkspace } from "@/components/requester/request-workspace";
import { TrackingPanel } from "@/components/requester/tracking-panel";
import { Button } from "@/components/ui/button";

type RequesterView = "request" | "tracking";

const navigation = [
  { id: "request" as const, label: "Request", icon: ClipboardListIcon },
  { id: "tracking" as const, label: "Lacak", icon: SearchIcon },
];

export function InternalRequestHub() {
  const [view, setView] = useState<RequesterView>("request");
  const [trackingId, setTrackingId] = useState("");
  const [engineer, setEngineer] = useState<EngineerSession>();
  const [showDashboard, setShowDashboard] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (response) => response.ok ? response.json() as Promise<{ user: EngineerSession | null }> : { user: null })
      .then(({ user }) => setEngineer(user ?? undefined))
      .catch(() => setEngineer(undefined));
  }, []);

  const goToRequesterView = (nextView: RequesterView) => {
    setShowDashboard(false);
    setView(nextView);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    setEngineer(undefined);
    setShowDashboard(false);
    setView("request");
  };

  return (
    <div className="min-h-dvh bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Lewati navigasi</a>
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold tracking-tight text-primary-foreground shadow-[0_8px_18px_oklch(0.28_0.055_258_/_0.16)]">IR</span><div><p className="text-sm font-semibold tracking-tight">Internal Request Hub</p><p className="text-xs text-muted-foreground">Pengajuan dan progres request internal</p></div></div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <nav aria-label="Navigasi requester" className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-card p-1">
              {navigation.map(({ id, label, icon: Icon }) => <Button key={id} type="button" variant={!showDashboard && view === id ? "secondary" : "ghost"} onClick={() => goToRequesterView(id)} className="h-11 justify-center gap-1.5 px-3 text-sm" aria-current={!showDashboard && view === id ? "page" : undefined}><Icon aria-hidden="true" className="size-4" />{label}</Button>)}
            </nav>
            {engineer ? <div className="flex gap-1"><Button type="button" variant={showDashboard ? "secondary" : "ghost"} className="h-11" onClick={() => setShowDashboard(true)}><LayoutDashboardIcon aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Dashboard</span></Button><Button type="button" variant="ghost" className="h-11" onClick={() => void logout()}><LogOutIcon aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Keluar</span></Button></div> : <Button type="button" variant="ghost" className="h-11" onClick={() => setLoginOpen(true)}><UserRoundIcon aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Masuk engineer</span></Button>}
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {showDashboard && engineer ? <Dashboard user={engineer} /> : null}
        {!showDashboard && view === "request" ? <RequestWorkspace onTrackTicket={(id) => { setTrackingId(id); goToRequesterView("tracking"); }} /> : null}
        {!showDashboard && view === "tracking" ? <TrackingPanel key={trackingId} initialTicketId={trackingId} /> : null}
      </main>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} onSuccess={(user) => { setEngineer(user); setShowDashboard(true); }} />
    </div>
  );
}
