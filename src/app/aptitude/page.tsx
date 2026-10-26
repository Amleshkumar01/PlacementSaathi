import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { aptitudeSections, dailyPracticeGuide } from "@/data/aptitude";
import { AptitudeTabs } from "@/components/AptitudeTabs";
import { Icon, type IconName } from "@/components/Icon";
import { NextStep, Note, PageHero, SectionHeading } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Aptitude Questions with Solutions for Placements 2026",
  description:
    "Placement aptitude prep: topic weightage, shortcuts and step-by-step solved questions for quant, logical reasoning and verbal ability, for TCS NQT and more.",
  path: "/aptitude",
});

const rules: { title: string; text: string; icon: IconName }[] = [
  { title: "Speed is the score", text: "Spend at most 60 seconds per question. If it isn't working, mark it and move on.", icon: "clock" },
  { title: "Watch sectional cut-offs", text: "TCS NQT especially needs you to clear every section, so touch all three daily.", icon: "target" },
  { title: "Previous patterns first", text: "Start with your target company's past patterns. Topics repeat; only numbers change.", icon: "layers" },
];

export default function AptitudePage() {
  const topicCount = aptitudeSections.reduce((n, s) => n + s.topics.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Aptitude Practice"
        icon="calculator"
        title="Aptitude Preparation for Campus Placements"
        intro={`Aptitude is the gatekeeper before coding. It is the first round at TCS NQT, Infosys, Wipro Elite and Accenture. Here you get weightage, shortcuts and solved examples for ${topicCount} topics.`}
      >
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {rules.map((r) => (
            <li key={r.title} className="glass p-4">
              <span className="icon-tile h-9 w-9 bg-brand-600">
                <Icon name={r.icon} className="h-4.5 w-4.5" />
              </span>
              <p className="mt-3 font-semibold text-brand-900">{r.title}</p>
              <p className="mt-1 text-sm text-slate-600">{r.text}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section" aria-label="Aptitude sections">
        <div className="container-page">
          <AptitudeTabs sections={aptitudeSections} />
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="daily">
        <div className="container-page">
          <SectionHeading id="daily" title="How much should you practise daily?" intro="Around 1 hour of aptitude a day is enough alongside college, if you stay consistent." />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dailyPracticeGuide.map((g) => (
              <li key={g.label} className="card reveal">
                <p className="text-sm font-semibold text-brand-600">{g.label}</p>
                <p className="mt-2 text-sm text-slate-700">{g.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Note>
              See which aptitude topics matter most for each company in{" "}
              <Link href="/companies" className="link">
                Company-wise Preparation
              </Link>
              . Two days before a test, revise only your target company&apos;s pattern.
            </Note>
          </div>
        </div>
      </section>

      <NextStep
        title="After aptitude, get your resume ready"
        text="Once you clear the test, shortlisting depends on your resume. Check your score with the 10-point ATS checklist."
        primary={{ href: "/resume", label: "Open Resume Checklist" }}
        secondary={{ href: "/dsa", label: "Practise DSA" }}
      />
    </>
  );
}
