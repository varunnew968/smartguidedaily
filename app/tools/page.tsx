import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, ArrowRight, ShieldCheck, Smartphone, Zap } from "lucide-react";
import ToolDirectory from "@/components/ToolDirectory";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Online Tools & Calculators",
  description: "Use free online calculators, text tools, productivity helpers, and image utilities on SmartGuideDaily. Fast, simple, and browser-friendly.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return <>
    <section className="page-hero tools-hero"><div className="container">
      <div className="kicker"><Wrench size={14} style={{display:"inline",verticalAlign:"-2px",marginRight:6}}/> Free online utilities</div>
      <h1>Useful tools. Clear results.</h1>
      <p>Simple calculators and browser-based utilities for everyday tasks. No account is required, and tools that handle text or images process your work locally in your browser.</p>
      <div className="tool-trust-row"><span><Zap size={15}/> Quick to use</span><span><ShieldCheck size={15}/> No sign-up</span><span><Smartphone size={15}/> Works on mobile</span></div>
    </div></section>
    <section className="section"><div className="container">
      <ToolDirectory tools={tools} initialQuery={q}/>
      <div className="tool-note"><strong>Use results thoughtfully.</strong> Calculators provide estimates from the values you enter. They are not a substitute for professional financial, tax, or health advice.</div>
    </div></section>
    <section className="section section-muted"><div className="container tools-footer-cta"><div><div className="kicker">Learn more</div><h2>Want to understand the result?</h2><p className="section-subtitle">Explore step-by-step guides and practical explanations written for everyday readers.</p></div><Link href="/blog" className="btn btn-primary">Browse guides <ArrowRight size={16}/></Link></div></section>
  </>;
}
