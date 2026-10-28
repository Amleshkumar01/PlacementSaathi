import type { PracticeQuestion } from "@/data/aptitudePractice";

const chartColors = ["#2563eb", "#7c3aed", "#059669", "#d97706"];

/** The data and text labels remain readable without JavaScript or colour perception. */
export function QuestionContext({ question }: { question: PracticeQuestion }) {
  const chart = question.chart;
  let offset = 0;
  const segments = chart?.values.map((item, index) => {
    const start = offset;
    offset += item.value;
    return `${chartColors[index % chartColors.length]} ${start}% ${offset}%`;
  });

  return (
    <>
      {question.passage && (
        <div className="mt-5 min-w-0 rounded-xl border border-brand-100 bg-brand-50/60 p-3 break-words sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Read the passage</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{question.passage}</p>
        </div>
      )}
      {question.data && (
        <div className="table-wrap mt-5 max-w-full overscroll-x-contain" tabIndex={0} role="region" aria-label={question.data.caption}>
          <table className="table">
            <caption className="bg-brand-50 px-3 py-3 text-left text-sm font-semibold break-words text-brand-900 sm:px-4">{question.data.caption} (sample data)</caption>
            <thead><tr>{question.data.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
            <tbody>{question.data.rows.map((row) => (
              <tr key={row[0]}>{row.map((cell, index) => index === 0
                ? <th key={index} scope="row" className="border-t border-slate-200 px-4 py-3 font-medium">{cell}</th>
                : <td key={index}>{cell}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {chart && (
        <figure className="mt-5 min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
          <figcaption className="text-sm font-semibold break-words text-brand-900">{chart.caption} (sample data)</figcaption>
          {chart.kind === "bar" ? (
            <ul className="mt-4 space-y-3">
              {chart.values.map((item, index) => (
                <li key={item.label}>
                  <div className="mb-1 flex justify-between gap-3 text-sm text-slate-700"><span className="min-w-0 break-words">{item.label}</span><span className="shrink-0">{item.value} {chart.unit}</span></div>
                  <div className="h-6 rounded bg-slate-200" aria-hidden="true"><div className="h-full rounded" style={{ width: `${item.value / Math.max(...chart.values.map((v) => v.value)) * 100}%`, backgroundColor: chartColors[index % chartColors.length] }} /></div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
              <div aria-hidden="true" className="h-32 w-32 shrink-0 rounded-full sm:h-36 sm:w-36" style={{ background: `conic-gradient(${segments?.join(", ")})` }} />
              <ul className="w-full min-w-0 space-y-2 text-sm text-slate-700 sm:w-auto sm:flex-1">
                {chart.values.map((item, index) => <li key={item.label} className="flex min-w-0 items-start gap-2"><span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: chartColors[index % chartColors.length] }} /><span className="min-w-0 break-words">{item.label}: {item.value}{chart.unit}</span></li>)}
              </ul>
            </div>
          )}
        </figure>
      )}
    </>
  );
}
