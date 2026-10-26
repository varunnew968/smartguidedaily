"use client";

import Link from "next/link";
import { Menu, Search, Sparkles, Wrench, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  function closeMenu() { setOpen(false); }

  return (
    <header className="site-header premium-site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={closeMenu} aria-label="SmartGuideDaily home">
          <span className="brand-mark"><span>S</span></span>
          <span className="brand-wordmark">SmartGuide<span className="brand-accent">Daily</span><small>KNOW MORE. DO MORE.</small></span>
        </Link>
        <button type="button" className="mobile-menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="site-navigation" className={`nav premium-nav${open ? " nav-open" : ""}`} aria-label="Main navigation">
          <Link href="/tools" onClick={closeMenu} className="nav-tools"><Wrench size={15} /> Tools</Link>
          <Link href="/blog" onClick={closeMenu}>Guides</Link>
          <Link href="/category/Technology%20%26%20AI" onClick={closeMenu}><Sparkles size={14} /> Technology & AI</Link>
          <Link href="/category/Education%20%26%20Careers" onClick={closeMenu}>Careers</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/search" onClick={closeMenu} className="nav-search-link" aria-label="Search SmartGuideDaily"><Search size={17} /><span>Search</span></Link>
          <Link href="/tools" onClick={closeMenu} className="btn btn-primary nav-cta">Explore tools <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
