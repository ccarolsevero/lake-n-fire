import { AdminNav } from "@/components/admin/AdminNav";
import { updateOrderStatusAction } from "@/lib/actions";
import { NEXT_ORDER_STATUS, ORDER_STATUS_LABEL, formatPrice } from "@/lib/format";
import { prisma } from "@/lib/db";

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <>
      <AdminNav current="/admin/pedidos" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Pedidos</p>
        <h1 className="mt-2 font-display text-4xl font-medium">Fila da casa</h1>

        <div className="mt-8 space-y-4">
          {orders.length === 0 ? (
            <p className="border border-ink/10 bg-paper p-6 text-sm text-bark/55">Nenhum pedido ainda.</p>
          ) : (
            orders.map((order) => {
              const next = NEXT_ORDER_STATUS[order.status];
              return (
                <article key={order.id} className="border border-ink/10 bg-paper p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] tracking-[0.16em] text-ember uppercase">
                        {order.channel === "EMPORIO" ? "Empório" : "Restaurante"} · {ORDER_STATUS_LABEL[order.status]}
                      </p>
                      <h2 className="mt-1 font-display text-2xl">{order.customerName}</h2>
                      <p className="text-sm text-bark/60">{order.customerPhone}</p>
                      <p className="mt-1 text-xs text-bark/45">
                        {order.createdAt.toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <p className="font-medium tabular-nums">{formatPrice(order.total)}</p>
                  </div>
                  <ul className="mt-4 space-y-1 text-sm">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.qty}x {item.name} — {formatPrice(item.price * item.qty)}
                      </li>
                    ))}
                  </ul>
                  {order.notes ? (
                    <p className="mt-3 text-sm italic text-bark/60">{order.notes}</p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {next ? (
                      <form action={updateOrderStatusAction}>
                        <input type="hidden" name="id" value={order.id} />
                        <input type="hidden" name="status" value={next} />
                        <button type="submit" className="btn-primary h-9 px-4 text-[0.7rem]">
                          Marcar como {ORDER_STATUS_LABEL[next]}
                        </button>
                      </form>
                    ) : null}
                    {order.status !== "CANCELADO" && order.status !== "ENTREGUE" ? (
                      <form action={updateOrderStatusAction}>
                        <input type="hidden" name="id" value={order.id} />
                        <input type="hidden" name="status" value="CANCELADO" />
                        <button type="submit" className="h-9 border border-ink/12 px-3 text-xs hover:border-ember">
                          Cancelar
                        </button>
                      </form>
                    ) : null}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
