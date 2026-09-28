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
      <header className="sticky top-0 z-30 border-b document-rule bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/engineer" className="min-w-0" aria-label="Dashboard engineer">
            <span className="document-title block truncate text-[1.35rem] leading-none">Internal Request Hub</span>
          </Link>
          <Button type="button" variant="ghost" size="lg" className="h-11 shrink-0" onClick={() => void logout()} disabled={isLoggingOut}><LogOutIcon aria-hidden="true" className={isLoggingOut ? "animate-spin" : undefined} /><span className="hidden sm:inline">{isLoggingOut ? "Keluar..." : "Keluar"}</span></Button>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-[90rem] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16"><Dashboard user={user} /></main>
    </div>
  );
}
