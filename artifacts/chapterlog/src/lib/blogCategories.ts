/** Blog category hubs: Turkish `tag` on posts ↔ URL slug `/blog/kategori/:slug` */
export interface BlogCategory {
  slug: string;
  tagTr: string;
  titleTr: string;
  titleEn: string;
  titleRu: string;
  titleDe: string;
  descTr: string;
  descEn: string;
  descRu: string;
  descDe: string;
  keywordsTr: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "lojistik",
    tagTr: "Lojistik",
    titleTr: "Lojistik Rehberleri — Türkiye Rusya Operasyon",
    titleEn: "Logistics Guides — Turkey–Russia Operations",
    titleRu: "Логистика — операции Турция–Россия",
    titleDe: "Logistik-Leitfäden — Türkei–Russland",
    descTr: "Rusya lojistik operasyonu, depolama, paketleme ve tek çatı yönetim rehberleri.",
    descEn: "Russia logistics operations, warehousing, packing and end-to-end management guides.",
    descRu: "Логистика в Россию: склад, упаковка и управление цепочкой.",
    descDe: "Russland-Logistik: Lager, Verpackung und ganzheitliche Steuerung.",
    keywordsTr: "Rusya lojistik, tek çatı lojistik, depolama Rusya, Kayseri lojistik",
  },
  {
    slug: "para-transferi",
    tagTr: "Para Transferi",
    titleTr: "Para Transferi Rehberleri — Türkiye Rusya Ticari Ödeme",
    titleEn: "Money Transfer Guides — Turkey–Russia Commercial Payments",
    titleRu: "Переводы Турция–Россия — коммерческие платежи",
    titleDe: "Geldtransfer-Leitfäden — Türkei–Russland",
    descTr: "Türkiye-Rusya ve Rusya-Türkiye ticari para transferi, komisyon ve yasal çerçeve.",
    descEn: "Commercial money transfers between Turkey and Russia: fees and compliance.",
    descRu: "Коммерческие переводы Турция–Россия: комиссии и правовая база.",
    descDe: "Handelszahlungen Türkei–Russland: Gebühren und Rechtsrahmen.",
    keywordsTr: "para transferi Rusya, ticari transfer, komisyon oranı, Ruble TL",
  },
  {
    slug: "nakliye",
    tagTr: "Nakliye",
    titleTr: "Nakliye Rehberleri — Parsiyel, FTL ve Koridor Fiyatları",
    titleEn: "Freight Guides — LTL, FTL and Corridor Pricing",
    titleRu: "Грузоперевозки — сборный груз, FTL и цены",
    titleDe: "Fracht-Leitfäden — Teilladung, FTL und Preise",
    descTr: "Rusya parsiyel nakliye, FTL, soğuk zincir ve şehir bazlı süre/maliyet rehberleri.",
    descEn: "Russia LTL, FTL, cold chain and city-level lead time guides.",
    descRu: "Сборный груз и FTL в Россию, холодовая цепь и сроки.",
    descDe: "Teilladung und FTL nach Russland, Kühlkette und Laufzeiten.",
    keywordsTr: "Rusya nakliye, parsiyel yük, FTL nakliye, Moskova nakliye",
  },
  {
    slug: "tasimacilik",
    tagTr: "Taşımacılık",
    titleTr: "Taşımacılık — TIR, UBAK ve Transit Rehberleri",
    titleEn: "Haulage — TIR, Permits and Transit Guides",
    titleRu: "Перевозки — TIR, разрешения и транзит",
    titleDe: "Transport — TIR, Genehmigungen und Transit",
    descTr: "TIR karnesi, UBAK izni, transit taşımacılık ve çoklu sınır geçişi.",
    descEn: "TIR carnet, UBAK permits, transit haulage and multi-border crossings.",
    descRu: "Книжка TIR, разрешения UBAK и транзит через несколько стран.",
    descDe: "TIR-Karnet, UBAK-Genehmigungen und Transit über mehrere Grenzen.",
    keywordsTr: "TIR karneti, UBAK izni, transit taşımacılık, ADR taşıma",
  },
  {
    slug: "konteyner",
    tagTr: "Konteyner",
    titleTr: "Konteyner Taşımacılığı — FCL Rusya Seferleri",
    titleEn: "Container Shipping — Russia FCL Departures",
    titleRu: "Контейнерные перевозки FCL в Россию",
    titleDe: "Containertransport — FCL nach Russland",
    descTr: "Rusya FCL konteyner taşımacılığı, haftalık seferler ve gümrük süreçleri.",
    descEn: "Russia FCL container moves, weekly sailings and customs steps.",
    descRu: "FCL-контейнеры в Россию: расписание и таможня.",
    descDe: "FCL-Container nach Russland: Abfahrten und Zoll.",
    keywordsTr: "Rusya konteyner, FCL nakliye, konteyner taşımacılığı",
  },
  {
    slug: "ftl",
    tagTr: "FTL",
    titleTr: "FTL Tam Dorse — Komple Tır Nakliye Rehberleri",
    titleEn: "FTL Full Truckload Guides",
    titleRu: "FTL — полная загрузка фуры",
    titleDe: "FTL Komplettladung — Leitfäden",
    descTr: "FTL tam dorse nakliye, büyük hacimli yükler ve hızlı teslimat seçenekleri.",
    descEn: "FTL full truckload for large volumes and faster delivery.",
    descRu: "FTL для крупных партий и срочных отправок.",
    descDe: "FTL für große Mengen und schnellere Zustellung.",
    keywordsTr: "FTL nakliye, komple tır, tam dorse Rusya",
  },
  {
    slug: "gumruk",
    tagTr: "Gümrük",
    titleTr: "Gümrük Rehberleri — Rusya İhracat ve EAC",
    titleEn: "Customs Guides — Russia Export and EAC",
    titleRu: "Таможня — экспорт в Россию и EAC",
    titleDe: "Zoll-Leitfäden — Export nach Russland und EAC",
    descTr: "Rusya gümrük işlemleri, EAC/GOST-R sertifikası ve beyanname rehberleri.",
    descEn: "Russia customs procedures, EAC/GOST-R and declaration guides.",
    descRu: "Таможня России, EAC/GOST-R и декларации.",
    descDe: "Russland-Zoll, EAC/GOST-R und Anmeldungen.",
    keywordsTr: "Rusya gümrük, EAC sertifika, GOST-R, gümrük danışmanlığı",
  },
  {
    slug: "dis-ticaret",
    tagTr: "Dış Ticaret",
    titleTr: "Dış Ticaret — Rusya Ödeme ve E-Ticaret Rehberleri",
    titleEn: "Foreign Trade — Russia Payments and E-Commerce",
    titleRu: "ВЭД — платежи и e-commerce в Россию",
    titleDe: "Außenhandel — Zahlungen und E-Commerce Russland",
    descTr: "Rusya'ya ihracat ödeme yöntemleri, Wildberries, Ozon ve ticaret danışmanlığı.",
    descEn: "Export payment channels, Wildberries, Ozon and trade advisory for Russia.",
    descRu: "Оплата экспорта, Wildberries, Ozon и консультации по ВЭД.",
    descDe: "Exportzahlungen, Wildberries, Ozon und Handelsberatung.",
    keywordsTr: "Rusya dış ticaret, e-ticaret Rusya, ödeme yöntemleri",
  },
  {
    slug: "ihracat",
    tagTr: "İhracat",
    titleTr: "İhracat Rehberleri — Tekstil, Gıda ve Sektörel Rusya",
    titleEn: "Export Guides — Textiles, Food and Sectoral Russia",
    titleRu: "Экспорт — текстиль, продукты и отрасли",
    titleDe: "Export-Leitfäden — Textil, Lebensmittel, Branchen",
    descTr: "Rusya'ya tekstil, gıda, otomotiv yedek parça ve doğrudan satın alım rehberleri.",
    descEn: "Textile, food, auto parts exports and direct purchase models for Russia.",
    descRu: "Экспорт текстиля, продуктов, автозапчастей в Россию.",
    descDe: "Textil-, Lebensmittel- und Autoteilexport nach Russland.",
    keywordsTr: "Rusya ihracat, tekstil ihracat, gıda ihracat Rusya",
  },
  {
    slug: "avrupa-rusya",
    tagTr: "Avrupa→Rusya",
    titleTr: "Avrupa'dan Rusya'ya Nakliye — Transit Koridor Rehberleri",
    titleEn: "Europe to Russia Freight — Transit Corridor Guides",
    titleRu: "Европа–Россия — транзит через Турцию",
    titleDe: "Europa–Russland — Transit über die Türkei",
    descTr: "Almanya, İtalya, Hollanda, Fransa çıkışlı Rusya nakliye ve Türkiye transit.",
    descEn: "Germany, Italy, Netherlands, France origin freight to Russia via Turkey.",
    descRu: "Грузы из ЕС в Россию через транзит Турции.",
    descDe: "EU-Herkunft nach Russland über Türkei-Transit.",
    keywordsTr: "Avrupa Rusya nakliye, transit Türkiye, Almanya Rusya",
  },
  {
    slug: "transit",
    tagTr: "Transit",
    titleTr: "Transit Lojistik — Güzergah ve Sınır Rehberleri",
    titleEn: "Transit Logistics — Routes and Border Guides",
    titleRu: "Транзитная логистика — маршруты и границы",
    titleDe: "Transitlogistik — Routen und Grenzen",
    descTr: "Türkiye-Rusya güzergahları, Gürcistan, Hazar rotası ve mevsimsel planlama.",
    descEn: "Turkey–Russia corridors, Caucasus, Caspian routes and seasonal planning.",
    descRu: "Маршруты Турция–Россия, Кавказ и Каспий.",
    descDe: "Türkei–Russland-Routen, Kaukasus und Kaspisch.",
    keywordsTr: "transit lojistik, Rusya güzergah, Gürcistan rotası",
  },
  {
    slug: "sigorta",
    tagTr: "Sigorta",
    titleTr: "Nakliye Sigortası — CMR ve Yük Güvencesi",
    titleEn: "Freight Insurance — CMR and Cargo Cover",
    titleRu: "Страхование CMR и груза",
    titleDe: "Frachtversicherung — CMR und Ladungsschutz",
    descTr: "CMR sigortası, 500.000 Euro güvence ve hasar tazminat süreçleri.",
    descEn: "CMR insurance, €500k cover and claims handling on Russia lanes.",
    descRu: "Страхование CMR до 500 000 € и возмещение ущерба.",
    descDe: "CMR-Versicherung, 500.000 € Deckung und Schadensfälle.",
    keywordsTr: "CMR sigortası, yük sigortası, nakliye sigorta",
  },
  {
    slug: "e-ticaret",
    tagTr: "E-Ticaret",
    titleTr: "Rusya E-Ticaret — Wildberries ve Ozon Rehberleri",
    titleEn: "Russia E-Commerce — Wildberries & Ozon Guides",
    titleRu: "E-commerce Россия — Wildberries и Ozon",
    titleDe: "Russland E-Commerce — Wildberries & Ozon",
    descTr: "Wildberries, Ozon'a Türkiye'den mal gönderimi ve marketplace lojistiği.",
    descEn: "Shipping to Wildberries and Ozon from Turkey — marketplace logistics.",
    descRu: "Поставки на Wildberries и Ozon из Турции.",
    descDe: "Lieferungen an Wildberries und Ozon aus der Türkei.",
    keywordsTr: "Wildberries Türkiye, Ozon ihracat, Rusya e-ticaret",
  },
];

const bySlug = new Map(BLOG_CATEGORIES.map((c) => [c.slug, c]));
const byTag = new Map(BLOG_CATEGORIES.map((c) => [c.tagTr, c]));

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return bySlug.get(slug);
}

export function getCategorySlugForTag(tagTr: string): string | undefined {
  return byTag.get(tagTr)?.slug;
}
