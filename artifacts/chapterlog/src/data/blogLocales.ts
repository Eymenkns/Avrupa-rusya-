/** Labels for blog category chips (filter bar). Keys match `BlogPost.tag` in Turkish. */
export const BLOG_TAG_LABELS: Record<string, Record<"tr" | "en" | "ru" | "de", string>> = {
  Lojistik: { tr: "Lojistik", en: "Logistics", ru: "Логистика", de: "Logistik" },
  "Para Transferi": { tr: "Para Transferi", en: "Money transfer", ru: "Переводы", de: "Geldtransfer" },
  Nakliye: { tr: "Nakliye", en: "Freight", ru: "Грузоперевозки", de: "Fracht" },
  Taşımacılık: { tr: "Taşımacılık", en: "Haulage", ru: "Перевозки", de: "Transport" },
  Konteyner: { tr: "Konteyner", en: "Container", ru: "Контейнер", de: "Container" },
  FTL: { tr: "FTL", en: "FTL", ru: "FTL", de: "FTL" },
  Gümrük: { tr: "Gümrük", en: "Customs", ru: "Таможня", de: "Zoll" },
  "Dış Ticaret": { tr: "Dış Ticaret", en: "Foreign trade", ru: "ВЭД", de: "Außenhandel" },
  İhracat: { tr: "İhracat", en: "Export", ru: "Экспорт", de: "Export" },
  "Avrupa→Rusya": { tr: "Avrupa→Rusya", en: "Europe→Russia", ru: "Европа→Россия", de: "Europa→Russland" },
  Transit: { tr: "Transit", en: "Transit", ru: "Транзит", de: "Transit" },
  Sigorta: { tr: "Sigorta", en: "Insurance", ru: "Страхование", de: "Versicherung" },
  "E-Ticaret": { tr: "E-Ticaret", en: "E-commerce", ru: "E-коммерция", de: "E-Commerce" },
};

export const BLOG_TAG_FILTER_ALL: Record<"tr" | "en" | "ru" | "de", string> = {
  tr: "Tümü",
  en: "All",
  ru: "Все",
  de: "Alle",
};

/** Machine-oriented locale overlays for blog cards & SEO (en/ru/de). Turkish remains the canonical article in `blogPosts`. */

export type BlogLocaleRow = { title: string; excerpt: string; tag: string };

