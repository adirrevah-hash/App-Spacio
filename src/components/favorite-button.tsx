"use client";

import { useFavorites } from "@/hooks/use-favorites";
import clsx from "clsx";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7.5-4.8-10-9.3C.4 7.4 2 4 5.3 4 7.6 4 9.5 5.4 12 8c2.5-2.6 4.4-4 6.7-4 3.3 0 4.9 3.4 3.3 6.7C19.5 15.2 12 20 12 20z" />
    </svg>
  );
}

export function FavoriteButton({
  slug,
  variant = "overlay",
}: {
  slug: string;
  variant?: "overlay" | "inline";
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(slug);

  const label = active ? "הסרה מהמועדפים" : "הוספה למועדפים";

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={active}
        aria-label={label}
        className={clsx(
          "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors",
          active
            ? "border-ink bg-ink text-paper"
            : "hairline text-ink hover:border-ink"
        )}
      >
        <HeartIcon filled={active} />
        {active ? "במועדפים" : "שמירה למועדפים"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={active}
      aria-label={label}
      className={clsx(
        "absolute top-4 end-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors",
        active
          ? "bg-ink text-paper"
          : "bg-paper/80 text-ink hover:bg-paper"
      )}
    >
      <HeartIcon filled={active} />
    </button>
  );
}
