import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  const featured = await prisma.product.findMany({
    where: { published: true, featured: true },
    orderBy: { order: "asc" },
    include: { category: true },
    take: 4,
  });

  return (
    <>
      <section className="container-edge pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border hairline px-4 py-1.5 text-xs tracking-wide text-stone sm:text-sm">
              מציאות רבודה לעולמות העיצוב והאדריכלות
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              ראו את זה אצלכם בבית
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-stone sm:text-xl">
              בחרו מוצר, מקמו אותו במרחב שלכם וגלו איך הוא ייראה במציאות.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-medium text-paper transition-colors hover:bg-charcoal"
              >
                מתחילים לדמיין
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium text-ink transition-colors hover:text-stone"
              >
                גלו את הקטגוריות
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="categories" className="container-edge pb-24 sm:pb-32">
        <Reveal>
          <div className="mb-10 flex items-end justify-between sm:mb-14">
            <div>
              <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
                קטגוריות
              </h2>
              <p className="mt-2 text-stone">בחרו תחום והתחילו לדמיין במרחב שלכם</p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {categories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.05}>
              <CategoryCard
                slug={category.slug}
                name={category.name}
                description={category.description}
                productCount={category._count.products}
                icon={category.icon}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="border-t hairline bg-mist/60">
          <div className="container-edge py-24 sm:py-32">
            <Reveal>
              <div className="mb-10 flex items-end justify-between sm:mb-14">
                <div>
                  <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
                    מוצרים נבחרים
                  </h2>
                  <p className="mt-2 text-stone">דוגמאות להמחשת חוויית ה-AR</p>
                </div>
                <Link
                  href="/catalog"
                  className="hidden text-sm font-medium text-ink underline-offset-4 hover:underline sm:inline"
                >
                  לכל הקטלוג
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product, i) => (
                <Reveal key={product.id} delay={i * 0.06}>
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
          </div>
        </section>
      ) : null}
    </>
  );
}
