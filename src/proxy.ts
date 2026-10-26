import { NextResponse, type NextRequest } from "next/server";
import { companies } from "@/data/companies";

const knownSlugs = new Set(companies.map((c) => c.slug));

/**
 * Unknown company slugs must return a real HTTP 404 (not a soft 404),
 * so search engines never index /companies/<typo>.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2]?.toLowerCase();
  if (slug && !knownSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/__page-not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/companies/:slug",
};
