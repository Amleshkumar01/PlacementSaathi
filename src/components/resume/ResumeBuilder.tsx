"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  STORAGE_KEY,
  blankEducation,
  blankExperience,
  blankProject,
  emptyResume,
  exampleResume,
  fileBaseName,
  hasText,
  matchKeywords,
  normalizeResume,
  runChecks,
  toLines,
  toPlainText,
  type EducationItem,
  type ExperienceItem,
  type ProjectItem,
  type ResumeData,
} from "@/lib/resume";
import { Icon } from "../Icon";
import { ResumePreview } from "./ResumePreview";

const PAGE_W = 794;
const PAGE_H = 1123;
const VERBS = ["Built", "Developed", "Designed", "Implemented", "Reduced", "Improved", "Automated", "Led"];

type ListKey = "education" | "projects" | "experience";
type Item<K extends ListKey> = ResumeData[K][number];

export function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [loaded, setLoaded] = useState(false);
  const [experienceFirst, setExperienceFirst] = useState(false);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [jd, setJd] = useState("");
  const [status, setStatus] = useState("");

  // Load a saved draft from this browser only. Nothing leaves the device.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { data?: unknown; experienceFirst?: unknown };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(normalizeResume(saved.data));
        setExperienceFirst(saved.experienceFirst === true);
      }
    } catch {
      /* ignore broken drafts */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, experienceFirst }));
    } catch {
      /* storage full or blocked: the builder still works */
    }
  }, [data, experienceFirst, loaded]);

  const flash = (msg: string) => {
    setStatus(msg);
    window.setTimeout(() => setStatus(""), 2500);
  };

  // ----- updates ---------------------------------------------------------
  const set = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => setData((d) => ({ ...d, [key]: value }));
  const setSkill = (key: keyof ResumeData["skills"], value: string) => setData((d) => ({ ...d, skills: { ...d.skills, [key]: value } }));
  const updateItem = <K extends ListKey>(key: K, id: string, patch: Partial<Item<K>>) =>
    setData((d) => ({ ...d, [key]: (d[key] as Item<K>[]).map((it) => (it.id === id ? { ...it, ...patch } : it)) }));
  const addItem = <K extends ListKey>(key: K, item: Item<K>) => setData((d) => ({ ...d, [key]: [...(d[key] as Item<K>[]), item] }));
  const removeItem = (key: ListKey, id: string) => setData((d) => ({ ...d, [key]: (d[key] as { id: string }[]).filter((it) => it.id !== id) }));
  const moveItem = (key: ListKey, id: string, dir: -1 | 1) =>
    setData((d) => {
      const list = [...(d[key] as { id: string }[])];
      const i = list.findIndex((it) => it.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= list.length) return d;
      [list[i], list[j]] = [list[j], list[i]];
      return { ...d, [key]: list };
    });

  const hasContent = hasText(data.name, data.email, data.summary) || data.projects.some((p) => hasText(p.name, p.bullets));

  const loadExample = () => {
    if (hasContent && !window.confirm("Replace what you have typed with the example resume?")) return;
    setData(exampleResume());
    setExperienceFirst(false);
    flash("Example loaded. Replace every detail with your own.");
  };
  const clearAll = () => {
    if (!window.confirm("Clear the whole resume? This cannot be undone.")) return;
    setData(emptyResume());
    setJd("");
    flash("Resume cleared.");
  };

  // ----- export ----------------------------------------------------------
  const plainText = useMemo(() => toPlainText(data), [data]);
  const baseName = fileBaseName(data.name);

  const downloadPdf = () => {
    const previous = document.title;
    document.title = baseName; // becomes the default PDF file name
    const restore = () => {
      document.title = previous;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  };
  const downloadTxt = () => {
    const url = URL.createObjectURL(new Blob([plainText], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      flash("Resume text copied.");
    } catch {
      flash("Copy failed. Use Download .txt instead.");
    }
  };

  // ----- checks ----------------------------------------------------------
  const checks = useMemo(() => runChecks(data), [data]);
  const passed = checks.filter((c) => c.pass).length;
  const keywords = useMemo(() => (jd.trim() ? matchKeywords(jd, plainText) : null), [jd, plainText]);

  // ----- preview scaling and page fit -----------------------------------
  const frameRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [contentH, setContentH] = useState(PAGE_H);

  useEffect(() => {
    const frame = frameRef.current;
    const paper = paperRef.current;
    if (!frame || !paper) return;
    const ro = new ResizeObserver(() => {
      if (frame.clientWidth > 0) setScale(Math.min(1, frame.clientWidth / PAGE_W));
      setContentH(paper.scrollHeight);
    });
    ro.observe(frame);
    ro.observe(paper);
    return () => ro.disconnect();
  }, []);

  const overflowPx = Math.max(0, contentH - PAGE_H);
  const fitsOnePage = overflowPx <= 2;

  return (
    <div>
      {/* Toolbar */}
      <div className="glass z-20 flex flex-wrap lg:sticky lg:top-16 items-center gap-2 p-2 print:hidden sm:p-3">
        <div role="tablist" aria-label="Builder view" className="flex rounded-xl bg-slate-100 p-1 lg:hidden">
          {(["edit", "preview"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`min-h-10 rounded-lg px-4 text-sm font-semibold capitalize ${tab === t ? "bg-white text-brand-900 shadow-sm" : "text-slate-600"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <button type="button" onClick={loadExample} className="btn btn-secondary min-h-10 px-3 py-2 text-sm">
          Load example
        </button>
        <button type="button" onClick={clearAll} className="btn btn-secondary min-h-10 px-3 py-2 text-sm">
          Clear
        </button>
        <div className="ml-auto flex flex-wrap gap-2">
          <button type="button" onClick={downloadTxt} className="btn btn-secondary min-h-10 px-3 py-2 text-sm">
            .txt
          </button>
          <button type="button" onClick={downloadPdf} className="btn btn-primary min-h-10 px-4 py-2 text-sm">
            <Icon name="file" className="h-4 w-4" /> Download PDF
          </button>
        </div>
        <p className="w-full px-1 text-xs text-slate-500" aria-live="polite">
          {status || (loaded ? "Saved automatically in this browser only. Nothing is uploaded." : "\u00a0")}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start print:block">
        {/* ---------------- Form ---------------- */}
        <div className={`min-w-0 space-y-5 print:hidden ${tab === "edit" ? "" : "hidden lg:block"}`}>
          <FormCard title="1. Contact details" hint="Only what a recruiter needs. No photo, date of birth or full address.">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name" value={data.name} onChange={(v) => set("name", v)} placeholder="Riya Sharma" autoComplete="name" className="sm:col-span-2" />
              <Field label="Email" type="email" value={data.email} onChange={(v) => set("email", v)} placeholder="riya.sharma@gmail.com" autoComplete="email" />
              <Field label="Phone" type="tel" value={data.phone} onChange={(v) => set("phone", v)} placeholder="+91 98765 43210" autoComplete="tel" />
              <Field label="City" value={data.location} onChange={(v) => set("location", v)} placeholder="Pune, Maharashtra" />
              <Field label="LinkedIn" value={data.linkedin} onChange={(v) => set("linkedin", v)} placeholder="linkedin.com/in/riyasharma" />
              <Field label="GitHub" value={data.github} onChange={(v) => set("github", v)} placeholder="github.com/riyasharma" />
              <Field label="Portfolio (optional)" value={data.portfolio} onChange={(v) => set("portfolio", v)} placeholder="riyasharma.dev" />
            </div>
          </FormCard>

          <FormCard title="2. Summary (optional)" hint="2-3 lines: branch, strongest skill and one real achievement. Skip it if you have nothing specific to say.">
            <Area
              label="Summary"
              value={data.summary}
              onChange={(v) => set("summary", v)}
              rows={3}
              placeholder="Final-year BTech CSE student with strong Java and DSA skills. Built 2 full-stack projects with React and Spring Boot."
            />
          </FormCard>

          <FormCard title="3. Education" hint="Latest first. Add 12th / 10th only if companies ask for it.">
            <ListEditor
              items={data.education}
              itemName="education"
              onAdd={() => addItem("education", blankEducation())}
              onRemove={(id) => removeItem("education", id)}
              onMove={(id, dir) => moveItem("education", id, dir)}
              render={(e: EducationItem) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Degree" value={e.degree} onChange={(v) => updateItem("education", e.id, { degree: v })} placeholder="B.Tech in Computer Science and Engineering" className="sm:col-span-2" />
                  <Field label="College / School" value={e.school} onChange={(v) => updateItem("education", e.id, { school: v })} placeholder="ABC Institute of Technology" className="sm:col-span-2" />
                  <Field label="City" value={e.location} onChange={(v) => updateItem("education", e.id, { location: v })} placeholder="Pune" />
                  <Field label="CGPA / %" value={e.score} onChange={(v) => updateItem("education", e.id, { score: v })} placeholder="CGPA 8.1/10" />
                  <Field label="Start year" value={e.start} onChange={(v) => updateItem("education", e.id, { start: v })} placeholder="2022" />
                  <Field label="End year (expected)" value={e.end} onChange={(v) => updateItem("education", e.id, { end: v })} placeholder="2026" />
                </div>
              )}
            />
          </FormCard>

          <FormCard title="4. Technical skills" hint="Separate with commas. List only what you can answer interview questions on.">
            <div className="grid gap-3">
              <Field label="Languages" value={data.skills.languages} onChange={(v) => setSkill("languages", v)} placeholder="Java, Python, C++, SQL" />
              <Field label="Frameworks / Libraries" value={data.skills.frameworks} onChange={(v) => setSkill("frameworks", v)} placeholder="React, Spring Boot, Node.js" />
              <Field label="Tools / Platforms" value={data.skills.tools} onChange={(v) => setSkill("tools", v)} placeholder="Git, GitHub, MySQL, Postman, Linux" />
              <Field label="CS Fundamentals" value={data.skills.fundamentals} onChange={(v) => setSkill("fundamentals", v)} placeholder="Data Structures and Algorithms, OOP, DBMS, OS, Computer Networks" />
            </div>
          </FormCard>

          <FormCard title="5. Projects" hint="Your best 2-3. Formula for each bullet: action verb + what you built + technology + real result.">
            <ListEditor
              items={data.projects}
              itemName="project"
              max={5}
              onAdd={() => addItem("projects", blankProject())}
              onRemove={(id) => removeItem("projects", id)}
              onMove={(id, dir) => moveItem("projects", id, dir)}
              render={(p: ProjectItem) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Project name" value={p.name} onChange={(v) => updateItem("projects", p.id, { name: v })} placeholder="Campus Placement Tracker" />
                  <Field label="Technologies" value={p.tech} onChange={(v) => updateItem("projects", p.id, { tech: v })} placeholder="React, Node.js, MongoDB" />
                  <Field label="GitHub / live link" value={p.link} onChange={(v) => updateItem("projects", p.id, { link: v })} placeholder="github.com/you/project" className="sm:col-span-2" />
                  <BulletArea value={p.bullets} onChange={(v) => updateItem("projects", p.id, { bullets: v })} className="sm:col-span-2" />
                </div>
              )}
            />
          </FormCard>

          <FormCard title="6. Experience / internships (optional)" hint="Internships, freelance work or a real role in a club. Leave empty if you have none.">
            <label className="mb-3 flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={experienceFirst} onChange={(e) => setExperienceFirst(e.target.checked)} className="h-4 w-4 accent-brand-600" />
              Show experience above projects
            </label>
            <ListEditor
              items={data.experience}
              itemName="experience"
              max={4}
              onAdd={() => addItem("experience", blankExperience())}
              onRemove={(id) => removeItem("experience", id)}
              onMove={(id, dir) => moveItem("experience", id, dir)}
              render={(e: ExperienceItem) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Role" value={e.role} onChange={(v) => updateItem("experience", e.id, { role: v })} placeholder="Web Development Intern" />
                  <Field label="Company / organisation" value={e.company} onChange={(v) => updateItem("experience", e.id, { company: v })} placeholder="Company name" />
                  <Field label="City / Remote" value={e.location} onChange={(v) => updateItem("experience", e.id, { location: v })} placeholder="Remote" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start" value={e.start} onChange={(v) => updateItem("experience", e.id, { start: v })} placeholder="May 2025" />
                    <Field label="End" value={e.end} onChange={(v) => updateItem("experience", e.id, { end: v })} placeholder="Jul 2025" />
                  </div>
                  <BulletArea value={e.bullets} onChange={(v) => updateItem("experience", e.id, { bullets: v })} className="sm:col-span-2" />
                </div>
              )}
            />
          </FormCard>

          <FormCard title="7. Achievements and certifications (optional)" hint="One per line. Only things you can show proof of.">
            <div className="grid gap-3">
              <Area label="Achievements" value={data.achievements} onChange={(v) => set("achievements", v)} rows={3} placeholder={"Solved 300+ problems on LeetCode\nTop 10 in college hackathon (120 teams)"} />
              <Area label="Certifications" value={data.certifications} onChange={(v) => set("certifications", v)} rows={2} placeholder="NPTEL: Database Management System (Elite)" />
            </div>
          </FormCard>

          {/* ATS check */}
          <section aria-labelledby="ats-check" className="card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id="ats-check" className="h3">
                ATS check
              </h3>
              <span className={`badge px-3 py-1 text-sm ${passed === checks.length ? "bg-emerald-50 text-emerald-700" : "bg-brand-50 text-brand-700"}`} aria-live="polite">
                {passed} / {checks.length} passed
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Updates as you type. A guide only, not a real company ATS score.</p>
            <ul className="mt-4 space-y-2.5">
              {checks.map((c) => (
                <li key={c.id} className="flex gap-3 text-sm">
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${c.pass ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}
                    aria-hidden="true"
                  >
                    <Icon name={c.pass ? "check" : "close"} className="h-3 w-3" />
                  </span>
                  <span>
                    <span className={c.pass ? "text-slate-700" : "font-medium text-brand-900"}>{c.label}</span>
                    <span className="sr-only">{c.pass ? " (passed)" : " (not yet)"}</span>
                    {!c.pass && <span className="mt-0.5 block text-slate-500">{c.hint}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Job description match */}
          <section aria-labelledby="jd-match" className="card">
            <h3 id="jd-match" className="h3">
              Match a job description
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Paste the job post. You will see which skills it asks for and which are missing from your resume.
            </p>
            <label className="mt-3 block">
              <span className="sr-only">Job description</span>
              <textarea className="input min-h-32 resize-y" value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the job description here…" />
            </label>
            {keywords && (
              <div className="mt-4 space-y-3 text-sm">
                {keywords.found.length + keywords.missing.length === 0 ? (
                  <p className="text-slate-500">No common technical skills found in this text.</p>
                ) : (
                  <>
                    <KeywordList title={`In your resume (${keywords.found.length})`} words={keywords.found} tone="ok" />
                    <KeywordList title={`Missing (${keywords.missing.length})`} words={keywords.missing} tone="miss" />
                    {keywords.missing.length > 0 && (
                      <p className="rounded-xl bg-amber-50 px-3 py-2 text-amber-900 ring-1 ring-amber-200">
                        Add a missing skill only if you really know it. Interviewers ask about every word on your resume.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </section>
        </div>

        {/* ---------------- Preview ---------------- */}
        <div className={`min-w-0 lg:sticky lg:top-40 ${tab === "preview" ? "" : "hidden lg:block"} print:block`}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 print:hidden">
            <p className="text-sm font-semibold text-brand-900">Live preview (A4)</p>
            <p className={`badge px-3 py-1 text-xs ${fitsOnePage ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`} aria-live="polite">
              {fitsOnePage ? "Fits on one page" : `About ${Math.ceil(overflowPx / 16)} lines over one page`}
            </p>
          </div>
          <div
            ref={frameRef}
            className="rs-frame relative overflow-hidden rounded-xl bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-200"
            style={{ height: Math.max(PAGE_H, contentH) * scale }}
          >
            <div id="resume-print" style={{ width: PAGE_W, transform: `scale(${scale})`, transformOrigin: "top left" }}>
              <div ref={paperRef}>
                <ResumePreview data={data} experienceFirst={experienceFirst} />
              </div>
            </div>
            {!fitsOnePage && (
              <div
                className="pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-amber-500 print:hidden"
                style={{ top: PAGE_H * scale }}
                aria-hidden="true"
              >
                <span className="absolute right-2 top-1 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">Page 1 ends</span>
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 print:hidden">
            <button type="button" onClick={downloadPdf} className="btn btn-primary min-h-10 flex-1 px-4 py-2 text-sm">
              Download PDF
            </button>
            <button type="button" onClick={copyText} className="btn btn-secondary min-h-10 px-4 py-2 text-sm">
              Copy text
            </button>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 print:hidden">
            In the print window choose <strong>Save as PDF</strong>, paper size <strong>A4</strong>, and turn off{" "}
            <strong>Headers and footers</strong>. The PDF keeps real, selectable text, which ATS software can read.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small form building blocks
// ---------------------------------------------------------------------------

function FormCard({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <section className="card">
      <h3 className="h3">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <input type={type} className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete ?? "off"} />
    </label>
  );
}

function Area({ label, value, onChange, rows, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows: number; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <textarea className="input min-h-0 resize-y py-2.5" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

function BulletArea({ value, onChange, className = "" }: { value: string; onChange: (v: string) => void; className?: string }) {
  const count = toLines(value).length;
  const addVerb = (verb: string) => onChange(value.trim() ? `${value.replace(/\s+$/, "")}\n${verb} ` : `${verb} `);
  return (
    <div className={className}>
      <label className="block">
        <span className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
          Bullet points (one per line)
          <span className="text-xs font-normal text-slate-400">{count} bullet{count === 1 ? "" : "s"}</span>
        </span>
        <textarea
          className="input min-h-0 resize-y py-2.5"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={"Built a … using … that …\nReduced … from … to … by …"}
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-500">Start a new bullet with:</span>
        {VERBS.map((v) => (
          <button key={v} type="button" onClick={() => addVerb(v)} className="chip min-h-8 px-2.5 py-0.5 text-xs">
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

function ListEditor<T extends { id: string }>({
  items,
  itemName,
  max = 4,
  onAdd,
  onRemove,
  onMove,
  render,
}: {
  items: T[];
  itemName: string;
  max?: number;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  render: (item: T) => ReactNode;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={item.id} className="rounded-xl border border-slate-200 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {itemName} {i + 1}
            </p>
            <div className="flex gap-1">
              <IconBtn label={`Move ${itemName} ${i + 1} up`} disabled={i === 0} onClick={() => onMove(item.id, -1)}>
                ↑
              </IconBtn>
              <IconBtn label={`Move ${itemName} ${i + 1} down`} disabled={i === items.length - 1} onClick={() => onMove(item.id, 1)}>
                ↓
              </IconBtn>
              <IconBtn label={`Remove ${itemName} ${i + 1}`} onClick={() => onRemove(item.id)}>
                <Icon name="close" className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>
          {render(item)}
        </div>
      ))}
      {items.length < max && (
        <button type="button" onClick={onAdd} className="btn btn-secondary w-full border-dashed text-sm">
          + Add {itemName}
        </button>
      )}
    </div>
  );
}

function IconBtn({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand-900 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

function KeywordList({ title, words, tone }: { title: string; words: string[]; tone: "ok" | "miss" }) {
  if (!words.length) return null;
  return (
    <div>
      <p className="font-medium text-slate-700">{title}</p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {words.map((w) => (
          <li key={w} className={`badge ${tone === "ok" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"}`}>
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
