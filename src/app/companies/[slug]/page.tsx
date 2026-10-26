import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { companies, getCompany, packageNote } from "@/data/companies";
import { dsaProblems } from "@/data/dsa";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { Breadcrumbs, DifficultyBadge, NextStep, Note, SectionHeading, StepNumber } from "@/components/ui";
import { CompanyLogo } from "@/components/CompanyLogo";

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/companies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return {};
  return buildMetadata({ title: company.seoTitle, description: company.seoDescription, path: `/companies/${company.slug}` });
}

export default async function CompanyPage({ params }: PageProps<"/companies/[slug]">) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const path = `/companies/${company.slug}`;
  const tagged = dsaProblems.filter((p) => p.companies.includes(company.tag));
  const others = companies.filter((c) => c.slug !== company.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Companies", path: "/companies" },
          { name: company.name, path },
        ])}
      />

      <section className="bg-hero relative overflow-hidden border-b border-slate-200/70">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="container-page relative py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Companies", href: "/companies" },
              { name: company.name, href: path },
            ]}
          />
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <CompanyLogo slug={company.slug} name={company.tag} color={company.color} size="lg" />
              <div>
                <p className="text-sm font-semibold text-brand-600">{company.type} · Company-wise prep</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand-900 sm:text-5xl">{company.name} Placement Preparation</h1>
              </div>
            </div>
            <a href={company.careersUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary shrink-0 self-start lg:self-auto">
              Official careers page <Icon name="external" className="h-4 w-4" />
            </a>
          </div>
          <p className="lead mt-5 max-w-3xl">{company.intro}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            <li className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-800">
              <Icon name="layers" className="h-4 w-4" /> {company.rounds.length} rounds
            </li>
            <li className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-800">
              <Icon name="briefcase" className="h-4 w-4" /> {company.roles.length} fresher roles
            </li>
            <li className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-800">
              <Icon name="code" className="h-4 w-4" /> {tagged.length} tagged DSA problems
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="roles">
        <div className="container-page">
          <SectionHeading id="roles" title={`Roles freshers apply for at ${company.tag}`} />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.roles.map((r) => (
              <li key={r.name} className="card reveal">
                <span className="icon-tile h-9 w-9 bg-brand-600">
                  <Icon name="briefcase" className="h-4.5 w-4.5" />
                </span>
                <h3 className="h3 mt-3">{r.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{r.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="rounds">
        <div className="container-page">
          <SectionHeading
            id="rounds"
            title={`${company.tag} selection process, round by round`}
            intro="The pattern can change slightly every season. Always read the official notification before applying."
          />
          <ol className="relative mt-8 space-y-4 before:absolute before:bottom-4 before:left-9 before:top-4 before:w-px before:bg-brand-200 sm:before:left-10">
            {company.rounds.map((r, i) => (
              <li key={r.name} className="card reveal relative flex gap-4">
                <StepNumber n={i + 1} />
                <div>
                  <h3 className="h3">{r.name}</h3>
                  <p className="mt-1 text-sm text-slate-700">{r.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="focus">
        <div className="container-page">
          <SectionHeading id="focus" title="Focus areas: what matters most" />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="bento border-brand-100 bg-gradient-to-br from-brand-50 to-white hover:translate-y-0">
              <h3 className="h3">DSA patterns</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {company.focus.dsaPatterns.map((p) => (
                  <li key={p}>
                    <Link href={`/dsa?pattern=${encodeURIComponent(p)}#sheet`} className="chip">
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/dsa?company=${company.tag}#sheet`} className="tap mt-auto pt-5 text-sm font-semibold text-brand-600 hover:underline">
                Filter DSA sheet by {company.tag} <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="bento border-accent-100 bg-gradient-to-br from-accent-50 to-white hover:translate-y-0">
              <h3 className="h3">Aptitude topics</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                {company.focus.aptitude.map((a) => (
                  <li key={a} className="flex gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                    {a}
                  </li>
                ))}
              </ul>
              <Link href="/aptitude" className="tap mt-auto pt-5 text-sm font-semibold text-brand-600 hover:underline">
                Practise aptitude <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="bento border-emerald-100 bg-gradient-to-br from-emerald-50 to-white hover:translate-y-0">
              <h3 className="h3">Core CS subjects</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                {company.focus.coreCS.map((a) => (
                  <li key={a} className="flex gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {a}
                  </li>
                ))}
              </ul>
              <Link href="/mock-interview#technical" className="tap mt-auto pt-5 text-sm font-semibold text-brand-600 hover:underline">
                Technical viva questions <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {tagged.length > 0 && (
        <section className="section bg-slate-50/70" aria-labelledby="problems">
          <div className="container-page">
            <SectionHeading
              id="problems"
              title={`DSA problems for ${company.tag} (${tagged.length})`}
              intro={`Questions on these patterns are commonly reported in ${company.tag} tests and interviews. The exact questions change every season.`}
            />
            <div className="table-wrap mt-6">
              <table className="table table-stack min-w-[560px]">
                <thead>
                  <tr>
                    <th scope="col">Problem</th>
                    <th scope="col">Pattern</th>
                    <th scope="col">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {tagged.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {p.url ? (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="tap font-semibold text-brand-900 hover:text-brand-600">
                            {p.name}
                            <Icon name="external" className="h-3.5 w-3.5 text-slate-400" />
                            <span className="sr-only"> (opens in new tab)</span>
                          </a>
                        ) : (
                          <span className="font-semibold text-brand-900">{p.name}</span>
                        )}
                      </td>
                      <td data-label="Pattern" className="whitespace-nowrap">{p.pattern}</td>
                      <td data-label="Difficulty">
                        <DifficultyBadge level={p.difficulty} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="tips">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading id="tips" title={`${company.tag} preparation tips`} />
            <ul className="mt-6 space-y-3">
              {company.tips.map((t) => (
                <li key={t} className="card flex gap-3 p-4 text-sm text-slate-700">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading id="package" title="Approximate package range" />
            <p className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
              Approximate, for awareness only
            </p>
            <div className="table-wrap mt-4">
              <table className="table table-stack min-w-[320px]">
                <thead>
                  <tr>
                    <th scope="col">Role</th>
                    <th scope="col">Approx. CTC</th>
                  </tr>
                </thead>
                <tbody>
                  {company.packages.map((p) => (
                    <tr key={p.role}>
                      <td className="font-medium text-brand-900">{p.role}</td>
                      <td data-label="Approx. CTC">{p.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Note tone="warn">
                {packageNote} These are typical ranges from past campus seasons. The final offer is always confirmed by the
                company&apos;s official letter.
              </Note>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="related">
        <div className="container-page">
          <SectionHeading id="related" title="Related preparation" />
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: `/dsa?company=${company.tag}#sheet`, title: "DSA Practice", text: `${company.tag}-tagged problems, pre-filtered.`, icon: "code" as const },
              { href: "/aptitude", title: "Aptitude Practice", text: "Quant, logical, verbal: weightage and solved questions.", icon: "calculator" as const },
              { href: "/mock-interview", title: "Mock Interview", text: "HR frameworks and OOPs/DBMS/OS/CN viva.", icon: "mic" as const },
            ].map((r) => (
              <li key={r.title}>
                <Link href={r.href} className="card card-hover block h-full">
                  <span className="icon-tile h-9 w-9 bg-brand-600">
                    <Icon name={r.icon} className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="h3 mt-3">{r.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{r.text}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            Other companies:
            {others.map((c) => (
              <Link key={c.slug} href={`/companies/${c.slug}`} className="chip gap-2 py-1.5">
                <CompanyLogo slug={c.slug} name={c.tag} color={c.color} size="sm" decorative />
                {c.tag}
              </Link>
            ))}
          </p>
        </div>
      </section>

      <NextStep
        title={`What to do 2 days before the ${company.tag} test`}
        text="Don't open a new topic. Revise only this page's rounds, focus topics and your starred DSA problems."
        primary={{ href: `/dsa?company=${company.tag}#sheet`, label: `See ${company.tag} DSA problems` }}
        secondary={{ href: "/companies", label: "All companies" }}
      />
    </>
  );
}
