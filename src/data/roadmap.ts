// 90-Day Roadmap data. Built for 2-3 hours per day alongside college.

export interface RoadmapWeek {
  label: string;
  dsa: string;
  aptitude: string;
  coreCS: string;
  other?: string;
}

export interface RoadmapPhase {
  id: string;
  days: string;
  name: string;
  summary: string;
  goal: string;
  weeks: RoadmapWeek[];
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "phase-1",
    days: "Day 1-30",
    name: "Foundation",
    summary: "DSA basics and patterns, aptitude foundations, and the start of core CS revision.",
    goal: "Fluency in one language, solving easy Arrays/Strings/Hashing problems on your own, and knowing the formulas for high-weightage aptitude topics.",
    weeks: [
      { label: "Week 1 (Day 1-7)", dsa: "Pick one language (C++, Java or Python). Loops, functions, arrays and string basics. 2 easy problems a day.", aptitude: "Number System, Percentages: 20 questions a day.", coreCS: "The 4 pillars of OOPs, class vs object." },
      { label: "Week 2 (Day 8-14)", dsa: "Arrays pattern: Two Sum, Best Time to Buy and Sell Stock, Kadane's. 3 problems a day.", aptitude: "Ratio, Profit and Loss.", coreCS: "OOPs: overloading, overriding, abstract class vs interface." },
      { label: "Week 3 (Day 15-21)", dsa: "Strings and Hashing: Valid Anagram, Contains Duplicate, Group Anagrams.", aptitude: "Time and Work, Averages. Logical: Series, Coding-Decoding.", coreCS: "DBMS basics: keys, normalisation. SQL SELECT, WHERE, GROUP BY." },
      { label: "Week 4 (Day 22-30)", dsa: "Binary Search basics + revision of starred problems.", aptitude: "Time Speed Distance, SI/CI. One mini timed test at the weekend.", coreCS: "SQL JOINs, ACID.", other: "First resume draft ready (use the Resume Checklist)." },
    ],
  },
  {
    id: "phase-2",
    days: "Day 31-60",
    name: "Pattern Mastery",
    summary: "Medium DSA, timed aptitude practice, resume building and practising project explanations.",
    goal: "Medium problems in 30-40 minutes, 2 full aptitude mocks a week, and an interview-ready resume and GitHub.",
    weeks: [
      { label: "Week 5 (Day 31-37)", dsa: "Two Pointers: Move Zeroes, Container With Most Water, 3Sum.", aptitude: "Full timed mocks #1 and #2. Make a weak-topics list.", coreCS: "OS: process vs thread, scheduling." },
      { label: "Week 6 (Day 38-44)", dsa: "Sliding Window + Stack: Longest Substring, Valid Parentheses, Daily Temperatures.", aptitude: "One puzzle and seating set a day. 2 mocks.", coreCS: "OS: deadlock, paging, virtual memory.", other: "Clean up projects on GitHub with a README." },
      { label: "Week 7 (Day 45-51)", dsa: "Linked List: reverse, cycle, merge, middle.", aptitude: "Previous-pattern sets of target companies. 2 mocks.", coreCS: "CN: OSI, TCP vs UDP, DNS.", other: "Final resume: 8+ on the 10-point checklist." },
      { label: "Week 8 (Day 52-60)", dsa: "Start Trees: depth, invert, level order.", aptitude: "Extra time on verbal: RC and sentence correction. 2 mocks.", coreCS: "Revision: OOPs + DBMS viva questions.", other: "Practise explaining each project in a 2-minute structure, out loud." },
    ],
  },
  {
    id: "phase-3",
    days: "Day 61-90",
    name: "Interview Ready",
    summary: "Company-wise preparation, mock interviews, revision and fixing weak topics.",
    goal: "Know your target company's pattern, do 2 mock interviews a week, and fully revise all starred problems.",
    weeks: [
      { label: "Week 9 (Day 61-67)", dsa: "Graphs: Flood Fill, Number of Islands, Rotting Oranges.", aptitude: "Company-wise sets (TCS NQT, Infosys, Wipro, Accenture, Capgemini).", coreCS: "Top OS + CN viva questions.", other: "Mock interviews #1 and #2 (with a friend or senior)." },
      { label: "Week 10 (Day 68-74)", dsa: "Basic DP: Climbing Stairs, House Robber, Coin Change.", aptitude: "Weak topics only, from your mock mistakes list.", coreCS: "Write DBMS SQL queries by hand.", other: "Record and improve HR answers." },
      { label: "Week 11 (Day 75-81)", dsa: "Mixed medium problems, timed (35 min each).", aptitude: "One full mock every other day.", coreCS: "Revise 1-page notes for all 4 subjects.", other: "Mock interviews #3 and #4." },
      { label: "Week 12-13 (Day 82-90)", dsa: "Revise only starred problems. Don't open new patterns.", aptitude: "Light practice to keep your speed.", coreCS: "Quick revision.", other: "Before each test, read only that company's page. Keep documents ready." },
    ],
  },
];

export const dailyRoutine: { time: string; task: string }[] = [
  { time: "0:00 - 1:00", task: "DSA: 1 new problem + revise 1 starred problem" },
  { time: "1:00 - 1:30", task: "Aptitude: 20 timed questions (quant + logical mix)" },
  { time: "1:30 - 2:00", task: "Core CS: 1 topic (OOPs / DBMS / OS / CN) + 5 viva questions" },
  { time: "2:00 - 2:20", task: "Interview: record yourself answering 1 HR or project question" },
  { time: "2:20 - 2:30", task: "Log it: what you did today, what you starred, what's next" },
];

export const goldenRules: string[] = [
  "Don't open a new topic the night before a test. Only revise.",
  "In an online test, clear all the easy questions first, then the hard ones.",
  "Within 10 minutes of every interview, write down what was asked.",
  "Keep printed resumes, marksheets and ID ready in advance.",
  "Treat a rejection as data, not defeat. Write down what went wrong and fix it.",
];
