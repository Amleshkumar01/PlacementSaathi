import type { FaqItem } from "@/data/faq";
import { FaqHashOpener } from "@/components/FaqHashOpener";

/** Accordion using native <details>. Works without JavaScript. */
export function FaqList({ items, headingLevel = "h3" }: { items: FaqItem[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <FaqHashOpener className="space-y-3">
      {items.map((f) => (
        <details key={f.id} id={f.id} className="group card scroll-mt-24 p-0 transition hover:border-brand-200 open:border-brand-200 open:shadow-sm">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 marker:hidden">
            <Heading className="text-base font-semibold text-brand-900">{f.question}</Heading>
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg leading-none text-brand-600 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="prose-body px-5 pb-5">{f.answer}</p>
        </details>
      ))}
    </FaqHashOpener>
  );
}
