"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/use-favorites";

export function FavoritesNavLink() {
  const { count } = useFavorites();

  return (
    <Link
      href="/favorites"
      className="relative inline-flex items-center transition-colors hover:text-ink"
      aria-label="מועדפים"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20s-7.5-4.8-10-9.3C.4 7.4 2 4 5.3 4 7.6 4 9.5 5.4 12 8c2.5-2.6 4.4-4 6.7-4 3.3 0 4.9 3.4 3.3 6.7C19.5 15.2 12 20 12 20z" />
      </svg>
      {count > 0 ? (
        <span className="absolute -top-2 -start-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-medium text-paper">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
