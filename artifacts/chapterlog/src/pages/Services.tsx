import { motion } from "framer-motion";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Box, CreditCard, DivideSquare, FileText, Globe2, PackageOpen, Truck, Building2, ShoppingCart, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const IMGS = {
  logistics: "/images/logistics-operations.png",
  money: "/images/money-transfer.png",
  partial: "/images/partial-cargo-truck.png",
  truck: "/images/tir-truck-transport.png",
  blog2: "/images/customs-documents.png",
  blog3: "/images/container-shipping.png",
  blog4: "/images/europe-turkey-trade.png",
  blog1: "/images/logistics-operations.png",
};

const SERVICE_META = [
  { id: "01", icon: <Box size={24} />, image: IMGS.logistics, route: "🇹🇷 → 🇷🇺", highlight: false },
  { id: "02", icon: <CreditCard size={24} />, image: IMGS.money, route: "🇹🇷 ↔ 🇷🇺", highlight: false },
  { id: "03", icon: <DivideSquare size={24} />, image: IMGS.partial, route: "🇹🇷 → 🇷🇺", highlight: false },
  { id: "04", icon: <Globe2 size={24} />, image: IMGS.truck, route: "🇹🇷 → 🌍 → 🇷🇺", highlight: false },
  { id: "05", icon: <PackageOpen size={24} />, image: IMGS.blog4, route: "🇹🇷 → 🇷🇺", highlight: false },
  { id: "06", icon: <Truck size={24} />, image: IMGS.truck, route: "🇹🇷 → 🇷🇺", highlight: false },
  { id: "07", icon: <FileText size={24} />, image: IMGS.blog3, route: "🇹🇷 ↔ 🇷🇺", highlight: false },
  { id: "08", icon: <Building2 size={24} />, image: IMGS.blog1, route: "🇹🇷 ↔ 🇷🇺", highlight: false },
  { id: "09", icon: <ShoppingCart size={24} />, image: IMGS.blog2, route: "🇹🇷 → 🇷🇺", highlight: false },
  { id: "10", icon: <Plane size={24} />, image: IMGS.blog4, route: "🇪🇺 → 🇹🇷", highlight: true },
];

const SITE_URL = "https://chapterlog.com.tr";

const serviceSchemaItems = [
  { name: "Lojistik Operasyon Yönetimi", description: "Yükünüzün inceleme, paketleme, depolama ve sevkiyat süreçlerini baştan sona yönetiyoruz.", areaServed: ["TR", "RU"] },
  { name: "Türkiye–Rusya Para Transferi", description: "Ticari ödemelerinizi hızlı, güvenli ve resmi prosedürlere tam uyumlu şekilde Rusya'ya iletiyoruz.", areaServed: ["TR", "RU"] },
  { name: "Parsiyel Nakliye (LTL)", description: "Az hacimli yüklerinizi paylaşımlı araçlarla ekonomik maliyetle Rusya'ya taşıyoruz.", areaServed: ["TR", "RU"] },
  { name: "Transit Taşımacılık", description: "Tek sözleşme ile çoklu ülke sınırı aşan yük taşımacılığı. Merkezi gümrük koordinasyonu.", areaServed: ["TR", "RU", "GE", "AZ"] },
  { name: "Konteyner Taşımacılığı (FCL)", description: "Haftalık sabit seferlerle, tek mühür ve tek beyanname güvencesiyle konteyner nakliyesi.", areaServed: ["TR", "RU"] },
  { name: "FTL Tam Dorse Nakliye", description: "Büyük hacimli yükler için tam dorse çözümü. Haftanın belirli günlerinde Rusya'ya düzenli seferler.", areaServed: ["TR", "RU"] },
  { name: "Gümrük Danışmanlığı", description: "Rusya gümrük mevzuatı çözümleri. Doğru beyanname, EAC/GOST-R sertifikasyon desteği.", areaServed: ["TR", "RU"] },
  { name: "İthalat ve İhracat Danışmanlığı", description: "Rusya'ya ihracat veya oradan ithalat için kapsamlı ticaret danışmanlığı.", areaServed: ["TR", "RU"] },
  { name: "İhracat İçin Doğrudan Satın Alım", description: "Ürünlerinizi Türkiye'de satın alıp kendi firmamız üzerinden Rusya'ya ihraç ediyoruz.", areaServed: ["TR", "RU"] },
  { name: "Avrupa'dan Türkiye'ye İthalat", description: "AB ülkelerindeki tedarikçilerden Türkiye'ye mal getirme sürecini eksiksiz yönetiyoruz.", areaServed: ["EU", "TR"] },
];

