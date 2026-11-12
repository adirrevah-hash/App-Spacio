# SpaceView

אפליקציית Web להצגת מוצרים במציאות רבודה (AR) — פרגולות, מטבחים, מערכות
זכוכית, ריהוט ומוצרי עיצוב ואדריכלות. משתמשים בוחרים מוצר מתוך קטלוג, פותחים
את מצלמת הטלפון ורואים כיצד הוא נראה במרחב האמיתי שלהם.

## סטאק טכנולוגי

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Prisma + SQLite** — מסד נתונים לקטגוריות ומוצרים (קל להחליף ל-Postgres בהמשך)
- **`@google/model-viewer`** — תצוגת תלת-ממד ו-AR בדפדפן (Android Chrome:
  Scene Viewer / WebXR, iOS Safari: AR Quick Look עם קובץ USDZ)
- **Framer Motion** — אנימציות עדינות

## הרצה מקומית

```bash
npm install
npm run db:seed   # יוצר/מעדכן את מסד הנתונים עם קטגוריות ומוצרי דוגמה
npm run dev
```

האתר רץ בכתובת `http://localhost:3000`.

## פאנל ניהול

כתובת: `/admin` — הוספה ועריכה של קטגוריות ומוצרים (כולל העלאת תמונות ומודלי
AR) ללא צורך בשינוי קוד.

הסיסמה מוגדרת במשתנה הסביבה `ADMIN_PASSWORD` בקובץ `.env` (ברירת מחדל בפיתוח:
`spaceview-admin`). **חובה לשנות אותה לפני פרסום לאינטרנט.**

אם לא מועלים תמונה/מודל תלת-ממד למוצר, המערכת מציגה תצוגה זמנית
(placeholder) לפי הקטגוריה, כדי שהדף ייראה שלם עד להעלאת הקבצים האמיתיים.

## מבנה נתונים

- `prisma/schema.prisma` — הגדרת הטבלאות (`Category`, `Product`)
- `prisma/seed.ts` — נתוני דוגמה
- `scripts/generate-placeholder-*.mjs` — יצרו את קבצי ה-placeholder
  (SVG / GLB) תחת `public/`

## פקודות שימושיות

```bash
npm run build     # build לפרודקשן
npm run start     # הרצת ה-build
npm run db:reset  # איפוס מסד הנתונים + seed מחדש
npm run lint       # בדיקת lint
```
