import Link from "next/link";
import { footerGroups, site } from "@/data/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <Link href="/" aria-label="PlacementSaathi home">
            <Logo />
          </Link>
          <p className="text-sm text-slate-600">{site.tagline}.</p>
          <p className="text-sm text-slate-600">Free, honest placement preparation for BTech CSE students.</p>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:underline">
            <Icon name="mail" className="h-4 w-4" />
            {site.email}
          </a>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold text-brand-900">{group.title}</p>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-brand-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200">
        <div className="container-page flex flex-col gap-2 py-6 text-xs leading-relaxed text-slate-500 md:flex-row md:justify-between">
          <p className="max-w-3xl">
            PlacementSaathi is a preparation platform. We do not guarantee any placement, job or salary. Company names are
            trademarks of their respective owners; PlacementSaathi is not affiliated with any company.
          </p>
          <p className="shrink-0">© PlacementSaathi · placementsaathi.in</p>
        </div>
      </div>
    </footer>
  );
}
