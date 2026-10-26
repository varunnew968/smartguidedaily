import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { getPosts } from "@/lib/posts";
import { categories } from "@/lib/content";
import { getCategoryVisual } from "@/lib/visuals";
import EditorialImage from "@/components/EditorialImage";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse practical guides on technology, AI, careers, business, and everyday how-to questions.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const posts = await getPosts();
  const filtered = posts.filter((post) => `${post.title} ${post.excerpt} ${post.category} ${post.content} ${post.author}`.toLowerCase().includes(q.trim().toLowerCase()));
  const topicCards = categories.filter((category) => category !== "All").map((name) => ({
    name,
    count: posts.filter((post) => post.category === name).length,
    visual: getCategoryVisual(name),
  })).filter((category) => category.count > 0);

  return (
    <>
      <section className="editorial-library-hero">
        <div className="container editorial-library-hero-inner">
          <div><div className="kicker">The SmartGuideDaily library</div><h1>Ideas, explained clearly.</h1><p>Explore useful guides on technology, careers, money, and everyday digital tasks—with imagery that helps you find the right place to start.</p></div>
          <form className="global-search editorial-library-search" action="/blog" role="search"><Search size={19} aria-hidden="true"/><input className="editorial-library-input" type="search" name="q" defaultValue={q} placeholder="Search the guide library..." aria-label="Search articles"/><button type="submit">Search <ArrowRight size={16}/></button></form>
        </div>
      </section>
      {!q && topicCards.length > 0 && <section className="editorial-library-topics"><div className="container"><div className="editorial-library-topic-grid">{topicCards.map((topic) => <Link href={`/category/${encodeURIComponent(topic.name)}`} className="editorial-library-topic" key={topic.name}><span className="editorial-library-topic-image"><EditorialImage visual={topic.visual} sizes="110px"/><span/></span><span className="editorial-library-topic-copy"><strong>{topic.name}</strong><small>{topic.count} {topic.count === 1 ? "guide" : "guides"}</small></span><ArrowUpRight size={16}/></Link>)}</div></div></section>}
      <section className="section editorial-library-results"><div className="container">
        <div className="section-top editorial-section-top"><div><div className="kicker">{q ? "Search results" : "Browse all"}</div><h2>{q ? `Results for “${q}”` : "The latest guides"}</h2><p className="section-subtitle">{q ? `Showing ${filtered.length} matching ${filtered.length === 1 ? "guide" : "guides"}.` : "Practical explainers, checklists, and step-by-step articles from the library."}</p></div>{q && <Link href="/blog" className="text-link section-action">Clear search <ArrowRight size={16}/></Link>}</div>
        {filtered.length ? <div className="article-grid">{filtered.map((post) => <ArticleCard key={post.slug} post={post}/>)}</div> : <div className="empty-state"><h2>No matching articles yet</h2><p>Try a different search phrase, or browse all published guides.</p><Link href="/blog" className="btn btn-outline">View all guides</Link></div>}
        <div style={{ marginTop: 30 }}><AdSlot /></div>
      </div></section>
    </>
  );
}
