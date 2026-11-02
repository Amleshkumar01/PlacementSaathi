// Resume builder: data model, plain-text export, ATS checks and keyword matching.
// Everything runs in the browser. Nothing is sent to a server.

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
  score: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tech: string;
  link: string;
  /** One bullet per line */
  bullets: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  education: EducationItem[];
  skills: { languages: string; frameworks: string; tools: string; fundamentals: string };
  projects: ProjectItem[];
  experience: ExperienceItem[];
  achievements: string;
  certifications: string;
}

export const STORAGE_KEY = "ps-resume-v1";

export type TemplateId = "classic" | "modern" | "compact";

export const resumeTemplates: { id: TemplateId; name: string; note: string }[] = [
  { id: "classic", name: "Classic", note: "Centred name, black and white. Safe for every company." },
  { id: "modern", name: "Modern", note: "Left-aligned with navy headings. Clean and readable." },
  { id: "compact", name: "Compact", note: "Serif font, tighter spacing. Fits more on one page." },
];

export const isTemplateId = (v: unknown): v is TemplateId => v === "classic" || v === "modern" || v === "compact";

export const newId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export const blankEducation = (id = newId("edu")): EducationItem => ({ id, degree: "", school: "", location: "", start: "", end: "", score: "" });
export const blankProject = (id = newId("proj")): ProjectItem => ({ id, name: "", tech: "", link: "", bullets: "" });
export const blankExperience = (id = newId("exp")): ExperienceItem => ({ id, role: "", company: "", location: "", start: "", end: "", bullets: "" });

/** Deterministic ids so server and client render the same HTML. */
export const emptyResume = (): ResumeData => ({
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
  summary: "",
  education: [blankEducation("edu-1")],
  skills: { languages: "", frameworks: "", tools: "", fundamentals: "" },
  projects: [blankProject("proj-1"), blankProject("proj-2")],
  experience: [],
  achievements: "",
  certifications: "",
});

/**
 * A clearly-labelled example to show the format. Every number in it is a placeholder:
 * students must replace it with their own real details.
 */
export const exampleResume = (): ResumeData => ({
  name: "Your Name",
  email: "yourname@gmail.com",
  phone: "+91 98765 43210",
  location: "Pune, Maharashtra",
  linkedin: "linkedin.com/in/yourname",
  github: "github.com/yourname",
  portfolio: "",
  summary:
    "Final-year BTech CSE student with a strong base in Java, DSA and SQL. Built 2 full-stack projects with React and Spring Boot and solved 300+ problems on LeetCode.",
  education: [
    { id: "edu-1", degree: "B.Tech in Computer Science and Engineering", school: "Your College Name", location: "Pune", start: "2022", end: "2026", score: "CGPA 8.1/10" },
    { id: "edu-2", degree: "Class XII (CBSE)", school: "Your School Name", location: "Pune", start: "", end: "2022", score: "86%" },
  ],
  skills: {
    languages: "Java, Python, C++, SQL, JavaScript",
    frameworks: "React, Spring Boot, Node.js, Express",
    tools: "Git, GitHub, Postman, MySQL, VS Code, Linux",
    fundamentals: "Data Structures and Algorithms, OOP, DBMS, Operating Systems, Computer Networks",
  },
  projects: [
    {
      id: "proj-1",
      name: "Campus Placement Tracker",
      tech: "React, Spring Boot, MySQL",
      link: "github.com/yourname/placement-tracker",
      bullets:
        "Built a web app for students to track applications, test dates and interview rounds for 40+ companies\nDesigned a REST API with Spring Boot and MySQL and added JWT login for 3 user roles\nReduced page load time from 2.4s to 0.9s by adding pagination and database indexes",
    },
    {
      id: "proj-2",
      name: "Expense Splitter",
      tech: "Node.js, Express, MongoDB",
      link: "github.com/yourname/expense-splitter",
      bullets:
        "Developed an app that splits shared expenses and settles balances in the fewest transactions\nWrote 25 unit tests with Jest and set up GitHub Actions to run them on every push",
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Web Development Intern",
      company: "Company Name",
      location: "Remote",
      start: "May 2025",
      end: "Jul 2025",
      bullets: "Fixed 15+ UI bugs in a React dashboard used by the support team\nAdded form validation that cut invalid submissions by about 30%",
    },
  ],
  achievements: "Solved 300+ problems on LeetCode (max rating 1650)\nTop 10 out of 120 teams in college hackathon",
  certifications: "Oracle Certified Foundations Associate (Java)\nNPTEL: Database Management System (Elite)",
});

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.slice(0, max) : "");
const arr = (v: unknown): Record<string, unknown>[] =>
  Array.isArray(v) ? v.filter((x): x is Record<string, unknown> => !!x && typeof x === "object").slice(0, 8) : [];

