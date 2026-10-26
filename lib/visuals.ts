import type { Post } from "./types";

export type EditorialVisual = {
  src: string;
  alt: string;
};

// Editorial photography from Unsplash. Images are illustrative and are not presented as documentary evidence.
const photo = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const visuals = {
  ai: {
    src: photo("photo-1677442136019-21780ecad995"),
    alt: "Abstract artificial intelligence concept on a digital display",
  },
  technology: {
    src: photo("photo-1518770660439-4636190af475"),
    alt: "Close-up of modern electronics and computer components",
  },
  career: {
    src: photo("photo-1586281380349-632531db7ed4"),
    alt: "Documents and stationery arranged for career planning",
  },
  learning: {
    src: photo("photo-1434030216411-0b793f4b4173"),
    alt: "Study materials on a desk beside a laptop",
  },
  business: {
    src: photo("photo-1556761175-b413da4baf72"),
    alt: "People collaborating around a table in a modern workspace",
  },
  freelance: {
    src: photo("photo-1521737711867-e3b97375f902"),
    alt: "A small team working together at a shared table",
  },
  finance: {
    src: photo("photo-1460925895917-afdab827c52f"),
    alt: "Laptop showing a business analytics dashboard",
  },
  mobile: {
    src: photo("photo-1511707171634-5f897ff02aa9"),
    alt: "Smartphone photographed on a clean background",
  },
  security: {
    src: photo("photo-1550751827-4bd374c3f58b"),
    alt: "Cybersecurity-themed digital lights and network imagery",
  },
  productivity: {
    src: photo("photo-1498050108023-c5249f4df085"),
    alt: "Laptop and desk setup for focused digital work",
  },
  everyday: {
    src: photo("photo-1516321318423-f06f85e504b3"),
    alt: "Hands using a laptop for an everyday digital task",
  },
  tools: {
    src: photo("photo-1519389950473-47ba0277781c"),
    alt: "Technology team working together in a bright office",
  },
} satisfies Record<string, EditorialVisual>;

export function getCategoryVisual(category: string): EditorialVisual {
  if (category.includes("Technology")) return visuals.ai;
  if (category.includes("Education")) return visuals.career;
  if (category.includes("Money")) return visuals.business;
  if (category.includes("Everyday")) return visuals.everyday;
  return visuals.technology;
}

export function getPostVisual(post: Pick<Post, "slug" | "title" | "category" | "cover_label" | "cover_image_url">): EditorialVisual {
  const customCover = post.cover_image_url?.trim();
  if (customCover) {
    try {
      const parsed = new URL(customCover);
      if (parsed.protocol === "https:" && parsed.hostname === "images.unsplash.com") {
        return { src: parsed.toString(), alt: `Illustrative cover image for ${post.title}` };
      }
    } catch {
      // Ignore invalid custom cover URLs and use the curated category mapping below.
    }
  }
  const text = `${post.slug} ${post.title} ${post.cover_label}`.toLowerCase();

  if (/ai|artificial intelligence|stud(y|ying)|study tools/.test(text)) return visuals.ai;
  if (/resume|career|fresher|job/.test(text)) return visuals.career;
  if (/freelanc|portfolio|client/.test(text)) return visuals.freelance;
  if (/android|phone|factory reset|backup/.test(text)) return visuals.mobile;
  if (/password|security|passkey|privacy|phishing/.test(text)) return visuals.security;
  if (/business idea|small business|validate|money|finance/.test(text)) return visuals.finance;
  if (/developer|code|software|technology/.test(text)) return visuals.technology;
  if (/tool|productivity|calculator|utility/.test(text)) return visuals.tools;

  return getCategoryVisual(post.category);
}

export function getToolVisual(category: string): EditorialVisual {
  if (/ai|developer|software|technology/i.test(category)) return visuals.technology;
  if (/business|finance|marketing/i.test(category)) return visuals.finance;
  if (/education|learning/i.test(category)) return visuals.learning;
  if (/security|privacy/i.test(category)) return visuals.security;
  return visuals.productivity;
}
