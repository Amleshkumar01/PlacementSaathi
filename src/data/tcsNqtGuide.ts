// Content for the /tcs-nqt-preparation guide page.
// Rules: no exam dates, cut-offs, salary figures or selection guarantees.
// The exam pattern is described in general terms only; TCS changes details between seasons.

import type { FaqItem } from "./faq";
import type { DsaPattern } from "./dsa";

export const nqtIntro = {
  what:
    "TCS NQT (National Qualifier Test) is the online test TCS uses to hire freshers. Instead of a separate test for every role, one NQT attempt is used to decide which interview track you are considered for.",
  who: [
    "Final-year BTech, BE, MCA and MSc students preparing for campus or off-campus hiring",
    "Recent graduates who want an entry-level software role at a large IT services company",
    "Pre-final year students who want to start early and know what the test looks like",
  ],
  why:
    "Because the same test feeds several roles, a good NQT attempt matters more than almost anything else in the TCS process. The aptitude part decides whether you move forward, and the coding part often decides which role you are considered for.",
};

export interface NqtSection {
  id: string;
  name: string;
  summary: string;
  topics: string[];
}

/** General pattern only. Exact question counts and timings change, so they are not listed. */
export const nqtSections: NqtSection[] = [
  {
    id: "aptitude",
    name: "Aptitude (Numerical and Verbal Ability)",
    summary:
      "Tests how quickly and accurately you solve maths word problems and read English. This is usually part of the Foundation section that every candidate takes.",
    topics: [
      "Number system, divisibility and remainders",
      "Percentages, profit and loss, discount",
      "Ratio, proportion, averages and mixtures",
      "Time and work, pipes and cisterns",
      "Time, speed and distance (trains, boats)",
      "Simple and compound interest",
      "Permutation, combination and probability basics",
      "Data interpretation (tables, bar and pie charts)",
      "Reading comprehension and sentence completion",
      "Error spotting, synonyms and antonyms",
    ],
  },
  {
    id: "reasoning",
    name: "Reasoning Ability",
    summary:
      "Checks logical thinking under time pressure. Questions are short but tricky, so a fixed method for each topic saves a lot of time.",
    topics: [
      "Number and letter series",
      "Coding-decoding",
      "Blood relations",
      "Seating arrangement and puzzles",
      "Direction sense",
      "Syllogisms and statement-conclusion",
      "Data sufficiency",
      "Visual and figure-based reasoning",
    ],
  },
  {
    id: "coding",
    name: "Coding (Advanced Section)",
    summary:
      "You write and run programs in an online editor. Problems are usually easy to medium, but your code must pass hidden test cases, so input handling and edge cases matter.",
    topics: [
      "Input/output handling in your chosen language",
      "Arrays: traversal, prefix sums, max/min, rotation",
      "Strings: reverse, palindrome, frequency counts, anagrams",
      "Basic maths: primes, GCD/LCM, digit problems",
      "Searching and sorting, binary search",
      "Two pointers and hashing basics",
      "Simple recursion and patterns",
      "Time complexity basics (avoid brute force where it will time out)",
    ],
  },
];

export interface PlanPhase {
  id: string;
  days: string;
  title: string;
  goal: string;
  daily: { label: string; task: string }[];
  milestone: string;
}

export const nqtPlan: PlanPhase[] = [
  {
    id: "days-1-10",
    days: "Days 1-10",
    title: "Basics",
    goal: "Build the foundation: one coding language, core aptitude formulas and the method for each reasoning topic.",
    daily: [
      { label: "Coding (60 min)", task: "Language basics: loops, functions, arrays and strings. Solve 2 easy problems every day." },
      { label: "Aptitude (40 min)", task: "One topic per day: learn the formula, then do 15-20 untimed questions." },
      { label: "Reasoning (20 min)", task: "Series, coding-decoding and blood relations. Learn one method per topic." },
      { label: "Verbal (15 min)", task: "Read one short English article and note 5 new words." },
    ],
    milestone: "By Day 10 you can solve easy array and string problems on your own and know the main formulas.",
  },
  {
    id: "days-11-20",
    days: "Days 11-20",
    title: "Practice",
    goal: "Turn knowledge into speed: timed practice and medium-level coding.",
    daily: [
      { label: "Coding (60 min)", task: "1 medium + 1 easy problem. Focus on two pointers, hashing and binary search." },
      { label: "Aptitude (40 min)", task: "20 timed questions, about 1 minute each. Mix topics instead of one per day." },
      { label: "Reasoning (25 min)", task: "1 puzzle or seating set + 10 mixed questions, timed." },
      { label: "Review (15 min)", task: "Write every mistake in a notebook with the correct method." },
    ],
    milestone: "By Day 20 you finish 20 aptitude questions in about 20-25 minutes and pass all test cases on easy coding problems.",
  },
  {
    id: "days-21-30",
    days: "Days 21-30",
    title: "Mock tests and revision",
    goal: "Practise in test conditions, fix weak topics and revise. No new topics in the last few days.",
    daily: [
      { label: "Mock test (alternate days)", task: "One full-length timed mock covering every section, with a separate timer for each section." },
      { label: "Mock review (45 min)", task: "Go through every wrong or skipped question and redo it without help." },
      { label: "Weak topics (45 min)", task: "Pick the 2-3 topics where you lose the most marks and practise only those." },
      { label: "Revision (20 min)", task: "Formula sheet, your mistakes notebook and starred coding problems." },
    ],
    milestone: "By Day 30 you have taken several full mocks and know your section-wise speed and weak spots.",
  },
];

