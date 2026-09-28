"use client";

import { ClipboardListIcon, LayoutDashboardIcon, LogOutIcon, UsersRoundIcon, WrenchIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

import type { EngineerSession } from "@/components/auth/engineer-login-form";
import { Button } from "@/components/ui/button";

type EngineerWorkspaceProps = {
  user: EngineerSession;
  children: ReactNode;
};

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

export function EngineerWorkspace({ user, children }: EngineerWorkspaceProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const items: NavigationItem[] = [
    { href: "/engineer", label: "Ringkasan", icon: LayoutDashboardIcon, exact: true },
    { href: "/engineer/tickets", label: "Tiket masuk", icon: ClipboardListIcon },
    ...(user.role === "admin" ? [
      { href: "/engineer/systems", label: "Sistem form", icon: WrenchIcon },
      { href: "/engineer/users", label: "User engineer", icon: UsersRoundIcon },
    ] : []),
  ];

  const logout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[6.5rem_minmax(0,1fr)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Lewati navigasi</a>

      <aside className="hidden border-r document-rule lg:block">
        <div className="sticky top-6 flex h-[calc(100dvh-3rem)] flex-col items-center px-4">
          <nav aria-label="Navigasi engineer" className="flex w-16 flex-1 flex-col items-center rounded-[2rem] bg-foreground py-3 text-background">
            <Link href="/engineer" aria-label="Internal Request Hub, ringkasan" className="group relative mb-5 flex size-10 items-center justify-center rounded-2xl text-background transition-colors hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <span className="font-serif text-lg font-semibold">IR</span>
              <Tooltip label="Internal Request Hub" />
            </Link>
            <div className="grid w-full gap-2">
              {items.map((item) => <RailLink key={item.href} item={item} active={isActive(pathname, item)} />)}
            </div>
            <div className="mt-auto pt-4">
              <Button type="button" variant="ghost" size="icon" aria-label="Keluar" className="group relative size-10 rounded-2xl text-background/75 hover:bg-background/10 hover:text-background" onClick={() => void logout()} disabled={isLoggingOut}>
                <LogOutIcon aria-hidden="true" className={isLoggingOut ? "animate-spin" : undefined} />
                <Tooltip label={isLoggingOut ? "Keluar..." : "Keluar"} />
              </Button>
            </div>
          </nav>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="border-b document-rule bg-background">
          <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
            <Link href="/engineer" className="min-w-0" aria-label="Internal Request Hub, ringkasan">
              <span className="document-title block truncate text-xl leading-none text-foreground sm:text-2xl">Internal Request Hub</span>
            </Link>
            <div className="flex items-center gap-3">
              <p className="hidden text-sm text-muted-foreground sm:block">{user.name} · {user.role === "admin" ? "Admin" : "Engineer"}</p>
              <Button type="button" variant="ghost" size="sm" className="h-10 lg:hidden" onClick={() => void logout()} disabled={isLoggingOut}><LogOutIcon aria-hidden="true" /> <span className="sr-only">{isLoggingOut ? "Keluar..." : "Keluar"}</span></Button>
            </div>
          </div>
          <nav aria-label="Navigasi engineer" className="overflow-x-auto border-t document-rule lg:hidden">
            <div className="flex min-w-max gap-1 px-5 py-2 sm:px-8">
              {items.map((item) => <MobileLink key={item.href} item={item} active={isActive(pathname, item)} />)}
            </div>
          </nav>
        </header>
        <main id="main-content" className="mx-auto w-full max-w-[100rem] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">{children}</main>
      </div>
    </div>
  );
}

function RailLink({ item, active }: { item: NavigationItem; active: boolean }) {
  const Icon = item.icon;
  return <Link href={item.href} aria-label={item.label} aria-current={active ? "page" : undefined} className={`group relative mx-auto flex size-10 items-center justify-center rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "bg-background text-foreground" : "text-background/70 hover:bg-background/10 hover:text-background"}`}><Icon aria-hidden="true" className="size-[1.1rem]" /><Tooltip label={item.label} /></Link>;
}

function MobileLink({ item, active }: { item: NavigationItem; active: boolean }) {
  const Icon = item.icon;
  return <Link href={item.href} aria-current={active ? "page" : undefined} className={`inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><Icon aria-hidden="true" className="size-4" />{item.label}</Link>;
}

function Tooltip({ label }: { label: string }) {
  return <span role="tooltip" className="pointer-events-none absolute left-[calc(100%+0.85rem)] z-40 w-max rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{label}</span>;
}

function isActive(pathname: string, item: NavigationItem) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}
