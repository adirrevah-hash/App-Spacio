import { CategoryForm } from "@/components/admin/category-form";
import { createCategoryAction } from "../actions";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">קטגוריה חדשה</h1>
      <div className="mt-8">
        <CategoryForm action={createCategoryAction} />
      </div>
    </div>
  );
}
