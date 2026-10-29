// Site-wide settings. Change the domain, email or nav links here only.

export const site = {
  name: "PlacementSaathi",
  url: "https://placementsaathi.in",
  tagline: "From Campus to Offer, with your Saathi",
  description:
    "PlacementSaathi (placementsaathi.in) is a free placement preparation website for BTech CSE students in India: DSA practice, aptitude, resume, interview and company-wise guides. It is not a recruitment agency and charges no fees.",
  // Official contact inbox.
  email: "contact@placementsaathi.in",
  locale: "en_IN",
} as const;

export type NavLink = { href: string; label: string };

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/dsa", label: "DSA" },
  { href: "/aptitude", label: "Aptitude" },
  { href: "/resume", label: "Resume" },
  { href: "/mock-interview", label: "Interview" },
  { href: "/companies", label: "Companies" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/faq", label: "FAQ" },
];

export const footerGroups: { title: string; links: NavLink[] }[] = [
  {
    title: "Practice",
    links: [
      { href: "/dsa", label: "DSA Practice Sheet" },
      { href: "/aptitude", label: "Aptitude Practice" },
      { href: "/resume", label: "Resume Checklist" },
      { href: "/mock-interview", label: "Mock Interview" },
    ],
  },
  {
    title: "Plan",
    links: [
      { href: "/roadmap", label: "90-Day Roadmap" },
      { href: "/#study-plan", label: "Study Plan Calculator" },
      { href: "/jobs", label: "Jobs & Internships" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Companies",
    links: [
      { href: "/companies/tcs", label: "TCS NQT" },
      { href: "/companies/infosys", label: "Infosys" },
      { href: "/companies/wipro", label: "Wipro" },
      { href: "/companies/accenture", label: "Accenture" },
      { href: "/companies/capgemini", label: "Capgemini" },
      { href: "/companies/amazon", label: "Amazon" },
    ],
  },
  {
    title: "PlacementSaathi",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
