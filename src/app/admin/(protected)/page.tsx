import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [categoryCount, productCount] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">סקירה</h1>
      <p className="mt-2 text-stone">
        כאן מנהלים את הקטגוריות והמוצרים שמוצגים באתר — כולל מודלי AR ותמונות.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border hairline p-6">
          <p className="text-sm text-stone">קטגוריות</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{categoryCount}</p>
          <Link
            href="/admin/categories"
            className="mt-4 inline-block text-sm font-medium text-ink underline-offset-4 hover:underline"
          >
            ניהול קטגוריות
          </Link>
        </div>
        <div className="rounded-2xl border hairline p-6">
          <p className="text-sm text-stone">מוצרים</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{productCount}</p>
          <Link
            href="/admin/products"
            className="mt-4 inline-block text-sm font-medium text-ink underline-offset-4 hover:underline"
          >
            ניהול מוצרים
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-mist p-6 text-sm leading-relaxed text-ink/80">
        <p className="font-medium text-ink">איך זה עובד</p>
        <p className="mt-2">
          כל קטגוריה ומוצר שתוסיפו כאן יופיעו מיד באתר הציבורי — בלי צורך בשינוי
          קוד. אם לא מעלים תמונה או מודל AR משלכם, המערכת תציג תצוגה זמנית
          (placeholder) כדי שהדף ייראה שלם עד שתעלו את הקבצים האמיתיים.
        </p>
      </div>
    </div>
  );
}
