import { AdminNav } from "@/components/admin/AdminNav";
import { prisma } from "@/lib/db";

export default async function AdminClientesPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true, reservations: true } } },
  });

  return (
    <>
      <AdminNav current="/admin/clientes" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Clientes</p>
        <h1 className="mt-2 font-display text-4xl font-medium">Contas</h1>
        <div className="mt-8 divide-y divide-ink/8 border border-ink/10 bg-paper">
          {customers.length === 0 ? (
            <p className="p-6 text-sm text-bark/55">Nenhum cadastro ainda.</p>
          ) : (
            customers.map((customer) => (
              <div key={customer.id} className="px-5 py-4">
                <h2 className="font-medium">{customer.name}</h2>
                <p className="text-sm text-bark/60">
                  {customer.email} · {customer.phone}
                </p>
                <p className="text-sm text-bark/50">{customer.address}</p>
                <p className="mt-1 text-xs text-bark/45">
                  {customer._count.orders} pedidos · {customer._count.reservations} reservas
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
