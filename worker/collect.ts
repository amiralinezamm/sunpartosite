import { CONVERSION_TYPES, Env, ensureSchema, tehranDay, tehranHour } from './shared';

const MAX_BODY_CHARS = 32_000;
const MAX_BATCH = 40;
const MAX_SESSION_EVENTS = 2_000;
const ID_RE = /^[a-z0-9]{8,32}$/;
const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|whatsapp\/|telegrambot|curl|wget|python-requests/i;

const EVENT_TYPES = new Set([
  'pageview', 'section_view', 'section_time', 'scroll', 'click', 'rage', 'outbound',
  'call_click', 'whatsapp_click', 'form_start', 'form_submit', 'form_error',
  'calc_use', 'calc_type', 'calc_submit', 'faq_open', 'project_open', 'project_filter', 'app_tab',
  'perf', 'error',
]);

const SEARCH_RE = /(^|\.)(google|bing|yahoo|duckduckgo|yandex|baidu|ecosia|parsijoo|zarebin)\./;
const SOCIAL_RE = /(^|\.)(instagram|facebook|t\.co|twitter|x\.com|linkedin|telegram|t\.me|whatsapp|wa\.me|youtube|aparat|pinterest|eitaa|ble\.ir)/;

const str = (v: unknown, max: number) => {
  if (typeof v !== 'string') return null;
  const s = v.trim().slice(0, max);
  return s || null;
};
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

function parseUa(ua: string) {
  const device = /ipad|tablet|(android(?!.*mobile))/i.test(ua) ? 'tablet' : /mobi|iphone|android/i.test(ua) ? 'mobile' : 'desktop';
  const browser = /edg/i.test(ua) ? 'Edge'
    : /opr\/|opera/i.test(ua) ? 'Opera'
    : /samsungbrowser/i.test(ua) ? 'Samsung Internet'
    : /firefox|fxios/i.test(ua) ? 'Firefox'
    : /chrome|crios/i.test(ua) ? 'Chrome'
    : /safari/i.test(ua) ? 'Safari'
    : 'سایر';
  const os = /android/i.test(ua) ? 'Android'
    : /iphone|ipad|ipod/i.test(ua) ? 'iOS'
    : /windows/i.test(ua) ? 'Windows'
    : /mac os/i.test(ua) ? 'macOS'
    : /linux/i.test(ua) ? 'Linux'
    : 'سایر';
  return { device, browser, os };
}

function classifySource(referrerHost: string | null, utmMedium: string | null) {
  const medium = (utmMedium || '').toLowerCase();
  if (/cpc|ppc|paid|ads?$/.test(medium)) return 'تبلیغات';
  if (/social/.test(medium)) return 'شبکه‌های اجتماعی';
  if (/email/.test(medium)) return 'ایمیل';
  if (!referrerHost) return 'مستقیم';
  if (SEARCH_RE.test(referrerHost)) return 'جستجو';
  if (SOCIAL_RE.test(referrerHost)) return 'شبکه‌های اجتماعی';
  return 'سایت‌های دیگر';
}

function isSameOrigin(request: Request, url: URL) {
  const origin = request.headers.get('origin');
  if (!origin) return request.headers.get('sec-fetch-site') === 'same-origin';
  try {
    return new URL(origin).host === url.host;
  } catch {
    return false;
  }
}

// Always answers 204: analytics must never surface an error to a visitor
export async function handleCollect(request: Request, env: Env, url: URL): Promise<Response> {
  const done = new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
  if (request.method !== 'POST' || !env.DB || !isSameOrigin(request, url)) return done;

  const ua = request.headers.get('user-agent') || '';
  if (!ua || BOT_RE.test(ua)) return done;

  try {
    const text = await request.text();
    if (text.length > MAX_BODY_CHARS) return done;
    const body = JSON.parse(text);
    if (!ID_RE.test(body?.v) || !ID_RE.test(body?.s) || !Array.isArray(body?.ev)) return done;

    await ensureSchema(env.DB);
    await store(env.DB, request, url, ua, body);
  } catch (err) {
    console.error('collect failed', err);
  }
  return done;
}

