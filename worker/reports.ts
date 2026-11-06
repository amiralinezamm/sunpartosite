import { CONVERSION_TYPES, Env, ensureSchema, json, tehranDay } from './shared';

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const CONV = CONVERSION_TYPES.map((t) => `'${t}'`).join(',');
const ENGAGED = '(engaged_ms >= 10000 OR clicks > 0 OR conversions > 0)';

const shiftDay = (day: string, days: number) =>
  new Date(Date.parse(day + 'T00:00:00Z') + days * 86_400_000).toISOString().slice(0, 10);

function parseRange(url: URL) {
  const today = tehranDay(Date.now());
  const rawFrom = url.searchParams.get('from') || today;
  const rawTo = url.searchParams.get('to') || today;
  const from = DAY_RE.test(rawFrom) ? rawFrom : today;
  const to = DAY_RE.test(rawTo) ? rawTo : today;
  const span = Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000) + 1;
  return { from, to, span, prevFrom: shiftDay(from, -span), prevTo: shiftDay(from, -1) };
}

const KPI_SQL = `SELECT COUNT(*) AS sessions, COUNT(DISTINCT visitor) AS visitors,
  COALESCE(SUM(is_new), 0) AS new_sessions, COALESCE(SUM(pageviews), 0) AS pageviews,
  COALESCE(AVG(engaged_ms), 0) AS avg_engaged_ms, COALESCE(AVG(max_scroll), 0) AS avg_scroll,
  COALESCE(SUM(CASE WHEN ${ENGAGED} THEN 1 ELSE 0 END), 0) AS engaged,
  COALESCE(SUM(CASE WHEN conversions > 0 THEN 1 ELSE 0 END), 0) AS converted,
  COALESCE(SUM(conversions), 0) AS conversions
  FROM sessions WHERE day BETWEEN ? AND ?`;

const groupSessions = (column: string, limit = 12) =>
  `SELECT ${column} AS name, COUNT(*) AS sessions, COUNT(DISTINCT visitor) AS visitors,
     SUM(CASE WHEN conversions > 0 THEN 1 ELSE 0 END) AS converted
   FROM sessions WHERE day BETWEEN ? AND ? AND ${column} IS NOT NULL
   GROUP BY ${column} ORDER BY sessions DESC LIMIT ${limit}`;

const groupEvents = (type: string, column: 'name' | 'label', limit = 15) =>
  `SELECT ${column} AS name, COUNT(*) AS n, COUNT(DISTINCT session) AS sessions
   FROM events WHERE day BETWEEN ? AND ? AND type = '${type}' AND ${column} IS NOT NULL
   GROUP BY ${column} ORDER BY n DESC LIMIT ${limit}`;

