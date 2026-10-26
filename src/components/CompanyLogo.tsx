import Image from "next/image";
import { companyLogos } from "@/data/companyLogos";
import { CompanyMark } from "./ui";

const sizes = {
  sm: { box: "h-11 w-16 p-1.5", img: "64px" },
  md: { box: "h-14 w-28 p-2.5", img: "112px" },
  lg: { box: "h-20 w-40 p-3 sm:h-24 sm:w-48", img: "192px" },
} as const;

/**
 * Company logo on a white tile. Falls back to a coloured monogram
 * if no logo file exists for the slug yet.
 */
export function CompanyLogo({
  slug,
  name,
  color = "#2563eb",
  size = "md",
  decorative = false,
}: {
  slug: string;
  name: string;
  color?: string;
  size?: keyof typeof sizes;
  /** true when the company name is already written next to the logo */
  decorative?: boolean;
}) {
  const logo = companyLogos[slug];
  if (!logo) return <CompanyMark name={name} color={color} size={size === "lg" ? "lg" : "md"} />;
  const s = sizes[size];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200/80 ${s.box}`}>
      <Image src={logo} alt={decorative ? "" : `${name} logo`} sizes={s.img} className="h-full w-full object-contain" />
    </span>
  );
}

/** Bare logo (no tile) for logo strips. Height is fixed, width follows the logo. */
export function CompanyLogoPlain({ slug, name, className = "h-8" }: { slug: string; name: string; className?: string }) {
  const logo = companyLogos[slug];
  if (!logo) return <span className="text-lg font-bold text-slate-500">{name}</span>;
  return <Image src={logo} alt={`${name} logo`} sizes="200px" className={`w-auto object-contain ${className}`} />;
}
