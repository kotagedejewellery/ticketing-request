"use client";

import { PlusIcon, UsersRoundIcon, WrenchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EngineerSession } from "@/components/auth/login-dialog";

type ManagedSystem = { id: string; name: string; active: boolean };
type ManagedUser = { id: string; username: string; name: string; role: "admin" | "engineer"; active: boolean };

export function AdminManagement({ user }: { user: EngineerSession }) {
  const [systems, setSystems] = useState<ManagedSystem[]>([]);
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const [systemsResponse, usersResponse] = await Promise.all([fetch("/api/admin/systems"), fetch("/api/admin/users")]);
      const systemsPayload = await systemsResponse.json() as { systems?: ManagedSystem[]; message?: string };
      const usersPayload = await usersResponse.json() as { users?: ManagedUser[]; message?: string };
      if (!systemsResponse.ok || !usersResponse.ok) throw new Error(systemsPayload.message ?? usersPayload.message ?? "Data administrasi belum dapat dimuat.");
      setSystems(systemsPayload.systems ?? []);
      setUsers(usersPayload.users ?? []);
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Data administrasi belum dapat dimuat.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const addSystem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/systems", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("systemName") }) });
    if (!response.ok) { const payload = await response.json().catch(() => undefined) as { message?: string } | undefined; setMessage(payload?.message ?? "Sistem belum dapat ditambahkan."); return; }
    event.currentTarget.reset();
    await load();
  };

  const updateSystem = async (systemId: string, patch: Partial<Pick<ManagedSystem, "active">>) => {
    const response = await fetch(`/api/admin/systems/${encodeURIComponent(systemId)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    if (!response.ok) { const payload = await response.json().catch(() => undefined) as { message?: string } | undefined; setMessage(payload?.message ?? "Sistem belum dapat diperbarui."); return; }
    await load();
  };

  const addUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    if (!response.ok) { const payload = await response.json().catch(() => undefined) as { message?: string } | undefined; setMessage(payload?.message ?? "User engineer belum dapat ditambahkan."); return; }
    event.currentTarget.reset();
    await load();
  };

  const updateUser = async (userId: string, patch: Partial<Pick<ManagedUser, "role" | "active">>) => {
    const response = await fetch(`/api/admin/users/${encodeURIComponent(userId)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    if (!response.ok) { const payload = await response.json().catch(() => undefined) as { message?: string } | undefined; setMessage(payload?.message ?? "User engineer belum dapat diperbarui."); return; }
    await load();
  };

  if (user.role !== "admin") return null;

  return (
    <section aria-labelledby="admin-management-title" className="mt-10 border-t border-border pt-8">
      <div><h2 id="admin-management-title" className="text-xl font-semibold tracking-[-0.02em]">Pengelolaan engineer</h2><p className="mt-1 text-sm text-muted-foreground">Daftar ini terpisah dari requester dan disimpan pada spreadsheet internal.</p></div>
      {message ? <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{message}</p> : null}
      {isLoading ? <p role="status" className="mt-5 text-sm text-muted-foreground">Memuat pengelolaan internal...</p> : <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="system-management-title">
          <div className="flex items-center gap-2"><WrenchIcon aria-hidden="true" className="size-4" /><h3 id="system-management-title" className="font-semibold">Sistem pada form</h3></div>
          <form onSubmit={addSystem} className="mt-4 flex flex-col gap-3 sm:flex-row"><Label htmlFor="system-name" className="sr-only">Nama sistem</Label><Input id="system-name" name="systemName" placeholder="Contoh: HRIS" className="h-12" required /><Button type="submit" className="h-12 shrink-0"><PlusIcon aria-hidden="true" /> Tambah</Button></form>
          <div className="mt-5 divide-y divide-border border-y border-border">{systems.map((system) => <div key={system.id} className="flex items-center justify-between gap-3 py-3"><p className={system.active ? "font-medium" : "text-muted-foreground line-through"}>{system.name}</p><Button type="button" variant="outline" size="sm" className="h-10" onClick={() => void updateSystem(system.id, { active: !system.active })}>{system.active ? "Nonaktifkan" : "Aktifkan"}</Button></div>)}</div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="user-management-title">
          <div className="flex items-center gap-2"><UsersRoundIcon aria-hidden="true" className="size-4" /><h3 id="user-management-title" className="font-semibold">User engineer</h3></div>
          <form onSubmit={addUser} className="mt-4 grid gap-3 sm:grid-cols-2"><Field id="user-name" name="name" label="Nama" /><Field id="user-username" name="username" label="Username" /><label className="grid gap-2 text-sm font-medium">Role<select name="role" className="h-12 rounded-xl border border-input bg-background px-3 text-base font-normal"><option value="engineer">Engineer</option><option value="admin">Admin</option></select></label><Field id="user-password" name="password" label="Password awal" type="password" minLength={12} /><Button type="submit" className="h-12 sm:col-span-2"><PlusIcon aria-hidden="true" /> Tambah user engineer</Button></form>
          <div className="mt-5 divide-y divide-border border-y border-border">{users.map((managedUser) => <div key={managedUser.id} className="grid gap-3 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-center"><div><p className="font-medium">{managedUser.name}</p><p className="font-mono text-xs text-muted-foreground">{managedUser.username}</p></div><label className="sr-only" htmlFor={`role-${managedUser.id}`}>Role {managedUser.name}</label><select id={`role-${managedUser.id}`} value={managedUser.role} onChange={(event) => void updateUser(managedUser.id, { role: event.target.value as ManagedUser["role"] })} className="h-10 rounded-xl border border-input bg-background px-2 text-sm"><option value="engineer">Engineer</option><option value="admin">Admin</option></select><Button type="button" variant="outline" size="sm" className="h-10" onClick={() => void updateUser(managedUser.id, { active: !managedUser.active })}>{managedUser.active ? "Nonaktifkan" : "Aktifkan"}</Button></div>)}</div>
        </section>
      </div>}
    </section>
  );
}

function Field({ id, name, label, type = "text", minLength }: { id: string; name: string; label: string; type?: string; minLength?: number }) {
  return <div className="grid gap-2"><Label htmlFor={id}>{label}</Label><Input id={id} name={name} type={type} minLength={minLength} className="h-12" required /></div>;
}
