// Pulls live hackathon listings from Unstop's public search API
// (https://unstop.com/api/public/opportunity/search-result — allowed by
// unstop.com/robots.txt for /api/public/*) and upserts them into the
// `events` table, deduped by source_url.
//
// Run with:
//   node --env-file=.env.local scripts/scrape-unstop.mjs
//
// Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to already be set
// (same values the app uses — no service_role key needed, since this only
// inserts new rows and relies on the existing public insert policy).

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Run with --env-file=.env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MAX_PAGES = Number(process.env.MAX_PAGES || 5);
const PER_PAGE = 18;
const USER_AGENT = 'EventAggregatorWebApp/0.1 (personal/student project, contact via GitHub repo)';

const stripHtml = (html) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&ndash;/g, '-')
    .replace(/&rsquo;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600);

const mapItem = (item) => {
  const date = item.regnRequirements?.end_regn_dt || item.end_date || null;
  const endDate = item.end_date && item.end_date !== date ? item.end_date : null;
  const region = item.region;
  const location = region && region !== 'online' ? region : 'Online / Multiple locations';

  return {
    title: item.title,
    description: item.details ? stripHtml(item.details) : 'No description provided.',
    date,
    end_date: endDate,
    location,
    college: item.organisation?.name || 'Unstop',
    type: 'hackathon',
    link: item.seo_url,
    image: item.logoUrl2 || null,
    source: 'unstop',
    source_url: item.seo_url,
  };
};

async function fetchPage(page) {
  const url = `https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&page=${page}&per_page=${PER_PAGE}&oppstatus=open&sortBy=&orderBy=&filter_condition=`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': USER_AGENT },
  });
  if (!res.ok) throw new Error(`Unstop API returned ${res.status} for page ${page}`);
  const json = await res.json();
  return json.data;
}

async function main() {
  const allRows = [];
  let lastPage = 1;

  for (let page = 1; page <= MAX_PAGES; page++) {
    const data = await fetchPage(page);
    lastPage = data.last_page;
    const items = data.data || [];
    console.log(`Fetched page ${page}/${lastPage} — ${items.length} hackathons`);

    for (const item of items) {
      if (item.seo_url && item.title) {
        allRows.push(mapItem(item));
      }
    }

    if (page >= lastPage) break;
    await new Promise((r) => setTimeout(r, 500)); // be polite between requests
  }

  console.log(`\nMapped ${allRows.length} hackathons total. Upserting into Supabase...`);

  const { data: inserted, error } = await supabase
    .from('events')
    .upsert(allRows, { onConflict: 'source_url', ignoreDuplicates: true })
    .select('id, title');

  if (error) {
    console.error('Upsert failed:', error.message);
    process.exit(1);
  }

  console.log(`Done. ${inserted.length} new event(s) inserted (existing ones with the same source_url were skipped).`);
}

main().catch((err) => {
  console.error('Scraper failed:', err);
  process.exit(1);
});
