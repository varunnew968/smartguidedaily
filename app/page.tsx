import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Compass, FileText,
  LockKeyhole, Search, ShieldCheck, Sparkles, Wrench, Zap
} from "lucide-react";
import { getPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import FeaturedTools from "@/components/FeaturedTools";
import { tools, toolCategories } from "@/lib/tools";

export default async function HomePage() {
  const posts = (await getPosts()).slice(0, 3);
  const toolCount = tools.length;
  return <>
    <section className="enterprise-hero">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="container enterprise-hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> PRACTICAL KNOWLEDGE. USEFUL TOOLS.</div>
          <h1>Make your next step<br /><span>the smarter one.</span></h1>
          <p className="hero-lead">Reliable how-to guides and straightforward online tools that help you solve everyday tasks with more clarity and less friction.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/tools">Explore free tools <ArrowRight size={17}/></Link>
            <Link className="btn btn-outline" href="/blog">Read practical guides <ArrowUpRight size={16}/></Link>
          </div>
          <div className="hero-assurance">
            <span><CheckCircle2 size={16}/> Clear, step-by-step guidance</span>
            <span><LockKeyhole size={16}/> Browser-based tools where noted</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="A simple workflow from question to useful answer">
          <div className="hero-visual-top"><span className="status-dot" /> YOUR EVERYDAY KNOWLEDGE DESK <span className="hero-visual-label">SGD / WORKSPACE</span></div>
          <div className="visual-question"><div className="visual-icon"><Search size={20}/></div><div><span className="visual-overline">START WITH A QUESTION</span><strong>What are you trying to solve?</strong></div></div>
          <div className="visual-connector"><span /></div>
          <div className="visual-options">
            <Link href="/tools" className="visual-option"><span className="visual-option-icon blue"><Wrench size={19}/></span><span><strong>Use a tool</strong><small>Calculate, convert, create</small></span><ArrowUpRight size={17}/></Link>
            <Link href="/blog" className="visual-option"><span className="visual-option-icon light"><BookOpen size={19}/></span><span><strong>Follow a guide</strong><small>Learn the steps and why</small></span><ArrowUpRight size={17}/></Link>
          </div>
          <div className="visual-foot"><ShieldCheck size={15}/> Practical information, designed around your task.</div>
        </div>
      </div>
      <div className="container hero-metrics">
        <div><strong>{toolCount}</strong><span>Free online tools</span></div>
        <div><strong>4</strong><span>Simple ways to explore</span></div>
        <div><strong>Always</strong><span>Clear instructions first</span></div>
        <div className="metrics-note">Built to make useful information easier to act on.</div>
      </div>
    </section>

    <section className="section section-tools-home">
      <div className="container">
        <div className="section-top"><div><div className="kicker">A good place to start</div><h2>Tools for everyday tasks</h2><p className="section-subtitle">Get a result quickly, with clear inputs and explanations when you need them.</p></div><Link href="/tools" className="text-link section-action">Browse all tools <ArrowRight size={16}/></Link></div>
        <FeaturedTools/>
        <div className="home-inline-note"><Zap size={17}/><span>Choose a tool, enter your details, and review the result before you use it.</span><Link href="/tools">How tools work <ArrowRight size={14}/></Link></div>
      </div>
    </section>

    <section className="section section-workflow">
      <div className="container">
        <div className="workflow-heading"><div className="kicker">A clear path forward</div><h2>From question to next step.</h2><p className="section-subtitle">We organize information around what you came to do—not around jargon or clutter.</p></div>
        <div className="workflow-grid">
          <div className="workflow-card"><span className="workflow-number">01</span><div className="workflow-icon"><Search size={21}/></div><h3>Find what you need</h3><p>Browse focused categories or search for a specific tool, topic, or question.</p><Link href="/tools">Explore categories <ArrowRight size={14}/></Link></div>
          <div className="workflow-card"><span className="workflow-number">02</span><div className="workflow-icon"><FileText size={21}/></div><h3>Understand the process</h3><p>Use plain-language instructions, examples, and practical context to guide your decisions.</p><Link href="/blog">Read the guides <ArrowRight size={14}/></Link></div>
          <div className="workflow-card"><span className="workflow-number">03</span><div className="workflow-icon"><CheckCircle2 size={21}/></div><h3>Act with confidence</h3><p>Review your result, check important assumptions, and choose the next useful action.</p><Link href="/about">Our approach <ArrowRight size={14}/></Link></div>
        </div>
      </div>
    </section>

    <section className="section section-muted">
      <div className="container">
        <div className="section-top"><div><div className="kicker">The knowledge library</div><h2>Guides made for real questions.</h2><p className="section-subtitle">Explore practical explanations across technology, AI, education, careers, business, and everyday tasks.</p></div><Link href="/blog" className="text-link section-action">View all articles <ArrowRight size={16}/></Link></div>
        {posts.length ? <div className="article-grid home-article-grid">{posts.map(post=><ArticleCard key={post.slug} post={post}/>)}</div> : <div className="empty-state"><h3>New guides are on the way</h3><p>Explore our tools while the library grows.</p><Link href="/tools" className="btn btn-outline">Explore tools</Link></div>}
        <div className="home-article-footer"><span><BookOpen size={17}/> Clear explanations, practical examples, and useful next steps.</span><Link href="/blog" className="text-link">Explore the library <ArrowRight size={15}/></Link></div>
        <div style={{marginTop:32}}><AdSlot/></div>
      </div>
    </section>

    <section className="section">
      <div className="container trust-panel">
        <div className="trust-copy"><div className="kicker">Designed around usefulness</div><h2>Good information should feel clear.</h2><p>SmartGuideDaily brings tools and practical guides together in one place. We aim to explain what a tool does, how to use it, and where its limits matter.</p><Link href="/editorial-policy" className="btn btn-primary">How we approach content <ArrowRight size={16}/></Link></div>
        <div className="trust-points">
          <div><span><CheckCircle2 size={18}/></span><section><strong>Instructions before complexity</strong><p>Each experience should help you understand what to do next.</p></section></div>
          <div><span><ShieldCheck size={18}/></span><section><strong>Transparent limitations</strong><p>Calculations are estimates where appropriate, not professional advice.</p></section></div>
          <div><span><Sparkles size={18}/></span><section><strong>Useful over exaggerated</strong><p>We focus on practical help rather than unsupported promises.</p></section></div>
        </div>
      </div>
    </section>

    <section className="section home-bottom-cta">
      <div className="container">
        <div className="bottom-cta-inner"><div><div className="kicker">Ready when you are</div><h2>Start with the task in front of you.</h2><p>Find a useful tool or follow a guide at your own pace.</p></div><div className="hero-actions"><Link href="/tools" className="btn btn-white">Explore free tools <ArrowRight size={16}/></Link><Link href="/blog" className="btn btn-ghost-white">Browse guides</Link></div></div>
      </div>
    </section>
  </>;
}
