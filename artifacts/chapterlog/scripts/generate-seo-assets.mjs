/**
 * Generates public/sitemap.xml, public/feed.xml from blog data.
 * Run: node scripts/generate-seo-assets.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_CATEGORIES_META, loadBlogPosts } from "./parse-blog-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITE = "https://chapterlog.com.tr";
const TODAY = new Date().toISOString().slice(0, 10);

const posts = loadBlogPosts();

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

function categoryUrl({ slug }) {
  const path = `/blog/kategori/${slug}`;
  const loc = `${SITE}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${loc}?lang=en"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${loc}?lang=ru"/>
    <xhtml:link rel="alternate" hreflang="de" href="${loc}?lang=de"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
    <lastmod>${TODAY}</lastmod>
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map(staticUrl).join("\n\n")}

  <!-- Blog categories (${BLOG_CATEGORIES_META.length}) -->
${BLOG_CATEGORIES_META.map(categoryUrl).join("\n")}

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
console.log(
  `Generated sitemap.xml (${posts.length} posts + ${BLOG_CATEGORIES_META.length} categories) and feed.xml.`,
);
