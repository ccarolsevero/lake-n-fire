import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { getCatalog } from "@/lib/catalog";

export default function AdminCardapioPage() {
  const categories = getCatalog();

  return (
    <>
      <AdminNav current="/admin/cardapio" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Cardápio</p>
            <h1 className="mt-2 font-display text-4xl font-medium">Categorias e produtos</h1>
            <p className="mt-2 text-sm text-bark/55">
              Leitura do cardápio estático. Edição volta com o banco.
            </p>
          </div>
          <Link href="/admin/cardapio/nova" className="btn-primary">
            Nova categoria
          </Link>
        </div>

        <div className="mt-8 divide-y divide-ink/8 border border-ink/10 bg-paper">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-[0.65rem] tracking-[0.16em] text-ember uppercase">
                  {cat.channel === "EMPORIO" ? "Empório" : "Restaurante"}
                </p>
                <h2 className="font-display text-xl">{cat.title}</h2>
                <p className="text-sm text-bark/55">
                  {cat.products.length} itens
                </p>
              </div>
              <Link
                href={`/admin/cardapio/${cat.id}`}
                className="border border-ink/12 px-3 py-1.5 text-sm hover:border-ember"
              >
                Ver
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