/** Safely rebuilds resume data loaded from localStorage (ignores unknown or broken values). */
export function normalizeResume(raw: unknown): ResumeData {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const s = (r.skills && typeof r.skills === "object" ? r.skills : {}) as Record<string, unknown>;
  return {
    name: str(r.name, 120),
    email: str(r.email, 120),
    phone: str(r.phone, 40),
    location: str(r.location, 80),
    linkedin: str(r.linkedin, 200),
    github: str(r.github, 200),
    portfolio: str(r.portfolio, 200),
    summary: str(r.summary, 800),
    education: arr(r.education).map((e) => ({
      id: str(e.id, 40) || newId("edu"),
      degree: str(e.degree, 160), school: str(e.school, 160), location: str(e.location, 80),
      start: str(e.start, 30), end: str(e.end, 30), score: str(e.score, 60),
    })),
    skills: { languages: str(s.languages, 400), frameworks: str(s.frameworks, 400), tools: str(s.tools, 400), fundamentals: str(s.fundamentals, 400) },
    projects: arr(r.projects).map((p) => ({
      id: str(p.id, 40) || newId("proj"),
      name: str(p.name, 160), tech: str(p.tech, 200), link: str(p.link, 200), bullets: str(p.bullets, 1500),
    })),
    experience: arr(r.experience).map((e) => ({
      id: str(e.id, 40) || newId("exp"),
      role: str(e.role, 160), company: str(e.company, 160), location: str(e.location, 80),
      start: str(e.start, 30), end: str(e.end, 30), bullets: str(e.bullets, 1500),
    })),
    achievements: str(r.achievements, 1200),
    certifications: str(r.certifications, 1200),
  };
}

/** Splits a textarea into clean lines (removes bullet symbols the user typed). */
export function toLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.replace(/^[\s•\-*–·>]+/, "").trim())
    .filter(Boolean);
}

export const splitList = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export const cleanUrl = (u: string) => u.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");

export const hasText = (...v: string[]) => v.some((x) => x.trim().length > 0);

export function filledEducation(r: ResumeData) {
  return r.education.filter((e) => hasText(e.degree, e.school));
}
export function filledProjects(r: ResumeData) {
  return r.projects.filter((p) => hasText(p.name, p.bullets));
}
export function filledExperience(r: ResumeData) {
  return r.experience.filter((e) => hasText(e.role, e.company, e.bullets));
}

export const dateRange = (start: string, end: string) => [start.trim(), end.trim()].filter(Boolean).join(" – ");

export function contactParts(r: ResumeData): string[] {
  return [r.email, r.phone, r.location, cleanUrl(r.linkedin), cleanUrl(r.github), cleanUrl(r.portfolio)].map((x) => x.trim()).filter(Boolean);
}

export const skillRows = (r: ResumeData) =>
  [
    ["Languages", r.skills.languages],
    ["Frameworks / Libraries", r.skills.frameworks],
    ["Tools / Platforms", r.skills.tools],
    ["CS Fundamentals", r.skills.fundamentals],
  ].filter(([, v]) => v.trim()) as [string, string][];

/** Plain-text version: used for the .txt download and for keyword matching. */
export function toPlainText(r: ResumeData): string {
  const out: string[] = [];
  const section = (title: string) => out.push("", title.toUpperCase());
  if (r.name.trim()) out.push(r.name.trim());
  const contact = contactParts(r);
  if (contact.length) out.push(contact.join(" | "));
  if (r.summary.trim()) {
    section("Summary");
    out.push(r.summary.trim());
  }
  const edu = filledEducation(r);
  if (edu.length) {
    section("Education");
    for (const e of edu) {
      out.push([e.degree, e.school, e.location].filter((x) => x.trim()).join(", ") + (dateRange(e.start, e.end) ? ` (${dateRange(e.start, e.end)})` : ""));
      if (e.score.trim()) out.push(e.score.trim());
    }
  }
  const skills = skillRows(r);
  if (skills.length) {
    section("Technical Skills");
    for (const [k, v] of skills) out.push(`${k}: ${v.trim()}`);
  }
  const exp = filledExperience(r);
  const proj = filledProjects(r);
  const writeExp = () => {
    if (!exp.length) return;
    section("Experience");
    for (const e of exp) {
      out.push([e.role, e.company, e.location].filter((x) => x.trim()).join(", ") + (dateRange(e.start, e.end) ? ` (${dateRange(e.start, e.end)})` : ""));
      for (const b of toLines(e.bullets)) out.push(`- ${b}`);
    }
  };
  const writeProj = () => {
    if (!proj.length) return;
    section("Projects");
    for (const p of proj) {
      out.push([p.name.trim(), p.tech.trim() && `${p.tech.trim()}`, cleanUrl(p.link)].filter(Boolean).join(" | "));
      for (const b of toLines(p.bullets)) out.push(`- ${b}`);
    }
  };
  writeExp();
  writeProj();
  const ach = toLines(r.achievements);
  if (ach.length) {
    section("Achievements");
    for (const a of ach) out.push(`- ${a}`);
  }
  const cert = toLines(r.certifications);
  if (cert.length) {
    section("Certifications");
    for (const c of cert) out.push(`- ${c}`);
  }
  return out.join("\n").trim() + "\n";
}

