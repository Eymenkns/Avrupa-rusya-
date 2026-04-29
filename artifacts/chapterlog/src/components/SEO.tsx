import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";

const SITE_URL = "https://chapterlog.com.tr";
const OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

const LANG_META: Record<string, { htmlLang: string; ogLocale: string }> = {
  tr: { htmlLang: "tr", ogLocale: "tr_TR" },
  en: { htmlLang: "en", ogLocale: "en_US" },
  ru: { htmlLang: "ru", ogLocale: "ru_RU" },
  de: { htmlLang: "de", ogLocale: "de_DE" },
};

/** Open Graph locales for this site — emit alternates so aggregators see every language. */
const OG_LOCALES = ["tr_TR", "en_US", "ru_RU", "de_DE"] as const;

export interface SEOProps {
  titleTr: string;
  titleEn: string;
  titleRu: string;
  titleDe?: string;
  descTr: string;
  descEn: string;
  descRu: string;
  descDe?: string;
  path: string;
  keywordsTr?: string;
  keywordsEn?: string;
  keywordsRu?: string;
  keywordsDe?: string;
  ogType?: string;
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export function SEO({
  titleTr, titleEn, titleRu, titleDe,
  descTr, descEn, descRu, descDe,
  path,
  keywordsTr, keywordsEn, keywordsRu, keywordsDe,
  ogType = "website",
  ogImage,
  publishedTime,
  modifiedTime,
  noindex = false,
}: SEOProps) {
  const { lang } = useLang();

  const titles: Record<string, string> = { tr: titleTr, en: titleEn, ru: titleRu, de: titleDe || titleEn };
  const descs: Record<string, string> = { tr: descTr, en: descEn, ru: descRu, de: descDe || descEn };
  const keywords: Record<string, string | undefined> = { tr: keywordsTr, en: keywordsEn, ru: keywordsRu, de: keywordsDe || keywordsEn };

  const title = titles[lang] ?? titleTr;
  const desc = descs[lang] ?? descTr;
  const keyword = keywords[lang];
  const { htmlLang, ogLocale } = LANG_META[lang] ?? LANG_META.tr;

  const canonical = `${SITE_URL}${path}`;
  const trURL = `${SITE_URL}${path}?lang=tr`;
  const enURL = `${SITE_URL}${path}?lang=en`;
  const ruURL = `${SITE_URL}${path}?lang=ru`;
  const deURL = `${SITE_URL}${path}?lang=de`;

  const image = ogImage || OG_IMAGE;

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="author" content="ChapterLOG LLC" />
      {keyword && <meta name="keywords" content={keyword} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />
      {OG_LOCALES.filter((loc) => loc !== ogLocale).map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="ChapterLOG — Türkiye-Rusya Lojistik" />
      <meta property="og:site_name" content="ChapterLOG" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="tr" href={trURL} />
      <link rel="alternate" hrefLang="en" href={enURL} />
      <link rel="alternate" hrefLang="ru" href={ruURL} />
      <link rel="alternate" hrefLang="de" href={deURL} />
      <link rel="alternate" hrefLang="x-default" href={trURL} />
    </Helmet>
  );
}
