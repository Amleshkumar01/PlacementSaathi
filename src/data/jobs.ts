// Jobs & Internships guide. PlacementSaathi does not post job listings in v1.
// It points students to official, verifiable sources only.

export interface JobSource {
  name: string;
  url: string;
  kind: "Company careers" | "Internships" | "Job board" | "Government";
  note: string;
}

export const jobSources: JobSource[] = [
  { name: "TCS Careers", url: "https://www.tcs.com/careers", kind: "Company careers", note: "Official TCS openings and NQT registration links." },
  { name: "Infosys Careers", url: "https://www.infosys.com/careers/", kind: "Company careers", note: "Fresher programmes, SE / DSE / SP hiring updates." },
  { name: "Wipro Careers", url: "https://careers.wipro.com/", kind: "Company careers", note: "Elite NTH and other fresher hiring drives." },
  { name: "Accenture Careers (India)", url: "https://www.accenture.com/in-en/careers", kind: "Company careers", note: "ASE and campus / off-campus fresher roles." },
  { name: "Capgemini Careers (India)", url: "https://www.capgemini.com/in-en/careers/", kind: "Company careers", note: "Analyst roles and fresher hiring." },
  { name: "Amazon Jobs", url: "https://www.amazon.jobs/", kind: "Company careers", note: "SDE-1 and SDE intern roles. Filter by 'University'." },
  { name: "Internshala", url: "https://internshala.com/", kind: "Internships", note: "Student internships, many remote and part-time." },
  { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", kind: "Job board", note: "Set job alerts for 'fresher', 'graduate engineer trainee', 'SDE intern'." },
  { name: "National Career Service", url: "https://www.ncs.gov.in/", kind: "Government", note: "Government of India job portal, free to use." },
];

export const offCampusSteps: { title: string; detail: string }[] = [
  { title: "Make a target list", detail: "Pick 10-15 companies that hire freshers for your skills. Bookmark their careers pages." },
  { title: "Set alerts", detail: "Turn on job alerts on official careers sites and LinkedIn for 'fresher' and 'intern' roles." },
  { title: "Tailor your resume", detail: "Match keywords from each job description. Run it through the 10-point checklist first." },
  { title: "Apply early", detail: "Off-campus drives often close quickly. Apply within the first few days of a posting." },
  { title: "Ask for referrals politely", detail: "Message alumni with a short note, your resume and the exact job ID. Never spam." },
  { title: "Track everything", detail: "Keep a simple sheet: company, role, date applied, status, next step." },
];

export const scamSigns: string[] = [
  "They ask you to pay a fee for registration, training, a 'security deposit' or a laptop. Real companies don't charge to hire you.",
  "The offer comes without any test or interview, often on WhatsApp or Telegram.",
  "The email comes from a free address (gmail, yahoo) instead of the company's own domain.",
  "They pressure you to decide within hours, or to share Aadhaar, PAN or bank OTPs early.",
  "The job is not listed on the company's official careers page.",
];
