import type { MetadataRoute } from "next";
import { companies } from "@/data/companies";
import { aptitudeCategories, categoryPath, topicPath } from "@/data/aptitudePractice";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/dsa", priority: 0.9 },
  { path: "/aptitude", priority: 0.9 },
  { path: "/resume", priority: 0.8 },
  { path: "/mock-interview", priority: 0.8 },
  { path: "/companies", priority: 0.8 },
  { path: "/roadmap", priority: 0.8 },
  { path: "/jobs", priority: 0.7 },
  { path: "/tcs-nqt-preparation", priority: 0.8 },
  { path: "/faq", priority: 0.6 },
  { path: "/about", priority: 0.4 },
  { path: "/contact", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      changeFrequency: "weekly" as const,
      priority: r.priority,
    })),
    ...companies.map((c) => ({
      url: absoluteUrl(`/companies/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...aptitudeCategories.flatMap((category) => [
      { url: absoluteUrl(categoryPath(category.slug)), changeFrequency: "monthly" as const, priority: 0.8 },
      ...category.topics.map((topic) => ({
        url: absoluteUrl(topicPath(category.slug, topic.slug)),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ]),
  ];
}
