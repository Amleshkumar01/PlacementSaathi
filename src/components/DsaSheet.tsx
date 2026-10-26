"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { difficulties, dsaPatterns, type Difficulty, type DsaPattern, type DsaProblem } from "@/data/dsa";
import { companyTags, type CompanyTag } from "@/data/companies";
import { DifficultyBadge } from "./ui";
import { Icon } from "./Icon";

const ALL = "all";

type Filters = {
  q: string;
  pattern: DsaPattern | typeof ALL;
  difficulty: Difficulty | typeof ALL;
  company: CompanyTag | typeof ALL;
};

const emptyFilters: Filters = { q: "", pattern: ALL, difficulty: ALL, company: ALL };

type ParamsLike = Pick<URLSearchParams, "get">;

/** Reads ?q=, ?pattern=, ?difficulty=, ?company= so other pages can deep-link into a filter. */
function filtersFromParams(params: ParamsLike): Filters {
  const pattern = dsaPatterns.find((p) => p.name.toLowerCase() === params.get("pattern")?.toLowerCase());
  const difficulty = difficulties.find((d) => d.toLowerCase() === params.get("difficulty")?.toLowerCase());
  const company = companyTags.find((c) => c.toLowerCase() === params.get("company")?.toLowerCase());
  return {
    q: params.get("q") ?? "",
    pattern: pattern?.name ?? ALL,
    difficulty: difficulty ?? ALL,
    company: company ?? ALL,
  };
}

/** Canonical query string for a set of filters (fixed order, "all" values omitted). */
function filterKey(f: Filters): string {
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  if (f.pattern !== ALL) params.set("pattern", f.pattern);
  if (f.difficulty !== ALL) params.set("difficulty", f.difficulty);
  if (f.company !== ALL) params.set("company", f.company);
  return params.toString();
}

const noop = () => {};

export function DsaSheet({ problems }: { problems: DsaProblem[] }) {
  // The fallback is prerendered with the full, unfiltered list. URL filters apply on the client.
  return (
    <Suspense fallback={<DsaSheetView problems={problems} filters={emptyFilters} onChange={noop} />}>
      <DsaSheetFromUrl problems={problems} />
    </Suspense>
  );
}

function DsaSheetFromUrl({ problems }: { problems: DsaProblem[] }) {
  const searchParams = useSearchParams();
  const urlFilters = filtersFromParams(searchParams);
  const urlKey = filterKey(urlFilters);
  const [filters, setFilters] = useState<Filters>(urlFilters);
  const [syncedKey, setSyncedKey] = useState(urlKey);

  // The URL changed through navigation (link, back/forward), not through our own replaceState write.
  if (urlKey !== syncedKey) {
    setSyncedKey(urlKey);
    setFilters(urlFilters);
  }

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    const qs = filterKey(next);
    setFilters(next);
    setSyncedKey(qs);
    window.history.replaceState(null, "", (qs ? `?${qs}` : window.location.pathname) + "#sheet");
  };

  return <DsaSheetView problems={problems} filters={filters} onChange={update} />;
}

function DsaSheetView({
  problems,
  filters,
  onChange: update,
}: {
  problems: DsaProblem[];
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}) {
  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return problems.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q)) &&
        (filters.pattern === ALL || p.pattern === filters.pattern) &&
        (filters.difficulty === ALL || p.difficulty === filters.difficulty) &&
        (filters.company === ALL || p.companies.includes(filters.company)),
    );
  }, [problems, filters]);

  const hasFilters =
    filters.q !== "" || filters.pattern !== ALL || filters.difficulty !== ALL || filters.company !== ALL;

  return (
    <div>
      <div className="glass grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        <label className="block sm:col-span-2 lg:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Search problems</span>
          <span className="relative block">
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              className="input pl-9"
              placeholder="e.g. Two Sum"
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Pattern</span>
          <select className="input" value={filters.pattern} onChange={(e) => update({ pattern: e.target.value as Filters["pattern"] })}>
            <option value={ALL}>All patterns</option>
            {dsaPatterns.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Difficulty</span>
          <select className="input" value={filters.difficulty} onChange={(e) => update({ difficulty: e.target.value as Filters["difficulty"] })}>
            <option value={ALL}>All levels</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Company</span>
          <select className="input" value={filters.company} onChange={(e) => update({ company: e.target.value as Filters["company"] })}>
            <option value={ALL}>All companies</option>
            {companyTags.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-600" aria-live="polite">
          Showing <strong className="text-brand-900">{results.length}</strong> of {problems.length} problems
        </p>
        {hasFilters && (
          <button type="button" className="tap text-sm font-medium text-brand-600 hover:underline" onClick={() => update(emptyFilters)}>
            Reset filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="card-soft mt-3 py-10 text-center">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
            <Icon name="search" className="h-6 w-6" />
          </span>
          <p className="mt-3 font-semibold text-brand-900">No problems match these filters.</p>
          <p className="mt-1 text-sm text-slate-600">Check the spelling or loosen a filter. More problems are added regularly.</p>
          <button type="button" className="btn btn-secondary mt-5" onClick={() => update(emptyFilters)}>
            Show all problems
          </button>
        </div>
      ) : (
        <>
        {/* Phones: card list (no sideways scrolling) */}
        <ol className="mt-3 space-y-3 sm:hidden" aria-label="DSA problems">
          {results.map((p, i) => (
            <li key={p.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-slate-400">#{i + 1} · {p.pattern}</span>
                <DifficultyBadge level={p.difficulty} />
              </div>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-1 flex min-h-10 items-center gap-1.5 text-base font-semibold text-brand-900">
                  {p.name}
                  <Icon name="external" className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : (
                <p className="mt-1 text-base font-semibold text-brand-900">{p.name}</p>
              )}
              <p className="text-sm text-slate-600">{p.why}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.companies.map((c) => (
                  <span key={c} className="badge bg-slate-100 text-slate-700">
                    {c}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <div className="table-wrap mt-3 hidden sm:block">
          <table className="table min-w-[760px]">
            <caption className="sr-only">DSA practice problems with pattern, difficulty and company tags</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Problem</th>
                <th scope="col">Pattern</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Asked in (similar)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((p, i) => (
                <tr key={p.id}>
                  <td className="text-slate-400">{i + 1}</td>
                  <td>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="tap font-semibold text-brand-900 hover:text-brand-600">
                        {p.name}
                        <Icon name="external" className="h-3.5 w-3.5 text-slate-400" />
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <span className="font-semibold text-brand-900">{p.name}</span>
                    )}
                    <p className="mt-1 text-xs text-slate-500">{p.why}</p>
                  </td>
                  <td className="whitespace-nowrap">{p.pattern}</td>
                  <td>
                    <DifficultyBadge level={p.difficulty} />
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {p.companies.map((c) => (
                        <span key={c} className="badge bg-slate-100 text-slate-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
}
