"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/lib/searchIndex";
import { Icon } from "./Icon";

const popular = ["TCS NQT", "Two Pointers", "Resume", "HR questions", "Off-campus", "DBMS"];

function score(item: SearchItem, words: string[]) {
  const t = item.title.toLowerCase();
  const h = item.hint.toLowerCase();
  let s = 0;
  for (const w of words) {
    if (t.startsWith(w)) s += 5;
    else if (t.includes(w)) s += 3;
    else if (h.includes(w)) s += 1;
    else return 0;
  }
  return s + (item.type === "Page" || item.type === "Company" ? 1 : 0);
}

export function SiteSearch({ index }: { index: SearchItem[] }) {
  const router = useRouter();
  const id = useId();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    return index
      .map((item) => ({ item, s: score(item, words) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 7)
      .map((r) => r.item);
  }, [q, index]);

  const hasQuery = q.trim().length > 0;
  const expanded = open && hasQuery;

  // Close when the user presses or taps anywhere outside the search.
  useEffect(() => {
    if (!expanded) return;
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (root && e.target instanceof Node && !root.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [expanded]);

  // Close the dropdown when this page is hidden (Activity), so it is closed on return.
  useLayoutEffect(() => () => setOpen(false), []);

  const go = (item?: SearchItem) => {
    const target = item ?? results[active];
    if (target) router.push(target.href);
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(e) => {
        // A null relatedTarget (e.g. Safari result clicks) is ignored; pointerdown handles that case.
        const next = e.relatedTarget;
        if (next instanceof Node && !e.currentTarget.contains(next)) setOpen(false);
      }}
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
        className="glass flex items-center gap-2 p-1.5 pl-4"
      >
        <Icon name="search" className="h-5 w-5 shrink-0 text-slate-400" />
        <label htmlFor={`${id}-q`} className="sr-only">
          Search the site
        </label>
        <input
          id={`${id}-q`}
          type="search"
          role="combobox"
          aria-expanded={expanded}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Search companies, topics..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Escape") {
              if (expanded) {
                // Stop the native type="search" clear; close but keep the query.
                e.preventDefault();
                setOpen(false);
              } else {
                setQ("");
              }
            }
          }}
          className="min-h-11 w-full min-w-0 bg-transparent text-base text-ink placeholder:text-slate-400 focus:outline-none"
        />
        <button type="submit" className="btn btn-primary shrink-0 px-4 sm:px-6">
          Search
        </button>
      </form>

      {expanded && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-slate-500">No matches. Try &quot;TCS&quot;, &quot;arrays&quot; or &quot;resume&quot;.</li>
          ) : (
            results.map((r, i) => (
              <li key={`${r.href}-${r.title}`} role="option" aria-selected={i === active}>
                <Link
                  href={r.href}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 ${i === active ? "bg-brand-50" : ""}`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-brand-900">{r.title}</span>
                    <span className="block truncate text-xs text-slate-500">{r.hint}</span>
                  </span>
                  <span className="badge shrink-0 bg-slate-100 text-slate-600">{r.type}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}

      {/* One row that scrolls sideways if needed, instead of wrapping onto a second line */}
      <div className="-mx-1 mt-3 flex items-center gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 text-xs font-medium text-slate-500">Popular:</span>
        {popular.map((p) => (
          <button key={p} type="button" className="chip shrink-0 whitespace-nowrap" onClick={() => {
              setQ(p);
              setOpen(true);
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
