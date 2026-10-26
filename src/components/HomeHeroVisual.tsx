import Image from "next/image";
// Transparent cutout generated from src/image/hero-boy.png by scripts/make-cutout.ps1
import heroBoy from "@/image/hero-boy-cutout.png";
import { Icon } from "./Icon";
import { CompanyLogo } from "./CompanyLogo";

/**
 * Right side of the home hero: student photo with floating glass cards.
 * The cards show real site features (company guides), not fake offers.
 */
export function HomeHeroVisual() {
  return (
    // On desktop the width is also capped by screen height (photo ratio is about 1.15:1),
    // so the whole picture stays visible without scrolling.
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-[min(100%,calc((100svh-8rem)*1.15))] 2xl:max-w-[min(680px,calc((100svh-8rem)*1.15))]">
      {/* Soft glow + ring behind the photo */}
      <div className="pointer-events-none absolute left-1/2 top-[18%] aspect-square w-[78%] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-200/70 via-accent-200/60 to-white blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[14%] aspect-square w-[86%] -translate-x-1/2 rounded-full border border-white/70" aria-hidden="true" />

      <Image
        src={heroBoy}
        alt="Smiling engineering student with a backpack holding a laptop, ready for placement preparation"
        preload
        sizes="(min-width: 1536px) 680px, (min-width: 1024px) 560px, (min-width: 640px) 70vw, 92vw"
        className="relative h-auto w-full drop-shadow-[0_24px_30px_rgba(30,64,175,0.18)] [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
      />

      {/* Floating glass cards (decorative) */}
      <div aria-hidden="true">
        <div className="glass animate-float absolute left-0 top-[16%] hidden items-center gap-3 px-3.5 py-2.5 sm:flex lg:-left-6">
          <CompanyLogo slug="tcs" name="TCS" size="sm" decorative />
          <div className="leading-tight">
            <p className="text-[11px] text-slate-500">Company guide</p>
            <p className="text-sm font-bold text-brand-900">TCS NQT</p>
            <p className="text-[11px] text-slate-500">Ninja · Digital · Prime</p>
          </div>
        </div>

        <div className="glass animate-float-slow absolute right-0 top-[2%] hidden items-center gap-3 px-3.5 py-2.5 sm:flex lg:-right-4">
          <CompanyLogo slug="amazon" name="Amazon" size="sm" decorative />
          <div className="leading-tight">
            <p className="text-[11px] text-slate-500">Product company</p>
            <p className="text-sm font-bold text-brand-900">Amazon</p>
            <p className="text-[11px] text-slate-500">SDE-1 prep guide</p>
          </div>
        </div>

        <div className="glass animate-float absolute right-0 top-[30%] hidden items-center gap-3 px-3.5 py-2.5 sm:flex lg:-right-8">
          <CompanyLogo slug="infosys" name="Infosys" size="sm" decorative />
          <div className="leading-tight">
            <p className="text-[11px] text-slate-500">Service company</p>
            <p className="text-sm font-bold text-brand-900">Infosys</p>
            <p className="text-[11px] text-slate-500">SE · DSE · SP</p>
          </div>
        </div>

        <div className="animate-float-slow absolute bottom-[4%] right-0 w-[180px] rounded-2xl border border-white/30 bg-gradient-to-br from-brand-600/85 to-accent-600/85 p-4 text-white shadow-[0_20px_40px_-12px_rgba(91,33,182,0.55)] backdrop-blur-md sm:w-[220px] lg:-right-6">
          <p className="text-sm font-semibold leading-tight text-white/90">Built for</p>
          <p className="text-lg font-bold leading-tight">CSE Students</p>
          <ul className="mt-3 space-y-1.5 text-xs">
            {["Pattern-wise DSA sheet", "ATS resume checklist", "Interview frameworks", "Company-wise guides"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/25">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
