import Link from "next/link";
export default function Footer() {
  return <footer className="site-footer"><div className="container footer-inner">
    <div><Link href="/" className="brand" style={{fontSize:17}}><span className="brand-mark" style={{width:29,height:29,borderRadius:9,fontSize:14}}>S</span>SmartGuideDaily</Link><p>Practical guides for smarter everyday decisions.</p><p>© {new Date().getFullYear()} SmartGuideDaily. All rights reserved.</p></div>
    <div className="footer-links"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/admin">Admin</Link></div>
  </div></footer>;
}
