import Link from "next/link";
import type { ReactNode } from "react";
import type { Difficulty } from "@/data/dsa";
import type { Weightage } from "@/data/aptitude";
import { Icon, type IconName } from "./Icon";

/** Top block of every inner page: eyebrow, the page's single H1 and intro. */
export function PageHero({
  eyebrow,
  title,
  intro,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  icon?: IconName;
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero relative overflow-hidden border-b border-slate-200/70">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="container-page relative py-12 sm:py-16">
        <p className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-700">
          {icon && <Icon name={icon} className="h-4 w-4" />}
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-brand-900 sm:text-5xl">{title}</h1>
        <p className="lead mt-4 max-w-3xl">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  action,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="h2 mt-1 scroll-mt-24">
          {title}
        </h2>
        {intro && <p className="prose-body mt-2">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn btn-secondary shrink-0 self-start text-sm sm:self-auto">
          {action.label}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** Clear next-step call to action at the bottom of every page. */
export function NextStep({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="next-step" className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 px-6 py-12 text-center sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent-500/30 blur-2xl" aria-hidden="true" />
          <p className="glass-dark relative mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white">
            <Icon name="rocket" className="h-4 w-4" /> Your next step
          </p>
          <h2 id="next-step" className="relative mt-4 text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-3 max-w-2xl text-brand-100">{text}</p>
          <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={primary.href} className="btn btn-accent">
              {primary.label}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn border border-white/30 text-white hover:bg-white/10">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Medium: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Hard: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
};

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return <span className={`badge ${difficultyStyles[level]}`}>{level}</span>;
}

const weightStyles: Record<Weightage, string> = {
  High: "bg-accent-50 text-accent-700 ring-1 ring-accent-200",
  Medium: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
  Low: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

export function WeightBadge({ level }: { level: Weightage }) {
  return <span className={`badge ${weightStyles[level]}`}>{level}</span>;
}

export function Note({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "brand" | "warn" }) {
  const cls = {
    accent: "border-accent-200 bg-accent-50/70 text-accent-800",
    brand: "border-brand-200 bg-brand-50/70 text-brand-800",
    warn: "border-amber-200 bg-amber-50 text-amber-900",
  }[tone];
  return (
    <div className={`flex gap-3 rounded-2xl border px-4 py-3 text-sm leading-relaxed ${cls}`}>
      <Icon name={tone === "warn" ? "alert" : "sparkles"} className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-slate-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="font-medium text-brand-800">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="tap hover:text-brand-700 hover:underline">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Coloured monogram tile for a company (not a logo, to respect trademarks). */
export function CompanyMark({ name, color, size = "md" }: { name: string; color: string; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-14 w-14 text-lg" : "h-11 w-11 text-sm";
  return (
    <span
      className={`inline-flex ${dim} shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-sm`}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      aria-hidden="true"
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}

/** Numbered step badge used in lists */
export function StepNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-sm font-bold text-white">
      {n}
    </span>
  );
}
