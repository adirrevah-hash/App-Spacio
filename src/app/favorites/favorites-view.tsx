"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/use-favorites";
import { ProductCard } from "@/components/product-card";
import { getFavoriteProducts } from "./actions";

type Product = Awaited<ReturnType<typeof getFavoriteProducts>>[number];

export function FavoritesView() {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getFavoriteProducts(favorites).then((result) => {
      if (!cancelled) setProducts(result);
    });
    return () => {
      cancelled = true;
    };
  }, [favorites]);

  if (products === null) {
    return <div className="py-10 text-center text-stone">טוען…</div>;
  }

  if (products.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border hairline bg-mist p-12 text-center">
        <p className="text-stone">עדיין לא שמרתם מוצרים למועדפים.</p>
        <Link
          href="/catalog"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-charcoal"
        >
          לקטלוג המוצרים
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          slug={product.slug}
          name={product.name}
          shortDescription={product.shortDescription}
          heroImage={product.heroImage}
          categoryName={product.category.name}
        />
      ))}
    </div>
  );
}
