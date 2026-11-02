// ATS resume checker: analyses plain resume text in the browser.
// It looks for the things applicant-tracking software and recruiters commonly trip on.
// This is a guide, not the scoring system of any real company.

import { ACTION_VERBS, KEYWORDS, matchKeywords } from "./resume";

export type Severity = "pass" | "warn" | "fail";

export interface AtsFinding {
  id: string;
  category: "Contact" | "Sections" | "Content" | "Format" | "Keywords";
  label: string;
  severity: Severity;
  detail: string;
  weight: number;
}

export interface AtsReport {
  score: number;
  wordCount: number;
  findings: AtsFinding[];
  byCategory: { category: AtsFinding["category"]; earned: number; total: number }[];
  skillsFound: string[];
  jd: { found: string[]; missing: string[] } | null;
}

const SECTION_PATTERNS: { key: string; name: string; re: RegExp; required: boolean }[] = [
  { key: "education", name: "Education", re: /^(education|academic (details|qualifications?|background)|qualifications?)\b/i, required: true },
  { key: "skills", name: "Skills", re: /^((technical |key |core )?skills|technologies|tech stack|skills? (and|&) (tools|technologies))\b/i, required: true },
  { key: "projects", name: "Projects", re: /^((academic |personal |key )?projects?)\b/i, required: true },
  { key: "experience", name: "Experience", re: /^((work |professional )?experience|internships?|employment( history)?|work history)\b/i, required: false },
  { key: "summary", name: "Summary", re: /^(summary|profile|professional summary|about me|career objective|objective)\b/i, required: false },
  { key: "achievements", name: "Achievements", re: /^(achievements?|awards?|accomplishments?|certifications?|extra[- ]?curricular)\b/i, required: false },
];

const WEAK_PHRASES = [
  "responsible for", "worked on", "helped with", "helped in", "involved in", "participated in", "various", "etc.",
  "hardworking", "hard working", "team player", "quick learner", "passionate", "go-getter", "self-motivated", "result-oriented",
];

const PERSONAL_DETAILS = [
  { re: /\b(date of birth|d\.?o\.?b\.?)\b/i, name: "date of birth" },
  { re: /\b(father'?s name|mother'?s name)\b/i, name: "parents' names" },
  { re: /\bmarital status\b/i, name: "marital status" },
  { re: /\breligion\b/i, name: "religion" },
  { re: /\bnationality\b/i, name: "nationality" },
  { re: /\bgender\s*[:\-]/i, name: "gender" },
  { re: /\bdeclaration\b/i, name: "a declaration" },
  { re: /\blanguages known\b/i, name: "'languages known'" },
];

const CLICHE_OBJECTIVE = /(seeking a (challenging|responsible)|reputed (organi[sz]ation|company)|growth of the organi[sz]ation|utili[sz]e my skills|dynamic environment)/i;

/** Symbols that often come from icons or fancy templates and get garbled by ATS parsers. */
const ODD_SYMBOLS = /[☎✆✉✈★☆✓✔✗✘➤➢►▶◆◇■□●○◉❖♦⚫⚪📞📧📱📍🔗💼🎓🏆]/gu;

const BULLET_PREFIX = /^\s*[•\-*–·▪●○➤►✓✔]\s*/;

export const SAMPLE_WEAK_RESUME = `Rahul Kumar
Email: coolrahul123@gmail.com | Phone: 98765 43210
Date of Birth: 01/01/2003 | Father's Name: Mr. Kumar

CAREER OBJECTIVE
Seeking a challenging position in a reputed organisation where I can utilise my skills for the growth of the organisation.

EDUCATION
B.Tech Computer Science, ABC College, 2026, CGPA 7.8

SKILLS
C, Java, HTML, MS Office, hardworking, team player

PROJECTS
Library Management System
• I made a library management system in Java
• Worked on database part
Weather App
• Responsible for frontend

DECLARATION
I hereby declare that the above information is true to the best of my knowledge.`;

