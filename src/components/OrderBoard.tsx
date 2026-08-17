"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { createOrderAction } from "@/lib/actions";
import { formatPrice } from "@/lib/format";

type Product = {
  id: string;
  name: string;
  description: string;
  note: string;
  portion: string;
  price: number | null;
};

type Category = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  products: Product[];
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export function OrderBoard({
  restaurant,
  emporio,
  loggedIn,
}: {
  restaurant: Category[];
  emporio: Category[];
  loggedIn: boolean;
}) {
  const [channel, setChannel] = useState<"RESTAURANTE" | "EMPORIO">("RESTAURANTE");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const categories = channel === "RESTAURANTE" ? restaurant : emporio;

  function add(product: Product) {
    if (product.price == null) return;
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price!, qty: 1 }];
    });
  }

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  );

  return (
    <div>
      <div className="mt-8 inline-flex border border-ink/12">
        <button
          type="button"
          onClick={() => setChannel("RESTAURANTE")}
          className={`px-5 py-2.5 text-[0.72rem] tracking-[0.14em] uppercase ${
            channel === "RESTAURANTE" ? "bg-ink text-cream" : "text-bark/70"
          }`}
        >
          Restaurante
        </button>
        <button
          type="button"
          onClick={() => setChannel("EMPORIO")}
          className={`px-5 py-2.5 text-[0.72rem] tracking-[0.14em] uppercase ${
            channel === "EMPORIO" ? "bg-ink text-cream" : "text-bark/70"
          }`}
        >
          Empório
        </button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {categories.map((cat) => (
            <section key={cat.id}>
              <h2 className="border-b border-ember/40 pb-2 font-display text-2xl uppercase tracking-wide">
                {cat.title}
              </h2>
              <ul className="divide-y divide-ink/8">
                {cat.products.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-4 py-4">
                    <div>
                      <p className="font-display tracking-wide uppercase">{item.name}</p>
                      {item.description ? (
                        <p className="mt-1 max-w-lg text-sm text-bark/65">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="tabular-nums">{formatPrice(item.price)}</span>
                      <button
                        type="button"
                        disabled={item.price == null}
                        onClick={() => add(item)}
                        className="text-[0.68rem] tracking-[0.12em] text-ember uppercase hover:underline disabled:opacity-40"
                      >
                        Adicionar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="h-fit border border-ink/10 bg-paper p-5 lg:sticky lg:top-28">
          <h2 className="font-display text-xl">Seu pedido</h2>
          {cart.length === 0 ? (
            <p className="mt-3 text-sm text-bark/55">Nenhum item ainda.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span className="tabular-nums">{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-5 flex justify-between border-t border-ink/10 pt-4 font-medium">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </p>

          {!loggedIn ? (
            <Link href="/login?next=/pedidos" className="btn-primary mt-5 w-full">
              Entrar para pedir
            </Link>
          ) : (
            <form
              className="mt-5 space-y-3"
              action={(formData) => {
                formData.set("items", JSON.stringify(cart));
                formData.set("channel", channel);
                startTransition(async () => {
                  const result = await createOrderAction(formData);
                  if (result && !result.ok) setError(result.error);
                });
              }}
            >
              <textarea
                name="notes"
                rows={2}
                placeholder="Observações (ponto da carne, alergias...)"
                className="w-full border border-ink/12 bg-cream px-3 py-2 text-sm outline-none focus:border-ember"
              />
              {error ? <p className="text-sm text-ember">{error}</p> : null}
              <button
                type="submit"
                disabled={pending || cart.length === 0}
                className="btn-primary w-full disabled:opacity-50"
              >
                {pending ? "Enviando…" : "Enviar pedido"}
              </button>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
