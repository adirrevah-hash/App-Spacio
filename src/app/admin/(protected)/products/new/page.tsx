import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";
import { createProductAction } from "../actions";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">מוצר חדש</h1>
      <div className="mt-8">
        <ProductForm action={createProductAction} categories={categories} />
      </div>
    </div>
  );
}
