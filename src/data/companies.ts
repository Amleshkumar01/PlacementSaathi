// Company-wise preparation data.
// To add a company: add its tag to `CompanyTag`, then copy one object in
// `companies` and give it a new lowercase `slug` (used in the URL /companies/<slug>).
// Package ranges must stay approximate and labelled as such.

import type { DsaPattern } from "./dsa";

export type CompanyTag = "TCS" | "Infosys" | "Wipro" | "Accenture" | "Capgemini" | "Amazon";

export const companyTags: CompanyTag[] = ["TCS", "Infosys", "Wipro", "Accenture", "Capgemini", "Amazon"];

export type CompanyType = "Service-Based" | "Product-Based";

export interface Company {
  slug: string;
  tag: CompanyTag;
  name: string;
  /** Short line shown on cards */
  cardLine: string;
  type: CompanyType;
  /** Brand-ish colour for the monogram tile (not a logo) */
  color: string;
  /** Official careers page */
  careersUrl: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  roles: { name: string; note: string }[];
  rounds: { name: string; detail: string }[];
  focus: {
    dsaPatterns: DsaPattern[];
    aptitude: string[];
    coreCS: string[];
  };
  tips: string[];
  /** Approximate fresher CTC seen in past campus seasons. Awareness only. */
  packages: { role: string; range: string }[];
}

