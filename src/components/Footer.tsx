import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream">
      <div className="section-pad">
        <div className="container-site grid gap-10 py-14 sm:grid-cols-3">
          <div>
            <Logo light size="lg" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Cozinha artesanal, farm to table e churrasco no fogo. Pet friendly.
            </p>
          </div>
          <div>
            <p className="text-[0.68rem] tracking-[0.2em] text-rust uppercase">
              Visite
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/75">
              {SITE.address}
              <br />
              {SITE.city}
              <br />
              {SITE.cep}
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-3 inline-block text-sm text-cream/75 hover:text-cream"
            >
              {SITE.phone}
            </a>
          </div>
          <div>
            <p className="text-[0.68rem] tracking-[0.2em] text-rust uppercase">
              Navegue
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-cream/75">
              <Link href="/cardapio" className="hover:text-cream">
                Cardápio
              </Link>
              <Link href="/pedidos" className="hover:text-cream">
                Pedidos
              </Link>
              <Link href="/emporio" className="hover:text-cream">
                Empório
              </Link>
              <Link href="/reservas" className="hover:text-cream">
                Reservas
              </Link>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream"
              >
                {SITE.instagramHandle}
              </a>
            </div>
          </div>
        </div>
        <div className="container-site flex flex-col gap-2 border-t border-cream/10 py-6 text-xs text-cream/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <p>Taxa de serviço de 10% no salão.</p>
        </div>
      </div>
    </footer>
  );
}
