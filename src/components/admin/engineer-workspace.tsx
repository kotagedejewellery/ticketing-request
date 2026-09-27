"use client";

import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Dashboard } from "@/components/admin/dashboard";
import type { EngineerSession } from "@/components/auth/engineer-login-form";
import { Button } from "@/components/ui/button";

export function EngineerWorkspace({ user }: { user: EngineerSession }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="min-h-dvh bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Lewati navigasi</a>
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/engineer" className="flex min-w-0 items-center gap-3" aria-label="Dashboard engineer">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold tracking-tight text-primary-foreground shadow-[0_8px_18px_oklch(0.28_0.055_258_/_0.16)]">IR</span>
            <span className="min-w-0"><span className="block truncate text-sm font-semibold tracking-tight">Internal Request Hub</span><span className="hidden text-xs text-muted-foreground sm:block">Dashboard engineer</span></span>
          </Link>
          <Button type="button" variant="ghost" size="lg" className="h-11 shrink-0" onClick={() => void logout()} disabled={isLoggingOut}><LogOutIcon aria-hidden="true" className={isLoggingOut ? "animate-spin" : undefined} /><span className="hidden sm:inline">{isLoggingOut ? "Keluar..." : "Keluar"}</span></Button>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12"><Dashboard user={user} /></main>
    </div>
  );
}
