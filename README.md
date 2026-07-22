# EventScope — Event Aggregator Web App

A web app for discovering tech events, hackathons, and workshops — built as
a learning project toward something in the spirit of [Unstop](https://unstop.com)
or [Luma](https://lu.ma).

**Live:** https://event-aggregator-web-app.vercel.app/

## What it does

- **Browse events** — search and filter by event type, college/organizer,
  location, and date range
- **Real data** — a scraper pulls live hackathon listings directly from
  Unstop's public API, alongside events people submit manually
- **Submit an event** — anyone can add an event through a form; it's
  validated and saved immediately
- **Event detail pages** — full description, dates, location, and a link
  out to the original registration page

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- [Supabase](https://supabase.com) (Postgres + REST API) for storage
- Deployed on [Vercel](https://vercel.com)

## Project structure

```
project/
├── src/
│   ├── pages/          Dashboard, EventPage, SubmitEvent
│   ├── components/      EventCard, EventDetail, EventForm, FilterBar, Header, Footer
│   ├── lib/             Supabase client + data-access functions (fetch/create events)
│   ├── utils/           filtering/formatting helpers
│   └── types/           shared TypeScript types
├── scripts/
│   └── scrape-unstop.mjs   Pulls live hackathons from Unstop's public API
└── supabase/
    ├── schema.sql             Events table + row-level security policies
    ├── migration_002_...sql   Adds source/source_url columns for scraper dedup
    └── seed.sql               A handful of sample events (optional)
```

## Running locally

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `project/supabase/schema.sql`, then
   `project/supabase/migration_002_source_tracking.sql` (optionally
   `seed.sql` too, for sample data).
3. Copy `project/.env.example` to `project/.env.local` and fill in your
   project's URL and **publishable (anon)** key from
   Settings → API Keys. Never put the secret/service_role key here.
4. Install and run:
   ```
   cd project
   npm install
   npm run dev
   ```

## Pulling in real events

`scripts/scrape-unstop.mjs` fetches live hackathons from Unstop's public
search API (allowed by their `robots.txt`) and upserts them into your
`events` table, deduped by URL so it's safe to re-run:

```
cd project
node --env-file=.env.local scripts/scrape-unstop.mjs
```

## Deploying

Deployed on Vercel. If you fork this: set the project's **Root Directory**
to `project` (the app lives in a subfolder, not the repo root), and add
`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` as environment variables in
the Vercel project settings.

## Known limitations / roadmap

This is an early-stage prototype, not a finished product. Notably missing:

- **No auth** — anyone can submit an event; there's no organizer identity
  or moderation queue yet
- **No pagination** — the dashboard renders every event in one grid, which
  won't scale gracefully as more real data comes in
- **No RSVP/registration** — currently a link-out directory, not a platform
  people register through
- Only one scraped source (Unstop) is wired up; others (e.g. Insider.in)
  were blocked by bot protection when tried from outside India
