import { Suspense } from "react";
import { OrderBoard } from "@/components/OrderBoard";
import { getCatalog } from "@/lib/catalog";

export const metadata = {
  title: "Pedidos",
  description: "Peça o cardápio do restaurante ou os produtos do empório Lake 'n Fire.",
};

export default function PedidosPage() {
  const restaurant = getCatalog("RESTAURANTE");
  const emporio = getCatalog("EMPORIO");

  return (
    <main className="pt-24 pb-28">
      <div className="section-pad">
        <div className="container-site">
          <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
            Pedidos
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium">
            Monte o seu pedido
          </h1>
          <p className="mt-3 max-w-xl text-bark/70">
            Escolha entre o restaurante e o empório. O pedido abre o WhatsApp da
            casa.
          </p>
          <Suspense>
            <OrderBoard
              restaurant={restaurant}
              emporio={emporio}
              loggedIn
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
