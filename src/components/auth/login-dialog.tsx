"use client";

import { LogInIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type EngineerSession = {
  id: string;
  username: string;
  name: string;
  role: "admin" | "engineer";
};

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: EngineerSession) => void;
};

export function LoginDialog({ open, onOpenChange, onSuccess }: LoginDialogProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const payload = await response.json().catch(() => undefined) as { user?: EngineerSession; message?: string } | undefined;
      if (!response.ok || !payload?.user) throw new Error(payload?.message ?? "Login belum dapat diproses.");
      setPassword("");
      onSuccess(payload.user);
      onOpenChange(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Login belum dapat diproses.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0">
        <DialogHeader className="border-b border-border p-5 sm:p-6">
          <DialogTitle>Masuk sebagai engineer</DialogTitle>
          <DialogDescription>Gunakan akun engineer yang dikelola administrator software engineering.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-5 p-5 sm:p-6">
          <div className="grid gap-2"><Label htmlFor="engineer-username">Username</Label><Input id="engineer-username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} className="h-12" required /></div>
          <div className="grid gap-2"><Label htmlFor="engineer-password">Password</Label><Input id="engineer-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12" required /></div>
          {error ? <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p> : null}
          <Button type="submit" size="lg" className="h-12" disabled={isSubmitting}><LogInIcon aria-hidden="true" /> {isSubmitting ? "Memeriksa akun..." : "Masuk ke dashboard"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
