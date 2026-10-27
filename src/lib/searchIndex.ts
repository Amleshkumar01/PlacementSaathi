// Builds a small search index of the site's real content for the header/hero search.
import { companies } from "@/data/companies";
import { dsaProblems } from "@/data/dsa";
import { aptitudeSections } from "@/data/aptitude";
import { vivaSubjects } from "@/data/interview";
import { faqs } from "@/data/faq";

export interface SearchItem {
  title: string;
  href: string;
  type: "Page" | "Company" | "DSA" | "Aptitude" | "Interview" | "FAQ";
  hint: string;
}

const pages: SearchItem[] = [
  { title: "DSA Practice Sheet", href: "/dsa", type: "Page", hint: "Pattern-wise coding problems with filters" },
  { title: "Aptitude Practice", href: "/aptitude", type: "Page", hint: "Quant, logical and verbal with solutions" },
  { title: "Resume Checklist (ATS)", href: "/resume", type: "Page", hint: "10-point checklist with live score" },
  { title: "Mock Interview Prep", href: "/mock-interview", type: "Page", hint: "HR frameworks and technical viva" },
  { title: "HR interview questions", href: "/mock-interview#hr", type: "Interview", hint: "Tell me about yourself, strengths, why hire you" },
  { title: "Company-wise Preparation", href: "/companies", type: "Page", hint: "TCS, Infosys, Wipro, Accenture, Capgemini, Amazon" },
  { title: "90-Day Roadmap", href: "/roadmap", type: "Page", hint: "Week-by-week placement plan" },
  { title: "TCS NQT Preparation Guide", href: "/tcs-nqt-preparation", type: "Page", hint: "Pattern, syllabus and 30-day plan" },
  { title: "Jobs & Internships", href: "/jobs", type: "Page", hint: "Official career portals, off-campus tips, scam safety" },
  { title: "Off-campus drives", href: "/jobs#off-campus", type: "Page", hint: "How to apply off-campus as a fresher" },
  { title: "Study Plan Calculator", href: "/#study-plan", type: "Page", hint: "Split your hours across topics" },
  { title: "FAQ", href: "/faq", type: "Page", hint: "Common placement questions" },
];

export function buildSearchIndex(): SearchItem[] {
  return [
    ...pages,
    ...companies.map((c) => ({
      title: `${c.name} preparation`,
      href: `/companies/${c.slug}`,
      type: "Company" as const,
      hint: c.cardLine,
    })),
    ...dsaProblems.map((p) => ({
      title: p.name,
      href: `/dsa?q=${encodeURIComponent(p.name)}#sheet`,
      type: "DSA" as const,
      hint: `${p.pattern} · ${p.difficulty}`,
    })),
    ...aptitudeSections.flatMap((s) =>
      s.topics.map((t) => ({
        title: t.name,
        href: "/aptitude",
        type: "Aptitude" as const,
        hint: `${s.label} · ${t.weightage} weightage`,
      })),
    ),
    ...vivaSubjects.map((v) => ({
      title: `${v.subject} interview questions`,
      href: `/mock-interview#${v.id}`,
      type: "Interview" as const,
      hint: v.topics.slice(0, 3).join(", "),
    })),
    ...faqs.map((f) => ({ title: f.question, href: `/faq#${f.id}`, type: "FAQ" as const, hint: "FAQ" })),
  ];
}
