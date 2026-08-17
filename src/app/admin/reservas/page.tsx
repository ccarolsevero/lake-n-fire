import { AdminNav } from "@/components/admin/AdminNav";
import { updateReservationStatusAction } from "@/lib/actions";
import { RESERVATION_STATUS_LABEL } from "@/lib/format";
import { prisma } from "@/lib/db";

export default async function AdminReservasPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: [{ date: "asc" }, { time: "asc" }],
  });

  return (
    <>
      <AdminNav current="/admin/reservas" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Reservas</p>
        <h1 className="mt-2 font-display text-4xl font-medium">Mesas</h1>

        <div className="mt-8 divide-y divide-ink/8 border border-ink/10 bg-paper">
          {reservations.length === 0 ? (
            <p className="p-6 text-sm text-bark/55">Nenhuma reserva ainda.</p>
          ) : (
            reservations.map((item) => (
              <article key={item.id} className="flex flex-wrap items-start justify-between gap-4 px-5 py-5">
                <div>
                  <p className="text-[0.65rem] tracking-[0.16em] text-ember uppercase">
                    {RESERVATION_STATUS_LABEL[item.status]}
                  </p>
                  <h2 className="font-display text-xl">{item.name}</h2>
                  <p className="text-sm text-bark/65">
                    {item.date} às {item.time} · {item.partySize} pessoas
                  </p>
                  <p className="text-sm text-bark/55">{item.phone}</p>
                  {item.notes ? <p className="mt-1 text-sm italic text-bark/55">{item.notes}</p> : null}
                </div>
                <div className="flex gap-2">
                  {item.status === "PENDENTE" ? (
                    <form action={updateReservationStatusAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="status" value="CONFIRMADA" />
                      <button type="submit" className="btn-primary h-9 px-4 text-[0.7rem]">
                        Confirmar
                      </button>
                    </form>
                  ) : null}
                  {item.status !== "CANCELADA" ? (
                    <form action={updateReservationStatusAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="status" value="CANCELADA" />
                      <button type="submit" className="h-9 border border-ink/12 px-3 text-xs hover:border-ember">
                        Cancelar
                      </button>
                    </form>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </>
  );
}