const REPORT_QUERIES: Record<string, string> = {
  byDay: `SELECT day AS k, COUNT(*) AS sessions, COUNT(DISTINCT visitor) AS visitors,
    SUM(CASE WHEN conversions > 0 THEN 1 ELSE 0 END) AS converted FROM sessions WHERE day BETWEEN ? AND ? GROUP BY day`,
  byHour: `SELECT hour AS k, COUNT(*) AS sessions, COUNT(DISTINCT visitor) AS visitors,
    SUM(CASE WHEN conversions > 0 THEN 1 ELSE 0 END) AS converted FROM sessions WHERE day BETWEEN ? AND ? GROUP BY hour`,
  heat: `SELECT CAST(strftime('%w', day) AS INTEGER) AS dow, hour, COUNT(*) AS n FROM sessions WHERE day BETWEEN ? AND ? GROUP BY dow, hour`,
  conversions: `SELECT type AS name, COUNT(*) AS n, COUNT(DISTINCT session) AS sessions FROM events
    WHERE day BETWEEN ? AND ? AND type IN (${CONV}) GROUP BY type ORDER BY n DESC`,
  conversionPlaces: `SELECT type, COALESCE(name, 'نامشخص') AS name, COUNT(*) AS n FROM events
    WHERE day BETWEEN ? AND ? AND type IN (${CONV}) GROUP BY type, name ORDER BY n DESC LIMIT 20`,
  sectionViews: `SELECT name, COUNT(DISTINCT session) AS sessions FROM events WHERE day BETWEEN ? AND ? AND type = 'section_view' GROUP BY name`,
  sectionTime: `SELECT name, SUM(value) AS seconds, COUNT(DISTINCT session) AS sessions FROM events WHERE day BETWEEN ? AND ? AND type = 'section_time' GROUP BY name`,
  scroll: `SELECT name, COUNT(DISTINCT session) AS sessions FROM events WHERE day BETWEEN ? AND ? AND type = 'scroll' GROUP BY name`,
  clicks: groupEvents('click', 'label', 20),
  rage: groupEvents('rage', 'name', 10),
  outbound: groupEvents('outbound', 'label', 10),
  faq: groupEvents('faq_open', 'label', 12),
  projects: groupEvents('project_open', 'label', 12),
  projectFilters: groupEvents('project_filter', 'label', 8),
  appTabs: groupEvents('app_tab', 'label', 8),
  calcTypes: `SELECT name, COUNT(*) AS n, COUNT(DISTINCT session) AS sessions, AVG(value) AS avg_kw FROM events
    WHERE day BETWEEN ? AND ? AND type = 'calc_submit' AND name IS NOT NULL GROUP BY name ORDER BY n DESC`,
  formTypes: groupEvents('form_submit', 'name', 8),
  funnel: `SELECT
    (SELECT COUNT(*) FROM sessions WHERE day BETWEEN ?1 AND ?2) AS visit,
    (SELECT COUNT(*) FROM sessions WHERE day BETWEEN ?1 AND ?2 AND ${ENGAGED}) AS engaged,
    (SELECT COUNT(DISTINCT session) FROM events WHERE day BETWEEN ?1 AND ?2 AND type = 'section_view' AND name IN ('services','portfolio','applications')) AS explored,
    (SELECT COUNT(DISTINCT session) FROM events WHERE day BETWEEN ?1 AND ?2 AND type = 'calc_use') AS calc,
    (SELECT COUNT(DISTINCT session) FROM events WHERE day BETWEEN ?1 AND ?2 AND type = 'section_view' AND name = 'contact') AS contact,
    (SELECT COUNT(*) FROM sessions WHERE day BETWEEN ?1 AND ?2 AND conversions > 0) AS converted`,
  forms: `SELECT type AS name, COUNT(DISTINCT session) AS sessions FROM events
    WHERE day BETWEEN ? AND ? AND type IN ('form_start','form_error','form_submit') GROUP BY type`,
  sources: groupSessions('source'),
  referrers: groupSessions('referrer'),
  campaigns: groupSessions('utm_campaign'),
  countries: groupSessions('country'),
  cities: groupSessions('city', 15),
  regions: groupSessions('region', 15),
  devices: groupSessions('device'),
  browsers: groupSessions('browser'),
  systems: groupSessions('os'),
  screens: groupSessions('screen', 10),
  languages: groupSessions('lang', 8),
  perf: `SELECT name, device, AVG(value) AS avg, COUNT(*) AS n FROM events WHERE day BETWEEN ? AND ? AND type = 'perf' GROUP BY name, device`,
  errors: `SELECT label AS name, COUNT(*) AS n, COUNT(DISTINCT session) AS sessions, MAX(ts) AS last_ts FROM events
    WHERE day BETWEEN ? AND ? AND type = 'error' AND label IS NOT NULL GROUP BY label ORDER BY n DESC LIMIT 15`,
};

function fillSeries(range: ReturnType<typeof parseRange>, byDay: any[], byHour: any[]) {
  const blank = { sessions: 0, visitors: 0, converted: 0 };
  if (range.span === 1) {
    const map = new Map(byHour.map((r) => [r.k, r]));
    return Array.from({ length: 24 }, (_, h) => ({ ...blank, ...map.get(h), k: String(h) }));
  }
  const map = new Map(byDay.map((r) => [r.k, r]));
  return Array.from({ length: range.span }, (_, i) => {
    const k = shiftDay(range.from, i);
    return { ...blank, ...map.get(k), k };
  });
}

async function report(db: D1Database, url: URL) {
  const range = parseRange(url);
  const names = Object.keys(REPORT_QUERIES);
  const results = await db.batch([
    db.prepare(KPI_SQL).bind(range.from, range.to),
    db.prepare(KPI_SQL).bind(range.prevFrom, range.prevTo),
    ...names.map((n) => db.prepare(REPORT_QUERIES[n]).bind(range.from, range.to)),
  ]);
  const out: Record<string, any> = {};
  names.forEach((n, i) => (out[n] = results[i + 2].results));
  return {
    range,
    kpi: results[0].results[0],
    prev: results[1].results[0],
    series: fillSeries(range, out.byDay, out.byHour),
    ...out,
    funnel: out.funnel[0],
  };
}

