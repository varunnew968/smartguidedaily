import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://smartguidedaily.example").replace(/\/$/, "");
  const staticPages = ["", "/blog", "/about", "/contact", "/privacy", "/disclaimer"].map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.6 }));
  const posts = await getPosts();
  return [...staticPages, ...posts.map(post => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(post.updated_at || post.published_at), changeFrequency: "monthly" as const, priority: 0.7 }))];
}
