# PlacementSaathi

**Campus se Offer tak, Saathi ke saath** — free placement preparation website for BTech CSE students.
Live domain: https://placementsaathi.in

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No login, no database, no payment in v1.
All content lives in `src/data/*.ts`, separate from page code.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home: hero, 4 tracks, 3-step start, roadmap preview, companies, study-plan calculator, FAQ preview |
| `/dsa` | DSA sheet: search, pattern / difficulty / company filter, live count, empty state |
| `/aptitude` | Quant / Logical / Verbal tabs: weightage, shortcuts, solved questions |
| `/resume` | 10-point ATS checklist with live score, bullet formula, mistakes, section order |
| `/mock-interview` | HR frameworks, OOPs / DBMS / OS / CN viva, project deep-dive, self-practice |
| `/companies` | Company index |
| `/companies/[slug]` | `tcs`, `infosys`, `wipro`, `accenture`, `capgemini`, `amazon` |
| `/roadmap` | 90-day plan, weekly targets, daily routine |
| `/jobs` | Official career portals, off-campus plan, fake-offer warning signs (no job listings) |
| `/faq`, `/about`, `/contact` | FAQ (FAQPage JSON-LD), About, Contact |
| `/sitemap.xml`, `/robots.txt` | Generated from `src/app/sitemap.ts` and `src/app/robots.ts` |

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production check:

```bash
npm run build
npm start            # in one terminal
npm run check:seo    # in another: titles, descriptions, H1, canonical, OG/Twitter, JSON-LD, 404
```

## Deploy

**Vercel (recommended):** push the repo to GitHub → vercel.com → *Add New Project* → import the repo → Deploy.
Framework is auto-detected. Then add `placementsaathi.in` under *Project → Settings → Domains*.

**Netlify:** *Add new site → Import from Git*, build command `npm run build`. Netlify's Next.js runtime is
installed automatically. Add the custom domain under *Domain management*.

## Content kaise add karein (sirf data files edit karo)

**Naya DSA problem** — `src/data/dsa.ts` me `dsaProblems` array me ek object add karo:

```ts
{ id: "jump-game", name: "Jump Game", pattern: "Dynamic Programming", difficulty: "Medium",
  companies: ["Amazon"], why: "Greedy vs DP - dono soch.", url: lc("jump-game") },
```

`id` unique ho. `pattern`, `difficulty` aur `companies` ki allowed values TypeScript batayega.

**Naya aptitude solved question** — `src/data/aptitude.ts` me sahi section (`quant` / `logical` / `verbal`) ke
`solved` array me `{ id, topic, question, options, steps, answer }` add karo. Naya topic `topics` array me
`{ name, weightage: "High" | "Medium" | "Low", shortcut }` ke saath.

**Nayi company** — `src/data/companies.ts`:
1. `CompanyTag` type me naam jodo (jaise `"HCLTech"`).
2. `companies` array me ek object copy karke edit karo. `slug` lowercase rakho — URL `/companies/<slug>` ban jayega,
   sitemap aur DSA company filter apne aap update ho jayenge.
3. `src/components/DsaSheet.tsx` me `companyTags` list me naam jodo, aur chaho to `src/data/site.ts` ke footer me link.
4. Package range hamesha "lagbhag" ke saath, approximate rakho.

**FAQ** — `src/data/faq.ts`. Home par sirf `featured: true` wale 4 dikhte hain.

**Roadmap, resume checklist, interview questions, calculator split** — `roadmap.ts`, `resume.ts`,
`interview.ts`, `studyPlan.ts`.

## Content rules (mat todna)

- Koi placement / job / salary guarantee nahi.
- Koi fake testimonial, success story, student naam ya offer nahi.
- Package figures sirf approximate ranges, "approximate, for awareness only" label ke saath.

## Before launch

- `src/data/site.ts` me `email` ko asli inbox se badlo (abhi `hello@placementsaathi.in` placeholder hai).
- Company patterns aur package ranges ek baar current season ke official notifications se verify karo.

## Design

Light Premium Hybrid: Minimalism (white, clean type) + Bento grid (home toolkit cards) + Glassmorphism (hero cards, search).
Tokens live in `src/app/globals.css` (`brand` = blue, `accent` = violet). Icons are inline SVG in `src/components/Icon.tsx`.

**Hero photo:** the original is `src/image/hero-boy.png`. The site uses `src/image/hero-boy-cutout.png`, a transparent-background
copy. If you replace the photo, regenerate the cutout:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/make-cutout.ps1
```
