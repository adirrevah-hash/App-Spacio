import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/category-form";
import { updateCategoryAction } from "../../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">
        עריכת קטגוריה
      </h1>
      <div className="mt-8">
        <CategoryForm action={updateCategoryAction} defaultValues={category} />
      </div>
    </div>
  );
}
