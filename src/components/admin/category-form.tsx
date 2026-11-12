"use client";

import { useActionState } from "react";
import Link from "next/link";

type ActionState = { error?: string };
type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export function CategoryForm({
  action,
  defaultValues,
}: {
  action: Action;
  defaultValues?: {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    order: number;
    published: boolean;
    icon?: string;
  };
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      {defaultValues?.id ? (
        <input type="hidden" name="id" value={defaultValues.id} />
      ) : null}

      <div>
        <label className="block text-sm font-medium text-ink">שם הקטגוריה</label>
        <input
          name="name"
          defaultValue={defaultValues?.name}
          required
          className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          placeholder="לדוגמה: פרגולות וסוככים"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">
          מזהה לכתובת האתר (slug)
        </label>
        <input
          name="slug"
          defaultValue={defaultValues?.slug}
          required
          dir="ltr"
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          placeholder="pergolas-and-canopies"
        />
        <p className="mt-1.5 text-xs text-stone">
          אותיות אנגליות קטנות, מספרים ומקפים בלבד.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">תיאור קצר</label>
        <textarea
          name="description"
          defaultValue={defaultValues?.description ?? ""}
          rows={3}
          className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink">סדר הצגה</label>
          <input
            type="number"
            name="order"
            defaultValue={defaultValues?.order ?? 0}
            className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </div>
        <div className="flex items-end pb-3">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              name="published"
              defaultChecked={defaultValues?.published ?? true}
              className="h-4 w-4 rounded border-stone"
            />
            מפורסם באתר
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">
          אייקון קטגוריה (SVG/PNG, אופציונלי)
        </label>
        <input
          type="file"
          name="iconFile"
          accept="image/*"
          className="mt-2 w-full text-sm text-stone file:me-4 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:text-ink"
        />
        <p className="mt-1.5 text-xs text-stone">
          אם לא מועלה קובץ, תוצג תמונה זמנית כללית.
        </p>
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
        <Link href="/admin/categories" className="text-sm text-stone hover:text-ink">
          ביטול
        </Link>
      </div>
    </form>
  );
}
