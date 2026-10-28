import type { IconName } from "@/components/Icon";
import { arithmeticQuestions } from "./aptitudeArithmeticQuestions";
import { reasoningQuestions } from "./aptitudeReasoningQuestions";
import { verbalQuestions } from "./aptitudeVerbalQuestions";
import { interpretationQuestions } from "./aptitudeInterpretationQuestions";

export interface PracticeQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  steps: string[];
  passage?: string;
  data?: { caption: string; headers: string[]; rows: string[][] };
  chart?: { kind: "bar" | "pie"; caption: string; values: { label: string; value: number }[]; unit: string };
}

export interface PracticeTopic {
  slug: string;
  name: string;
  method: string;
  questions: PracticeQuestion[];
}

export interface AptitudeCategory {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  intro: string;
  icon: IconName;
  isNew?: boolean;
  topics: PracticeTopic[];
}

// Category definitions and opening questions. The banks below complete each 20-question set.
function sample(
  slug: string, name: string, method: string, question: string,
  options: PracticeQuestion["options"], correctIndex: PracticeQuestion["correctIndex"], steps: string[],
): PracticeTopic {
  return { slug, name, method, questions: [{ id: `${slug}-1`, question, options, correctIndex, steps }] };
}

const categorySeeds: AptitudeCategory[] = [
  {
    slug: "arithmetic", name: "Arithmetic Aptitude", shortName: "Arithmetic",
    description: "Percentages, Profit & Loss, Time & Distance",
    intro: "Kisi topic par click karke 20 practice questions solve karo. Check your answer after each attempt and learn the method.",
    icon: "calculator",
    topics: [
      sample("percentages", "Percentages", "Percentage = (part / whole) × 100. For successive changes, use a + b + ab/100.",
        "A price is first increased by 20% and then decreased by 20%. What is the net change?",
        ["No change", "4% increase", "4% decrease", "2% decrease"], 2,
        ["Assume the original price is ₹100.", "After a 20% increase, the price is ₹120.", "A 20% decrease on ₹120 is ₹24, so the final price is ₹96.", "The price falls by ₹4 out of ₹100: a 4% decrease."]),
      {
        slug: "profit-and-loss", name: "Profit and Loss",
        method: "Profit = selling price − cost price. Profit % = (profit / cost price) × 100. Calculate a discount on the marked price.",
        questions: [
          {
            id: "profit-and-loss-1",
            question: "A shopkeeper buys an article for ₹800 and sells it for ₹1,000. What is the profit percentage?",
            options: ["20%", "25%", "30%", "15%"], correctIndex: 1,
            steps: ["Cost price = ₹800 and selling price = ₹1,000.", "Profit = ₹1,000 − ₹800 = ₹200.", "Profit percentage = (₹200 / ₹800) × 100 = 25%.", "Always use the cost price as the base for profit or loss percentage."],
          },
          {
            id: "profit-and-loss-2",
            question: "An article bought for ₹1,500 is sold at a loss of 12%. What is its selling price?",
            options: ["₹1,380", "₹1,320", "₹1,200", "₹1,680"], correctIndex: 1,
            steps: ["Loss = 12% of ₹1,500 = ₹180.", "Selling price = cost price − loss = ₹1,500 − ₹180.", "Selling price = ₹1,320."],
          },
          {
            id: "profit-and-loss-3",
            question: "A shopkeeper marks goods 25% above cost price and gives a 10% discount. What is the profit percentage?",
            options: ["10%", "12.5%", "15%", "35%"], correctIndex: 1,
            steps: ["Assume the cost price is ₹100. The marked price is ₹125.", "The discount is 10% of ₹125 = ₹12.50.", "Selling price = ₹125 − ₹12.50 = ₹112.50.", "Profit percentage = (₹12.50 / ₹100) × 100 = 12.5%."],
          },
        ],
      },
      sample("time-and-distance", "Time and Distance", "Speed = distance / time. Convert km/h to m/s by multiplying by 5/18.",
        "A 150 m long train travels at 54 km/h. How long does it take to cross a 300 m platform?",
        ["20 seconds", "25 seconds", "30 seconds", "36 seconds"], 2,
        ["Speed = 54 × 5/18 = 15 m/s.", "The train covers its own length plus the platform: 150 + 300 = 450 m.", "Time = 450 / 15 = 30 seconds."]),
      sample("time-and-work", "Time and Work", "Add work rates, not the number of days. The LCM method makes rates easier to compare.",
        "A can finish a job in 12 days and B in 18 days. How long will they take working together?",
        ["6 days", "7.2 days", "8 days", "15 days"], 1,
        ["Take total work as LCM(12, 18) = 36 units.", "A completes 3 units per day and B completes 2 units per day.", "Together, their rate is 5 units per day. Time = 36 / 5 = 7.2 days."]),
      sample("number-system", "Number System", "Look for divisibility rules and repeating remainder or unit-digit cycles.",
        "What is the remainder when 7³ is divided by 5?",
        ["1", "2", "3", "4"], 2,
        ["7³ = 343.", "343 = 5 × 68 + 3, so the remainder is 3."]),
      sample("ratio-and-proportion", "Ratio and Proportion", "Add the ratio parts, then divide the total by the number of parts.",
        "₹640 is shared between A and B in the ratio 3:5. How much does B receive?",
        ["₹240", "₹320", "₹400", "₹480"], 2,
        ["Total ratio parts = 3 + 5 = 8.", "One part = ₹640 / 8 = ₹80.", "B receives 5 parts: 5 × ₹80 = ₹400."]),
      sample("simple-and-compound-interest", "Simple & Compound Interest", "SI = PRT/100. With annual compounding, amount = P(1 + R/100)^T.",
        "What is the difference between compound and simple interest on ₹10,000 at 10% per year for 2 years, compounded annually?",
        ["₹50", "₹100", "₹200", "₹210"], 1,
        ["Simple interest = 10,000 × 10 × 2 / 100 = ₹2,000.", "Compound amount = 10,000 × 1.1 × 1.1 = ₹12,100, so compound interest = ₹2,100.", "Difference = ₹2,100 − ₹2,000 = ₹100."]),
      sample("averages", "Averages", "Average = sum of values / number of values.",
        "The average of five numbers is 18. If 30 is added as a sixth number, what is the new average?",
        ["19", "20", "21", "24"], 1,
        ["The original sum is 5 × 18 = 90.", "The new sum is 90 + 30 = 120 across 6 numbers.", "New average = 120 / 6 = 20."]),
      sample("probability", "Probability", "For equally likely outcomes, probability = favourable outcomes / total outcomes.",
        "A fair six-sided die is rolled once. What is the probability of getting a prime number?",
        ["1/3", "1/2", "2/3", "1/6"], 1,
        ["The prime numbers on a die are 2, 3 and 5. The number 1 is not prime.", "There are 3 favourable outcomes out of 6 equally likely outcomes.", "Probability = 3/6 = 1/2."]),
      sample("permutation-and-combination", "Permutation & Combination", "Use permutations when order matters and combinations when only selection matters.",
        "In how many ways can 2 students be selected from a group of 5?",
        ["5", "10", "20", "25"], 1,
        ["Order does not matter when selecting students, so use combinations.", "5C2 = (5 × 4) / (2 × 1) = 10."]),
      sample("mixtures-and-alligation", "Mixtures & Alligation", "For two ingredients, their quantities are inversely proportional to their price differences from the mean.",
        "Tea costing ₹200/kg and ₹300/kg is mixed to make tea worth ₹240/kg. What is the ratio of cheaper tea to dearer tea?",
        ["2:3", "3:2", "1:2", "2:1"], 1,
        ["Using alligation, cheaper : dearer = (300 − 240) : (240 − 200).", "The ratio is 60:40 = 3:2.", "Check: (3 × 200 + 2 × 300) / 5 = ₹240/kg."]),
      sample("lcm-and-hcf", "LCM & HCF", "For two positive integers, LCM × HCF = the product of the numbers.",
        "The HCF of two numbers is 6 and their LCM is 72. If one number is 18, what is the other?",
        ["12", "24", "30", "36"], 1,
        ["Product of the numbers = HCF × LCM = 6 × 72 = 432.", "The other number = 432 / 18 = 24."]),
      sample("problems-on-ages", "Problems on Ages", "Write an equation for present ages, then add or subtract the same number of years for each person.",
        "A father is three times as old as his son. After 10 years, he will be twice as old as his son. What is the son's present age?",
        ["5 years", "10 years", "15 years", "20 years"], 1,
        ["Let the son's present age be x, so the father's age is 3x.", "After 10 years: 3x + 10 = 2(x + 10).", "3x + 10 = 2x + 20, so x = 10 years."]),
    ],
  },
  {
    slug: "logical-reasoning", name: "Logical Reasoning", shortName: "Logical",
    description: "Number Series, Coding, Blood Relations",
    intro: "Choose a topic and practise spotting patterns, drawing diagrams and following the clues step by step.",
    icon: "layers",
    topics: [
      sample("number-series", "Number Series", "Check differences, ratios and square patterns before trying a complicated rule.",
        "What is the next number in the series: 3, 6, 12, 24, ...?",
        ["30", "36", "48", "60"], 2, ["Each number is twice the previous number.", "The next number is 24 × 2 = 48."]),
      sample("coding-decoding", "Coding-Decoding", "Write letter positions and apply the same shift to every letter.",
        "In a code, CAT is written as DBU by shifting each letter one place forward. How is DOG written?",
        ["EPH", "CNE", "EPG", "FQI"], 0, ["D becomes E, O becomes P and G becomes H.", "So DOG is written as EPH."]),
      sample("blood-relations", "Blood Relations", "Draw generations in a family tree and use only the relationships stated.",
        "Pointing to a boy, Meera says, 'He is the son of my only brother.' How is Meera related to the boy?",
        ["Mother", "Sister", "Aunt", "Grandmother"], 2, ["The boy is the son of Meera's brother.", "The sister of a child's father is the child's aunt."]),
      sample("seating-arrangement", "Seating Arrangement", "Mark fixed positions first. Keep the direction people face in mind.",
        "A, B and C sit in a row facing north. B is immediately to the right of A and C is immediately to the right of B. Who is in the middle?",
        ["A", "B", "C", "Cannot be determined"], 1, ["The clues give the order A, B, C from left to right.", "B occupies the middle seat."]),
      sample("puzzles", "Puzzles", "List possibilities and eliminate each one using the clues.",
        "A red, a blue and a green box each contain a different fruit: an apple, a mango or an orange. The red box has the apple. The blue box does not have the mango. What is in the green box?",
        ["Apple", "Orange", "Mango", "Cannot be determined"], 2, ["The apple is in the red box.", "The blue box cannot contain the apple or the mango, so it contains the orange.", "The mango must be in the green box."]),
      sample("direction-sense", "Direction Sense", "Draw each move on a north-south/east-west grid.",
        "Riya walks 3 km north and then 4 km east. What is the shortest distance from her starting point?",
        ["1 km", "5 km", "7 km", "12 km"], 1, ["The two moves form perpendicular sides of a right triangle.", "Shortest distance = √(3² + 4²) = √25 = 5 km."]),
      sample("syllogism", "Syllogism", "Test whether a conclusion follows in every case allowed by the statements.",
        "All roses are flowers. Some roses are red. Which conclusion must follow?",
        ["All flowers are roses", "Some flowers are red", "All roses are red", "No flowers are red"], 1, ["The red roses are flowers because all roses are flowers.", "Therefore, at least some flowers are red. The other conclusions do not have to follow."]),
      sample("visual-reasoning", "Visual Reasoning", "Track one property at a time: shape, count, direction or shading.",
        "Which symbol comes next in this repeating pattern: ▲, ●, ■, ▲, ●, ...?",
        ["▲", "●", "■", "◆"], 2, ["The repeating block is triangle, circle, square.", "After the second circle, the next symbol is a square (■)."]),
      sample("data-sufficiency", "Data Sufficiency", "Check each statement alone before combining them.",
        "What is x? Statement I: x + y = 10. Statement II: y = 4. Which statements are sufficient?",
        ["I alone", "II alone", "Both together, neither alone", "Even both together are insufficient"], 2, ["Statement I has two unknowns and does not fix x.", "Statement II fixes only y.", "Together, x + 4 = 10 gives x = 6, so both are needed."]),
      sample("statement-and-assumptions", "Statement and Assumptions", "Find the unstated idea that a proposed action relies on.",
        "A college says, 'To help students revise, we will keep the library open two extra hours.' Which assumption supports this decision?",
        ["All students revise only at night", "Some students can use the extra library time for revision", "Books are the only way to revise", "Every student lives on campus"], 1, ["The decision aims to help revision by extending library access.", "It assumes at least some students can benefit from the extra time, without making claims about every student."]),
    ],
  },
  {
    slug: "verbal-ability", name: "Verbal Ability", shortName: "Verbal",
    description: "Grammar, Synonyms, Antonyms, Reading",
    intro: "Choose a topic to practise grammar, vocabulary and reading. Read the explanation to understand the rule behind each answer.",
    icon: "book",
    topics: [
      sample("grammar", "Grammar", "Check subject-verb agreement, tense and pronouns before selecting an answer.",
        "Choose the correct sentence.",
        ["Each of the students have a book.", "Each of the students has a book.", "Each of the students are having a book.", "Each of the students were a book."], 1, ["The subject is 'Each', which is singular.", "Use the singular verb 'has': Each of the students has a book."]),
      sample("synonyms", "Synonyms", "Look for the closest meaning in the given context.",
        "Choose the best synonym for 'Abundant'.",
        ["Scarce", "Plentiful", "Rare", "Empty"], 1, ["Abundant means existing in large quantities.", "Plentiful has the same meaning. Scarce and rare suggest the opposite."]),
      sample("antonyms", "Antonyms", "An antonym expresses the opposite meaning.",
        "Choose the antonym of 'Transparent'.",
        ["Clear", "Opaque", "Visible", "Bright"], 1, ["Transparent means that light passes through, so you can see through it.", "Opaque means you cannot see through it, which is the opposite."]),
      {
        slug: "reading-comprehension", name: "Reading Comprehension",
        method: "Support your answer with the passage rather than outside assumptions.",
        questions: [{ id: "reading-comprehension-1", passage: "A college introduced a book exchange where seniors could donate their used textbooks to juniors. The initiative helped students save money and reduced the number of books discarded at the end of each year.",
          question: "Why did the college introduce a book exchange?", options: ["To replace the library", "To reduce textbook costs and waste", "To sell new textbooks", "To shorten the course"], correctIndex: 1,
          steps: ["The exchange lets juniors reuse books donated by seniors.", "The passage explicitly mentions saving money and reducing discarded books, so the answer is to reduce textbook costs and waste."] }],
      },
      sample("fill-in-the-blanks", "Fill in the Blanks", "Use the surrounding words and grammar to find the missing word.",
        "Choose the correct word: She has been preparing for placements ___ June.",
        ["for", "since", "from", "during"], 1, ["June is a starting point in time.", "Use 'since' with a starting point and 'for' with a duration: since June, for three months."]),
      sample("para-jumbles", "Para Jumbles", "Find the opening idea, then follow references and the order of events.",
        "Choose the correct order. P: He opened a tea stall. Q: Ramesh lost his job. R: Today, the stall is a busy cafe. S: He decided to start a business with his savings.",
        ["QSPR", "QPSR", "SQPR", "PQSR"], 0, ["Q introduces Ramesh and the initial event.", "S gives his decision, P gives the action and R describes the outcome.", "The order is Q, S, P, R."]),
      sample("prepositions-and-articles", "Prepositions and Articles", "Choose a/an by the sound that follows, not just the written letter.",
        "Choose the correct article: She waited for ___ hour.",
        ["a", "an", "the only", "No article"], 1, ["The h in 'hour' is silent, so the word starts with a vowel sound.", "Use 'an': She waited for an hour."]),
      sample("sentence-completion", "Sentence Completion", "Connectors show whether the next idea agrees, contrasts or gives a result.",
        "Choose the best completion: Although the test was difficult, ___.",
        ["it was difficult", "Maya solved every question", "because it had many questions", "although Maya studied"], 1, ["'Although' introduces a contrast.", "Solving every question contrasts with the test being difficult and completes the sentence grammatically."]),
    ],
  },
  {
    slug: "data-interpretation", name: "Data Interpretation", shortName: "Data Interpretation",
    description: "Tables, Bar Charts, Pie Charts",
    intro: "Read the data carefully, check the units and solve questions based on tables, bar charts and pie charts.",
    icon: "target", isNew: true,
    topics: [
      {
        slug: "tables", name: "Tables", method: "Read row and column labels carefully. Add only the values required by the question.",
        questions: [{ id: "tables-1", question: "According to the table, how many students were placed in total?", options: ["90", "100", "110", "120"], correctIndex: 2,
          data: { caption: "Students placed by department", headers: ["Department", "Students placed"], rows: [["CSE", "50"], ["ECE", "35"], ["ME", "25"]] },
          steps: ["CSE has 50 placed students, ECE has 35 and ME has 25.", "Total = 50 + 35 + 25 = 110 students."] }],
      },
      {
        slug: "bar-charts", name: "Bar Charts", method: "Compare the bar values and check the unit before calculating a difference or percentage.",
        questions: [{ id: "bar-charts-1", question: "How many more students were placed in March than in January?", options: ["10", "15", "20", "25"], correctIndex: 2,
          chart: { kind: "bar", caption: "Students placed by month", unit: "students", values: [{ label: "January", value: 30 }, { label: "February", value: 40 }, { label: "March", value: 50 }] },
          steps: ["The chart shows 30 students in January and 50 in March.", "Difference = 50 − 30 = 20 students."] }],
      },
      {
        slug: "pie-charts", name: "Pie Charts", method: "A full pie is 100% or 360°. Multiply the total by the sector's percentage to find its value.",
        questions: [{ id: "pie-charts-1", question: "A student spends 20 hours per week preparing for placements. Using the pie chart, how many hours are spent on aptitude?", options: ["4 hours", "5 hours", "6 hours", "8 hours"], correctIndex: 2,
          chart: { kind: "pie", caption: "Weekly placement preparation time", unit: "%", values: [{ label: "DSA", value: 40 }, { label: "Aptitude", value: 30 }, { label: "Interview", value: 20 }, { label: "Resume", value: 10 }] },
          steps: ["Aptitude accounts for 30% of the weekly preparation time.", "30% of 20 hours = 30/100 × 20 = 6 hours."] }],
      },
    ],
  },
];

const additionalQuestions: Record<string, PracticeQuestion[]> = {
  ...arithmeticQuestions,
  ...reasoningQuestions,
  ...verbalQuestions,
  ...interpretationQuestions,
};

export const aptitudeCategories: AptitudeCategory[] = categorySeeds.map((category) => ({
  ...category,
  topics: category.topics.map((topic) => {
    const seen = new Set<string>();
    const questions = [...topic.questions, ...(additionalQuestions[topic.slug] ?? [])].filter((question) => {
      const key = JSON.stringify([question.question, question.passage, question.data, question.chart]);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 20);
    if (questions.length < 20) throw new Error(`${topic.slug} needs at least 20 distinct questions`);
    return { ...topic, questions };
  }),
}));

export function getAptitudeCategory(slug: string) {
  return aptitudeCategories.find((category) => category.slug === slug);
}

export function categoryPath(slug: string) {
  return `/aptitude/${slug}`;
}

export function topicPath(category: string, topic: string) {
  return `${categoryPath(category)}/${topic}`;
}