async function live(db: D1Database) {
  const since = Date.now() - 5 * 60_000;
  const [active, feed] = await db.batch([
    db.prepare(
      `SELECT id, visitor, last_ts, first_ts, city, country, device, browser, source, max_scroll, conversions
       FROM sessions WHERE last_ts > ? ORDER BY last_ts DESC LIMIT 30`,
    ).bind(since),
    db.prepare(
      `SELECT e.session, e.ts, e.type, e.name, e.label, s.city, s.device FROM events e JOIN sessions s ON s.id = e.session
       WHERE e.day >= ? AND e.type NOT IN ('section_time','perf','scroll') ORDER BY e.id DESC LIMIT 30`,
    ).bind(tehranDay(Date.now() - 86_400_000)),
  ]);
  return { active: active.results, feed: feed.results, now: Date.now() };
}

async function sessions(db: D1Database, url: URL) {
  const range = parseRange(url);
  const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);
  const filter = url.searchParams.get('filter');
  const where = ['day BETWEEN ? AND ?'];
  if (filter === 'converted') where.push('conversions > 0');
  if (filter === 'new') where.push('is_new = 1');
  if (filter === 'returning') where.push('is_new = 0');
  if (filter === 'mobile') where.push(`device = 'mobile'`);
  if (filter === 'desktop') where.push(`device = 'desktop'`);
  const { results } = await db.prepare(
    `SELECT id, visitor, first_ts, last_ts, is_new, city, country, device, browser, os, source, referrer, landing,
       events, clicks, conversions, max_scroll, engaged_ms
     FROM sessions WHERE ${where.join(' AND ')} ORDER BY first_ts DESC LIMIT 50 OFFSET ?`,
  ).bind(range.from, range.to, offset).all();
  return { sessions: results, offset };
}

async function sessionDetail(db: D1Database, url: URL) {
  const id = url.searchParams.get('id') || '';
  const [session, events, history] = await db.batch([
    db.prepare('SELECT * FROM sessions WHERE id = ?').bind(id),
    db.prepare(`SELECT ts, type, name, label, value FROM events WHERE session = ? AND type != 'perf' ORDER BY ts, id LIMIT 500`).bind(id),
    db.prepare(`SELECT COUNT(*) AS visits FROM sessions WHERE visitor = (SELECT visitor FROM sessions WHERE id = ?)`).bind(id),
  ]);
  return { session: session.results[0] ?? null, events: events.results, visits: (history.results[0] as any)?.visits ?? 1 };
}

async function clicks(db: D1Database, url: URL) {
  const range = parseRange(url);
  const device = url.searchParams.get('device') === 'mobile' ? 'mobile' : 'desktop';
  const { results } = await db.prepare(
    `SELECT name, x, y FROM events WHERE day BETWEEN ? AND ? AND type = 'click' AND device = ?
       AND x IS NOT NULL AND y IS NOT NULL ORDER BY id DESC LIMIT 5000`,
  ).bind(range.from, range.to, device).all();
  return { clicks: results };
}

// Leading apostrophe stops spreadsheets from running a visitor-supplied value as a formula
const csvCell = (v: unknown) => {
  let s = v == null ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
};

async function exportCsv(db: D1Database, url: URL) {
  const range = parseRange(url);
  const table = url.searchParams.get('type') === 'events' ? 'events' : 'sessions';
  const { results } = await db.prepare(`SELECT * FROM ${table} WHERE day BETWEEN ? AND ? LIMIT 50000`).bind(range.from, range.to).all();
  const cols = results.length ? Object.keys(results[0]) : [];
  const rows = results.map((r: any) => cols.map((c) => csvCell(r[c])).join(','));
  return new Response('﻿' + [cols.join(','), ...rows].join('\n'), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="sunparto-${table}-${range.from}_${range.to}.csv"`,
      'cache-control': 'no-store',
    },
  });
}

export async function handleAdminApi(path: string, url: URL, env: Env): Promise<Response> {
  if (!env.DB) return json({ error: 'no_database' }, 503);
  await ensureSchema(env.DB);
  if (path === 'report') return json(await report(env.DB, url));
  if (path === 'live') return json(await live(env.DB));
  if (path === 'sessions') return json(await sessions(env.DB, url));
  if (path === 'session') return json(await sessionDetail(env.DB, url));
  if (path === 'clicks') return json(await clicks(env.DB, url));
  if (path === 'export') return exportCsv(env.DB, url);
  return json({ error: 'not_found' }, 404);
}
