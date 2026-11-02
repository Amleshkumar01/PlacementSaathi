import {
  cleanUrl,
  contactParts,
  dateRange,
  filledEducation,
  filledExperience,
  filledProjects,
  skillRows,
  toLines,
  type ResumeData,
} from "@/lib/resume";

/**
 * The printable resume. ATS-safe on purpose: one column, real text (no images or icons),
 * standard section names, a common font and no tables.
 * Sized for A4 at 96 dpi: 794 x 1123 px.
 */
export function ResumePreview({ data, experienceFirst }: { data: ResumeData; experienceFirst: boolean }) {
  const contact = contactParts(data);
  const education = filledEducation(data);
  const projects = filledProjects(data);
  const experience = filledExperience(data);
  const skills = skillRows(data);
  const achievements = toLines(data.achievements);
  const certifications = toLines(data.certifications);
  const isEmpty = !data.name.trim() && !contact.length && !education.length && !projects.length && !skills.length;

  const Experience = experience.length > 0 && (
    <Section title="Experience">
      {experience.map((e) => (
        <div key={e.id} className="rs-item">
          <div className="rs-row">
            <p>
              <strong>{e.role.trim()}</strong>
              {e.company.trim() && <>, {e.company.trim()}</>}
              {e.location.trim() && <span className="rs-muted">, {e.location.trim()}</span>}
            </p>
            {dateRange(e.start, e.end) && <p className="rs-date">{dateRange(e.start, e.end)}</p>}
          </div>
          <Bullets lines={toLines(e.bullets)} />
        </div>
      ))}
    </Section>
  );

  const Projects = projects.length > 0 && (
    <Section title="Projects">
      {projects.map((p) => (
        <div key={p.id} className="rs-item">
          <div className="rs-row">
            <p>
              <strong>{p.name.trim()}</strong>
              {p.tech.trim() && <span className="rs-muted"> | {p.tech.trim()}</span>}
            </p>
            {p.link.trim() && <p className="rs-date">{cleanUrl(p.link)}</p>}
          </div>
          <Bullets lines={toLines(p.bullets)} />
        </div>
      ))}
    </Section>
  );

  return (
    <article className="rs-page" aria-label="Resume preview">
      {isEmpty && (
        <p className="rs-placeholder print:hidden">
          Your resume preview appears here as you type. Start with your name and contact details, or load the example.
        </p>
      )}

      {data.name.trim() && <h2 className="rs-name">{data.name.trim()}</h2>}
      {contact.length > 0 && <p className="rs-contact">{contact.join("  |  ")}</p>}

      {data.summary.trim() && (
        <Section title="Summary">
          <p>{data.summary.trim()}</p>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((e) => (
            <div key={e.id} className="rs-item">
              <div className="rs-row">
                <p>
                  <strong>{e.degree.trim()}</strong>
                </p>
                {dateRange(e.start, e.end) && <p className="rs-date">{dateRange(e.start, e.end)}</p>}
              </div>
              <div className="rs-row">
                <p>
                  {e.school.trim()}
                  {e.location.trim() && <span className="rs-muted">, {e.location.trim()}</span>}
                </p>
                {e.score.trim() && <p className="rs-date">{e.score.trim()}</p>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Technical Skills">
          {skills.map(([label, value]) => (
            <p key={label} className="rs-skill">
              <strong>{label}:</strong> {value.trim()}
            </p>
          ))}
        </Section>
      )}

      {experienceFirst ? (
        <>
          {Experience}
          {Projects}
        </>
      ) : (
        <>
          {Projects}
          {Experience}
        </>
      )}

      {achievements.length > 0 && (
        <Section title="Achievements">
          <Bullets lines={achievements} />
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          <Bullets lines={certifications} />
        </Section>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rs-section">
      <h3 className="rs-heading">{title}</h3>
      {children}
    </section>
  );
}

function Bullets({ lines }: { lines: string[] }) {
  if (!lines.length) return null;
  return (
    <ul className="rs-bullets">
      {lines.map((l, i) => (
        <li key={`${i}-${l}`}>{l}</li>
      ))}
    </ul>
  );
}
