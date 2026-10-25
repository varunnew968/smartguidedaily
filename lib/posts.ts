import { createClient } from "@supabase/supabase-js";
import { seedPosts } from "./content";
import type { Post } from "./types";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function getPosts(includeDrafts = false): Promise<Post[]> {
  const db = supabaseAdmin();
  if (db) {
    const query = db.from("posts").select("*").order("published_at", { ascending: false });
    const { data, error } = includeDrafts ? await query : await query.eq("status", "published");
    if (!error && data) return data as Post[];
  }
  return includeDrafts ? seedPosts : seedPosts.filter(p => p.status === "published");
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const db = supabaseAdmin();
  if (db) {
    const { data, error } = await db.from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    if (!error && data) return data as Post;
  }
  return seedPosts.find(p => p.slug === slug && p.status === "published");
}

export async function getAllAdminPosts(): Promise<Post[]> {
  const db = supabaseAdmin();
  if (db) {
    const { data, error } = await db.from("posts").select("*").order("updated_at", { ascending: false });
    if (!error && data) return data as Post[];
  }
  return seedPosts;
}

export async function savePost(post: Post): Promise<{ ok: boolean; error?: string }> {
  const db = supabaseAdmin();
  if (!db) return { ok: false, error: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local and Vercel." };
  const { error } = await db.from("posts").upsert({ ...post, updated_at: new Date().toISOString() }, { onConflict: "slug" });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function deletePost(slug: string): Promise<{ ok: boolean; error?: string }> {
  const db = supabaseAdmin();
  if (!db) return { ok: false, error: "Supabase is not configured." };
  const { error } = await db.from("posts").delete().eq("slug", slug);
  return error ? { ok: false, error: error.message } : { ok: true };
}
