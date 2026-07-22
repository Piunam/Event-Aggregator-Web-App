-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query)
-- to create the events table this app reads from and writes to.

create extension if not exists pgcrypto;

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  date timestamptz not null,
  end_date timestamptz,
  location text not null,
  college text not null,
  type text not null check (type in ('hackathon', 'tech-talk', 'workshop', 'conference', 'other')),
  link text not null,
  image text,
  created_at timestamptz not null default now()
);

create index if not exists events_date_idx on events (date);

alter table events enable row level security;

-- MVP policies: no auth yet, so anyone can read and anyone can submit an event.
-- Once organizer accounts / moderation land, replace the insert policy with
-- one scoped to authenticated users and add an approval step before events
-- become publicly readable.
create policy "Public can read events"
  on events for select
  using (true);

create policy "Public can submit events"
  on events for insert
  with check (true);