export const blogLocales: Record<string, Partial<Record<"en" | "ru" | "de", BlogLocaleRow>>> = {
  "rusya-lojistik-operasyon-tek-cati": {
    en: { title: "Russia logistics operations: end-to-end under one roof", excerpt: "We manage every logistics stage to Russia—inspection, packing, warehousing and clearance—in one integrated workflow.", tag: "Logistics" },
    ru: { title: "Логистика в Россию: полный цикл под одной крышей", excerpt: "Управляем всеми этапами доставки в Россию: осмотр, упаковку, склад и оформление — единым процессом.", tag: "Логистика" },
    de: { title: "Russland-Logistik: alles aus einer Hand", excerpt: "Wir steuern alle Schritte bis Russland — Inspektion, Verpackung, Lager und Zoll — aus einem Auftrag.", tag: "Logistik" },
  },
  "turkiyeden-rusyaya-para-transferi": {
    en: { title: "Turkey–Russia money transfers: legal framework and fees", excerpt: "Over a decade of experience moving commercial payments quickly, securely and in full compliance.", tag: "Money transfer" },
    ru: { title: "Переводы Турция–Россия: правовая база и комиссии", excerpt: "Более 10 лет опыта в коммерческих платежах — быстро, безопасно и по правилам.", tag: "Переводы" },
    de: { title: "Geldtransfer Türkei–Russland: Rechtsrahmen und Gebühren", excerpt: "Über 10 Jahre Erfahrung mit Handelszahlungen — schnell, sicher und konform.", tag: "Geldtransfer" },
  },
  "rusya-parsiyel-nakliye-325-usd": {
    en: { title: "Russia LTL freight: from 325 USD with insured delivery", excerpt: "Ship smaller loads without booking a full truck—shared trucks with up to €500k CMR cover.", tag: "Freight" },
    ru: { title: "Сборный груз в Россию: от 325 USD с страхованием", excerpt: "Отправляйте неполный фургон экономично — сборные рейсы с CMR до 500 000 €.", tag: "Грузоперевозки" },
    de: { title: "Teilladung Russland: ab 325 USD mit Versicherung", excerpt: "Kleinere Sendungen ohne Komplett-LKW — Sammeltransporte mit CMR bis 500.000 €.", tag: "Fracht" },
  },
  "transit-tasimacilik-coklu-sinir-asimi": {
    en: { title: "Transit freight: one contract across multiple borders", excerpt: "Even when cargo crosses several countries, one agreement and coordinated customs handling.", tag: "Haulage" },
    ru: { title: "Транзитные перевозки: один договор — несколько границ", excerpt: "Груз проходит несколько стран — мы координируем документы и таможню централизованно.", tag: "Перевозки" },
    de: { title: "Transitfracht: ein Vertrag, mehrere Grenzen", excerpt: "Mehrere Länder auf einer Route — eine Vereinbarung und zentrale Zollkoordination.", tag: "Transport" },
  },
  "rusya-konteyner-tasimaciligi-fcl": {
    en: { title: "Russia FCL container shipping: weekly fixed departures", excerpt: "Full-container moves with predictable sailings, single seal and streamlined declarations.", tag: "Container" },
    ru: { title: "Контейнер FCL в Россию: фиксированные отправления", excerpt: "FCL-перевозки с регулярным расписанием, одной пломбой и понятным оформлением.", tag: "Контейнер" },
    de: { title: "FCL-Container nach Russland: feste Abfahrten", excerpt: "Komplettcontainer mit planbaren Abfahrten, einer Plombe und klaren Formalitäten.", tag: "Container" },
  },
  "ftl-tam-dorse-nakliye": {
    en: { title: "FTL full truckload: fast option for large volumes", excerpt: "Transparent m³ pricing, weekly departures and extra capacity when you need speed.", tag: "FTL" },
    ru: { title: "FTL полная загрузка: быстро для крупных партий", excerpt: "Понятная цена за объём, регулярные рейсы и резерв мощности для срочных отправок.", tag: "FTL" },
    de: { title: "FTL Komplettladung: schnell bei großen Mengen", excerpt: "Transparente m³-Preise, feste Abfahrten und Extra-Kapazität bei Eile.", tag: "FTL" },
  },
  "rusya-gumruk-danismanligi": {
    en: { title: "Russia customs consultancy: correct filings, fewer delays", excerpt: "Navigate tariffs, VAT and EAC requirements with filings prepared by specialists.", tag: "Customs" },
    ru: { title: "Таможня России: правильные декларации и меньше задержек", excerpt: "Тарифы, НДС и EAC — готовим документы и сопровождаем процесс.", tag: "Таможня" },
    de: { title: "Russland-Zollberatung: richtige Anmeldungen", excerpt: "Zölle, MwSt. und EAC — Unterlagen und Begleitung durch Spezialisten.", tag: "Zoll" },
  },
  "rusya-ile-ticaret-ithalat-ihracat-danismanligi": {
    en: { title: "Trading with Russia: import & export advisory", excerpt: "How Turkish firms can operate effectively on the Turkey–Russia trade corridor.", tag: "Foreign trade" },
    ru: { title: "Торговля с Россией: импорт и экспорт", excerpt: "Как турецким компаниям выстроить процессы на коридоре Турция–Россия.", tag: "ВЭД" },
    de: { title: "Handel mit Russland: Import- und Exportberatung", excerpt: "Wie sich türkische Firmen effizient auf der Route Türkei–Russland aufstellen.", tag: "Außenhandel" },
  },
  "ihracat-icin-dogrudan-satin-alim": {
    en: { title: "Direct purchase for export: delegate the operations", excerpt: "We invoice, declare and pay on your behalf so you focus on your core business.", tag: "Export" },
    ru: { title: "Прямая закупка под экспорт: операции на нас", excerpt: "Счета, декларации и платежи — мы берём на себя, вы занимаетесь продуктом.", tag: "Экспорт" },
    de: { title: "Direkteinkauf für Export: Operations auslagern", excerpt: "Rechnungen, Zoll und Zahlungen übernehmen wir — Sie konzentrieren sich aufs Kerngeschäft.", tag: "Export" },
  },
  "avrupadan-rusyaya-nakliye-turkiye-transit": {
    en: { title: "Europe–Russia freight via Turkey transit", excerpt: "The compliant routing when direct EU–Russia road links are constrained—TIR, permits, clearance.", tag: "Europe→Russia" },
    ru: { title: "Европа–Россия через транзит Турции", excerpt: "Законный маршрут при ограничениях прямых линий ЕС–Россия — TIR, разрешения, таможня.", tag: "Европа→Россия" },
    de: { title: "EU–Russland-Fracht über Türkei-Transit", excerpt: "Konformer Korridor bei eingeschränkten Direktlinien — TIR, Genehmigungen, Zoll.", tag: "Europa→Russland" },
  },
  "almanyadan-rusyaya-mal-gondermek-2025": {
    en: { title: "Shipping from Germany to Russia in 2025: practical guide", excerpt: "Routes, documents and transit options for German-origin cargo toward Russia.", tag: "Europe→Russia" },
    ru: { title: "Отправка из Германии в Россию в 2025: практическое руководство", excerpt: "Маршруты, документы и транзит для грузов из Германии.", tag: "Европа→Россия" },
    de: { title: "Versand Deutschland–Russland 2025: Leitfaden", excerpt: "Routen, Unterlagen und Transit für deutschlandbezogene Sendungen.", tag: "Europa→Russland" },
  },
  "avrupadan-rusyaya-gumruk-eac-sertifikasi": {
    en: { title: "EU–Russia customs: EAC certificate & transit steps", excerpt: "How EAC conformity fits into European-origin shipments bound for Russia.", tag: "Europe→Russia" },
    ru: { title: "Таможня Европа–Россия: сертификат EAC и транзит", excerpt: "Как EAC встраивается в цепочку поставок из Европы в Россию.", tag: "Европа→Россия" },
    de: { title: "EU–Russland-Zoll: EAC-Zertifikat und Transit", excerpt: "EAC-Konformität für europäische Ware nach Russland.", tag: "Europa→Russland" },
  },
  "2025-2026-turkiye-rusya-nakliye-fiyatlari": {
    en: { title: "2025–2026 Turkey–Russia freight pricing overview", excerpt: "Market factors and indicative ranges for road freight on the corridor.", tag: "Freight" },
    ru: { title: "Цены на перевозки Турция–Россия 2025–2026", excerpt: "Факторы рынка и ориентиры по автоперевозкам на коридоре.", tag: "Грузоперевозки" },
    de: { title: "Frachtpreise Türkei–Russland 2025–2026", excerpt: "Marktfaktoren und Richtwerte für Straßentransporte.", tag: "Fracht" },
  },
  "rusya-parsiyel-mi-komple-tir-mi": {
    en: { title: "Russia shipping: LTL or full truck—which to choose?", excerpt: "Decision guide by volume, timing and cost on the Turkey–Russia lane.", tag: "Freight" },
    ru: { title: "В Россию: сборный груз или полная фура?", excerpt: "Как выбрать по объёму, срокам и бюджету на маршруте Турция–Россия.", tag: "Грузоперевозки" },
    de: { title: "Russland: Teilladung oder Komplett-LKW?", excerpt: "Entscheidungshilfe nach Volumen, Zeit und Kosten.", tag: "Fracht" },
  },
  "rusyaya-ihracatta-gumruk-islemleri-2025": {
    en: { title: "Export customs to Russia: step-by-step (2025)", excerpt: "Declarations, permits and checkpoints for Turkish exporters.", tag: "Customs" },
    ru: { title: "Таможня при экспорте в Россию: по шагам (2025)", excerpt: "Декларации, разрешения и контрольные точки для турецких экспортёров.", tag: "Таможня" },
    de: { title: "Ausfuhrzoll nach Russland: Schritt für Schritt (2025)", excerpt: "Anmeldungen, Genehmigungen und Kontrollen für türkische Exporteure.", tag: "Zoll" },
  },
  "turkiye-rusya-lojistik-guzergahlari": {
    en: { title: "Turkey–Russia logistics routes: Caspian vs Caucasus", excerpt: "Compare corridors, transit times and when each option fits.", tag: "Transit" },
    ru: { title: "Маршруты Турция–Россия: Кавказ или Каспий", excerpt: "Сравнение коридоров, сроков и случаев применения.", tag: "Транзит" },
    de: { title: "Türkei–Russland-Routen: Kaukasus vs. Kaspisch", excerpt: "Korridore, Laufzeiten und Einsatzgebiete im Vergleich.", tag: "Transit" },
  },
  "cmr-sigortasi-rusya-nakliye": {
    en: { title: "CMR insurance: cargo protection on Russia road freight", excerpt: "What CMR covers on international trucking and how limits apply.", tag: "Insurance" },
    ru: { title: "Страхование CMR: защита груза в России", excerpt: "Что покрывает CMR при автоперевозках и как действуют лимиты.", tag: "Страхование" },
    de: { title: "CMR-Versicherung: Ladungsschutz Russland-Straßentransport", excerpt: "Was CMR bei internationalem LKW bedeutet und wie Deckungsgrenzen gelten.", tag: "Versicherung" },
  },
  "rusya-ihracat-odeme-yontemleri-2026": {
    en: { title: "Russia export payments in 2026: LC, wire & alternatives", excerpt: "Commercial payment channels Turkish exporters use for Russian buyers.", tag: "Foreign trade" },
    ru: { title: "Оплата экспорта в Россию в 2026: аккредитив, перевод и др.", excerpt: "Каналы расчётов для турецких экспортёров с российскими покупателями.", tag: "ВЭД" },
    de: { title: "Exportzahlungen Russland 2026: Akkreditiv, Überweisung & mehr", excerpt: "Zahlungswege für türkische Exporteure zu russischen Abnehmern.", tag: "Außenhandel" },
  },
  "rusya-e-ticaret-wildberries-ozon-ihracat": {
    en: { title: "Russia e-commerce: selling on Wildberries & Ozon from Turkey", excerpt: "Practical notes on logistics and compliance for marketplace exports.", tag: "Foreign trade" },
    ru: { title: "Маркетплейсы России: Wildberries и Ozon из Турции", excerpt: "Логистика и соответствие требованиям при продаже с Турции.", tag: "ВЭД" },
    de: { title: "Russland-E-Commerce: Wildberries & Ozon aus der Türkei", excerpt: "Logistik und Compliance für Marktplatz-Exporte.", tag: "Außenhandel" },
  },
  "rusyadan-turkiyeye-para-transferi-2026": {
    en: { title: "Russia–Turkey money transfers in 2026: importer’s guide", excerpt: "Receiving trade-related payments from Russia: channels, FX and compliance.", tag: "Money transfer" },
    ru: { title: "Переводы Россия–Турция в 2026: гид для импортёров", excerpt: "Торговые поступления из России: каналы, валюта и комплаенс.", tag: "Переводы" },
    de: { title: "Geldtransfers Russland–Türkei 2026: Leitfaden für Importeure", excerpt: "Handelszahlungen aus Russland: Kanäle, FX und Compliance.", tag: "Geldtransfer" },
  },
};
