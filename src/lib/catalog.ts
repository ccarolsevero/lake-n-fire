import { prisma } from "@/lib/db";
import type { Channel } from "@/generated/prisma";

export async function getCatalog(channel?: Channel, includeHidden = false) {
  return prisma.category.findMany({
    where: channel ? { channel } : undefined,
    orderBy: { sortOrder: "asc" },
    include: {
      products: {
        where: includeHidden ? undefined : { available: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}
