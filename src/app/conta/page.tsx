import Link from "next/link";
import { SITE } from "@/lib/site";

export default function ContaPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="section-pad">
        <div className="container-site max-w-lg">
          <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">Minha conta</p>
          <h1 className="mt-3 font-display text-4xl font-medium">Em breve</h1>
          <p className="mt-4 text-bark/70">
            Login e pedidos pela conta voltam logo. Por enquanto, fale com a casa
            pelo WhatsApp.
          </p>
          <a href={SITE.phoneHref} className="btn-primary mt-8">
            WhatsApp
          </a>
          <Link href="/cardapio" className="btn-ghost mt-3">
            Ver cardápio
          </Link>
        </div>
      </div>
    </main>
  );
}
