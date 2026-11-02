import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { FaqItem } from "@/data/faq";
import { AtsChecker } from "@/components/resume/AtsChecker";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icon";
import { Breadcrumbs, NextStep, SectionHeading } from "@/components/ui";

const PATH = "/ats-resume-checker";

export const metadata = buildMetadata({
  title: "Free ATS Resume Checker for Freshers | PlacementSaathi",
  description:
    "Free ATS resume checker for freshers: paste your resume to get a score and a fix list for format, sections, action verbs, results and job description keywords.",
  path: PATH,
});

const checks: { title: string; text: string; icon: IconName }[] = [
  { title: "Contact details", text: "Email, phone and plain-text LinkedIn and GitHub links that software can read.", icon: "mail" },
  { title: "Standard sections", text: "Education, Skills and Projects under headings ATS software recognises.", icon: "layers" },
  { title: "Bullet quality", text: "Action verbs, measurable results, no “I/my” and no filler phrases.", icon: "check" },
  { title: "Clean format", text: "No icons, tables or columns that break text, and no unneeded personal details.", icon: "file" },
  { title: "Skill keywords", text: "Which technical skills are recognised, and which a job post asks for that you are missing.", icon: "search" },
  { title: "Length", text: "Whether it reads like a focused one-page fresher resume.", icon: "clock" },
];

const atsFacts = [
  {
    title: "What is an ATS?",
    text: "An Applicant Tracking System is software companies use to collect applications. It turns your resume into plain text, sorts it into fields such as education and skills, and lets recruiters search and filter candidates.",
  },
  {
    title: "Why resumes get filtered out",
    text: "If the software cannot read your text (because of tables, columns, images or icons), or your resume is missing the skills a recruiter searches for, it can rank low even when you are a good fit.",
  },
  {
    title: "What a good score means",
    text: "A high score here means your resume is easy for software and recruiters to read. It does not mean you will be shortlisted. Real content, honest skills and relevant projects still matter most.",
  },
];

const faqs: FaqItem[] = [
  {
    id: "ats-free",
    question: "Is this ATS resume checker free?",
    answer: "Yes. It is completely free with no sign-up. The check runs in your browser and your resume is never uploaded or stored.",
  },
  {
    id: "ats-pdf",
    question: "Can I check a PDF resume?",
    answer:
      "Open your PDF, select all the text (Ctrl+A), copy it (Ctrl+C) and paste it into the checker. This is close to how ATS software reads your file. If the pasted text is jumbled or missing, the software probably sees the same problem.",
  },
  {
    id: "ats-real",
    question: "Is this the same score a company's ATS gives?",
    answer:
      "No. Every company uses different software and settings, and none of them publish their scoring. This checker looks for the common problems that make resumes hard to read and match, so treat the score as a guide.",
  },
  {
    id: "ats-good-score",
    question: "What is a good ATS score?",
    answer:
      "Aim for 80 or more here, with no red items. Then tailor your skills and project bullets to each job description. A higher score improves readability; it does not guarantee a shortlist.",
  },
  {
    id: "ats-format",
    question: "Which resume format is best for ATS?",
    answer:
      "A single-column layout with standard headings (Education, Skills, Projects, Experience), a common font, plain text links and no tables, text boxes, icons or photos. Save it as a PDF with selectable text.",
  },
  {
    id: "ats-keywords",
    question: "Should I copy every keyword from the job description?",
    answer:
      "Only add skills you genuinely have and can explain in an interview. Adding skills you don't know may get you past a filter, but it usually fails in the technical round.",
  },
];

export default function AtsResumeCheckerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "PlacementSaathi ATS Resume Checker",
          url: absoluteUrl(PATH),
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any (runs in the browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          description: "Free ATS resume checker for freshers with a score, fix list and job description keyword match.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resume Builder", path: "/resume" },
          { name: "ATS Resume Checker", path: PATH },
        ])}
      />

      <section className="bg-hero relative overflow-hidden border-b border-slate-200/70">
        <div className="container-page relative py-10 sm:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resume Builder", href: "/resume" },
              { name: "ATS Resume Checker", href: PATH },
            ]}
          />
          <p className="eyebrow mt-6">ATS Resume Checker</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-brand-900 sm:text-5xl">Free ATS Resume Checker for Freshers</h1>
          <p className="lead mt-4 max-w-3xl">
            Paste your resume and get an instant score with a clear list of what to fix: format, sections, bullet points and
            skill keywords. Add a job description to see which skills you are missing.
          </p>
        </div>
      </section>

      <section className="section pt-8 sm:pt-10" aria-label="ATS resume checker tool">
        <div className="container-page">
          <AtsChecker />
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="what-we-check">
        <div className="container-page">
          <SectionHeading id="what-we-check" title="What this ATS checker looks at" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((c) => (
              <li key={c.title} className="card">
                <span className="icon-tile bg-brand-600">
                  <Icon name={c.icon} />
                </span>
                <h3 className="h3 mt-4">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="about-ats">
        <div className="container-page">
          <SectionHeading id="about-ats" title="How ATS software reads your resume" />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {atsFacts.map((f) => (
              <div key={f.title} className="card">
                <h3 className="h3">{f.title}</h3>
                <p className="prose-body mt-2">{f.text}</p>
              </div>
            ))}
          </div>
          <p className="prose-body mt-6">
            Need to fix the format? Build a new one in the{" "}
            <Link href="/resume#builder" className="link">
              free ATS-friendly resume builder
            </Link>
            , then paste it back here to check. For bullet-point ideas, see the{" "}
            <Link href="/resume#formula" className="link">
              project bullet formula
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="ats-faq">
        <div className="container-page max-w-3xl">
          <SectionHeading id="ats-faq" title="ATS resume checker FAQ" />
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>
          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            This checker is a free guide by PlacementSaathi. It is not the scoring system of any company and does not
            guarantee a shortlist or job.
          </p>
        </div>
      </section>

      <NextStep
        title="Resume ready? Prepare for the interview"
        text="Everything on your resume can come up in the interview. Practise HR answers and technical viva questions next."
        primary={{ href: "/mock-interview", label: "Open Interview Prep" }}
        secondary={{ href: "/resume", label: "Resume builder" }}
      />
    </>
  );
}
