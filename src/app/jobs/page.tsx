import { buildMetadata } from "@/lib/seo";
import { jobSources, offCampusSteps, scamSigns, type JobSource } from "@/data/jobs";
import { Icon, type IconName } from "@/components/Icon";
import { NextStep, Note, PageHero, SectionHeading, StepNumber } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Fresher Jobs and Internships: Official Sources Guide",
  description:
    "Find fresher jobs, internships and off-campus drives through official career portals. A step-by-step off-campus plan and how to spot fake job offers.",
  path: "/jobs",
});

const kindIcon: Record<JobSource["kind"], IconName> = {
  "Company careers": "building",
  Internships: "sparkles",
  "Job board": "briefcase",
  Government: "shield",
};

const kindStyle: Record<JobSource["kind"], string> = {
  "Company careers": "bg-brand-600",
  Internships: "bg-accent-600",
  "Job board": "bg-orange-500",
  Government: "bg-emerald-600",
};

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Jobs & Internships"
        icon="briefcase"
        title="Fresher Jobs, Internships and Off-Campus Drives"
        intro="PlacementSaathi does not post job listings. Instead, we point you to official sources where real openings are published, and show you how to apply off-campus safely."
      >
        <div className="mt-6 max-w-3xl">
          <Note tone="warn">
            Always apply through a company&apos;s official careers page. No genuine company asks for money to hire you.
          </Note>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="sources">
        <div className="container-page">
          <SectionHeading id="sources" title="Official places to find openings" intro="Bookmark these and turn on alerts. Links open the official site in a new tab." />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobSources.map((s) => (
              <li key={s.name} className="reveal">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="card card-hover flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`icon-tile ${kindStyle[s.kind]}`}>
                      <Icon name={kindIcon[s.kind]} />
                    </span>
                    <span className="badge bg-slate-100 text-slate-600">{s.kind}</span>
                  </div>
                  <h3 className="h3 mt-4">{s.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-slate-600">{s.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1 border-t border-slate-100 pt-4 text-sm font-semibold text-brand-600">
                    Visit official site <Icon name="external" className="h-4 w-4" />
                    <span className="sr-only"> (opens in new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="off-campus" className="section scroll-mt-16 bg-slate-50/70" aria-labelledby="off-campus-heading">
        <div className="container-page">
          <SectionHeading id="off-campus-heading" title="How to apply off-campus: a 6-step plan" intro="Off-campus hiring rewards students who are organised and apply early." />
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offCampusSteps.map((s, i) => (
              <li key={s.title} className="card reveal">
                <StepNumber n={i + 1} />
                <h3 className="h3 mt-3">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="scams">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div className="rounded-3xl bg-gradient-to-br from-rose-50 to-white p-6 ring-1 ring-rose-100 sm:p-8">
            <span className="icon-tile bg-rose-500">
              <Icon name="alert" />
            </span>
            <h2 id="scams" className="h2 mt-4">
              How to spot a fake job offer
            </h2>
            <p className="prose-body mt-2">
              Fresher job scams are common. If you see even one of these signs, stop and verify on the official careers page.
            </p>
          </div>
          <ul className="space-y-3">
            {scamSigns.map((s) => (
              <li key={s} className="card flex gap-3 p-4 text-sm text-slate-700">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                  <Icon name="close" className="h-3.5 w-3.5" />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NextStep
        title="Before you apply, check your resume"
        text="Most applications are filtered by an ATS first. Get your resume to 8+ on the 10-point checklist."
        primary={{ href: "/resume", label: "Open Resume Checklist" }}
        secondary={{ href: "/companies", label: "Company prep guides" }}
      />
    </>
  );
}
