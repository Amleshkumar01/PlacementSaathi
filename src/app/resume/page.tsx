import Link from "next/link";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { bulletFormula, commonMistakes, sectionOrder } from "@/data/resume";
import { AtsChecklist } from "@/components/AtsChecklist";
import { JsonLd } from "@/components/JsonLd";
import { ResumeBuilder } from "@/components/resume/ResumeBuilder";
import { Icon } from "@/components/Icon";
import { NextStep, Note, PageHero, SectionHeading, StepNumber } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Free ATS Resume Builder for Freshers | PlacementSaathi",
  description:
    "Free ATS-friendly resume builder for BTech freshers: fill a simple form, see a live one-page preview, check ATS tips, match job keywords and download a PDF.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "PlacementSaathi Resume Builder",
          url: absoluteUrl("/resume"),
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any (runs in the browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          description: "Free ATS-friendly resume builder for freshers with a live one-page preview and PDF download.",
        }}
      />
      <PageHero
        eyebrow="Resume Builder"
        title="Free ATS-Friendly Resume Builder for Freshers"
        intro="Fill in the form and watch your resume take shape. The template is a simple one-column layout that ATS software (the program companies use to filter resumes) can read. Check the tips, match a job description, then download it as a PDF. Free, no sign-up."
      />

      <section id="builder" className="section pt-8 sm:pt-10" aria-labelledby="builder-heading">
        <div className="container-page">
          <h2 id="builder-heading" className="sr-only">
            Build your resume
          </h2>
          <ResumeBuilder />
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 print:hidden">
            <div>
              <p className="font-semibold text-brand-900">Already have a resume? Get an ATS score</p>
              <p className="mt-0.5 text-sm text-slate-600">Paste it into the free ATS resume checker for a score and a fix list.</p>
            </div>
            <Link href="/ats-resume-checker" className="btn btn-primary shrink-0">
              Check my resume <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500 print:hidden">
            Your details stay in your browser and are never uploaded. A clean format helps your resume get read, but it does
            not guarantee a shortlist.
          </p>
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="checklist">
        <div className="container-page">
          <SectionHeading
            id="checklist"
            title="Already have a resume? Check it in 2 minutes"
            intro="Tick each point that is genuinely true for your current resume. For an automatic check, use the ATS resume checker."
          />
          <div className="mt-6">
            <AtsChecklist />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="formula">
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

      <section className="section bg-slate-50/70" aria-labelledby="mistakes">
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
