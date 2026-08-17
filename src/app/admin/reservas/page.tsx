import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminReservasPage() {
  return (
    <>
      <AdminNav current="/admin/reservas" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Reservas</p>
        <h1 className="mt-2 font-display text-4xl font-medium">Mesas</h1>
        <p className="mt-8 border border-ink/10 bg-paper p-6 text-sm text-bark/55">
          As reservas do site abrem o WhatsApp da casa. O painel volta com o banco.
        </p>
      </main>
    </>
  );
}
