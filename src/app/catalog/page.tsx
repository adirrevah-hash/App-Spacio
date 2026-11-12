import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import clsx from "clsx";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeSlug } = await searchParams;

  const categories = await prisma.category.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const activeCategory = activeSlug
    ? categories.find((c) => c.slug === activeSlug)
    : undefined;

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(activeCategory ? { categoryId: activeCategory.id } : {}),
    },
    orderBy: [{ categoryId: "asc" }, { order: "asc" }],
    include: { category: true },
  });

  return (
    <div className="container-edge py-14 sm:py-20">
      <Reveal>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">קטלוג</h1>
          <p className="mt-3 text-stone sm:text-lg">
            כל המוצרים הזמינים לצפייה במציאות רבודה — בחרו מוצר כדי לראות אותו
            במרחב שלכם.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:mt-10 sm:flex-wrap">
        <Link
          href="/catalog"
          className={clsx(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            !activeCategory
              ? "border-ink bg-ink text-paper"
              : "hairline text-ink hover:border-ink/40"
          )}
        >
          הכל
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/catalog?category=${category.slug}`}
            className={clsx(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeCategory?.id === category.id
                ? "border-ink bg-ink text-paper"
                : "hairline text-ink hover:border-ink/40"
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 6) * 0.04}>
              <ProductCard
                slug={product.slug}
                name={product.name}
                shortDescription={product.shortDescription}
                heroImage={product.heroImage}
                categoryName={product.category.name}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-2xl border hairline bg-mist p-12 text-center text-stone">
          לא נמצאו מוצרים בקטגוריה זו כרגע.
        </div>
      )}
    </div>
  );
}
