import { PrismaClient } from "../src/generated/prisma";
import { defaultIconForCategory } from "../src/lib/catalog-defaults";

const prisma = new PrismaClient();

const categories = [
  {
    slug: "pergolas-and-canopies",
    name: "פרגולות וסוככים",
    description: "פתרונות הצללה פתוחים לחצר, מרפסת וגינה.",
    order: 1,
    model: "/models/placeholders/pergola-frame.glb",
    products: [
      {
        slug: "horizon-aluminum-pergola",
        name: "פרגולת אלומיניום הורייזון",
        shortDescription: "פרגולה בעלת להבים נפתחים לוויסות אור וצל.",
        width: 300,
        height: 250,
        depth: 400,
      },
      {
        slug: "sirocco-retractable-awning",
        name: "סוכך בד נשלף סירוקו",
        shortDescription: "סוכך בד איכותי הנפתח ונסגר בלחיצת כפתור.",
        width: 350,
        height: 230,
        depth: 300,
      },
      {
        slug: "nordic-wood-pergola",
        name: "פרגולת עץ נורדיק",
        shortDescription: "מבנה עץ טבעי בגימור חוץ עמיד לכל עונות השנה.",
        width: 320,
        height: 260,
        depth: 320,
      },
    ],
  },
  {
    slug: "kitchens",
    name: "מטבחים",
    description: "עיצוב מטבחים מודולרי במבחר גימורים ותצורות.",
    order: 2,
    model: "/models/placeholders/kitchen-block.glb",
    products: [
      {
        slug: "milano-linear-kitchen",
        name: "מטבח לינארי מילאנו",
        shortDescription: "קו מטבח ישר באורך גמיש בגימור מט.",
        width: 320,
        height: 90,
        depth: 60,
      },
      {
        slug: "manhattan-kitchen-island",
        name: "אי מטבח מנהטן",
        shortDescription: "אי מרכזי עם משטח עבודה מורחב ואחסון כפול.",
        width: 240,
        height: 92,
        depth: 110,
      },
      {
        slug: "copenhagen-corner-kitchen",
        name: "מטבח פינתי קופנהגן",
        shortDescription: "ניצול מקסימלי של פינות החלל בעיצוב סקנדינבי.",
        width: 280,
        height: 90,
        depth: 280,
      },
    ],
  },
  {
    slug: "glass-systems",
    name: "מערכות זכוכית",
    description: "מחיצות, דלתות וקירות זכוכית למרחבים פתוחים.",
    order: 3,
    model: "/models/placeholders/glass-panel.glb",
    products: [
      {
        slug: "atrium-glass-partition",
        name: "מחיצת זכוכית אטריום",
        shortDescription: "מחיצה שקופה המפרידה בין חללים תוך שמירה על אור טבעי.",
        width: 180,
        height: 240,
        depth: 3,
      },
      {
        slug: "skyline-sliding-glass-door",
        name: "דלת הזזה זכוכית סקייליין",
        shortDescription: "מערכת הזזה חלקה לפתיחה מלאה של המרחב החוצה.",
        width: 240,
        height: 260,
        depth: 6,
      },
      {
        slug: "vista-folding-glass-wall",
        name: "קיר זכוכית מתקפל ויסטה",
        shortDescription: "קיר זכוכית מתקפל המאחד פנים וחוץ לחלל אחד.",
        width: 400,
        height: 260,
        depth: 6,
      },
    ],
  },
  {
    slug: "furniture",
    name: "ריהוט",
    description: "פריטי ריהוט נבחרים לבית ולחוץ.",
    order: 4,
    model: "/models/placeholders/furniture-chair.glb",
    products: [
      {
        slug: "luna-dining-chair",
        name: "כיסא אוכל לונה",
        shortDescription: "כיסא בעיצוב נקי עם מבנה עץ מלא.",
        width: 48,
        height: 80,
        depth: 52,
      },
      {
        slug: "oslo-lounge-chair",
        name: "כורסת לאונג' אוסלו",
        shortDescription: "כורסה נמוכה ורחבה לישיבה מרגיעה.",
        width: 70,
        height: 75,
        depth: 80,
      },
      {
        slug: "aspen-bar-stool",
        name: "שרפרף בר אספן",
        shortDescription: "שרפרף בר קומפקטי בגובה מתכוונן.",
        width: 40,
        height: 95,
        depth: 40,
      },
    ],
  },
  {
    slug: "design-and-architecture",
    name: "מוצרי עיצוב ואדריכלות",
    description: "אובייקטים ואלמנטים אדריכליים להשלמת החלל.",
    order: 5,
    model: "/models/placeholders/design-object.glb",
    products: [
      {
        slug: "studio-floor-lamp",
        name: "מנורת רצפה סטודיו",
        shortDescription: "מנורת רצפה פסלית באור חם ועקיף.",
        width: 35,
        height: 150,
        depth: 35,
      },
      {
        slug: "terra-ceramic-vase",
        name: "אגרטל קרמיקה טרה",
        shortDescription: "אגרטל קרמי בגימור מט בגוון אדמה.",
        width: 24,
        height: 40,
        depth: 24,
      },
      {
        slug: "monolith-table-sculpture",
        name: "פסל שולחני מונוליט",
        shortDescription: "פריט פיסולי מינימליסטי לשולחן או כוננית.",
        width: 18,
        height: 28,
        depth: 18,
      },
    ],
  },
];

async function main() {
  for (const [ci, category] of categories.entries()) {
    const heroImage = `/images/placeholders/${category.slug}.svg`;
    const cat = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        order: category.order,
        icon: defaultIconForCategory(category.slug),
      },
      create: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        order: category.order,
        icon: defaultIconForCategory(category.slug),
      },
    });

    for (const [pi, product] of category.products.entries()) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {
          name: product.name,
          shortDescription: product.shortDescription,
          heroImage,
          modelGlb: category.model,
          widthCm: product.width,
          heightCm: product.height,
          depthCm: product.depth,
          order: pi,
          categoryId: cat.id,
          featured: ci < 3 && pi === 0,
        },
        create: {
          slug: product.slug,
          name: product.name,
          shortDescription: product.shortDescription,
          heroImage,
          modelGlb: category.model,
          widthCm: product.width,
          heightCm: product.height,
          depthCm: product.depth,
          order: pi,
          categoryId: cat.id,
          featured: ci < 3 && pi === 0,
        },
      });
    }
  }
}

main()
  .then(async () => {
    console.log("Seed complete.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
