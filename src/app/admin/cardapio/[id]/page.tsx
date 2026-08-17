import { notFound } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import {
  deleteProductAction,
  saveCategoryAction,
  saveProductAction,
  toggleProductAction,
} from "@/lib/actions";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";

export default async function EditCategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const category = await prisma.category.findUnique({
    where: { id },
    include: { products: { orderBy: { sortOrder: "asc" } } },
  });
  if (!category) notFound();

  return (
    <>
      <AdminNav current="/admin/cardapio" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-4xl font-medium">Editar categoria</h1>
        {error ? <p className="mt-4 text-sm text-ember">{error}</p> : null}
        <form action={saveCategoryAction} className="mt-8 grid gap-4 border border-ink/10 bg-paper p-6 sm:grid-cols-2">
          <input type="hidden" name="id" value={category.id} />
          <label className="block text-sm">
            Título
            <input name="title" defaultValue={category.title} required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <label className="block text-sm">
            Slug
            <input name="slug" defaultValue={category.slug} className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <label className="block text-sm sm:col-span-2">
            Subtítulo
            <input name="subtitle" defaultValue={category.subtitle} className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <label className="block text-sm">
            Canal
            <select name="channel" defaultValue={category.channel} className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember">
              <option value="RESTAURANTE">Restaurante</option>
              <option value="EMPORIO">Empório</option>
            </select>
          </label>
          <label className="block text-sm">
            Ordem
            <input name="sortOrder" type="number" defaultValue={category.sortOrder} className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">Salvar categoria</button>
          </div>
        </form>

        <h2 className="mt-12 font-display text-2xl">Produtos</h2>
        <div className="mt-4 divide-y divide-ink/8 border border-ink/10 bg-paper">
          {category.products.map((product) => (
            <form key={product.id} action={saveProductAction} className="grid gap-3 px-5 py-5 sm:grid-cols-12">
              <input type="hidden" name="id" value={product.id} />
              <input type="hidden" name="categoryId" value={category.id} />
              <label className="block text-xs sm:col-span-4">
                Nome
                <input name="name" defaultValue={product.name} required className="mt-1 h-10 w-full border border-ink/12 bg-cream px-2 text-sm outline-none focus:border-ember" />
              </label>
              <label className="block text-xs sm:col-span-2">
                Preço
                <input name="price" defaultValue={product.price ?? ""} className="mt-1 h-10 w-full border border-ink/12 bg-cream px-2 text-sm outline-none focus:border-ember" />
              </label>
              <label className="block text-xs sm:col-span-2">
                Porção
                <input name="portion" defaultValue={product.portion} className="mt-1 h-10 w-full border border-ink/12 bg-cream px-2 text-sm outline-none focus:border-ember" />
              </label>
              <label className="block text-xs sm:col-span-2">
                Ordem
                <input name="sortOrder" type="number" defaultValue={product.sortOrder} className="mt-1 h-10 w-full border border-ink/12 bg-cream px-2 text-sm outline-none focus:border-ember" />
              </label>
              <label className="flex items-end gap-2 text-xs sm:col-span-2">
                <input type="checkbox" name="available" defaultChecked={product.available} className="mb-3" />
                Disponível {product.available ? "" : `(oculto · ${formatPrice(product.price)})`}
              </label>
              <label className="block text-xs sm:col-span-8">
                Descrição
                <textarea name="description" defaultValue={product.description} rows={2} className="mt-1 w-full border border-ink/12 bg-cream px-2 py-1 text-sm outline-none focus:border-ember" />
              </label>
              <label className="block text-xs sm:col-span-4">
                Nota
                <input name="note" defaultValue={product.note} className="mt-1 h-10 w-full border border-ink/12 bg-cream px-2 text-sm outline-none focus:border-ember" />
              </label>
              <div className="flex flex-wrap gap-2 sm:col-span-12">
                <button type="submit" className="btn-primary h-9 px-4 text-[0.7rem]">
                  Salvar item
                </button>
                <button formAction={toggleProductAction} className="h-9 border border-ink/12 px-3 text-xs">
                  {product.available ? "Ocultar" : "Exibir"}
                </button>
                <button formAction={deleteProductAction} className="h-9 border border-ink/12 px-3 text-xs text-ember">
                  Excluir
                </button>
              </div>
            </form>
          ))}
        </div>

        <form action={saveProductAction} className="mt-8 space-y-3 border border-dashed border-ink/20 bg-paper p-6">
          <h3 className="font-display text-xl">Novo item</h3>
          <input type="hidden" name="categoryId" value={category.id} />
          <input type="hidden" name="sortOrder" value={category.products.length} />
          <label className="block text-sm">
            Nome
            <input name="name" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <label className="block text-sm">
            Preço
            <input name="price" placeholder="48.00" className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <label className="block text-sm">
            Descrição
            <textarea name="description" rows={3} className="mt-1.5 w-full border border-ink/12 bg-cream px-3 py-2 outline-none focus:border-ember" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="available" defaultChecked />
            Disponível no cardápio
          </label>
          <button type="submit" className="btn-primary">Adicionar item</button>
        </form>
      </main>
    </>
  );
}
