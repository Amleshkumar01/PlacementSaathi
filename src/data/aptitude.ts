// Aptitude practice data.
// To add a solved question: add an object to `solved` of the right section.
// To add a topic: add an object to `topics` with weightage High / Medium / Low.

export type Weightage = "High" | "Medium" | "Low";

export interface AptitudeTopic {
  name: string;
  weightage: Weightage;
  /** Shortcut, formula or method note */
  shortcut: string;
}

export interface SolvedQuestion {
  id: string;
  topic: string;
  question: string;
  options?: string[];
  steps: string[];
  answer: string;
}

export interface AptitudeSection {
  id: "quant" | "logical" | "verbal";
  label: string;
  title: string;
  intro: string;
  topics: AptitudeTopic[];
  methodNotes: string[];
  solved: SolvedQuestion[];
}

export const aptitudeSections: AptitudeSection[] = [
  {
    id: "quant",
    label: "Quantitative",
    title: "Quantitative Aptitude",
    intro:
      "In quant, shortcuts and speed matter more than formulas. Master the high-weightage topics first: they repeat in every test, only the numbers change.",
    topics: [
      { name: "Percentages", weightage: "High", shortcut: "Successive change: a + b + (ab/100). Memorise fractions: 12.5% = 1/8, 16.66% = 1/6." },
      { name: "Profit and Loss", weightage: "High", shortcut: "SP = CP x (100 + P%)/100. Mark-up m% with discount d% gives net = m - d - (md/100)." },
      { name: "Time and Work", weightage: "High", shortcut: "LCM method: total work = LCM of the days, then find units per day." },
      { name: "Time, Speed and Distance (Trains, Boats)", weightage: "High", shortcut: "km/h to m/s: multiply by 5/18. A train crossing a platform covers train + platform length." },
      { name: "Number System", weightage: "High", shortcut: "Divisibility rules, unit-digit cycles (2, 3, 7, 8 repeat every 4), remainder theorem." },
      { name: "Ratio and Proportion", weightage: "Medium", shortcut: "Join ratios through the common term. a:b = 2:3 and b:c = 4:5 gives a:b:c = 8:12:15." },
      { name: "Simple and Compound Interest", weightage: "Medium", shortcut: "2-year CI - SI = P(r/100)². For 3 years: P(r/100)² x (300 + r)/100." },
      { name: "Averages", weightage: "Medium", shortcut: "Deviation method: assume an average and add the plus/minus deviations." },
      { name: "Permutation and Combination", weightage: "Medium", shortcut: "Order matters: nPr. Order doesn't matter: nCr. Circular arrangement = (n - 1)!." },
      { name: "Probability", weightage: "Medium", shortcut: "P = favourable / total. 'At least one' = 1 - P(none)." },
      { name: "Mixtures and Alligation", weightage: "Low", shortcut: "Alligation cross: (dearer - mean) : (mean - cheaper)." },
      { name: "LCM and HCF", weightage: "Low", shortcut: "For two numbers: LCM x HCF = a x b." },
      { name: "Problems on Ages", weightage: "Low", shortcut: "Let the present age be x and form an equation. Back-solving from options is often faster." },
    ],
    methodNotes: [
      "Spend at most 60 seconds per question. If it isn't working, mark it and move on.",
      "Back-solve from the options. It is often faster than forming an equation.",
      "Memorise squares up to 20, cubes up to 15 and percentage values of 1/2 to 1/20.",
      "Do 20 timed questions daily: 10 from high-weightage topics and 10 mixed.",
    ],
    solved: [
      {
        id: "q-percent",
        topic: "Percentages",
        question: "A price is first increased by 20% and then decreased by 20%. What is the net change?",
        options: ["0%", "4% increase", "4% decrease", "2% decrease"],
        steps: [
          "Successive change formula: a + b + (ab/100).",
          "Here a = +20 and b = -20.",
          "Net = 20 - 20 + (20 x -20)/100 = 0 - 4 = -4%.",
          "The minus sign means a decrease.",
        ],
        answer: "4% decrease",
      },
      {
        id: "q-work",
        topic: "Time and Work",
        question: "A can finish a job in 12 days and B can finish it in 18 days. How long will they take working together?",
        options: ["6 days", "7.2 days", "8 days", "15 days"],
        steps: [
          "Total work = LCM(12, 18) = 36 units.",
          "A does 36/12 = 3 units per day. B does 36/18 = 2 units per day.",
          "Together they do 3 + 2 = 5 units per day.",
          "Time = 36 / 5 = 7.2 days.",
        ],
        answer: "7.2 days",
      },
      {
        id: "q-train",
        topic: "Time, Speed and Distance",
        question: "A 150 m long train runs at 54 km/h. How many seconds will it take to cross a 300 m platform?",
        options: ["20 s", "25 s", "30 s", "36 s"],
        steps: [
          "Convert speed to m/s: 54 x 5/18 = 15 m/s.",
          "Distance to cross the platform = train + platform = 150 + 300 = 450 m.",
          "Time = distance / speed = 450 / 15 = 30 seconds.",
        ],
        answer: "30 seconds",
      },
      {
        id: "q-profit",
        topic: "Profit and Loss",
        question: "A shopkeeper marks goods 25% above cost price and gives a 10% discount. What is the profit percentage?",
        options: ["10%", "12.5%", "15%", "35%"],
        steps: [
          "Let CP = 100. Marked price = 125.",
          "After a 10% discount, SP = 125 x 0.9 = 112.5.",
          "Profit = 112.5 - 100 = 12.5, i.e. 12.5%.",
          "Shortcut: 25 - 10 - (25 x 10)/100 = 12.5%.",
        ],
        answer: "12.5%",
      },
      {
        id: "q-ci",
        topic: "Simple and Compound Interest",
        question: "What is the difference between compound interest and simple interest on Rs 10,000 at 10% per year for 2 years?",
        options: ["Rs 50", "Rs 100", "Rs 200", "Rs 210"],
        steps: [
          "Shortcut for 2 years: CI - SI = P x (r/100)².",
          "= 10,000 x (10/100)² = 10,000 x 0.01.",
          "= Rs 100.",
        ],
        answer: "Rs 100",
      },
    ],
  },
  {
    id: "logical",
    label: "Logical Reasoning",
    title: "Logical Reasoning",
    intro:
      "Logical reasoning is more about method than formulas. Learn one fixed approach per topic: draw a diagram, make a table or write the pattern. Puzzles and seating take the most time, so practise them daily.",
    topics: [
      { name: "Number and Letter Series", weightage: "High", shortcut: "Check differences first, then differences of differences, then multiplication/square patterns." },
      { name: "Coding-Decoding", weightage: "High", shortcut: "Write letter positions (A=1 ... Z=26). Remember EJOTY: E=5, J=10, O=15, T=20, Y=25." },
      { name: "Seating Arrangement", weightage: "High", shortcut: "Fill in fixed information first (ends, middle), then relative clues." },
      { name: "Puzzles", weightage: "High", shortcut: "Make a table: people in rows, attributes in columns. Cross out using negative clues." },
      { name: "Blood Relations", weightage: "Medium", shortcut: "Draw a family tree: male = square, female = circle, generations up and down." },
      { name: "Direction Sense", weightage: "Medium", shortcut: "Sketch every move. A right turn is a 90° clockwise turn." },
      { name: "Syllogism", weightage: "Medium", shortcut: "Draw Venn diagrams and check all possible cases for 'Some' and 'All'." },
      { name: "Abstract / Visual Reasoning", weightage: "Medium", shortcut: "Check one property at a time: shape, count, rotation and shading." },
      { name: "Data Sufficiency", weightage: "Low", shortcut: "You don't need the answer. Only check whether the statements are enough." },
      { name: "Statement and Assumptions", weightage: "Low", shortcut: "An assumption is what the statement takes for granted without saying it." },
    ],
    methodNotes: [
      "Draw a diagram or table for every reasoning question. Solving in your head causes mistakes.",
      "If a puzzle set looks long, skip it and come back. Clear the short questions first.",
      "Do at least 1 puzzle set and 10 series/coding questions every day.",
    ],
    solved: [
      {
        id: "l-series",
        topic: "Number Series",
        question: "Find the next number: 2, 6, 12, 20, 30, ?",
        options: ["40", "42", "44", "46"],
        steps: [
          "Differences: 4, 6, 8, 10. They increase by 2 each time.",
          "The next difference is 12, so 30 + 12 = 42.",
          "Another way: the pattern is n x (n + 1): 1x2, 2x3, 3x4, 4x5, 5x6, 6x7 = 42.",
        ],
        answer: "42",
      },
      {
        id: "l-blood",
        topic: "Blood Relations",
        question: "Pointing to a photo, Rahul says: 'She is the daughter of my grandfather's only son.' How is the girl related to Rahul?",
        options: ["Cousin", "Sister", "Aunt", "Daughter"],
        steps: [
          "Grandfather's only son = Rahul's father.",
          "Father's daughter = Rahul's sister.",
        ],
        answer: "Sister",
      },
      {
        id: "l-coding",
        topic: "Coding-Decoding",
        question: "If CAT is written as DBU, how is DOG written?",
        options: ["EPH", "EPG", "CNF", "FQI"],
        steps: [
          "C -> D, A -> B, T -> U: each letter shifts by +1.",
          "D + 1 = E, O + 1 = P, G + 1 = H.",
        ],
        answer: "EPH",
      },
      {
        id: "l-direction",
        topic: "Direction Sense",
        question: "Riya walks 5 km north, turns right and walks 3 km, then turns right and walks 5 km. How far is she from the start, and in which direction?",
        options: ["3 km East", "3 km West", "5 km North", "8 km East"],
        steps: [
          "She walks 5 km north.",
          "A right turn means she now faces east and walks 3 km.",
          "Another right turn means she faces south and walks 5 km, cancelling the 5 km north.",
          "Only 3 km east remains.",
        ],
        answer: "3 km East",
      },
      {
        id: "l-seating",
        topic: "Seating Arrangement",
        question: "A, B, C, D and E sit in a row (left to right). C is exactly in the middle. A is immediately left of C. B is at the right end. E is left of A. Who sits between C and B?",
        options: ["A", "D", "E", "Nobody"],
        steps: [
          "5 seats: 1 2 3 4 5. C in the middle = seat 3.",
          "A immediately left of C = seat 2. B at the right end = seat 5.",
          "E left of A = seat 1. The remaining seat 4 = D.",
          "Between C (3) and B (5) sits D.",
        ],
        answer: "D",
      },
    ],
  },
  {
    id: "verbal",
    label: "Verbal Ability",
    title: "Verbal Ability",
    intro:
      "In verbal ability, daily reading beats memorising. A few fixed grammar rules and good reading speed are enough for most questions.",
    topics: [
      { name: "Reading Comprehension", weightage: "High", shortcut: "Read the questions first, then the passage. Identify the main idea and the author's tone." },
      { name: "Sentence Correction / Error Spotting", weightage: "High", shortcut: "Check subject-verb agreement, tense consistency and articles first." },
      { name: "Fill in the Blanks", weightage: "High", shortcut: "Use the words around the blank to find the tone (positive/negative), then pick the option." },
      { name: "Para Jumbles", weightage: "Medium", shortcut: "The opening sentence introduces the name/topic. Pronouns (he, it, this) appear in later lines." },
      { name: "Synonyms and Antonyms", weightage: "Medium", shortcut: "Learn 10 words a day with an example sentence. Root words (bene = good, mal = bad) help." },
      { name: "Prepositions and Articles", weightage: "Medium", shortcut: "a/an depends on sound (an hour, a university). Memorise common preposition pairs." },
      { name: "Sentence Completion", weightage: "Medium", shortcut: "Connector words (however, therefore, although) show which way the logic goes." },
      { name: "Essay / Written Communication", weightage: "Medium", shortcut: "Introduction, 2 points with examples, conclusion. Simple sentences, zero spelling mistakes." },
    ],
    methodNotes: [
      "Read one English article (an editorial or blog) every day. That is how RC speed improves.",
      "Note the rule behind every grammar question you get wrong, and revise the notebook weekly.",
      "For tests like Wipro and Accenture, speak or write in English for 5 minutes daily.",
    ],
    solved: [
      {
        id: "v-synonym",
        topic: "Synonyms",
        question: "Choose the best synonym for 'Abundant'.",
        options: ["Scarce", "Plentiful", "Rare", "Empty"],
        steps: [
          "Abundant = existing in large quantities.",
          "Scarce and Rare mean the opposite (antonyms). Empty is also opposite.",
          "Plentiful = a lot of something, the same meaning.",
        ],
        answer: "Plentiful",
      },
      {
        id: "v-correction",
        topic: "Sentence Correction",
        question: "Find the error: 'Each of the students have submitted the assignment.'",
        options: ["Each of", "the students", "have submitted", "No error"],
        steps: [
          "The real subject of the sentence is 'Each', not 'students'.",
          "'Each' is singular, so the verb must also be singular.",
          "Replace 'have' with 'has': 'Each of the students has submitted the assignment.'",
        ],
        answer: "have submitted (correct: has submitted)",
      },
      {
        id: "v-parajumble",
        topic: "Para Jumbles",
        question:
          "Choose the correct order. P: He started a small tea stall near the station. Q: Ramesh lost his job in 2020. R: Today, that stall is a busy cafe. S: With his savings, he decided to start something of his own.",
        options: ["QSPR", "QPSR", "SQPR", "PQSR"],
        steps: [
          "The opening line introduces the name. Q has 'Ramesh', so Q comes first.",
          "S has 'his savings' and 'decided': the step after losing the job.",
          "P, 'He started a small tea stall', is the action after the decision.",
          "R, 'Today, that stall', refers back to the stall, so it comes last.",
        ],
        answer: "QSPR",
      },
      {
        id: "v-antonym",
        topic: "Antonyms",
        question: "Choose the antonym of 'Transparent'.",
        options: ["Clear", "Opaque", "Visible", "Bright"],
        steps: [
          "Transparent = you can see through it.",
          "Clear and Visible are similar in meaning.",
          "Opaque = you cannot see through it, the opposite meaning.",
        ],
        answer: "Opaque",
      },
    ],
  },
];

export const dailyPracticeGuide: { label: string; detail: string }[] = [
  { label: "Quant", detail: "20 timed questions daily (25-30 min). High-weightage topics first." },
  { label: "Logical", detail: "1 puzzle or seating set + 10 series / coding-decoding questions daily (20 min)." },
  { label: "Verbal", detail: "1 RC passage + 10 grammar questions daily (15-20 min)." },
  { label: "Weekly", detail: "2 full-length timed mock tests (from Phase 2). List your mistakes after every mock." },
];
