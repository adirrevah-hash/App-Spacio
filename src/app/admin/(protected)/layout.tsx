import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { logoutAction } from "./actions";

const NAV = [
  { href: "/admin", label: "סקירה" },
  { href: "/admin/categories", label: "קטגוריות" },
  { href: "/admin/products", label: "מוצרים" },
];

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="container-edge grid grid-cols-1 gap-8 py-10 md:grid-cols-[14rem_1fr] md:gap-12 md:py-14">
      <aside className="md:sticky md:top-24 md:self-start">
        <p className="text-xs tracking-[0.14em] text-stone">ניהול SPACEVIEW</p>
        <nav className="mt-4 flex gap-2 overflow-x-auto md:mt-6 md:flex-col md:gap-1 md:overflow-visible">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-mist hover:text-ink md:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-6">
          <button
            type="submit"
            className="text-sm text-stone transition-colors hover:text-ink"
          >
            התנתקות
          </button>
        </form>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
