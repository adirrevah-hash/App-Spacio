"use client";

import { useActionState } from "react";
import { submitContactAction } from "./actions";

export function ContactForm({
  productSlug,
  productName,
}: {
  productSlug?: string;
  productName?: string;
}) {
  const [state, formAction, pending] = useActionState(submitContactAction, {});

  if (state.success) {
    return (
      <div className="rounded-2xl border hairline bg-mist p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-ink">הפנייה נשלחה בהצלחה</h2>
        <p className="mt-2 text-stone">
          תודה שפניתם אלינו — נחזור אליכם בהקדם האפשרי.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {productSlug ? (
        <>
          <input type="hidden" name="productSlug" value={productSlug} />
          <input type="hidden" name="productName" value={productName ?? ""} />
          <div className="rounded-xl bg-mist px-4 py-3 text-sm text-ink/80">
            בקשת הצעת מחיר בנוגע למוצר: <span className="font-medium text-ink">{productName}</span>
          </div>
        </>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">שם מלא</label>
          <input
            name="name"
            required
            className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">טלפון</label>
          <input
            name="phone"
            type="tel"
            required
            dir="ltr"
            className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-end text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">
          אימייל (אופציונלי)
        </label>
        <input
          name="email"
          type="email"
          dir="ltr"
          className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-end text-ink outline-none focus:border-ink"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">הודעה</label>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          placeholder="ספרו לנו קצת על הפרויקט שלכם..."
        />
      </div>

      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-6 py-4 text-sm font-medium text-paper transition-colors hover:bg-charcoal disabled:opacity-50 sm:w-auto"
      >
        {pending ? "שולח…" : "שליחת פנייה"}
      </button>
    </form>
  );
}
