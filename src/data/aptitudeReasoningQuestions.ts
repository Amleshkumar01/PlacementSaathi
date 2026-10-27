import { mcq, numeric, twenty } from "./aptitudeQuestionHelpers";

const names = ["Asha", "Rohan", "Meera", "Kabir", "Nisha", "Arjun", "Priya", "Dev", "Tara", "Kunal", "Isha", "Neel", "Sana", "Aman", "Riya", "Vikram", "Anu", "Raj", "Pooja", "Varun"];
const words = ["BOOK", "FISH", "LAMP", "TREE", "COLD", "RAIN", "SAND", "MILK", "BIRD", "ROAD", "GAME", "NOTE", "STAR", "HAND", "TIME", "WIND", "DUST", "PARK", "MINT", "ROSE"];
function shift(word: string, places: number) { return [...word].map((letter) => String.fromCharCode((letter.charCodeAt(0) - 65 + places + 26) % 26 + 65)).join(""); }

const assumptions: [string, string, string[]][] = [
  ["A library introduces an online renewal service to reduce queues at its desk.", "Some users can renew books online instead of visiting the desk.", ["Every user owns a laptop", "No user reads printed books", "The library will stop lending books"]],
  ["A college starts a weekend bus to help students reach the examination centre.", "Some students need transport to that centre on weekends.", ["All students live at the same address", "Exams are always cancelled", "The bus will be free forever"]],
  ["A company offers interview practice sessions to improve candidates' confidence.", "Practice can help at least some candidates feel more confident.", ["All candidates will be selected", "Confidence is the only interview criterion", "No candidate has attended an interview before"]],
  ["A shop adds a digital payment option to make checkout more convenient.", "Some customers can use digital payments.", ["Cash is illegal", "Every customer has the same bank", "Digital payments eliminate all queues"]],
  ["A college emails deadline reminders to reduce late project submissions.", "Some late submissions may be avoided if students remember the deadline.", ["Every late submission is intentional", "All projects take one day", "No student checks email"]],
  ["A town installs streetlights to help people travel after dark.", "Better lighting can help at least some night-time travellers.", ["Nobody travels during the day", "All roads have the same width", "Lighting prevents every accident"]],
  ["A cafeteria adds a vegetarian menu to serve more dietary preferences.", "Some customers prefer vegetarian meals.", ["All other dishes will be removed", "Vegetarian food is always cheaper", "Every customer has the same diet"]],
  ["A school keeps spare umbrellas for students caught in unexpected rain.", "Some students may need an umbrella when it rains.", ["It rains every school day", "All students dislike walking", "Umbrellas are never lost"]],
  ["A website adds a search box so visitors can find articles faster.", "Some visitors can use search to locate relevant articles.", ["There is only one article", "Visitors never know what they want", "All articles have the same title"]],
  ["A factory schedules maintenance to reduce equipment failures.", "Maintenance can prevent at least some equipment failures.", ["Every failure is preventable", "The equipment never operates", "Maintenance has no cost"]],
  ["A college offers fee instalments to make payment manageable.", "Some students may find smaller scheduled payments easier.", ["No student can pay the full amount", "Fees will be cancelled", "All students earn the same salary"]],
  ["A clinic introduces appointment slots to reduce waiting times.", "Scheduling visits can help distribute arrivals over time.", ["All appointments last exactly one minute", "No urgent cases occur", "Every patient arrives early"]],
  ["A team documents its setup process to help new members start work.", "New members can benefit from written setup instructions.", ["Existing members know nothing", "Documentation never needs updating", "The team will stop hiring"]],
  ["A company provides remote meeting access for staff in other cities.", "Some staff cannot conveniently attend meetings in person.", ["All meetings must be cancelled", "Every employee works abroad", "Remote access guarantees agreement"]],
  ["A station displays platform numbers to guide passengers.", "Passengers can use platform information to find their trains.", ["All trains depart from one platform", "No passengers can read", "Displays make every train punctual"]],
  ["A hostel sets up a complaint form to identify maintenance problems.", "Residents can report at least some maintenance problems through the form.", ["All complaints are false", "No repairs are needed", "Every problem has the same cause"]],
  ["A teacher gives a diagnostic quiz before planning revision classes.", "Quiz responses can reveal at least some learning gaps.", ["Every student will score zero", "The quiz replaces all teaching", "Students know every topic already"]],
  ["A park adds labelled recycling bins to improve waste sorting.", "Some visitors can use the labels to choose the correct bin.", ["All waste is recyclable", "Visitors never produce waste", "One bin can hold unlimited waste"]],
  ["A retailer offers product demonstrations to help customers understand features.", "Some customers can understand features better after seeing a demonstration.", ["Every viewer must buy the product", "The product has no instructions", "Demonstrations change the product price"]],
  ["A college publishes a campus map to help first-year students find buildings.", "Some new students are unfamiliar with building locations.", ["Every building looks identical", "Older students never use maps", "The campus has only one building"]],
];

