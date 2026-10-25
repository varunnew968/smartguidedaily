-- Run this SQL in your Supabase project's SQL Editor.
-- Keep SUPABASE_SERVICE_ROLE_KEY private. Never expose it in NEXT_PUBLIC_* variables.
create table if not exists public.posts (
  id text primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  category text not null default 'Everyday How-To',
  author text not null default 'SmartGuideDaily Editorial Team',
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  read_minutes integer not null default 1,
  cover_label text not null default 'Guide',
  content text not null,
  status text not null default 'draft' check (status in ('draft','published')),
  seo_title text,
  seo_description text,
  affiliate_disclosure boolean not null default false
);
create index if not exists posts_status_published_at_idx on public.posts(status, published_at desc);
alter table public.posts enable row level security;
-- The application reads/writes with the service role on the server only.
-- No anon/authenticated policies are intentionally created.
