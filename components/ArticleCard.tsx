import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/types";
import { getPostVisual } from "@/lib/visuals";
import EditorialImage from "@/components/EditorialImage";

export default function ArticleCard({ post }: { post: Post }) {
  const date = new Date(post.published_at);
  const dateLabel = Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const visual = getPostVisual(post);

  return (
    <article className="article-card editorial-article-card">
      <Link href={`/blog/${post.slug}`} className="article-cover" aria-label={`Read ${post.title}`}>
        <EditorialImage visual={visual} sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw" />
        <span className="article-cover-shade" aria-hidden="true" />
        <span className="article-cover-category">{post.category}</span>
        <span className="cover-open"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="article-body">
        <span className="article-category">{post.category}</span>
        <Link href={`/blog/${post.slug}`}><h3 className="article-title">{post.title}</h3></Link>
        <p className="article-excerpt">{post.excerpt}</p>
        <div className="article-meta"><span>{post.read_minutes} min read</span><span>{dateLabel}</span></div>
      </div>
    </article>
  );
}