export const companies: Company[] = [
  {
    slug: "tcs",
    tag: "TCS",
    name: "TCS (TCS NQT)",
    cardLine: "One NQT score decides Ninja, Digital or Prime. Aptitude speed matters most.",
    type: "Service-Based",
    color: "#1d4fd8",
    careersUrl: "https://www.tcs.com/careers",
    seoTitle: "TCS NQT Preparation 2026: Pattern, Rounds and Tips",
    seoDescription:
      "TCS NQT preparation guide for freshers: test pattern, Ninja, Digital and Prime roles, round-wise tips, DSA patterns and aptitude topics that actually appear.",
    intro:
      "TCS hires most freshers through the TCS NQT (National Qualifier Test). Your NQT score decides whether you are considered for a Ninja, Digital or Prime interview, so aptitude speed and the two coding questions matter most.",
    roles: [
      { name: "Ninja", note: "Entry-level role. A good Foundation section score is enough." },
      { name: "Digital", note: "Needs a strong Advanced section and coding. The interview is more technical." },
      { name: "Prime", note: "The highest band. Needs strong coding and advanced aptitude." },
    ],
    rounds: [
      { name: "NQT Part A: Foundation", detail: "Numerical Ability, Verbal Ability and Reasoning Ability. Each section is timed separately, so sectional speed is essential." },
      { name: "NQT Part B: Advanced", detail: "Advanced quant and reasoning plus a coding section (usually 2 problems: one easy, one medium). This part decides Digital/Prime." },
      { name: "Technical Interview", detail: "Basics of one language, OOPs, DBMS/SQL, your resume projects and sometimes a short coding question." },
      { name: "Managerial + HR", detail: "Situational questions, relocation, shifts, documents and 'Tell me about yourself'. TR, MR and HR often happen in one sitting." },
    ],
    focus: {
      dsaPatterns: ["Arrays", "Strings", "Two Pointers", "Linked List", "Binary Search"],
      aptitude: ["Number System", "Percentages", "Time and Work", "Time, Speed and Distance", "Series", "Reading Comprehension"],
      coreCS: ["The 4 pillars of OOPs", "DBMS basics and SQL queries", "Fundamentals of one language (C/C++/Java/Python)"],
    },
    tips: [
      "Every section has its own timer. If you get stuck in one, you cannot borrow time from another, so practise all three sections daily.",
      "In coding, finish the easy problem first and pass all test cases before moving to the medium one.",
      "Read the input/output format carefully. Many students fail test cases only because they read input wrongly.",
      "Know the basics of your chosen language well (pointers, strings, OOPs) for the interview.",
      "Check the official TCS NQT notification every season. The pattern changes in small ways.",
    ],
    packages: [
      { role: "Ninja", range: "about 3.4 - 3.6 LPA" },
      { role: "Digital", range: "about 7 LPA" },
      { role: "Prime", range: "about 9 - 11.5 LPA" },
    ],
  },
  {
    slug: "infosys",
    tag: "Infosys",
    name: "Infosys",
    cardLine: "From System Engineer to Specialist Programmer. Pseudocode and puzzles are key.",
    type: "Service-Based",
    color: "#0e7490",
    careersUrl: "https://www.infosys.com/careers/",
    seoTitle: "Infosys Placement Preparation: Test Pattern and Tips",
    seoDescription:
      "Infosys placement preparation for freshers: SE, DSE and Specialist Programmer roles, online test pattern, pseudocode, puzzles, DBMS and interview tips.",
    intro:
      "The Infosys online test mixes reasoning, maths, verbal ability and pseudocode. Higher roles (DSE, Specialist Programmer) have a separate coding test where the DSA level goes up.",
    roles: [
      { name: "System Engineer (SE)", note: "The most common fresher role." },
      { name: "Digital Specialist Engineer (DSE)", note: "Offered on a good coding round." },
      { name: "Specialist Programmer (SP)", note: "Strong DSA: medium to hard coding." },
    ],
    rounds: [
      { name: "Online Test", detail: "Logical reasoning, mathematical ability, verbal ability, pseudocode and puzzle-type questions. There may be negative marking, so read the instructions." },
      { name: "Coding Test (DSE / SP)", detail: "Usually 3 coding problems from easy to hard. Arrays, strings, greedy, DP and graphs can appear." },
      { name: "Technical + HR Interview", detail: "Projects, OOPs, DBMS/SQL, one language and HR basics. Often combined into a single interview." },
    ],
    focus: {
      dsaPatterns: ["Arrays", "Strings", "Hashing", "Dynamic Programming", "Graphs"],
      aptitude: ["Pseudocode output", "Puzzles", "Seating Arrangement", "Data Sufficiency", "Reading Comprehension", "Probability"],
      coreCS: ["DBMS and SQL MCQs", "OOPs", "Basic OS concepts"],
    },
    tips: [
      "Solve pseudocode questions by dry-running them. Write each loop step's values on paper.",
      "Do 2-3 puzzle and seating sets daily. These take the most time in the test.",
      "Practise basic SQL queries by hand (JOIN, GROUP BY, second highest salary).",
      "If you are targeting SP, solve medium DP and graph problems.",
    ],
    packages: [
      { role: "System Engineer", range: "about 3.6 LPA" },
      { role: "Digital Specialist Engineer", range: "about 6.25 LPA" },
      { role: "Specialist Programmer", range: "about 9.5 LPA (higher at upper levels)" },
    ],
  },
  {
    slug: "wipro",
    tag: "Wipro",
    name: "Wipro (Elite NTH)",
    cardLine: "Elite National Talent Hunt: aptitude, essay and coding. Don't ignore the essay.",
    type: "Service-Based",
    color: "#7c3aed",
    careersUrl: "https://careers.wipro.com/",
    seoTitle: "Wipro Elite NTH Preparation: Pattern, Essay, Coding",
    seoDescription:
      "Wipro Elite NTH preparation guide: online assessment pattern, essay writing tips, two coding questions and technical and HR interview advice for freshers.",
    intro:
      "Wipro hires most freshers through the Elite National Talent Hunt (NTH). Along with aptitude there is a written essay and a coding section. Many students ignore the essay, and that mistake costs them.",
    roles: [
      { name: "Project Engineer (Elite)", note: "The standard fresher role." },
      { name: "Turbo / higher band", note: "Some seasons have a separate track for strong performers." },
    ],
    rounds: [
      { name: "Online Assessment", detail: "Aptitude (logical, quant, verbal), written communication (essay) and coding (usually 2 problems)." },
      { name: "Technical Interview", detail: "Projects, one language, OOPs, DBMS and basic coding logic." },
      { name: "HR Interview", detail: "Relocation, shifts, service agreement and career goals." },
    ],
    focus: {
      dsaPatterns: ["Arrays", "Strings", "Two Pointers", "Sliding Window", "Binary Search"],
      aptitude: ["Percentages", "Profit and Loss", "Time and Work", "Coding-Decoding", "Sentence Correction", "Essay Writing"],
      coreCS: ["OOPs", "DBMS basics", "One coding language, well"],
    },
    tips: [
      "Use a 3-part essay structure: introduction, 2 points with examples, conclusion. Keep grammar simple and clean.",
      "Practise writing one short essay (200-250 words) in 15 minutes every day.",
      "Stick to one coding language. String and array manipulation appear most.",
      "Read service agreement details in the official offer document, not from a senior's memory.",
    ],
    packages: [
      { role: "Project Engineer (Elite)", range: "about 3.5 LPA" },
      { role: "Turbo / higher band", range: "about 6.5 LPA" },
    ],
  },
  {
    slug: "accenture",
    tag: "Accenture",
    name: "Accenture",
    cardLine: "Cognitive + technical test, coding and a separate spoken English test.",
    type: "Service-Based",
    color: "#9333ea",
    careersUrl: "https://www.accenture.com/in-en/careers",
    seoTitle: "Accenture Placement Preparation: Rounds and Tips 2026",
    seoDescription:
      "Accenture placement preparation for freshers: cognitive and technical assessment, coding round, communication test, interview tips and ASE role details.",
    intro:
      "Accenture's process differs from other service companies: there is a separate Communication Assessment that checks your spoken English. The cognitive section also includes abstract reasoning, which students rarely practise.",
    roles: [
      { name: "Associate Software Engineer (ASE)", note: "The most common fresher role." },
      { name: "Advanced ASE / higher band", note: "Offered on strong coding performance." },
    ],
    rounds: [
      { name: "Cognitive and Technical Assessment", detail: "English ability, critical reasoning, abstract reasoning and technical MCQs (pseudocode, networking basics, cloud, MS Office)." },
      { name: "Coding Assessment", detail: "Usually 2 coding problems on arrays, strings and basic logic." },
      { name: "Communication Assessment", detail: "A spoken English test: repeating sentences, reading aloud and answering short questions. Fluency and clarity are checked." },
      { name: "Interview", detail: "A technical + HR mix. Questions on projects, basics and behaviour." },
    ],
    focus: {
      dsaPatterns: ["Arrays", "Strings", "Hashing", "Stack"],
      aptitude: ["Abstract Reasoning", "Critical Reasoning", "Reading Comprehension", "Sentence Correction", "Percentages"],
      coreCS: ["Networking basics", "Cloud fundamentals", "OOPs", "DBMS basics"],
    },
    tips: [
      "Do 10 abstract (figure-based) reasoning questions daily. Pattern spotting only comes with practice.",
      "For the communication test, record yourself speaking English for 5 minutes a day and listen back.",
      "For technical MCQs, remember basic networking and cloud terms (IP, DNS, IaaS/PaaS/SaaS).",
      "In coding, always check edge cases such as empty input and a single element.",
    ],
    packages: [
      { role: "Associate Software Engineer", range: "about 4.5 LPA" },
      { role: "Advanced ASE / higher band", range: "about 6.5 LPA" },
    ],
  },
  {
    slug: "capgemini",
    tag: "Capgemini",
    name: "Capgemini",
    cardLine: "Game-based aptitude, technical MCQs and English. Play the game demos first.",
    type: "Service-Based",
    color: "#0284c7",
    careersUrl: "https://www.capgemini.com/in-en/careers/",
    seoTitle: "Capgemini Placement Preparation: Game-Based Aptitude",
    seoDescription:
      "Capgemini placement preparation guide: game-based aptitude, pseudocode and technical MCQs, English communication test and practical interview tips.",
    intro:
      "Capgemini's process includes a game-based aptitude round that feels confusing the first time. The best tip is to play demo versions of such games beforehand. The other rounds cover pseudocode, English and core CS MCQs.",
    roles: [
      { name: "Analyst", note: "The standard fresher role." },
      { name: "Senior Analyst / higher band", note: "A separate track for strong performance." },
    ],
    rounds: [
      { name: "Technical / Pseudocode MCQ", detail: "Pseudocode output, C/OOPs basics, DBMS, OS and networking MCQs." },
      { name: "English Communication", detail: "A test of grammar, reading comprehension and vocabulary." },
      { name: "Game-Based Aptitude", detail: "Memory, pattern, logic and number games. Accuracy counts along with speed." },
      { name: "Technical + HR Interview", detail: "Projects, basics and behaviour, with attention to communication clarity." },
    ],
    focus: {
      dsaPatterns: ["Arrays", "Strings", "Linked List", "Binary Search"],
      aptitude: ["Game-based logic", "Series", "Number System", "Reading Comprehension", "Synonyms and Antonyms"],
      coreCS: ["Pseudocode", "OOPs", "DBMS", "OS basics", "CN basics"],
    },
    tips: [
      "Free demos of game-based rounds are available online. Play them at least 2-3 times before the test.",
      "Learn to dry-run loops and recursion for pseudocode questions.",
      "Make one-page short notes on OOPs, DBMS, OS and CN for core CS MCQs.",
      "In the interview, be ready to explain the 'why' of your project: why this tech, why this design.",
    ],
    packages: [
      { role: "Analyst", range: "about 4 - 4.25 LPA" },
      { role: "Senior Analyst / higher band", range: "about 7.5 LPA" },
    ],
  },
  {
    slug: "amazon",
    tag: "Amazon",
    name: "Amazon (Product Company)",
    cardLine: "2 DSA problems in the online assessment, then 2-3 technical rounds and a Bar Raiser.",
    type: "Product-Based",
    color: "#ea580c",
    careersUrl: "https://www.amazon.jobs/",
    seoTitle: "Amazon SDE Fresher Interview Prep: DSA, OA and Rounds",
    seoDescription:
      "Amazon SDE fresher preparation: online assessment, DSA patterns (Trees, Graphs, DP), technical rounds, Bar Raiser and STAR answers for Leadership Principles.",
    intro:
      "Product companies like Amazon expect a much higher DSA level than service companies. Medium-hard problems on Trees, Graphs and DP are common, and every round includes behavioural questions on the Leadership Principles.",
    roles: [
      { name: "SDE-1 (Software Development Engineer)", note: "Fresher / new grad role." },
      { name: "SDE Intern", note: "For pre-final year students. Strong performance can lead to a PPO." },
    ],
    rounds: [
      { name: "Online Assessment (OA)", detail: "Usually 2 medium DSA problems and a work-style / behavioural survey." },
      { name: "Technical Rounds (2-3)", detail: "1-2 DSA problems per round. Explaining your approach, stating complexity and writing clean code all matter." },
      { name: "Bar Raiser", detail: "A senior interviewer who checks the overall bar, with deep questions on DSA and Leadership Principles." },
    ],
    focus: {
      dsaPatterns: ["Trees", "Graphs", "Dynamic Programming", "Sliding Window", "Hashing", "Binary Search"],
      aptitude: ["Usually no separate aptitude round", "Logical thinking is tested through DSA"],
      coreCS: ["OOPs design basics", "DBMS", "OS (process, thread, deadlock)", "Basic system design concepts"],
    },
    tips: [
      "For every problem, state the brute force first, then optimise. The interviewer wants to see how you think.",
      "Read Amazon's Leadership Principles and prepare a STAR story (Situation, Task, Action, Result) for each.",
      "After writing code, dry-run it yourself and call out edge cases.",
      "Aim to solve medium problems in 30-35 minutes.",
      "Before applying via referral or off-campus, make sure every number on your resume is true and verifiable.",
    ],
    packages: [
      { role: "SDE-1 (fresher)", range: "about 18 - 30+ LPA total compensation (base + bonus + stock; varies a lot by location and year)" },
    ],
  },
];

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export const packageNote = "This is an approximate range for preparation awareness only. It is not a guarantee.";