export const reasoningQuestions = {
  "number-series": twenty((i) => {
    const k = Math.floor(i / 4) + 1;
    if (i % 4 === 0) {
      const start = k + 2, gap = k + 3;
      return numeric("number-series", i, `Find the next number: ${[0, 1, 2, 3].map((n) => start + n * gap).join(", ")}, ...`, start + 4 * gap, [`Each term increases by ${gap}.`, `Next = ${start + 3 * gap} + ${gap} = ${start + 4 * gap}.`]);
    }
    if (i % 4 === 1) return numeric("number-series", i, `Find the next number: ${k + 1}, ${(k + 1) * 3}, ${(k + 1) * 9}, ${(k + 1) * 27}, ...`, (k + 1) * 81, ["Multiply each term by 3.", `Next = ${(k + 1) * 27} × 3 = ${(k + 1) * 81}.`]);
    if (i % 4 === 2) return numeric("number-series", i, `Find the next number: ${[k, k + 1, k + 2, k + 3].map((n) => n * n).join(", ")}, ...`, (k + 4) ** 2, [`The terms are squares of ${k}, ${k + 1}, ${k + 2} and ${k + 3}.`, `The next term is ${k + 4}² = ${(k + 4) ** 2}.`]);
    return numeric("number-series", i, `Find the next number: ${k}, ${k + 2}, ${k + 6}, ${k + 12}, ${k + 20}, ...`, k + 30, ["The differences are 2, 4, 6 and 8, so the next difference is 10.", `${k + 20} + 10 = ${k + 30}.`]);
  }),
  "coding-decoding": twenty((i) => {
    const word = words[i], topic = "coding-decoding";
    if (i % 4 < 2) {
      const places = i % 4 + 1;
      return mcq(topic, i, `Each letter is shifted ${places} ${places === 1 ? "place" : "places"} forward in the alphabet, wrapping after Z. How is ${word} coded?`, shift(word, places), [shift(word, places + 1), shift(word, -places), [...word].reverse().join("")], [`Apply a +${places} shift to each letter of ${word}.`, `The resulting code is ${shift(word, places)}.`]);
    }
    if (i % 4 === 2) return mcq(topic, i, `A code writes every word in reverse order. What is the code for ${word}?`, [...word].reverse().join(""), [shift(word, 1), shift(word, -1), word], [`Read ${word} from its final letter to its first.`, `The code is ${[...word].reverse().join("")}.`]);
    const sum = [...word].reduce((total, letter) => total + letter.charCodeAt(0) - 64, 0);
    return numeric(topic, i, `Using A=1, B=2, ..., Z=26, what is the sum of the letter values in ${word}?`, sum, [`Letter values: ${[...word].map((letter) => `${letter}=${letter.charCodeAt(0) - 64}`).join(", ")}.`, `Adding them gives ${sum}.`]);
  }),
  "blood-relations": twenty((i) => {
    const name = names[i];
    const cases: [string, string, string[]][] = [
      [`${name} is the sister of a boy's father. How is ${name} related to the boy?`, "Aunt", ["Mother", "Sister", "Grandmother"]],
      [`${name} is the brother of a girl's mother. How is ${name} related to the girl?`, "Uncle", ["Father", "Brother", "Grandfather"]],
      [`${name} is the mother of a child's father. How is ${name} related to the child?`, "Grandmother", ["Mother", "Aunt", "Sister"]],
      [`${name} is the father of a child's mother. How is ${name} related to the child?`, "Grandfather", ["Father", "Uncle", "Brother"]],
      [`A woman says, '${name} is the daughter of my son.' How is ${name} related to the woman?`, "Granddaughter", ["Daughter", "Niece", "Sister"]],
      [`A man says, '${name} is the son of my daughter.' How is ${name} related to the man?`, "Grandson", ["Son", "Nephew", "Brother"]],
      [`${name} is the daughter of Ravi's brother. How is ${name} related to Ravi?`, "Niece", ["Daughter", "Sister", "Mother"]],
      [`${name} is the son of Maya's sister. How is ${name} related to Maya?`, "Nephew", ["Son", "Brother", "Father"]],
      [`${name} and a girl have the same parents. ${name} is male. How is ${name} related to the girl?`, "Brother", ["Father", "Uncle", "Cousin"]],
      [`${name}'s mother and a boy's mother are sisters. How are ${name} and the boy related?`, "Cousins", ["Siblings", "Parent and child", "Grandparent and grandchild"]],
    ];
    const [question, answer, wrong] = cases[i % cases.length];
    const explanation: string[] = ["A father's sister is an aunt.", "A mother's brother is an uncle.", "A parent's mother is a grandmother.", "A parent's father is a grandfather.", "A son's daughter is a granddaughter.", "A daughter's son is a grandson.", "A sibling's daughter is a niece.", "A sibling's son is a nephew.", "A male sibling is a brother.", "Children of siblings are cousins."];
    return mcq("blood-relations", i, question, answer, wrong, ["Trace the family relationship one generation at a time.", explanation[i % cases.length]]);
  }),
  "seating-arrangement": twenty((i) => {
    const group = [names[i], names[(i + 3) % 20], names[(i + 7) % 20], names[(i + 11) % 20]];
    const [a, b, c, d] = group;
    const asks = [`Who sits second from the left?`, `Who sits at the right end?`, `Who is immediately left of ${c}?`, `Who sits third from the left?`];
    const index = [1, 3, 1, 2][i % 4];
    return mcq("seating-arrangement", i, `${a}, ${b}, ${c} and ${d} sit in a row facing north. ${a} is at the left end, ${b} is immediately right of ${a}, and ${d} is immediately right of ${c}. ${asks[i % 4]}`, group[index], group.filter((_, n) => n !== index), [`${a} occupies seat 1 and ${b} seat 2.`, `The remaining seats place ${c} in seat 3 and ${d} in seat 4.`, `Left-to-right order: ${group.join(", ")}. Answer: ${group[index]}.`]);
  }),
  puzzles: twenty((i) => {
    const k = Math.floor(i / 4), a = names[k * 3], b = names[k * 3 + 1], c = names[k * 3 + 2];
    if (i % 4 === 0) return mcq("puzzles", i, `${a}, ${b} and ${c} each choose a different fruit: apple, mango or orange. ${a} chooses apple and ${b} does not choose mango. Which fruit does ${c} choose?`, "Mango", ["Apple", "Orange", "Cannot be determined"], [`${a} has apple, so ${b} must choose mango or orange.`, `${b} cannot choose mango, leaving orange. Therefore ${c} has mango.`]);
    if (i % 4 === 1) return mcq("puzzles", i, `${a}, ${b} and ${c} give presentations on Monday, Tuesday and Wednesday, one each day. ${a} presents before ${b}, and ${b} before ${c}. Who presents on Tuesday?`, b, [a, c, "Cannot be determined"], ["The three strictly ordered presentations must follow the order of the three days.", `${a}: Monday; ${b}: Tuesday; ${c}: Wednesday.`]);
    if (i % 4 === 2) return mcq("puzzles", i, `${a} is taller than ${b}. ${c} is taller than ${a}. Who is the shortest of the three?`, b, [a, c, "Cannot be determined"], [`The height order is ${c} > ${a} > ${b}.`, `Therefore ${b} is the shortest.`]);
    return mcq("puzzles", i, `${a}, ${b} and ${c} study different subjects: Maths, Physics and Chemistry. ${a} studies Physics. ${c} does not study Maths. Who studies Chemistry?`, c, [a, b, "Cannot be determined"], [`${c} cannot study Physics because ${a} already does, and cannot study Maths.`, `${c} studies Chemistry, leaving Maths for ${b}.`]);
  }),
  "direction-sense": twenty((i) => {
    const k = Math.floor(i / 4) + 1, name = names[i];
    if (i % 4 === 0) return numeric("direction-sense", i, `${name} walks ${3 * k} km north and ${4 * k} km east. What is the shortest distance from the starting point?`, 5 * k, [`The displacements are perpendicular. Distance = √(${3 * k}² + ${4 * k}²).`, `This is a 3:4:5 triangle scaled by ${k}, giving ${5 * k} km.`], " km");
    if (i % 4 === 1) return mcq("direction-sense", i, `${name} walks ${k + 2} km east, turns left and walks ${k + 4} km, then turns left and walks ${k + 2} km. In which direction is the starting point from the final position?`, "South", ["North", "East", "West"], ["The equal east and west movements cancel.", `The final position is ${k + 4} km north of the start, so the start lies south of the final position.`]);
    if (i % 4 === 2) return numeric("direction-sense", i, `${name} walks ${5 * k} m north, ${2 * k} m south and then ${4 * k} m east. How far is the final position from the start?`, 5 * k, [`Net northward movement = ${5 * k} − ${2 * k} = ${3 * k} m.`, `Distance = √(${3 * k}² + ${4 * k}²) = ${5 * k} m.`], " m");
    const facing = ["North", "East", "South", "West"][Math.floor(i / 4) % 4], answer = ["West", "North", "East", "South"][Math.floor(i / 4) % 4];
    return mcq("direction-sense", i, `${name} faces ${facing.toLowerCase()}, turns right twice and then turns left once. Which direction does ${name} face now?`, ["East", "South", "West", "North"][Math.floor(i / 4) % 4], ["North", "East", "South", "West"].filter((direction) => direction !== ["East", "South", "West", "North"][Math.floor(i / 4) % 4]), ["Two right turns and one left turn make one net right turn (90° clockwise).", `${facing} turns clockwise to ${["East", "South", "West", "North"][Math.floor(i / 4) % 4]}. ${answer} would be a left turn.`]);
  }),
  syllogism: twenty((i) => {
    const groups = [["roses", "flowers", "red things"], ["cats", "animals", "black things"], ["novels", "books", "illustrated things"], ["buses", "vehicles", "electric things"], ["violinists", "musicians", "teachers"]];
    const [a, b, c] = groups[Math.floor(i / 4)];
    const cases: [string, string, string[], string][] = [
      [`All ${a} are ${b}. Some ${a} are ${c}.`, `Some ${b} are ${c}`, [`All ${b} are ${a}`, `All ${a} are ${c}`, `No ${b} are ${c}`], `The stated ${a} that are ${c} also belong to ${b}.`],
      [`All ${a} are ${b}. No ${b} are ${c}.`, `No ${a} are ${c}`, [`All ${c} are ${a}`, `Some ${a} are ${c}`, `All ${b} are ${a}`], `Since ${a} are inside ${b}, they cannot overlap ${c}.`],
      [`Some ${a} are ${b}. All ${b} are ${c}.`, `Some ${a} are ${c}`, [`All ${a} are ${c}`, `No ${a} are ${c}`, `All ${c} are ${b}`], `The existing overlap between ${a} and ${b} lies within ${c}.`],
      [`No ${a} are ${b}. Some ${c} are ${a}.`, `Some ${c} are not ${b}`, [`All ${c} are ${b}`, `All ${c} are ${a}`, `Some ${a} are ${b}`], `The ${c} that are ${a} cannot belong to ${b}.`],
    ];
    const [statements, answer, wrong, reason] = cases[i % 4];
    return mcq("syllogism", i, `Treat the statements as true: ${statements} Which conclusion must follow?`, answer, wrong, ["Use only the stated relationships, without assuming the reverse of an 'all' statement.", reason]);
  }),
  "visual-reasoning": twenty((i) => {
    const k = Math.floor(i / 4), symbols = [["▲", "●", "■"], ["◆", "■", "●"], ["○", "△", "□"], ["★", "◆", "▲"], ["□", "○", "★"]][k];
    if (i % 4 === 0) return mcq("visual-reasoning", i, `What comes next in the repeating pattern: ${[...symbols, symbols[0], symbols[1]].join(", ")}, ...?`, symbols[2], [symbols[0], symbols[1], "None of these"], [`The repeating block is ${symbols.join(", ")}.`, `The next symbol is ${symbols[2]}.`]);
    if (i % 4 === 1) return numeric("visual-reasoning", i, `A pattern contains ${k + 2}, ${k + 4}, ${k + 6} and ${k + 8} dots in successive figures. How many dots are in the next figure?`, k + 10, ["The number of dots increases by 2 in each figure.", `Next count = ${k + 8} + 2 = ${k + 10}.`]);
    if (i % 4 === 2) {
      const arrows = ["↑", "→", "↓", "←"], start = k % 4, sequence = Array.from({ length: 4 }, (_, n) => arrows[(start + n) % 4]);
      return mcq("visual-reasoning", i, `An arrow rotates 90° clockwise each step: ${sequence.join(", ")}. What is the next arrow?`, arrows[start], arrows.filter((_, n) => n !== start), ["Four quarter-turns complete one full rotation.", `The next arrow returns to ${arrows[start]}.`]);
    }
    const start = k + 1;
    return numeric("visual-reasoning", i, `A growing square pattern has side lengths ${start}, ${start + 1}, ${start + 2} and ${start + 3} dots. How many dots fill the entire next square?`, (start + 4) ** 2, [`The next square has side length ${start + 4}.`, `A filled square contains side × side = ${(start + 4) ** 2} dots.`]);
  }),
  "data-sufficiency": twenty((i) => {
    const k = Math.floor(i / 4) + 1;
    const options = ["Statement I alone is sufficient", "Statement II alone is sufficient", "Both together are required", "Even both together are insufficient"];
    const cases: [string, number, string][] = [
      [`What is the real number x? I: x + y = ${10 + k}. II: y = ${k + 2}.`, 2, `I alone has two unknowns and II alone gives no x. Together, x = ${10 + k} − ${k + 2} = 8.`],
      [`What is the real number x? I: 2x = ${12 + 2 * k}. II: x > ${k}.`, 0, `I fixes x = ${6 + k}. II permits infinitely many real values.`],
      [`What is the area of a rectangle? I: Its length is ${k + 4} cm. II: Its area is ${20 + k} cm².`, 1, "I does not specify the width. II directly specifies the requested area."],
      [`What is the real number x? I: x > ${k}. II: x < ${k + 10}.`, 3, `Together, ${k} < x < ${k + 10} still permits many values.`],
    ];
    const [question, answerIndex, reason] = cases[i % 4];
    return mcq("data-sufficiency", i, question, options[answerIndex], options.filter((_, n) => n !== answerIndex), ["Test each statement by itself, then test them together if needed.", reason]);
  }),
  "statement-and-assumptions": twenty((i) => {
    const [statement, answer, wrong] = assumptions[i];
    return mcq("statement-and-assumptions", i, `${statement} Which assumption is needed to support the stated purpose?`, answer, wrong, ["Connect the proposed action to the purpose stated in the question.", answer + " This is the link the decision relies on; the other options make unsupported claims."]);
  }),
};
