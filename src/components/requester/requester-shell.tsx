import { UserRoundIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";

export function RequesterShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Lewati navigasi</a>
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Internal Request Hub, beranda">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold tracking-tight text-primary-foreground shadow-[0_8px_18px_oklch(0.28_0.055_258_/_0.16)]">IR</span>
            <span className="min-w-0"><span className="block truncate text-sm font-semibold tracking-tight">Internal Request Hub</span><span className="hidden text-xs text-muted-foreground sm:block">Pengajuan request internal</span></span>
          </Link>
          <Link href="/masuk" className={buttonVariants({ variant: "ghost", size: "lg", className: "h-11 shrink-0" })}><UserRoundIcon aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Masuk engineer</span><span className="sm:hidden">Masuk</span></Link>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">{children}</main>
    </div>
  );
}
