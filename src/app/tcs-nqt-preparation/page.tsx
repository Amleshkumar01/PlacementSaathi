import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { dsaProblems } from "@/data/dsa";
import {
  nqtDsaFocus,
  nqtFaqs,
  nqtIntro,
  nqtMistakes,
  nqtPlan,
  nqtPracticeTips,
  nqtSections,
  nqtShortcuts,
} from "@/data/tcsNqtGuide";
import { JsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icon";
import { FaqList } from "@/components/FaqList";
import { Breadcrumbs, Note, SectionHeading } from "@/components/ui";

const PATH = "/tcs-nqt-preparation";
const H1 = "TCS NQT Preparation: Pattern, Syllabus and 30-Day Plan";

export const metadata = buildMetadata({
  title: `${H1} | PlacementSaathi`,
  description:
    "TCS NQT preparation guide for freshers: exam pattern, aptitude, reasoning and coding syllabus, a 30-day study plan, DSA topics, shortcuts and common mistakes.",
  path: PATH,
});

const sectionIcons: Record<string, IconName> = { aptitude: "calculator", reasoning: "layers", coding: "code" };

const toc = [
  { href: "#what-is-nqt", label: "What is TCS NQT" },
  { href: "#pattern", label: "Exam pattern" },
  { href: "#syllabus", label: "Syllabus" },
  { href: "#plan", label: "30-day plan" },
  { href: "#dsa-topics", label: "DSA topics" },
  { href: "#aptitude-tips", label: "Aptitude tips" },
  { href: "#mistakes", label: "Common mistakes" },
  { href: "#faq", label: "FAQ" },
];

export default function TcsNqtPreparationPage() {
  const tcsProblems = dsaProblems.filter((p) => p.companies.includes("TCS"));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: nqtFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "TCS NQT Preparation", path: PATH },
        ])}
      />

      {/* Hero (navy + teal) */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-teal-50/70 via-white to-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative py-10 sm:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "TCS NQT Preparation", href: PATH },
            ]}
          />
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-teal-800">
            <Icon name="book" className="h-4 w-4" />
            Free guide · Company-wise prep
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-brand-900 sm:text-5xl">{H1}</h1>
          <p className="lead mt-4 max-w-3xl">
            A complete, honest guide to preparing for the TCS NQT: what the test checks, what to study for each section, and
            a day-by-day plan you can follow alongside college.
          </p>

          <nav aria-label="On this page" className="mt-6">
            <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden">
              {toc.map((t) => (
                <li key={t.href} className="shrink-0">
                  <a href={t.href} className="chip whitespace-nowrap text-brand-900 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 1. Introduction */}
      <section className="section" aria-labelledby="what-is-nqt">
        <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading id="what-is-nqt" title="What is TCS NQT and who is it for?" />
            <p className="prose-body mt-4">{nqtIntro.what}</p>
            <p className="prose-body mt-4">{nqtIntro.why}</p>
            <p className="prose-body mt-4">
              For roles, rounds and interview tips, see the{" "}
              <Link href="/companies/tcs" className="link text-teal-700 decoration-teal-200 hover:text-teal-900 hover:decoration-teal-500">
                TCS company preparation guide
              </Link>
              .
            </p>
          </div>
          <div className="card self-start border-teal-100">
            <h3 className="h3">This guide is useful for</h3>
            <ul className="mt-4 space-y-3">
              {nqtIntro.who.map((w) => (
                <li key={w} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Exam pattern */}
      <section className="section bg-slate-50/70" aria-labelledby="pattern">
        <div className="container-page">
          <SectionHeading
            id="pattern"
            title="TCS NQT exam pattern overview"
            intro="The test is usually split into a Foundation part that everyone takes and an Advanced part with harder aptitude and coding. The three skill areas below are what you are tested on."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {nqtSections.map((s) => (
              <li key={s.id} className="card">
                <span className="icon-tile bg-brand-900">
                  <Icon name={sectionIcons[s.id]} />
                </span>
                <h3 className="h3 mt-4">{s.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.summary}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Note tone="brand">
              The exact number of questions, section timings and marking scheme change between seasons, so they are not
              listed here. Always check the latest official TCS NQT notification before your test.
            </Note>
          </div>
        </div>
      </section>

      {/* 3. Syllabus */}
      <section className="section" aria-labelledby="syllabus">
        <div className="container-page">
          <SectionHeading
            id="syllabus"
            title="TCS NQT syllabus: topics for each section"
            intro="Cover these topics first. They come up again and again; usually only the numbers and wording change."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {nqtSections.map((s) => (
              <div key={s.id} className="card">
                <h3 className="h3 flex items-center gap-2">
                  <Icon name={sectionIcons[s.id]} className="h-5 w-5 text-teal-600" />
                  {s.name}
                </h3>
                <ul className="mt-4 space-y-2">
                  {s.topics.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 30-day plan */}
      <section className="section bg-slate-50/70" aria-labelledby="plan">
        <div className="container-page">
          <SectionHeading
            id="plan"
            title="30-day TCS NQT preparation plan"
            intro="Built for about 2-2.5 hours a day. If you have more time, start earlier with the full 90-day roadmap."
          />
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {nqtPlan.map((p, i) => (
              <li key={p.id} className="card flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-900 to-teal-600 font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{p.days}</p>
                    <h3 className="h3">{p.title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{p.goal}</p>
                <dl className="mt-4 flex-1 space-y-3 text-sm">
                  {p.daily.map((d) => (
                    <div key={d.label}>
                      <dt className="font-semibold text-brand-900">{d.label}</dt>
                      <dd className="mt-0.5 text-slate-600">{d.task}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 rounded-xl bg-teal-50 px-3 py-2 text-sm text-teal-900 ring-1 ring-teal-100">
                  <span className="font-semibold">Checkpoint: </span>
                  {p.milestone}
                </p>
              </li>
            ))}
          </ol>
          <p className="prose-body mt-6">
            Want a longer, week-by-week plan that also covers resume and interviews? Follow the{" "}
            <Link href="/roadmap" className="link text-teal-700 decoration-teal-200 hover:text-teal-900 hover:decoration-teal-500">
              90-Day Placement Roadmap
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 5. DSA topics */}
      <section className="section" aria-labelledby="dsa-topics">
        <div className="container-page">
          <SectionHeading
            id="dsa-topics"
            title="Important DSA topics for the TCS NQT coding round"
            intro="You don't need advanced algorithms. Master these patterns and practise writing complete programs that read input correctly."
            action={{ href: "/dsa?company=TCS#sheet", label: "TCS problems on the DSA sheet" }}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nqtDsaFocus.map((d) => (
              <li key={d.pattern} className="card card-hover flex flex-col">
                <h3 className="h3">{d.pattern}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{d.why}</p>
                <Link
                  href={`/dsa?pattern=${encodeURIComponent(d.pattern)}#sheet`}
                  className="tap mt-3 text-sm font-semibold text-teal-700 hover:underline"
                >
                  Practise {d.pattern} <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>

          {tcsProblems.length > 0 && (
            <div className="mt-8">
              <h3 className="h3">Start with these {tcsProblems.length} problems</h3>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {tcsProblems.map((p) => (
                  <li key={p.id} className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <Link
                      href={`/dsa?q=${encodeURIComponent(p.name)}#sheet`}
                      className="tap min-w-0 break-words text-sm font-medium text-brand-900 hover:text-teal-700"
                    >
                      {p.name}
                    </Link>
                    <span className={`badge shrink-0 ${p.difficulty === "Easy" ? "bg-teal-50 text-teal-800 ring-1 ring-teal-200" : "bg-brand-900 text-white"}`}>{p.difficulty}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                See the full pattern-wise sheet with filters on the{" "}
                <Link href="/dsa" className="link text-teal-700 decoration-teal-200 hover:text-teal-900 hover:decoration-teal-500">
                  DSA Practice page
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Aptitude shortcuts */}
      <section className="section bg-slate-50/70" aria-labelledby="aptitude-tips">
        <div className="container-page grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading
              id="aptitude-tips"
              title="Aptitude shortcuts for TCS NQT"
              intro="Small shortcuts that save seconds on every question add up to minutes over a whole section."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {nqtShortcuts.map((s) => (
                <li key={s.topic} className="card p-4">
                  <h3 className="text-sm font-semibold text-teal-800">{s.topic}</h3>
                  <p className="mt-1 text-sm text-slate-700">{s.tip}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="h3 lg:mt-10">Practice tips</h3>
            <ul className="mt-4 space-y-3">
              {nqtPracticeTips.map((t) => (
                <li key={t} className="flex gap-3 text-sm text-slate-700">
                  <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/aptitude" className="btn mt-6 w-full bg-brand-900 text-white hover:bg-teal-700 sm:w-auto">
              Practise aptitude with solved questions <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Common mistakes */}
      <section className="section" aria-labelledby="mistakes">
        <div className="container-page">
          <SectionHeading id="mistakes" title="Common mistakes students make in TCS NQT" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {nqtMistakes.map((m) => (
              <li key={m.title} className="card flex gap-3 p-4">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <Icon name="alert" className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-brand-900">{m.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{m.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="section bg-slate-50/70" aria-labelledby="faq">
        <div className="container-page max-w-3xl">
          <SectionHeading id="faq" title="TCS NQT preparation FAQ" />
          <div className="mt-6">
            <FaqList items={nqtFaqs} />
          </div>
          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            PlacementSaathi is a free preparation resource and is not affiliated with TCS. We do not guarantee any job,
            placement or result. TCS and TCS NQT are trademarks of their owner.
          </p>
        </div>
      </section>

      {/* Next step (navy + teal) */}
      <section aria-labelledby="next-step" className="section">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-teal-700 px-6 py-12 text-center sm:px-12">
            <h2 id="next-step" className="text-2xl font-bold text-white sm:text-3xl">
              Start Day 1 of your TCS NQT plan today
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-brand-100">
              Solve two easy array problems and 15 percentage questions. Small daily steps beat last-week cramming.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/dsa?company=TCS#sheet" className="btn bg-white text-brand-900 hover:bg-teal-50">
                Open TCS DSA problems <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/companies/tcs" className="btn border border-white/30 text-white hover:bg-white/10">
                TCS company guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
