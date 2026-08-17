"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createReservationAction } from "@/lib/actions";
import { SITE } from "@/lib/site";

function ReservaForm() {
  const search = useSearchParams();
  const ok = search.get("ok") === "1";
  const error = search.get("error");

  return (
    <main className="pt-24 pb-20">
      <div className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
              Reservas
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium">
              Sua mesa no Lake.
            </h1>
            <p className="mt-4 max-w-md text-bark/70">
              Preencha os dados. A casa confirma a mesa pelo painel e, se
              preferir, também pelo WhatsApp. Pet friendly.
            </p>
            <p className="mt-6 text-sm text-bark/60">
              {SITE.address}
              <br />
              {SITE.city}
              <br />
              {SITE.phone}
            </p>
          </div>

          <form
            className="space-y-4 border border-ink/10 bg-paper p-6 sm:p-8"
            action={createReservationAction}
          >
            <label className="block text-sm">
              Nome completo
              <input
                required
                name="nome"
                className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember"
              />
            </label>
            <label className="block text-sm">
              WhatsApp
              <input
                required
                name="telefone"
                placeholder="(19) 99999-0000"
                className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                Data
                <input
                  required
                  type="date"
                  name="data"
                  className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember"
                />
              </label>
              <label className="block text-sm">
                Horário
                <input
                  required
                  type="time"
                  name="horario"
                  className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember"
                />
              </label>
            </div>
            <label className="block text-sm">
              Número de pessoas
              <input
                required
                type="number"
                min={1}
                max={20}
                name="pessoas"
                defaultValue={2}
                className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember"
              />
            </label>
            <label className="block text-sm">
              Observações
              <textarea
                name="obs"
                rows={3}
                placeholder="Aniversário, pet, preferência de mesa..."
                className="mt-1.5 w-full border border-ink/12 bg-cream px-3 py-2 outline-none focus:border-ember"
              />
            </label>
            {error ? <p className="text-sm text-ember">{error}</p> : null}
            {ok ? (
              <p className="text-sm text-ember">
                Reserva enviada. Aguarde a confirmação da casa.
              </p>
            ) : null}
            <button type="submit" className="btn-primary w-full">
              Enviar reserva
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function ReservasPage() {
  return (
    <Suspense>
      <ReservaForm />
    </Suspense>
  );
}
