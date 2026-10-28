import Link from "next/link";
import { notFound } from "next/navigation";
import { aptitudeCategories, categoryPath, getAptitudeCategory, topicPath } from "@/data/aptitudePractice";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui";
import { AptitudeHero } from "../_components/AptitudeHero";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

// Finish rendering before responding, including a real 404 for unknown categories.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return aptitudeCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const category = getAptitudeCategory((await params).category);
  if (!category) notFound();
  return buildMetadata({
    title: `${category.name} Practice Questions | PlacementSaathi`,
    description: `Practise ${category.name.toLowerCase()} for placements across ${category.topics.length} topics. Choose a topic, solve sample MCQs and learn from instant feedback and step-by-step solutions.`,
    path: categoryPath(category.slug),
  });
}

export default async function AptitudeCategoryPage({ params }: Props) {
  const category = getAptitudeCategory((await params).category);
  if (!category) notFound();
  const path = categoryPath(category.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Aptitude Practice", path: "/aptitude" },
        { name: category.name, path },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "ItemList",
        name: `${category.name} Topics`, url: absoluteUrl(path), numberOfItems: category.topics.length,
        itemListElement: category.topics.map((topic, index) => ({
          "@type": "ListItem", position: index + 1, name: topic.name,
          url: absoluteUrl(topicPath(category.slug, topic.slug)),
        })),
      }} />
      <AptitudeHero eyebrow="PlacementSaathi / Aptitude" icon={category.icon} title={category.name} intro={category.intro}>
        <p className="mt-5"><span className="badge bg-brand-100 text-brand-800">{category.topics.length} Topics</span></p>
      </AptitudeHero>
      <section className="py-6 sm:py-8 lg:py-10" aria-label={`${category.name} topics`}>
        <div className="container-page">
          <Breadcrumbs items={[
            { name: "Aptitude Practice", href: "/aptitude" },
            { name: category.name, href: path },
          ]} />
          <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {category.topics.map((topic, index) => (
              <li key={topic.slug} className="min-w-0">
                <Link href={topicPath(category.slug, topic.slug)} className="card card-hover group flex h-full min-w-0 items-center gap-3 p-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 sm:gap-4 sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-semibold text-brand-600">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base leading-snug font-semibold break-words text-brand-900 group-hover:text-brand-600">{topic.name}</h2>
                    <p className="mt-1 text-xs text-slate-500">{topic.questions.length} questions · With solutions</p>
                  </div>
                  <Icon name="arrow" className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/aptitude" className="btn btn-secondary mt-6 min-h-12 w-full sm:w-auto">All aptitude categories</Link>
        </div>
      </section>
    </>
  );
}
