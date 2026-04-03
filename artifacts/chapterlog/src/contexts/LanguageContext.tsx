import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "tr" | "en" | "ru" | "de";

export interface Translations {
  nav: {
    home: string;
    services: string;
    blog: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    routeEyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    secondary: string;
    infoPanelCta: string;
  };
  stats: {
    years: string;
    shipments: string;
    clients: string;
    subs: [string, string, string];
  };
  services: {
    eyebrow: string;
    heading: string;
    sub: string;
    title: string;
    cta: string;
  };
  home: {
    aboutCaption: string;
    specLabels: [string, string, string, string];
    specVals: [string, string, string];
    aboutCta: string;
    ctaTitle: string;
    ctaSub: string;
    ctaBtn: string;
    ctaSecondary: string;
    faqTitle: string;
    faqSub: string;
    infoPanelRows: Array<{ label: string; detail: string }>;
    homeServices: Array<{ title: string; desc: string; price: string }>;
    legalLabel: string;
    blogPosts: Array<{ tag: string; date: string; title: string; excerpt: string }>;
    corridorsSectionTitle: string;
    corridorsSectionSub: string;
    corridors: Array<{ route: string; title: string; desc: string; tags: string[] }>;
    moneyTransfer: {
      eyebrow: string;
      title: string;
      sub: string;
      cards: Array<{ direction: string; from: string; to: string; commission: string; days: string; legal: string; desc: string }>;
      trust: string;
      cta: string;
    };
  };
  servicesPage: {
    heroParagraph: string;
    routesLabel: string;
    routeTags: [string, string, string, string];
    costLabel: string;
    newBadge: string;
    ctaTitle: string;
    ctaSub: string;
  };
  serviceCards: Array<{
    title: string;
    description: string;
    price: string;
  }>;
  aboutPage: {
    eyebrow: string;
    heroParagraph: string;
    statLabels: [string, string, string, string];
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    hqLabel: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    valuesTitle: string;
    valuesText: string;
    whyTitle: string;
    whySub: string;
    whyItems: Array<{ title: string; desc: string }>;
    routesSectionTitle: string;
    routesSectionSub: string;
    routeCards: Array<{ title: string; desc: string; services: string[] }>;
    legalTitle: string;
    legalP1Bold: string;
    legalP1Rest: string;
    legalP2: string;
    legalBadges: [string, string, string, string];
    ctaTitle: string;
    ctaSub: string;
    ctaQuote: string;
    ctaServices: string;
    expBadgeLabel: string;
    hqLocation: string;
  };
  about: {
    label: string;
    title: string;
    p1: string;
    p2: string;
    cta: string;
  };
  blog: {
    label: string;
    title: string;
    sub: string;
    readMore: string;
    allPosts: string;
  };
  testimonials: {
    label: string;
    title: string;
  };
  contact: {
    label: string;
    title: string;
    sub: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    ourServices: string;
    contactInfo: string;
    copyright: string;
  };
  sanctions: {
    notice: string;
  };
}

