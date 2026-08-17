import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Cozinha artesanal em Leme`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${cinzel.variable}`}
    >
      <body className="min-h-svh bg-cream font-sans text-ink antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
