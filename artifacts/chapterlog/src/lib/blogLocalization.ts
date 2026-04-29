import type { BlogPost } from "@/data/blogPosts";
import { blogLocales } from "@/data/blogLocales";
import type { Language } from "@/contexts/LanguageContext";

export interface LocalizedBlogCardFields {
  title: string;
  excerpt: string;
  tag: string;
}

/** Approximate reading line for blog cards (numeric part kept from source `readTime`). */
export function formatReadTime(readTime: string, lang: Language): string {
  const n = readTime.replace(/\D/g, "").trim();
  const num = n || "?";
  switch (lang) {
    case "tr":
      return readTime.includes("dk") ? readTime : `${num} dk`;
    case "en":
      return `${num} min read`;
    case "ru":
      return `${num} мин`;
    case "de":
      return `${num} Min.`;
    default:
      return readTime;
  }
}

/** Title, excerpt & category for blog cards; TR uses source data, other langs use `blogLocales` when present. */
export function getLocalizedBlogCard(post: BlogPost, lang: Language): LocalizedBlogCardFields {
  if (lang === "tr") {
    return { title: post.title, excerpt: post.excerpt, tag: post.tag };
  }
  const row = blogLocales[post.slug]?.[lang];
  if (row) {
    return { title: row.title, excerpt: row.excerpt, tag: row.tag };
  }
  return { title: post.title, excerpt: post.excerpt, tag: post.tag };
}
