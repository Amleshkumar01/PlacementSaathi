import Link from "next/link";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { buildSearchIndex } from "@/lib/searchIndex";
import { site } from "@/data/site";
import { companies } from "@/data/companies";
import { faqs } from "@/data/faq";
import { dsaPatterns, dsaProblems } from "@/data/dsa";
import { aptitudeSections } from "@/data/aptitude";
import { JsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icon";
import { NextStep, SectionHeading } from "@/components/ui";
import { CompanyLogo, CompanyLogoPlain } from "@/components/CompanyLogo";
import { StudyPlanCalculator } from "@/components/StudyPlanCalculator";
import { FaqList } from "@/components/FaqList";
import { SiteSearch } from "@/components/SiteSearch";
import { HomeHeroVisual } from "@/components/HomeHeroVisual";

export const metadata = buildMetadata({
  title: "Placement Preparation for BTech CSE Students | Saathi",
  description:
    "Placement preparation for BTech CSE students: pattern-wise DSA sheet, aptitude with solutions, ATS resume checklist, interview prep and company-wise guides.",
  path: "/",
});

const aptitudeTopicCount = aptitudeSections.reduce((n, s) => n + s.topics.length, 0);

const stats: { value: string; label: string; icon: IconName }[] = [
  { value: String(dsaProblems.length), label: "DSA problems", icon: "code" },
  { value: String(aptitudeTopicCount), label: "Aptitude topics", icon: "calculator" },
  { value: String(companies.length), label: "Companies", icon: "building" },
  { value: "90", label: "Day roadmap", icon: "map" },
];

const smallTiles: { href: string; title: string; text: string; cta: string; icon: IconName; tint: string; iconBg: string }[] = [
  {
    href: "/aptitude",
    title: "Aptitude",
    text: "Quant, logical and verbal with weightage, shortcuts and solved questions.",
    cta: "Practise now",
    icon: "calculator",
    tint: "border-accent-100 bg-gradient-to-br from-accent-50 to-white",
    iconBg: "bg-accent-600",
  },
  {
    href: "/resume",
    title: "Resume Checklist",
    text: "10-point ATS checklist with a live score and a project bullet formula.",
    cta: "Check my resume",
    icon: "file",
    tint: "border-orange-100 bg-gradient-to-br from-orange-50 to-white",
    iconBg: "bg-orange-500",
  },
  {
    href: "/mock-interview",
    title: "Interview Prep",
    text: "HR answer frameworks plus OOPs, DBMS, OS and CN viva questions.",
    cta: "Start learning",
    icon: "mic",
    tint: "border-rose-100 bg-gradient-to-br from-rose-50 to-white",
    iconBg: "bg-rose-500",
  },
  {
    href: "/companies",
    title: "Companies",
    text: "Round-by-round guides for TCS, Infosys, Wipro, Accenture, Capgemini and Amazon.",
    cta: "Explore",
    icon: "building",
    tint: "border-emerald-100 bg-gradient-to-br from-emerald-50 to-white",
    iconBg: "bg-emerald-600",
  },
];

const journey: { title: string; text: string; icon: IconName }[] = [
  { title: "Learn the basics", text: "One language, OOPs, DBMS", icon: "book" },
  { title: "Practise daily", text: "DSA patterns + timed aptitude", icon: "code" },
  { title: "Build your resume", text: "ATS-friendly, honest numbers", icon: "file" },
  { title: "Crack interviews", text: "Mock HR + technical rounds", icon: "trophy" },
];

const promises = [
  "No placement, job or salary guarantees. Ever.",
  "No fake testimonials, student names or offer screenshots.",
  "Package figures are approximate ranges, clearly labelled.",
  "Free to use. No sign-up, no data collected.",
];

const resources: { href: string; tag: string; title: string; text: string; icon: IconName; from: string; to: string }[] = [
  { href: "/dsa", tag: "Interview Prep", title: `${dsaProblems.length} must-do DSA questions`, text: "Pattern-wise, with company tags.", icon: "code", from: "from-brand-600", to: "to-brand-300" },
  { href: "/resume", tag: "Career Guide", title: "Build an ATS-friendly resume", text: "Checklist, bullet formula, mistakes.", icon: "file", from: "from-orange-500", to: "to-amber-300" },
  { href: "/roadmap", tag: "Placement Plan", title: "Complete 90-day roadmap", text: "Week-by-week targets.", icon: "map", from: "from-accent-600", to: "to-accent-200" },
  { href: "/companies/tcs", tag: "Company Guide", title: "How to crack TCS NQT", text: "Sections, coding, interview.", icon: "target", from: "from-emerald-600", to: "to-emerald-300" },
];

export default function HomePage() {
  const featuredFaqs = faqs.filter((f) => f.featured).slice(0, 4);
  const searchIndex = buildSearchIndex();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: absoluteUrl("/logo.svg"),
          slogan: site.tagline,
          description: site.description,
          email: site.email,
        }}
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: "en-IN" }} />

      {/* ---------- Hero ---------- */}
      <section className="bg-hero relative overflow-hidden">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" aria-hidden="true" />

        <div className="container-page relative grid grid-cols-1 items-center gap-8 pt-10 pb-12 sm:pt-14 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8 lg:py-10 short:py-6 2xl:gap-16">
          <div className="order-1 min-w-0">
            <h1>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
                Placement Preparation for BTech CSE Students
              </span>
              <span className="mt-2 block text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-brand-900 sm:text-6xl lg:text-[clamp(2.75rem,min(4.6vw,8.2svh),5rem)]">
                Your Placement Journey{" "}
                <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">Starts Here</span>
              </span>
            </h1>
            <p className="lead mt-5 max-w-xl short:mt-3 short:text-base 2xl:max-w-2xl 2xl:text-xl">
              DSA, Aptitude, Resume and Mock Interview, all in one place and in one order. Skip the scattered PDFs and
              500-video playlists, and follow a clear plan of 2-3 hours a day.
            </p>

            <div id="search" className="mt-7 max-w-xl scroll-mt-24 short:mt-5 2xl:max-w-2xl">
              <SiteSearch index={searchIndex} />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row short:mt-4">
              <Link href="/dsa" className="btn btn-primary">
                Start DSA Practice <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/roadmap" className="btn btn-secondary">
                View 90-Day Roadmap
              </Link>
            </div>

            <ul className="mt-8 grid max-w-xl grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 short:mt-5 2xl:max-w-2xl">
              {stats.map((s) => (
                <li key={s.label} className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={s.icon} className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold leading-none text-brand-900">{s.value}</span>
                    <span className="text-xs text-slate-500">{s.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-2 min-w-0">
            <HomeHeroVisual />
          </div>
        </div>
      </section>

      {/* ---------- Company logo strip ---------- */}
      <section aria-labelledby="logo-strip" className="border-y border-slate-200/70 bg-white/80">
        <div className="container-page py-6 sm:py-8">
          <h2 id="logo-strip" className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
            Preparation guides for top hiring companies
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {companies.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/companies/${c.slug}`}
                  className="group flex h-16 items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_28px_-14px_rgba(37,99,235,0.35)] sm:h-20"
                  aria-label={`${c.tag} preparation guide`}
                >
                  <CompanyLogoPlain
                    slug={c.slug}
                    name={c.tag}
                    className={`${c.slug === "wipro" ? "h-10 sm:h-12" : "h-6 sm:h-8"} max-w-full transition group-hover:scale-105`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Bento grid ---------- */}
      <section className="section pt-10 sm:pt-14" aria-labelledby="tracks">
        <div className="container-page">
          <SectionHeading id="tracks" title="Your complete prep toolkit" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dsa"
              className="bento reveal border-brand-100 bg-gradient-to-br from-brand-50 via-white to-white sm:col-span-2 lg:row-span-2"
            >
              <span className="icon-tile bg-brand-600">
                <Icon name="code" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-brand-900 sm:text-2xl">DSA Practice Sheet</h3>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                {dsaProblems.length} core problems across {dsaPatterns.length} patterns. Search, filter by difficulty or
                company, and practise in the order interviews actually test.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {dsaPatterns.map((p) => (
                  <li key={p.name} className="rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-700">
                    {p.name}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {(["Easy", "Medium", "Hard"] as const).map((d) => (
                  <div key={d} className="rounded-2xl border border-slate-200/80 bg-white p-3">
                    <p className="text-xl font-bold text-brand-900">{dsaProblems.filter((p) => p.difficulty === d).length}</p>
                    <p className="text-xs text-slate-500">{d}</p>
                  </div>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-brand-600">
                Start DSA practice <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>

            {smallTiles.map((t) => (
              <Link key={t.href} href={t.href} className={`bento reveal ${t.tint}`}>
                <span className={`icon-tile ${t.iconBg}`}>
                  <Icon name={t.icon} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-900">{t.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-slate-600">{t.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  {t.cta} <Icon name="arrow" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* Banner (glass on gradient) */}
          <div className="reveal relative mt-4 overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-r from-brand-50 via-accent-50 to-brand-50 p-5 sm:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/20 blur-2xl" aria-hidden="true" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <span className="icon-tile h-14 w-14 bg-gradient-to-br from-brand-600 to-accent-600">
                  <Icon name="briefcase" className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="flex flex-wrap items-center gap-2 text-lg font-bold text-brand-900">
                    Jobs &amp; Internships
                    <span className="badge bg-accent-600 text-white">New</span>
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Official career portals, an off-campus application plan and how to spot fake job offers.
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-700">
                    {["Verified sources only", "Off-campus steps", "Scam safety checklist", "Internship portals"].map((f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        <Icon name="check" className="h-4 w-4 text-brand-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link href="/jobs" className="btn shrink-0 bg-brand-900 text-white hover:bg-brand-800">
                Explore jobs guide <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Company guides (job-card style) ---------- */}
      <section className="section bg-slate-50/70" aria-labelledby="companies-preview">
        <div className="container-page">
          <SectionHeading
            id="companies-preview"
            title="Top hiring companies, one guide each"
            intro="Every company tests differently. See the rounds, focus topics and tips for your target company."
            action={{ href: "/companies", label: "View all companies" }}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c) => (
              <li key={c.slug} className="reveal">
                <Link href={`/companies/${c.slug}`} className="card card-hover flex h-full flex-col">
                  <div className="flex items-start gap-3">
                    <CompanyLogo slug={c.slug} name={c.tag} color={c.color} decorative />
                    <div className="min-w-0">
                      <h3 className="h3 text-base">{c.name}</h3>
                      <p className="text-xs text-slate-500">{c.type}</p>
                    </div>
                  </div>
                  <p className="mt-3 flex-1 text-sm text-slate-600">{c.cardLine}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="badge gap-1 bg-slate-100 text-slate-600">
                      <Icon name="layers" className="h-3.5 w-3.5" /> {c.rounds.length} rounds
                    </span>
                    {c.roles.slice(0, 2).map((r) => (
                      <span key={r.name} className="badge bg-brand-50 text-brand-700">
                        {r.name.split(" (")[0]}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 border-t border-slate-100 pt-4 text-sm font-semibold text-brand-600">
                    View prep guide <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            Preparing for TCS? Read the{" "}
            <Link href="/tcs-nqt-preparation" className="link">
              TCS NQT preparation guide: pattern, syllabus and 30-day plan
            </Link>
            .
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Company names are trademarks of their owners. PlacementSaathi is not affiliated with any company.
          </p>
        </div>
      </section>

      {/* ---------- Roadmap + promise ---------- */}
      <section className="section" aria-labelledby="journey">
        <div className="container-page grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="reveal relative overflow-hidden rounded-3xl bg-brand-900 p-6 text-white sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-600/30 blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">90-day roadmap</p>
                <h2 id="journey" className="mt-1 text-2xl font-bold sm:text-3xl">
                  Your placement journey
                </h2>
                <p className="mt-2 text-sm text-brand-200">From learning the basics to walking into interviews ready.</p>
              </div>
              <Link href="/roadmap" className="btn glass-dark shrink-0 self-start text-sm text-white hover:bg-white/20">
                View roadmap <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <ol className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {journey.map((j, i) => (
                <li key={j.title} className="glass-dark p-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600">
                      <Icon name={j.icon} />
                    </span>
                    <span className="text-xs font-semibold text-brand-300">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-3 font-semibold">{j.title}</h3>
                  <p className="mt-1 text-xs text-brand-200">{j.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal rounded-3xl border border-accent-100 bg-gradient-to-br from-accent-50 to-white p-6 sm:p-8">
            <span className="icon-tile bg-accent-600">
              <Icon name="shield" />
            </span>
            <h2 className="mt-4 text-xl font-bold text-brand-900">Our honest promise</h2>
            <p className="mt-1 text-sm text-slate-600">What you can expect from this site.</p>
            <ul className="mt-5 space-y-3">
              {promises.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/about" className="link tap mt-5 text-sm">
              Why we built PlacementSaathi
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Study plan calculator ---------- */}
      <section id="study-plan" className="section scroll-mt-16 bg-hero" aria-labelledby="study-plan-heading">
        <div className="container-page">
          <SectionHeading
            id="study-plan-heading"
            title="Build your personal study plan"
            intro="Tell us how many days you have and how many hours you can study each day. Get an instant split across DSA, Aptitude, Core CS and Interview Prep."
          />
          <div className="mt-8">
            <StudyPlanCalculator />
          </div>
        </div>
      </section>

      {/* ---------- Resources ---------- */}
      <section className="section" aria-labelledby="resources">
        <div className="container-page">
          <SectionHeading
            id="resources"
            
            title="Popular preparation guides"
            action={{ href: "/roadmap", label: "Start with the roadmap" }}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((r) => (
              <li key={r.title} className="reveal">
                <Link href={r.href} className="card card-hover flex h-full flex-col overflow-hidden p-0">
                  <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${r.from} ${r.to}`}>
                    <div className="bg-dots absolute inset-0 opacity-30" aria-hidden="true" />
                    <span className="glass relative inline-flex h-14 w-14 items-center justify-center text-brand-800">
                      <Icon name={r.icon} className="h-7 w-7" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="badge w-fit bg-brand-50 text-brand-700">{r.tag}</span>
                    <h3 className="mt-3 font-semibold text-brand-900">{r.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{r.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- FAQ + contact ---------- */}
      <section className="section bg-slate-50/70" aria-labelledby="faq-preview">
        <div className="container-page grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading id="faq-preview" title="Questions students often ask" />
            <div className="mt-6">
              <FaqList items={featuredFaqs} />
            </div>
            <Link href="/faq" className="btn btn-secondary mt-6">
              See all FAQs <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal relative self-start overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-accent-50 to-white p-6 sm:p-8">
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-brand-500/20 blur-2xl" aria-hidden="true" />
            <span className="icon-tile relative bg-brand-600">
              <Icon name="mail" />
            </span>
            <h2 className="relative mt-4 text-xl font-bold text-brand-900">Have a question or found a mistake?</h2>
            <p className="relative mt-2 text-sm text-slate-600">
              Tell us what to add or fix. Every message is read, and the site gets better because of it.
            </p>
            <ul className="relative mt-4 grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
              {["Report an error", "Suggest a topic", "Request a company", "Share feedback"].map((t) => (
                <li key={t} className="glass flex items-center gap-1.5 px-3 py-2">
                  <Icon name="check" className="h-3.5 w-3.5 text-brand-600" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary relative mt-6 w-full">
              Contact us <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <NextStep
        title="Take your first step today"
        text="Solve the first DSA problem, do 20 aptitude questions or tick the first resume checklist point. Do just one thing today."
        primary={{ href: "/dsa", label: "Start DSA Practice" }}
        secondary={{ href: "/roadmap", label: "View 90-Day Roadmap" }}
      />
    </>
  );
}
