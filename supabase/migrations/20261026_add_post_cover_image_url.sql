-- Optional per-article cover images for the SmartGuideDaily editorial UI.
-- Run once in the Supabase SQL Editor for an existing project before saving custom covers.
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS cover_image_url text;
