import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { Icon, type IconName } from "@/components/Icon";
import { NextStep, PageHero } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Contact PlacementSaathi: Feedback, Errors, Suggestions",
  description:
    "Contact PlacementSaathi: email us if you spot an error, want a new topic or company added, or have feedback. We read every message and reply as soon as we can.",
  path: "/contact",
});

const reasons: { title: string; text: string; icon: IconName }[] = [
  { title: "Found an error", text: "Spotted a mistake in a solution, company pattern or package range? Send the page link and the error.", icon: "alert" },
  { title: "New topic or company", text: "Tell us which company, DSA pattern or aptitude topic we should add next.", icon: "sparkles" },
  { title: "Feedback", text: "What helped, what was confusing? Write to us directly. That is how the site improves.", icon: "mail" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        icon="mail"
        title="Contact PlacementSaathi"
        intro="Found a mistake, have a question or a suggestion? Email us. We don't store personal data and never send messages without your permission."
      />
      <section className="section" aria-labelledby="email">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="glass self-start p-6 sm:p-8">
            <span className="icon-tile bg-brand-600">
              <Icon name="mail" />
            </span>
            <h2 id="email" className="h2 mt-4">
              Email us
            </h2>
            <p className="prose-body mt-2">Start the subject with: Error / New topic / Feedback.</p>
            <a href={`mailto:${site.email}`} className="btn btn-primary mt-6 w-full break-all">
              {site.email}
            </a>
            <p className="mt-4 text-xs text-slate-500">
              Please don&apos;t send placement or referral requests. We are not affiliated with any company.
            </p>
          </div>
          <div>
            <h2 className="h2">What you can write to us about</h2>
            <ul className="mt-6 space-y-3">
              {reasons.map((r) => (
                <li key={r.title} className="card flex gap-4">
                  <span className="icon-tile h-10 w-10 bg-accent-600">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="h3">{r.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              Check the{" "}
              <Link href="/faq" className="link">
                FAQ
              </Link>{" "}
              for common questions first.
            </p>
          </div>
        </div>
      </section>
      <NextStep
        title="Keep preparing in the meantime"
        text="Today's DSA problem or 20 aptitude questions: do one thing right now."
        primary={{ href: "/dsa", label: "Start DSA Practice" }}
        secondary={{ href: "/faq", label: "Read the FAQ" }}
      />
    </>
  );
}
