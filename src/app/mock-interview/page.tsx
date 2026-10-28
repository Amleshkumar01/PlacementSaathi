import { buildMetadata } from "@/lib/seo";
import { hrQuestions, practiceMethod, projectDeepDive, vivaSubjects } from "@/data/interview";
import { Icon } from "@/components/Icon";
import { NextStep, Note, PageHero, SectionHeading, StepNumber } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Mock Interview Questions for Freshers: HR and Technical",
  description:
    "Fresher HR interview questions with answer frameworks, plus the most-asked OOPs, DBMS, OS and Computer Networks viva questions and a self-practice method.",
  path: "/mock-interview",
});

export default function MockInterviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Mock Interview"
        title="Mock Interview Preparation: HR and Technical"
        intro="Selection depends on how you present your knowledge, not just on knowing it. Reading is half the preparation; practising out loud is the real preparation. This page has 3 layers: HR answers, technical viva and a project deep-dive."
      >
        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 text-sm">
          <a href="#hr" className="chip">HR Questions</a>
          <a href="#technical" className="chip">Technical Viva</a>
          <a href="#project" className="chip">Project Deep-dive</a>
          <a href="#practice" className="chip">Self-practice</a>
        </nav>
      </PageHero>

      <section className="section" aria-labelledby="hr">
        <div className="container-page">
          <SectionHeading id="hr" eyebrow="Layer 1" title="HR interview questions with frameworks" intro="Don't memorise answers. Remember the framework and fill it with your own real story." />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {hrQuestions.map((q) => (
              <article key={q.id} className="card card-hover reveal">
                <h3 className="h3">{q.question}</h3>
                <p className="mt-1 text-sm font-semibold text-accent-700">{q.framework}</p>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
                  {q.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className="mt-4 flex gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-800">
                  <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <span className="font-semibold">Avoid: </span>
                    {q.avoid}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="technical">
        <div className="container-page">
          <SectionHeading
            id="technical"
            eyebrow="Layer 2"
            title="Technical viva: OOPs, DBMS, OS, CN"
            intro="These 4 subjects appear in almost every technical interview. Read the topics, answer each question out loud, then compare with the hint."
          />
          <div className="table-wrap mt-6">
            <table className="table table-stack min-w-[560px]">
              <thead>
                <tr>
                  <th scope="col">Subject</th>
                  <th scope="col">Topics to master</th>
                </tr>
              </thead>
              <tbody>
                {vivaSubjects.map((s) => (
                  <tr key={s.id}>
                    <td className="font-semibold whitespace-nowrap text-brand-900">
                      <a href={`#${s.id}`} className="tap hover:text-brand-600 hover:underline">{s.subject}</a>
                    </td>
                    <td data-label="Topics to master">{s.topics.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {vivaSubjects.map((s) => (
              <article key={s.id} id={s.id} className="card scroll-mt-24">
                <h3 className="h3">{s.subject}: most-asked questions</h3>
                <ul className="mt-3 space-y-2">
                  {s.questions.map((q) => (
                    <li key={q.q}>
                      <details className="group rounded-xl border border-slate-200 transition open:border-brand-200 open:bg-brand-50/40">
                        <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-3 px-4 py-3 font-medium text-brand-900 marker:hidden">
                          {q.q}
                          <span className="shrink-0 text-xs font-semibold text-brand-600 group-open:hidden">Show hint</span>
                        </summary>
                        <p className="px-4 pb-3 text-sm text-slate-700">{q.hint}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="project">
        <div className="container-page">
          <SectionHeading id="project" eyebrow="Layer 3" title="Project deep-dive: the 2-minute structure" intro={projectDeepDive.note} />
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {projectDeepDive.structure.map((s, i) => (
              <li key={s} className="card reveal">
                <StepNumber n={i + 1} />
                <p className="mt-3 text-sm font-medium text-slate-800">{s}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Note>
              <strong>Golden rule: </strong>
              {projectDeepDive.goldenRule}
            </Note>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/70" aria-labelledby="practice">
        <div className="container-page">
          <SectionHeading id="practice" title="Self-practice method: record, time, improve" intro="Don't wait for someone to mock-interview you. Your phone is enough." />
          <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {practiceMethod.map((m, i) => (
              <li key={m.title} className="card reveal">
                <StepNumber n={i + 1} />
                <h3 className="h3 mt-3">{m.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{m.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NextStep
        title="Now look at your target company's pattern"
        text="Every company has different rounds and focus areas. Before a test, revise only that company's page."
        primary={{ href: "/companies", label: "See Company-wise Prep" }}
        secondary={{ href: "/roadmap", label: "90-Day Roadmap" }}
      />
    </>
  );
}
