"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { productSchema, type ProductInput } from "@/lib/validation";
import { isUsableFile, saveUploadedFile } from "@/lib/uploads";
import { defaultHeroForCategory, defaultModelForCategory } from "@/lib/catalog-defaults";

function toNullableNumber(value: number | "" | undefined) {
  return value === "" || value === undefined ? null : value;
}

function parseProductForm(
  formData: FormData
): { error: string; data?: undefined } | { error?: undefined; data: ProductInput } {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    categoryId: formData.get("categoryId"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    widthCm: formData.get("widthCm") || "",
    heightCm: formData.get("heightCm") || "",
    depthCm: formData.get("depthCm") || "",
    featured: formData.get("featured"),
    published: formData.get("published"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "נתונים לא תקינים" };
  }
  return { data: parsed.data };
}

function revalidatePublic(categorySlug?: string, productSlug?: string) {
  revalidatePath("/");
  revalidatePath("/catalog");
  if (productSlug) revalidatePath(`/product/${productSlug}`);
}

export async function createProductAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const result = parseProductForm(formData);
  if (result.error !== undefined) return { error: result.error };
  const data = result.data;

  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing) return { error: "קיים כבר מוצר עם מזהה זה" };

  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) return { error: "קטגוריה לא נמצאה" };

  const heroFile = formData.get("heroImageFile");
  const glbFile = formData.get("modelGlbFile");
  const usdzFile = formData.get("modelUsdzFile");

  const heroImage = isUsableFile(heroFile)
    ? await saveUploadedFile(heroFile, "images", ".jpg")
    : defaultHeroForCategory(category.slug);

  const modelGlb = isUsableFile(glbFile)
    ? await saveUploadedFile(glbFile, "models", ".glb")
    : defaultModelForCategory(category.slug);

  const modelUsdz = isUsableFile(usdzFile)
    ? await saveUploadedFile(usdzFile, "models", ".usdz")
    : null;

  await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      categoryId: data.categoryId,
      shortDescription: data.shortDescription || null,
      description: data.description || null,
      widthCm: toNullableNumber(data.widthCm),
      heightCm: toNullableNumber(data.heightCm),
      depthCm: toNullableNumber(data.depthCm),
      featured: data.featured,
      published: data.published,
      heroImage,
      modelGlb,
      modelUsdz,
    },
  });

  revalidatePublic(category.slug, data.slug);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const id = String(formData.get("id") ?? "");
  const result = parseProductForm(formData);
  if (result.error !== undefined) return { error: result.error };
  const data = result.data;

  const current = await prisma.product.findUnique({ where: { id } });
  if (!current) return { error: "המוצר לא נמצא" };

  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing && existing.id !== id) {
    return { error: "קיים כבר מוצר עם מזהה זה" };
  }

  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) return { error: "קטגוריה לא נמצאה" };

  const heroFile = formData.get("heroImageFile");
  const glbFile = formData.get("modelGlbFile");
  const usdzFile = formData.get("modelUsdzFile");

  const heroImage = isUsableFile(heroFile)
    ? await saveUploadedFile(heroFile, "images", ".jpg")
    : current.heroImage;

  const modelGlb = isUsableFile(glbFile)
    ? await saveUploadedFile(glbFile, "models", ".glb")
    : current.modelGlb;

  const modelUsdz = isUsableFile(usdzFile)
    ? await saveUploadedFile(usdzFile, "models", ".usdz")
    : current.modelUsdz;

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      categoryId: data.categoryId,
      shortDescription: data.shortDescription || null,
      description: data.description || null,
      widthCm: toNullableNumber(data.widthCm),
      heightCm: toNullableNumber(data.heightCm),
      depthCm: toNullableNumber(data.depthCm),
      featured: data.featured,
      published: data.published,
      heroImage,
      modelGlb,
      modelUsdz,
    },
  });

  revalidatePublic(category.slug, data.slug);
  if (current.slug !== data.slug) revalidatePath(`/product/${current.slug}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const product = await prisma.product.delete({ where: { id } }).catch(() => null);

  revalidatePublic();
  if (product) revalidatePath(`/product/${product.slug}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
