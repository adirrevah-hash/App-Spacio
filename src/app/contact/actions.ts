"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

type ContactState = { error?: string; success?: boolean };

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    productSlug: formData.get("productSlug"),
    productName: formData.get("productName"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "נתונים לא תקינים" };
  }
  const data = parsed.data;

  await prisma.contactRequest.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message || null,
      productSlug: data.productSlug || null,
      productName: data.productName || null,
    },
  });

  revalidatePath("/admin/inquiries");
  return { success: true };
}
