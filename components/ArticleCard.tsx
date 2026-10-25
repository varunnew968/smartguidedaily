import Link from "next/link";
import type { Post } from "@/lib/types";
import { ArrowUpRight, BookOpen, BriefcaseBusiness, Cpu, GraduationCap, ShieldCheck } from "lucide-react";

function iconFor(category: string) {
  if (category.includes("Technology")) return <Cpu size={23}/>;
  if (category.includes("Education")) return <GraduationCap size={23}/>;
  if (category.includes("Money")) return <BriefcaseBusiness size={23}/>;
  if (category.includes("Safety")) return <ShieldCheck size={23}/>;
  return <BookOpen size={23}/>;
}
export default function ArticleCard({ post }: { post: Post }) {
  const date = new Date(post.published_at);
  const dateLabel = Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
  return <article className="article-card">
    <Link href={`/blog/${post.slug}`} className="article-cover" aria-label={`Read ${post.title}`}><span className="cover-icon">{iconFor(post.category)}</span><span className="cover-open"><ArrowUpRight size={17}/></span></Link>
    <div className="article-body"><span className="article-category">{post.category}</span><Link href={`/blog/${post.slug}`}><h3 className="article-title">{post.title}</h3></Link><p className="article-excerpt">{post.excerpt}</p><div className="article-meta"><span>{post.read_minutes} min read</span><span>{dateLabel}</span></div></div>
  </article>;
}
