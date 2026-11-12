import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCategoryAction } from "./actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">קטגוריות</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-charcoal"
        >
          קטגוריה חדשה
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border hairline">
        <table className="w-full text-start text-sm">
          <thead className="bg-mist text-stone">
            <tr>
              <th className="px-4 py-3 text-start font-medium">שם</th>
              <th className="px-4 py-3 text-start font-medium">מזהה</th>
              <th className="px-4 py-3 text-start font-medium">מוצרים</th>
              <th className="px-4 py-3 text-start font-medium">סטטוס</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t hairline">
                <td className="px-4 py-3 font-medium text-ink">{category.name}</td>
                <td className="px-4 py-3 text-stone" dir="ltr">
                  {category.slug}
                </td>
                <td className="px-4 py-3 text-stone">{category._count.products}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      category.published
                        ? "rounded-full bg-mist px-2.5 py-1 text-xs text-ink"
                        : "rounded-full bg-mist px-2.5 py-1 text-xs text-stone"
                    }
                  >
                    {category.published ? "מפורסם" : "טיוטה"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="text-ink underline-offset-4 hover:underline"
                    >
                      עריכה
                    </Link>
                    <form action={deleteCategoryAction}>
                      <input type="hidden" name="id" value={category.id} />
                      <ConfirmSubmitButton
                        confirmMessage={`למחוק את "${category.name}"? פעולה זו תמחק גם את כל ${category._count.products} המוצרים בקטגוריה.`}
                        className="text-red-600 hover:underline"
                      >
                        מחיקה
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
