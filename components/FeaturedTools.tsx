import Link from "next/link";
import type { ComponentType } from "react";
import { Activity, CalendarDays, Percent, Receipt, Landmark, Type, ArrowUpRight } from "lucide-react";
import { tools } from "@/lib/tools";

const icons: Record<string, ComponentType<{ size?: number }>> = {
  "bmi-calculator": Activity,
  "age-calculator": CalendarDays,
  "percentage-calculator": Percent,
  "gst-calculator": Receipt,
  "emi-calculator": Landmark,
  "word-counter": Type,
};

export default function FeaturedTools() {
  const featured = ["bmi-calculator", "age-calculator", "percentage-calculator", "gst-calculator", "emi-calculator", "word-counter"]
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool) => tool !== undefined);
  return <div className="featured-tools-grid">{featured.map((tool) => {
    const Icon = icons[tool.slug];
    return <Link href={`/tools/${tool.slug}`} className="featured-tool-card" key={tool.slug}>
      <span className="tool-icon"><Icon size={21}/></span><strong>{tool.name}</strong><span>{tool.shortDescription}</span><ArrowUpRight size={17} className="featured-tool-arrow"/>
    </Link>;
  })}</div>;
}
