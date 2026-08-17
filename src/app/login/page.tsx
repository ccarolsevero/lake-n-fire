"use client";

import { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginCustomerAction } from "@/lib/actions";

function LoginForm() {
  const search = useSearchParams();
  const next = search.get("next") || "/pedidos";
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <main className="pt-28 pb-20">
      <div className="section-pad">
        <div className="container-site mx-auto max-w-md">
          <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Conta</p>
          <h1 className="mt-3 font-display text-4xl font-medium">Login Lake</h1>
          <p className="mt-2 text-sm text-bark/60">Entre com sua conta para fazer pedidos.</p>

          <form
            className="mt-8 space-y-4 border border-ink/10 bg-paper p-6"
            action={(formData) => {
              startTransition(async () => {
                const result = await loginCustomerAction(formData);
                if (result && !result.ok) setError(result.error);
              });
            }}
          >
            <input type="hidden" name="next" value={next} />
            <label className="block text-sm">
              Email
              <input name="email" type="email" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            <label className="block text-sm">
              Senha
              <input name="password" type="password" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            {error ? <p className="text-sm text-ember">{error}</p> : null}
            <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
              {pending ? "Entrando…" : "Entrar"}
            </button>
          </form>
          <p className="mt-4 text-sm text-bark/60">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-ember hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
