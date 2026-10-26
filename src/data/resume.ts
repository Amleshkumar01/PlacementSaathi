// Resume Guide data. Edit checklist points, mistakes or section order here.

export interface ChecklistItem {
  id: string;
  point: string;
  why: string;
}

export const atsChecklist: ChecklistItem[] = [
  { id: "one-page", point: "My resume is one page long", why: "Recruiters rarely read a fresher's 2-page resume. Keep your strongest work on one page." },
  { id: "single-column", point: "It uses a single-column, ATS-friendly format", why: "Tables, icons, photos and multi-column layouts confuse ATS software." },
  { id: "links-header", point: "GitHub and LinkedIn are in the header", why: "Recruiters want to verify your profile within 10 seconds." },
  { id: "skills-groups", point: "Skills are listed in 4 groups", why: "Languages / Frameworks / Tools / CS Fundamentals: easy to read and easy to match." },
  { id: "projects-impact", point: "2-3 projects with measurable impact", why: "Don't just say 'built'. Show the result, and make sure it is true." },
  { id: "live-links", point: "Project live / GitHub links work", why: "A broken link or private repo reduces trust. Open every link before you apply." },
  { id: "jd-keywords", point: "Keywords from the job description are included", why: "ATS matches JD words (e.g. Java, SQL, REST API). Only list what you actually know." },
  { id: "proofread", point: "Spelling and grammar are checked", why: "Even one typo questions your attention to detail. Ask a friend to read it too." },
  { id: "file-name", point: "The file is a PDF with a proper name", why: "Use a name like Firstname_Lastname_Resume.pdf. 'resume_final_v3.docx' looks unprofessional." },
  { id: "certifications", point: "Only relevant certifications are listed", why: "Two relevant certificates beat ten random ones. Keep what relates to the role." },
];

/** Message shown for a given score (out of 10). Checked top to bottom. */
export const scoreMessages: { min: number; message: string; tone: "low" | "mid" | "high" }[] = [
  { min: 10, message: "Excellent! All 10 points pass. Now get your resume reviewed by a senior or mentor.", tone: "high" },
  { min: 8, message: "Good resume. Fix the remaining 1-2 points today.", tone: "high" },
  { min: 5, message: "A decent start, but some important things are missing. Check the unticked points.", tone: "mid" },
  { min: 1, message: "Your resume needs work. Start with the one-page and single-column format.", tone: "low" },
  { min: 0, message: "Tick the points that are true for your resume. Your score updates live here.", tone: "low" },
];

export const bulletFormula = {
  parts: ["Action Verb", "What You Built", "Technology Used", "Measurable Result (only if true)"],
  examples: [
    {
      weak: "Made an e-commerce website using Django.",
      strong:
        "Built an e-commerce web app with cart and Razorpay test-mode checkout using Django and PostgreSQL; reduced product page load time from 3.1s to 1.2s by adding query caching.",
    },
    {
      weak: "Worked on a chat app.",
      strong:
        "Developed a real-time chat app supporting group rooms using React, Node.js and Socket.IO; tested with 50 concurrent users from my college coding club.",
    },
  ],
  honesty:
    "Only write numbers you can prove in an interview. The interviewer will ask exactly that: 'How did you measure 1.2s?'",
};

export const commonMistakes: string[] = [
  "Adding a photo, date of birth, father's name and full address. A fresher resume doesn't need them.",
  "A generic objective like 'Seeking a challenging position in a reputed organisation...'.",
  "Listing technologies you have never used. You will be caught in the interview.",
  "Writing only project names, not what you built and what the result was.",
  "Using colourful 2-column templates that ATS software cannot read.",
  "Sending the same resume to every company. Tweak it for each job description.",
  "Hiding or misstating your CGPA. It gets caught during verification.",
  "Using an email like 'cooldude123@...'. Create a simple one with your name.",
];

export const sectionOrder: { name: string; detail: string }[] = [
  { name: "Header", detail: "Name, phone, professional email, LinkedIn, GitHub. No photo or full address." },
  { name: "Summary (optional)", detail: "2 lines: branch, strongest skill and one real achievement." },
  { name: "Education", detail: "Degree, college, CGPA, passing year. 12th/10th marks if the company asks." },
  { name: "Skills", detail: "4 groups: Languages, Frameworks/Libraries, Tools, CS Fundamentals (DSA, OOPs, DBMS, OS, CN)." },
  { name: "Projects", detail: "2-3 projects with 2-3 bullets each, using the bullet formula, plus GitHub/live links." },
  { name: "Experience / Internships", detail: "If you have any. You can place this above Projects." },
  { name: "Achievements and Certifications", detail: "Coding contest ranks, hackathons, relevant certifications. Only verifiable items." },
];
