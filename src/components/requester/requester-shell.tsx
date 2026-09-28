import Link from "next/link";
import type { ReactNode } from "react";

export function RequesterShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Lewati navigasi</a>
      <header className="border-b document-rule bg-background">
        <div className="mx-auto flex max-w-[90rem] items-center px-5 py-3 sm:px-8 lg:px-12">
          <Link href="/" className="min-w-0" aria-label="Internal Request Hub, beranda">
            <span className="document-title block truncate text-xl leading-none text-foreground sm:text-2xl">Internal Request Hub</span>
          </Link>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-[90rem] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">{children}</main>
    </div>
  );
}
