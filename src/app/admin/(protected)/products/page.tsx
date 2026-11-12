import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProductAction } from "./actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ categoryId: "asc" }, { order: "asc" }],
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">מוצרים</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-charcoal"
        >
          מוצר חדש
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border hairline">
        <table className="w-full text-start text-sm">
          <thead className="bg-mist text-stone">
            <tr>
              <th className="px-4 py-3 text-start font-medium">מוצר</th>
              <th className="px-4 py-3 text-start font-medium">קטגוריה</th>
              <th className="px-4 py-3 text-start font-medium">סטטוס</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hairline">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.heroImage}
                      alt=""
                      className="h-10 w-10 rounded-lg border hairline bg-mist object-contain p-1"
                    />
                    <div>
                      <p className="font-medium text-ink">{product.name}</p>
                      <p className="text-xs text-stone" dir="ltr">
                        {product.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-stone">{product.category.name}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-mist px-2.5 py-1 text-xs text-ink">
                      {product.published ? "מפורסם" : "טיוטה"}
                    </span>
                    {product.featured ? (
                      <span className="rounded-full bg-mist px-2.5 py-1 text-xs text-stone">
                        נבחר
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/product/${product.slug}`}
                      target="_blank"
                      className="text-stone underline-offset-4 hover:underline"
                    >
                      צפייה
                    </Link>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-ink underline-offset-4 hover:underline"
                    >
                      עריכה
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <ConfirmSubmitButton
                        confirmMessage={`למחוק את "${product.name}"?`}
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
