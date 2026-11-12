"use server";

import { redirect } from "next/navigation";
import { checkAdminPassword, createAdminSession } from "@/lib/admin-auth";

export async function loginAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");

  if (!password || !checkAdminPassword(password)) {
    return { error: "סיסמה שגויה" };
  }

  await createAdminSession();
  redirect("/admin");
}
