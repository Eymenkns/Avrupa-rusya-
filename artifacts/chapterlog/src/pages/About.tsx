import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ShieldCheck,
  Globe2,
  Award,
  Truck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Scale,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const MVV_ICONS = [<Target size={24} />, <Globe2 size={24} />, <Award size={24} />];

const WHY_ICONS = [
  <Truck size={18} />,
  <Clock size={18} />,
  <ShieldCheck size={18} />,
  <TrendingUp size={18} />,
  <Scale size={18} />,
];

const ROUTE_FLAGS = ["TR → RU", "EU → TR", "Transit"];

export default function About() {
  const { t } = useLang();
  const ap = t.aboutPage;

  const mvv = [
    { icon: MVV_ICONS[0], title: ap.missionTitle, text: ap.missionText },
    { icon: MVV_ICONS[1], title: ap.visionTitle, text: ap.visionText },
    { icon: MVV_ICONS[2], title: ap.valuesTitle, text: ap.valuesText },
  ];

  const whyItems = ap.whyItems.map((item, i) => ({
    icon: WHY_ICONS[i],
    title: item.title,
    desc: item.desc,
  }));

  const routeCards = ap.routeCards.map((card, i) => ({
    flag: ROUTE_FLAGS[i],
    title: card.title,
    desc: card.desc,
    services: card.services,
  }));

  return (
    <main className="flex-1 w-full bg-background pt-24 pb-20">
      <SEO
        path="/about"
        titleTr="Hakkımızda — ChapterLOG | Kayseri Merkezli Türkiye-Rusya Lojistik Şirketi"
        titleEn="About Us — ChapterLOG | Kayseri-Based Turkey-Russia Logistics Company"
        titleRu="О нас — ChapterLOG | Логистическая компания Турция–Россия (Кайсери)"
        descTr="ChapterLOG hakkında bilgi alın: Kayseri merkezli, 10+ yıllık Türkiye-Rusya lojistik tecrübesi. Misyonumuz, değerlerimiz ve neden ChapterLOG'u seçmelisiniz?"
        descEn="Learn about ChapterLOG: Kayseri-based, 10+ years of Turkey–Russia logistics experience. Our mission, values and why choose us?"
        descRu="Узнайте о ChapterLOG: логистика Турция–Россия с базой в Кайсери, 10+ лет опыта. Миссия, ценности и почему выбирают нас."
        keywordsTr="ChapterLOG hakkında, Kayseri nakliye firması, Türkiye Rusya lojistik şirketi, uluslararası nakliye firması, gümrük müşavirliği, Rusya ticaret danışmanlığı"
        keywordsEn="about ChapterLOG, Kayseri logistics company, Turkey Russia logistics company, international freight forwarding, customs brokerage, Russia trade consultancy"
        keywordsRu="о компании ChapterLOG, логистическая компания Кайсери, Турция Россия логистика, международные грузоперевозки, таможенный брокер, торговый консалтинг Россия"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://chapterlog.com.tr/" },
            { "@type": "ListItem", "position": 2, "name": "Hakkımızda", "item": "https://chapterlog.com.tr/about" },
          ],
        })}</script>
      </Helmet>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="bg-[#111010] relative overflow-hidden border-b-2 border-accent">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/tir-truck-transport.png" alt="ChapterLOG Türkiye-Rusya uluslararası karayolu nakliye TIR" className="w-full h-full object-cover grayscale" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-accent" />
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-sans">{ap.eyebrow}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {t.about.title}
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-2xl font-serif">
              {ap.heroParagraph}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 self-center"
          >
            {[
              { val: "10+", label: ap.statLabels[0] },
              { val: "2.500+", label: ap.statLabels[1] },
              { val: "300+", label: ap.statLabels[2] },
              { val: "10", label: ap.statLabels[3] },
            ].map((s) => (
              <div key={s.label} className="bg-[#1a1919] border border-white/6 p-5">
                <div className="text-3xl font-display font-extrabold text-accent mb-1">{s.val}</div>
                <div className="text-sm text-white/50 font-sans">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8 leading-tight" style={{ whiteSpace: "pre-line" }}>
                {ap.storyTitle}
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed font-serif">
                <p>{ap.storyP1}</p>
                <p>{ap.storyP2}</p>
                <p>{ap.storyP3}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/about-story.png"
                  alt="ChapterLOG kuruluş hikayesi Türkiye Rusya lojistik operasyonları"
                  className="w-full h-80 object-cover grayscale-[20%]"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ──────────────── */}
      <section className="py-20 bg-[#111010]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mvv.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#1a1919] border border-white/6 p-8"
              >
                <div className="text-accent mb-5">{item.icon}</div>
                <h3 className="text-base font-bold text-foreground mb-3 font-display">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-serif">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHAPTERLOG ──────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
                {ap.whyTitle}
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed font-serif">{ap.whySub}</p>
              <div className="space-y-5">
                {whyItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/5 border border-white/8 flex items-center justify-center text-accent flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-0.5 font-display">{item.title}</h4>
                      <p className="text-sm text-white/40 font-serif">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/warehouse-interior.png"
                  alt="ChapterLOG depo ve antrepo iç görünüm lojistik altyapı"
                  className="w-full h-96 object-cover grayscale-[20%]"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-5 right-5 bg-[#1a1919] border border-white/10 p-5 shadow-xl">
                <div className="text-4xl font-display font-extrabold text-accent mb-1">10+</div>
                <div className="text-sm font-medium text-white/50 font-sans">{ap.expBadgeLabel}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ROUTES ──────────────────────────────────── */}
      <section className="py-20 bg-[#111010]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-display font-bold text-foreground mb-3">{ap.routesSectionTitle}</h2>
            <p className="text-white/40 max-w-2xl font-serif">{ap.routesSectionSub}</p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {routeCards.map((r) => (
              <motion.div key={r.title} variants={fadeUp} className="bg-[#1a1919] border border-white/6 p-8">
                <div className="text-xs font-mono text-accent font-bold tracking-wider mb-5 border border-accent/30 inline-block px-2 py-1">{r.flag}</div>
                <h3 className="text-base font-bold text-foreground mb-3 font-display">{r.title}</h3>
                <p className="text-white/40 text-sm mb-5 leading-relaxed font-serif">{r.desc}</p>
                <ul className="space-y-2">
                  {r.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-white/50 font-sans">
                      <CheckCircle2 size={12} className="text-accent flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LEGAL ──────────────────────────────────── */}
      <section className="py-16 bg-[#0e0e0e] border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-5"
          >
            <Scale size={18} className="text-white/25 mt-1 shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 font-display">{ap.legalTitle}</h2>
              <div className="space-y-3 text-white/40 text-sm leading-relaxed font-serif">
                <p>
                  <strong className="text-white/60">{ap.legalP1Bold}</strong>
                  {ap.legalP1Rest}
                </p>
                <p>{ap.legalP2}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {ap.legalBadges.map((b) => (
                  <span key={b} className="px-3 py-1 bg-white/5 border border-white/8 text-[10px] font-semibold text-white/40 font-sans tracking-wide uppercase">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#1a1919] p-10 md:p-14 border-l-2 border-accent">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{ap.ctaTitle}</h2>
              <p className="text-white/40 leading-relaxed font-serif">{ap.ctaSub}</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="px-8 font-bold font-display">
                  {ap.ctaQuote} <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" size="lg" className="text-white/70 border border-white/15 hover:bg-white/8 hover:text-white px-8">
                  {ap.ctaServices}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
