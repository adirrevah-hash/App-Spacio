"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "spaceview:favorites";
const EVENT_NAME = "spaceview:favorites-changed";

const EMPTY: string[] = [];
let cache: string[] = EMPTY;
let cacheInitialized = false;

function readFromStorage(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (!cacheInitialized) {
    cache = readFromStorage();
    cacheInitialized = true;
  }
  return cache;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  const handler = () => {
    cache = readFromStorage();
    callback();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(EVENT_NAME, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(EVENT_NAME, handler);
  };
}

function writeFavorites(slugs: string[]) {
  cache = slugs;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // localStorage unavailable (private mode etc.) — in-memory cache still works for this tab.
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    writeFavorites(next);
  }, []);

  return { favorites, isFavorite, toggle, count: favorites.length };
}
