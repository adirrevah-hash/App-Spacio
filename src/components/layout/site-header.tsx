import Link from "next/link";
import { FavoritesNavLink } from "./favorites-nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="container-edge flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.14em] text-ink md:text-xl"
        >
          SPACEVIEW
        </Link>

        <nav className="flex items-center gap-5 text-sm text-ink/80 md:gap-8 md:text-[0.95rem]">
          <Link
            href="/catalog"
            className="hidden transition-colors hover:text-ink sm:inline"
          >
            קטלוג
          </Link>
          <Link
            href="/about"
            className="hidden transition-colors hover:text-ink sm:inline"
          >
            אודות
          </Link>
          <Link
            href="/contact"
            className="hidden transition-colors hover:text-ink sm:inline"
          >
            יצירת קשר
          </Link>
          <FavoritesNavLink />
          <Link
            href="/catalog"
            className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-charcoal"
          >
            מתחילים לדמיין
          </Link>
        </nav>
      </div>
    </header>
  );
}
