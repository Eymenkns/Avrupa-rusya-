import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Tag, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "@/data/blogPosts";
import { SEO } from "@/components/SEO";
import { useLang } from "@/contexts/LanguageContext";
import { BLOG_TAG_LABELS } from "@/data/blogLocales";
import { formatReadTime, getLocalizedBlogCard } from "@/lib/blogLocalization";
import { getCategoryBySlug } from "@/lib/blogCategories";
import NotFound from "@/pages/not-found";

const SITE_URL = "https://chapterlog.com.tr";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90 } },
};

export default function BlogCategory() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { lang, t } = useLang();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  const posts = useMemo(
    () => (category ? blogPosts.filter((p) => p.tag === category.tagTr) : []),
    [category],
  );

  if (!category) {
    return <NotFound />;
  }

  const tagLabel = BLOG_TAG_LABELS[category.tagTr]?.[lang] ?? category.tagTr;
  const titles: Record<string, string> = {
    tr: category.titleTr,
    en: category.titleEn,
    ru: category.titleRu,
    de: category.titleDe,
  };
  const descs: Record<string, string> = {
    tr: category.descTr,
    en: category.descEn,
    ru: category.descRu,
    de: category.descDe,
  };
  const pageTitle = titles[lang] ?? category.titleTr;
  const pageDesc = descs[lang] ?? category.descTr;
  const path = `/blog/kategori/${category.slug}`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDesc,
    url: `${SITE_URL}${path}`,
    inLanguage: lang,
    publisher: {
      "@type": "Organization",
      name: "ChapterLOG LLC",
      url: SITE_URL,
    },
    hasPart: posts.map((p) => ({
      "@type": "Article",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.isoDate,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.nav.home, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t.blog.label, item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: tagLabel, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background pt-24 pb-20">
      <SEO
        path={path}
        titleTr={`${category.titleTr} | ChapterLOG Blog`}
        titleEn={`${category.titleEn} | ChapterLOG Blog`}
        titleRu={`${category.titleRu} | ChapterLOG Blog`}
        titleDe={`${category.titleDe} | ChapterLOG Blog`}
        descTr={category.descTr}
        descEn={category.descEn}
        descRu={category.descRu}
        descDe={category.descDe}
        keywordsTr={category.keywordsTr}
        keywordsEn={category.keywordsTr}
        keywordsRu={category.keywordsTr}
        keywordsDe={category.keywordsTr}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="bg-[#111010] border-b-2 border-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm font-sans mb-6 cursor-pointer">
              <ArrowLeft size={14} /> {t.blog.post.backLabel}
            </span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs font-sans">{tagLabel}</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-4">{pageTitle}</h1>
            <p className="text-white/50 max-w-2xl font-serif leading-relaxed">{pageDesc}</p>
            <p className="text-white/30 text-sm mt-4 font-sans">
              {posts.length} {t.blog.category.articleCount}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {posts.map((post) => {
              const loc = getLocalizedBlogCard(post, lang);
              const readLabel = formatReadTime(post.readTime, lang);
              return (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  className="relative bg-[#151414] border border-white/6 overflow-hidden hover:border-white/15 transition-all flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={loc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 ${post.tagColor}`}>
                      <Tag size={9} className="inline mr-1" />
                      {loc.tag}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex gap-3 text-[10px] text-white/25 mb-2 uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={10} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {readLabel}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-white/85 mb-2 font-display group-hover:text-accent transition-colors">
                      {loc.title}
                    </h2>
                    <p className="text-xs text-white/35 flex-1 mb-3 font-serif">{loc.excerpt}</p>
                    <ul className="space-y-1 mb-4">
                      {post.highlights.slice(0, 2).map((h) => (
                        <li key={h} className="flex gap-2 text-xs text-white/35">
                          <CheckCircle2 size={11} className="text-accent shrink-0 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="inline-flex items-center gap-1 text-accent font-bold text-xs cursor-pointer">
                        {t.blog.readMore} <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-8">
        <div className="bg-[#1a1919] p-8 text-center border-l-2 border-accent">
          <p className="text-white/40 mb-4 font-serif">{t.blog.ctaSub}</p>
          <Link href="/contact">
            <button type="button" className="px-8 py-3 bg-accent text-black font-bold font-display">
              {t.blog.ctaBtn}
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
