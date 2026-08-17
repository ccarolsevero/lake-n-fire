import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminClientesPage() {
  return (
    <>
      <AdminNav current="/admin/clientes" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Clientes</p>
        <h1 className="mt-2 font-display text-4xl font-medium">Contas</h1>
        <p className="mt-8 border border-ink/10 bg-paper p-6 text-sm text-bark/55">
          Cadastro de clientes volta quando o banco estiver no ar.
        </p>
      </main>
    </>
  );
}
