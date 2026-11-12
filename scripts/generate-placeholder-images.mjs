// Generates minimal, architectural/blueprint-style line-icon SVGs:
// a small category icon + a larger "hero" placeholder card reusing the same icon,
// used until real product photography is uploaded via the admin panel.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, "..", "public", "icons", "categories");
const heroDir = path.join(__dirname, "..", "public", "images", "placeholders");
fs.mkdirSync(iconsDir, { recursive: true });
fs.mkdirSync(heroDir, { recursive: true });

// Each icon is a set of simple stroke paths/shapes in a 64x64 box.
const icons = {
  "pergolas-and-canopies": `
    <path d="M8 16 H56" />
    <path d="M14 16 V22" /><path d="M23.6 16 V22" /><path d="M33.2 16 V22" />
    <path d="M42.8 16 V22" /><path d="M52.4 16 V22" />
    <path d="M12 16 V54" /><path d="M52 16 V54" />
    <path d="M6 54 H58" />
  `,
  kitchens: `
    <rect x="8" y="30" width="48" height="24" rx="1.5" />
    <path d="M8 30 H56" />
    <path d="M32 30 V54" />
    <ellipse cx="20" cy="21" rx="7" ry="3.2" />
    <path d="M20 17.8 V12 H27" />
  `,
  "glass-systems": `
    <rect x="10" y="8" width="44" height="48" rx="1.5" />
    <path d="M32 8 V56" />
    <path d="M10 32 H54" />
    <path d="M15 15 L26 26" />
  `,
  furniture: `
    <path d="M12 36 H44" />
    <path d="M40 8 V36" />
    <path d="M14 36 V54" />
    <path d="M42 36 V54" />
  `,
  "design-and-architecture": `
    <circle cx="32" cy="9" r="3" />
    <path d="M32 12 L17 55" />
    <path d="M32 12 L47 55" />
    <path d="M12 55 H22" />
    <path d="M42 55 H52" />
  `,
};

const categoryMeta = {
  "pergolas-and-canopies": "פרגולות וסוככים",
  kitchens: "מטבחים",
  "glass-systems": "מערכות זכוכית",
  furniture: "ריהוט",
  "design-and-architecture": "מוצרי עיצוב ואדריכלות",
};

function iconSvg(slug) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[slug]}</svg>`;
}

function heroSvg(slug) {
  const W = 960;
  const H = 720;
  const scale = 8.4;
  const iconSize = 64 * scale;
  const tx = (W - iconSize) / 2;
  const ty = (H - iconSize) / 2 - 10;
  const corner = 34;
  const pad = 36;
  const corners = [
    [pad, pad, pad + corner, pad, pad, pad + corner],
    [W - pad, pad, W - pad - corner, pad, W - pad, pad + corner],
    [pad, H - pad, pad + corner, H - pad, pad, H - pad - corner],
    [W - pad, H - pad, W - pad - corner, H - pad, W - pad, H - pad - corner],
  ];
  const cornerMarks = corners
    .map(
      ([x, y, x1, y1, x2, y2]) =>
        `<path d="M${x1} ${y1} L${x} ${y} L${x2} ${y2}" stroke="#c9c8c4" stroke-width="2" fill="none" />`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#f1f0ee" />
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#e2e1dd" />
  ${cornerMarks}
  <g transform="translate(${tx} ${ty}) scale(${scale})" stroke="#2a2a2d" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
    ${icons[slug]}
  </g>
</svg>`;
}

for (const slug of Object.keys(icons)) {
  fs.writeFileSync(path.join(iconsDir, `${slug}.svg`), iconSvg(slug).trim() + "\n");
  fs.writeFileSync(path.join(heroDir, `${slug}.svg`), heroSvg(slug).trim() + "\n");
  console.log("wrote icon+hero for", slug, categoryMeta[slug]);
}

// Generic fallback icon+hero for categories created later via the admin panel
// (no dedicated icon uploaded yet).
icons["square"] = `
  <rect x="14" y="14" width="36" height="36" rx="3" />
  <path d="M14 32 H50" />
  <path d="M32 14 V50" />
`;
fs.writeFileSync(path.join(iconsDir, "square.svg"), iconSvg("square").trim() + "\n");
fs.writeFileSync(path.join(heroDir, "square.svg"), heroSvg("square").trim() + "\n");
console.log("wrote icon+hero for square (generic fallback)");
