import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import { categories } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { getCategoryVisual } from "@/lib/visuals";
import EditorialImage from "@/components/EditorialImage";
import ArticleCard from "@/components/ArticleCard";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const visual = getCategoryVisual(decoded);
  return {
    title: decoded,
    description: `Practical SmartGuideDaily articles about ${decoded.toLowerCase()}.`,
    alternates: { canonical: `/category/${encodeURIComponent(decoded)}` },
    openGraph: { type: "website", title: `${decoded} guides`, description: `Explore practical guides about ${decoded.toLowerCase()}.`, images: [{ url: visual.src, alt: visual.alt }] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  if (!categories.includes(decoded) || decoded === "All") notFound();
  const posts = (await getPosts()).filter((post) => post.category === decoded);
  const visual = getCategoryVisual(decoded);

  return (
    <>
      <section className="editorial-category-hero">
        <div className="container editorial-category-hero-grid">
          <div className="editorial-category-hero-copy">
            <div className="kicker"><Link href="/blog">The library</Link> / Topic</div>
            <h1>{decoded}</h1>
            <p>Clear, practical guides to help you learn, make decisions, and solve everyday problems—without adding unnecessary complexity.</p>
            <div className="editorial-category-hero-meta"><BookOpen size={16} /> {posts.length} published {posts.length === 1 ? "guide" : "guides"}</div>
          </div>
          <div className="editorial-category-hero-image"><EditorialImage visual={visual} priority sizes="(max-width: 760px) 100vw, 48vw" /><span /></div>
        </div>
      </section>
      <section className="section editorial-category-results">
        <div className="container">
          <div className="section-top editorial-section-top">
            <div><div className="kicker">Explore the topic</div><h2>Guides to get you started.</h2><p className="section-subtitle">Browse the published articles in this category.</p></div>
            <Link href="/blog" className="text-link section-action">All guides <ArrowRight size={16} /></Link>
          </div>
          {posts.length ? <div className="article-grid">{posts.map((post) => <ArticleCard key={post.slug} post={post} />)}</div> : <div className="empty-state"><h2>New articles are coming soon.</h2><p>There are no published guides in this category yet. Browse the full library or explore a practical tool.</p><div className="editorial-empty-actions"><Link href="/blog" className="btn btn-outline">Browse all guides</Link><Link href="/tools" className="btn btn-primary">Explore tools</Link></div></div>}
        </div>
      </section>
    </>
  );
}