export const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export function fileBaseName(name: string): string {
  const parts = name
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3);
  return parts.length && name.trim().toLowerCase() !== "your name" ? `${parts.join("_")}_Resume` : "Resume";
}

// ---------------------------------------------------------------------------
// ATS checks
// ---------------------------------------------------------------------------

export const ACTION_VERBS = [
  "achieved", "added", "analysed", "analyzed", "architected", "automated", "built", "cleaned", "collaborated", "configured",
  "contributed", "created", "cut", "debugged", "deployed", "designed", "developed", "documented", "drove", "enhanced",
  "established", "evaluated", "executed", "fixed", "handled", "implemented", "improved", "increased", "integrated", "introduced",
  "launched", "led", "maintained", "managed", "mentored", "migrated", "modelled", "modeled", "optimised", "optimized",
  "organised", "organized", "presented", "programmed", "published", "rebuilt", "redesigned", "reduced", "refactored", "researched",
  "resolved", "scaled", "secured", "set", "shipped", "simplified", "solved", "streamlined", "tested", "trained",
  "translated", "upgraded", "validated", "visualised", "visualized", "won", "wrote", "coordinated", "conducted", "converted",
];

export interface ResumeCheck {
  id: string;
  label: string;
  pass: boolean;
  hint: string;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
const digitsIn = (s: string) => (s.match(/\d/g) || []).length;
const startsWithVerb = (b: string) => ACTION_VERBS.includes(b.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, "") ?? "");

export function allBullets(r: ResumeData): string[] {
  return [...filledProjects(r).flatMap((p) => toLines(p.bullets)), ...filledExperience(r).flatMap((e) => toLines(e.bullets))];
}

