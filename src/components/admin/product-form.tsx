"use client";

import { useActionState } from "react";
import Link from "next/link";

type ActionState = { error?: string };
type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export function ProductForm({
  action,
  categories,
  defaultValues,
}: {
  action: Action;
  categories: { id: string; name: string }[];
  defaultValues?: {
    id?: string;
    name: string;
    slug: string;
    categoryId: string;
    shortDescription?: string | null;
    description?: string | null;
    widthCm?: number | null;
    heightCm?: number | null;
    depthCm?: number | null;
    featured: boolean;
    published: boolean;
  };
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {defaultValues?.id ? (
        <input type="hidden" name="id" value={defaultValues.id} />
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">שם המוצר</label>
          <input
            name="name"
            defaultValue={defaultValues?.name}
            required
            className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">
            מזהה לכתובת (slug)
          </label>
          <input
            name="slug"
            defaultValue={defaultValues?.slug}
            required
            dir="ltr"
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
            placeholder="horizon-aluminum-pergola"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">קטגוריה</label>
        <select
          name="categoryId"
          defaultValue={defaultValues?.categoryId}
          required
          className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
        >
          <option value="" disabled>
            בחרו קטגוריה
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">תיאור קצר</label>
        <input
          name="shortDescription"
          defaultValue={defaultValues?.shortDescription ?? ""}
          className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">תיאור מלא</label>
        <textarea
          name="description"
          defaultValue={defaultValues?.description ?? ""}
          rows={4}
          className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink">רוחב (ס&quot;מ)</label>
          <input
            type="number"
            step="0.1"
            name="widthCm"
            defaultValue={defaultValues?.widthCm ?? ""}
            className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">גובה (ס&quot;מ)</label>
          <input
            type="number"
            step="0.1"
            name="heightCm"
            defaultValue={defaultValues?.heightCm ?? ""}
            className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">עומק (ס&quot;מ)</label>
          <input
            type="number"
            step="0.1"
            name="depthCm"
            defaultValue={defaultValues?.depthCm ?? ""}
            className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={defaultValues?.published ?? true}
            className="h-4 w-4 rounded border-stone"
          />
          מפורסם באתר
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={defaultValues?.featured ?? false}
            className="h-4 w-4 rounded border-stone"
          />
          הצגה כ&quot;מוצר נבחר&quot; בעמוד הבית
        </label>
      </div>

      <div className="rounded-2xl bg-mist p-5">
        <p className="text-sm font-medium text-ink">קבצי מדיה</p>
        <p className="mt-1 text-xs leading-relaxed text-stone">
          אם לא מעלים קבצים, המוצר יוצג עם תמונה ומודל תלת-ממד זמניים לפי
          הקטגוריה שנבחרה.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-ink">תמונה ראשית</label>
            <input
              type="file"
              name="heroImageFile"
              accept="image/*"
              className="mt-2 w-full text-xs text-stone file:me-3 file:rounded-full file:border-0 file:bg-paper file:px-3 file:py-1.5 file:text-ink"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">
              מודל AR‏ (GLB)
            </label>
            <input
              type="file"
              name="modelGlbFile"
              accept=".glb,model/gltf-binary"
              className="mt-2 w-full text-xs text-stone file:me-3 file:rounded-full file:border-0 file:bg-paper file:px-3 file:py-1.5 file:text-ink"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">
              מודל ל-iPhone (USDZ)
            </label>
            <input
              type="file"
              name="modelUsdzFile"
              accept=".usdz,model/vnd.usdz+zip"
              className="mt-2 w-full text-xs text-stone file:me-3 file:rounded-full file:border-0 file:bg-paper file:px-3 file:py-1.5 file:text-ink"
            />
          </div>
        </div>
      </div>

      {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-charcoal disabled:opacity-50"
        >
          {pending ? "שומר…" : "שמירה"}
        </button>
        <Link href="/admin/products" className="text-sm text-stone hover:text-ink">
          ביטול
        </Link>
      </div>
    </form>
  );
}
