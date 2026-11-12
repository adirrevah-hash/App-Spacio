import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";

export function ProductCard({
  slug,
  name,
  shortDescription,
  heroImage,
  categoryName,
}: {
  slug: string;
  name: string;
  shortDescription?: string | null;
  heroImage: string;
  categoryName?: string;
}) {
  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border hairline bg-mist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt={name}
          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-10"
        />
        <span className="absolute top-4 start-4 rounded-full border border-paper/40 bg-paper/80 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          תצוגת AR
        </span>
        <FavoriteButton slug={slug} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium text-ink sm:text-lg">{name}</h3>
          {shortDescription ? (
            <p className="mt-1 line-clamp-1 text-sm text-stone">{shortDescription}</p>
          ) : null}
        </div>
        {categoryName ? (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-mist px-3 py-1 text-xs text-stone">
            {categoryName}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