export const nqtDsaFocus: { pattern: DsaPattern; why: string }[] = [
  { pattern: "Arrays", why: "Most NQT coding problems start with an array: sums, max/min, rotation, frequency." },
  { pattern: "Strings", why: "Reversal, palindromes, counting characters and anagrams appear often." },
  { pattern: "Hashing", why: "A HashMap or frequency array turns slow nested loops into one pass." },
  { pattern: "Two Pointers", why: "Useful for sorted arrays, pairs with a target sum and in-place changes." },
  { pattern: "Binary Search", why: "Searching in sorted data, and a quick fix when brute force times out." },
  { pattern: "Linked List", why: "Asked more in the interview than in the test, so know reversal and middle." },
];

export const nqtShortcuts: { topic: string; tip: string }[] = [
  { topic: "Percentages", tip: "Memorise fraction values: 1/8 = 12.5%, 1/6 = 16.66%, 1/3 = 33.33%. Many questions become one-step calculations." },
  { topic: "Successive change", tip: "Two changes of a% and b% give a net change of a + b + ab/100. Use negative values for decreases." },
  { topic: "Time and work", tip: "Take total work as the LCM of the days. Each person's units per day then add up directly." },
  { topic: "Speed conversion", tip: "To convert km/h to m/s, multiply by 5/18. For m/s to km/h, multiply by 18/5." },
  { topic: "Options", tip: "When an equation looks long, try the options. Back-solving is often faster for age and number problems." },
  { topic: "Unit digits", tip: "Powers of 2, 3, 7 and 8 repeat their last digit every 4 steps. Divide the power by 4 and use the remainder." },
];

export const nqtPracticeTips: string[] = [
  "Practise with a timer from Day 11. Untimed practice hides how slow you really are.",
  "Give every question about 1 minute. If it isn't working, mark it and move on.",
  "Practise all sections every day. Each section is timed separately, so one strong section can't cover a weak one.",
  "Keep a mistakes notebook and revise it every weekend.",
  "Learn squares up to 20 and cubes up to 15 to speed up calculations.",
];

export const nqtMistakes: { title: string; detail: string }[] = [
  { title: "Ignoring sectional timing", detail: "Spending too long on one section leaves no time for the next. Practise with a separate timer for each section." },
  { title: "Starting coding too late", detail: "Many students study only aptitude and start coding a week before the test. Coding needs daily practice from Day 1." },
  { title: "Getting the input format wrong", detail: "Code that works on your machine can still fail if it reads input incorrectly. Read the input format line by line." },
  { title: "Not testing edge cases", detail: "Empty input, a single element, negative numbers and very large values often break solutions. Test them before submitting." },
  { title: "Switching languages", detail: "Pick one language and stick with it. Switching weeks before the test wastes time and causes syntax mistakes." },
  { title: "Skipping mock tests", detail: "Solving topic-wise questions is not the same as a full timed test. Take full mocks in the last 10 days." },
  { title: "Trusting unofficial updates", detail: "Exam dates, eligibility and pattern changes should be checked on the official TCS careers site, not on random groups." },
  { title: "Learning new topics at the last minute", detail: "In the final 2-3 days, only revise. A new topic the night before usually adds confusion, not marks." },
];

export const nqtFaqs: FaqItem[] = [
  {
    id: "nqt-what",
    question: "What is TCS NQT?",
    answer:
      "TCS NQT (National Qualifier Test) is an online test that TCS uses to hire freshers. It checks aptitude, reasoning, verbal ability and coding, and your performance is used to decide which interview track you are considered for.",
  },
  {
    id: "nqt-30-days",
    question: "Is 30 days enough to prepare for TCS NQT?",
    answer:
      "30 days is enough to cover the basics and take several mock tests if you study 2-3 focused hours every day. If you are starting from zero in coding, begin coding from Day 1 and consider starting a few weeks earlier using the 90-day roadmap.",
  },
  {
    id: "nqt-language",
    question: "Which programming language should I use for the TCS NQT coding section?",
    answer:
      "Use the language you are most comfortable with. C, C++, Java and Python are common choices. Check the official instructions for the languages allowed in your test, and practise input and output handling in that language.",
  },
  {
    id: "nqt-coding-level",
    question: "How difficult is the TCS NQT coding section?",
    answer:
      "Problems are usually easy to medium and based on arrays, strings, basic maths and searching. The challenge is passing all hidden test cases, so careful input reading, edge cases and efficient code matter more than advanced algorithms.",
  },
  {
    id: "nqt-eligibility",
    question: "Where can I find the exam date, eligibility and latest pattern?",
    answer:
      "Always check the official TCS careers website and the official NQT notification for your season. Dates, eligibility and pattern details can change, so do not rely on social media posts or old PDFs.",
  },
  {
    id: "nqt-guarantee",
    question: "Does clearing TCS NQT or using this guide guarantee a job?",
    answer:
      "No. Clearing the test moves you to the next rounds, and the final decision depends on the interviews and TCS's hiring needs. PlacementSaathi is a free preparation resource and does not guarantee any job or placement.",
  },
];
