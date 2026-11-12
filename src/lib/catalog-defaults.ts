// Conventions for placeholder assets used until real photography / 3D models
// are uploaded through the admin panel.

export const GENERIC_ICON = "/icons/categories/square.svg";
export const GENERIC_HERO_IMAGE = "/images/placeholders/square.svg";
export const GENERIC_MODEL = "/models/placeholders/generic-box.glb";

const CATEGORY_PLACEHOLDER_MODEL: Record<string, string> = {
  "pergolas-and-canopies": "/models/placeholders/pergola-frame.glb",
  kitchens: "/models/placeholders/kitchen-block.glb",
  "glass-systems": "/models/placeholders/glass-panel.glb",
  furniture: "/models/placeholders/furniture-chair.glb",
  "design-and-architecture": "/models/placeholders/design-object.glb",
};

const CATEGORY_PLACEHOLDER_HERO: Record<string, string> = {
  "pergolas-and-canopies": "/images/placeholders/pergolas-and-canopies.svg",
  kitchens: "/images/placeholders/kitchens.svg",
  "glass-systems": "/images/placeholders/glass-systems.svg",
  furniture: "/images/placeholders/furniture.svg",
  "design-and-architecture": "/images/placeholders/design-and-architecture.svg",
};

const CATEGORY_PLACEHOLDER_ICON: Record<string, string> = {
  "pergolas-and-canopies": "/icons/categories/pergolas-and-canopies.svg",
  kitchens: "/icons/categories/kitchens.svg",
  "glass-systems": "/icons/categories/glass-systems.svg",
  furniture: "/icons/categories/furniture.svg",
  "design-and-architecture": "/icons/categories/design-and-architecture.svg",
};

export function defaultModelForCategory(categorySlug: string) {
  return CATEGORY_PLACEHOLDER_MODEL[categorySlug] ?? GENERIC_MODEL;
}

export function defaultHeroForCategory(categorySlug: string) {
  return CATEGORY_PLACEHOLDER_HERO[categorySlug] ?? GENERIC_HERO_IMAGE;
}

export function defaultIconForCategory(categorySlug: string) {
  return CATEGORY_PLACEHOLDER_ICON[categorySlug] ?? GENERIC_ICON;
}

export const IS_PLACEHOLDER_ASSET = (path: string) =>
  path.startsWith("/models/placeholders/") || path.startsWith("/images/placeholders/");
