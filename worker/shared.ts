export interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
  ADMIN_PASSWORD?: string;
}

// Iran has no DST since 1401, so a fixed offset keeps day and hour buckets on Tehran time
const TEHRAN_OFFSET_MS = 3.5 * 60 * 60 * 1000;

export const tehranDay = (ts: number) => new Date(ts + TEHRAN_OFFSET_MS).toISOString().slice(0, 10);
export const tehranHour = (ts: number) => new Date(ts + TEHRAN_OFFSET_MS).getUTCHours();

export const CONVERSION_TYPES = ['call_click', 'whatsapp_click', 'form_submit'];

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY, visitor TEXT NOT NULL, day TEXT NOT NULL, hour INTEGER NOT NULL,
    first_ts INTEGER NOT NULL, last_ts INTEGER NOT NULL, is_new INTEGER NOT NULL DEFAULT 0,
    country TEXT, region TEXT, city TEXT, device TEXT, browser TEXT, os TEXT, screen TEXT, lang TEXT,
    source TEXT, referrer TEXT, utm_source TEXT, utm_medium TEXT, utm_campaign TEXT, landing TEXT,
    events INTEGER NOT NULL DEFAULT 0, clicks INTEGER NOT NULL DEFAULT 0, pageviews INTEGER NOT NULL DEFAULT 0,
    conversions INTEGER NOT NULL DEFAULT 0, max_scroll INTEGER NOT NULL DEFAULT 0, engaged_ms INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE INDEX IF NOT EXISTS sessions_day ON sessions(day)`,
  `CREATE INDEX IF NOT EXISTS sessions_last ON sessions(last_ts)`,
  `CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT, session TEXT NOT NULL, ts INTEGER NOT NULL, day TEXT NOT NULL,
    type TEXT NOT NULL, name TEXT, label TEXT, value REAL, x REAL, y REAL, device TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS events_day_type ON events(day, type)`,
  `CREATE INDEX IF NOT EXISTS events_session ON events(session)`,
  `CREATE TABLE IF NOT EXISTS login_attempts (ip_hash TEXT NOT NULL, ts INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS login_attempts_ip ON login_attempts(ip_hash, ts)`,
];

let schemaReady = false;

export async function ensureSchema(db: D1Database) {
  if (schemaReady) return;
  await db.batch(SCHEMA.map((sql) => db.prepare(sql)));
  schemaReady = true;
}

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
