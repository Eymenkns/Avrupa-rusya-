import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Scale, CalendarDays, CheckCircle2, MapPin, Shield, Clock, Package, ShieldCheck, Truck, Banknote, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let start = 0;
          const step = end / (duration / 16);
          timerRef.current = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              if (timerRef.current) clearInterval(timerRef.current);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [end, duration]);

  return { count, ref };
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const BLOG_META = [
  { img: "/images/money-transfer.png",       tag: "bg-amber-500/15 text-amber-300" },
  { img: "/images/partial-cargo-truck.png",  tag: "bg-green-500/15 text-green-300" },
  { img: "/images/customs-documents.png",    tag: "bg-red-500/15 text-red-300" },
  { img: "/images/tir-truck-transport.png",  tag: "bg-orange-500/15 text-orange-300" },
  { img: "/images/container-shipping.png",   tag: "bg-teal-500/15 text-teal-300" },
  { img: "/images/europe-turkey-trade.png",  tag: "bg-sky-500/15 text-sky-300" },
];

const ROUTE_TAGS = ["🇹🇷 → 🇷🇺", "🇹🇷 → 🇷🇺", "🇹🇷 ↔ 🇷🇺", "🇹🇷 ↔ 🇷🇺", "🇪🇺 → 🇹🇷"];

