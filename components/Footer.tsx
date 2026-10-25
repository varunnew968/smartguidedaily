import Link from "next/link";
export default function Footer() {
  return <footer className="site-footer"><div className="container footer-inner">
    <div className="footer-brand-block"><Link href="/" className="brand footer-brand"><span className="brand-mark">S</span><span>SmartGuide<span className="brand-accent">Daily</span></span></Link><p>Practical guides and simple online tools for smarter everyday decisions.</p><p>© {new Date().getFullYear()} SmartGuideDaily. All rights reserved.</p></div>
    <div className="footer-link-columns"><div><strong>Explore</strong><Link href="/tools">Free tools</Link><Link href="/blog">Articles & guides</Link><Link href="/category/Technology%20%26%20AI">Technology & AI</Link><Link href="/category/Money%20%26%20Business">Money & business</Link></div><div><strong>About</strong><Link href="/about">About us</Link><Link href="/contact">Contact</Link><Link href="/editorial-policy">Editorial policy</Link><Link href="/admin">Publisher login</Link></div><div><strong>Policies</strong><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><Link href="/disclaimer">Disclaimer</Link></div></div>
  </div></footer>;
}
