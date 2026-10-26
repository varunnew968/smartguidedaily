import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import EditorialImage from "@/components/EditorialImage";
import { getPostVisual } from "@/lib/visuals";

export async function generateStaticParams() {
  return (await getPosts()).map(post => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  const visual = getPostVisual(post);
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.published_at, authors: [post.author], images: [{ url: visual.src, alt: visual.alt }] }
  };
}
function renderContent(content: string) {
  return content.split(/\n{2,}/).map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("### ")) return <h3 key={i}>{trimmed.slice(4)}</h3>;
    if (trimmed.startsWith("## ")) return <h2 key={i}>{trimmed.slice(3)}</h2>;
    if (trimmed.startsWith("- ") || /^\d+\.\s/.test(trimmed)) {
      const lines = trimmed.split("\n");
      const ordered = /^\d+\.\s/.test(lines[0]);
      return ordered ? <ol key={i}>{lines.map((line,j)=><li key={j}>{line.replace(/^\d+\.\s/,"").replace(/\*\*(.*?)\*\*/g,"$1")}</li>)}</ol> : <ul key={i}>{lines.map((line,j)=><li key={j}>{line.replace(/^-\s/,"").replace(/\*\*(.*?)\*\*/g,"$1")}</li>)}</ul>;
    }
    return <p key={i}>{trimmed.replace(/\*\*(.*?)\*\*/g,"$1")}</p>;
  });
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = (await getPosts()).filter(p=>p.slug!==post.slug && p.category===post.category).slice(0,3);
  const visual = getPostVisual(post);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://smartguidedaily.example").replace(/\/$/,"");
  const schema = { "@context":"https://schema.org", "@type":"BlogPosting", headline:post.title, description:post.excerpt, datePublished:post.published_at, dateModified:post.updated_at || post.published_at, author:{"@type":"Organization",name:post.author}, publisher:{"@type":"Organization",name:"SmartGuideDaily"}, mainEntityOfPage:`${siteUrl}/blog/${post.slug}` };
  return <><div className="page-hero"><div className="container"><div className="kicker"><Link href={`/category/${encodeURIComponent(post.category)}`}>{post.category}</Link></div><h1 style={{maxWidth:850}}>{post.title}</h1><p>{post.excerpt}</p><div style={{fontSize:13,color:"#7a879c",marginTop:18}}>{post.author} · {new Date(post.published_at).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})} · {post.read_minutes} min read</div></div></div>
  <section className="editorial-article-cover-section"><div className="container"><div className="editorial-article-cover"><EditorialImage visual={visual} priority sizes="(max-width: 760px) 100vw, 900px"/><span /></div></div></section>
  <section className="section"><div className="container article-layout"><article><AdSlot label="Advertisement"/><div className="article-content" style={{marginTop:28}}>{renderContent(post.content)}</div>
    {post.affiliate_disclosure && <p className="small-muted">Disclosure: this article may contain affiliate links. If you purchase through one, we may earn a commission at no extra cost to you.</p>}
    <div style={{marginTop:30}}><AdSlot/></div>
    <div style={{borderTop:"1px solid #e7ebf2",paddingTop:22,marginTop:28}}><span className="article-category">Keep learning</span><h2 style={{fontSize:24}}>More practical guides</h2>{related.length>0?<div className="article-grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))"}}>{related.map(p=><ArticleCard key={p.slug} post={p}/>)}</div>:<Link className="btn btn-outline" href="/blog">Browse all articles</Link>}</div>
  </article><aside className="article-sidebar"><h3>In this guide</h3><p className="small-muted">Read at your own pace and use the checklist or examples that fit your situation.</p><hr style={{border:0,borderTop:"1px solid #e7ebf2",margin:"18px 0"}}/><Link className="text-link" href="/blog" style={{fontWeight:750}}>← All articles</Link><div style={{marginTop:20}}><AdSlot/></div><p className="small-muted" style={{marginTop:18}}>Our aim is to make practical information clear. Verify important details with official sources when requirements may change.</p></aside></div></section>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
  </>;
}
