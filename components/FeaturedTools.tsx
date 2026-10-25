import Link from "next/link";
import type { ComponentType } from "react";
import { Activity, CalendarDays, Percent, ReceiptText, Landmark, Type, ArrowUpRight } from "lucide-react";
import { tools } from "@/lib/tools";

const icons: Record<string, ComponentType<{ size?: number }>> = {
  "bmi-calculator": Activity,
  "age-calculator": CalendarDays,
  "percentage-calculator": Percent,
  "gst-calculator": ReceiptText,
  "emi-calculator": Landmark,
  "word-counter": Type,
};

export default function FeaturedTools() {
  const featured = ["bmi-calculator", "age-calculator", "percentage-calculator", "gst-calculator", "emi-calculator", "word-counter"]
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool) => tool !== undefined);
  return <div className="featured-tools-grid">{featured.map((tool, index) => {
    const Icon = icons[tool.slug] || Type;
    return <Link href={`/tools/${tool.slug}`} className="featured-tool-card" key={tool.slug}>
      <span className={`tool-icon featured-icon-${index % 3}`}><Icon size={21}/></span>
      <span className="featured-tool-meta">{tool.category}</span>
      <strong>{tool.name}</strong>
      <span className="featured-tool-desc">{tool.shortDescription}</span>
      <span className="featured-tool-open">Open tool <ArrowUpRight size={15}/></span>
    </Link>;
  })}</div>;
}