function lines(text: string) {
  return text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

/** A bullet is a line that starts with a bullet symbol, or a sentence-like line under a section. */
function bulletLines(all: string[]) {
  const explicit = all.filter((l) => BULLET_PREFIX.test(l)).map((l) => l.replace(BULLET_PREFIX, "").trim());
  if (explicit.length >= 2) return explicit;
  return all.filter((l) => l.split(/\s+/).length >= 7 && /^[A-Za-z]/.test(l) && !/[:|]/.test(l.slice(0, 20)));
}

const firstWord = (l: string) => (l.split(/\s+/)[0] || "").toLowerCase().replace(/[^a-z]/g, "");

export function analyseResume(text: string, jobDescription = ""): AtsReport {
  const raw = text.replace(/\u00a0/g, " ");
  const all = lines(raw);
  const lower = raw.toLowerCase();
  const words = raw.trim() ? raw.trim().split(/\s+/).length : 0;
  const findings: AtsFinding[] = [];
  const add = (f: AtsFinding) => findings.push(f);

  // ----- Contact -----------------------------------------------------------
  const emails = raw.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [];
  add({
    id: "email", category: "Contact", weight: 8,
    label: "Email address",
    severity: emails.length ? "pass" : "fail",
    detail: emails.length ? `Found: ${emails[0]}` : "No email found. Put a professional email in the header.",
  });
  if (emails.length && /(cool|dude|king|queen|cute|rockstar|hacker|xxx|420|007|\d{3,}@)/i.test(emails[0] ?? "")) {
    add({ id: "emailStyle", category: "Contact", weight: 3, label: "Professional email", severity: "warn", detail: "Your email looks informal. Use a name-based one like firstname.lastname@gmail.com." });
  } else if (emails.length) {
    add({ id: "emailStyle", category: "Contact", weight: 3, label: "Professional email", severity: "pass", detail: "Looks professional." });
  }
  const phone = /(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}\b/.test(raw) || (raw.match(/\d/g) || []).length >= 10 && /\b\d[\d\s-]{8,}\d\b/.test(raw);
  add({ id: "phone", category: "Contact", weight: 6, label: "Phone number", severity: phone ? "pass" : "fail", detail: phone ? "Found a phone number." : "No 10-digit phone number found." });
  const hasLinkedIn = /linkedin\.com\/in\//i.test(raw);
  const hasGitHub = /github\.com\//i.test(raw);
  add({
    id: "links", category: "Contact", weight: 5,
    label: "LinkedIn / GitHub links",
    severity: hasLinkedIn || hasGitHub ? "pass" : "warn",
    detail: hasLinkedIn || hasGitHub
      ? `Found ${[hasLinkedIn && "LinkedIn", hasGitHub && "GitHub"].filter(Boolean).join(" and ")}.`
      : "Add your GitHub and LinkedIn URLs as plain text (for example github.com/yourname). Icon-only links are not read by ATS.",
  });

  // ----- Sections ----------------------------------------------------------
  const headingLines = all.filter((l) => l.length <= 45 && !/[.@]/.test(l));
  const found = new Set(SECTION_PATTERNS.filter((s) => headingLines.some((l) => s.re.test(l.replace(/[:\-–|]+$/, "").trim()))).map((s) => s.key));
  for (const s of SECTION_PATTERNS.filter((x) => x.required)) {
    add({
      id: `sec-${s.key}`, category: "Sections", weight: 6,
      label: `"${s.name}" section`,
      severity: found.has(s.key) ? "pass" : "fail",
      detail: found.has(s.key) ? "Found with a standard heading." : `No ${s.name} heading found. Use the plain heading "${s.name.toUpperCase()}" so ATS can find it.`,
    });
  }
  add({
    id: "sec-experience", category: "Sections", weight: 2,
    label: '"Experience" or "Internships" section',
    severity: found.has("experience") ? "pass" : "warn",
    detail: found.has("experience") ? "Found." : "Optional for freshers. Add it if you have any internship, freelance or club work.",
  });

  // ----- Content -----------------------------------------------------------
  const bullets = bulletLines(all);
  const verbShare = bullets.length ? bullets.filter((b) => ACTION_VERBS.includes(firstWord(b))).length / bullets.length : 0;
  const numShare = bullets.length ? bullets.filter((b) => /\d/.test(b)).length / bullets.length : 0;
  add({
    id: "verbs", category: "Content", weight: 8,
    label: "Bullets start with action verbs",
    severity: !bullets.length ? "fail" : verbShare >= 0.7 ? "pass" : verbShare >= 0.4 ? "warn" : "fail",
    detail: !bullets.length
      ? "No bullet points found. Describe each project in 2-3 bullet points."
      : `${Math.round(verbShare * 100)}% of ${bullets.length} bullets start with an action verb (Built, Developed, Designed, Reduced…). Aim for most of them.`,
  });
  add({
    id: "numbers", category: "Content", weight: 8,
    label: "Measurable results",
    severity: !bullets.length ? "fail" : numShare >= 0.4 ? "pass" : numShare >= 0.2 ? "warn" : "fail",
    detail: `${Math.round(numShare * 100)}% of bullets contain a number. Add real results such as users, test count, time saved or accuracy. Never invent numbers.`,
  });
  const pronouns = bullets.filter((b) => /\b(i|me|my)\b/i.test(b)).length;
  add({
    id: "pronouns", category: "Content", weight: 4,
    label: 'No "I / me / my" in bullets',
    severity: pronouns === 0 ? "pass" : "warn",
    detail: pronouns === 0 ? "Good." : `${pronouns} bullet(s) use I/me/my. Write "Built a REST API…" instead of "I built a REST API…".`,
  });
  const weak = WEAK_PHRASES.filter((w) => lower.includes(w));
  add({
    id: "weak", category: "Content", weight: 5,
    label: "No weak or filler phrases",
    severity: weak.length === 0 ? "pass" : weak.length <= 2 ? "warn" : "fail",
    detail: weak.length === 0 ? "None found." : `Found: ${weak.map((w) => `"${w}"`).join(", ")}. Replace them with what you actually did and the result.`,
  });
  add({
    id: "objective", category: "Content", weight: 3,
    label: "No generic career objective",
    severity: CLICHE_OBJECTIVE.test(raw) ? "warn" : "pass",
    detail: CLICHE_OBJECTIVE.test(raw)
      ? 'A line like "seeking a challenging position in a reputed organisation" says nothing. Use a 2-line summary with your skill and one achievement, or skip it.'
      : "Good.",
  });
  const lengthOk = words >= 200 && words <= 650;
  add({
    id: "length", category: "Content", weight: 6,
    label: "Length suits a one-page fresher resume",
    severity: lengthOk ? "pass" : words < 120 || words > 900 ? "fail" : "warn",
    detail: `About ${words} words. A one-page fresher resume is usually 250-600 words.`,
  });

  // ----- Format ------------------------------------------------------------
  const personal = PERSONAL_DETAILS.filter((p) => p.re.test(raw)).map((p) => p.name);
  add({
    id: "personal", category: "Format", weight: 5,
    label: "No unnecessary personal details",
    severity: personal.length ? "warn" : "pass",
    detail: personal.length ? `Remove ${personal.join(", ")}. Companies don't need them and they waste space.` : "Good.",
  });
  const odd = raw.match(ODD_SYMBOLS) || [];
  add({
    id: "symbols", category: "Format", weight: 4,
    label: "No icons or special symbols",
    severity: odd.length === 0 ? "pass" : "warn",
    detail: odd.length === 0 ? "Good." : `Found ${odd.length} icon/symbol character(s) such as ${[...new Set(odd)].slice(0, 4).join(" ")}. ATS often turns these into junk. Use plain words like "Email:".`,
  });
  const pipeHeavy = all.filter((l) => (l.match(/\|/g) || []).length >= 4 || /\t.*\t/.test(l)).length;
  const shortLines = all.filter((l) => l.split(/\s+/).length <= 2).length;
  const jumbled = all.length > 15 && shortLines / all.length > 0.55;
  add({
    id: "layout", category: "Format", weight: 5,
    label: "Text reads in a clean order",
    severity: pipeHeavy > 2 || jumbled ? "warn" : "pass",
    detail: pipeHeavy > 2 || jumbled
      ? "Your text looks split into many short pieces or columns. This usually comes from tables, text boxes or a two-column template. Use a single-column layout."
      : "Text comes out in a readable order.",
  });
  const years = raw.match(/\b(19|20)\d{2}\b/g) || [];
  add({
    id: "dates", category: "Format", weight: 3,
    label: "Dates for education and experience",
    severity: years.length ? "pass" : "warn",
    detail: years.length ? "Found dates." : "Add passing years (and internship months) so recruiters can see your timeline.",
  });

  // ----- Keywords ----------------------------------------------------------
  const skillsFound = KEYWORDS.filter((k) => matchKeywords(k, raw).found.length > 0);
  add({
    id: "skills", category: "Keywords", weight: 6,
    label: "Technical skills recognised",
    severity: skillsFound.length >= 8 ? "pass" : skillsFound.length >= 4 ? "warn" : "fail",
    detail: `${skillsFound.length} common technical skill(s) recognised. List the languages, frameworks, tools and CS subjects you really know, by their standard names.`,
  });
  const jd = jobDescription.trim() ? matchKeywords(jobDescription, raw) : null;
  if (jd && jd.found.length + jd.missing.length > 0) {
    const share = jd.found.length / (jd.found.length + jd.missing.length);
    add({
      id: "jd", category: "Keywords", weight: 10,
      label: "Matches the job description",
      severity: share >= 0.7 ? "pass" : share >= 0.4 ? "warn" : "fail",
      detail: `${jd.found.length} of ${jd.found.length + jd.missing.length} skills from the job post are in your resume.`,
    });
  }

  // ----- Score -------------------------------------------------------------
  const value = (s: Severity) => (s === "pass" ? 1 : s === "warn" ? 0.5 : 0);
  const total = findings.reduce((n, f) => n + f.weight, 0);
  const earned = findings.reduce((n, f) => n + f.weight * value(f.severity), 0);
  const categories: AtsFinding["category"][] = ["Contact", "Sections", "Content", "Format", "Keywords"];
  const byCategory = categories.map((category) => {
    const fs = findings.filter((f) => f.category === category);
    return {
      category,
      earned: Math.round(fs.reduce((n, f) => n + f.weight * value(f.severity), 0)),
      total: fs.reduce((n, f) => n + f.weight, 0),
    };
  });

  return {
    score: words === 0 ? 0 : Math.round((earned / total) * 100),
    wordCount: words,
    findings,
    byCategory,
    skillsFound,
    jd,
  };
}
