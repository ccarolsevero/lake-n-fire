"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { registerCustomerAction } from "@/lib/actions";

function CadastroForm() {
  const error = useSearchParams().get("error");

  return (
    <main className="pt-28 pb-20">
      <div className="section-pad">
        <div className="container-site mx-auto max-w-lg">
          <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Conta</p>
          <h1 className="mt-3 font-display text-4xl font-medium">Cadastro Lake</h1>
          <p className="mt-2 text-sm text-bark/60">Crie sua conta e aproveite nossos pratos.</p>

          <form
            className="mt-8 space-y-4 border border-ink/10 bg-paper p-6"
            action={registerCustomerAction}
          >
            <label className="block text-sm">
              Nome completo *
              <input name="name" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            <label className="block text-sm">
              Telefone *
              <input name="phone" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            <label className="block text-sm">
              Email *
              <input name="email" type="email" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            <label className="block text-sm">
              Endereço *
              <input name="address" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            <label className="block text-sm">
              CPF *
              <input name="cpf" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            <label className="block text-sm">
              Senha *
              <input name="password" type="password" required minLength={6} className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            <label className="block text-sm">
              Confirmar senha *
              <input name="confirm" type="password" required minLength={6} className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
            </label>
            {error ? <p className="text-sm text-ember">{error}</p> : null}
            <button type="submit" className="btn-primary w-full">
              Criar conta
            </button>
          </form>
          <p className="mt-4 text-sm text-bark/60">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-ember hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function CadastroPage() {
  return (
    <Suspense>
      <CadastroForm />
    </Suspense>
  );
}