export default function Home() {
  const { lang, t } = useLang();
  const [routeMounted, setRouteMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const counter1 = useCountUp(15, 1800);
  const counter2 = useCountUp(2500, 2200);

  useEffect(() => {
    const timer = setTimeout(() => setRouteMounted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Türkiye'den Rusya'ya yük göndermek ne kadar sürer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Parsiyel nakliyede (LTL) Kayseri–Moskova hattında ortalama 7–10 iş günü, komple tır (FTL) sevkiyatlarında 5–8 iş günü sürmektedir. Avrupa çıkışlı yükler için Türkiye üzerinden transit süre 14–21 gündür. Hava yükü kombinasyonuyla bu süreler kısaltılabilir.",
        },
      },
      {
        "@type": "Question",
        "name": "Rusya'ya ticari para transferi güvenli mi ve yasal mıdır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet. Türkiye, AB ve ABD yaptırımlarına taraf değildir; Türkiye-Rusya arasındaki ticari para transferleri Türk mevzuatı (5411 sayılı Bankacılık Kanunu ve 6493 sayılı Ödeme Hizmetleri Kanunu) çerçevesinde tamamen yasaldır. ChapterLOG, %3,5–%5 komisyon oranıyla en geç 5 iş günü içinde transfer gerçekleştirir.",
        },
      },
      {
        "@type": "Question",
        "name": "Gümrük evrakları kim hazırlar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ChapterLOG, Türkiye çıkış gümrüğü ve Rusya giriş gümrüğü için gerekli tüm belgeleri (GTİP tespiti, beyanname, CMR, TIR karnesi, UBAK izinleri, EAC sertifikası desteği) sizin adınıza hazırlar ve takip eder. Sizi hiçbir bürokratik yükle uğraştırmadan yükünüz hedefe ulaşır.",
        },
      },
      {
        "@type": "Question",
        "name": "Rusya'ya mal göndermek için EAC sertifikası gerekli midir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pek çok ürün kategorisi için EAC (Avrasya Uygunluk İşareti) sertifikası zorunludur: elektrik/elektronik ürünler, tekstil, gıda ambalajları, inşaat malzemeleri, oyuncaklar ve tıbbi cihazlar bu kategoriler arasındadır. ChapterLOG, Rusya'daki akredite test kuruluşlarıyla işbirliği içinde sertifikasyon sürecini sizin adınıza yönetir. Süreç ürüne göre 2–8 hafta sürmektedir.",
        },
      },
      {
        "@type": "Question",
        "name": "Avrupa'dan Rusya'ya mal göndermenin yasal yolu nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "2022 yaptırımları sonrası Avrupa-Rusya doğrudan karayolu hatları kapanmıştır. En yasal ve güvenli çözüm Türkiye transit güzergahıdır: Avrupa → Türkiye → Gürcistan/Azerbaycan → Rusya. Türk TIR araçları hem AB ülkelerine hem de Rusya'ya serbestçe girebilmektedir. ChapterLOG bu hattı TIR karnesi ve UBAK izinleriyle eksiksiz yönetmektedir.",
        },
      },
      {
        "@type": "Question",
        "name": "Parsiyel nakliye mi yoksa komple tır mı tercih etmeliyim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1–12 m³ arası yükler için parsiyel nakliye (LTL) daha ekonomiktir; Kayseri–Moskova hattında 325 USD/m³'ten başlar. 12 m³ üzeri, zaman kritik veya hassas yükler için FTL komple tır daha avantajlıdır. ChapterLOG her iki seçeneği de sunar; yük bilgilerinizi paylaşırsanız size özel karşılaştırmalı teklif hazırlanır.",
        },
      },
      {
        "@type": "Question",
        "name": "500.000 Euro CMR sigortası ne anlama gelir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CMR (Convention Merchandises Routières) sigortası, uluslararası karayolu taşımacılığında yükün hasar görmesi, kaybolması veya geç teslimi durumunda nakliyecinin sorumluluğunu güvence altına alır. ChapterLOG'un tüm araçları standartta 500.000 Euro'ya kadar genişletilmiş CMR sigortasıyla donatılmıştır. Ek ücret yoktur.",
        },
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background overflow-x-hidden">
      <SEO
        path="/"
        titleTr="ChapterLOG — Avrupa'dan Rusya'ya Nakliye, Para Transferi ve Gümrük Danışmanlığı"
        titleEn="ChapterLOG — Europe to Russia Freight, Money Transfer & Customs Consultancy"
        titleRu="ChapterLOG — Перевозки Европа–Россия, денежные переводы и таможенный консалтинг"
        descTr="Türkiye-Rusya ve Avrupa-Rusya hattında FTL nakliye, parsiyel yük, ticari para transferi ve gümrük danışmanlığı. 10+ yıl operasyon tecrübesi, tek çatı altında."
        descEn="FTL freight, partial loads, commercial money transfers and customs consultancy on the Turkey–Russia and Europe–Russia routes. 10+ years of experience, all under one roof."
        descRu="FTL-перевозки, сборный груз, коммерческие денежные переводы и таможенный консалтинг на маршрутах Турция–Россия и Европа–Россия. Опыт 10+ лет."
        keywordsTr="Avrupa Rusya nakliye, Türkiye Rusya nakliye, Rusya'ya yük göndermek, Rusya para transferi, gümrük danışmanlığı Rusya, FTL nakliye, parsiyel yük Rusya, TIR karneti, UBAK izni, Rusya transit lojistik, Kayseri nakliye firması"
        keywordsEn="Europe Russia freight, Turkey Russia logistics, shipping to Russia, Russia money transfer, customs consultancy Russia, FTL freight Turkey Russia, LTL partial load Russia, TIR carnet, UBAK permit, transit logistics"
        keywordsRu="грузоперевозки Турция Россия, Европа Россия транзит, отправить груз в Россию, денежные переводы Россия Турция, таможенное оформление Россия, FTL перевозки, сборный груз Россия, TIR карнет"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      {/* ── HERO — Corridor Map ───────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col selection:bg-accent selection:text-white">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="ChapterLOG Türkiye Rusya uluslararası lojistik nakliye"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/80" />
          {/* Subtle gradient blobs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent rounded-full blur-[150px] opacity-[0.06] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900 rounded-full blur-[150px] opacity-[0.06] pointer-events-none" />
        </div>

        {/* Content — centered */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 pt-24 pb-4 px-6">

          {/* Heading block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-10 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 justify-center mb-8">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.25em] uppercase font-sans border border-accent/30 px-3 py-1">
                {t.hero.routeEyebrow}
              </span>
              <span className="w-8 h-px bg-accent" />
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-[4.5rem] font-display font-bold tracking-tight text-white leading-[1.05] mb-6">
              {t.hero.title1}{" "}
              <span className="text-accent italic font-serif font-light">{t.hero.title2}</span>
            </h1>

            <p className="text-lg text-white/50 font-serif leading-relaxed max-w-xl mx-auto mb-10">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="px-9 py-5 text-base font-bold font-display shadow-[0_0_20px_rgba(251,91,45,0.35)]">
                  {t.hero.cta}
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" size="lg" className="px-9 py-5 text-base font-semibold text-white/80 border border-white/15 hover:bg-white/8 hover:border-white/30 hover:text-white">
                  {t.hero.secondary} <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 justify-center mt-8">
              {[
                { icon: Truck,       label: lang === "de" ? "FTL & LTL Fracht" : lang === "en" ? "FTL & LTL Freight" : lang === "ru" ? "FTL & LTL Перевозки" : "FTL & LTL Nakliye" },
                { icon: Banknote,    label: lang === "de" ? "3,5 % Provision" : lang === "en" ? "3.5% Commission" : lang === "ru" ? "3,5 % Комиссия" : "%3,5 Para Transferi" },
                { icon: Package,     label: lang === "de" ? "Zollberatung" : lang === "en" ? "Customs Consultancy" : lang === "ru" ? "Таможенный консалтинг" : "Gümrük Danışmanlığı" },
                { icon: ShieldCheck, label: lang === "de" ? "Europa–Russland Transit" : lang === "en" ? "Europe–Russia Transit" : lang === "ru" ? "Европа–Россия Транзит" : "Avrupa-Rusya Transit" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="group inline-flex items-center gap-2 text-[11px] font-semibold text-white/40 bg-white/[0.04] border border-white/8 px-3.5 py-2 font-sans tracking-wide hover:text-white/70 hover:border-accent/25 hover:bg-accent/[0.06] transition-all duration-200">
                  <span className="w-5 h-5 flex items-center justify-center bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon size={10} className="text-accent" />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Route Visualization ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto relative"
          >
            {/* The animated line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 overflow-hidden">
              <div
                className={`absolute inset-0 bg-accent chapter-route-line${routeMounted ? " chapter-route-line--visible" : ""}`}
                style={{
                  boxShadow: "0 0 12px #fb5b2d",
                  transformOrigin: "left",
                  animation: routeMounted ? "chapterRouteExpand 2.4s ease-out forwards" : "none",
                  transform: "scaleX(0)"
                }}
              />
            </div>

            {/* Nodes row */}
            <div className="relative flex justify-between items-center w-full">

              {/* Anchor: Europe */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-[#1a1919] border-2 border-accent flex items-center justify-center shadow-[0_0_20px_rgba(251,91,45,0.4)] relative">
                  <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
                  <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-20" />
                </div>
                <div className="mt-5 text-center">
                  <div className="text-lg md:text-xl font-bold font-display text-white">{lang === "de" ? "EUROPA" : lang === "en" ? "EUROPE" : lang === "ru" ? "ЕВРОПА" : "AVRUPA"}</div>
                  <div className="text-[10px] text-white/35 font-mono mt-1 tracking-widest">{lang === "de" ? "START" : lang === "en" ? "ORIGIN" : lang === "ru" ? "НАЧАЛО" : "BAŞLANGIÇ"}</div>
                </div>
              </div>

              {/* Stop 1: Loading */}
              <div className="relative z-10 flex flex-col items-center group translate-y-4">
                <div className="w-6 h-6 rounded-full bg-[#0d0d0d] border-2 border-white/25 flex items-center justify-center transition-colors group-hover:border-accent group-hover:shadow-[0_0_12px_rgba(251,91,45,0.4)]">
                  <div className="w-2 h-2 rounded-full bg-white/25 group-hover:bg-accent transition-colors" />
                </div>
                <div className="mt-3 text-center absolute top-full w-28 left-1/2 -translate-x-1/2">
                  <Package className="w-4 h-4 mx-auto mb-1.5 text-white/30 group-hover:text-accent transition-colors" />
                  <div className="text-xs font-bold text-white/70 group-hover:text-white transition-colors font-display">{lang === "de" ? "Verladung" : lang === "en" ? "Loading" : lang === "ru" ? "Погрузка" : "Yükleme"}</div>
                  <div className="text-[10px] text-white/30 font-serif">{lang === "de" ? "Lagerung & Sortierung" : lang === "en" ? "Storage & Sorting" : lang === "ru" ? "Склад & Сортировка" : "Depolama & Tasnif"}</div>
                </div>
              </div>

              {/* Stop 2: Customs */}
              <div className="relative z-10 flex flex-col items-center group -translate-y-4">
                <div className="mb-3 text-center absolute bottom-full w-28 left-1/2 -translate-x-1/2">
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1.5 text-white/30 group-hover:text-accent transition-colors" />
                  <div className="text-xs font-bold text-white/70 group-hover:text-white transition-colors font-display">{lang === "de" ? "Zoll" : lang === "en" ? "Customs" : lang === "ru" ? "Таможня" : "Gümrük"}</div>
                  <div className="text-[10px] text-white/30 font-serif">{lang === "de" ? "Dokumente & Genehmigungen" : lang === "en" ? "Documents & Permits" : lang === "ru" ? "Документы & Разрешения" : "Evrak & İzinler"}</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#0d0d0d] border-2 border-white/25 flex items-center justify-center transition-colors group-hover:border-accent group-hover:shadow-[0_0_12px_rgba(251,91,45,0.4)]">
                  <div className="w-2 h-2 rounded-full bg-white/25 group-hover:bg-accent transition-colors" />
                </div>
              </div>

              {/* Stop 3: Transit */}
              <div className="relative z-10 flex flex-col items-center group translate-y-4">
                <div className="w-6 h-6 rounded-full bg-[#0d0d0d] border-2 border-white/25 flex items-center justify-center transition-colors group-hover:border-accent group-hover:shadow-[0_0_12px_rgba(251,91,45,0.4)]">
                  <div className="w-2 h-2 rounded-full bg-white/25 group-hover:bg-accent transition-colors" />
                </div>
                <div className="mt-3 text-center absolute top-full w-28 left-1/2 -translate-x-1/2">
                  <Truck className="w-4 h-4 mx-auto mb-1.5 text-white/30 group-hover:text-accent transition-colors" />
                  <div className="text-xs font-bold text-white/70 group-hover:text-white transition-colors font-display">Transit</div>
                  <div className="text-[10px] text-white/30 font-serif">{lang === "de" ? "Türkei-Durchfahrt" : lang === "en" ? "Turkey Transit" : lang === "ru" ? "Транзит через Турцию" : "Türkiye Geçişi"}</div>
                </div>
              </div>

              {/* Anchor: Moscow */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-[#1a1919] border-2 border-white/20 flex items-center justify-center transition-colors group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(251,91,45,0.4)]">
                  <div className="w-4 h-4 rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
                </div>
                <div className="mt-5 text-center">
                  <div className="text-lg md:text-xl font-bold font-display text-white">{lang === "de" ? "RUSSLAND" : lang === "en" ? "RUSSIA" : lang === "ru" ? "РОССИЯ" : "RUSYA"}</div>
                  <div className="text-[10px] text-white/35 font-mono mt-1 tracking-widest">{lang === "de" ? "ZIEL" : lang === "en" ? "DESTINATION" : lang === "ru" ? "НАЗНАЧЕНИЕ" : "VARIŞ"}</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/8 bg-gradient-to-r from-black/90 via-[#0d0c0c]/95 to-black/90 backdrop-blur-md mt-6">
          <div className="container mx-auto px-6 md:px-10 lg:px-14">
            <div className="grid grid-cols-3">
              {[
                { num: `${counter1.count}+`, ref: counter1.ref, icon: Globe,   label: t.stats.years,     sub: t.stats.subs[0] },
                { num: `${counter2.count.toLocaleString("tr-TR")}+`, ref: counter2.ref, icon: Truck,   label: t.stats.shipments, sub: t.stats.subs[1] },
                { num: "%3,5",   ref: null, icon: Banknote,label: t.stats.clients,   sub: t.stats.subs[2] },
              ].map((s, idx) => (
                <div key={s.label} ref={s.ref} className={`py-8 px-4 md:px-8 group relative ${idx > 0 ? "border-l border-white/6" : ""}`}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 border border-white/8 bg-white/[0.03] flex items-center justify-center shrink-0 group-hover:border-accent/30 transition-colors duration-300">
                      <s.icon size={18} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-2xl md:text-4xl font-display font-extrabold text-accent leading-none mb-1 transition-transform duration-300 group-hover:scale-[1.03] origin-left">{s.num}</div>
                      <div className="text-white/65 font-semibold text-[10px] md:text-xs tracking-[0.15em] uppercase font-sans">{s.label}</div>
                      <div className="text-white/30 text-[10px] mt-0.5 hidden md:block font-sans tracking-wide">{s.sub}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
      {/* ── ROUTES / CORRIDORS — redesigned ──────── */}
      <section className="py-16 md:py-24 bg-[#111010] relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent opacity-[0.03] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-accent" />
                <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase font-sans">{t.services.eyebrow}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 leading-tight">
                {t.home.corridorsSectionTitle}
              </h2>
              <p className="text-white/40 text-sm max-w-lg font-serif leading-relaxed">{t.home.corridorsSectionSub}</p>
            </div>
            <a href="/services" className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-white/40 hover:text-accent transition-colors font-display tracking-wide shrink-0">
              Tüm Hizmetler <ArrowRight size={13} />
            </a>
          </motion.div>

          {/* 2×2 corridor grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 max-w-5xl">

            {[
              {
                flags: ["🇪🇺","🇹🇷","🇷🇺"],
                label: "ANA HAT",
                labelAccent: true,
                title: "Avrupa → Türkiye → Rusya",
                desc: t.home.corridors[3]?.desc ?? "Avrupa'dan gelen yükler Türkiye üzerinden transit geçişle Rusya'nın her noktasına ulaştırılır.",
                tags: ["14–21 Gün", "TIR Karnesi", "500k€ CMR"],
                image: "/images/europe-turkey-trade.png",
                primary: true,
              },
              {
                flags: ["🇹🇷","🇷🇺"],
                label: "DİREKT",
                labelAccent: false,
                title: "Türkiye → Rusya",
                desc: t.home.corridors[0]?.desc ?? "Kayseri'den Moskova'ya haftalık düzenli seferler. FTL veya parsiyel yük.",
                tags: ["7–14 Gün", "Haftalık Sefer"],
                image: "/images/tir-truck-transport.png",
                primary: false,
              },
              {
                flags: ["🇷🇺","🇹🇷","🇪🇺"],
                label: "TRANSİT",
                labelAccent: false,
                title: "Rusya → Türkiye → Avrupa",
                desc: t.home.corridors[3]?.desc ?? "Rusya'dan Avrupa'ya çok ülkeli operasyon, merkezi koordinasyon.",
                tags: ["14–21 Gün", "Tek Sözleşme"],
                image: "/images/container-shipping.png",
                primary: false,
              },
              {
                flags: ["🇷🇺","🇹🇷"],
                label: "İTHALAT",
                labelAccent: false,
                title: "Rusya → Türkiye",
                desc: t.home.corridors[1]?.desc ?? "Rusya'dan Türkiye'ye mal getirme, ithalat gümrüğü ve depolama.",
                tags: ["10–18 Gün", "FTL / LTL"],
                image: "/images/warehouse-interior.png",
                primary: false,
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative overflow-hidden group cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_32px_rgba(0,0,0,0.5)] ${card.primary ? "border border-accent/30 hover:border-accent/50" : "border border-white/8 hover:border-white/18"} transition-all duration-300`}
                onClick={() => window.location.href = "/services"}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src={`${import.meta.env.BASE_URL}${card.image.slice(1)}`}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-[40%] group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className={`absolute inset-0 ${card.primary ? "bg-gradient-to-br from-[#0f0d0c]/90 via-[#1a0f0a]/85 to-accent/15" : "bg-gradient-to-br from-[#111010]/92 via-[#151414]/88 to-[#0d0d0d]/80"}`} />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6 md:p-7 flex flex-col min-h-[200px] md:min-h-[230px]">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      {card.flags.map((flag, fi) => (
                        <span key={fi} className="flex items-center gap-1.5">
                          <span className="text-xl leading-none">{flag}</span>
                          {fi < card.flags.length - 1 && (
                            <ArrowRight size={11} className="text-white/30 shrink-0" />
                          )}
                        </span>
                      ))}
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 font-sans tracking-[0.15em] ${card.labelAccent ? "bg-accent text-black" : "border border-white/20 text-white/45"}`}>
                      {card.label}
                    </span>
                  </div>

                  {/* Title & desc */}
                  <h3 className="text-base md:text-lg font-display font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed font-serif flex-1 mb-4 line-clamp-2">
                    {card.desc}
                  </p>

                  {/* Tag chips + CTA */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/8">
                    <div className="flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold text-white/35 bg-white/6 px-2 py-0.5 font-sans">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight size={14} className="text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile "all services" link */}
          <div className="mt-6 md:hidden text-center">
            <a href="/services" className="inline-flex items-center gap-2 text-xs font-bold text-white/40 hover:text-accent transition-colors font-display tracking-wide border border-white/12 px-5 py-2.5">
              Tüm Hizmetleri Gör <ArrowRight size={12} />
            </a>
          </div>

        </div>
      </section>
      {/* ── MONEY TRANSFER HIGHLIGHT ──────────────────── */}
      <section className="py-24 bg-[#0f0e0e]">
        <div className="container mx-auto px-6 md:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase font-sans">
                {t.home.moneyTransfer.eyebrow}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                  {t.home.moneyTransfer.title}
                </h2>
                <p className="text-white/45 leading-relaxed font-serif text-sm max-w-xl">
                  {t.home.moneyTransfer.sub}
                </p>
              </div>
              <Link href="/contact">
                <Button variant="accent" className="font-display text-sm px-6 shrink-0">
                  {t.home.moneyTransfer.cta} <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Two direction cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
          >
            {t.home.moneyTransfer.cards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative border border-white/8 bg-[#151414] hover:border-accent/30 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle background image */}
                <div className="absolute inset-0 pointer-events-none">
                  <img src={`${import.meta.env.BASE_URL}images/${i === 0 ? "money-transfer" : "europe-turkey-trade"}.png`} alt={i === 0 ? "ChapterLOG ticari para transferi hizmeti" : "ChapterLOG Avrupa Türkiye ticaret koridoru"} className="w-full h-full object-cover opacity-[0.06] grayscale" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#151414] via-[#151414]/95 to-[#151414]/80" />
                </div>
                {/* Accent glow strip */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                <div className="p-6 md:p-8 relative z-10">
                  {/* Direction header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-2xl leading-none">{card.from.split(" ")[0]}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-px bg-accent/50" />
                        <ArrowRight size={12} className="text-accent" />
                      </div>
                      <span className="text-2xl leading-none">{card.to.split(" ")[0]}</span>
                    </div>
                    <Banknote size={20} className="text-accent/40 group-hover:text-accent/70 transition-colors shrink-0" />
                  </div>

                  {/* Direction label */}
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-accent transition-colors duration-200">
                    {card.direction}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed font-serif mb-6">
                    {card.desc}
                  </p>

                  {/* Stat badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1 font-sans">
                      {card.commission}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 border border-white/10 px-3 py-1 font-sans">
                      <Clock size={10} className="shrink-0" />
                      {card.days}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 border border-white/10 px-3 py-1 font-sans">
                      <ShieldCheck size={10} className="shrink-0" />
                      {card.legal}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-3"
          >
            <Scale size={13} className="text-white/20 mt-0.5 shrink-0" />
            <p className="text-[11px] text-white/25 leading-relaxed font-serif max-w-2xl">
              {t.home.moneyTransfer.trust}
            </p>
          </motion.div>

        </div>
      </section>
      {/* ── SERVICES LIST ─────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent" />
                <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase font-sans">{t.services.eyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-5 leading-tight">
                {t.services.title}
              </h2>
              <p className="text-white/45 leading-relaxed mb-8 font-serif text-sm">{t.services.sub}</p>
              <Link href="/services">
                <Button variant="outline" className="border-white/15 text-white/70 hover:border-accent hover:text-accent text-sm">
                  {t.services.cta} <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-3"
            >
              {t.home.homeServices.map((s, i) => {
                const ServiceIcon = [Truck, Package, Banknote, ShieldCheck, Globe][i] || Truck;
                return (
                <motion.div key={s.title} variants={fadeUp}>
                  <Link href="/services">
                    <div className="group relative flex items-center gap-5 p-5 md:p-6 border border-white/6 bg-[#151414] cursor-pointer hover:border-accent/20 hover:bg-[#1a1919] hover:shadow-[0_2px_24px_rgba(0,0,0,0.4)] transition-all duration-200 overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                      <div className="w-11 h-11 border border-white/8 bg-white/[0.03] flex items-center justify-center shrink-0 group-hover:border-accent/25 group-hover:bg-accent/[0.06] transition-all duration-200">
                        <ServiceIcon size={16} className="text-white/30 group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-white/85 group-hover:text-white transition-colors font-display text-sm">{s.title}</h3>
                          <span className="text-[9px] font-bold text-white/20 bg-white/[0.04] border border-white/6 px-2 py-0.5 font-sans shrink-0">{ROUTE_TAGS[i]}</span>
                        </div>
                        <p className="text-xs text-white/30 leading-relaxed font-serif line-clamp-1">{s.desc}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-3">
                        <span className="text-accent font-bold text-xs font-mono bg-accent/8 px-2.5 py-1 border border-accent/15 hidden sm:inline">{s.price}</span>
                        <ArrowRight size={14} className="text-white/15 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )})}
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── ABOUT STRIP ──────────────────────────────── */}
      <section className="py-24 bg-[#111010]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-logistics.png`}
                  alt="ChapterLOG lojistik operasyon merkezi Türkiye Rusya nakliye"
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent" />
                <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase font-sans">{t.about.label}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                {t.about.title}
              </h2>
              <p className="text-white/50 mb-4 leading-relaxed font-serif text-sm">{t.about.p1}</p>
              <p className="text-white/35 mb-10 leading-relaxed text-sm font-serif">{t.about.p2}</p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: <Shield size={14} />, label: t.home.specLabels[0], val: "CMR 500K €" },
                  { icon: <Clock size={14} />,  label: t.home.specLabels[1], val: t.home.specVals[0] },
                  { icon: <CheckCircle2 size={14} />, label: t.home.specLabels[2], val: t.home.specVals[1] },
                  { icon: <MapPin size={14} />, label: t.home.specLabels[3], val: t.home.specVals[2] },
                ].map((item) => (
                  <div key={item.label} className="group border border-white/6 bg-[#1a1919] p-4 relative overflow-hidden hover:border-accent/20 transition-colors duration-200">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 bg-accent/10 flex items-center justify-center text-accent">{item.icon}</div>
                    </div>
                    <div className="text-base font-bold text-white font-display">{item.val}</div>
                    <div className="text-[11px] text-white/35 mt-0.5 font-sans">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link href="/about">
                <Button variant="accent" className="font-display text-sm px-6">
                  {t.home.aboutCta} <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── LEGAL NOTICE ─────────────────────────────── */}
      <section className="bg-[#0e0e0e] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-8 py-7">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-start gap-4"
          >
            <Scale size={16} className="text-white/20 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/20 font-sans">{t.home.legalLabel}</span>
              <p className="text-xs text-white/25 mt-1.5 leading-relaxed max-w-4xl font-serif">{t.sanctions.notice}</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── BLOG ─────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent" />
                <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase font-sans">{t.blog.label}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">{t.blog.title}</h2>
              <p className="text-white/35 mt-2 max-w-md font-serif text-sm">{t.blog.sub}</p>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-accent hover:gap-3 transition-all shrink-0 font-display">
              {t.blog.allPosts} <ArrowRight size={13} />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {t.home.blogPosts.slice(0, 6).map((post, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                className={`group relative bg-[#151414] border border-white/6 overflow-hidden hover:border-accent/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
                onClick={() => window.location.href = "/blog"}
              >
                {/* Hover accent top line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left z-10" />

                <div className={`relative overflow-hidden ${i === 0 ? "h-64 md:h-72" : "h-44"}`}>
                  <img
                    src={`${import.meta.env.BASE_URL}${BLOG_META[i].img.slice(1)}`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 grayscale-[20%] group-hover:grayscale-0"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${i + 20}/600/300`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 font-sans backdrop-blur-sm ${BLOG_META[i].tag}`}>
                    {post.tag}
                  </span>
                  {i === 0 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-white text-lg leading-snug font-display mb-1">{post.title}</h3>
                      <p className="text-white/55 text-xs leading-relaxed font-serif line-clamp-2">{post.excerpt}</p>
                    </div>
                  )}
                </div>
                {i !== 0 && (
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2.5 text-[10px] text-white/25 font-sans tracking-widest uppercase">
                      <CalendarDays size={10} /> {post.date}
                    </div>
                    <h3 className="font-bold text-white/85 text-sm mb-2 group-hover:text-accent transition-colors leading-snug font-display">{post.title}</h3>
                    <p className="text-white/30 text-xs leading-relaxed flex-1 mb-4 font-serif line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-accent text-xs font-bold group-hover:gap-2.5 transition-all font-display mt-auto">
                      {t.blog.readMore} <ArrowRight size={11} />
                    </span>
                  </div>
                )}
                {i === 0 && (
                  <div className="px-5 py-4 border-t border-white/6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-white/25 font-sans tracking-widest uppercase">
                      <CalendarDays size={10} /> {post.date}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-accent text-xs font-bold group-hover:gap-2.5 transition-all font-display">
                      {t.blog.readMore} <ArrowRight size={11} />
                    </span>
                  </div>
                )}
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-8 flex justify-center md:hidden">
            <Link href="/blog">
              <Button variant="outline" className="border-white/15 text-white/70">{t.blog.allPosts}</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* ── FAQ ACCORDION ─────────────────────────────── */}
      <section className="py-24 bg-[#0f0e0e]">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase font-sans">{t.home.faqTitle === "Frequently Asked Questions" ? "FAQ" : t.home.faqTitle === "Часто задаваемые вопросы" ? "ЧЗВ" : t.home.faqTitle === "Häufig gestellte Fragen" ? "FAQ" : "SSS"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 leading-tight">
              {t.home.faqTitle}
            </h2>
            <p className="text-white/40 text-sm font-serif max-w-lg leading-relaxed">
              {t.home.faqSub}
            </p>
          </motion.div>

          <div className="space-y-2">
            {(faqSchema.mainEntity as Array<{name: string; acceptedAnswer: {text: string}}>).map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="border border-white/8 bg-[#151414] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left group hover:bg-white/[0.02] transition-colors duration-200"
                >
                  <span className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="w-7 h-7 bg-accent/10 flex items-center justify-center shrink-0 text-accent text-xs font-bold font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm md:text-base font-display font-semibold text-white/85 group-hover:text-white transition-colors leading-snug">
                      {faq.name}
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-white/30 shrink-0 ml-3 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-accent" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="pl-10 border-l-2 border-accent/20">
                          <p className="text-sm text-white/45 leading-relaxed font-serif">
                            {faq.acceptedAnswer.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={`${import.meta.env.BASE_URL}images/tir-truck-transport.png`} alt="ChapterLOG TIR karayolu nakliye Rusya" className="w-full h-full object-cover grayscale-[40%]" loading="lazy" />
          <div className="absolute inset-0 bg-[#0d0c0c]/88" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0c]/95 via-[#0d0c0c]/80 to-[#0d0c0c]/60" />
        </div>
        {/* Accent side line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 max-w-5xl">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent" />
                <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-sans">ChapterLOG</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {t.home.ctaTitle}
              </h2>
              <p className="text-white/45 font-serif text-sm max-w-lg leading-relaxed">{t.home.ctaSub}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="px-10 font-bold font-display text-sm w-full sm:w-auto">
                  {t.home.ctaBtn}
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="text-white/60 border border-white/15 hover:bg-white/6 hover:text-white px-8 text-sm w-full sm:w-auto">
                  {t.home.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
