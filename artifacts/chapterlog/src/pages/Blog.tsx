import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CalendarDays, Tag, Clock, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { blogPosts, TAGS } from "@/data/blogPosts";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } },
};

export default function Blog() {
  const { t } = useLang();
  const [activeTag, setActiveTag] = useState("Tümü");

  const filtered = activeTag === "Tümü" ? blogPosts : blogPosts.filter((p) => p.tag === activeTag);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ChapterLOG Blog — Türkiye-Rusya Lojistik Rehberleri",
    "description": "Türkiye-Rusya lojistik, gümrük ve para transferi hakkında uzman makaleler.",
    "url": "https://chapterlog.com.tr/blog",
    "publisher": {
      "@type": "Organization",
      "name": "ChapterLOG LLC",
      "url": "https://chapterlog.com.tr",
    },
    "hasPart": blogPosts.map((p) => ({
      "@type": "Article",
      "headline": p.title,
      "url": `https://chapterlog.com.tr/blog/${p.slug}`,
      "datePublished": p.isoDate,
      "image": `https://chapterlog.com.tr${p.image}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://chapterlog.com.tr" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://chapterlog.com.tr/blog" },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background pt-24 pb-20">
      <SEO
        path="/blog"
        titleTr="Blog — ChapterLOG | Türkiye-Rusya Lojistik, Gümrük ve Para Transferi Rehberleri"
        titleEn="Blog — ChapterLOG | Turkey-Russia Logistics, Customs & Money Transfer Guides"
        titleRu="Блог — ChapterLOG | Руководства по логистике, таможне и переводам Турция–Россия"
        descTr="Rusya nakliye maliyetleri, gümrük prosedürleri, para transferi oranları ve dış ticaret rehberleri. ChapterLOG uzman blog yazıları."
        descEn="Russia freight costs, customs procedures, money transfer rates and trade guides. Expert blog posts from ChapterLOG."
        descRu="Стоимость грузоперевозок в Россию, таможенные процедуры, ставки денежных переводов и торговые руководства от ChapterLOG."
        keywordsTr="Rusya nakliye rehberi, Rusya gümrük prosedürleri, para transferi oranları, Türkiye Rusya ticaret, nakliye fiyatları 2025 2026, EAC sertifika rehberi, CMR sigorta, parsiyel nakliye fiyat, FTL tır fiyat"
        keywordsEn="Russia shipping guide, Russia customs procedures, money transfer rates Turkey Russia, freight costs 2025 2026, EAC certificate guide, CMR insurance, LTL pricing Russia, FTL truck cost"
        keywordsRu="руководство по перевозке Россия, таможенные процедуры Россия, курс перевода Турция Россия, стоимость грузоперевозок 2025 2026, сертификат EAC, страхование CMR"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Header */}
      <section className="bg-[#111010] border-b-2 border-accent relative overflow-hidden min-h-[320px] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent rounded-full blur-[150px] opacity-[0.04]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="bgrid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#bgrid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px bg-accent" />
                <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs font-sans">{t.blog.label}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">{t.blog.title}</h1>
              <p className="text-base text-white/50 leading-relaxed font-serif max-w-lg">{t.blog.sub}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                {["Nakliye", "Gümrük", "Para Transferi", "Transit"].map((topic) => (
                  <span key={topic} className="text-[11px] font-semibold text-white/30 bg-white/4 border border-white/8 px-3 py-1.5 font-sans tracking-wide">
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: featured post visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block relative h-[240px]"
            >
              <div className="grid grid-cols-3 gap-2 h-full">
                <div className="col-span-2 overflow-hidden relative">
                  <img src="/images/logistics-operations.png" alt="ChapterLOG uluslararası lojistik operasyonları" className="w-full h-full object-cover grayscale-[20%]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="grid grid-rows-2 gap-2">
                  <div className="overflow-hidden relative">
                    <img src="/images/money-transfer.png" alt="ChapterLOG ticari para transferi hizmeti" className="w-full h-full object-cover grayscale-[20%]" loading="lazy" />
                  </div>
                  <div className="overflow-hidden relative">
                    <img src="/images/europe-turkey-trade.png" alt="ChapterLOG Avrupa Türkiye ticaret koridoru" className="w-full h-full object-cover grayscale-[20%]" loading="lazy" />
                  </div>
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 border-accent opacity-40" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="py-3 border-b border-white/5 bg-[#0e0e0e] sticky top-[64px] z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 px-3.5 py-1.5 text-[11px] font-bold transition-all border font-sans tracking-wide ${
                  activeTag === tag
                    ? "bg-accent text-black border-accent shadow-[0_0_12px_rgba(251,91,45,0.3)]"
                    : "bg-transparent text-white/35 border-white/10 hover:border-white/30 hover:text-white/65 hover:bg-white/4"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <motion.article
                key={post.id}
                variants={fadeUp}
                className="relative bg-[#151414] border border-white/6 overflow-hidden hover:bg-[#1a1919] hover:border-white/15 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col group"
              >
                {/* Accent top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

                {/* Cover image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={`${post.title} — ChapterLOG blog`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[25%] group-hover:grayscale-0"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${post.id}/600/400`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <span className={`absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 font-sans backdrop-blur-sm ${post.tagColor}`}>
                    <Tag size={9} /> {post.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3 text-white/25">
                    <span className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest"><CalendarDays size={10} /> {post.date}</span>
                    <span className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest"><Clock size={10} /> {post.readTime}</span>
                  </div>

                  <h2 className="text-sm font-bold text-white/85 mb-2.5 group-hover:text-accent transition-colors leading-snug font-display">{post.title}</h2>
                  <p className="text-xs text-white/35 leading-relaxed flex-1 mb-4 font-serif">{post.excerpt}</p>

                  <ul className="space-y-1.5 mb-5 border-t border-white/6 pt-4">
                    {post.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-white/35 font-serif">
                        <CheckCircle2 size={11} className="text-accent mt-0.5 shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/blog/${post.slug}`}>
                    <span className="inline-flex items-center gap-1.5 text-accent font-bold text-xs group-hover:gap-3 transition-all mt-auto font-display tracking-wide cursor-pointer">
                      {t.blog.readMore} <ArrowRight size={12} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6 pb-8">
        <div className="bg-[#1a1919] p-10 md:p-14 text-center border-l-2 border-accent">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Sorularınız mı Var?</h2>
            <p className="text-white/40 mb-8 leading-relaxed font-serif">Uzman ekibimiz Türkiye-Rusya lojistiği ve ticareti hakkında her sorunuzu yanıtlamaya hazır.</p>
            <Link href="/contact">
              <button className="px-10 py-4 bg-accent text-black font-bold text-base hover:bg-accent/90 transition-colors font-display">
                Hemen Yazın
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
