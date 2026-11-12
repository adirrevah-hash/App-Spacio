import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t hairline">
      <div className="container-edge flex flex-col gap-4 py-10 text-sm text-stone md:flex-row md:items-center md:justify-between md:py-12">
        <p className="tracking-wide">
          <span className="font-semibold text-ink">SPACEVIEW</span> — מציאות רבודה למרחב שלכם
        </p>
        <div className="flex items-center gap-6">
          <Link href="/catalog" className="transition-colors hover:text-ink">
            קטלוג
          </Link>
          <Link href="/admin" className="transition-colors hover:text-ink">
            ניהול
          </Link>
          <span className="text-stone-light">© {new Date().getFullYear()} SpaceView</span>
        </div>
      </div>
    </footer>
  );
}
