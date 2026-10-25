import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <div className="footer-brand-block"><Link href="/" className="brand footer-brand"><span className="brand-mark"><span>S</span></span><span className="brand-wordmark">SmartGuide<span className="brand-accent">Daily</span><small>TOOLS & PRACTICAL GUIDES</small></span></Link><p>Practical guides and simple online tools for clearer decisions and everyday progress.</p><Link className="footer-contact-link" href="/contact"><Mail size={15}/> Contact our team <ArrowUpRight size={14}/></Link></div>
      <div className="footer-link-columns"><div><strong>Explore</strong><Link href="/tools">Free online tools</Link><Link href="/blog">Articles & guides</Link><Link href="/category/Technology%20%26%20AI">Technology & AI</Link><Link href="/category/Money%20%26%20Business">Money & business</Link></div><div><strong>About SmartGuideDaily</strong><Link href="/about">About us</Link><Link href="/contact">Contact</Link><Link href="/editorial-policy">Editorial policy</Link><Link href="/admin">Publisher login</Link></div><div><strong>Policies</strong><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><Link href="/disclaimer">Disclaimer</Link></div></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} SmartGuideDaily. All rights reserved.</span><span>Practical information. Clear next steps.</span></div>
  </div></footer>;
}
