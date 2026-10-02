"use client";

import { CheckCircle2Icon, LoaderCircleIcon, PlusIcon, Trash2Icon, UsersRoundIcon, WrenchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import type { EngineerSession } from "@/components/auth/engineer-login-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ManagedSystem = { id: string; name: string; active: boolean };
type ManagedUser = { id: string; username: string; name: string; role: "admin" | "engineer"; active: boolean };
type ActionOperation = "activate" | "deactivate" | "delete";
type ConfirmationAction = { resource: "system" | "user"; operation: ActionOperation; id: string; name: string };
type AdminSection = "systems" | "users";

async function getAdminData() {
  const [systemsResponse, usersResponse] = await Promise.all([fetch("/api/admin/systems"), fetch("/api/admin/users")]);
  const systemsPayload = await systemsResponse.json() as { systems?: ManagedSystem[]; message?: string };
  const usersPayload = await usersResponse.json() as { users?: ManagedUser[]; message?: string };
  if (!systemsResponse.ok || !usersResponse.ok) throw new Error(systemsPayload.message ?? usersPayload.message ?? "Data administrasi belum dapat dimuat.");
  return { systems: systemsPayload.systems ?? [], users: usersPayload.users ?? [] };
}

export function AdminManagement({ user, section }: { user: EngineerSession; section: AdminSection }) {
  const [systems, setSystems] = useState<ManagedSystem[]>([]);
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState<string>();
  const [confirmation, setConfirmation] = useState<ConfirmationAction>();
  const [confirmationError, setConfirmationError] = useState("");

  const load = async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    setMessage("");
    try {
      const data = await getAdminData();
      setSystems(data.systems);
      setUsers(data.users);
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Data administrasi belum dapat dimuat.");
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    void getAdminData()
      .then((data) => {
        if (!active) return;
        setSystems(data.systems);
        setUsers(data.users);
      })
      .catch((cause) => { if (active) setMessage(cause instanceof Error ? cause.message : "Data administrasi belum dapat dimuat."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const request = async (url: string, init: RequestInit, fallbackMessage: string) => {
    const response = await fetch(url, init);
    if (!response.ok) {
      const payload = await response.json().catch(() => undefined) as { message?: string } | undefined;
      throw new Error(payload?.message ?? fallbackMessage);
    }
  };

  const addSystem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("");
    setSuccessMessage("");
    setPendingAction("add-system");
    try {
      const values = new FormData(form);
      await request("/api/admin/systems", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: values.get("systemName") }) }, "Sistem belum dapat ditambahkan.");
      form.reset();
      setSuccessMessage("Sistem berhasil ditambahkan.");
      await load();
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Sistem belum dapat ditambahkan.");
    } finally {
      setPendingAction(undefined);
    }
  };

  const addUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("");
    setSuccessMessage("");
    setPendingAction("add-user");
    try {
      await request("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }, "User engineer belum dapat ditambahkan.");
      form.reset();
      setSuccessMessage("User engineer berhasil ditambahkan.");
      await load();
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "User engineer belum dapat ditambahkan.");
    } finally {
      setPendingAction(undefined);
    }
  };

  const updateUserRole = async (managedUser: ManagedUser, role: ManagedUser["role"]) => {
    const actionKey = `user-role-${managedUser.id}`;
    setMessage("");
    setSuccessMessage("");
    setPendingAction(actionKey);
    try {
      await request(`/api/admin/users/${encodeURIComponent(managedUser.id)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role }) }, "Role user engineer belum dapat diperbarui.");
      setSuccessMessage(`Role ${managedUser.name} berhasil diperbarui.`);
      await load();
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Role user engineer belum dapat diperbarui.");
    } finally {
      setPendingAction(undefined);
    }
  };

  const openConfirmation = (action: ConfirmationAction) => {
    setConfirmationError("");
    setConfirmation(action);
  };

  const confirmAction = async () => {
    if (!confirmation) return;

    const action = confirmation;
    const actionKey = `${action.resource}-${action.operation}-${action.id}`;
    const endpoint = action.resource === "system" ? "/api/admin/systems" : "/api/admin/users";
    const fallbackMessage = action.resource === "system" ? "Sistem belum dapat diperbarui." : "User engineer belum dapat diperbarui.";
    setConfirmationError("");
    setPendingAction(actionKey);
    try {
      await request(
        `${endpoint}/${encodeURIComponent(action.id)}`,
        action.operation === "delete"
          ? { method: "DELETE" }
          : { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: action.operation === "activate" }) },
        action.operation === "delete" ? fallbackMessage.replace("diperbarui", "dihapus") : fallbackMessage,
      );
      setConfirmation(undefined);
      setSuccessMessage(getActionCopy(action).successMessage);
      await load();
    } catch (cause) {
      setConfirmationError(cause instanceof Error ? cause.message : "Aksi belum dapat diproses.");
    } finally {
      setPendingAction(undefined);
    }
  };

  if (user.role !== "admin") return null;

  const isBusy = isLoading || Boolean(pendingAction);
  const isAddingSystem = pendingAction === "add-system";
  const isAddingUser = pendingAction === "add-user";

  return (
    <section aria-labelledby="admin-management-title">
      <div><h1 id="admin-management-title" className="document-title text-balance text-4xl sm:text-5xl">{section === "systems" ? "Sistem form." : "User engineer."}</h1><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{section === "systems" ? "Kelola pilihan sistem yang tersedia pada formulir request." : "Kelola akun, peran, dan status akses engineer."}</p></div>
      <div className="mt-4 grid gap-3" aria-live="polite">
        {message ? <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{message}</p> : null}
        {successMessage ? <p role="status" className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 p-3 text-sm text-success-foreground"><CheckCircle2Icon aria-hidden="true" className="size-4" />{successMessage}</p> : null}
      </div>
      {isLoading ? <p role="status" className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircleIcon aria-hidden="true" className="size-4 animate-spin" /> Memuat pengelolaan internal...</p> : <div className="mt-8" aria-busy={Boolean(pendingAction)}>
        {section === "systems" ? <section className="border-y document-rule py-6" aria-labelledby="system-management-title">
          <div className="flex items-center gap-2"><WrenchIcon aria-hidden="true" className="size-4" /><h3 id="system-management-title" className="font-semibold">Sistem pada form</h3></div>
          <form onSubmit={addSystem} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Label htmlFor="system-name" className="sr-only">Nama sistem</Label>
            <Input id="system-name" name="systemName" placeholder="Contoh: HRIS" className="h-12" required disabled={isBusy} />
            <Button type="submit" className="h-12 shrink-0" disabled={isBusy}><AddActionIcon pending={isAddingSystem} /> {isAddingSystem ? "Menambah..." : "Tambah"}</Button>
          </form>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {systems.length ? systems.map((system) => <div key={system.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><p className={system.active ? "min-w-0 break-words font-medium" : "min-w-0 break-words text-muted-foreground line-through"}>{system.name}</p><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" size="sm" className="h-10" disabled={isBusy} onClick={() => openConfirmation({ resource: "system", operation: system.active ? "deactivate" : "activate", id: system.id, name: system.name })}>{system.active ? "Nonaktifkan" : "Aktifkan"}</Button><Button type="button" variant="destructive" size="sm" className="h-10" disabled={isBusy} onClick={() => openConfirmation({ resource: "system", operation: "delete", id: system.id, name: system.name })}><Trash2Icon aria-hidden="true" /> Hapus</Button></div></div>) : <p className="py-4 text-sm text-muted-foreground">Belum ada sistem yang dapat dikelola.</p>}
          </div>
        </section> : null}

        {section === "users" ? <section className="border-y document-rule py-6" aria-labelledby="user-management-title">
          <div className="flex items-center gap-2"><UsersRoundIcon aria-hidden="true" className="size-4" /><h3 id="user-management-title" className="font-semibold">User engineer</h3></div>
          <form onSubmit={addUser} className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field id="user-name" name="name" label="Nama" disabled={isBusy} />
            <Field id="user-username" name="username" label="Username" disabled={isBusy} />
            <label className="grid gap-2 text-sm font-medium">Role<select name="role" disabled={isBusy} className="h-12 rounded-xl border border-input bg-background px-3 text-base font-normal disabled:cursor-not-allowed disabled:opacity-50"><option value="engineer">Engineer</option><option value="admin">Admin</option></select></label>
            <Field id="user-password" name="password" label="Password awal" type="password" minLength={12} disabled={isBusy} />
            <Button type="submit" className="h-12 sm:col-span-2" disabled={isBusy}><AddActionIcon pending={isAddingUser} /> {isAddingUser ? "Menambah user..." : "Tambah user engineer"}</Button>
          </form>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {users.length ? users.map((managedUser) => {
              const isChangingRole = pendingAction === `user-role-${managedUser.id}`;
              return <div key={managedUser.id} className="grid gap-3 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"><div className="min-w-0"><p className="break-words font-medium">{managedUser.name}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{managedUser.username} Â· {managedUser.active ? "Aktif" : "Nonaktif"}</p></div><div className="flex flex-wrap items-center gap-2"><label className="sr-only" htmlFor={`role-${managedUser.id}`}>Role {managedUser.name}</label><select id={`role-${managedUser.id}`} value={managedUser.role} disabled={isBusy} onChange={(event) => void updateUserRole(managedUser, event.target.value as ManagedUser["role"])} className="h-10 rounded-xl border border-input bg-background px-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"><option value="engineer">Engineer</option><option value="admin">Admin</option></select>{isChangingRole ? <LoaderCircleIcon aria-label="Memperbarui role" className="size-4 animate-spin text-muted-foreground" /> : null}<Button type="button" variant="outline" size="sm" className="h-10" disabled={isBusy} onClick={() => openConfirmation({ resource: "user", operation: managedUser.active ? "deactivate" : "activate", id: managedUser.id, name: managedUser.name })}>{managedUser.active ? "Nonaktifkan" : "Aktifkan"}</Button>{managedUser.id !== user.id ? <Button type="button" variant="destructive" size="sm" className="h-10" disabled={isBusy} onClick={() => openConfirmation({ resource: "user", operation: "delete", id: managedUser.id, name: managedUser.name })}><Trash2Icon aria-hidden="true" /> Hapus</Button> : null}</div></div>;
            }) : <p className="py-4 text-sm text-muted-foreground">Belum ada user engineer yang dapat dikelola.</p>}
          </div>
        </section> : null}
      </div>}
      <ActionConfirmationDialog action={confirmation} error={confirmationError} isSubmitting={Boolean(pendingAction)} onCancel={() => setConfirmation(undefined)} onConfirm={() => void confirmAction()} />
    </section>
  );
}

function ActionConfirmationDialog({ action, error, isSubmitting, onCancel, onConfirm }: { action?: ConfirmationAction; error: string; isSubmitting: boolean; onCancel: () => void; onConfirm: () => void }) {
  if (!action) return null;
  const copy = getActionCopy(action);

  return <Dialog open onOpenChange={(open) => { if (!open && !isSubmitting) onCancel(); }}><DialogContent showCloseButton={!isSubmitting} className="p-0"><DialogHeader className="border-b border-border p-5 pr-12"><DialogTitle>{copy.title}</DialogTitle><DialogDescription>{copy.description}</DialogDescription></DialogHeader><div className="grid gap-3 p-5">{error ? <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p> : null}{action.operation === "delete" ? <p className="text-sm text-muted-foreground">Data yang dihapus tidak dapat dikembalikan.</p> : null}</div><DialogFooter><Button type="button" variant="outline" disabled={isSubmitting} onClick={onCancel}>Batal</Button><Button type="button" variant={action.operation === "delete" ? "destructive" : "default"} disabled={isSubmitting} onClick={onConfirm}>{isSubmitting ? <LoaderCircleIcon aria-hidden="true" className="animate-spin" /> : null} {isSubmitting ? "Memproses..." : copy.confirmLabel}</Button></DialogFooter></DialogContent></Dialog>;
}

function getActionCopy(action: ConfirmationAction) {
  const resourceLabel = action.resource === "system" ? "sistem" : "user engineer";
  if (action.operation === "delete") return { title: `Hapus ${resourceLabel}?`, description: `Anda akan menghapus ${action.name}.`, confirmLabel: "Hapus", successMessage: `${action.name} berhasil dihapus.` };
  const verb = action.operation === "activate" ? "Aktifkan" : "Nonaktifkan";
  return { title: `${verb} ${resourceLabel}?`, description: `Anda akan ${verb.toLowerCase()} ${action.name}.`, confirmLabel: verb, successMessage: `${action.name} berhasil ${action.operation === "activate" ? "diaktifkan" : "dinonaktifkan"}.` };
}

function AddActionIcon({ pending }: { pending: boolean }) {
  return pending ? <LoaderCircleIcon aria-hidden="true" className="animate-spin" /> : <PlusIcon aria-hidden="true" />;
}

function Field({ id, name, label, type = "text", minLength, disabled }: { id: string; name: string; label: string; type?: string; minLength?: number; disabled?: boolean }) {
  return <div className="grid gap-2"><Label htmlFor={id}>{label}</Label><Input id={id} name={name} type={type} minLength={minLength} className="h-12" required disabled={disabled} /></div>;
}
