import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
export const metadata: Metadata = { title: "All Articles", description: "Browse practical guides on technology, AI, careers, business, and everyday how-to questions.", alternates: { canonical: "/blog" } };
export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const posts = await getPosts();
  const filtered = posts.filter(p => `${p.title} ${p.excerpt} ${p.category} ${p.content} ${p.author}`.toLowerCase().includes(q.trim().toLowerCase()));
  return <><section className="page-hero"><div className="container"><div className="kicker">The SmartGuideDaily library</div><h1>Practical guides for real life.</h1><p>Explore clear, useful articles on technology, education, careers, business, and everyday tasks.</p>
    <form className="search-box" action="/blog"><input className="input" type="search" name="q" defaultValue={q} placeholder="Search articles..." aria-label="Search articles"/><button className="btn btn-primary">Search</button></form>
  </div></section><section className="section"><div className="container">{q && <p className="section-subtitle" style={{marginBottom:20}} aria-live="polite">Showing {filtered.length} result{filtered.length === 1 ? "" : "s"} for “{q}”</p>}
    {filtered.length ? <div className="article-grid">{filtered.map(post=><ArticleCard key={post.slug} post={post}/>)}</div> : <div className="empty-state"><h2>No matching articles yet</h2><p>Try a different search phrase.</p></div>}
    <div style={{marginTop:30}}><AdSlot/></div>
  </div></section></>;
}
