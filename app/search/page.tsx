import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Search, Wrench } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { getPosts } from "@/lib/posts";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Search guides and tools",
  description: "Search SmartGuideDaily's practical guides, calculators, and browser-based utilities.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

type SearchPageProps = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? (params.q[0] ?? "") : (params.q ?? "");
  const query = rawQuery.trim().slice(0, 120);
  const normalized = query.toLocaleLowerCase();
  const allPosts = await getPosts();
  const matchingPosts = normalized ? allPosts.filter((post) =>
    `${post.title} ${post.excerpt} ${post.category} ${post.content} ${post.author}`.toLocaleLowerCase().includes(normalized)
  ) : [];
  const matchingTools = normalized ? tools.filter((tool) =>
    `${tool.name} ${tool.shortDescription} ${tool.description} ${tool.category} ${tool.keywords.join(" ")}`.toLocaleLowerCase().includes(normalized)
  ) : [];

  return (
    <>
      <section className="page-hero premium-search-hero">
        <div className="container">
          <div className="kicker"><Search size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} /> SEARCH SMARTGUIDEDAILY</div>
          <h1>Find your next useful answer.</h1>
          <p>Search the guides and utilities currently available in the SmartGuideDaily library.</p>
          <form className="global-search search-page-form" action="/search" role="search">
            <Search size={20} aria-hidden="true" />
            <input type="search" name="q" defaultValue={query} maxLength={120} placeholder="Try AI, resume, JSON, calculator..." aria-label="Search guides and tools" />
            <button type="submit">Search <ArrowRight size={16} /></button>
          </form>
        </div>
      </section>

      <section className="section premium-search-results-section">
        <div className="container">
          {!query ? (
            <div className="search-start-panel">
              <div className="kicker">Start exploring</div>
              <h2>What are you working on?</h2>
              <p className="section-subtitle">Search across guide titles, summaries, article text, and tool descriptions. Results reflect the content currently published on this website.</p>
              <div className="search-shortcuts">
                <Link href="/tools"><span><Wrench size={19} /></span><strong>Free online tools</strong><small>Calculators, text and productivity tools</small><ArrowUpRight size={16} /></Link>
                <Link href="/blog"><span><BookOpen size={19} /></span><strong>Practical guides</strong><small>Step-by-step explanations and checklists</small><ArrowUpRight size={16} /></Link>
              </div>
            </div>
          ) : (
            <>
              <div className="search-results-heading"><div><div className="kicker">Search results</div><h2>Results for “{query}”</h2><p className="section-subtitle">Found {matchingPosts.length + matchingTools.length} matching {matchingPosts.length + matchingTools.length === 1 ? "item" : "items"} across guides and tools.</p></div><Link href="/search" className="text-link">Clear search <ArrowRight size={15} /></Link></div>
              {matchingPosts.length > 0 && <div className="search-result-group"><div className="search-group-heading"><h3><BookOpen size={18} /> Guides</h3><span>{matchingPosts.length}</span></div><div className="article-grid">{matchingPosts.map((post) => <ArticleCard key={post.slug} post={post} />)}</div></div>}
              {matchingTools.length > 0 && <div className="search-result-group"><div className="search-group-heading"><h3><Wrench size={18} /> Tools</h3><span>{matchingTools.length}</span></div><div className="search-tool-results">{matchingTools.map((tool) => <Link href={`/tools/${tool.slug}`} key={tool.slug} className="search-tool-result"><span className="search-tool-result-icon"><Wrench size={19} /></span><span><small>{tool.category}</small><strong>{tool.name}</strong><span>{tool.shortDescription}</span></span><ArrowUpRight size={18} /></Link>)}</div></div>}
              {!matchingPosts.length && !matchingTools.length && <div className="empty-state search-empty-state"><h2>No matching results yet</h2><p>Try a shorter phrase or search for a topic such as “AI”, “text”, “career”, or “calculator”.</p><Link href="/tools" className="btn btn-primary">Browse all tools <ArrowRight size={15} /></Link></div>}
            </>
          )}
        </div>
      </section>
    </>
  );
}
