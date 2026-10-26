import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { getTool, tools } from "@/lib/tools";
import ToolRunner from "@/components/ToolRunner";
import AdSlot from "@/components/AdSlot";
import EditorialImage from "@/components/EditorialImage";
import { getToolVisual } from "@/lib/visuals";

export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Tool not found" };
  const visual = getToolVisual(tool.category);
  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: { type: "website", title: `${tool.name} | SmartGuideDaily`, description: tool.description, images: [{ url: visual.src, alt: visual.alt }] },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const related = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 3);
  const visual = getToolVisual(tool.category);
  const schema = { "@context": "https://schema.org", "@type": "WebApplication", name: tool.name, description: tool.description, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }, url: `${(process.env.NEXT_PUBLIC_SITE_URL || "https://smartguideddaily.vercel.app").replace(/\/$/, "")}/tools/${tool.slug}` };

  return <>
    <section className="page-hero tool-detail-hero"><div className="container editorial-tool-detail-hero-grid">
      <div className="editorial-tool-detail-copy"><Link href="/tools" className="back-link"><ArrowLeft size={15}/> All tools</Link>
      <div className="kicker">{tool.category}</div>
      <h1>{tool.name}</h1>
      <p>{tool.description}</p>
      <div className="tool-trust-row"><span><ShieldCheck size={15}/> Free to use</span><span><BookOpen size={15}/> Clear instructions</span></div></div>
      <div className="editorial-tool-detail-image"><EditorialImage visual={visual} priority sizes="(max-width: 760px) 100vw, 44vw"/><span/></div>
    </div></section>
    <section className="section"><div className="container tool-workspace-grid">
      <div><ToolRunner slug={tool.slug}/><div className="tool-privacy-note"><ShieldCheck size={18}/><p><strong>Privacy note</strong><br/>This tool runs in your browser. Inputs are not sent to SmartGuideDaily by the tool. The to-do list is saved only in this browser’s local storage.</p></div></div>
      <aside className="tool-detail-sidebar"><span className="article-category">How it works</span><h2>Simple, transparent results</h2><p className="small-muted">Enter the values requested, then review the result. Check the assumptions and confirm important calculations before making financial, health, or business decisions.</p><AdSlot label="Advertisement" placement="sidebar"/><div className="sidebar-link-block"><strong>More tools in {tool.category}</strong>{related.length ? related.map((item) => <Link key={item.slug} href={`/tools/${item.slug}`}>{item.name} <span>→</span></Link>) : <Link href="/tools">Browse all tools →</Link>}</div><div className="sidebar-link-block"><strong>Helpful guides</strong><Link href="/blog">Explore the blog <span>→</span></Link><Link href="/contact">Report an issue <span>→</span></Link></div></aside>
    </div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}/>
  </>;
}
