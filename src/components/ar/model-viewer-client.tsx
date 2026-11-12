"use client";

import { useEffect, useState } from "react";

export function ModelViewerClient({
  src,
  iosSrc,
  alt,
}: {
  src: string;
  iosSrc?: string | null;
  alt: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <model-viewer
        src={src}
        ios-src={iosSrc ?? undefined}
        alt={alt}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        loading="eager"
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      >
        <button
          slot="ar-button"
          className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper shadow-lg transition-colors hover:bg-charcoal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3v12M6 9l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          הציבו במרחב שלכם
        </button>
      </model-viewer>

      {!ready ? (
        <div className="absolute inset-0 flex items-center justify-center bg-mist">
          <span className="text-sm text-stone">טוען תצוגת תלת-ממד…</span>
        </div>
      ) : null}
    </div>
  );
}
