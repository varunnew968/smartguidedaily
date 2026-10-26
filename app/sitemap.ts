import type { MetadataRoute } from "next";
import { categories } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { tools } from "@/lib/tools";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://smartguideddaily.vercel.app").replace(/\/$/, "");
  const staticPages = ["", "/blog", "/tools", "/about", "/contact", "/privacy", "/terms", "/editorial-policy", "/disclaimer"].map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : path === "/tools" || path === "/blog" ? 0.9 : 0.5 }));
  const categoryPages = categories.filter((category) => category !== "All").map((category) => ({ url: `${base}/category/${encodeURIComponent(category)}`, changeFrequency: "weekly" as const, priority: 0.6 }));
  const posts = await getPosts();
  const postPages = posts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(post.updated_at || post.published_at), changeFrequency: "monthly" as const, priority: 0.7 }));
  const toolPages = tools.map((tool) => ({ url: `${base}/tools/${tool.slug}`, changeFrequency: "monthly" as const, priority: 0.75 }));
  return [...staticPages, ...categoryPages, ...toolPages, ...postPages];
}
