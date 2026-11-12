"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="w-full max-w-sm">
      <label className="block text-sm font-medium text-ink">סיסמת ניהול</label>
      <input
        type="password"
        name="password"
        autoFocus
        required
        className="mt-2 w-full rounded-xl border hairline bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
      />
      {state?.error ? (
        <p className="mt-2 text-sm text-red-600">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-charcoal disabled:opacity-50"
      >
        {pending ? "מתחבר…" : "כניסה"}
      </button>
    </form>
  );
}
