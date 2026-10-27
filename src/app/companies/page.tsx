import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { companies, packageNote, type CompanyType } from "@/data/companies";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { Breadcrumbs, NextStep, Note, PageHero, SectionHeading } from "@/components/ui";
import { CompanyLogo } from "@/components/CompanyLogo";

export const metadata = buildMetadata({
  title: "Company-wise Placement Preparation: TCS, Infosys, Amazon",
  description:
    "Company-wise placement prep: rounds, focus topics, tips and approximate fresher package ranges for TCS NQT, Infosys, Wipro, Accenture, Capgemini and Amazon.",
  path: "/companies",
});

const groups: CompanyType[] = ["Service-Based", "Product-Based"];

export default function CompaniesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Companies", path: "/companies" }])} />
      <PageHero
        eyebrow="Company-wise Preparation"
        icon="building"
        title="Company-wise Placement Preparation"
        intro="Everyone does general preparation, but every company tests differently. Pick your target company and see its round-by-round pattern, focus topics and tips in one place."
      >
        <div className="mt-5">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Companies", href: "/companies" }]} />
        </div>
        <p className="mt-5 text-sm text-slate-600">
          New:{" "}
          <Link href="/tcs-nqt-preparation" className="link">
            TCS NQT preparation guide with a 30-day plan
          </Link>
        </p>
      </PageHero>

      {groups.map((g) => {
        const list = companies.filter((c) => c.type === g);
        if (list.length === 0) return null;
        const id = g === "Service-Based" ? "service" : "product";
        return (
          <section key={g} className="section pb-0" aria-labelledby={id}>
            <div className="container-page">
              <SectionHeading id={id} title={`${g} companies`} />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c) => (
                  <li key={c.slug} className="reveal">
                    <Link href={`/companies/${c.slug}`} className="card card-hover flex h-full flex-col">
                      <div className="flex items-center gap-3">
                        <CompanyLogo slug={c.slug} name={c.tag} color={c.color} decorative />
                        <h3 className="h3">{c.name}</h3>
                      </div>
                      <p className="mt-3 flex-1 text-sm text-slate-600">{c.cardLine}</p>
                      <p className="mt-3 text-xs text-slate-500">Roles: {c.roles.map((r) => r.name).join(", ")}</p>
                      <span className="mt-4 inline-flex items-center gap-1 border-t border-slate-100 pt-4 text-sm font-semibold text-brand-600">
                        Open {c.tag} guide <Icon name="arrow" className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="section" aria-labelledby="overview">
        <div className="container-page">
          <SectionHeading id="overview" title="Rounds and focus at a glance" />
          <div className="table-wrap mt-6">
            <table className="table table-stack min-w-[720px]">
              <thead>
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">Rounds</th>
                  <th scope="col">Main focus</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.slug}>
                    <td className="font-semibold whitespace-nowrap">
                      <Link href={`/companies/${c.slug}`} className="tap text-brand-800 hover:underline">
                        {c.name}
                      </Link>
                    </td>
                    <td data-label="Rounds">{c.rounds.map((r) => r.name).join(" → ")}</td>
                    <td data-label="Main focus">{c.cardLine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Note>
              Package ranges on company pages are typical fresher ranges from past campus seasons. {packageNote} The final
              offer is always confirmed by the company&apos;s official letter. Company names are trademarks of their owners;
              PlacementSaathi is not affiliated with them.
            </Note>
          </div>
        </div>
      </section>

      <NextStep
        title="Picked a company? Now master its DSA patterns"
        text="Use the company filter on the DSA sheet to see only the problems tagged for your target company."
        primary={{ href: "/dsa", label: "Open DSA Sheet" }}
        secondary={{ href: "/aptitude", label: "Aptitude Practice" }}
      />
    </>
  );
}
