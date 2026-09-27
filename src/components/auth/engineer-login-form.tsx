"use client";

import { LogInIcon } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SessionUser } from "@/lib/domain/auth";

export type EngineerSession = SessionUser;

export function EngineerLoginForm({ onSuccess }: { onSuccess: (user: EngineerSession) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const payload = await response.json().catch(() => undefined) as { user?: EngineerSession; message?: string } | undefined;
      if (!response.ok || !payload?.user) throw new Error(payload?.message ?? "Login belum dapat diproses.");
      setPassword("");
      onSuccess(payload.user);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Login belum dapat diproses.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-2"><Label htmlFor="engineer-username">Username</Label><Input id="engineer-username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} className="h-12" required disabled={isSubmitting} /></div>
      <div className="grid gap-2"><Label htmlFor="engineer-password">Password</Label><Input id="engineer-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12" required disabled={isSubmitting} /></div>
      {error ? <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p> : null}
      <Button type="submit" size="lg" className="h-12" disabled={isSubmitting}><LogInIcon aria-hidden="true" /> {isSubmitting ? "Memeriksa akun..." : "Masuk ke dashboard"}</Button>
    </form>
  );
}
