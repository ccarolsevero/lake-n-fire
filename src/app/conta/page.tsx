import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutCustomerAction } from "@/lib/actions";
import { getCustomerId } from "@/lib/auth";
import { ORDER_STATUS_LABEL, RESERVATION_STATUS_LABEL, formatPrice } from "@/lib/format";
import { prisma } from "@/lib/db";

export default async function ContaPage({
  searchParams,
}: {
  searchParams: Promise<{ pedido?: string }>;
}) {
  const customerId = await getCustomerId();
  if (!customerId) redirect("/login?next=/conta");

  const { pedido } = await searchParams;
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      orders: { orderBy: { createdAt: "desc" }, include: { items: true } },
      reservations: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!customer) redirect("/login?next=/conta");

  return (
    <main className="pt-28 pb-20">
      <div className="section-pad">
        <div className="container-site">
          <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Minha conta</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-medium">{customer.name}</h1>
              <p className="mt-1 text-sm text-bark/60">{customer.email} · {customer.phone}</p>
            </div>
            <form action={logoutCustomerAction}>
              <button type="submit" className="btn-ghost">Sair</button>
            </form>
          </div>

          {pedido === "ok" ? (
            <p className="mt-6 border border-ember/30 bg-ember/10 px-4 py-3 text-sm">
              Pedido enviado. Acompanhe o status abaixo.
            </p>
          ) : null}

          <h2 className="mt-12 font-display text-2xl">Pedidos</h2>
          <div className="mt-4 space-y-3">
            {customer.orders.length === 0 ? (
              <p className="text-sm text-bark/55">
                Nenhum pedido ainda. <Link href="/pedidos" className="text-ember">Fazer pedido</Link>
              </p>
            ) : (
              customer.orders.map((order) => (
                <article key={order.id} className="border border-ink/10 bg-paper p-5">
                  <p className="text-[0.65rem] tracking-[0.16em] text-ember uppercase">
                    {ORDER_STATUS_LABEL[order.status]} · {order.channel === "EMPORIO" ? "Empório" : "Restaurante"}
                  </p>
                  <p className="mt-1 text-sm text-bark/55">
                    {order.createdAt.toLocaleString("pt-BR")} · {formatPrice(order.total)}
                  </p>
                  <ul className="mt-3 text-sm">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.qty}x {item.name}
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            )}
          </div>

          <h2 className="mt-12 font-display text-2xl">Reservas</h2>
          <div className="mt-4 space-y-3">
            {customer.reservations.length === 0 ? (
              <p className="text-sm text-bark/55">
                Nenhuma reserva. <Link href="/reservas" className="text-ember">Reservar mesa</Link>
              </p>
            ) : (
              customer.reservations.map((item) => (
                <article key={item.id} className="border border-ink/10 bg-paper p-5">
                  <p className="text-[0.65rem] tracking-[0.16em] text-ember uppercase">
                    {RESERVATION_STATUS_LABEL[item.status]}
                  </p>
                  <p className="mt-1">
                    {item.date} às {item.time} · {item.partySize} pessoas
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
