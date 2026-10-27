import { fmt, fraction, mcq, numeric, twenty } from "./aptitudeQuestionHelpers";
import type { PracticeQuestion } from "./aptitudePractice";

export const interpretationQuestions = {
  tables: twenty((i) => {
    const k = Math.floor(i / 4) + 1, year = 2020 + k;
    if (i % 4 === 0) {
      const values = [30 + 5 * k, 20 + 3 * k, 15 + 2 * k], total = values.reduce((sum, n) => sum + n, 0);
      return { ...numeric("tables", i, `In ${year}, what is the total number of placed students across the three departments in the table?`, total, [`Add the three department counts: ${values.join(" + ")} = ${total}.`, `A total of ${total} students were placed.`]), data: { caption: `Department placements, ${year}`, headers: ["Department", "Placed students"], rows: [["CSE", `${values[0]}`], ["ECE", `${values[1]}`], ["ME", `${values[2]}`]] } };
    }
    if (i % 4 === 1) {
      const previous = 40 + 4 * k, next = 60 + 6 * k;
      return { ...numeric("tables", i, `How many more students joined the coding club in Semester 2 than Semester 1 in ${year}?`, next - previous, [`Semester 1: ${previous}; Semester 2: ${next}.`, `Increase = ${next} − ${previous} = ${next - previous} students.`]), data: { caption: `Coding club enrolments, ${year}`, headers: ["Semester", "New members"], rows: [["Semester 1", `${previous}`], ["Semester 2", `${next}`]] } };
    }
    if (i % 4 === 2) {
      const applicants = 100 + 20 * k, placed = applicants * 0.6;
      return { ...numeric("tables", i, `What percentage of the applicants shown in the ${year} table were placed?`, 60, [`Placed / applicants = ${placed}/${applicants}.`, `Percentage = (${placed}/${applicants}) × 100 = 60%.`], "%"), data: { caption: `Placement applicants, ${year}`, headers: ["Measure", "Students"], rows: [["Applicants", `${applicants}`], ["Placed applicants", `${placed}`]] } };
    }
    const boys = 20 + 4 * k, girls = 30 + 6 * k;
    return mcq("tables", i, `Using the ${year} workshop table, what is the ratio of male to female participants in simplest form?`, "2:3", ["3:2", "2:5", "1:3"], [`The ratio is ${boys}:${girls}.`, `Both counts share the factor ${10 + 2 * k}; dividing gives 2:3.`], { data: { caption: `Workshop attendance, ${year}`, headers: ["Group", "Participants"], rows: [["Male", `${boys}`], ["Female", `${girls}`]] } });
  }),
  "bar-charts": twenty((i) => {
    const k = Math.floor(i / 4) + 1, year = 2020 + k;
    const values = [{ label: "April", value: 20 + 4 * k }, { label: "May", value: 30 + 6 * k }, { label: "June", value: 40 + 8 * k }];
    const chart: PracticeQuestion["chart"] = { kind: "bar", caption: `Internship selections by month, ${year}`, unit: "students", values };
    const [a, b, c] = values.map((item) => item.value);
    if (i % 4 === 0) return { ...numeric("bar-charts", i, `According to the ${year} bar chart, how many internship selections were made across April, May and June in total?`, a + b + c, [`Add all three bar values: ${a} + ${b} + ${c} = ${a + b + c}.`]), chart };
    if (i % 4 === 1) return { ...numeric("bar-charts", i, `In the ${year} chart, how many more students were selected in June than in April?`, c - a, [`June has ${c} selections and April has ${a}.`, `Difference = ${c} − ${a} = ${c - a}.`]), chart };
    if (i % 4 === 2) return { ...numeric("bar-charts", i, `What was the percentage increase in selections from April to May in ${year}?`, (b - a) / a * 100, [`Increase = ${b} − ${a} = ${b - a}.`, `Divide by the April base: (${b - a}/${a}) × 100 = 50%.`], "%"), chart };
    return { ...numeric("bar-charts", i, `What is the average monthly number of selections across the three months in the ${year} chart?`, (a + b + c) / 3, [`Total selections = ${a + b + c}.`, `Monthly average = ${a + b + c}/3 = ${(a + b + c) / 3}.`]), chart };
  }),
  "pie-charts": twenty((i) => {
    const k = Math.floor(i / 4) + 1, total = 20 + 10 * k, apt = 20 + 2 * k, dsa = 30 + 2 * k;
    const chart: PracticeQuestion["chart"] = { kind: "pie", caption: `Weekly preparation plan with ${total} total hours`, unit: "%", values: [{ label: "DSA", value: dsa }, { label: "Aptitude", value: apt }, { label: "Interview", value: 30 - 2 * k }, { label: "Resume", value: 20 - 2 * k }] };
    if (i % 4 === 0) return { ...numeric("pie-charts", i, `The pie chart represents ${total} weekly study hours. How many hours are allocated to aptitude?`, total * apt / 100, [`Aptitude takes ${apt}% of ${total} hours.`, `Hours = ${total} × ${apt}/100 = ${fmt(total * apt / 100)}.`], " hours"), chart };
    if (i % 4 === 1) return { ...numeric("pie-charts", i, `In this ${total}-hour weekly plan, what is the angle of the DSA sector in the pie chart?`, dsa * 3.6, [`A full circle has 360°. DSA is ${dsa}% of the circle.`, `Angle = ${dsa}/100 × 360 = ${fmt(dsa * 3.6)}°.`], "°"), chart };
    if (i % 4 === 2) {
      const ratio = fraction(dsa, apt).replace("/", ":");
      return mcq("pie-charts", i, `For the ${total}-hour weekly plan, what is the ratio of time spent on DSA to time spent on aptitude?`, ratio, [fraction(apt, dsa).replace("/", ":"), "1:1", "2:1", "3:1"], [`DSA : Aptitude = ${dsa}:${apt}.`, `Simplifying gives ${ratio}.`], { chart });
    }
    return { ...numeric("pie-charts", i, `Using the ${total}-hour weekly plan, how many more hours go to DSA than aptitude?`, total * (dsa - apt) / 100, [`The share difference is ${dsa}% − ${apt}% = ${dsa - apt}%.`, `Hour difference = ${total} × ${dsa - apt}/100 = ${fmt(total * (dsa - apt) / 100)} hours.`], " hours"), chart };
  }),
};
