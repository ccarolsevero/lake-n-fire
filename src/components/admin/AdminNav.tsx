import Link from "next/link";
import { logoutAdminAction } from "@/lib/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/cardapio", label: "Cardápio" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/clientes", label: "Clientes" },
];

export function AdminNav({ current }: { current?: string }) {
  return (
    <header className="border-b border-ink/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/admin" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Lake 'n Fire"
              width={372}
              height={312}
              className="h-10 w-auto object-contain"
            />
            <span className="font-sans text-[0.65rem] font-bold tracking-[0.18em] text-bark/45 uppercase">
              Admin
            </span>
          </Link>
          <nav className="flex flex-wrap gap-1">
            {links.map((link) => {
              const active = current === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-sm px-3 py-1.5 text-sm transition ${
                    active
                      ? "bg-ember/15 text-ember"
                      : "text-bark/60 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-bark/50 hover:text-ink">
            Ver site
          </Link>
          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="border border-ink/12 px-3 py-1.5 text-sm text-bark/70 hover:border-ember hover:text-ink"
            >
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
