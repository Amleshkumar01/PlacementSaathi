import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";

/** Compact hero shared only by aptitude routes. */
export function AptitudeHero({ eyebrow, title, intro, icon, children, compact = false }: {
  eyebrow: string;
  title: string;
  intro: string;
  icon: IconName;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="bg-hero relative overflow-hidden border-b border-slate-200/70">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className={`container-page relative min-w-0 ${compact ? "py-6 sm:py-8" : "py-7 sm:py-9 lg:py-10"}`}>
        <p className="glass inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-700">
          <Icon name={icon} className="h-4 w-4 shrink-0" />
          <span className="min-w-0 break-words">{eyebrow}</span>
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-bold tracking-tight break-words text-brand-900 sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed break-words text-muted sm:text-lg">{intro}</p>
        {children}
      </div>
    </section>
  );
}
