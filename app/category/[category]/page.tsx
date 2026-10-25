import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
export async function generateMetadata({params}:{params:Promise<{category:string}>}):Promise<Metadata>{
 const {category}=await params; const decoded=decodeURIComponent(category);
 return {title:decoded,description:`Practical SmartGuideDaily articles about ${decoded.toLowerCase()}.`,alternates:{canonical:`/category/${encodeURIComponent(decoded)}`}};
}
export default async function CategoryPage({params}:{params:Promise<{category:string}>}){
 const {category}=await params; const decoded=decodeURIComponent(category);
 if(!categories.includes(decoded)||decoded==="All") notFound();
 const posts=(await getPosts()).filter(p=>p.category===decoded);
 return <><section className="page-hero"><div className="container"><div className="kicker">Explore by topic</div><h1>{decoded}</h1><p>Clear, practical guides to help you learn, make decisions, and solve everyday problems.</p></div></section><section className="section"><div className="container">{posts.length?<div className="article-grid">{posts.map(p=><ArticleCard key={p.slug} post={p}/>)}</div>:<div className="empty-state">New articles in this category are coming soon.</div>}</div></section></>;
}
