import Link from "next/link";
export default function Header() {
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="brand"><span className="brand-mark">S</span><span>SmartGuide<span style={{color:"#3157d5"}}>Daily</span></span></Link>
    <nav className="nav" aria-label="Main navigation">
      <Link href="/blog" className="nav-blog">Blog</Link><Link href="/category/Technology%20%26%20AI" className="nav-extra">Technology</Link><Link href="/category/Education%20%26%20Careers" className="nav-extra">Careers</Link><Link href="/about">About</Link>
      <Link href="/blog" className="btn btn-primary">Explore articles ↗</Link>
    </nav>
  </div></header>;
}
