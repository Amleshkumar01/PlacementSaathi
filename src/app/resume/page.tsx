import { buildMetadata } from "@/lib/seo";
import { bulletFormula, commonMistakes, sectionOrder } from "@/data/resume";
import { AtsChecklist } from "@/components/AtsChecklist";
import { Icon } from "@/components/Icon";
import { NextStep, Note, PageHero, SectionHeading, StepNumber } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Fresher Resume Format: ATS Checklist with Live Score",
  description:
    "Fresher resume format for BTech CSE: a 10-point ATS checklist with live score, the project bullet formula, common resume mistakes and one-page section order.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <PageHero
        eyebrow="Resume Guide"
        title="Fresher Resume Guide with ATS Checklist"
        intro="At large companies, software (an ATS, Applicant Tracking System) reads your resume before a human does. With the wrong format, even a good resume can be rejected unseen. Check yours below."
      />

      <section className="section" aria-labelledby="checklist">
        <div className="container-page">
          <SectionHeading
            id="checklist"
            title="10-point ATS checklist with live score"
            intro="Open your resume alongside. Tick each point that is genuinely true for it. Your score updates instantly."
          />
          <div className="mt-6">
            <AtsChecklist />
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="formula">
        <div className="container-page">
          <SectionHeading id="formula" title="The project bullet formula" intro="Write 2-3 bullets for every project using this formula." />
          <ol className="mt-6 flex flex-wrap items-center gap-2">
            {bulletFormula.parts.map((part, i) => (
              <li key={part} className="flex items-center gap-2">
                <span className="rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-3.5 py-2 text-sm font-semibold text-white">{part}</span>
                {i < bulletFormula.parts.length - 1 && (
                  <span className="font-bold text-slate-400" aria-hidden="true">
                    +
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {bulletFormula.examples.map((ex) => (
              <div key={ex.weak} className="card reveal">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-rose-600">
                  <Icon name="close" className="h-4 w-4" /> Weak line
                </h3>
                <p className="mt-1 text-slate-600 line-through decoration-rose-300">{ex.weak}</p>
                <h3 className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">
                  <Icon name="check" className="h-4 w-4" /> Strong line
                </h3>
                <p className="mt-1 text-slate-800">{ex.strong}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Note tone="warn">{bulletFormula.honesty}</Note>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="mistakes">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="mistakes" title="Common resume mistakes" />
            <ul className="mt-6 space-y-3">
              {commonMistakes.map((m) => (
                <li key={m} className="card flex gap-3 p-4 text-sm text-slate-700">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <Icon name="close" className="h-3.5 w-3.5" />
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading id="order" title="One-page resume: section order" />
            <ol className="mt-6 space-y-3">
              {sectionOrder.map((s, i) => (
                <li key={s.name} className="card flex gap-3 p-4">
                  <StepNumber n={i + 1} />
                  <span>
                    <span className="font-semibold text-brand-900">{s.name}</span>
                    <span className="mt-0.5 block text-sm text-slate-600">{s.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <NextStep
        title="Resume ready? Now practise interviews"
        text="You will be asked about everything on your resume. Prepare with HR frameworks and technical viva questions."
        primary={{ href: "/mock-interview", label: "Open Interview Prep" }}
        secondary={{ href: "/companies", label: "See company-wise prep" }}
      />
    </>
  );
}
