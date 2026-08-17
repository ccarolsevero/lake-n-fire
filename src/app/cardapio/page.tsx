import Link from "next/link";
import { MenuItemRow } from "@/components/MenuItemRow";
import { getCatalog } from "@/lib/catalog";

export const metadata = {
  title: "Cardápio",
  description:
    "Cardápio completo do Lake 'n Fire: para compartilhar, parrilla, defumados, massas, drinks e vinhos.",
};

export default async function CardapioPage() {
  const categories = await getCatalog("RESTAURANTE");

  return (
    <main className="pt-24 pb-20">
      <div className="section-pad">
        <div className="container-site">
          <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
            Cardápio
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] font-medium">
            O fogo, a mesa e o que vem nela.
          </h1>
          <p className="mt-4 max-w-xl text-bark/70">
            Cardápio dinâmico, preços e pratos atualizados pela casa. Taxa de
            serviço de 10% no salão.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="border border-ink/12 px-3 py-1.5 text-[0.68rem] tracking-[0.12em] uppercase hover:border-ember hover:text-ember"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="section-pad mt-10">
        <div className="container-site space-y-16">
          {categories.map((cat) => (
            <section key={cat.slug} id={cat.slug} className="scroll-mt-28">
              <div className="flex items-end justify-between gap-4 border-b border-ember/40 pb-3">
                <div>
                  <h2 className="font-display text-3xl font-medium uppercase tracking-wide">
                    {cat.title}
                  </h2>
                  {cat.subtitle ? (
                    <p className="mt-1 text-sm text-bark/60">{cat.subtitle}</p>
                  ) : null}
                </div>
              </div>
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

      <div className="section-pad mt-16">
        <div className="container-site flex flex-wrap gap-3">
          <Link href="/pedidos" className="btn-primary">
            Fazer pedido
          </Link>
          <Link href="/emporio" className="btn-ghost">
            Ver empório
          </Link>
        </div>
      </div>
    </main>
  );
}
