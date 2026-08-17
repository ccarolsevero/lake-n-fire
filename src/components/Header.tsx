"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const links = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/emporio", label: "Empório" },
  { href: "/reservas", label: "Reservas" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/10 bg-cream/95 backdrop-blur-xl"
          : "border-b border-ink/8 bg-cream/90 backdrop-blur-md"
      }`}
    >
      <div className="section-pad">
        <div className="container-site flex h-[4.75rem] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                data-active={pathname === link.href || undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-[0.72rem] tracking-[0.14em] text-bark/60 uppercase hover:text-ember sm:inline">
              Entrar
            </Link>
            <Link href="/pedidos" className="btn-primary hidden sm:inline-flex">
              Fazer pedido
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-ink/15 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-px w-full bg-ink transition ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 h-px w-full bg-ink transition ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-ink transition ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-ink/10 bg-cream px-5 py-6 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link py-1">
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="nav-link py-1">
              Entrar
            </Link>
            <Link href="/pedidos" className="btn-primary mt-2 w-fit">
              Fazer pedido
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
