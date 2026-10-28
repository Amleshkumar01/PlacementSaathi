// Run against a production build: node scripts/check-aptitude.mjs http://127.0.0.1:3100
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const base = process.argv[2] ?? "http://localhost:3000";
const moduleCache = new Map();
async function loadData(url) {
  if (moduleCache.has(url.href)) return moduleCache.get(url.href);
  const source = await readFile(url, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const dependencies = new Map();
  for (const match of compiled.matchAll(/require\("(\.[^"]+)"\)/g)) {
    dependencies.set(match[1], await loadData(new URL(`${match[1]}.ts`, url)));
  }
  const result = runInNewContext(`${compiled}\nexports;`, { exports: {}, require: (name) => dependencies.get(name) });
  moduleCache.set(url.href, result);
  return result;
}
const { aptitudeCategories, categoryPath, topicPath } = await loadData(new URL("../src/data/aptitudePractice.ts", import.meta.url));
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
const routes = [{ path: "/aptitude", schema: "ItemList" }];
const counts = { arithmetic: 13, "logical-reasoning": 10, "verbal-ability": 8, "data-interpretation": 3 };
const questionIds = new Set();

assert.equal(aptitudeCategories.length, 4);
for (const category of aptitudeCategories) {
  assert.equal(category.topics.length, counts[category.slug], `${category.name}: topic count`);
  assert.equal(new Set(category.topics.map((topic) => topic.slug)).size, category.topics.length, "Unique topic URLs");
  routes.push({ path: categoryPath(category.slug), schema: "ItemList", category });
  for (const topic of category.topics) {
    assert.ok(topic.questions.length >= 20, `${topic.name} needs at least 20 questions`);
    const distinct = new Set(topic.questions.map((q) => JSON.stringify([q.question, q.passage, q.data, q.chart])));
    assert.equal(distinct.size, topic.questions.length, `${topic.name}: no repeated questions`);
    for (const question of topic.questions) {
      assert.ok(!questionIds.has(question.id), `Duplicate question ID: ${question.id}`);
      questionIds.add(question.id);
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options).size, 4);
      assert.ok(question.options[question.correctIndex]);
      assert.ok(question.steps.length > 0);
      if (question.chart?.kind === "pie") assert.equal(question.chart.values.reduce((sum, value) => sum + value.value, 0), 100);
    }
    routes.push({ path: topicPath(category.slug, topic.slug), schema: "LearningResource", topic });
  }
}

const titles = new Set();
const descriptions = new Set();
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();

for (const { path, schema, category, topic } of routes) {
  const response = await fetch(base + path);
  const html = await response.text();
  assert.equal(response.status, 200, `${path}: status`);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${path}: one H1`);
  assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `${path}: indexable`);
  const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] ?? "");
  const description = decode(html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? "");
  assert.ok(title.length >= 50 && title.length <= 60, `${path}: title is ${title.length} characters`);
  assert.ok(description.length >= 140 && description.length <= 160, `${path}: description is ${description.length} characters`);
  assert.ok(!titles.has(title), `${path}: unique title`);
  assert.ok(!descriptions.has(description), `${path}: unique description`);
  titles.add(title);
  descriptions.add(description);
  assert.ok(html.includes(`<link rel="canonical" href="https://placementsaathi.in${path}"`), `${path}: canonical`);
  assert.ok(html.includes(`property="og:title" content="${escape(title)}"`), `${path}: Open Graph title`);
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), `${path}: Twitter card`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert.ok(schemas.some((item) => item["@type"] === schema), `${path}: ${schema}`);
  if (path !== "/aptitude") assert.ok(schemas.some((item) => item["@type"] === "BreadcrumbList"), `${path}: breadcrumbs`);
  assert.ok(sitemap.includes(`<loc>https://placementsaathi.in${path}</loc>`), `${path}: sitemap`);
  if (category) for (const item of category.topics) assert.ok(html.includes(`href="${topicPath(category.slug, item.slug)}"`), `${path}: topic link ${item.slug}`);
  if (topic) {
    assert.equal((html.match(/type="radio"/g) ?? []).length, 4, `${path}: four selectable options`);
    assert.ok(html.includes('aria-label="Questions answered"'), `${path}: progress`);
    assert.ok(html.includes(escape(topic.questions[0].question)), `${path}: opening question is server-rendered`);
    const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.ok(!rendered.includes('id="worked-solutions"'), `${path}: no separate answer list`);
    assert.ok(!rendered.includes("Step-by-step solution"), `${path}: solution hidden before an attempt`);
    assert.ok(!rendered.includes("Correct answer:"), `${path}: answer hidden before an attempt`);
    const text = rendered.replace(/<[^>]*>/g, "");
    assert.ok(text.includes(`Question 1 of ${topic.questions.length}`), `${path}: correct question count`);
  }
}

for (const path of ["/aptitude/not-a-category", "/aptitude/arithmetic/not-a-topic", "/aptitude/not-a-category/profit-and-loss"]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 404, `${path}: real 404`);
  assert.ok((await response.text()).includes("noindex"), `${path}: not indexed`);
}

console.log(`Aptitude checks passed: ${routes.length} pages, ${questionIds.size} questions, metadata, server-rendered content, links, sitemap and invalid URLs.`);