async function store(db: D1Database, request: Request, url: URL, ua: string, body: any) {
  const now = Date.now();
  const { device, browser, os } = parseUa(ua);
  const cf = (request.cf || {}) as { country?: string; region?: string; city?: string };
  const ctx = body.c && typeof body.c === 'object' ? body.c : {};

  let referrerHost: string | null = null;
  try {
    const host = new URL(str(ctx.ref, 500) || '').hostname.replace(/^www\./, '');
    referrerHost = host && host !== url.hostname.replace(/^www\./, '') ? host.slice(0, 120) : null;
  } catch {
    // no or malformed referrer counts as direct
  }
  const utmMedium = str(ctx.um, 60);

  const events = body.ev
    .slice(0, MAX_BATCH)
    .filter((e: any) => e && EVENT_TYPES.has(e.t))
    .map((e: any) => {
      const age = Math.min(Math.max(num(e.d) ?? 0, 0), 3_600_000);
      const ts = now - age;
      return {
        ts, day: tehranDay(ts), type: e.t as string,
        name: str(e.n, 80), label: str(e.l, 160), value: num(e.v), x: num(e.x), y: num(e.y),
      };
    });

  const count = (types: string[]) => events.filter((e: any) => types.includes(e.type)).length;
  const engaged = Math.min(Math.max(num(body.e) ?? 0, 0), 600_000);
  const scroll = Math.min(Math.max(num(body.m) ?? 0, 0), 100);

  const session = await db.prepare(
    `INSERT INTO sessions (id, visitor, day, hour, first_ts, last_ts, is_new, country, region, city, device, browser, os, screen, lang,
       source, referrer, utm_source, utm_medium, utm_campaign, landing, events, clicks, pageviews, conversions, max_scroll, engaged_ms)
     VALUES (?1, ?2, ?3, ?4, ?5, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?23, ?24, ?25, ?26)
     ON CONFLICT(id) DO UPDATE SET
       last_ts = MAX(last_ts, excluded.last_ts), events = events + excluded.events, clicks = clicks + excluded.clicks,
       pageviews = pageviews + excluded.pageviews, conversions = conversions + excluded.conversions,
       max_scroll = MAX(max_scroll, excluded.max_scroll), engaged_ms = engaged_ms + excluded.engaged_ms
     RETURNING events, device`,
  ).bind(
    body.s, body.v, tehranDay(now), tehranHour(now), now, body.n ? 1 : 0,
    str(cf.country, 8), str(cf.region, 80), str(cf.city, 80), device, browser, os, str(ctx.sc, 20), str(ctx.la, 20),
    classifySource(referrerHost, utmMedium), referrerHost, str(ctx.us, 60), utmMedium, str(ctx.uc, 80), str(ctx.p, 200),
    events.length, count(['click']), count(['pageview']), count(CONVERSION_TYPES), scroll, engaged,
  ).first<{ events: number; device: string }>();

  if (!events.length || (session?.events ?? 0) > MAX_SESSION_EVENTS) return;

  const insert = db.prepare(
    'INSERT INTO events (session, ts, day, type, name, label, value, x, y, device) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  );
  await db.batch(events.map((e: any) =>
    insert.bind(body.s, e.ts, e.day, e.type, e.name, e.label, e.value, e.x, e.y, session?.device ?? device),
  ));
}

const RETENTION_DAYS = 400;

export async function cleanup(env: Env) {
  if (!env.DB) return;
  await ensureSchema(env.DB);
  const cutoff = tehranDay(Date.now() - RETENTION_DAYS * 86_400_000);
  await env.DB.batch([
    env.DB.prepare('DELETE FROM events WHERE day < ?').bind(cutoff),
    env.DB.prepare('DELETE FROM sessions WHERE day < ?').bind(cutoff),
    env.DB.prepare('DELETE FROM login_attempts WHERE ts < ?').bind(Date.now() - 86_400_000),
  ]);
}
