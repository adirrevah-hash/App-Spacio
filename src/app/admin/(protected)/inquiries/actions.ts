"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleHandledAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const handled = formData.get("handled") === "true";
  if (!id) return;

  await prisma.contactRequest.update({ where: { id }, data: { handled: !handled } });
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiryAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.contactRequest.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/inquiries");
}
