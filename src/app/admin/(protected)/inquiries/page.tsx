import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { toggleHandledAction, deleteInquiryAction } from "./actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("he-IL", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">פניות</h1>
      <p className="mt-2 text-stone">פניות שהתקבלו מדף יצירת הקשר באתר.</p>

      <div className="mt-8 space-y-4">
        {inquiries.length === 0 ? (
          <div className="rounded-2xl border hairline bg-mist p-10 text-center text-stone">
            עדיין לא התקבלו פניות.
          </div>
        ) : null}

        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="rounded-2xl border hairline p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-ink">{inquiry.name}</p>
                  <span
                    className={
                      inquiry.handled
                        ? "rounded-full bg-mist px-2.5 py-0.5 text-xs text-stone"
                        : "rounded-full bg-ink px-2.5 py-0.5 text-xs text-paper"
                    }
                  >
                    {inquiry.handled ? "טופל" : "חדש"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone" dir="ltr">
                  {inquiry.phone}
                  {inquiry.email ? ` · ${inquiry.email}` : ""}
                </p>
                {inquiry.productName ? (
                  <p className="mt-1 text-sm text-ink/80">
                    בנוגע למוצר:{" "}
                    {inquiry.productSlug ? (
                      <Link
                        href={`/product/${inquiry.productSlug}`}
                        target="_blank"
                        className="underline-offset-4 hover:underline"
                      >
                        {inquiry.productName}
                      </Link>
                    ) : (
                      inquiry.productName
                    )}
                  </p>
                ) : null}
                {inquiry.message ? (
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">
                    {inquiry.message}
                  </p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-3 text-sm">
                <span className="text-stone">{formatDate(inquiry.createdAt)}</span>
                <form action={toggleHandledAction}>
                  <input type="hidden" name="id" value={inquiry.id} />
                  <input type="hidden" name="handled" value={String(inquiry.handled)} />
                  <button type="submit" className="text-ink underline-offset-4 hover:underline">
                    {inquiry.handled ? "סמן כחדש" : "סמן כטופל"}
                  </button>
                </form>
                <form action={deleteInquiryAction}>
                  <input type="hidden" name="id" value={inquiry.id} />
                  <ConfirmSubmitButton
                    confirmMessage={`למחוק את הפנייה של "${inquiry.name}"?`}
                    className="text-red-600 hover:underline"
                  >
                    מחיקה
                  </ConfirmSubmitButton>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
