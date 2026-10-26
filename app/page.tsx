import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Compass,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { getPosts } from "@/lib/posts";
import { categories } from "@/lib/content";
import { getCategoryVisual, getPostVisual } from "@/lib/visuals";
import ArticleCard from "@/components/ArticleCard";
import EditorialImage from "@/components/EditorialImage";
import AdSlot from "@/components/AdSlot";
import FeaturedTools from "@/components/FeaturedTools";
import { tools } from "@/lib/tools";

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function HomePage() {
  const allPosts = await getPosts();
  const feature = allPosts[0];
  const posts = allPosts.slice(0, 6);
  const latest = allPosts.slice(1, 3);
  const moreToExplore = allPosts.slice(3, 6);
  const topics = categories
    .filter((category) => category !== "All")
    .map((name) => ({
      name,
      count: allPosts.filter((post) => post.category === name).length,
      visual: getCategoryVisual(name),
    }))
    .filter((category) => category.count > 0);

  return (
    <>
      <section className="editorial-home">
        <div className="container editorial-home-inner">
          <div className="editorial-masthead">
            <div className="editorial-masthead-copy">
              <div className="editorial-eyebrow"><span /> SMARTGUIDEDAILY / THE DAILY EDIT</div>
              <h1>Useful ideas for a <em>faster-moving world.</em></h1>
              <p>Thoughtful guides, practical digital tools, and clear explanations—curated to help you learn, solve, and decide.</p>
            </div>
            <form className="global-search editorial-search" action="/search" role="search">
              <Search size={19} aria-hidden="true" />
              <input type="search" name="q" maxLength={120} placeholder="Search guides, tools, topics..." aria-label="Search guides, tools, and topics" />
              <button type="submit">Search <ArrowRight size={16} /></button>
            </form>
          </div>

          <nav className="editorial-topic-nav" aria-label="Explore SmartGuideDaily">
            <Link href="/">Discover</Link>
            <Link href="/blog">Latest guides</Link>
            <Link href="/tools">Free tools</Link>
            {topics.map((topic) => (
              <Link href={`/category/${encodeURIComponent(topic.name)}`} key={topic.name}>{topic.name}</Link>
            ))}
          </nav>

          {feature ? (
            <div className="editorial-story-grid">
              <aside className="editorial-rail editorial-latest-rail">
                <div className="editorial-rail-heading"><div><span className="kicker">Fresh from the library</span><h2>Most recent</h2></div><Link href="/blog" aria-label="View all guides"><ArrowUpRight size={17} /></Link></div>
                {latest.map((post) => (
                  <article className="editorial-mini-story" key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="editorial-mini-thumb" aria-label={`Read ${post.title}`}>
                      <EditorialImage visual={getPostVisual(post)} sizes="100px" />
                    </Link>
                    <div className="editorial-mini-copy">
                      <span>{post.category}</span>
                      <Link href={`/blog/${post.slug}`}><h3>{post.title}</h3></Link>
                      <small>{dateLabel(post.published_at)} <i /> {post.read_minutes} min read</small>
                    </div>
                  </article>
                ))}
                <Link href="/blog" className="editorial-rail-link">Browse all guides <ArrowRight size={14} /></Link>
              </aside>

              <article className="editorial-feature-story">
                <Link href={`/blog/${feature.slug}`} className="editorial-feature-image" aria-label={`Read ${feature.title}`}>
                  <EditorialImage visual={getPostVisual(feature)} priority sizes="(max-width: 760px) 100vw, (max-width: 1100px) 60vw, 52vw" />
                  <span className="editorial-image-wash" aria-hidden="true" />
                  <span className="editorial-image-badge">Editor’s pick</span>
                  <span className="editorial-image-open"><ArrowUpRight size={20} /></span>
                </Link>
                <div className="editorial-feature-copy">
                  <div className="editorial-story-meta"><span>{feature.category}</span><i />{dateLabel(feature.published_at)}<i />{feature.read_minutes} min read</div>
                  <Link href={`/blog/${feature.slug}`}><h2>{feature.title}</h2></Link>
                  <p>{feature.excerpt}</p>
                  <Link href={`/blog/${feature.slug}`} className="editorial-read-link">Read the guide <ArrowRight size={16} /></Link>
                </div>
              </article>

              <aside className="editorial-rail editorial-more-rail">
                <div className="editorial-rail-heading"><div><span className="kicker">Keep exploring</span><h2>Worth a look</h2></div><Sparkles size={18} /></div>
                {moreToExplore.map((post) => (
                  <article className="editorial-side-story" key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="editorial-side-image" aria-label={`Read ${post.title}`}>
                      <EditorialImage visual={getPostVisual(post)} sizes="(max-width: 760px) 100vw, 25vw" />
                      <span className="editorial-side-image-shade" />
                      <span className="editorial-side-tag">{post.category}</span>
                    </Link>
                    <div className="editorial-side-copy">
                      <small>{dateLabel(post.published_at)} <i /> {post.read_minutes} min read</small>
                      <Link href={`/blog/${post.slug}`}><h3>{post.title}</h3></Link>
                    </div>
                  </article>
                ))}
                {moreToExplore.length === 0 && <p className="editorial-rail-empty">New guides are added to the library over time. Explore the available tools in the meantime.</p>}
                <Link href="/tools" className="editorial-tool-promo"><span><Wrench size={18} /></span><strong>Need to get something done?</strong><small>Explore practical free utilities</small><ArrowUpRight size={17} /></Link>
              </aside>
            </div>
          ) : (
            <div className="editorial-empty"><BookOpen size={24} /><h2>The guide library is taking shape.</h2><p>Explore the available tools while new articles are prepared.</p><Link href="/tools" className="btn btn-primary">Explore tools <ArrowRight size={16} /></Link></div>
          )}

          <div className="editorial-stats" aria-label="SmartGuideDaily library overview">
            <div><span><Wrench size={17} /></span><p><strong>{tools.length}</strong><small>Practical online tools</small></p></div>
            <div><span><FileText size={17} /></span><p><strong>{allPosts.length}</strong><small>Published guides</small></p></div>
            <div><span><Compass size={17} /></span><p><strong>{topics.length}</strong><small>Topics with content</small></p></div>
            <div className="editorial-stats-note"><ShieldCheck size={16} /> Clear guidance. Practical outcomes. Honest limitations.</div>
          </div>
        </div>
      </section>

      <section className="section editorial-categories-section">
        <div className="container">
          <div className="section-top editorial-section-top">
            <div><div className="kicker">Find your starting point</div><h2>Explore by category.</h2><p className="section-subtitle">Choose a topic and discover the guides available in the library today.</p></div>
            <Link href="/blog" className="text-link section-action">Browse all guides <ArrowRight size={16} /></Link>
          </div>
          <div className="editorial-category-grid">
            {topics.map((topic, index) => (
              <Link key={topic.name} href={`/category/${encodeURIComponent(topic.name)}`} className={`editorial-category-card editorial-category-card-${index + 1}`}>
                <div className="editorial-category-image"><EditorialImage visual={topic.visual} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw" /><span /></div>
                <div className="editorial-category-copy"><small>{topic.count} {topic.count === 1 ? "guide" : "guides"}</small><strong>{topic.name}</strong><span>Explore topic <ArrowUpRight size={15} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tools-home premium-section">
        <div className="container">
          <div className="section-top premium-section-top">
            <div><div className="kicker">Small tasks, made simpler</div><h2>Tools that get you moving.</h2><p className="section-subtitle">Quick, focused utilities for calculations, writing, development, and everyday productivity.</p></div>
            <Link href="/tools" className="text-link section-action">Explore all tools <ArrowRight size={16} /></Link>
          </div>
          <FeaturedTools />
          <div className="premium-inline-note"><span className="inline-note-icon"><Zap size={17} /></span><span>Most tools work without an account. Check each tool’s notes to understand how its inputs and results are handled.</span><Link href="/tools">How tools work <ArrowRight size={14} /></Link></div>
        </div>
      </section>

      <section className="section section-muted premium-guides-section">
        <div className="container">
          <div className="section-top premium-section-top">
            <div><div className="kicker">The knowledge library</div><h2>More guides for your next question.</h2><p className="section-subtitle">Step-by-step explainers focused on real tasks, useful context, and responsible decisions.</p></div>
            <Link href="/blog" className="text-link section-action">View all guides <ArrowRight size={16} /></Link>
          </div>
          {posts.length ? <div className="article-grid home-article-grid">{posts.map((post) => <ArticleCard key={post.slug} post={post} />)}</div> : <div className="empty-state"><h3>The library is getting ready</h3><p>Explore the online tools while new guides are prepared.</p><Link href="/tools" className="btn btn-outline">Explore tools</Link></div>}
          <div className="premium-article-footer"><span><BookOpen size={17} /> Practical context, clear explanations, and useful next steps.</span><Link href="/blog" className="text-link">Explore all guides <ArrowRight size={15} /></Link></div>
          <div className="premium-ad-slot"><AdSlot /></div>
        </div>
      </section>

      <section className="section premium-principles-section">
        <div className="container premium-principles-panel">
          <div className="premium-principles-copy"><div className="kicker">Built around usefulness</div><h2>Clear information should lead to better decisions.</h2><p>SmartGuideDaily brings practical guides and everyday tools together. Our goal is to explain what something does, how to use it, and where its limitations matter.</p><Link href="/editorial-policy" className="btn btn-primary">Our editorial approach <ArrowRight size={16} /></Link></div>
          <div className="premium-principle-list">
            <div><span><CheckCircle2 size={18} /></span><section><strong>Clarity before complexity</strong><p>Helpful instructions and readable explanations come first.</p></section></div>
            <div><span><ShieldCheck size={18} /></span><section><strong>Honest about limitations</strong><p>Estimates and automated results should be understood in context.</p></section></div>
            <div><span><Sparkles size={18} /></span><section><strong>Useful over exaggerated</strong><p>We focus on practical value instead of unsupported promises.</p></section></div>
          </div>
        </div>
      </section>

      <section className="section premium-bottom-section">
        <div className="container">
          <div className="premium-bottom-cta"><div className="premium-bottom-decoration" aria-hidden="true"><span /><span /><span /></div><div className="premium-bottom-copy"><div className="kicker">Make today a little easier</div><h2>Start with what you need.</h2><p>Find a useful tool, discover a guide, and take the next step at your own pace.</p></div><div className="premium-bottom-actions"><Link href="/tools" className="btn btn-white">Explore free tools <ArrowRight size={16} /></Link><Link href="/blog" className="btn btn-ghost-white">Browse guides <ArrowUpRight size={15} /></Link></div></div>
        </div>
      </section>
    </>
  );
}
