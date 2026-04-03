import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, Tag, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "@/data/blogPosts";
import { SEO } from "@/components/SEO";

const SITE_URL = "https://chapterlog.com.tr";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="flex-1 w-full bg-background pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4 font-display">Makale bulunamadı</h1>
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 text-accent font-bold font-display">
              <ArrowLeft size={16} /> Bloga Dön
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.isoDate,
    "dateModified": post.isoDate,
    "image": `${SITE_URL}${post.image}`,
    "url": `${SITE_URL}/blog/${post.slug}`,
    "inLanguage": "tr",
    "author": {
      "@type": "Organization",
      "name": "ChapterLOG LLC",
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChapterLOG LLC",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background pt-24 pb-20">
      <SEO
        path={`/blog/${post.slug}`}
        titleTr={`${post.title} — ChapterLOG`}
        titleEn={`${post.title} — ChapterLOG`}
        titleRu={`${post.title} — ChapterLOG`}
        descTr={post.excerpt}
        descEn={post.excerpt}
        descRu={post.excerpt}
        ogType="article"
        ogImage={post.image.startsWith("http") ? post.image : `https://chapterlog.com.tr${post.image}`}
        publishedTime={post.isoDate}
        modifiedTime={post.isoDate}
        keywordsTr={post.tags?.join(", ")}
        keywordsEn={post.tags?.join(", ")}
        keywordsRu={post.tags?.join(", ")}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative h-[380px] md:h-[480px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${post.id + 10}/1200/480`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 md:px-6 pb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 mb-4 font-sans rounded-full ${post.tagColor}`}>
                <Tag size={10} /> {post.tag}
              </span>
              <h1 className="text-2xl md:text-4xl font-display font-bold text-white leading-snug max-w-3xl">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-10 max-w-3xl">
        {/* Back link */}
        <Link href="/blog">
          <button className="inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm font-sans mb-8">
            <ArrowLeft size={14} /> Blog
          </button>
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-5 mb-6 text-white/30 text-xs font-sans uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-white/50 leading-relaxed mb-8 italic border-l-2 border-accent pl-4 font-serif">
          {post.excerpt}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 p-5 bg-white/4 border border-white/8">
          {post.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2 text-xs font-serif">
              <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
              <span className="text-white/60">{h}</span>
            </div>
          ))}
        </div>

        {/* Body sections */}
        {post.body.map((section, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 font-display">{section.subtitle}</h2>
            <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-5 items-start`}>
              <img
                src={section.img}
                alt={`${section.subtitle} — ${post.tag} rehberi ChapterLOG`}
                className="w-full md:w-56 h-36 object-cover flex-shrink-0 grayscale-[20%]"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${i * 5}/400/300`; }}
              />
              <p className="text-sm text-white/40 leading-relaxed whitespace-pre-line flex-1 font-serif">{section.text}</p>
            </div>
          </div>
        ))}

        {/* Related Posts */}
        {(() => {
          const related = blogPosts
            .filter((p) => p.id !== post.id && (p.tag === post.tag || p.tags?.some((t) => post.tags?.includes(t))))
            .slice(0, 3);
          if (related.length === 0) return null;
          return (
            <div className="mt-12 border-t border-white/8 pt-8">
              <h2 className="text-lg font-bold text-white mb-6 font-display">İlgili Yazılar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`}>
                    <article className="group border border-white/6 bg-[#151414] overflow-hidden hover:border-accent/25 transition-all duration-200 cursor-pointer">
                      <div className="relative h-28 overflow-hidden">
                        <img
                          src={r.image}
                          alt={`${r.title} — ChapterLOG blog`}
                          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-3">
                        <span className={`text-[9px] font-bold px-2 py-0.5 font-sans ${r.tagColor}`}>{r.tag}</span>
                        <h3 className="text-xs font-bold text-white/80 mt-2 leading-snug font-display line-clamp-2 group-hover:text-accent transition-colors">
                          {r.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}

        {/* CTA */}
        <div className="mt-10 border-t border-white/8 pt-8">
          <Link href="/contact">
            <button className="w-full py-4 bg-accent text-black font-bold hover:bg-accent/90 transition-colors text-sm font-display tracking-wide">
              Bu Hizmet İçin Teklif Alın
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
