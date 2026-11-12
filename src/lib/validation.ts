import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(2, "המזהה חייב להכיל לפחות 2 תווים")
  .max(80)
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    "המזהה יכול להכיל רק אותיות אנגליות קטנות, מספרים ומקפים"
  );

export const categorySchema = z.object({
  name: z.string().trim().min(1, "שם הקטגוריה נדרש").max(120),
  slug: slugSchema,
  description: z.string().trim().max(400).optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
});

export const productSchema = z.object({
  name: z.string().trim().min(1, "שם המוצר נדרש").max(160),
  slug: slugSchema,
  categoryId: z.string().trim().min(1, "יש לבחור קטגוריה"),
  shortDescription: z.string().trim().max(240).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  widthCm: z.coerce.number().positive().optional().or(z.literal("")),
  heightCm: z.coerce.number().positive().optional().or(z.literal("")),
  depthCm: z.coerce.number().positive().optional().or(z.literal("")),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "נא להזין שם מלא").max(120),
  phone: z.string().trim().min(7, "נא להזין מספר טלפון תקין").max(30),
  email: z
    .string()
    .trim()
    .email("כתובת אימייל לא תקינה")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  productSlug: z.string().trim().max(120).optional().or(z.literal("")),
  productName: z.string().trim().max(160).optional().or(z.literal("")),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
