import { Helmet } from "react-helmet-async";

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  url: string;
  wordCount?: number;
  articleSection?: string;
}

export function ArticleSchema({ headline, description, datePublished, dateModified, image, url, wordCount, articleSection }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": image,
    "url": url,
    "inLanguage": "tr",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
    ...(wordCount ? { "wordCount": wordCount } : {}),
    ...(articleSection ? { "articleSection": articleSection } : {}),
    "author": {
      "@type": "Organization",
      "name": "ChapterLOG LLC",
      "url": "https://chapterlog.com.tr",
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChapterLOG LLC",
      "url": "https://chapterlog.com.tr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chapterlog.com.tr/favicon.png",
        "width": 192,
        "height": 192,
      },
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://chapterlog.com.tr/#website",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://chapterlog.com.tr/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://chapterlog.com.tr/blog" },
      { "@type": "ListItem", "position": 3, "name": headline, "item": url },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  );
}

export function ArticleListSchema({ articles }: { articles: ArticleSchemaProps[] }) {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ChapterLOG Blog — Rusya Lojistik Rehberi",
    "description": "Türkiye-Rusya ve Avrupa-Rusya ticaret koridorunda nakliye, gümrük, para transferi hakkında güncel rehber yazılar.",
    "url": "https://chapterlog.com.tr/blog",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://chapterlog.com.tr/#website",
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": articles.map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": a.url,
        "name": a.headline,
      })),
    },
  };

  const articleSchemas = articles.map((a) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": a.headline,
    "description": a.description,
    "datePublished": a.datePublished,
    "dateModified": a.dateModified || a.datePublished,
    "image": a.image,
    "url": a.url,
    "inLanguage": "tr",
    "mainEntityOfPage": { "@type": "WebPage", "@id": a.url },
    ...(a.wordCount ? { "wordCount": a.wordCount } : {}),
    ...(a.articleSection ? { "articleSection": a.articleSection } : {}),
    "author": {
      "@type": "Organization",
      "name": "ChapterLOG LLC",
      "url": "https://chapterlog.com.tr",
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChapterLOG LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chapterlog.com.tr/favicon.png",
        "width": 192,
        "height": 192,
      },
    },
  }));

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      {articleSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