export function runChecks(r: ResumeData): ResumeCheck[] {
  const bullets = allBullets(r);
  const projects = filledProjects(r);
  const skills = [r.skills.languages, r.skills.frameworks, r.skills.tools, r.skills.fundamentals];
  const skillCount = skills.flatMap(splitList).length;
  const groups = skills.filter((s) => s.trim()).length;
  const verbShare = bullets.length ? bullets.filter(startsWithVerb).length / bullets.length : 0;
  const numberShare = bullets.length ? bullets.filter((b) => /\d/.test(b)).length / bullets.length : 0;
  const badLength = bullets.filter((b) => wordCount(b) < 8 || wordCount(b) > 35);
  const words = wordCount(toPlainText(r));
  const summaryWords = wordCount(r.summary);
  const education = filledEducation(r);

  return [
    {
      id: "contact",
      label: "Name, email and phone number are filled in",
      pass: r.name.trim().length > 1 && isEmail(r.email) && digitsIn(r.phone) >= 10,
      hint: "Recruiters need all three. Use a simple email with your name, and a 10-digit phone number.",
    },
    {
      id: "email",
      label: "Email looks professional",
      pass: isEmail(r.email) && !/(cool|dude|king|queen|cute|rockstar|hacker|xxx|420|007)/i.test(r.email),
      hint: "Use a name-based email like firstname.lastname@gmail.com.",
    },
    {
      id: "links",
      label: "LinkedIn or GitHub link is added",
      pass: hasText(r.linkedin, r.github),
      hint: "Add at least GitHub for a CSE resume. Make sure the profile is public and up to date.",
    },
    {
      id: "summary",
      label: "Summary is short (60 words or less) or skipped",
      pass: summaryWords <= 60,
      hint: `Your summary has ${summaryWords} words. Keep it to 2-3 lines: branch, strongest skill and one real achievement.`,
    },
    {
      id: "education",
      label: "Education has degree, college and passing year",
      pass: education.some((e) => hasText(e.degree) && hasText(e.school) && hasText(e.end)),
      hint: "Add your degree, college name and expected passing year. CGPA is optional but common.",
    },
    {
      id: "skills",
      label: "At least 6 skills in 2 or more groups",
      pass: skillCount >= 6 && groups >= 2,
      hint: "Separate skills with commas and group them: Languages, Frameworks, Tools, CS Fundamentals.",
    },
    {
      id: "projects",
      label: "2-3 projects are added",
      pass: projects.length >= 2 && projects.length <= 4,
      hint: projects.length > 4 ? "Keep only your best 2-3 projects so the resume stays on one page." : "Add 2-3 projects you can explain in an interview.",
    },
    {
      id: "projectTech",
      label: "Every project lists the technologies used",
      pass: projects.length > 0 && projects.every((p) => p.tech.trim()),
      hint: "ATS software matches technology names, so write them out (for example: React, Node.js, MongoDB).",
    },
    {
      id: "projectBullets",
      label: "Every project has at least 2 bullet points",
      pass: projects.length > 0 && projects.every((p) => toLines(p.bullets).length >= 2),
      hint: "Write 2-3 bullets per project: what you built, how, and the result.",
    },
    {
      id: "verbs",
      label: "Bullets start with an action verb",
      pass: bullets.length > 0 && verbShare >= 0.8,
      hint: `${Math.round(verbShare * 100)}% of your bullets start with an action verb. Start each with words like Built, Developed, Designed, Reduced.`,
    },
    {
      id: "numbers",
      label: "At least half the bullets show a measurable result",
      pass: bullets.length > 0 && numberShare >= 0.5,
      hint: `${Math.round(numberShare * 100)}% of your bullets have a number. Add real results (users, time saved, test count). Never invent numbers.`,
    },
    {
      id: "bulletLength",
      label: "Bullets are 8-35 words long",
      pass: bullets.length > 0 && badLength.length === 0,
      hint: badLength.length
        ? `${badLength.length} bullet(s) are too short or too long. Aim for one clear line of 12-25 words.`
        : "Add bullet points to your projects or experience.",
    },
    {
      id: "firstPerson",
      label: "No “I”, “me” or “my” in bullets",
      pass: bullets.every((b) => !/\b(i|me|my)\b/i.test(b)),
      hint: "Resume bullets skip the subject: write “Built a REST API…”, not “I built a REST API…”.",
    },
    {
      id: "length",
      label: "Fits on one page (about 600 words or less)",
      pass: words > 0 && words <= 600,
      hint: `Your resume has about ${words} words. A fresher resume should fit on one page, so cut the weakest points.`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Job description keyword match
// ---------------------------------------------------------------------------

export const KEYWORDS = [
  "Java", "Python", "C++", "C#", "JavaScript", "TypeScript", "Kotlin", "Swift", "Golang", "Rust", "PHP", "Ruby", "Scala",
  "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle", "NoSQL", "HTML", "CSS", "Tailwind", "Bootstrap",
  "React", "Angular", "Vue", "Next.js", "Node.js", "Express", "Django", "Flask", "FastAPI", "Spring Boot", "Spring",
  "Hibernate", ".NET", "REST", "GraphQL", "Microservices", "API", "JSON", "Git", "GitHub", "Linux", "Shell",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Cloud", "CI/CD", "Jenkins", "Jira", "Agile", "Scrum", "SDLC",
  "DSA", "Data Structures", "Algorithms", "OOP", "OOPs", "DBMS", "Operating Systems", "Computer Networks",
  "System Design", "Machine Learning", "Deep Learning", "NLP", "TensorFlow", "PyTorch", "Pandas", "NumPy",
  "Power BI", "Tableau", "Excel", "Selenium", "Unit Testing", "JUnit", "Testing", "Android", "Flutter", "Firebase",
  "Problem Solving", "Debugging", "Communication", "Teamwork",
];

function keywordRegex(term: string) {
  const esc = term.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&").replace(/\s+/g, "\\s+");
  return new RegExp(`(^|[^a-z0-9+#.])${esc}(?=$|[^a-z0-9+#])`, "i");
}

const regexCache = new Map<string, RegExp>();
const hasKeyword = (text: string, term: string) => {
  let re = regexCache.get(term);
  if (!re) {
    re = keywordRegex(term);
    regexCache.set(term, re);
  }
  return re.test(text);
};

export function matchKeywords(jobDescription: string, resumeText: string) {
  const jd = ` ${jobDescription.toLowerCase()} `;
  const cv = ` ${resumeText.toLowerCase()} `;
  const inJd = KEYWORDS.filter((k) => hasKeyword(jd, k));
  return {
    found: inJd.filter((k) => hasKeyword(cv, k)),
    missing: inJd.filter((k) => !hasKeyword(cv, k)),
  };
}
