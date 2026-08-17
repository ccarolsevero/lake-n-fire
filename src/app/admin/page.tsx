import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { getCatalog } from "@/lib/catalog";

export default function AdminDashboardPage() {
  const categories = getCatalog();
  const products = categories.reduce((sum, cat) => sum + cat.products.length, 0);

  const cards = [
    { label: "Categorias", value: categories.length, href: "/admin/cardapio" },
    { label: "Itens", value: products, href: "/admin/cardapio" },
    { label: "Pedidos abertos", value: 0, href: "/admin/pedidos" },
    { label: "Reservas pendentes", value: 0, href: "/admin/reservas" },
    { label: "Clientes", value: 0, href: "/admin/clientes" },
  ];

  return (
    <>
      <AdminNav current="/admin" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Dashboard</p>
        <h1 className="mt-2 font-display text-4xl font-medium">Operação do Lake</h1>
        <p className="mt-3 max-w-xl text-sm text-bark/60">
          Cardápio no ar com dados estáticos. Pedidos, reservas e clientes voltam
          quando o banco estiver ligado.
        </p>
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
      </main>
    </>
  );
}
