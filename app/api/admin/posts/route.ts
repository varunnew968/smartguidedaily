import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { deletePost, getAllAdminPosts, savePost } from "@/lib/posts";
import { estimateReadMinutes } from "@/lib/content";
import type { Post } from "@/lib/types";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,90);
}
export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ posts: await getAllAdminPosts() });
}
export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (typeof body.title !== "string" || body.title.trim().length < 5) return NextResponse.json({ error: "Title must be at least 5 characters." }, { status: 400 });
    if (typeof body.content !== "string" || body.content.trim().length < 80) return NextResponse.json({ error: "Please add a useful article body (at least 80 characters)." }, { status: 400 });
    const slug = slugify(String(body.slug || body.title));
    if (!slug) return NextResponse.json({ error: "Please provide a valid title or slug." }, { status: 400 });
    const rawCoverUrl = typeof body.cover_image_url === "string" ? body.cover_image_url.trim() : "";
    let coverImageUrl: string | undefined;
    if (rawCoverUrl) {
      try {
        const parsedCoverUrl = new URL(rawCoverUrl);
        if (parsedCoverUrl.protocol !== "https:" || parsedCoverUrl.hostname !== "images.unsplash.com") {
          return NextResponse.json({ error: "Cover images must use an HTTPS images.unsplash.com image URL." }, { status: 400 });
        }
        coverImageUrl = parsedCoverUrl.toString().slice(0, 2000);
      } catch {
        return NextResponse.json({ error: "Enter a valid HTTPS cover image URL from images.unsplash.com." }, { status: 400 });
      }
    }
    const clearCoverImage = body.clear_cover_image === true && Boolean(body.id);
    const coverImageField = coverImageUrl ? { cover_image_url: coverImageUrl } : clearCoverImage ? { cover_image_url: null } : {};
    const now = new Date().toISOString();
    const post: Post = {
      id: String(body.id || slug), slug, title: body.title.trim(), excerpt: String(body.excerpt || "").trim().slice(0,300),
      category: ["Technology & AI","Education & Careers","Money & Business","Everyday How-To"].includes(body.category) ? body.category : "Everyday How-To",
      author: String(body.author || "SmartGuideDaily Editorial Team").slice(0,100),
      published_at: body.status === "published" ? (body.published_at || now).slice(0,30) : (body.published_at || now).slice(0,30),
      updated_at: now, read_minutes: estimateReadMinutes(body.content), cover_label: String(body.cover_label || body.category || "Guide").slice(0,60),
      ...coverImageField,
      content: body.content.trim(), status: body.status === "published" ? "published" : "draft",
      seo_title: String(body.seo_title || body.title).slice(0,70), seo_description: String(body.seo_description || body.excerpt || "").slice(0,160),
      affiliate_disclosure: Boolean(body.affiliate_disclosure)
    };
    const result = await savePost(post);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 503 });
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath(`/category/${encodeURIComponent(post.category)}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true, post });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save post." }, { status: 400 });
  }
}
export async function DELETE(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug." }, { status: 400 });
  const result = await deletePost(slug);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 503 });
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ ok: true });
}
