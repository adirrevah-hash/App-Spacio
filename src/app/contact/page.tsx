import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "./contact-form";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productSlug } = await searchParams;

  const product = productSlug
    ? await prisma.product.findUnique({ where: { slug: productSlug } })
    : null;

  return (
    <div className="container-edge py-14 sm:py-20">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
            יצירת קשר
          </h1>
          <p className="mt-3 text-stone sm:text-lg">
            השאירו פרטים ונחזור אליכם עם הצעת מחיר ופרטים נוספים.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mx-auto mt-10 max-w-xl sm:mt-14">
          <ContactForm productSlug={product?.slug} productName={product?.name} />
        </div>
      </Reveal>
    </div>
  );
}
