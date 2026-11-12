"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { categorySchema, type CategoryInput } from "@/lib/validation";
import { isUsableFile, saveUploadedFile } from "@/lib/uploads";
import { GENERIC_ICON } from "@/lib/catalog-defaults";

function parseCategoryForm(
  formData: FormData
): { error: string; data?: undefined } | { error?: undefined; data: CategoryInput } {
  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    order: formData.get("order") || 0,
    published: formData.get("published"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "נתונים לא תקינים" };
  }
  return { data: parsed.data };
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/catalog");
}

export async function createCategoryAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const result = parseCategoryForm(formData);
  if (result.error !== undefined) return { error: result.error };
  const data = result.data;

  const existing = await prisma.category.findUnique({ where: { slug: data.slug } });
  if (existing) return { error: "קיימת כבר קטגוריה עם מזהה זה" };

  let icon = GENERIC_ICON;
  const iconFile = formData.get("iconFile");
  if (isUsableFile(iconFile)) {
    icon = await saveUploadedFile(iconFile, "images", ".svg");
  }

  await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      order: data.order,
      published: data.published,
      icon,
    },
  });

  revalidatePublic();
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const id = String(formData.get("id") ?? "");
  const result = parseCategoryForm(formData);
  if (result.error !== undefined) return { error: result.error };
  const data = result.data;

  const existing = await prisma.category.findUnique({ where: { slug: data.slug } });
  if (existing && existing.id !== id) {
    return { error: "קיימת כבר קטגוריה עם מזהה זה" };
  }

  const iconFile = formData.get("iconFile");
  const iconUpdate = isUsableFile(iconFile)
    ? { icon: await saveUploadedFile(iconFile, "images", ".svg") }
    : {};

  await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      order: data.order,
      published: data.published,
      ...iconUpdate,
    },
  });

  revalidatePublic();
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.category.delete({ where: { id } }).catch(() => {});

  revalidatePublic();
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