export default function Services() {
  const { t } = useLang();

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "ChapterLOG Lojistik Hizmetleri",
    "description": "Türkiye-Rusya hattında 10 farklı lojistik ve ticaret hizmeti",
    "url": `${SITE_URL}/services`,
    "numberOfItems": serviceSchemaItems.length,
    "itemListElement": serviceSchemaItems.map((svc, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": svc.name,
        "description": svc.description,
        "provider": {
          "@type": "Organization",
          "name": "ChapterLOG LLC",
          "url": SITE_URL,
        },
        "areaServed": svc.areaServed,
        "url": `${SITE_URL}/services`,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Hizmetlerimiz", "item": `${SITE_URL}/services` },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background pt-24 pb-20">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <SEO
        path="/services"
        titleTr="Hizmetlerimiz — ChapterLOG | Türkiye-Rusya ve Avrupa-Rusya Lojistik"
        titleEn="Our Services — ChapterLOG | Turkey-Russia & Europe-Russia Logistics"
        titleRu="Наши услуги — ChapterLOG | Логистика Турция–Россия и Европа–Россия"
        descTr="Türkiye-Rusya ve Avrupa-Rusya hattında FTL nakliye, parsiyel yük, konteyner, gümrük danışmanlığı ve ticari para transferi. Tüm lojistik çözümler tek firmada."
        descEn="FTL freight, LTL, container shipping, customs consultancy and commercial money transfer on Turkey–Russia and Europe–Russia routes. All solutions under one roof."
        descRu="FTL, сборный груз, контейнеры, таможенный консалтинг и денежные переводы на маршрутах Турция–Россия и Европа–Россия. Все логистические решения в одной компании."
        keywordsTr="Rusya FTL nakliye, parsiyel yük Rusya, konteyner taşımacılığı Rusya, gümrük danışmanlığı, ticari para transferi, TIR karneti operasyonu, UBAK izni, EAC sertifika, Rusya ihracat, Rusya ithalat, depolama hizmeti"
        keywordsEn="Russia FTL freight, LTL shipping Russia, container shipping Russia, customs brokerage, commercial money transfer, TIR carnet operations, UBAK permit, EAC certification, Russia export, Russia import"
        keywordsRu="FTL перевозки Россия, сборный груз Россия, контейнерные перевозки, таможенное оформление, коммерческие переводы, TIR карнет, разрешение UBAK, сертификация EAC, экспорт в Россию, импорт из России"
      />

      {/* Page Header */}
      <section className="bg-[#111010] border-b-2 border-accent relative overflow-hidden min-h-[360px] flex items-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent rounded-full blur-[160px] opacity-[0.045]" />
          <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] bg-blue-900 rounded-full blur-[120px] opacity-[0.05]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-px bg-accent" />
                <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-sans">{t.services.eyebrow}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-5 leading-tight">{t.services.title}</h1>
              <p className="text-white/50 text-base max-w-xl leading-relaxed font-serif">{t.servicesPage.heroParagraph}</p>
              <div className="flex flex-wrap gap-2.5 mt-8">
                {["FTL & Parsiyel Nakliye", "Ticari Para Transferi", "Gümrük Danışmanlığı", "Konteyner Taşımacılığı"].map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 font-sans tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block shrink-0" />
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: image grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:grid grid-cols-2 gap-3 h-[280px]"
            >
              <div className="overflow-hidden">
                <img src="/images/tir-truck-transport.png" alt="ChapterLOG TIR karayolu nakliye Türkiye Rusya" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" loading="lazy" />
              </div>
              <div className="grid grid-rows-2 gap-3">
                <div className="overflow-hidden">
                  <img src="/images/customs-documents.png" alt="ChapterLOG gümrük evrakları danışmanlık hizmetleri" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" loading="lazy" />
                </div>
                <div className="overflow-hidden">
                  <img src="/images/money-transfer.png" alt="ChapterLOG ticari para transferi Türkiye Rusya" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" loading="lazy" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Route Tags */}
      <section className="bg-[#0e0e0e] border-b border-white/5 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-white/30 font-sans tracking-widest uppercase">{t.servicesPage.routesLabel}:</span>
            {t.servicesPage.routeTags.map((r) => (
              <span key={r} className="px-3 py-1 bg-white/5 border border-white/8 text-xs font-medium text-white/50 font-sans">{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {t.serviceCards.map((card, i) => {
              const meta = SERVICE_META[i];
              return (
                <motion.div
                  key={meta.id}
                  variants={fadeUp}
                  className={`bg-[#151414] border overflow-hidden flex flex-col group hover:bg-[#1a1919] transition-all duration-300 ${
                    meta.highlight ? "border-accent/40" : "border-white/6 hover:border-white/12"
                  }`}
                >
                  {/* Service image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={meta.image}
                      alt={`${card.title} — ChapterLOG lojistik hizmetleri`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[30%] group-hover:grayscale-0"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${meta.id}/600/300`; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-black/60 backdrop-blur-sm text-white/70 px-2 py-0.5 font-mono">{meta.route}</span>
                      {meta.highlight && (
                        <span className="text-[10px] font-bold bg-accent text-black px-2 py-0.5 font-sans tracking-wide">{t.servicesPage.newBadge}</span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 w-9 h-9 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70">
                      {meta.icon}
                    </div>
                    <span className="absolute bottom-3 right-3 text-3xl font-display font-bold text-white/10">{meta.id}</span>
                  </div>

                  <div className="p-7 flex-grow flex flex-col">
                    <h3 className="text-base font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors font-display">{card.title}</h3>
                    <p className="text-white/40 mb-6 flex-grow leading-relaxed text-sm font-serif">{card.description}</p>

                    <div className="pt-5 border-t border-white/5 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] text-white/25 font-semibold uppercase tracking-widest block mb-1 font-sans">{t.servicesPage.costLabel}</span>
                        <span className="font-bold text-white/70 text-sm font-mono">{card.price}</span>
                      </div>
                      <Link href="/contact">
                        <button className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:border-accent hover:text-accent transition-colors">
                          <ArrowRight size={16} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 pb-4">
        <div className="bg-[#1a1919] p-10 md:p-16 text-center border-l-2 border-accent">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">{t.servicesPage.ctaTitle}</h2>
            <p className="text-white/40 mb-8 text-base font-serif">{t.servicesPage.ctaSub}</p>
            <Link href="/contact">
              <Button variant="accent" size="lg" className="px-10 py-6 text-base font-display">
                {t.hero.cta}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
