import { notFound } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { getCatalog } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export default async function EditCategoriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCatalog().find((item) => item.id === id);
  if (!category) notFound();

  return (
    <>
      <AdminNav current="/admin/cardapio" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
          {category.channel === "EMPORIO" ? "Empório" : "Restaurante"}
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium">{category.title}</h1>
        <p className="mt-3 text-sm text-bark/60">
          Cardápio estático. A edição volta quando o banco estiver no ar.
        </p>

        <div className="mt-8 divide-y divide-ink/8 border border-ink/10 bg-paper">
          {category.products.map((product) => (
            <article key={product.id} className="px-5 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-xl">{product.name}</h2>
                <p className="tabular-nums">{formatPrice(product.price)}</p>
              </div>
              {product.portion ? (
                <p className="text-xs text-bark/45">{product.portion}</p>
              ) : null}
              {product.description ? (
                <p className="mt-1 text-sm text-bark/65">{product.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
