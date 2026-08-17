import { AdminNav } from "@/components/admin/AdminNav";
import { saveCategoryAction } from "@/lib/actions";

export default function NovaCategoriaPage() {
  return (
    <>
      <AdminNav current="/admin/cardapio" />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-4xl font-medium">Nova categoria</h1>
        <form action={saveCategoryAction} className="mt-8 space-y-4 border border-ink/10 bg-paper p-6">
          <label className="block text-sm">
            Título
            <input name="title" required className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <label className="block text-sm">
            Subtítulo
            <input name="subtitle" className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <label className="block text-sm">
            Canal
            <select name="channel" className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember">
              <option value="RESTAURANTE">Restaurante</option>
              <option value="EMPORIO">Empório</option>
            </select>
          </label>
          <label className="block text-sm">
            Ordem
            <input name="sortOrder" type="number" defaultValue={0} className="mt-1.5 h-11 w-full border border-ink/12 bg-cream px-3 outline-none focus:border-ember" />
          </label>
          <button type="submit" className="btn-primary">Salvar</button>
        </form>
      </main>
    </>
  );
}
