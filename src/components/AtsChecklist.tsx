"use client";

import { useState } from "react";
import { atsChecklist, scoreMessages } from "@/data/resume";
import { Icon } from "./Icon";

const toneStyles = {
  low: "bg-rose-50 text-rose-800 ring-rose-200",
  mid: "bg-amber-50 text-amber-800 ring-amber-200",
  high: "bg-emerald-50 text-emerald-800 ring-emerald-200",
} as const;

export function AtsChecklist() {
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const score = checked.size;
  const total = atsChecklist.length;
  const result = scoreMessages.find((m) => score >= m.min) ?? scoreMessages[scoreMessages.length - 1];
  const pct = (score / total) * 100;

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <fieldset className="card p-2 sm:p-3">
        <legend className="sr-only">ATS resume checklist</legend>
        <ol className="space-y-1">
          {atsChecklist.map((item, i) => {
            const isOn = checked.has(item.id);
            return (
              <li key={item.id}>
                <label
                  className={`flex cursor-pointer gap-3 rounded-xl p-3 transition ${isOn ? "bg-emerald-50/70" : "hover:bg-slate-50"}`}
                >
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-brand-600"
                  />
                  <span>
                    <span className={`font-semibold ${isOn ? "text-emerald-800" : "text-brand-900"}`}>
                      {i + 1}. {item.point}
                    </span>
                    <span className="mt-0.5 block text-sm text-slate-600">{item.why}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ol>
      </fieldset>

      <div className="glass p-6 lg:sticky lg:top-24">
        <p className="text-sm font-medium text-slate-600">Your resume score</p>
        <div className="mt-3 flex items-center gap-5">
          <div
            className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full"
            style={{ background: `conic-gradient(#2563eb ${pct * 3.6}deg, #e2e8f0 0deg)` }}
            role="progressbar"
            aria-label="Checklist progress"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={score}
          >
            <div className="grid h-[76px] w-[76px] place-items-center rounded-full bg-white">
              <p className="text-3xl font-bold text-brand-900" aria-live="polite" aria-atomic="true" data-testid="ats-score">
                {score}
                <span className="text-base text-slate-400">/{total}</span>
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            {total - score === 0 ? "Every point covered." : `${total - score} point${total - score === 1 ? "" : "s"} left to fix.`}
          </p>
        </div>
        <p className={`mt-5 rounded-xl px-3 py-2.5 text-sm ring-1 ${toneStyles[result.tone]}`} aria-live="polite">
          {result.message}
        </p>
        {score > 0 && (
          <button type="button" onClick={() => setChecked(new Set())} className="tap mt-4 text-sm font-medium text-brand-600 hover:underline">
            <Icon name="close" className="h-4 w-4" /> Reset checklist
          </button>
        )}
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          This score is a guide calculated only on this page. It is not a real company ATS score and does not guarantee a
          shortlist. Nothing is saved.
        </p>
      </div>
    </div>
  );
}
