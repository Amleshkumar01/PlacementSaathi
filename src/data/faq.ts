// FAQ data. Items with `featured: true` show on the Home page (keep 4).

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  featured?: boolean;
}

export const faqs: FaqItem[] = [
  {
    id: "when-to-start",
    question: "When should I start placement preparation?",
    answer:
      "The ideal time is the start of 3rd year, which gives you 6-9 months before the campus season. If you are already in 4th year, it isn't too late: the 90-Day Roadmap is built for 2-3 hours a day, and a focused plan covers a lot.",
    featured: true,
  },
  {
    id: "language",
    question: "Which language is best for DSA: C++, Java or Python?",
    answer:
      "The one you know best. C++ and Java are the most common in placements and interviewers are comfortable with them. Python works too. What matters is mastering one language. Switching languages midway wastes time.",
    featured: true,
  },
  {
    id: "guarantee",
    question: "Does PlacementSaathi guarantee a placement or job?",
    answer:
      "No. PlacementSaathi is only a preparation platform. Selection depends on your effort, the company's process and that season's hiring. Be careful of any website that claims a job guarantee.",
    featured: true,
  },
  {
    id: "hours",
    question: "How many hours a day should I study?",
    answer:
      "Alongside college, 2-3 focused hours a day is enough if you are consistent. Two or three quality hours every day beat one 14-hour day per week. The Study Plan Calculator on the home page splits your hours across DSA, Aptitude, Core CS and Interview prep.",
    featured: true,
  },
  {
    id: "service-dsa",
    question: "How much DSA do I need for service companies like TCS, Infosys and Wipro?",
    answer:
      "Coding at service companies is usually easy to medium: Arrays, Strings, Hashing, basic Linked Lists and Binary Search. Higher roles (TCS Digital/Prime, Infosys SP/DSE) need medium DSA and some DP/Graphs. Product companies like Amazon go to medium-hard Trees, Graphs and DP.",
  },
  {
    id: "eligibility",
    question: "What are the usual eligibility criteria (CGPA and backlogs)?",
    answer:
      "Many companies ask for a minimum percentage or CGPA in 10th, 12th and graduation (often around 60% or 6 CGPA) and no active backlogs. This differs by company and season, so always confirm with the official notification or your college placement cell.",
  },
  {
    id: "non-cse",
    question: "Can IT, ECE or other branch students use this site?",
    answer:
      "Yes. The content is written with BTech CSE in mind, but the aptitude, resume, interview and DSA sections help anyone applying for software roles.",
  },
  {
    id: "speed",
    question: "How do I improve my aptitude speed?",
    answer:
      "Do 20 timed questions a day with a 60-second limit per question. Memorise squares, cubes and fraction percentages, and learn to back-solve from options. Keep a list of wrong answers and redo them once a week.",
  },
  {
    id: "no-projects",
    question: "What if I don't have a strong project for my resume?",
    answer:
      "Build 1-2 small but complete projects that solve a real problem, like an attendance tracker or expense manager. Put them on GitHub with a README and be able to explain the 'why'. A small project you built yourself beats a big copied one.",
  },
  {
    id: "signup",
    question: "Do I need to sign up or pay to use this site?",
    answer:
      "No. There is no login, account or payment on PlacementSaathi. The resume checklist and Study Plan Calculator run in your browser. No data is saved or sent anywhere.",
  },
  {
    id: "package-accuracy",
    question: "How accurate are the package figures on company pages?",
    answer:
      "They are typical fresher ranges seen in past campus seasons, for awareness only. Actual offers vary by season, role and location. The final figure is always confirmed by the company's official offer letter.",
  },
];
