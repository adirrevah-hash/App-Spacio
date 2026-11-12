import Link from "next/link";

export function CategoryCard({
  slug,
  name,
  description,
  productCount,
  icon,
}: {
  slug: string;
  name: string;
  description?: string | null;
  productCount: number;
  icon: string;
}) {
  return (
    <Link
      href={`/catalog?category=${slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border hairline bg-mist p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_24px_60px_-28px_rgba(20,20,22,0.35)] sm:p-8"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 ease-out group-hover:scale-105 sm:h-20 sm:w-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt=""
          className="h-8 w-8 sm:h-9 sm:w-9"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-ink sm:text-2xl">{name}</h3>
        {description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">
            {description}
          </p>
        ) : null}

        <div className="mt-5 flex items-center justify-between text-sm text-stone">
          <span>
            {productCount} {productCount === 1 ? "מוצר" : "מוצרים"}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border hairline transition-all duration-500 ease-out group-hover:-translate-x-1 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M5 12l6-6M5 12l6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
