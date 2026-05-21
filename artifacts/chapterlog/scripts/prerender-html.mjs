/**
 * Post-build static HTML for crawlers: blog posts, categories, and main pages.
 * Run after `vite build`: node scripts/prerender-html.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_CATEGORIES_META, loadBlogPosts } from "./parse-blog-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist/public");
const SITE = "https://chapterlog.com.tr";

if (!existsSync(join(DIST, "index.html"))) {
  console.error("prerender-html: dist/public/index.html not found. Run vite build first.");
  process.exit(1);
}

const template = readFileSync(join(DIST, "index.html"), "utf8");
const scriptTags = template.match(/<script[^>]*>[\s\S]*?<\/script>/gi)?.join("\n") ?? "";
const linkTags =
  template.match(/<link[^>]*rel="stylesheet"[^>]*>/gi)?.join("\n") ??
  template.match(/<link[^>]*>/gi)?.filter((l) => l.includes("stylesheet") || l.includes("modulepreload"))?.join("\n") ??
  "";

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHead({ title, description, path, ogType = "website", publishedTime }) {
  const canonical = `${SITE}${path}`;
  const articleMeta =
    ogType === "article" && publishedTime
      ? `\n  <meta property="article:published_time" content="${publishedTime}" />`
      : "";
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="author" content="ChapterLOG LLC" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="tr" href="${canonical}" />
  <link rel="alternate" hreflang="en" href="${canonical}?lang=en" />
  <link rel="alternate" hreflang="ru" href="${canonical}?lang=ru" />
  <link rel="alternate" hreflang="de" href="${canonical}?lang=de" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="ChapterLOG" />
  <meta property="og:locale" content="tr_TR" />
  <meta property="og:image" content="${SITE}/opengraph.jpg" />${articleMeta}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  ${linkTags}
</head>`;
}

function wrapPage(head, bodyHtml, footerNote) {
  return `${head}
<body>
  <div id="root">
    <article class="prerender-content" style="max-width:48rem;margin:0 auto;padding:2rem 1.25rem;font-family:system-ui,sans-serif;line-height:1.6;color:#e8e8e8;background:#131313">
      ${bodyHtml}
      <footer style="margin-top:2rem;padding-top:1rem;border-top:1px solid #333;font-size:0.85rem;color:#888">
        <p>${footerNote}</p>
        <p><a href="${SITE}/contact" style="color:#fb5b2d">ChapterLOG — Teklif Alın</a> · <a href="tel:+905333803056" style="color:#fb5b2d">+90 533 380 30 56</a></p>
      </footer>
    </article>
  </div>
  ${scriptTags}
</body>
</html>`;
}

function writePrerender(relDir, html) {
  const dir = join(DIST, relDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
}

const posts = loadBlogPosts();
let count = 0;

for (const post of posts) {
  const path = `/blog/${post.slug}`;
  const sections = post.body
    .map(
      (s) =>
        `<section style="margin-bottom:1.5rem"><h2 style="font-size:1.1rem;margin-bottom:0.5rem">${escapeHtml(s.subtitle)}</h2><p style="white-space:pre-line;color:#aaa">${escapeHtml(s.text)}</p></section>`,
    )
    .join("");
  const highlights =
    post.highlights.length > 0
      ? `<ul>${post.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>`
      : "";
  const body = `
    <nav><a href="${SITE}/blog" style="color:#fb5b2d">← Blog</a></nav>
    <p style="color:#888;font-size:0.75rem;text-transform:uppercase">${escapeHtml(post.tag)}</p>
    <h1 style="font-size:1.75rem;margin:0.5rem 0 1rem">${escapeHtml(post.title)}</h1>
    <p style="font-style:italic;border-left:3px solid #fb5b2d;padding-left:1rem;color:#bbb">${escapeHtml(post.excerpt)}</p>
    ${highlights}
    ${sections}
  `;
  const head = buildHead({
    title: `${post.title} — ChapterLOG`,
    description: post.excerpt,
    path,
    ogType: "article",
    publishedTime: post.isoDate,
  });
  writePrerender(`blog/${post.slug}`, wrapPage(head, body, "Tam etkileşimli site için JavaScript etkinleştirin."));
  count++;
}

for (const cat of BLOG_CATEGORIES_META) {
  const catPosts = posts.filter((p) => p.tag === cat.tagTr);
  const path = `/blog/kategori/${cat.slug}`;
  const list = catPosts
    .map(
      (p) =>
        `<li style="margin-bottom:0.75rem"><a href="${SITE}/blog/${p.slug}" style="color:#fb5b2d;font-weight:600">${escapeHtml(p.title)}</a><br/><span style="color:#888;font-size:0.9rem">${escapeHtml(p.excerpt)}</span></li>`,
    )
    .join("");
  const body = `
    <nav><a href="${SITE}/blog" style="color:#fb5b2d">← Blog</a></nav>
    <h1 style="font-size:1.75rem;margin:1rem 0">${escapeHtml(cat.titleTr)}</h1>
    <p style="color:#bbb">${escapeHtml(cat.descTr)}</p>
    <p style="color:#888">${catPosts.length} rehber</p>
    <ul style="list-style:none;padding:0;margin-top:1.5rem">${list}</ul>
  `;
  const head = buildHead({
    title: `${cat.titleTr} | ChapterLOG Blog`,
    description: cat.descTr,
    path,
  });
  writePrerender(`blog/kategori/${cat.slug}`, wrapPage(head, body, "ChapterLOG — Türkiye Rusya lojistik rehberleri."));
  count++;
}

const staticPages = [
  { dir: "services", path: "/services", title: "Hizmetler — ChapterLOG", desc: "Türkiye-Rusya nakliye, para transferi, gümrük danışmanlığı ve 10 lojistik hizmet." },
  { dir: "about", path: "/about", title: "Hakkımızda — ChapterLOG", desc: "Kayseri merkezli ChapterLOG — 10+ yıl Türkiye-Rusya lojistik tecrübesi." },
  { dir: "contact", path: "/contact", title: "İletişim — ChapterLOG", desc: "ChapterLOG ile iletişime geçin. 24 saat içinde teklif." },
  { dir: "blog", path: "/blog", title: "Blog — ChapterLOG", desc: "Türkiye-Rusya lojistik, gümrük ve para transferi uzman rehberleri." },
];

for (const page of staticPages) {
  const head = buildHead({ title: page.title, description: page.desc, path: page.path });
  const body = `<h1>${escapeHtml(page.title.replace(" — ChapterLOG", ""))}</h1><p>${escapeHtml(page.desc)}</p><p><a href="${SITE}${page.path}" style="color:#fb5b2d">Siteyi aç →</a></p>`;
  writePrerender(page.dir, wrapPage(head, body, "ChapterLOG LLC"));
  count++;
}

console.log(`Prerendered ${count} HTML pages under dist/public/`);
