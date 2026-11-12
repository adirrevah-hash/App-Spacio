"use server";

import { prisma } from "@/lib/prisma";

export async function getFavoriteProducts(slugs: string[]) {
  if (slugs.length === 0) return [];

  const products = await prisma.product.findMany({
    where: { slug: { in: slugs }, published: true },
    include: { category: true },
  });

  const order = new Map(slugs.map((slug, i) => [slug, i]));
  return products.sort(
    (a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0)
  );
}
