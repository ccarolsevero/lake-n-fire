import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";

export default async function AdminDashboardPage() {
  const [categories, products, orders, pendingReservations, customers] =
    await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.order.count({ where: { status: { not: "CANCELADO" } } }),
      prisma.reservation.count({ where: { status: "PENDENTE" } }),
      prisma.customer.count(),
    ]);

  const latestOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  const cards = [
    { label: "Categorias", value: categories, href: "/admin/cardapio" },
    { label: "Itens", value: products, href: "/admin/cardapio" },
    { label: "Pedidos abertos", value: orders, href: "/admin/pedidos" },
    { label: "Reservas pendentes", value: pendingReservations, href: "/admin/reservas" },
    { label: "Clientes", value: customers, href: "/admin/clientes" },
  ];

  return (
    <>
      <AdminNav current="/admin" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Dashboard</p>
        <h1 className="mt-2 font-display text-4xl font-medium">Operação do Lake</h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="border border-ink/10 bg-paper p-5 hover:border-ember/50"
            >
              <p className="text-xs tracking-[0.16em] text-bark/50 uppercase">{card.label}</p>
              <p className="mt-2 font-display text-3xl">{card.value}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl">Últimos pedidos</h2>
        <div className="mt-4 divide-y divide-ink/8 border border-ink/10 bg-paper">
          {latestOrders.length === 0 ? (
            <p className="p-5 text-sm text-bark/55">Nenhum pedido ainda.</p>
          ) : (
            latestOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                <div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-bark/55">
                    {order.channel === "EMPORIO" ? "Empório" : "Restaurante"} · {order.items.length} itens
                  </p>
                </div>
                <div className="text-right">
                  <p>{formatPrice(order.total)}</p>
                  <p className="text-bark/50">{order.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
