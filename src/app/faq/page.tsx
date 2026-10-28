import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/data/faq";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { NextStep, PageHero } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Placement Preparation FAQ: Answers for BTech Students",
  description:
    "Placement preparation FAQ: when to start, which language for DSA, how many hours a day, eligibility, service vs product companies and how to use this site.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Placement Preparation FAQ"
        intro="Real questions from students, with straight and honest answers. If your question isn't here, ask us on the Contact page."
      />
      <section className="section" aria-label="Frequently asked questions">
        <div className="container-page max-w-3xl">
          <FaqList items={faqs} headingLevel="h2" />
        </div>
      </section>
      <NextStep
        title="Questions answered? Now make a plan"
        text="Read the 90-Day Roadmap and use the Study Plan Calculator to split your hours."
        primary={{ href: "/roadmap", label: "View 90-Day Roadmap" }}
        secondary={{ href: "/#study-plan", label: "Study Plan Calculator" }}
      />
    </>
  );
}
