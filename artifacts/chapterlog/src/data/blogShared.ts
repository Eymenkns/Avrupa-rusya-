/** Shared blog types and image paths (no imports from blogPosts* to avoid circular deps). */

export const IMGS = {
  logistics: "/images/logistics-operations.png",
  money: "/images/money-transfer.png",
  partial: "/images/partial-cargo-truck.png",
  blog1: "/images/logistics-operations.png",
  blog2: "/images/customs-documents.png",
  blog3: "/images/container-shipping.png",
  blog4: "/images/europe-turkey-trade.png",
  truck: "/images/tir-truck-transport.png",
  warehouse: "/images/warehouse-interior.png",
};

export interface BlogPostBody {
  subtitle: string;
  img: string;
  text: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  tag: string;
  tagColor: string;
  date: string;
  isoDate: string;
  readTime: string;
  image: string;
  title: string;
  excerpt: string;
  highlights: string[];
  body: BlogPostBody[];
  tags?: string[];
}
