"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { AptitudeSection } from "@/data/aptitude";
import { WeightBadge } from "./ui";
import { Icon } from "./Icon";

/**
 * Three tabs: Quant, Logical, Verbal. All panels are in the HTML (good for SEO),
 * but only the active one is visible.
 */
export function AptitudeTabs({ sections }: { sections: AptitudeSection[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % sections.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + sections.length) % sections.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = sections.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Aptitude sections" onKeyDown={onKeyDown} className="glass flex gap-1.5 overflow-x-auto p-1.5">
        {sections.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`tab-${s.id}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`panel-${s.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`min-h-11 flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-4 sm:text-base ${
              active === i ? "bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)]" : "text-slate-600 hover:bg-white hover:text-brand-900"
            }`}
          >
            <span className="sm:hidden">{s.label.split(" ")[0].replace("Quantitative", "Quant")}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {sections.map((s, i) => (
        <div
          key={s.id}
          id={`panel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${s.id}`}
          hidden={active !== i}
          tabIndex={0}
          className="mt-10 space-y-12 focus:outline-none"
        >
          <div>
            <h2 className="h2">{s.title}</h2>
            <p className="prose-body mt-3 max-w-3xl">{s.intro}</p>
          </div>

          <section aria-labelledby={`${s.id}-topics`}>
            <h3 id={`${s.id}-topics`} className="h3">
              Topic weightage and shortcuts ({s.topics.length} topics)
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Weightage is approximate, based on common campus test patterns. It can vary by company and season.
            </p>
            <div className="table-wrap mt-4">
              <table className="table table-stack min-w-[640px]">
                <thead>
                  <tr>
                    <th scope="col">Topic</th>
                    <th scope="col">Weightage</th>
                    <th scope="col">Shortcut / Method</th>
                  </tr>
                </thead>
                <tbody>
                  {s.topics.map((t) => (
                    <tr key={t.name}>
                      <td className="font-semibold text-brand-900">{t.name}</td>
                      <td data-label="Weightage">
                        <WeightBadge level={t.weightage} />
                      </td>
                      <td data-label="Shortcut / Method">{t.shortcut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby={`${s.id}-method`} className="card-soft">
            <h3 id={`${s.id}-method`} className="h3">
              Method notes
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {s.methodNotes.map((n) => (
                <li key={n} className="flex gap-2 text-sm text-slate-700">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {n}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby={`${s.id}-solved`}>
            <h3 id={`${s.id}-solved`} className="h3">
              Solved sample questions ({s.solved.length})
            </h3>
            <p className="mt-1 text-sm text-slate-500">Try it yourself first (60 seconds), then open the solution.</p>
            <ol className="mt-4 grid gap-4 lg:grid-cols-2">
              {s.solved.map((q, qi) => (
                <li key={q.id} className="card card-hover flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
                    Q{qi + 1} · {q.topic}
                  </p>
                  <p className="mt-2 font-medium text-brand-900">{q.question}</p>
                  {q.options && (
                    <ul className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                      {q.options.map((o, oi) => (
                        <li key={o} className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700">
                          <span className="font-semibold text-slate-400">{String.fromCharCode(65 + oi)}.</span> {o}
                        </li>
                      ))}
                    </ul>
                  )}
                  <details className="group mt-4 rounded-xl bg-slate-50 p-3">
                    <summary className="-m-3 cursor-pointer list-none p-3 font-semibold text-brand-600 marker:hidden">
                      <span className="group-open:hidden">Show solution</span>
                      <span className="hidden group-open:inline">Hide solution</span>
                    </summary>
                    <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
                      {q.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                    <p className="mt-3 text-sm">
                      <span className="font-semibold text-emerald-700">Answer:</span>{" "}
                      <span className="font-semibold text-brand-900">{q.answer}</span>
                    </p>
                  </details>
                </li>
              ))}
            </ol>
          </section>
        </div>
      ))}
    </div>
  );
}
