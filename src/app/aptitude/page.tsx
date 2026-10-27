import Link from "next/link";
import { aptitudeCategories, categoryPath } from "@/data/aptitudePractice";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { NextStep } from "@/components/ui";
import { AptitudeHero } from "./_components/AptitudeHero";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aptitude Practice Questions & Solutions | PlacementSaathi",
  description:
    "Practise aptitude MCQs in arithmetic, logical reasoning, verbal ability and data interpretation. Choose a topic, check answers and learn with worked solutions.",
  path: "/aptitude",
});

export default function AptitudePage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Aptitude Practice Categories",
        url: absoluteUrl("/aptitude"),
        numberOfItems: aptitudeCategories.length,
        itemListElement: aptitudeCategories.map((category, index) => ({
          "@type": "ListItem", position: index + 1, name: category.name,
          url: absoluteUrl(categoryPath(category.slug)),
        })),
      }} />
      <AptitudeHero compact eyebrow="PlacementSaathi" icon="calculator" title="Aptitude Practice" intro="Choose a category and start solving questions.">
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge bg-brand-100 text-brand-800">4 categories</span>
          <span className="badge bg-accent-100 text-accent-800">Topic-wise MCQs</span>
          <span className="badge bg-white text-slate-600">Step-by-step solutions</span>
        </div>
      </AptitudeHero>
      <section className="py-6 sm:py-8" aria-label="Choose an aptitude category">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5">
            {aptitudeCategories.map((category) => (
              <li key={category.slug} className="min-w-0">
                <Link href={categoryPath(category.slug)} className="card card-hover group flex h-full min-w-0 flex-col p-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`icon-tile ${category.slug === "verbal-ability" || category.slug === "data-interpretation" ? "bg-accent-600" : "bg-brand-600"}`}>
                      <Icon name={category.icon} />
                    </span>
                    <span className={`badge ${category.isNew ? "bg-emerald-50 text-emerald-700" : "bg-brand-50 text-brand-700"}`}>
                      {category.isNew ? "New section" : `${category.topics.length} topics`}
                    </span>
                  </div>
                  <h2 className="h3 mt-4 break-words group-hover:text-brand-600">{category.name}</h2>
                  <p className="mt-2 mb-4 text-sm leading-relaxed break-words text-slate-600">{category.description}</p>
                  <span className="mt-auto flex min-h-6 items-center gap-2 text-sm font-semibold text-brand-600">
                    Explore topics <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NextStep
        title="After aptitude, get your resume ready"
        text="Once you clear the test, shortlisting depends on your resume. Check your score with the 10-point ATS checklist."
        primary={{ href: "/resume", label: "Open Resume Checklist" }}
        secondary={{ href: "/dsa", label: "Practise DSA" }}
      />
    </>
  );
}
