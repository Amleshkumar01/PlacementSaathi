import Link from "next/link";
import { notFound } from "next/navigation";
import { aptitudeCategories, categoryPath, getAptitudeCategory, topicPath } from "@/data/aptitudePractice";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui";
import { AptitudeHero } from "../../_components/AptitudeHero";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { AptitudePractice } from "../../_components/AptitudePractice";

type Props = { params: Promise<{ category: string; topic: string }> };

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return aptitudeCategories.flatMap((category) => category.topics.map((topic) => ({ category: category.slug, topic: topic.slug })));
}

async function getPractice({ params }: Props) {
  const slugs = await params;
  const category = getAptitudeCategory(slugs.category);
  const topic = category?.topics.find((item) => item.slug === slugs.topic);
  if (!category || !topic) notFound();
  return { category, topic, path: topicPath(category.slug, topic.slug) };
}

export async function generateMetadata(props: Props) {
  const { topic, path } = await getPractice(props);
  const title = [
    `${topic.name} Questions with Solutions | PlacementSaathi`,
    `${topic.name} MCQs & Answers | PlacementSaathi`,
    `${topic.name} Aptitude Questions with Solutions | PlacementSaathi`,
  ].find((value) => value.length >= 50 && value.length <= 60);
  return buildMetadata({
    title: title ?? `${topic.name} MCQs | PlacementSaathi`,
    description: `Practise ${topic.name.toLowerCase()} aptitude MCQs for placements. Check your answers, track your score and revise the method with simple step-by-step solutions.`,
    path,
  });
}

export default async function AptitudeTopicPage(props: Props) {
  const { category, topic, path } = await getPractice(props);
  const siblings = category.topics.filter((item) => item.slug !== topic.slug);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Aptitude Practice", path: "/aptitude" },
        { name: category.name, path: categoryPath(category.slug) },
        { name: topic.name, path },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "LearningResource",
        name: `${topic.name} Practice Questions`,
        description: topic.method,
        url: absoluteUrl(path),
        learningResourceType: "Practice questions",
        educationalUse: "Practice",
        inLanguage: "en-IN",
        isAccessibleForFree: true,
        about: { "@type": "Thing", name: topic.name },
      }} />
      <AptitudeHero eyebrow={`PlacementSaathi / ${category.shortName}`} icon={category.icon} title="Practice Questions" intro={`${topic.name}: choose an option, check your answer and read the solution.`}>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="badge bg-brand-100 text-brand-800">{topic.name}</span>
          <span className="badge bg-accent-100 text-accent-800">Interactive practice</span>
          <span className="badge bg-white text-slate-600">{topic.questions.length} questions</span>
        </div>
      </AptitudeHero>
      <section className="py-6 sm:py-8 lg:py-10" aria-label={`${topic.name} practice`}>
        <div className="container-page max-w-7xl">
          <Breadcrumbs items={[
            { name: "Aptitude Practice", href: "/aptitude" },
            { name: category.name, href: categoryPath(category.slug) },
            { name: topic.name, href: path },
          ]} />
          <div className="mt-5 grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-6">
            <div className="min-w-0">
              <AptitudePractice key={path} questions={topic.questions} />
            </div>
            <aside className="grid min-w-0 grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-1" aria-label="Topic revision and navigation">
              <div className="card-soft min-w-0 p-4 sm:p-5">
                <h2 className="h3">Method to remember</h2>
                <p className="mt-3 text-sm leading-relaxed break-words text-slate-700">{topic.method}</p>
              </div>
              <div className="card min-w-0 p-4 sm:p-5">
                <h2 className="h3">More in {category.shortName}</h2>
                <ul className="mt-3 grid gap-1">{siblings.map((item) => <li key={item.slug} className="min-w-0"><Link href={topicPath(category.slug, item.slug)} className="flex min-h-11 items-center rounded-lg px-2 py-2 text-sm break-words text-slate-600 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-brand-600">{item.name}</Link></li>)}</ul>
                <Link href={categoryPath(category.slug)} className="btn btn-secondary mt-4 w-full text-sm">All {category.topics.length} topics</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
