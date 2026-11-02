"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { SAMPLE_WEAK_RESUME, analyseResume, type AtsFinding, type Severity } from "@/lib/atsChecker";
import { Icon } from "../Icon";

const order: Record<Severity, number> = { fail: 0, warn: 1, pass: 2 };
const sevStyle: Record<Severity, { dot: string; text: string; label: string }> = {
  fail: { dot: "bg-rose-500", text: "text-rose-700", label: "Fix this" },
  warn: { dot: "bg-amber-500", text: "text-amber-700", label: "Improve" },
  pass: { dot: "bg-emerald-500", text: "text-emerald-700", label: "Good" },
};

function scoreTone(score: number) {
  if (score >= 100) return { ring: "#10b981", text: "text-emerald-700", msg: "Excellent. Now tailor the skills and bullets to each job you apply for." };
  if (score >= 80) return { ring: "#10b981", text: "text-emerald-700", msg: "Strong. Fix the remaining points and tailor it to each job." };
  if (score >= 60) return { ring: "#f59e0b", text: "text-amber-700", msg: "Decent, but a few fixes will make it much easier to read for ATS and recruiters." };
  return { ring: "#f43f5e", text: "text-rose-700", msg: "Needs work. Start with the red items below." };
}

export function AtsChecker() {
  const [text, setText] = useState("");
  const [jd, setJd] = useState("");
  const [submitted, setSubmitted] = useState<{ text: string; jd: string } | null>(null);
  const [fileMsg, setFileMsg] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const report = useMemo(() => (submitted ? analyseResume(submitted.text, submitted.jd) : null), [submitted]);

  const run = (t = text, j = jd) => {
    if (!t.trim()) return;
    setSubmitted({ text: t, jd: j });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const onFile = async (file: File | undefined) => {
    setFileMsg("");
    if (!file) return;
    if (!/\.txt$/i.test(file.name) && file.type !== "text/plain") {
      setFileMsg("Only .txt files can be read here. For a PDF or Word file, copy all its text and paste it below.");
      return;
    }
    if (file.size > 200_000) {
      setFileMsg("That file is too large for a resume. Paste the text instead.");
      return;
    }
    setText(await file.text());
    setFileMsg(`Loaded ${file.name}.`);
  };

  const trySample = () => {
    setText(SAMPLE_WEAK_RESUME);
    setJd("");
    run(SAMPLE_WEAK_RESUME, "");
  };

  const findings = report ? [...report.findings].sort((a, b) => order[a.severity] - order[b.severity]) : [];
  const tone = report ? scoreTone(report.score) : null;
  const tooShort = submitted && submitted.text.trim().split(/\s+/).length < 40;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
      {/* Input */}
      <form
        className="card min-w-0"
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
      >
        <h2 className="h3">1. Paste your resume text</h2>
        <p className="mt-1 text-sm text-slate-500">
          Open your resume PDF, press <kbd className="rounded border border-slate-300 px-1">Ctrl</kbd>+
          <kbd className="rounded border border-slate-300 px-1">A</kbd> then <kbd className="rounded border border-slate-300 px-1">Ctrl</kbd>+
          <kbd className="rounded border border-slate-300 px-1">C</kbd>, and paste it here. If the text comes out jumbled, ATS software sees it jumbled
          too.
        </p>
        <label className="mt-3 block">
          <span className="sr-only">Resume text</span>
          <textarea
            className="input min-h-64 resize-y py-2.5 font-mono text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your full resume text here…"
            maxLength={20000}
          />
        </label>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>{text.trim() ? `${text.trim().split(/\s+/).length} words` : "Nothing pasted yet"}</span>
          <label className="tap cursor-pointer font-medium text-brand-600 hover:underline">
            Upload .txt
            <input type="file" accept=".txt,text/plain" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
        </div>
        {fileMsg && <p className="mt-2 text-sm text-slate-600" aria-live="polite">{fileMsg}</p>}

        <h2 className="h3 mt-6">2. Job description (optional)</h2>
        <p className="mt-1 text-sm text-slate-500">Paste a job post to see which of its skills your resume is missing.</p>
        <label className="mt-3 block">
          <span className="sr-only">Job description</span>
          <textarea className="input min-h-28 resize-y py-2.5 text-sm" value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the job description…" maxLength={20000} />
        </label>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button type="submit" className="btn btn-primary flex-1" disabled={!text.trim()}>
            Check my resume <Icon name="arrow" className="h-4 w-4" />
          </button>
          <button type="button" onClick={trySample} className="btn btn-secondary">
            Try a sample resume
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-500">Checked in your browser. Your resume is never uploaded or saved.</p>
      </form>

      {/* Report */}
      <div ref={resultRef} className="min-w-0 scroll-mt-24" aria-live="polite">
        {!report ? (
          <div className="card-soft flex min-h-64 flex-col items-center justify-center text-center">
            <span className="icon-tile bg-brand-600">
              <Icon name="search" />
            </span>
            <p className="mt-4 font-semibold text-brand-900">Your ATS report will appear here</p>
            <p className="mt-1 max-w-sm text-sm text-slate-600">
              Paste your resume and press &quot;Check my resume&quot;, or try the sample to see how it works.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <section className="card" aria-labelledby="score-heading">
              <div className="flex items-center gap-5">
                <div
                  className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full"
                  style={{ background: `conic-gradient(${tone!.ring} ${report.score * 3.6}deg, #e2e8f0 0deg)` }}
                  role="img"
                  aria-label={`ATS score ${report.score} out of 100`}
                >
                  <div className="grid h-[90px] w-[90px] place-items-center rounded-full bg-white">
                    <p className="text-3xl font-bold text-brand-900" data-testid="ats-checker-score">
                      {report.score}
                      <span className="text-sm text-slate-400">/100</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h2 id="score-heading" className="h3">
                    Your ATS score
                  </h2>
                  <p className={`mt-1 text-sm font-medium ${tone!.text}`}>{tone!.msg}</p>
                  <p className="mt-1 text-xs text-slate-500">About {report.wordCount} words checked.</p>
                </div>
              </div>
              {tooShort && (
                <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">
                  This looks too short to be a full resume. Paste the whole text for an accurate check.
                </p>
              )}
              <ul className="mt-5 space-y-2.5">
                {report.byCategory.filter((c) => c.total > 0).map((c) => (
                  <li key={c.category}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{c.category}</span>
                      <span className="text-slate-500">
                        {c.earned}/{c.total}
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                      <div className="h-full rounded-full bg-brand-600" style={{ width: `${(c.earned / c.total) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card" aria-labelledby="findings-heading">
              <h2 id="findings-heading" className="h3">
                {findings.some((x) => x.severity !== "pass") ? "What to fix" : "Detailed report"}
              </h2>
              <ul className="mt-4 divide-y divide-slate-100">
                {findings.map((f) => (
                  <Finding key={f.id} f={f} />
                ))}
              </ul>
            </section>

            {report.jd && report.jd.found.length + report.jd.missing.length > 0 && (
              <section className="card" aria-labelledby="jd-heading">
                <h2 id="jd-heading" className="h3">
                  Job description match
                </h2>
                <KeywordRow title={`In your resume (${report.jd.found.length})`} words={report.jd.found} ok />
                <KeywordRow title={`Missing (${report.jd.missing.length})`} words={report.jd.missing} />
                {report.jd.missing.length > 0 && (
                  <p className="mt-3 text-sm text-slate-600">Add a missing skill only if you genuinely know it. Interviewers ask about everything on your resume.</p>
                )}
              </section>
            )}

            <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-600 p-5 text-white">
              <p className="font-semibold">Want a clean, ATS-friendly format without the effort?</p>
              <p className="mt-1 text-sm text-brand-100">Build it in the free resume builder with 3 single-column templates and download a PDF.</p>
              <Link href="/resume#builder" className="btn btn-accent mt-4">
                Open resume builder <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Finding({ f }: { f: AtsFinding }) {
  const s = sevStyle[f.severity];
  return (
    <li className="flex gap-3 py-3 first:pt-0 last:pb-0">
      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${s.dot}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm">
          <span className="font-semibold text-brand-900">{f.label}</span>{" "}
          <span className={`text-xs font-semibold ${s.text}`}>· {s.label}</span>
        </p>
        <p className="mt-0.5 text-sm break-words text-slate-600">{f.detail}</p>
      </div>
    </li>
  );
}

function KeywordRow({ title, words, ok }: { title: string; words: string[]; ok?: boolean }) {
  if (!words.length) return null;
  return (
    <div className="mt-3">
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {words.map((w) => (
          <li key={w} className={`badge ${ok ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"}`}>
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
