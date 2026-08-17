import Link from "next/link";
import { getCatalog } from "@/lib/catalog";
import { HOURS, SITE } from "@/lib/site";

const DIFFERENTIALS = [
  {
    title: "Comida autêntica e afetiva",
    text: "Pratos pensados para reunir gente em volta da mesa, com o carinho da casa.",
    image: "/bread.png",
    alt: "Gravura de pão artesanal",
  },
  {
    title: "Defumados low and slow",
    text: "Cortes no pit smoker, no tempo certo, com fumaça e lenha de verdade.",
    image: "/pit-smoker.png",
    alt: "Gravura do pit smoker",
  },
  {
    title: "Ambiente pet friendly",
    text: "Traga o seu melhor amigo. O deck e o jardim também são deles.",
    image: "/meats.png",
    alt: "Gravura de cortes de carne",
  },
  {
    title: "Ingredientes selecionados",
    text: "Farm to table, fornecedores locais e produção artesanal do começo ao fim.",
    image: "/bread.png",
    alt: "Gravura de pão artesanal",
  },
] as const;

export default function HomePage() {
  const restaurant = getCatalog("RESTAURANTE");
  const preview = restaurant.filter((c) =>
    ["para-compartilhar", "parrilla", "defumados", "drinks"].includes(c.slug),
  );
  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-cream">
        <img
          src="/hero.jpg"
          alt="Mesa no deck do Lake 'n Fire, entre árvores e jardim"
          className="hero-photo absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[#DED3C1]/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-bark/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/15" />
        <div className="section-pad relative z-20">
          <div className="container-site flex min-h-[92svh] flex-col justify-end pb-16 pt-32 sm:pb-24">
            <p className="text-[0.72rem] font-bold tracking-[0.28em] text-rust uppercase">
              Leme · SP · Cozinha artesanal
            </p>
            <h1 className="hero-title mt-5 max-w-3xl text-[clamp(2.4rem,6.4vw,5.1rem)] leading-[1.08] uppercase">
              Experiências, histórias e novos sabores
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              Farm to table, cortes na parrilla e defumados no pit smoker, com
              muito carinho na cozinha.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/cardapio" className="btn-primary">
                Ver cardápio
              </Link>
              <Link
                href="/pedidos"
                className="inline-flex h-11 items-center border border-cream/30 px-5 text-[0.8125rem] font-semibold tracking-[0.08em] text-cream uppercase hover:bg-cream hover:text-ink"
              >
                Fazer pedido
              </Link>
              <Link
                href="/reservas"
                className="inline-flex h-11 items-center px-5 text-[0.8125rem] font-semibold tracking-[0.08em] text-cream/80 uppercase hover:text-cream"
              >
                Reservar mesa
              </Link>
            </div>
          </div>
        </div>
        <div className="relative z-20 scallop h-8 bg-cream" />
      </section>

      <section id="sobre" className="scroll-mt-24 py-20 sm:py-28">
        <div className="section-pad">
          <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
                Nossa História
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] font-medium">
                Nossa trajetória vem de longe e tem lago, fogo e mesa.
              </h2>
              <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-bark/80">
                <p>
                  O Lake &apos;n Fire nasceu da paixão de {SITE.owners} pela
                  gastronomia e pelo churrasco: reunir pessoas em volta do fogo,
                  com lagos, paisagismo e produtos de verdade.
                </p>
                <p>
                  Trabalhamos farm to table, com fornecedores locais e produção
                  artesanal, do pastrami ao barbecue, da linguiça ao rub. Cada
                  prato é feito para celebrar a vida, a família e os amigos.
                </p>
              </div>
            </div>
            <figure className="relative">
              <img
                src="/historia.jpg"
                alt="Juliana Zanin Parron e Dênis Parron, à frente do pit smoker no Lake 'n Fire"
                className="aspect-[4/5] w-full object-cover object-[center_18%] sm:aspect-[5/6] lg:min-h-[520px]"
              />
              <figcaption className="mt-3 text-sm tracking-wide text-bark/55">
                Juliana e Dênis Parron
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="diferenciais" className="border-y border-ink/8 bg-cream-deep py-20 sm:py-24">
        <div className="section-pad">
          <div className="container-site">
            <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
              Nossos diferenciais
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-medium">
              O que faz o Lake ser o Lake.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DIFFERENTIALS.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col border border-ink/12 bg-cream px-5 py-6"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="mb-5 h-28 w-full object-contain mix-blend-multiply"
                  />
                  <h3 className="font-display text-xl font-medium leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bark/70">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="horarios" className="py-20 sm:py-24">
        <div className="section-pad">
          <div className="container-site">
            <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
              Horários
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium">
              Venha nos visitar
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {HOURS.map((slot) => (
                <article
                  key={slot.day}
                  className={`border px-5 py-5 ${
                    slot.closed
                      ? "border-ink/8 bg-cream/40 text-bark/45"
                      : "border-ink/12 bg-cream"
                  }`}
                >
                  <p className="text-sm font-semibold tracking-[0.14em] uppercase">
                    {slot.day}
                  </p>
                  {slot.closed ? (
                    <p className="mt-3 text-sm">Fechado</p>
                  ) : (
                    <div className="mt-3 space-y-1 text-sm text-bark/75">
                      <p>{slot.lunch}</p>
                      {slot.dinner ? <p>{slot.dinner}</p> : null}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cardapio" className="py-20 sm:py-28">
        <div className="section-pad">
          <div className="container-site">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
                  Cardápio
                </p>
                <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3rem)] font-medium">
                  Parrilla, pit smoker e uma pitada de tradição.
                </h2>
              </div>
              <Link href="/cardapio" className="btn-ghost w-fit">
                Ver cardápio completo
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {preview.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/cardapio#${cat.slug}`}
                  className="group border border-ink/10 bg-paper p-7 transition hover:border-ember/50"
                >
                  <p className="text-[0.68rem] tracking-[0.2em] text-ember uppercase">
                    {cat.products.length} itens
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium group-hover:text-ember">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bark/65">
                    {cat.subtitle || cat.products[0]?.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-cream sm:py-24">
        <div className="section-pad">
          <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[0.7rem] tracking-[0.22em] text-rust uppercase">
                Pedidos & empório
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium">
                Peça para a mesa ou leve o Lake para casa.
              </h2>
              <p className="mt-4 max-w-lg text-cream/65">
                Duas abas, o mesmo fogo: pedidos do restaurante e produtos do
                empório, molhos, rubs e defumados artesanais.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/pedidos"
                className="border border-cream/15 p-6 transition hover:border-rust"
              >
                <p className="text-[0.68rem] tracking-[0.18em] text-rust uppercase">
                  Aba 01
                </p>
                <h3 className="mt-3 font-display text-2xl">Pedidos</h3>
                <p className="mt-2 text-sm text-cream/55">
                  Monte o pedido do restaurante e retire ou receba em casa.
                </p>
              </Link>
              <Link
                href="/emporio"
                className="border border-cream/15 p-6 transition hover:border-rust"
              >
                <p className="text-[0.68rem] tracking-[0.18em] text-rust uppercase">
                  Aba 02
                </p>
                <h3 className="mt-3 font-display text-2xl">Empório</h3>
                <p className="mt-2 text-sm text-cream/55">
                  Barbecue, black rub, pastrami e linguiça da casa.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="reservas" className="py-20 sm:py-28">
        <div className="section-pad">
          <div className="container-site grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
                Reservas
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium">
                Faça sua reserva
              </h2>
              <p className="mt-4 max-w-md text-bark/70">
                Escolha data, horário e número de pessoas. Confirmamos pelo
                WhatsApp.
              </p>
              <Link href="/reservas" className="btn-primary mt-8">
                Reservar agora
              </Link>
              <p className="mt-6 text-sm text-bark/55">
                Ou fale direto:{" "}
                <a href={SITE.phoneHref} className="text-ember hover:underline">
                  {SITE.phone}
                </a>
              </p>
            </div>
            <div>
              <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
                Onde nos encontrar
              </p>
              <h3 className="mt-4 font-display text-3xl font-medium">
                {SITE.name}
              </h3>
              <p className="mt-3 text-bark/75">
                {SITE.address}
                <br />
                {SITE.city}
                <br />
                {SITE.cep}
              </p>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-8"
              >
                Abrir no mapa
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
