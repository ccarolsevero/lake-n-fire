import Link from "next/link";
import { MenuItemRow } from "@/components/MenuItemRow";
import { getCatalog } from "@/lib/catalog";

export const metadata = {
  title: "Empório",
  description:
    "Leve o Lake para casa: molho barbecue, black rub, pastrami e linguiça artesanal.",
};

export default function EmporioPage() {
  const categories = getCatalog("EMPORIO");

  return (
    <main className="pt-24 pb-20">
      <div className="section-pad">
        <div className="container-site">
          <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
            Empório
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] font-medium">
            O fogo para levar.
          </h1>
          <p className="mt-4 max-w-xl text-bark/70">
            Molhos, rubs e defumados da casa. Peça junto com o restaurante ou
            só o empório.
          </p>
          <Link href="/pedidos" className="btn-primary mt-8">
            Pedir empório
          </Link>

          {categories.map((cat) => (
            <section key={cat.id} className="mt-14">
              <h2 className="border-b border-ember/40 pb-3 font-display text-3xl uppercase tracking-wide">
                {cat.title}
              </h2>
              {cat.subtitle ? (
                <p className="mt-2 text-sm text-bark/60">{cat.subtitle}</p>
              ) : null}
              <div className="divide-y divide-ink/8">
                {cat.products.map((item) => (
                  <MenuItemRow
                    key={item.id}
                    item={{
                      name: item.name,
                      price: item.price,
                      description: item.description || undefined,
                      note: item.note || undefined,
                      portion: item.portion || undefined,
                    }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
