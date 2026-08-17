import { MENU } from "@/lib/menu";

export type CatalogChannel = "RESTAURANTE" | "EMPORIO";

export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  note: string;
  portion: string;
  price: number | null;
};

export type CatalogCategory = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  channel: CatalogChannel;
  products: CatalogProduct[];
};

export function getCatalog(channel?: CatalogChannel): CatalogCategory[] {
  return MENU.filter((category) => {
    if (!channel) return true;
    return channel === "EMPORIO"
      ? category.channel === "emporio"
      : category.channel === "restaurante";
  }).map((category) => ({
    id: category.slug,
    slug: category.slug,
    title: category.title,
    subtitle: category.subtitle ?? "",
    channel:
      category.channel === "emporio" ? "EMPORIO" : "RESTAURANTE",
    products: category.items.map((item, index) => ({
      id: `${category.slug}-${index}`,
      name: item.name,
      description: item.description ?? "",
      note: item.note ?? "",
      portion: item.portion ?? "",
      price: item.price,
    })),
  }));
}
