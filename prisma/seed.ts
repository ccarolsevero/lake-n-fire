import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";
import { MENU } from "../src/lib/menu";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const existing = await prisma.category.count();
  if (existing > 0) {
    console.log("Seed ignorado: cardápio já existe.");
    return;
  }

  for (const [catIndex, category] of MENU.entries()) {
    const created = await prisma.category.create({
      data: {
        slug: category.slug,
        title: category.title,
        subtitle: category.subtitle ?? "",
        channel: category.channel === "emporio" ? "EMPORIO" : "RESTAURANTE",
        sortOrder: catIndex,
      },
    });

    for (const [itemIndex, item] of category.items.entries()) {
      await prisma.product.create({
        data: {
          categoryId: created.id,
          name: item.name,
          description: item.description ?? "",
          note: item.note ?? "",
          portion: item.portion ?? "",
          price: item.price,
          available: true,
          sortOrder: itemIndex,
        },
      });
    }
  }

  console.log(`Seed ok: ${MENU.length} categorias, slugs como ${slugify(MENU[0].title)}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
