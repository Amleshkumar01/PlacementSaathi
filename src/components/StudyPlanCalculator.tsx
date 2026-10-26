"use client";

import { useId, useState } from "react";
import {
  calculatorLimits,
  categoryNotes,
  levelSplits,
  studyCategories,
  type PrepLevel,
  type StudyCategory,
} from "@/data/studyPlan";

type Result =
  | { ok: true; days: number; hours: number; total: number }
  | { ok: false; message: string };

const round1 = (n: number) => Math.round(n * 10) / 10;

function formatHours(n: number) {
  const r = round1(n);
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

function formatMinutes(hoursPerDay: number) {
  const mins = Math.round(hoursPerDay * 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

const barColors: Record<StudyCategory, string> = {
  DSA: "bg-brand-600",
  Aptitude: "bg-accent-600",
  "Core CS": "bg-emerald-500",
  "Interview Prep": "bg-orange-500",
};

export function calculate(daysInput: string, hoursInput: string): Result {
  const { maxDays, maxHours } = calculatorLimits;
  if (daysInput.trim() === "" || hoursInput.trim() === "") {
    return { ok: false, message: "Please fill in both boxes: how many days you have and how many hours you can give each day." };
  }
  const days = Number(daysInput);
  const hours = Number(hoursInput);
  if (!Number.isFinite(days) || !Number.isFinite(hours)) {
    return { ok: false, message: "Please enter numbers only, like 90 days and 3 hours." };
  }
  if (days <= 0 || hours <= 0) {
    return { ok: false, message: "Days and hours must be more than 0. Negative values won't work." };
  }
  if (!Number.isInteger(days)) {
    return { ok: false, message: "Please enter whole days, like 60 or 90." };
  }
  if (days > maxDays) {
    return { ok: false, message: `Plan up to ${maxDays} days at a time. Longer plans work better split into phases.` };
  }
  if (hours > maxHours) {
    return { ok: false, message: `More than ${maxHours} hours a day isn't realistic. 2-4 hours alongside college is enough.` };
  }
  return { ok: true, days, hours, total: round1(days * hours) };
}

export function StudyPlanCalculator() {
  const id = useId();
  const [days, setDays] = useState(String(calculatorLimits.defaultDays));
  const [hours, setHours] = useState(String(calculatorLimits.defaultHours));
  const [level, setLevel] = useState<PrepLevel>("intermediate");

  const result = calculate(days, hours);
  const split = levelSplits[level].split;

  return (
    <div className="glass grid gap-6 p-5 sm:p-7 lg:grid-cols-[320px_1fr]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
        <label className="block" htmlFor={`${id}-days`}>
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Days until your test / placements</span>
          <input
            id={`${id}-days`}
            type="number"
            inputMode="numeric"
            min={1}
            max={calculatorLimits.maxDays}
            step={1}
            className="input"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            aria-describedby={`${id}-msg`}
          />
        </label>
        <label className="block" htmlFor={`${id}-hours`}>
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Hours you can study per day</span>
          <input
            id={`${id}-hours`}
            type="number"
            inputMode="decimal"
            min={0.5}
            max={calculatorLimits.maxHours}
            step={0.5}
            className="input"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            aria-describedby={`${id}-msg`}
          />
        </label>
        <label className="block" htmlFor={`${id}-level`}>
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Your current preparation level</span>
          <select id={`${id}-level`} className="input" value={level} onChange={(e) => setLevel(e.target.value as PrepLevel)}>
            {(Object.keys(levelSplits) as PrepLevel[]).map((k) => (
              <option key={k} value={k}>
                {levelSplits[k].label}
              </option>
            ))}
          </select>
        </label>
        <p className="text-xs text-slate-500">Calculated in your browser. Nothing is saved.</p>
      </form>

      <div id={`${id}-msg`} aria-live="polite">
        {result.ok ? (
          <div>
            <p className="text-sm font-medium text-slate-600">Your total study time</p>
            <p className="mt-1 text-5xl font-bold tracking-tight text-brand-900" data-testid="calc-total">
              {formatHours(result.total)} <span className="text-xl font-semibold text-slate-500">hours</span>
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {result.days} days x {formatHours(result.hours)} hours per day
            </p>

            <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
              {studyCategories.map((cat) => (
                <div key={cat} className={barColors[cat]} style={{ width: `${split[cat]}%` }} />
              ))}
            </div>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {studyCategories.map((cat) => {
                const pct = split[cat];
                const catTotal = (result.total * pct) / 100;
                const perDay = (result.hours * pct) / 100;
                return (
                  <li key={cat} className="rounded-2xl border border-white/80 bg-white/80 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-semibold text-brand-900">
                        <span className={`h-2.5 w-2.5 rounded-full ${barColors[cat]}`} aria-hidden="true" />
                        {cat}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">{pct}%</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      <strong>{formatHours(catTotal)} hours</strong> total · ~{formatMinutes(perDay)} per day
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{categoryNotes[cat]}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="flex h-full items-center rounded-2xl bg-amber-50 p-5 text-amber-900 ring-1 ring-amber-200">
            <p>
              <span className="font-semibold">Quick check: </span>
              {result.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
