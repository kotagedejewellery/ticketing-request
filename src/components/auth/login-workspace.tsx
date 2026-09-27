"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { EngineerLoginForm } from "@/components/auth/engineer-login-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginWorkspace() {
  const router = useRouter();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-8 sm:px-6">
      <section className="w-full max-w-md" aria-labelledby="login-title">
        <Link href="/" className={buttonVariants({ variant: "ghost", className: "mb-6 h-11" })}><ArrowLeftIcon aria-hidden="true" /> Kembali ke request</Link>
        <Card className="overflow-hidden border-border shadow-[0_16px_36px_oklch(0.28_0.055_258_/_0.08)]">
          <CardHeader className="border-b border-border p-5 sm:p-6">
            <p className="text-sm font-medium text-primary">Internal Request Hub</p>
            <CardTitle id="login-title" className="mt-2 text-2xl tracking-[-0.025em]">Masuk sebagai engineer</CardTitle>
            <CardDescription className="leading-6">Gunakan akun engineer yang dikelola administrator software engineering.</CardDescription>
          </CardHeader>
          <CardContent className="p-5 sm:p-6"><EngineerLoginForm onSuccess={() => router.replace("/engineer")} /></CardContent>
        </Card>
      </section>
    </main>
  );
}
