/**
 * Generates public/sitemap.xml and public/feed.xml from blogPosts.ts metadata.
 * Run: node scripts/generate-seo-assets.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITE = "https://chapterlog.com.tr";
const TODAY = new Date().toISOString().slice(0, 10);

const blogSource = readFileSync(join(ROOT, "src/data/blogPosts.ts"), "utf8");
const extendedSource = readFileSync(join(ROOT, "src/data/blogPostsExtended.ts"), "utf8");
const combined = blogSource + extendedSource;

/** @type {{ slug: string; isoDate: string; title: string; excerpt: string }[]} */
const posts = [];
const slugRe = /slug:\s*"([^"]+)"/g;
const isoRe = /isoDate:\s*"([^"]+)"/g;
const titleRe = /title:\s*"((?:[^"\\]|\\.)*)"/g;
const excerptRe = /excerpt:\s*"((?:[^"\\]|\\.)*)"/g;

const blocks = combined.split(/\{\s*\n\s*id:\s*\d+/).slice(1);
for (const block of blocks) {
  const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
  const isoDate = block.match(/isoDate:\s*"([^"]+)"/)?.[1];
  const title = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1]?.replace(/\\"/g, '"');
  const excerpt = block.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/)?.[1]?.replace(/\\"/g, '"');
  if (slug && isoDate && title) {
    posts.push({ slug, isoDate, title, excerpt: excerpt ?? "" });
  }
}

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/blog", priority: "0.85", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
];

function hreflangLinks(path) {
  const base = `${SITE}${path}`;
  const langs = ["tr", "en", "ru", "de"];
  return langs
    .map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${l === "tr" ? base : `${base}?lang=${l}`}"/>`,
    )
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${base}"/>`)
    .join("\n");
}

function staticUrl({ path, priority, changefreq }) {
  return `  <url>
    <loc>${SITE}${path}</loc>
${hreflangLinks(path)}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${TODAY}</lastmod>
  </url>`;
}

function blogUrl({ slug, isoDate }) {
  const path = `/blog/${slug}`;
  const loc = `${SITE}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${loc}?lang=de"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${isoDate}</lastmod>
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map(staticUrl).join("\n\n")}

  <!-- Blog posts (${posts.length}) -->
${posts.map(blogUrl).join("\n")}
</urlset>
`;

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const rssItems = posts
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.isoDate).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`,
  )
  .join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ChapterLOG Blog — Türkiye Rusya Lojistik Rehberleri</title>
    <link>${SITE}/blog</link>
    <description>Türkiye-Rusya nakliye, gümrük, para transferi ve ihracat rehberleri. ChapterLOG LLC.</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), sitemap);
writeFileSync(join(ROOT, "public/feed.xml"), feed);
console.log(`Generated sitemap.xml and feed.xml with ${posts.length} blog posts.`);
