import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminPedidosPage() {
  return (
    <>
      <AdminNav current="/admin/pedidos" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Pedidos</p>
        <h1 className="mt-2 font-display text-4xl font-medium">Fila da casa</h1>
        <p className="mt-8 border border-ink/10 bg-paper p-6 text-sm text-bark/55">
          Pedidos pelo site voltam quando o banco estiver ligado. Por enquanto a
          casa recebe pelo WhatsApp.
        </p>
      </main>
    </>
  );
}
