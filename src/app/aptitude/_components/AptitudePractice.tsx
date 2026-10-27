"use client";

import { useRef, useState } from "react";
import type { PracticeQuestion } from "@/data/aptitudePractice";
import { Icon } from "@/components/Icon";
import { QuestionContext } from "./QuestionContext";

export function AptitudePractice({ questions }: { questions: PracticeQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const question = questions[current];
  const selected = answers[question.id];
  const answered = selected !== undefined;
  const correct = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const answeredCount = Object.keys(answers).length;

  function focusHeading() {
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function moveTo(index: number) {
    setCurrent(index);
    focusHeading();
  }

  function retry() {
    setAnswers({});
    setCurrent(0);
    setFinished(false);
    focusHeading();
  }

  if (finished) {
    return (
      <div className="card min-w-0 p-4 break-words sm:p-6">
        <span className="icon-tile bg-brand-600"><Icon name="trophy" /></span>
        <h2 ref={headingRef} tabIndex={-1} className="h2 mt-4 focus:outline-none">Practice complete!</h2>
        <p className="mt-3 text-lg font-semibold text-brand-900">You got {correct} of {questions.length} correct.</p>
        <p className="mt-2 text-sm text-slate-600">Review your attempted answers, then try again to practise the method.</p>
        <ul className="mt-6 space-y-3" aria-label="Your results">
          {questions.map((q, index) => {
            const isCorrect = answers[q.id] === q.correctIndex;
            return <li key={q.id} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-brand-900">Question {index + 1}: <span className={isCorrect ? "text-emerald-700" : "text-rose-700"}>{isCorrect ? "Correct" : "Incorrect"}</span></p>
              <p className="mt-1 text-sm text-slate-600">Your answer: {q.options[answers[q.id]]}. Correct answer: {q.options[q.correctIndex]}.</p>
            </li>;
          })}
        </ul>
        <button type="button" onClick={retry} className="btn btn-primary mt-6 min-h-12 w-full sm:w-auto">Try again <Icon name="arrow" className="h-4 w-4" /></button>
      </div>
    );
  }

  return (
    <div className="card min-w-0 max-w-full p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="font-semibold text-slate-600">Question {current + 1} of {questions.length}</p>
        <p className="badge bg-emerald-50 text-emerald-800">Correct: {correct}</p>
      </div>
      <progress value={answeredCount} max={questions.length} aria-label="Questions answered" className="mt-4 h-2 w-full overflow-hidden rounded-full accent-brand-600" />
      <fieldset className="mt-5 w-full min-w-0 max-w-full sm:mt-6" disabled={answered}>
        <legend className="w-full min-w-0 max-w-full">
          <h2 ref={headingRef} tabIndex={-1} className="scroll-mt-24 text-base leading-relaxed font-semibold break-words text-brand-900 focus:outline-none sm:text-xl">{question.question}</h2>
        </legend>
        <QuestionContext question={question} />
        <p className="mt-4 text-sm text-slate-500">Select an option to check your answer.</p>
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
          {question.options.map((option, index) => {
            const isCorrect = answered && index === question.correctIndex;
            const isWrong = answered && selected === index && !isCorrect;
            return (
              <label key={`${question.id}-${index}`} className={`flex min-h-14 min-w-0 items-start gap-3 rounded-xl border p-3 text-sm leading-relaxed transition has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600 sm:p-4 ${isCorrect ? "border-emerald-400 bg-emerald-50 text-emerald-900" : isWrong ? "border-rose-400 bg-rose-50 text-rose-900" : "border-slate-200 text-slate-700"} ${answered ? "cursor-default" : "cursor-pointer hover:border-brand-300 hover:bg-brand-50"}`}>
                <input type="radio" name={question.id} value={index} checked={selected === index} onChange={() => setAnswers((previous) => previous[question.id] === undefined ? { ...previous, [question.id]: index } : previous)} className="mt-1 h-4 w-4 shrink-0 accent-brand-600" />
                <span className="min-w-0 flex-1 break-words"><span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
                  {isCorrect && <span className="mt-1 block text-xs font-semibold">Correct answer</span>}
                  {isWrong && <span className="mt-1 block text-xs font-semibold">Your answer · Incorrect</span>}
                </span>
                {(isCorrect || isWrong) && <Icon name={isCorrect ? "check" : "close"} className="mt-1 h-4 w-4 shrink-0" />}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-5">
        {answered && <p className={`rounded-xl border p-3 text-sm leading-relaxed font-semibold break-words sm:p-4 ${selected === question.correctIndex ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}>
          {selected === question.correctIndex ? "Correct! Well done." : `Incorrect. The correct answer is ${String.fromCharCode(65 + question.correctIndex)}. ${question.options[question.correctIndex]}.`}
        </p>}
      </div>
      {answered && (
        <div className="card-soft mt-4 min-w-0 p-4 break-words sm:p-5">
          <h3 className="font-semibold text-brand-900">Step-by-step solution</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">{question.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </div>
      )}
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:flex sm:items-center sm:justify-between">
        <button type="button" disabled={current === 0} onClick={() => moveTo(current - 1)} className="btn btn-secondary min-h-12 min-w-0 px-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:text-base">Previous</button>
        <button type="button" disabled={!answered} onClick={() => { if (current === questions.length - 1) { setFinished(true); focusHeading(); } else moveTo(current + 1); }} className="btn btn-primary min-h-12 min-w-0 px-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:text-base">
          {current === questions.length - 1 ? "See results" : "Next question"} <Icon name="arrow" className="hidden h-4 w-4 shrink-0 sm:block" />
        </button>
      </div>
      <noscript><p className="mt-4 text-sm text-slate-600">Enable JavaScript to answer questions and see feedback and solutions after each attempt.</p></noscript>
    </div>
  );
}
