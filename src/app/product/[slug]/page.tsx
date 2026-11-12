import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ModelViewerClient } from "@/components/ar/model-viewer-client";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { IS_PLACEHOLDER_ASSET } from "@/lib/catalog-defaults";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product || !product.published) {
    notFound();
  }

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      published: true,
      id: { not: product.id },
    },
    orderBy: { order: "asc" },
    take: 3,
  });

  const isPlaceholderModel = IS_PLACEHOLDER_ASSET(product.modelGlb);
  const specs = [
    { label: "רוחב", value: product.widthCm },
    { label: "גובה", value: product.heightCm },
    { label: "עומק", value: product.depthCm },
  ].filter((s) => s.value != null);

  return (
    <div className="container-edge py-10 sm:py-16">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone sm:mb-10">
        <Link href="/catalog" className="hover:text-ink">
          קטלוג
        </Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.category.slug}`} className="hover:text-ink">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="aspect-square overflow-hidden rounded-2xl border hairline bg-mist">
            <ModelViewerClient
              src={product.modelGlb}
              iosSrc={product.modelUsdz}
              alt={product.name}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-stone">
            לחצו על &quot;הציבו במרחב שלכם&quot; ופתחו את המצלמה כדי לראות את המוצר
            בגודל אמיתי בבית שלכם. נדרש דפדפן Chrome באנדרואיד או Safari
            באייפון.
            {isPlaceholderModel ? (
              <>
                {" "}
                <span className="font-medium text-ink/70">
                  שימו לב: זהו מודל תלת-ממד זמני להדגמה — יוחלף במודל הרשמי של
                  המוצר דרך פאנל הניהול.
                </span>
              </>
            ) : null}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="rounded-full bg-mist px-3 py-1 text-xs text-stone">
            {product.category.name}
          </span>
          <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
            {product.name}
          </h1>
          {product.shortDescription ? (
            <p className="mt-3 text-lg text-stone">{product.shortDescription}</p>
          ) : null}

          {product.description ? (
            <p className="mt-6 leading-relaxed text-ink/80">{product.description}</p>
          ) : null}

          {specs.length > 0 ? (
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t hairline pt-6">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs text-stone">{spec.label}</dt>
                  <dd className="mt-1 text-lg font-medium text-ink">
                    {spec.value} ס&quot;מ
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/catalog?category=${product.category.slug}`}
              className="inline-flex items-center justify-center rounded-full border hairline px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              עוד ב{product.category.name}
            </Link>
          </div>
        </Reveal>
      </div>

      {related.length > 0 ? (
        <section className="mt-20 border-t hairline pt-14 sm:mt-28 sm:pt-20">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">מוצרים נוספים בקטגוריה</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <ProductCard
                  slug={p.slug}
                  name={p.name}
                  shortDescription={p.shortDescription}
                  heroImage={p.heroImage}
                />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
