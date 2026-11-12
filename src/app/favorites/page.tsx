import { Reveal } from "@/components/reveal";
import { FavoritesView } from "./favorites-view";

export default function FavoritesPage() {
  return (
    <div className="container-edge py-14 sm:py-20">
      <Reveal>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">מועדפים</h1>
        <p className="mt-3 text-stone sm:text-lg">
          המוצרים ששמרתם לצפייה מאוחר יותר, שמורים על המכשיר הזה בלבד.
        </p>
      </Reveal>

      <FavoritesView />
    </div>
  );
}
