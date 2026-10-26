"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  Activity, Braces, CalendarDays, CaseSensitive, TrendingUp, Dices, Image,
  Landmark, ListChecks, Percent, Receipt, Ruler, Search, ShieldCheck, Tag, Thermometer, Type
} from "lucide-react";
import { toolCategories, type SiteTool } from "@/lib/tools";
import { getToolVisual } from "@/lib/visuals";
import EditorialImage from "@/components/EditorialImage";

const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  activity: Activity, "calendar-days": CalendarDays, percent: Percent, "receipt-text": Receipt,
  tags: Tag, landmark: Landmark, "chart-no-axes-combined": TrendingUp, type: Type,
  "case-sensitive": CaseSensitive, braces: Braces, "shield-check": ShieldCheck, dices: Dices,
  ruler: Ruler, thermometer: Thermometer, "file-image": Image, "list-checks": ListChecks,
};

type ToolDirectoryProps = {
  tools: SiteTool[];
  initialQuery?: string;
};

export default function ToolDirectory({ tools, initialQuery = "" }: ToolDirectoryProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<(typeof toolCategories)[number]>("All tools");
  const filtered = useMemo(() => tools.filter((tool) => {
    const matchesCategory = category === "All tools" || tool.category === category;
    const searchable = `${tool.name} ${tool.shortDescription} ${tool.category} ${tool.keywords.join(" ")}`.toLowerCase();
    return matchesCategory && searchable.includes(query.trim().toLowerCase());
  }), [tools, query, category]);

  return <div>
    <div className="tool-directory-controls">
      <label className="tool-search"><Search size={18}/><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools…" aria-label="Search tools"/></label>
      <div className="tool-filters" role="group" aria-label="Filter tools by category">
        {toolCategories.map((item) => <button key={item} type="button" className={`filter-chip${category === item ? " active" : ""}`} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}
      </div>
    </div>
    <p className="small-muted" aria-live="polite">Showing {filtered.length} of {tools.length} tools</p>
    {filtered.length ? <div className="tool-grid">{filtered.map((tool) => {
      const Icon = iconMap[tool.icon] || Activity;
      return <Link href={`/tools/${tool.slug}`} key={tool.slug} className="tool-card editorial-tool-directory-card">
        <span className="tool-directory-card-image"><EditorialImage visual={getToolVisual(tool.category)} sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"/><span/></span>
        <span className="tool-icon"><Icon size={22}/></span>
        <span className="tool-card-category">{tool.category}</span>
        <strong>{tool.name}</strong>
        <span className="tool-card-desc">{tool.shortDescription}</span>
        <span className="tool-open">Open tool <span aria-hidden="true">→</span></span>
      </Link>;
    })}</div> : <div className="empty-state"><h2>No tools found</h2><p>Try another phrase or choose a different category.</p><button className="btn btn-outline" onClick={() => { setQuery(""); setCategory("All tools"); }}>Clear filters</button></div>}
  </div>;
}
