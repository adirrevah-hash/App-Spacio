import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/reveal";

const VALUES = [
  {
    title: "דיוק במרחב",
    description: "מידות אמיתיות וקנה מידה מדויק — מה שאתם רואים הוא מה שתקבלו.",
  },
  {
    title: "ללא התקנות",
    description: "עובד ישירות מהדפדפן בטלפון הנייד, בלי להוריד אפליקציה.",
  },
  {
    title: "לכל תחום",
    description:
      "מפרגולות ומטבחים ועד ריהוט ועיצוב פנים — קטלוג אחד לכל הצרכים.",
  },
  {
    title: "פשוט ונגיש",
    description: "ממשק נקי שמתמקד במוצר ובחוויה, לא בטכנולוגיה.",
  },
];

export default async function AboutPage() {
  const [categoryCount, productCount] = await Promise.all([
    prisma.category.count({ where: { published: true } }),
    prisma.product.count({ where: { published: true } }),
  ]);

  return (
    <div>
      <section className="container-edge pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border hairline px-4 py-1.5 text-xs tracking-wide text-stone sm:text-sm">
              אודות
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-7 text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              מרחב שבו העיצוב נפגש עם המציאות
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-stone sm:text-xl">
              SPACEVIEW נולדה מתוך אמונה אחת: הדרך הכי טובה לבחור מוצר היא
              לראות אותו אצלכם — לפני שהוא מגיע אליכם.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t hairline bg-mist/60">
        <div className="container-edge grid grid-cols-1 gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              החזון שלנו
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-ink/80">
              אנחנו מאמינים שהחלטות עיצוב ואדריכלות הן החלטות שצריך להרגיש
              בהן ביטחון. מציאות רבודה מאפשרת לדמיין, למדוד ולהתרשם מכל מוצר
              במרחב האמיתי שלכם — בלי ניחושים ובלי הפתעות ברגע האחרון. מהבחירה
              הראשונה בקטלוג ועד למוצר המוגמר בבית, אנחנו כאן כדי לקצר את
              המרחק בין הדמיון למציאות.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-edge py-16 sm:py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            למה SPACEVIEW
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border hairline p-6">
                <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-edge grid grid-cols-3 gap-4 py-14 text-center sm:py-20">
          <Reveal>
            <p className="text-4xl font-semibold text-ink sm:text-5xl">
              {categoryCount}
            </p>
            <p className="mt-2 text-sm text-stone sm:text-base">קטגוריות</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-4xl font-semibold text-ink sm:text-5xl">
              {productCount}
            </p>
            <p className="mt-2 text-sm text-stone sm:text-base">מוצרים</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-4xl font-semibold text-ink sm:text-5xl">AR</p>
            <p className="mt-2 text-sm text-stone sm:text-base">ישירות מהדפדפן</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t hairline bg-mist/60">
        <div className="container-edge flex flex-col items-center gap-6 py-16 text-center sm:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              מוכנים להתחיל?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-medium text-paper transition-colors hover:bg-charcoal"
              >
                לקטלוג המוצרים
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium text-ink transition-colors hover:text-stone"
              >
                יצירת קשר
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
