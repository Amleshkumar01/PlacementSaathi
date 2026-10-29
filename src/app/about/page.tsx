import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icon";
import { NextStep, PageHero, SectionHeading } from "@/components/ui";

export const metadata = buildMetadata({
  title: "About PlacementSaathi: Free Placement Prep for CSE",
  description:
    "What PlacementSaathi is and why we built it: free, clear and honest placement preparation for BTech CSE students. No job guarantees and no fake success stories.",
  path: "/about",
});

const principles: { title: string; text: string; icon: IconName }[] = [
  { title: "Patterns first, random practice later", text: "DSA and aptitude are organised by pattern, so you know where questions come from.", icon: "layers" },
  { title: "Do more than read", text: "Search, filters, a checklist score and a calculator: every page has something to do.", icon: "target" },
  { title: "Prepare for your company", text: "Every company's rounds and focus differ, so general prep is paired with company guides.", icon: "building" },
  { title: "No false promises", text: "No placement guarantees, no fake success stories or student names. Packages are approximate ranges.", icon: "shield" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/about"),
          name: "About PlacementSaathi",
          about: { "@id": `${site.url}/#organization` },
          mainEntity: {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            name: site.name,
            alternateName: ["Placement Saathi", "placementsaathi.in"],
            url: site.url,
            logo: absoluteUrl("/logo.png"),
            description: site.description,
            email: site.email,
          },
        }}
      />
      <PageHero
        eyebrow="About"
        title="About PlacementSaathi"
        intro={`${site.tagline}. PlacementSaathi is a free placement preparation website for BTech CSE students, written like a helpful senior would explain things.`}
      />
      <section className="section" aria-labelledby="problem">
        <div className="container-page grid gap-4 lg:grid-cols-2">
          <div className="card">
            <SectionHeading id="problem" title="The problem" />
            <p className="prose-body mt-4">
              Students juggle random PDFs, 500-video playlists and content scattered across many sites. It is hard to know
              what to study first, how much to study and what matters for which company.
            </p>
          </div>
          <div className="card-soft">
            <SectionHeading id="solution" title="What PlacementSaathi does" />
            <p className="prose-body mt-4">
              Every campus placement repeats 4 things: an aptitude test, a coding round, resume shortlisting and interviews.
              PlacementSaathi covers these 4 in a clear order, along with a 90-day roadmap and round-by-round guides for 6
              companies.
            </p>
          </div>
        </div>
      </section>
      <section className="section bg-slate-50/70" aria-labelledby="principles">
        <div className="container-page">
          <SectionHeading id="principles" title="Our principles" />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className="card reveal">
                <span className="icon-tile bg-gradient-to-br from-brand-600 to-accent-600">
                  <Icon name={p.icon} />
                </span>
                <h3 className="h3 mt-4">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" aria-labelledby="honest">
        <div className="container-page max-w-3xl">
          <SectionHeading id="honest" title="In plain words" />
          <ul className="mt-6 space-y-3">
            {[
              "PlacementSaathi (placementsaathi.in) is a free study website. It is not a recruitment agency or job consultancy, and it never charges students any fee.",
              "PlacementSaathi does not guarantee any placement, job or salary. Selection depends on your effort and the company's process.",
              "There is no login, account or payment. The resume checklist and calculator run in your browser.",
              "Company names are trademarks of their owners. PlacementSaathi is not affiliated with any company.",
              "Company patterns can change every season. The official notification is always final.",
            ].map((t) => (
              <li key={t} className="card flex gap-3 p-4 text-sm text-slate-700">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NextStep
        title="The easiest way to start"
        text="Read the 90-Day Roadmap and solve today's first DSA problem."
        primary={{ href: "/roadmap", label: "View 90-Day Roadmap" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
