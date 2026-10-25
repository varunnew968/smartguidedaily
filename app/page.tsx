import Link from "next/link";
import { ArrowRight, BookOpenCheck, Compass, Lightbulb, SearchCheck } from "lucide-react";
import { getPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { categories } from "@/lib/content";
import FeaturedTools from "@/components/FeaturedTools";

export default async function HomePage() {
  const posts = (await getPosts()).slice(0, 6);
  return <>
    <section className="hero"><div className="container">
      <span className="eyebrow"><Lightbulb size={14}/> Practical knowledge, made simple</span>
      <h1>Small answers.<br/><span style={{color:"#3157d5"}}>Smarter everyday.</span></h1>
      <p>Clear, practical guides to help you learn new skills, make confident decisions, and solve everyday problems — one useful article at a time.</p>
      <div className="hero-actions"><Link className="btn btn-primary" href="/blog">Explore the latest guides <ArrowRight size={17}/></Link><Link className="btn btn-outline" href="/about">Our approach</Link></div>
      <div className="hero-proof"><span>Practical, reader-first guides</span><span>Clear steps, less jargon</span><span>New topics regularly</span></div>
    </div></section>
    <section className="section"><div className="container">
      <div className="section-top"><div><div className="kicker">Handpicked for you</div><h2>Useful reads to get started</h2><p className="section-subtitle">Straightforward guides you can put to use today.</p></div><Link href="/blog" className="text-link" style={{fontWeight:750,fontSize:14}}>All articles →</Link></div>
      <div className="category-row">{categories.map(c=><Link key={c} className="category-pill" href={c==="All"?"/blog":`/category/${encodeURIComponent(c)}`}>{c}</Link>)}</div>
      <div className="article-grid">{posts.map(post=><ArticleCard key={post.slug} post={post}/>)}</div>
      <div style={{marginTop:30}}><AdSlot/></div>
    </div></section>
    <section className="section"><div className="container">
      <div className="section-top"><div><div className="kicker">Free online utilities</div><h2>Get things done with simple tools</h2><p className="section-subtitle">Quick calculations and useful browser-based tools, with no account required.</p></div><Link href="/tools" className="text-link" style={{fontWeight:750,fontSize:14}}>Explore all tools →</Link></div>
      <FeaturedTools/>
    </div></section>
    <section className="section section-muted"><div className="container"><div className="kicker">What you'll find here</div><h2>Useful, not overwhelming.</h2><p className="section-subtitle">We focus on clear explanations and actionable steps — not empty promises or complicated jargon.</p>
      <div className="feature-strip">
        <div className="feature"><div className="feature-icon"><BookOpenCheck size={25}/></div><h3>Learn something useful</h3><p>Technology, study skills, careers, and practical digital know-how explained in plain language.</p></div>
        <div className="feature"><div className="feature-icon"><SearchCheck size={25}/></div><h3>Make informed choices</h3><p>Checklists and step-by-step guides that help you compare options and avoid common mistakes.</p></div>
        <div className="feature"><div className="feature-icon"><Compass size={25}/></div><h3>Take the next step</h3><p>Every guide aims to leave you with a clear action you can try, verify, or improve.</p></div>
      </div>
    </div></section>
    <section className="section"><div className="container"><div className="newsletter"><div><div className="kicker" style={{color:"#b7c5ff"}}>Keep exploring</div><h2 style={{marginBottom:8}}>Your next useful idea is one click away.</h2><p>Browse practical guides across technology, careers, business, and everyday how-to topics. We add and improve articles as we learn what readers need.</p></div><div className="hero-actions"><Link href="/blog" className="btn" style={{background:"#fff",color:"#15264a",whiteSpace:"nowrap"}}>Browse guides <ArrowRight size={16}/></Link><Link href="/tools" className="btn btn-outline" style={{whiteSpace:"nowrap"}}>Use free tools</Link></div></div></div></section>
  </>;
}
