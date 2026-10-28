import Link from "next/link";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { dsaPatterns, dsaProblems, saathiMethod } from "@/data/dsa";
import { DsaSheet } from "@/components/DsaSheet";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { NextStep, Note, PageHero, SectionHeading, StepNumber } from "@/components/ui";

export const metadata = buildMetadata({
  title: "DSA Practice for Placements: Pattern-wise Problem Sheet",
  description:
    "DSA questions for campus placements: a pattern-wise sheet with search, pattern and difficulty filters, company tags (TCS, Infosys, Amazon) and why each matters.",
  path: "/dsa",
});

export default function DsaPage() {
  const counts = dsaPatterns.map((p) => ({
    ...p,
    count: dsaProblems.filter((d) => d.pattern === p.name).length,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "PlacementSaathi DSA Practice Sheet",
          description: "Pattern-wise DSA problems for campus placement preparation.",
          url: absoluteUrl("/dsa"),
          numberOfItems: dsaProblems.length,
          itemListElement: dsaProblems.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${p.name} (${p.pattern}, ${p.difficulty})`,
            ...(p.url ? { url: p.url } : {}),
          })),
        }}
      />

      <PageHero
        eyebrow="DSA Practice"
        title="DSA Practice Sheet for Campus Placements"
        intro={`Learn the pattern first, then solve problems in that pattern. Even a new interview question usually follows an old pattern. This sheet has ${dsaProblems.length} core problems across ${dsaPatterns.length} patterns.`}
      />

      <section className="section" aria-labelledby="sheet">
        <div className="container-page">
          <SectionHeading
            id="sheet"
            title="Problem sheet: search and filter"
            intro="Type a problem name, or choose a pattern, difficulty and company. Clicking a problem opens the practice page in a new tab."
          />
          <div className="mt-6">
            <DsaSheet problems={dsaProblems} />
          </div>
          <div className="mt-4">
            <Note tone="brand">
              Company tags mean that questions on this pattern are commonly reported in that company&apos;s tests or
              interviews. The exact questions change every season, so master the pattern instead of memorising questions.
            </Note>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="patterns">
        <div className="container-page">
          <SectionHeading
            id="patterns"
            title="DSA patterns in one line each"
            intro="Service companies test easy to medium levels. Product companies go up to Trees, Graphs and DP."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {counts.map((p) => (
              <li key={p.name} className="card card-hover reveal">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="h3">{p.name}</h3>
                  <span className="badge bg-brand-50 text-brand-700">{p.count} problems</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{p.idea}</p>
                <Link href={`/dsa?pattern=${encodeURIComponent(p.name)}#sheet`} className="tap mt-3 text-sm font-semibold text-brand-600 hover:underline">
                  Show only {p.name} <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="method">
        <div className="container-page">
          <SectionHeading id="method" eyebrow="The Saathi Method" title="The right way to practise DSA" />
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {saathiMethod.map((m, i) => (
              <li key={m.title} className="card reveal">
                <StepNumber n={i + 1} />
                <h3 className="h3 mt-3">{m.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{m.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Note>
              How much per day? In Phase 1, 2-3 easy problems a day. From Phase 2, 1-2 medium problems plus 1 revision. The
              full plan is in the{" "}
              <Link href="/roadmap" className="link">
                90-Day Roadmap
              </Link>
              .
            </Note>
          </div>
        </div>
      </section>

      <NextStep
        title="Practise aptitude alongside DSA"
        text="Aptitude is the gatekeeper before the coding round. Do 20 timed questions today."
        primary={{ href: "/aptitude", label: "Practise Aptitude" }}
        secondary={{ href: "/companies", label: "See company-wise DSA focus" }}
      />
    </>
  );
}
