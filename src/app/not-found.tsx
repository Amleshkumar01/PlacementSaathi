import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Page not found | PlacementSaathi" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-hero section">
      <div className="container-page max-w-xl text-center">
        <p className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-6xl font-bold text-transparent">404</p>
        <h1 className="mt-3 text-3xl font-bold text-brand-900">We couldn&apos;t find that page</h1>
        <p className="lead mt-3">The link may be old or the URL may have a typo. Use one of these instead.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">Go to Home</Link>
          <Link href="/dsa" className="btn btn-secondary">DSA Practice</Link>
        </div>
      </div>
    </section>
  );
}
