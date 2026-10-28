import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { dailyRoutine, goldenRules, roadmapPhases } from "@/data/roadmap";
import { Icon } from "@/components/Icon";
import { NextStep, Note, PageHero, SectionHeading } from "@/components/ui";

export const metadata = buildMetadata({
  title: "90-Day Placement Preparation Roadmap for BTech CSE",
  description:
    "A 90-day placement preparation roadmap: 3 phases, weekly targets for DSA, aptitude, core CS and mock interviews, and a sample daily routine for 2-3 hours a day.",
  path: "/roadmap",
});

const phaseColors = ["from-brand-600 to-brand-500", "from-accent-600 to-accent-500", "from-emerald-600 to-emerald-500"];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="90-Day Roadmap"
        title="90-Day Placement Preparation Roadmap"
        intro="This roadmap is built for 2-3 hours a day, so it fits around college classes and semester exams. Two or three quality hours every day beat one 14-hour day per week."
      >
        <ol className="mt-8 grid gap-3 sm:grid-cols-3">
          {roadmapPhases.map((p, i) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="glass card-hover block p-4">
                <span className={`inline-flex rounded-lg bg-gradient-to-r ${phaseColors[i]} px-2 py-0.5 text-xs font-semibold text-white`}>
                  Phase {i + 1} · {p.days}
                </span>
                <span className="mt-2 block text-lg font-bold text-brand-900">{p.name}</span>
                <span className="mt-1 block text-sm text-slate-600">{p.summary}</span>
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {roadmapPhases.map((p, i) => (
        <section key={p.id} className={`section ${i % 2 === 1 ? "bg-slate-50/70" : ""}`} aria-labelledby={p.id}>
          <div className="container-page">
            <SectionHeading id={p.id} eyebrow={`Phase ${i + 1} · ${p.days}`} title={p.name} intro={p.summary} />
            <div className="mt-4">
              <Note tone="brand">
                <strong>Phase goal: </strong>
                {p.goal}
              </Note>
            </div>
            <h3 className="h3 mt-8">Weekly targets</h3>
            <ol className="mt-4 grid gap-4 md:grid-cols-2">
              {p.weeks.map((w) => (
                <li key={w.label} className="card reveal">
                  <p className={`inline-flex rounded-lg bg-gradient-to-r ${phaseColors[i]} px-2.5 py-1 text-xs font-semibold text-white`}>{w.label}</p>
                  <dl className="mt-4 grid gap-3 text-sm">
                    {[
                      ["DSA", w.dsa],
                      ["Aptitude", w.aptitude],
                      ["Core CS", w.coreCS],
                      ...(w.other ? [["Resume / Interview", w.other]] : []),
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[110px_1fr] gap-3">
                        <dt className="font-semibold text-brand-900">{k}</dt>
                        <dd className="text-slate-600">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section className="section" aria-labelledby="routine">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="routine"
              title="Sample daily routine (2.5 hours)"
              intro="Evening after college or early morning: whatever time you can fix. On Sundays, take one mock test and review the week."
            />
            <ol className="mt-6 space-y-3">
              {dailyRoutine.map((r) => (
                <li key={r.time} className="card flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-4">
                  <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1 font-mono text-xs font-semibold text-brand-700">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    {r.time}
                  </span>
                  <span className="text-sm text-slate-700">{r.task}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading id="golden-rules" title="Golden rules for placement week" />
            <ul className="mt-6 space-y-3">
              {goldenRules.map((g) => (
                <li key={g} className="flex gap-3 rounded-2xl border border-accent-100 bg-accent-50/60 p-4 text-sm text-slate-800">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              Want a split based on your own days and hours? Use the{" "}
              <Link href="/#study-plan" className="link">
                Study Plan Calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <NextStep
        title="Start Day 1 today"
        text="Phase 1, Week 1: pick one language and solve the first 2 easy problems on the DSA sheet."
        primary={{ href: "/dsa?difficulty=easy#sheet", label: "Open easy DSA problems" }}
        secondary={{ href: "/aptitude", label: "Start Aptitude" }}
      />
    </>
  );
}
