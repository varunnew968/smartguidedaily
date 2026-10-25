"use client";

import Link from "next/link";
import { Menu, X, Wrench } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  function closeMenu() { setOpen(false); }
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="brand" onClick={closeMenu} aria-label="SmartGuideDaily home"><span className="brand-mark">S</span><span>SmartGuide<span className="brand-accent">Daily</span></span></Link>
    <button type="button" className="mobile-menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
    <nav id="site-navigation" className={`nav${open ? " nav-open" : ""}`} aria-label="Main navigation">
      <Link href="/tools" onClick={closeMenu} className="nav-tools"><Wrench size={15}/> Free tools</Link>
      <Link href="/blog" onClick={closeMenu}>Blog</Link>
      <Link href="/category/Technology%20%26%20AI" onClick={closeMenu}>Technology</Link>
      <Link href="/category/Education%20%26%20Careers" onClick={closeMenu}>Careers</Link>
      <Link href="/about" onClick={closeMenu}>About</Link>
      <Link href="/contact" onClick={closeMenu}>Contact</Link>
      <Link href="/tools" onClick={closeMenu} className="btn btn-primary nav-cta">Explore free tools ↗</Link>
    </nav>
  </div></header>;
}
