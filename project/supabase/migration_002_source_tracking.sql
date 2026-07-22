-- Run this in the Supabase SQL Editor after schema.sql.
-- Adds source attribution + a dedup key so scrapers can be re-run safely
-- without creating duplicate rows on every run.

alter table events add column if not exists source text not null default 'manual';
alter table events add column if not exists source_url text;

-- Plain unique index. Postgres treats NULLs as distinct from each other,
-- so manual submissions (source_url = null) never conflict with one
-- another -- only actual duplicate scraped URLs get deduped.
create unique index if not exists events_source_url_key
  on events (source_url);
