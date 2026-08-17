export const SITE = {
  name: "Lake 'n Fire",
  shortName: "Lake",
  tagline: "BBQ brings people together",
  description:
    "Cozinha artesanal, farm to table e churrasco no fogo. Experiências, histórias e novos sabores em Leme/SP.",
  instagram: "https://www.instagram.com/lakenfire_/",
  instagramHandle: "@lakenfire_",
  phone: "(19) 99680-7105",
  phoneHref: "https://wa.me/5519996807105",
  email: "contato@lakenfire.com.br",
  address: "Rua João Pessoa, 898, Centro",
  city: "Leme, SP",
  cep: "13610-110",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Jo%C3%A3o+Pessoa+898+Leme+SP",
  owners: "Juliana Zanin Parron e Dênis Parron",
} as const;

export const HOURS = [
  { day: "Segunda", lunch: "Fechado", dinner: "Fechado", closed: true },
  { day: "Terça", lunch: "Fechado", dinner: "Fechado", closed: true },
  { day: "Quarta", lunch: "11h30 às 14h30", dinner: "18h às 23h" },
  { day: "Quinta", lunch: "11h30 às 14h30", dinner: "18h às 23h" },
  { day: "Sexta", lunch: "11h30 às 14h30", dinner: "18h às 23h" },
  { day: "Sábado", lunch: "12h às 23h", dinner: "" },
  { day: "Domingo", lunch: "12h às 16h", dinner: "" },
] as const;

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
