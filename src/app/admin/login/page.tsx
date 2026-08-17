"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAdminAction } from "@/lib/actions";

function AdminLoginForm() {
  const error = useSearchParams().get("error");

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-md border border-ink/10 bg-paper p-8">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
          Painel administrativo
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium">Entrar</h1>
        <p className="mt-2 text-sm text-bark/55">Acesso restrito à equipe Lake &apos;n Fire.</p>

        <form className="mt-8 space-y-4" action={loginAdminAction}>
          <label className="block text-sm">
            Usuário
            <input
              name="user"
              required
              autoComplete="username"
              className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember"
            />
          </label>
          <label className="block text-sm">
            Senha
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember"
            />
          </label>
          {error ? <p className="text-sm text-ember">{error}</p> : null}
          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