const translations: Record<Language, Translations> = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      blog: "Blog",
      about: "Hakkımızda",
      contact: "İletişim",
      cta: "Hemen Teklif Alın",
    },
    hero: {
      badge: "🇹🇷 Türkiye Üzerinden Rusya'ya Güvenli Hat",
      routeEyebrow: "Avrupa — Rusya",
      title1: "Yükünüzün Her Adımında",
      title2: "Yanınızdayız.",
      subtitle: "Türkiye'den Rusya'ya ve Avrupa'dan Rusya'ya FTL, parsiyel nakliye, ticari para transferi ve gümrük danışmanlığı — tüm lojistik çözümler tek elden.",
      cta: "Hemen Teklif Alın",
      secondary: "Hizmetlerimiz",
      infoPanelCta: "Tüm hizmetleri gör",
    },
    stats: {
      years: "Yıldır Rusya Hattında",
      shipments: "Başarılı Teslimat",
      clients: "Sabit Komisyon",
      subs: ["Karayolu · Transit · Kombine", "FTL · LTL · Konteyner", "Hızlı · Güvenli · Yasal"],
    },
    services: {
      eyebrow: "Hizmetler",
      heading: "Hizmetler",
      sub: "Rusya ticaretinde ihtiyaç duyduğunuz her çözüm tek çatı altında.",
      title: "Hizmetlerimiz",
      cta: "Tüm Hizmetleri İncele",
    },
    home: {
      aboutCaption: "Kayseri OSB'deki depomuzdan yükleme yapılabilir — kapıya teslimat zorunlu değil.",
      specLabels: ["Nakliye güvencesi", "Para transferi komisyonu", "Transit süre", "Yanıt süresi"],
      specVals: ["%3,5'ten", "7–14 gün", "≤ 24 iş saati"],
      aboutCta: "Şirket Hakkında",
      ctaTitle: "Yükünüz için teklif almak ister misiniz?",
      ctaSub: "En geç 24 iş saati içinde detaylı ve bağlayıcı teklif sunuyoruz.",
      ctaBtn: "Teklif Al",
      ctaSecondary: "Hakkımızda",
      faqTitle: "Sık Sorulan Sorular",
      faqSub: "Türkiye-Rusya lojistik ve para transferi hakkında en çok merak edilenler.",
      infoPanelRows: [
        { label: "FTL Nakliye", detail: "7–14 gün transit" },
        { label: "Parsiyel (LTL)", detail: "325 USD/m³'den" },
        { label: "Para Transferi", detail: "%3,5 komisyon" },
        { label: "Gümrük Danışmanlığı", detail: "EAC/GOST-R desteği" },
        { label: "Avrupa İthalatı", detail: "Karayolu & deniz" },
      ],
      homeServices: [
        { title: "FTL Tam Dorse Nakliye", desc: "Büyük hacimli yükleriniz için tam dorse çözümü. Haftanın belirli günlerinde Kayseri–Moskova düzenli seferler.", price: "m³ bazlı fiyat" },
        { title: "Parsiyel Nakliye (LTL)", desc: "Komple tır doldurmayan yükler için 325 USD/m³'den başlayan maliyet. 500.000 Euro CMR sigorta güvencesi.", price: "325 USD/m³'den" },
        { title: "Para Transferi", desc: "%3,5 komisyonla ticari ödemeler. Banka uyum departmanlarını aşmadan, resmî kanallarla hızlı transfer.", price: "%3,5 komisyon" },
        { title: "Gümrük Danışmanlığı", desc: "GTİP tespiti, EAC/GOST-R sertifikasyon, beyanname hazırlığı. Rusya gümrüğünde sıfır gecikme hedefi.", price: "Bilgi isteyiniz" },
        { title: "Avrupa'dan Türkiye'ye İthalat", desc: "AB tedarikçilerinden Türkiye'ye karayolu veya denizyolu ile eksiksiz ithalat lojistiği.", price: "Bilgi isteyiniz" },
      ],
      legalLabel: "Hukuki Konum",
      blogPosts: [
        { tag: "Nakliye", date: "Mart 2026", title: "2025–2026 Türkiye-Rusya Nakliye Fiyatları Rehberi", excerpt: "LTL 325 USD/m³, FTL 4.500–6.500 USD — güncel fiyat aralıkları, mevsimsel değişim ve tasarruf ipuçları." },
        { tag: "Nakliye", date: "Şubat 2026", title: "Rusya Parsiyel mi, Komple Tır mı? Doğru Seçim Rehberi", excerpt: "Hangi yük miktarında LTL, hangisinde FTL tercih edilmeli? Karşılaştırmalı maliyet analizi." },
        { tag: "Gümrük", date: "Şubat 2026", title: "Rusya'ya İhracatta Gümrük İşlemleri: Adım Adım Rehber 2025", excerpt: "Türkiye çıkış gümrüğü, Rusya tarife ve KDV oranları, EAC sertifikası — eksiksiz süreç rehberi." },
        { tag: "Transit", date: "Ocak 2026", title: "Türkiye-Rusya Lojistik Güzergahları: Gürcistan mı, Hazar Rotası mı?", excerpt: "Kayseri'den Moskova'ya 3 farklı güzergah: maliyet, süre ve mevsimsel risk karşılaştırması." },
        { tag: "Sigorta", date: "Ocak 2026", title: "CMR Sigortası Nedir? Rusya Nakliyesinde Yük Güvencesi", excerpt: "500.000 Euro'ya kadar CMR güvencesi, hasar prosedürü ve nakliyeci sorumluluğu." },
        { tag: "Para Transferi", date: "Mart 2025", title: "Türkiye'den Rusya'ya Para Transferi: Yasal Çerçeve ve Komisyon Oranları", excerpt: "Ticari ödemelerinizi %3,5 komisyonla hızlı ve güvenli taşıyoruz." },
      ],
      corridorsSectionTitle: "Hizmet Koridorlarımız",
      corridorsSectionSub: "Türkiye-Rusya ana hattından Avrupa-Rusya transitine — 4 koridor, tek firma.",
      corridors: [
        { route: "🇹🇷 → 🇷🇺", title: "Türkiye'den Rusya'ya", desc: "Kayseri'den Moskova'ya 7–14 günde FTL veya parsiyel yük. Para transferi ve gümrük tek pakette.", tags: ["FTL Nakliye", "Parsiyel LTL", "Para Transferi", "Gümrük"] },
        { route: "🇷🇺 → 🇹🇷", title: "Rusya'dan Türkiye'ye", desc: "Rusya'dan Türkiye'ye ihracat ve tersine lojistik. Belgelendirme, gümrük ve teslimat tam hizmet.", tags: ["İhracat", "Tersine Lojistik", "Gümrük", "Teslimat"] },
        { route: "🇪🇺 → 🇷🇺", title: "Avrupa'dan Rusya'ya", desc: "AB ülkelerinden Türkiye üzerinden Rusya'ya transit sevkiyat. UBAK izinli TIR karneli operasyon.", tags: ["Transit", "TIR Karneti", "UBAK", "Gümrük"] },
        { route: "🇷🇺 → 🇪🇺", title: "Rusya'dan Avrupa'ya", desc: "Rusya'dan Türkiye güzergahıyla Avrupa'ya ulaşım. Çok ülkeli operasyon, merkezi koordinasyon.", tags: ["Transit", "Çok Ülke", "TIR Karneti", "Koordinasyon"] },
      ],
      moneyTransfer: {
        eyebrow: "Ticari Para Transferi",
        title: "Avrupa-Rusya Para Transferi",
        sub: "Bankaların takılıp kaldığı yerde biz ilerleriz. Ticari ödemelerinizi yasal kanallarla, %3,5 komisyonla ve 5 iş günü içinde karşı tarafa ulaştırıyoruz.",
        cards: [
          { direction: "Avrupa'dan Rusya'ya", from: "🇪🇺 Avrupa", to: "🇷🇺 Rusya", commission: "%3,5 Komisyon", days: "5 İş Günü", legal: "Türkiye Mevzuatı Uyumlu", desc: "Avrupalı iş ortaklarınızın Rusya'daki hesaplara ödemelerini güvenli ve yasal yollarla ulaştırıyoruz." },
          { direction: "Rusya'dan Avrupa'ya", from: "🇷🇺 Rusya", to: "🇪🇺 Avrupa", commission: "%3,5 Komisyon", days: "5 İş Günü", legal: "Türkiye Mevzuatı Uyumlu", desc: "Rusya'daki iş ortaklarınızın Avrupa hesaplarına hızlı ve yasalara uygun ödeme transferi." },
        ],
        trust: "5411 ve 6493 sayılı kanunlar çerçevesinde, Türkiye'nin yaptırım kapsamı dışında yürütülen işlemler.",
        cta: "Teklif Alın",
      },
    },
    servicesPage: {
      heroParagraph: "Türkiye-Rusya hattında ve Avrupa-Türkiye koridorunda ihtiyaç duyduğunuz her lojistik çözüm tek çatı altında.",
      routesLabel: "Hizmet Güzergahları",
      routeTags: ["🇹🇷 Türkiye → 🇷🇺 Rusya", "🇷🇺 Rusya → 🇹🇷 Türkiye", "🇪🇺 Avrupa → 🇹🇷 Türkiye", "Transit Hatlar"],
      costLabel: "Maliyet",
      newBadge: "Yeni",
      ctaTitle: "Size Özel Lojistik Çözümü İçin",
      ctaSub: "Yükünüzün detaylarını bizimle paylaşın, size en uygun maliyetli ve hızlı çözümü 24 saat içinde sunalım.",
    },
    serviceCards: [
      { title: "Lojistik Operasyon Yönetimi", description: "Yükünüzün inceleme, paketleme, depolama ve sevkiyat süreçlerini baştan sona yönetiyoruz. Kalite kontrol ve doğru etiketleme ile yükünüz Rusya'ya güvenle ulaşır.", price: "Bilgi isteyiniz" },
      { title: "Türkiye–Rusya Para Transferi", description: "Ticari ödemelerinizi %3.5 komisyonla hızlı, güvenli ve resmi prosedürlere tam uyumlu şekilde Rusya'ya iletiyoruz. Bankaların uyum süreçleriyle uğraşmadan işinize devam edin.", price: "%3.5 Komisyon" },
      { title: "Parsiyel Nakliye (LTL)", description: "Az hacimli yüklerinizi paylaşımlı araçlarla ekonomik maliyetle Rusya'ya taşıyoruz. 500.000 Euro CMR sigortalı güvence ile küçük yük, büyük güvenlik.", price: "325 USD/m³'den başlar" },
      { title: "Transit Taşımacılık", description: "Tek sözleşme, tek gümrük işlemi. Yükünüz birden fazla ülke üzerinden geçse de tüm koordinasyonu biz sağlarız.", price: "Bilgi isteyiniz" },
      { title: "Konteyner Taşımacılığı (FCL)", description: "Haftalık sabit seferlerle, tek mühür ve tek beyanname güvencesiyle konteyner nakliyesi. Şeffaf maliyet, yasalara tam uyum.", price: "Bilgi isteyiniz" },
      { title: "FTL Tam Dorse Nakliye", description: "Büyük hacimli yükleriniz için tam dorse çözümü. Haftanın belirli günlerinde Rusya'ya düzenli seferler, şeffaf fiyat, zamanında teslimat.", price: "m³ bazlı fiyat" },
      { title: "Gümrük Danışmanlığı", description: "Rusya gümrük mevzuatı karmaşık, biz bu karmaşayı sizin için çözüyoruz. Doğru beyanname, doğru vergi, sıfır gecikme. EAC/GOST-R sertifikasyon desteği dahil.", price: "Bilgi isteyiniz" },
      { title: "İthalat ve İhracat Danışmanlığı", description: "Rusya'ya ihracat veya oradan ithalat mı planlıyorsunuz? Tedarikçi bulmaktan teslimatına kadar tüm süreci deneyimli ekibimizle yönetiyoruz.", price: "Bilgi isteyiniz" },
      { title: "İhracat İçin Doğrudan Satın Alım", description: "Ürünlerinizi Türkiye'de satın alıp kendi firmamız üzerinden Rusya'ya ihraç ediyoruz. Faturalama, beyanname ve ödeme süreçlerini tamamen biz yönetiyoruz.", price: "Bilgi isteyiniz" },
      { title: "Avrupa'dan Türkiye'ye İthalat", description: "AB ülkelerindeki tedarikçilerden Türkiye'ye mal getirme sürecini eksiksiz yönetiyoruz. Karayolu veya denizyolu seçeneği, Türkiye gümrük danışmanlığı ve Kayseri'ye adrese teslim.", price: "Bilgi isteyiniz" },
    ],
    aboutPage: {
      eyebrow: "Şirket",
      heroParagraph: "Kayseri merkezli, Türkiye-Rusya hattında 10+ yıllık operasyon tecrübesi. Nakliyeden para transferine, gümrük danışmanlığından dış ticaret rehberliğine — tek çatı altında.",
      statLabels: ["Yıllık Tecrübe", "Sevkiyat", "Müşteri", "Hizmet Türü"],
      storyTitle: "Kayseri'den\nMoskova'ya",
      storyP1: "ChapterLOG, Türkiye-Rusya hattında on yılı aşkın süredir faaliyet gösteren, Kayseri merkezli bir uluslararası lojistik şirketidir. Bedir Uluslararası Nakliyat bünyesinde başlayan bu yolculuk, bugün ChapterLOG LLC çatısı altında sürmektedir.",
      storyP2: "Kurucularımız, Türkiye ile Rusya arasındaki ticaret hacminin hızla büyüdüğü dönemde bu hatta gerçekten uzmanlaşmış, güvenilir ve şeffaf bir lojistik ortağının eksikliğini bizzat gözlemledi. Bu boşluğu doldurmak için yola çıktılar.",
      storyP3: "Bugün nakliyeden gümrük danışmanlığına, para transferinden dış ticaret rehberliğine kadar 10 farklı hizmetle Türkiye-Rusya ve Avrupa-Türkiye hatlarında faaliyet gösteriyoruz.",
      hqLabel: "Genel Merkez",
      missionTitle: "Misyon",
      missionText: "Türkiye-Rusya ve Avrupa-Türkiye hatlarında ticaret yapan firmalara bürokratik karmaşadan arındırılmış, şeffaf ve güvenilir lojistik çözümler sunmak.",
      visionTitle: "Vizyon",
      visionText: "Türkiye köprüsü üzerinden küresel ticareti kolaylaştıran, teknoloji destekli ve insan odaklı bir lojistik ekosisteminin öncüsü olmak.",
      valuesTitle: "Değerler",
      valuesText: "Şeffaflık ve dürüstlük. Müşterilerimize verdiğimiz her söz bir taahhüttür. Sürpriz maliyet yoktur. Sorunlar gizlenmez, anında çözülür.",
      whyTitle: "Neden ChapterLOG?",
      whySub: "Rusya lojistik hattında onlarca oyuncu var. Bizi farklı kılan ayrıntılar:",
      whyItems: [
        { title: "Tek Çatı Operasyon", desc: "Nakliye, gümrük, sigorta, depolama ve para transferi — tek sözleşmeyle." },
        { title: "Yanıt Garantisi", desc: "Sorularınıza en geç 24 iş saati içinde dönüş yapılır. Acil durumda anında destek." },
        { title: "500.000 € CMR Sigorta", desc: "Araçlarımız yüksek limitli CMR sigortasıyla donatılmıştır. Yükünüz tam güvencede." },
        { title: "Şeffaf Fiyatlandırma", desc: "Sürpriz maliyet yoktur. Tüm ücretler önceden netleştirilir, yazılı teyit edilir." },
        { title: "Yasalara Tam Uyum", desc: "Türkiye AB ve ABD yaptırımlarına taraf değildir. Tüm operasyonlar Türk mevzuatı kapsamındadır." },
      ],
      expBadgeLabel: "Yıllık Tecrübe",
      hqLocation: "Melikgazi / Kayseri, Türkiye",
      routesSectionTitle: "Hizmet Güzergahlarımız",
      routesSectionSub: "Türkiye-Rusya ana hattında ve Avrupa-Türkiye koridorunda kapsamlı hizmet ağı.",
      routeCards: [
        { title: "Türkiye'den Rusya'ya", desc: "Ana hattımız. Kayseri'den Moskova, St. Petersburg ve Rusya'nın dört bir yanına nakliye, gümrük ve para transferi.", services: ["FTL Nakliye", "Parsiyel LTL", "Konteyner", "Para Transferi", "Gümrük Danışmanlığı"] },
        { title: "Avrupa'dan Türkiye'ye", desc: "AB ülkelerinden Türkiye'ye ithalat lojistiği. Karayolu veya denizyolu seçenekleriyle Kayseri'ye adrese teslim.", services: ["Karayolu Nakliye", "Denizyolu FCL", "Gümrük Danışmanlığı", "A.TR Belgesi"] },
        { title: "Transit Hatlar", desc: "Gürcistan, Azerbaycan ve Orta Asya üzerinden transit sevkiyatlar. Tek sözleşme, merkezi koordinasyon.", services: ["TIR Karnesi", "UBAK İzinleri", "Transit Gümrük", "Çok Ülke Sözleşme"] },
      ],
      legalTitle: "Yasal Çerçeve",
      legalP1Bold: "Türkiye, AB ve ABD yaptırım rejimlerine taraf değildir.",
      legalP1Rest: " Türkiye-Rusya ticareti Türk mevzuatı çerçevesinde tamamen yasaldır. ChapterLOG, tüm operasyonlarını 5411 sayılı Bankacılık Kanunu, 6493 sayılı Ödeme Hizmetleri Kanunu ve ilgili tüm mevzuata tam uyumlu biçimde yürütmektedir.",
      legalP2: "Para transferi hizmetlerimiz yasal finans kanalları üzerinden gerçekleştirilmekte olup tüm işlemler resmî kayıt altında tutulmaktadır. Şüpheli veya yasadışı nitelikteki işlemler firmamız tarafından kesinlikle kabul edilmez.",
      legalBadges: ["5411 Bankacılık Kanunu", "6493 Ödeme Hizmetleri", "MASAK Uyumu", "CMR Sigorta"],
      ctaTitle: "Birlikte çalışmaya hazır mısınız?",
      ctaSub: "Yükünüzün detaylarını paylaşın, 24 iş saati içinde size özel teklif sunalım.",
      ctaQuote: "Teklif Al",
      ctaServices: "Hizmetler",
    },
    about: {
      label: "Hakkımızda",
      title: "Türkiye-Rusya Hattının Güvenilir Köprüsü",
      p1: "Kayseri merkezli ChapterLOG, 10+ yıllık tecrübesiyle Türkiye-Rusya hattında nakliye, gümrük danışmanlığı ve ticari para transferi hizmetleri sunmaktadır.",
      p2: "Türkiye, AB ve ABD yaptırımlarına taraf olmadığından Türkiye-Rusya ticareti Türk mevzuatı çerçevesinde tamamen yasaldır. Tüm operasyonlarımız yürürlükteki mevzuata eksiksiz uygun şekilde yürütülmektedir.",
      cta: "Bize Ulaşın",
    },
    blog: {
      label: "Blog",
      title: "Sektör Bilgisi",
      sub: "Avrupa-Rusya ve Türkiye-Rusya lojistiği, gümrük, nakliye ve para transferi hakkında uzman rehberleri.",
      readMore: "Devamını Oku",
      allPosts: "Tüm 12 Yazıyı İncele",
    },
    testimonials: { label: "Müşteri Görüşleri", title: "Müşterilerimiz Ne Diyor?" },
    contact: {
      label: "İletişim",
      title: "Bizimle İletişime Geçin",
      sub: "Yükünüzle ilgili detayları bizimle paylaşın, 24 saat içinde size dönelim.",
    },
    footer: {
      tagline: "Türkiye'den Rusya'ya Güvenle.\nYükünüzün her adımında yanınızdayız.",
      quickLinks: "Hızlı Erişim",
      ourServices: "Hizmetlerimiz",
      contactInfo: "İletişim",
      copyright: "© 2025 ChapterLOG LLC. Tüm hakları saklıdır.",
    },
    sanctions: {
      notice: "Türkiye, AB ve ABD yaptırım rejimlerine taraf değildir. Türkiye-Rusya ticaret ilişkisi, Türk mevzuatı çerçevesinde tamamen yasal olup tüm operasyonlarımız yürürlükteki ulusal ve uluslararası hukuka uygun biçimde yürütülmektedir.",
    },
  },

  en: {
    nav: {
      home: "Home",
      services: "Services",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      cta: "Get a Quote",
    },
    hero: {
      badge: "🇹🇷 Safe Route to Russia via Turkey",
      routeEyebrow: "Europe — Russia",
      title1: "Your Cargo. Every Step.",
      title2: "We're There.",
      subtitle: "FTL & LTL freight from Turkey and Europe to Russia, commercial money transfers and customs brokerage — all logistics solutions from a single partner.",
      cta: "Get a Quote",
      secondary: "Our Services",
      infoPanelCta: "View all services",
    },
    stats: {
      years: "Years on Russia Route",
      shipments: "Successful Deliveries",
      clients: "Fixed Commission",
      subs: ["Road · Transit · Combined", "FTL · LTL · Container", "Fast · Secure · Legal"],
    },
    services: {
      eyebrow: "Services",
      heading: "Services",
      sub: "Every solution you need for Russia trade, under one roof.",
      title: "Our Services",
      cta: "View All Services",
    },
    home: {
      aboutCaption: "Loading from our Kayseri OSB warehouse is available — door-to-door delivery is not required.",
      specLabels: ["Freight guarantee", "Money transfer commission", "Transit time", "Response time"],
      specVals: ["From 3.5%", "7–14 days", "≤ 24 hrs"],
      aboutCta: "About Us",
      ctaTitle: "Need a quote for your shipment?",
      ctaSub: "We'll send you a detailed, binding offer within 24 business hours.",
      ctaBtn: "Get a Quote",
      ctaSecondary: "About Us",
      faqTitle: "Frequently Asked Questions",
      faqSub: "The most common questions about Turkey-Russia logistics and money transfers.",
      infoPanelRows: [
        { label: "Full Truckload (FTL)", detail: "7–14 day transit" },
        { label: "Partial (LTL)", detail: "From 325 USD/m³" },
        { label: "Money Transfer", detail: "3.5% commission" },
        { label: "Customs Consultancy", detail: "EAC/GOST-R support" },
        { label: "EU Import", detail: "Road & sea" },
      ],
      homeServices: [
        { title: "Full Truckload (FTL)", desc: "Full truck for large volumes. Regular Kayseri–Moscow departures, transparent pricing, on-time delivery.", price: "Volume-based price" },
        { title: "Partial (LTL)", desc: "For smaller loads from 325 USD/m³. CMR insurance up to €500,000, 7–10 day delivery.", price: "From 325 USD/m³" },
        { title: "Money Transfer", desc: "Commercial payments at 3.5% commission. Fast, official, bypassing bank compliance queues.", price: "3.5% commission" },
        { title: "Customs Consultancy", desc: "HS code classification, EAC/GOST-R certification, customs filing — zero delays at the border.", price: "On request" },
        { title: "EU-to-Turkey Import", desc: "End-to-end import logistics from EU suppliers to Turkey by road or sea.", price: "On request" },
      ],
      legalLabel: "Legal Statement",
      blogPosts: [
        { tag: "Freight", date: "Mar 2026", title: "2025–2026 Turkey–Russia Freight Pricing Guide", excerpt: "LTL from 325 USD/m³, FTL 4,500–6,500 USD — current rates, seasonal shifts and cost-saving tips." },
        { tag: "Freight", date: "Feb 2026", title: "Russia LTL vs FTL: Which Is Right for Your Shipment?", excerpt: "When to choose partial load and when a full truck saves money — a side-by-side cost analysis." },
        { tag: "Customs", date: "Feb 2026", title: "Russia Export Customs Step-by-Step: 2025 Guide", excerpt: "Turkey export clearance, Russian duties and VAT, EAC certification — full process explained." },
        { tag: "Transit", date: "Jan 2026", title: "Turkey–Russia Routes: Georgia vs Caspian — Which Is Better?", excerpt: "Three routes from Kayseri to Moscow compared by cost, transit time and seasonal risk." },
        { tag: "Insurance", date: "Jan 2026", title: "CMR Cargo Insurance for Russia Shipments: What You Must Know", excerpt: "€500,000 CMR coverage, claims procedure and carrier liability — fully explained." },
        { tag: "Money Transfer", date: "Mar 2025", title: "Turkey–Russia Money Transfers: Legal Framework and Commission Rates", excerpt: "We move your commercial payments at 3.5% commission — fast and secure." },
      ],
      corridorsSectionTitle: "Our Service Corridors",
      corridorsSectionSub: "From the Turkey-Russia main lane to Europe-Russia transit — 4 corridors, one company.",
      corridors: [
        { route: "🇹🇷 → 🇷🇺", title: "Turkey to Russia", desc: "FTL or partial loads from Kayseri to Moscow in 7–14 days. Money transfer and customs in one package.", tags: ["FTL Freight", "Partial LTL", "Money Transfer", "Customs"] },
        { route: "🇷🇺 → 🇹🇷", title: "Russia to Turkey", desc: "Export and reverse logistics from Russia to Turkey. Documentation, customs clearance and delivery — fully managed.", tags: ["Export", "Reverse Logistics", "Customs", "Delivery"] },
        { route: "🇪🇺 → 🇷🇺", title: "Europe to Russia", desc: "Transit shipments from EU countries to Russia via Turkey. UBAK-licensed, TIR carnet operations.", tags: ["Transit", "TIR Carnet", "UBAK", "Customs"] },
        { route: "🇷🇺 → 🇪🇺", title: "Russia to Europe", desc: "Transit cargo from Russia to European countries via Turkey. Multi-country operations, central coordination.", tags: ["Transit", "Multi-Country", "TIR Carnet", "Coordination"] },
      ],
      moneyTransfer: {
        eyebrow: "Commercial Money Transfer",
        title: "Europe–Russia Money Transfers",
        sub: "Where banks get stuck, we move forward. Commercial payments via official channels at 3.5% commission — delivered in 5 business days.",
        cards: [
          { direction: "Europe to Russia", from: "🇪🇺 Europe", to: "🇷🇺 Russia", commission: "3.5% Commission", days: "5 Business Days", legal: "Turkey Compliant", desc: "We deliver payments from European partners to Russian accounts safely, legally, and on time." },
          { direction: "Russia to Europe", from: "🇷🇺 Russia", to: "🇪🇺 Europe", commission: "3.5% Commission", days: "5 Business Days", legal: "Turkey Compliant", desc: "Fast, compliant transfers from Russian businesses to European accounts — processed in Turkey." },
        ],
        trust: "All transactions under Turkish laws No. 5411 & 6493, outside the scope of Western sanctions.",
        cta: "Request a Quote",
      },
    },
    servicesPage: {
      heroParagraph: "Every logistics solution you need on the Turkey–Russia corridor and the Europe–Turkey route, under one roof.",
      routesLabel: "Service Routes",
      routeTags: ["🇹🇷 Turkey → 🇷🇺 Russia", "🇷🇺 Russia → 🇹🇷 Turkey", "🇪🇺 Europe → 🇹🇷 Turkey", "Transit Routes"],
      costLabel: "Cost",
      newBadge: "New",
      ctaTitle: "Looking for a Tailored Logistics Solution?",
      ctaSub: "Share your cargo details and we'll get back to you with the best option within 24 hours.",
    },
    serviceCards: [
      { title: "Logistics Operations Management", description: "We manage your cargo's inspection, packaging, warehousing and dispatch end-to-end. Quality control and proper labelling ensure safe delivery to Russia.", price: "On request" },
      { title: "Turkey–Russia Money Transfer", description: "Commercial payments at 3.5% commission — fast, secure and fully compliant. No bank compliance queues.", price: "3.5% commission" },
      { title: "Partial Load (LTL)", description: "For smaller loads from 325 USD/m³. CMR insurance up to €500,000. Small cargo, full security.", price: "From 325 USD/m³" },
      { title: "Transit Freight", description: "One contract, one customs clearance. We coordinate multi-country routing for you.", price: "On request" },
      { title: "Container Shipping (FCL)", description: "Weekly fixed departures, single seal and single declaration. Transparent costs, full compliance.", price: "On request" },
      { title: "Full Truckload (FTL)", description: "Full truck for large volumes. Regular Russia departures, transparent pricing, on-time delivery.", price: "Volume-based price" },
      { title: "Customs Consultancy", description: "Russian customs law is complex — we simplify it for you. Correct declarations, zero delays. EAC/GOST-R certification support.", price: "On request" },
      { title: "Import & Export Consultancy", description: "Planning to export to Russia or import from it? Our team manages the process from supplier sourcing to delivery.", price: "On request" },
      { title: "Direct Purchase for Export", description: "We buy goods in Turkey and export to Russia under our company. Invoicing, customs filing and payment — fully managed by us.", price: "On request" },
      { title: "EU-to-Turkey Import", description: "End-to-end import of goods from EU countries to Turkey. Road or sea transport, customs consultancy and delivery to Kayseri.", price: "On request" },
    ],
    aboutPage: {
      eyebrow: "Company",
      heroParagraph: "Kayseri-based, 10+ years of active operations on the Turkey–Russia route. Freight, money transfers, customs consultancy and trade advisory — all under one roof.",
      statLabels: ["Years of Experience", "Shipments", "Clients", "Service Types"],
      storyTitle: "From Kayseri\nto Moscow",
      storyP1: "ChapterLOG is an international logistics company based in Kayseri, operating on the Turkey–Russia route for over a decade. What began under Bedir Uluslararası Nakliyat continues today as ChapterLOG LLC.",
      storyP2: "Our founders saw firsthand how rapidly trade between Turkey and Russia was growing, and recognised the lack of a truly reliable, transparent logistics partner in this corridor. They set out to fill that gap.",
      storyP3: "Today we operate across 10 service lines on the Turkey–Russia and Europe–Turkey routes: from freight and customs consultancy to money transfers and full trade advisory.",
      hqLabel: "Headquarters",
      missionTitle: "Mission",
      missionText: "To provide transparent, reliable logistics solutions free from bureaucratic complexity, for businesses trading on the Turkey–Russia and Europe–Turkey routes.",
      visionTitle: "Vision",
      visionText: "To pioneer a technology-driven and people-centred logistics ecosystem that facilitates global trade through the Turkish bridge.",
      valuesTitle: "Values",
      valuesText: "Transparency and integrity. Every promise is a commitment. No surprise costs. Problems are not hidden — they are solved immediately.",
      whyTitle: "Why ChapterLOG?",
      whySub: "There are many players on the Russia logistics corridor. Here is what sets us apart:",
      whyItems: [
        { title: "One-Stop Operations", desc: "Freight, customs, insurance, warehousing and money transfers — one contract." },
        { title: "Response Guarantee", desc: "We respond within 24 business hours. Urgent enquiries get immediate support." },
        { title: "€500,000 CMR Insurance", desc: "Our vehicles carry high-limit CMR insurance. Your cargo is fully covered." },
        { title: "Transparent Pricing", desc: "No surprise costs. All fees are agreed upfront and confirmed in writing." },
        { title: "Full Legal Compliance", desc: "Turkey is not party to EU or US sanctions. All operations are conducted under Turkish law." },
      ],
      expBadgeLabel: "Years of Experience",
      hqLocation: "Melikgazi / Kayseri, Turkey",
      routesSectionTitle: "Our Service Routes",
      routesSectionSub: "Comprehensive service network on the main Turkey–Russia route and the Europe–Turkey corridor.",
      routeCards: [
        { title: "Turkey to Russia", desc: "Our main route. Freight, customs and money transfers from Kayseri to Moscow, St. Petersburg and across Russia.", services: ["FTL Freight", "Partial LTL", "Container", "Money Transfer", "Customs Consultancy"] },
        { title: "Europe to Turkey", desc: "Import logistics from EU countries to Turkey. Road or sea transport, delivery to Kayseri.", services: ["Road Freight", "Sea FCL", "Customs Consultancy", "A.TR Certificate"] },
        { title: "Transit Routes", desc: "Transit shipments via Georgia, Azerbaijan and Central Asia. One contract, centralised coordination.", services: ["TIR Carnet", "UBAK Permits", "Transit Customs", "Multi-country Contract"] },
      ],
      legalTitle: "Legal Framework",
      legalP1Bold: "Turkey is not party to EU or US sanctions regimes.",
      legalP1Rest: " Turkey–Russia trade is fully legal under Turkish law. ChapterLOG conducts all operations in full compliance with Banking Law No. 5411, Payment Services Law No. 6493, and all applicable regulations.",
      legalP2: "Our money transfer services are conducted through official financial channels, and all transactions are kept in official records. Suspicious or unlawful transactions are strictly refused.",
      legalBadges: ["Banking Law 5411", "Payment Services 6493", "MASAK Compliance", "CMR Insurance"],
      ctaTitle: "Ready to Work Together?",
      ctaSub: "Share your cargo details and we'll send you a tailored offer within 24 business hours.",
      ctaQuote: "Get a Quote",
      ctaServices: "Services",
    },
    about: {
      label: "About Us",
      title: "The Trusted Bridge on the Turkey–Russia Route",
      p1: "Kayseri-based ChapterLOG offers freight forwarding, customs consultancy and commercial money transfer services on the Turkey–Russia corridor, backed by 10+ years of hands-on experience.",
      p2: "Turkey is not a party to EU or US sanctions regimes. Turkey–Russia trade is fully legal under Turkish law. All our operations are conducted in full compliance with applicable national and international regulations.",
      cta: "Contact Us",
    },
    blog: {
      label: "Blog",
      title: "Industry Insights",
      sub: "Expert guides on Turkey–Russia logistics, customs, freight and money transfers.",
      readMore: "Read More",
      allPosts: "View All 9 Articles",
    },
    testimonials: { label: "Testimonials", title: "What Our Clients Say" },
    contact: {
      label: "Contact",
      title: "Get in Touch",
      sub: "Share your cargo details with us and we will get back to you within 24 hours.",
    },
    footer: {
      tagline: "From Turkey to Russia, Safely.\nBy your cargo's side at every step.",
      quickLinks: "Quick Links",
      ourServices: "Our Services",
      contactInfo: "Contact",
      copyright: "© 2025 ChapterLOG LLC. All rights reserved.",
    },
    sanctions: {
      notice: "Turkey is not subject to EU or US sanctions regimes. Turkey–Russia trade is fully legal under Turkish law, and all our operations are conducted in full compliance with applicable national and international legislation.",
    },
  },

  ru: {
    nav: {
      home: "Главная",
      services: "Услуги",
      blog: "Блог",
      about: "О нас",
      contact: "Контакты",
      cta: "Получить предложение",
    },
    hero: {
      badge: "🇹🇷 Надёжный маршрут в Россию через Турцию",
      routeEyebrow: "Европа — Россия",
      title1: "Ваш груз на каждом этапе",
      title2: "— мы рядом.",
      subtitle: "FTL и сборные грузоперевозки из Турции и Европы в Россию, коммерческие денежные переводы и таможенное оформление — все логистические решения от одного партнёра.",
      cta: "Получить предложение",
      secondary: "Наши услуги",
      infoPanelCta: "Посмотреть все услуги",
    },
    stats: {
      years: "Лет на маршруте Россия",
      shipments: "Успешных доставок",
      clients: "Фикс. комиссия",
      subs: ["Автодорога · Транзит · Комби", "FTL · LTL · Контейнер", "Быстро · Надёжно · Легально"],
    },
    services: {
      eyebrow: "Услуги",
      heading: "Услуги",
      sub: "Все решения для торговли с Россией под одной крышей.",
      title: "Наши услуги",
      cta: "Все услуги",
    },
    home: {
      aboutCaption: "Погрузка возможна с нашего склада в Кайсери OSB — доставка «до двери» не обязательна.",
      specLabels: ["Гарантия груза", "Комиссия за перевод", "Время транзита", "Время ответа"],
      specVals: ["От 3,5%", "7–14 дней", "≤ 24 ч."],
      aboutCta: "О компании",
      ctaTitle: "Нужна цена на перевозку?",
      ctaSub: "Мы пришлём подробное и обязательное предложение в течение 24 рабочих часов.",
      ctaBtn: "Получить цену",
      ctaSecondary: "О нас",
      faqTitle: "Часто задаваемые вопросы",
      faqSub: "Самые популярные вопросы о логистике и денежных переводах Турция–Россия.",
      infoPanelRows: [
        { label: "Полный автомобиль (FTL)", detail: "Транзит 7–14 дней" },
        { label: "Частичная (LTL)", detail: "От 325 USD/м³" },
        { label: "Денежный перевод", detail: "Комиссия 3,5%" },
        { label: "Таможенный консалтинг", detail: "Поддержка EAC/GOST-R" },
        { label: "Импорт из ЕС", detail: "Авто и морем" },
      ],
      homeServices: [
        { title: "Полный автомобиль (FTL)", desc: "Полная фура для крупных грузов. Регулярные рейсы Кайсери–Москва, прозрачная стоимость, доставка в срок.", price: "Цена по объёму" },
        { title: "Частичная (LTL)", desc: "Для небольших грузов: от 325 USD/м³. Страхование CMR на 500 000 €, доставка 7–10 дней.", price: "От 325 USD/м³" },
        { title: "Денежный перевод", desc: "Коммерческие платежи с комиссией 3,5%. Быстро, официально, без банковских задержек.", price: "Комиссия 3,5%" },
        { title: "Таможенный консалтинг", desc: "Декларирование, сертификация EAC/GOST-R, таможенное оформление — без задержек на границе.", price: "По запросу" },
        { title: "Импорт из ЕС в Турцию", desc: "Полное сопровождение импорта из стран ЕС в Турцию. Автомобильный и морской транспорт.", price: "По запросу" },
      ],
      legalLabel: "Правовая позиция",
      blogPosts: [
        { tag: "Перевозки", date: "Март 2026", title: "Тарифы на перевозку Турция–Россия 2025–2026: полный гид", excerpt: "LTL от 325 USD/м³, FTL 4 500–6 500 USD — актуальные ставки, сезонные изменения и советы по экономии." },
        { tag: "Перевозки", date: "Фев 2026", title: "Сборный груз (LTL) или полная фура (FTL): что выбрать?", excerpt: "Сравнительный анализ стоимости — когда выгоднее частичная загрузка, а когда полный грузовик." },
        { tag: "Таможня", date: "Фев 2026", title: "Таможенное оформление при экспорте в Россию: пошаговое руководство 2025", excerpt: "Турецкая таможня, российские пошлины и НДС, сертификат EAC — весь процесс по шагам." },
        { tag: "Транзит", date: "Янв 2026", title: "Маршруты Турция–Россия: Грузия или Каспийский путь?", excerpt: "Три маршрута из Кайсери в Москву: стоимость, время в пути и сезонные риски." },
        { tag: "Страхование", date: "Янв 2026", title: "CMR-страхование грузов при перевозке в Россию", excerpt: "Покрытие до 500 000 €, процедура урегулирования убытков и ответственность перевозчика." },
        { tag: "Перевод", date: "Март 2025", title: "Денежные переводы Турция–Россия: правовая база и комиссии", excerpt: "Коммерческие платежи с комиссией 3,5% — быстро и безопасно." },
      ],
      corridorsSectionTitle: "Наши коридоры",
      corridorsSectionSub: "От основного маршрута Турция-Россия до транзита Европа-Россия — 4 коридора, одна компания.",
      corridors: [
        { route: "🇹🇷 → 🇷🇺", title: "Из Турции в Россию", desc: "FTL или частичная загрузка из Кайсери в Москву за 7–14 дней. Денежный перевод и таможня в одном пакете.", tags: ["FTL", "LTL", "Перевод", "Таможня"] },
        { route: "🇷🇺 → 🇹🇷", title: "Из России в Турцию", desc: "Экспорт и обратная логистика из России в Турцию. Документация, таможенное оформление и доставка — под ключ.", tags: ["Экспорт", "Обратная логистика", "Таможня", "Доставка"] },
        { route: "🇪🇺 → 🇷🇺", title: "Из Европы в Россию", desc: "Транзитные отправки из стран ЕС в Россию через Турцию. Операции по книжке МДП с лицензией УБАК.", tags: ["Транзит", "Книжка МДП", "УБАК", "Таможня"] },
        { route: "🇷🇺 → 🇪🇺", title: "Из России в Европу", desc: "Транзитный груз из России в европейские страны через Турцию. Многостранные операции, центральная координация.", tags: ["Транзит", "Многострановой", "Книжка МДП", "Координация"] },
      ],
      moneyTransfer: {
        eyebrow: "Коммерческий денежный перевод",
        title: "Переводы Европа–Россия",
        sub: "Там, где банки останавливаются, мы продолжаем работать. Коммерческие платежи по официальным каналам, комиссия 3,5%, срок до 5 рабочих дней.",
        cards: [
          { direction: "Из Европы в Россию", from: "🇪🇺 Европа", to: "🇷🇺 Россия", commission: "Комиссия 3,5%", days: "5 рабочих дней", legal: "Турецкое законодательство", desc: "Платежи от европейских партнёров на российские счета — безопасно, официально, в срок." },
          { direction: "Из России в Европу", from: "🇷🇺 Россия", to: "🇪🇺 Европа", commission: "Комиссия 3,5%", days: "5 рабочих дней", legal: "Турецкое законодательство", desc: "Быстрые и легальные переводы с российских счетов на европейские — через Турцию." },
        ],
        trust: "Все операции проводятся в рамках турецкого законодательства (законы № 5411 и 6493), вне сферы западных санкций.",
        cta: "Получить предложение",
      },
    },
    servicesPage: {
      heroParagraph: "Все логистические решения, необходимые вам на маршруте Турция–Россия и в коридоре Европа–Турция, под одной крышей.",
      routesLabel: "Маршруты обслуживания",
      routeTags: ["🇹🇷 Турция → 🇷🇺 Россия", "🇷🇺 Россия → 🇹🇷 Турция", "🇪🇺 Европа → 🇹🇷 Турция", "Транзитные маршруты"],
      costLabel: "Стоимость",
      newBadge: "Новинка",
      ctaTitle: "Индивидуальное логистическое решение для вас",
      ctaSub: "Поделитесь деталями вашего груза, и мы предложим лучший вариант в течение 24 часов.",
    },
    serviceCards: [
      { title: "Управление логистикой", description: "Осматриваем, упаковываем, храним и отправляем ваш груз. Контроль качества и правильная маркировка — груз доберётся до России в целости.", price: "По запросу" },
      { title: "Денежные переводы Турция–Россия", description: "Коммерческие платежи с комиссией 3,5% — быстро, безопасно, в полном соответствии с законодательством. Без задержек на банковском комплаенсе.", price: "Комиссия 3,5%" },
      { title: "Частичная загрузка (LTL)", description: "Для небольших грузов: от 325 USD/м³. Страхование CMR на 500 000 €. Небольшой груз — большая надёжность.", price: "От 325 USD/м³" },
      { title: "Транзитные перевозки", description: "Один договор, одно таможенное оформление. Мы координируем маршрут через несколько стран.", price: "По запросу" },
      { title: "Контейнерные перевозки (FCL)", description: "Еженедельные рейсы, один пломбирован — одна декларация. Прозрачные затраты, полное соответствие.", price: "По запросу" },
      { title: "Полная фура (FTL)", description: "Для крупных грузов — полный автомобиль. Регулярные рейсы в Россию, прозрачная цена, доставка в срок.", price: "Цена по объёму" },
      { title: "Таможенный консалтинг", description: "Российское таможенное законодательство сложное — мы его для вас упрощаем. Верная декларация, нулевые задержки. Сертификация EAC/GOST-R.", price: "По запросу" },
      { title: "Консалтинг по импорту и экспорту", description: "Планируете экспорт в Россию или импорт из неё? Опытная команда сопроводит от поиска поставщика до доставки.", price: "По запросу" },
      { title: "Прямая закупка для экспорта", description: "Мы покупаем товары в Турции и экспортируем в Россию от имени нашей компании. Счёт, декларация и оплата — всё на нас.", price: "По запросу" },
      { title: "Импорт из ЕС в Турцию", description: "Полное сопровождение импорта товаров из стран ЕС в Турцию. Автомобильный или морской транспорт, таможенный консалтинг, доставка в Кайсери.", price: "По запросу" },
    ],
    aboutPage: {
      eyebrow: "О компании",
      heroParagraph: "База в Кайсери, опыт более 10 лет на маршруте Турция–Россия. Грузоперевозки, денежные переводы, таможенный консалтинг и помощь во внешней торговле — всё под одной крышей.",
      statLabels: ["Лет опыта", "Отправок", "Клиентов", "Видов услуг"],
      storyTitle: "Из Кайсери\nв Москву",
      storyP1: "ChapterLOG — международная логистическая компания с базой в Кайсери, работающая на маршруте Турция–Россия уже более десяти лет. Начатый в рамках Bedir Uluslararası Nakliyat, этот путь сегодня продолжается под брендом ChapterLOG LLC.",
      storyP2: "Основатели компании лично наблюдали, как стремительно растёт товарооборот между Турцией и Россией, и убедились, что рынку не хватает надёжного, прозрачного логистического партнёра. Чтобы заполнить эту нишу, они основали ChapterLOG.",
      storyP3: "Сегодня мы работаем по 10 направлениям услуг на маршрутах Турция–Россия и Европа–Турция: от грузоперевозок и таможенного консалтинга до денежных переводов и сопровождения внешнеторговых операций.",
      hqLabel: "Главный офис",
      missionTitle: "Миссия",
      missionText: "Предоставлять прозрачные и надёжные логистические решения, свободные от бюрократических сложностей, для компаний, торгующих по маршрутам Турция–Россия и Европа–Турция.",
      visionTitle: "Видение",
      visionText: "Стать первопроходцем технологичной и человекоориентированной логистической экосистемы, которая упрощает глобальную торговлю через турецкий мост.",
      valuesTitle: "Ценности",
      valuesText: "Прозрачность и честность. Каждое обещание — обязательство. Без скрытых расходов. Проблемы не замалчиваются — они решаются немедленно.",
      whyTitle: "Почему ChapterLOG?",
      whySub: "На российском логистическом рынке много игроков. Вот что нас отличает:",
      whyItems: [
        { title: "Полный спектр услуг", desc: "Перевозка, таможня, страхование, хранение и денежные переводы — один договор." },
        { title: "Гарантия ответа", desc: "Ответ в течение 24 рабочих часов. При срочных запросах — немедленно." },
        { title: "Страхование CMR 500 000 €", desc: "Наши автомобили оснащены высоколимитным CMR-страхованием. Груз под полной защитой." },
        { title: "Прозрачное ценообразование", desc: "Никаких сюрпризов. Все расходы оговариваются заранее и подтверждаются письменно." },
        { title: "Полное соответствие законодательству", desc: "Турция не участвует в санкциях ЕС и США. Все операции ведутся в рамках турецкого права." },
      ],
      expBadgeLabel: "Лет опыта",
      hqLocation: "Меликгази / Кайсери, Турция",
      routesSectionTitle: "Наши маршруты",
      routesSectionSub: "Широкая сеть обслуживания на основном маршруте Турция–Россия и в коридоре Европа–Турция.",
      routeCards: [
        { title: "Из Турции в Россию", desc: "Наш основной маршрут. Грузоперевозки, таможенное оформление и денежные переводы из Кайсери в Москву, Санкт-Петербург и по всей России.", services: ["FTL (полный автомобиль)", "LTL (частичная загрузка)", "Контейнер", "Денежный перевод", "Таможенный консалтинг"] },
        { title: "Из ЕС в Турцию", desc: "Импортная логистика из стран ЕС в Турцию. Автомобильный или морской транспорт, доставка в Кайсери.", services: ["Автоперевозки", "Морской FCL", "Таможенный консалтинг", "Сертификат A.TR"] },
        { title: "Транзитные маршруты", desc: "Транзитные отправки через Грузию, Азербайджан и Центральную Азию. Один договор, единая координация.", services: ["Карнет TIR", "Разрешения УБАК", "Транзитная таможня", "Мультистрановой договор"] },
      ],
      legalTitle: "Правовая база",
      legalP1Bold: "Турция не является участником санкционных режимов ЕС и США.",
      legalP1Rest: " Торговля Турции с Россией полностью законна по турецкому праву. ChapterLOG ведёт все операции в строгом соответствии с Законом о банковской деятельности № 5411, Законом о платёжных услугах № 6493 и всеми применимыми нормативными актами.",
      legalP2: "Услуги по денежным переводам осуществляются через официальные финансовые каналы, а все операции фиксируются в установленном порядке. Подозрительные или незаконные операции компанией категорически не принимаются.",
      legalBadges: ["Банк. закон № 5411", "Платёжные услуги № 6493", "Соответствие MASAK", "Страхование CMR"],
      ctaTitle: "Готовы начать сотрудничество?",
      ctaSub: "Поделитесь деталями вашего груза — мы пришлём индивидуальное предложение в течение 24 рабочих часов.",
      ctaQuote: "Получить цену",
      ctaServices: "Услуги",
    },
    about: {
      label: "О нас",
      title: "Надёжный мост на маршруте Турция–Россия",
      p1: "ChapterLOG, базирующийся в Кайсери, предоставляет услуги грузоперевозок, таможенного консалтинга и коммерческих денежных переводов на маршруте Турция–Россия, опираясь на 10+ лет практического опыта.",
      p2: "Турция не является участником режимов санкций ЕС или США. Торговля между Турцией и Россией полностью законна по турецкому законодательству. Все наши операции осуществляются в полном соответствии с действующим законодательством.",
      cta: "Связаться с нами",
    },
    blog: {
      label: "Блог",
      title: "Отраслевые знания",
      sub: "Экспертные руководства по логистике, таможне и денежным переводам Турция–Россия.",
      readMore: "Читать далее",
      allPosts: "Все 9 статей",
    },
    testimonials: { label: "Отзывы клиентов", title: "Что говорят наши клиенты" },
    contact: {
      label: "Контакты",
      title: "Свяжитесь с нами",
      sub: "Поделитесь деталями вашего груза, и мы ответим в течение 24 часов.",
    },
    footer: {
      tagline: "Из Турции в Россию — надёжно.\nРядом с вашим грузом на каждом шагу.",
      quickLinks: "Быстрые ссылки",
      ourServices: "Наши услуги",
      contactInfo: "Контакты",
      copyright: "© 2025 ChapterLOG LLC. Все права защищены.",
    },
    sanctions: {
      notice: "Турция не является участником санкционных режимов ЕС и США. Торговля между Турцией и Россией полностью законна в соответствии с турецким законодательством, а все наши операции осуществляются в полном соответствии с действующим национальным и международным законодательством.",
    },
  },

  de: {
    nav: {
      home: "Startseite",
      services: "Leistungen",
      blog: "Blog",
      about: "Über uns",
      contact: "Kontakt",
      cta: "Angebot anfordern",
    },
    hero: {
      badge: "🇹🇷 Sichere Route nach Russland über die Türkei",
      routeEyebrow: "Europa — Russland",
      title1: "Ihre Fracht. Jeder Schritt.",
      title2: "Wir sind da.",
      subtitle: "FTL- und Teilladungs-Transporte aus der Türkei und Europa nach Russland, kommerzielle Geldtransfers und Zollberatung — alle Logistiklösungen aus einer Hand.",
      cta: "Angebot anfordern",
      secondary: "Unsere Leistungen",
      infoPanelCta: "Alle Leistungen ansehen",
    },
    stats: {
      years: "Jahre auf der Russland-Route",
      shipments: "Erfolgreiche Lieferungen",
      clients: "Feste Provision",
      subs: ["Straße · Transit · Kombiniert", "FTL · LTL · Container", "Schnell · Sicher · Legal"],
    },
    services: {
      eyebrow: "Leistungen",
      heading: "Leistungen",
      sub: "Alle Lösungen, die Sie für den Russland-Handel benötigen — unter einem Dach.",
      title: "Unsere Leistungen",
      cta: "Alle Leistungen ansehen",
    },
    home: {
      aboutCaption: "Verladung ab unserem Kayseri-OSB-Lager möglich — Haus-zu-Haus-Lieferung nicht erforderlich.",
      specLabels: ["Frachtgarantie", "Transferprovision", "Transitzeit", "Antwortzeit"],
      specVals: ["Ab 3,5 %", "7–14 Tage", "≤ 24 Std."],
      aboutCta: "Über uns",
      ctaTitle: "Brauchen Sie ein Angebot für Ihre Sendung?",
      ctaSub: "Wir senden Ihnen ein detailliertes, verbindliches Angebot innerhalb von 24 Geschäftsstunden.",
      ctaBtn: "Angebot anfordern",
      ctaSecondary: "Über uns",
      faqTitle: "Häufig gestellte Fragen",
      faqSub: "Die häufigsten Fragen zu Logistik und Geldtransfers zwischen der Türkei und Russland.",
      infoPanelRows: [
        { label: "Komplettladung (FTL)", detail: "7–14 Tage Transit" },
        { label: "Teilladung (LTL)", detail: "Ab 325 USD/m³" },
        { label: "Geldtransfer", detail: "3,5 % Provision" },
        { label: "Zollberatung", detail: "EAC/GOST-R-Unterstützung" },
        { label: "EU-Import", detail: "Straße & See" },
      ],
      homeServices: [
        { title: "Komplettladung (FTL)", desc: "Vollbeladener LKW für große Volumina. Regelmäßige Abfahrten Kayseri–Moskau, transparente Preise, pünktliche Lieferung.", price: "Volumenbasierter Preis" },
        { title: "Teilladung (LTL)", desc: "Für kleinere Ladungen ab 325 USD/m³. CMR-Versicherung bis 500.000 €, Lieferung in 7–10 Tagen.", price: "Ab 325 USD/m³" },
        { title: "Geldtransfer", desc: "Kommerzielle Zahlungen mit 3,5 % Provision. Schnell, offiziell, ohne Compliance-Warteschlangen.", price: "3,5 % Provision" },
        { title: "Zollberatung", desc: "HS-Code-Klassifizierung, EAC/GOST-R-Zertifizierung, Zollanmeldung — null Verzögerungen an der Grenze.", price: "Auf Anfrage" },
        { title: "Import EU–Türkei", desc: "Komplette Importlogistik von EU-Lieferanten in die Türkei auf dem Land- oder Seeweg.", price: "Auf Anfrage" },
      ],
      legalLabel: "Rechtliche Erklärung",
      blogPosts: [
        { tag: "Fracht", date: "März 2026", title: "Frachtpreise Türkei–Russland 2025–2026: Vollständiger Leitfaden", excerpt: "LTL ab 325 USD/m³, FTL 4.500–6.500 USD — aktuelle Tarife, saisonale Schwankungen und Spartipps." },
        { tag: "Fracht", date: "Feb 2026", title: "Russland LTL vs. FTL: Was passt zu Ihrer Sendung?", excerpt: "Wann lohnt sich eine Teilladung und wann spart ein ganzer LKW Geld — ein Kostenvergleich." },
        { tag: "Zoll", date: "Feb 2026", title: "Zollabfertigung Russland-Export Schritt für Schritt: Leitfaden 2025", excerpt: "Türkische Ausfuhrzollabfertigung, russische Zölle und MwSt., EAC-Zertifizierung — der gesamte Prozess erklärt." },
        { tag: "Transit", date: "Jan 2026", title: "Routen Türkei–Russland: Georgien vs. Kaspisches Meer", excerpt: "Drei Routen von Kayseri nach Moskau — Kosten, Transitzeit und saisonale Risiken im Vergleich." },
        { tag: "Versicherung", date: "Jan 2026", title: "CMR-Frachtversicherung für Russland-Sendungen: Was Sie wissen müssen", excerpt: "500.000 € CMR-Deckung, Schadensverfahren und Haftung des Spediteurs — vollständig erklärt." },
        { tag: "Geldtransfer", date: "März 2025", title: "Geldtransfers Türkei–Russland: Rechtsrahmen und Provisionen", excerpt: "Wir transferieren Ihre kommerziellen Zahlungen mit 3,5 % Provision — schnell und sicher." },
      ],
      corridorsSectionTitle: "Unsere Servicekorridore",
      corridorsSectionSub: "Vom Hauptkorridor Türkei-Russland bis zum Transit Europa-Russland — 4 Korridore, ein Unternehmen.",
      corridors: [
        { route: "🇹🇷 → 🇷🇺", title: "Türkei nach Russland", desc: "FTL oder Teilladungen von Kayseri nach Moskau in 7–14 Tagen. Geldtransfer und Zoll in einem Paket.", tags: ["FTL-Fracht", "Teilladung LTL", "Geldtransfer", "Zoll"] },
        { route: "🇷🇺 → 🇹🇷", title: "Russland in die Türkei", desc: "Export und Retourenlogistik von Russland in die Türkei. Dokumentation, Zollabfertigung und Lieferung — alles aus einer Hand.", tags: ["Export", "Retourenlogistik", "Zoll", "Lieferung"] },
        { route: "🇪🇺 → 🇷🇺", title: "Europa nach Russland", desc: "Transitsendungen aus EU-Ländern nach Russland über die Türkei. UBAK-lizenziert, TIR-Carnet-Operationen.", tags: ["Transit", "TIR-Carnet", "UBAK", "Zoll"] },
        { route: "🇷🇺 → 🇪🇺", title: "Russland nach Europa", desc: "Transitfracht von Russland in europäische Länder über die Türkei. Multinationale Abwicklung, zentrale Koordination.", tags: ["Transit", "Multinational", "TIR-Carnet", "Koordination"] },
      ],
      moneyTransfer: {
        eyebrow: "Kommerzieller Geldtransfer",
        title: "Geldtransfers Europa–Russland",
        sub: "Wo Banken ins Stocken geraten, machen wir weiter. Kommerzielle Zahlungen über offizielle Kanäle mit 3,5 % Provision — Zustellung in 5 Werktagen.",
        cards: [
          { direction: "Europa nach Russland", from: "🇪🇺 Europa", to: "🇷🇺 Russland", commission: "3,5 % Provision", days: "5 Werktage", legal: "Türkisches Recht", desc: "Wir übermitteln Zahlungen von europäischen Partnern auf russische Konten — sicher, legal und termingerecht." },
          { direction: "Russland nach Europa", from: "🇷🇺 Russland", to: "🇪🇺 Europa", commission: "3,5 % Provision", days: "5 Werktage", legal: "Türkisches Recht", desc: "Schnelle, konforme Transfers von russischen Unternehmen auf europäische Konten — abgewickelt über die Türkei." },
        ],
        trust: "Alle Transaktionen gemäß türkischem Recht Nr. 5411 & 6493, außerhalb des Geltungsbereichs westlicher Sanktionen.",
        cta: "Angebot anfordern",
      },
    },
    servicesPage: {
      heroParagraph: "Alle Logistiklösungen, die Sie im Korridor Türkei–Russland und auf der Route Europa–Türkei benötigen — unter einem Dach.",
      routesLabel: "Servicerouten",
      routeTags: ["🇹🇷 Türkei → 🇷🇺 Russland", "🇷🇺 Russland → 🇹🇷 Türkei", "🇪🇺 Europa → 🇹🇷 Türkei", "Transitrouten"],
      costLabel: "Kosten",
      newBadge: "Neu",
      ctaTitle: "Suchen Sie eine maßgeschneiderte Logistiklösung?",
      ctaSub: "Teilen Sie uns Ihre Frachtdetails mit und wir melden uns innerhalb von 24 Stunden mit der besten Option.",
    },
    serviceCards: [
      { title: "Logistik-Betriebsmanagement", description: "Wir übernehmen Inspektion, Verpackung, Lagerung und Versand Ihrer Fracht. Qualitätskontrolle und korrekte Kennzeichnung sorgen für sichere Lieferung nach Russland.", price: "Auf Anfrage" },
      { title: "Geldtransfer Türkei–Russland", description: "Kommerzielle Zahlungen mit 3,5 % Provision — schnell, sicher und vollständig konform. Ohne Compliance-Warteschlangen.", price: "3,5 % Provision" },
      { title: "Teilladung (LTL)", description: "Für kleinere Ladungen ab 325 USD/m³. CMR-Versicherung bis 500.000 €. Kleine Fracht, volle Sicherheit.", price: "Ab 325 USD/m³" },
      { title: "Transitfracht", description: "Ein Vertrag, eine Zollabfertigung. Wir koordinieren die Routenführung über mehrere Länder für Sie.", price: "Auf Anfrage" },
      { title: "Containerversand (FCL)", description: "Wöchentliche feste Abfahrten, ein Siegel und eine Deklaration. Transparente Kosten, volle Konformität.", price: "Auf Anfrage" },
      { title: "Komplettladung (FTL)", description: "Vollbeladener LKW für große Volumina. Regelmäßige Russland-Abfahrten, transparente Preise, pünktliche Lieferung.", price: "Volumenbasierter Preis" },
      { title: "Zollberatung", description: "Russisches Zollrecht ist komplex — wir vereinfachen es für Sie. Korrekte Deklarationen, null Verzögerungen. EAC/GOST-R-Zertifizierungsunterstützung.", price: "Auf Anfrage" },
      { title: "Import- & Exportberatung", description: "Planen Sie einen Export nach Russland oder Import? Unser Team begleitet den Prozess von der Lieferantensuche bis zur Lieferung.", price: "Auf Anfrage" },
      { title: "Direkteinkauf für den Export", description: "Wir kaufen Waren in der Türkei und exportieren nach Russland unter unserem Unternehmen. Rechnungsstellung, Zollanmeldung und Zahlung — komplett von uns.", price: "Auf Anfrage" },
      { title: "Import EU–Türkei", description: "Komplette Importabwicklung von EU-Ländern in die Türkei. Straßen- oder Seetransport, Zollberatung und Lieferung nach Kayseri.", price: "Auf Anfrage" },
    ],
    aboutPage: {
      eyebrow: "Unternehmen",
      heroParagraph: "Sitz in Kayseri, über 10 Jahre aktiver Betrieb auf der Route Türkei–Russland. Fracht, Geldtransfers, Zollberatung und Handelsberatung — alles unter einem Dach.",
      statLabels: ["Jahre Erfahrung", "Sendungen", "Kunden", "Servicearten"],
      storyTitle: "Von Kayseri\nnach Moskau",
      storyP1: "ChapterLOG ist ein internationales Logistikunternehmen mit Sitz in Kayseri, das seit über einem Jahrzehnt auf der Route Türkei–Russland tätig ist. Was unter Bedir Uluslararası Nakliyat begann, wird heute als ChapterLOG LLC fortgeführt.",
      storyP2: "Unsere Gründer haben aus erster Hand erlebt, wie schnell der Handel zwischen der Türkei und Russland wächst, und erkannten den Mangel an einem wirklich zuverlässigen, transparenten Logistikpartner in diesem Korridor.",
      storyP3: "Heute sind wir in 10 Servicebereichen auf den Routen Türkei–Russland und Europa–Türkei tätig: von Frachttransport und Zollberatung bis zu Geldtransfers und umfassender Handelsberatung.",
      hqLabel: "Hauptsitz",
      missionTitle: "Mission",
      missionText: "Transparente, zuverlässige Logistiklösungen frei von bürokratischer Komplexität für Unternehmen, die auf den Routen Türkei–Russland und Europa–Türkei handeln.",
      visionTitle: "Vision",
      visionText: "Vorreiter eines technologiegetriebenen und menschenorientierten Logistik-Ökosystems, das den globalen Handel über die türkische Brücke erleichtert.",
      valuesTitle: "Werte",
      valuesText: "Transparenz und Integrität. Jedes Versprechen ist eine Verpflichtung. Keine Überraschungskosten. Probleme werden nicht versteckt — sie werden sofort gelöst.",
      whyTitle: "Warum ChapterLOG?",
      whySub: "Im russischen Logistikkorridor gibt es viele Akteure. Das unterscheidet uns:",
      whyItems: [
        { title: "Alles aus einer Hand", desc: "Fracht, Zoll, Versicherung, Lagerung und Geldtransfers — ein Vertrag." },
        { title: "Antwortgarantie", desc: "Wir antworten innerhalb von 24 Geschäftsstunden. Dringende Anfragen erhalten sofortige Unterstützung." },
        { title: "500.000 € CMR-Versicherung", desc: "Unsere Fahrzeuge sind mit hochlimitierter CMR-Versicherung ausgestattet. Ihre Fracht ist vollständig abgesichert." },
        { title: "Transparente Preise", desc: "Keine Überraschungskosten. Alle Gebühren werden im Voraus vereinbart und schriftlich bestätigt." },
        { title: "Volle Rechtskonformität", desc: "Die Türkei unterliegt nicht den Sanktionen der EU oder USA. Alle Operationen erfolgen nach türkischem Recht." },
      ],
      expBadgeLabel: "Jahre Erfahrung",
      hqLocation: "Melikgazi / Kayseri, Türkei",
      routesSectionTitle: "Unsere Servicerouten",
      routesSectionSub: "Umfassendes Servicenetz auf der Hauptroute Türkei–Russland und im Korridor Europa–Türkei.",
      routeCards: [
        { title: "Türkei nach Russland", desc: "Unsere Hauptroute. Fracht, Zoll und Geldtransfers von Kayseri nach Moskau, St. Petersburg und ganz Russland.", services: ["FTL-Fracht", "Teilladung LTL", "Container", "Geldtransfer", "Zollberatung"] },
        { title: "Europa in die Türkei", desc: "Importlogistik aus EU-Ländern in die Türkei. Straßen- oder Seetransport, Lieferung nach Kayseri.", services: ["Straßenfracht", "See FCL", "Zollberatung", "A.TR-Zertifikat"] },
        { title: "Transitrouten", desc: "Transitsendungen über Georgien, Aserbaidschan und Zentralasien. Ein Vertrag, zentrale Koordination.", services: ["TIR-Carnet", "UBAK-Genehmigungen", "Transitzoll", "Multinationale Verträge"] },
      ],
      legalTitle: "Rechtsrahmen",
      legalP1Bold: "Die Türkei unterliegt nicht den Sanktionsregimen der EU oder USA.",
      legalP1Rest: " Der Handel zwischen der Türkei und Russland ist nach türkischem Recht vollständig legal. ChapterLOG führt alle Operationen in voller Übereinstimmung mit dem Bankengesetz Nr. 5411, dem Zahlungsdienstegesetz Nr. 6493 und allen geltenden Vorschriften durch.",
      legalP2: "Unsere Geldtransferdienste werden über offizielle Finanzkanäle abgewickelt, und alle Transaktionen werden ordnungsgemäß dokumentiert. Verdächtige oder rechtswidrige Transaktionen werden strikt abgelehnt.",
      legalBadges: ["Bankengesetz 5411", "Zahlungsdienste 6493", "MASAK-Konformität", "CMR-Versicherung"],
      ctaTitle: "Bereit für eine Zusammenarbeit?",
      ctaSub: "Teilen Sie uns Ihre Frachtdetails mit und wir senden Ihnen ein maßgeschneidertes Angebot innerhalb von 24 Geschäftsstunden.",
      ctaQuote: "Angebot anfordern",
      ctaServices: "Leistungen",
    },
    about: {
      label: "Über uns",
      title: "Die vertrauenswürdige Brücke auf der Route Türkei–Russland",
      p1: "ChapterLOG mit Sitz in Kayseri bietet Speditionsdienstleistungen, Zollberatung und kommerzielle Geldtransfers im Korridor Türkei–Russland, gestützt auf über 10 Jahre praktische Erfahrung.",
      p2: "Die Türkei unterliegt nicht den Sanktionsregimen der EU oder USA. Der Handel zwischen der Türkei und Russland ist nach türkischem Recht vollständig legal. Alle unsere Operationen erfolgen in voller Übereinstimmung mit dem geltenden Recht.",
      cta: "Kontakt aufnehmen",
    },
    blog: {
      label: "Blog",
      title: "Brancheneinblicke",
      sub: "Expertenleitfäden zu Logistik, Zoll, Fracht und Geldtransfers zwischen der Türkei und Russland.",
      readMore: "Weiterlesen",
      allPosts: "Alle 9 Artikel ansehen",
    },
    testimonials: { label: "Referenzen", title: "Was unsere Kunden sagen" },
    contact: {
      label: "Kontakt",
      title: "Kontakt aufnehmen",
      sub: "Teilen Sie uns Ihre Frachtdetails mit und wir melden uns innerhalb von 24 Stunden.",
    },
    footer: {
      tagline: "Von der Türkei nach Russland — sicher.\nAn der Seite Ihrer Fracht bei jedem Schritt.",
      quickLinks: "Schnellzugriff",
      ourServices: "Unsere Leistungen",
      contactInfo: "Kontakt",
      copyright: "© 2025 ChapterLOG LLC. Alle Rechte vorbehalten.",
    },
    sanctions: {
      notice: "Die Türkei unterliegt nicht den Sanktionsregimen der EU oder USA. Der Handel zwischen der Türkei und Russland ist nach türkischem Recht vollständig legal, und alle unsere Operationen werden in voller Übereinstimmung mit dem geltenden nationalen und internationalen Recht durchgeführt.",
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "tr",
  setLang: () => {},
  t: translations.tr,
});

function getLangFromUrl(): Language {
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "en" || param === "ru" || param === "de") return param;
  return "tr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getLangFromUrl);

  useEffect(() => {
    const onPop = () => setLangState(getLangFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    const url = new URL(window.location.href);
    if (l === "tr") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", l);
    }
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
