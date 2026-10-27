import type { PracticeQuestion } from "./aptitudePractice";

/** Stable option order keeps server rendering and hydration identical. */
export function mcq(topic: string, index: number, question: string, answer: string, distractors: string[], steps: string[], context: Partial<Pick<PracticeQuestion, "passage" | "data" | "chart">> = {}): PracticeQuestion {
  const wrong = [...new Set(distractors)].filter((option) => option !== answer).slice(0, 3);
  if (wrong.length !== 3) throw new Error(`Three distinct distractors required: ${topic}/${index}`);
  const position = index % 4 as PracticeQuestion["correctIndex"];
  const options = [...wrong];
  options.splice(position, 0, answer);
  return { id: `${topic}-practice-${index + 1}`, question, options: options as PracticeQuestion["options"], correctIndex: position, steps, ...context };
}

export const fmt = (value: number) => Number(value.toFixed(2)).toString();
export const rupees = (value: number) => `₹${fmt(value)}`;

export function numeric(topic: string, index: number, question: string, answer: number, steps: string[], unit = "", candidates?: number[]) {
  const display = (value: number) => `${fmt(value)}${unit}`;
  const delta = Math.max(1, Math.round(Math.abs(answer) / 10));
  const wrong = candidates ?? [answer + delta, answer + 2 * delta, Math.max(0, answer - delta), answer + 3 * delta];
  return mcq(topic, index, question, display(answer), wrong.map(display), steps);
}

export const twenty = (factory: (index: number) => PracticeQuestion) => Array.from({ length: 20 }, (_, index) => factory(index));
export function gcd(a: number, b: number): number { return b ? gcd(b, a % b) : a; }
export function fraction(a: number, b: number) { const divisor = gcd(a, b); return `${a / divisor}/${b / divisor}`; }
export function factorial(n: number): number { return n < 2 ? 1 : n * factorial(n - 1); }
