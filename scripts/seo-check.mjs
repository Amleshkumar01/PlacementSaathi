// Quick SEO audit of a running build.
// Usage: npm run build && npm start (in another terminal), then:
//   node scripts/seo-check.mjs [baseUrl]
const base = process.argv[2] ?? "http://localhost:3000";

const routes = [
  "/", "/dsa", "/aptitude", "/resume", "/mock-interview", "/companies",
  "/companies/tcs", "/companies/infosys", "/companies/wipro", "/companies/accenture",
  "/companies/capgemini", "/companies/amazon", "/roadmap", "/jobs", "/faq", "/about", "/contact",
];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, attr, key) => {
  const m = html.match(new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
};

let failures = 0;
const titles = new Set();
const descs = new Set();
const rows = [];

for (const route of routes) {
  const res = await fetch(base + route);
  const html = await res.text();
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = meta(html, "name", "description") ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  const ogImage = !!meta(html, "property", "og:image");
  const twImage = !!meta(html, "name", "twitter:image");
  const twCard = meta(html, "name", "twitter:card");
  const ogTitle = meta(html, "property", "og:title");
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1])["@type"],
  );
  const expectedCanonical = route === "/" ? "https://placementsaathi.in" : `https://placementsaathi.in${route}`;

  const problems = [];
  if (res.status !== 200) problems.push(`status ${res.status}`);
  if (h1 !== 1) problems.push(`${h1} h1`);
  if (title.length < 50 || title.length > 60) problems.push(`title ${title.length} chars`);
  if (desc.length < 140 || desc.length > 160) problems.push(`desc ${desc.length} chars`);
  if (canonical !== expectedCanonical) problems.push(`canonical ${canonical}`);
  if (!ogImage || !twImage || twCard !== "summary_large_image" || ogTitle !== title) problems.push("og/twitter");
  if (titles.has(title)) problems.push("duplicate title");
  if (descs.has(desc)) problems.push("duplicate desc");
  if (route === "/" && !jsonLd.includes("Organization")) problems.push("no Organization");
  if (route === "/faq" && !jsonLd.includes("FAQPage")) problems.push("no FAQPage");
  if (route === "/dsa" && !jsonLd.includes("ItemList")) problems.push("no ItemList");
  if (route.startsWith("/companies/") && !jsonLd.includes("BreadcrumbList")) problems.push("no BreadcrumbList");
  if (route.startsWith("/companies/") && !html.includes("approximate, for awareness only") && !html.includes("Approximate, for awareness only"))
    problems.push("no package label");
  titles.add(title);
  descs.add(desc);
  if (problems.length) failures++;
  rows.push({ route, title, t: title.length, d: desc.length, jsonLd: jsonLd.join(",") || "-", ok: problems.length ? problems.join("; ") : "OK" });
}

for (const extra of ["/sitemap.xml", "/robots.txt", "/opengraph-image", "/twitter-image", "/companies/not-a-company"]) {
  const res = await fetch(base + extra);
  const expected = extra.includes("not-a-company") ? 404 : 200;
  const ok = res.status === expected;
  if (!ok) failures++;
  rows.push({ route: extra, title: res.headers.get("content-type") ?? "", t: "", d: "", jsonLd: "", ok: ok ? `OK (${res.status})` : `status ${res.status}` });
}

console.table(rows);
console.log(failures ? `${failures} route(s) need attention` : "All SEO checks passed");
process.exit(failures ? 1 : 0);
