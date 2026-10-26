import type { Metadata } from "next";
import { site } from "@/data/site";

export function absoluteUrl(path: string): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}

/**
 * Builds the full metadata for a page: title, description, canonical,
 * Open Graph and Twitter tags. The share image comes from
 * app/opengraph-image.tsx and app/twitter-image.tsx.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const imageAlt = "PlacementSaathi - Placement Preparation for BTech CSE Students";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: imageAlt, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/twitter-image", alt: imageAlt }],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
