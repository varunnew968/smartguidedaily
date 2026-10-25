export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  published_at: string;
  updated_at?: string;
  read_minutes: number;
  cover_label: string;
  content: string;
  status: "draft" | "published";
  seo_title?: string;
  seo_description?: string;
  affiliate_disclosure?: boolean;
};
