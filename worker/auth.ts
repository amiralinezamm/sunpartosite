import { Env, ensureSchema, json } from './shared';

const COOKIE = 'sp_admin';
const SESSION_MS = 30 * 86_400_000;
const WINDOW_MS = 15 * 60_000;
const MAX_FAILS = 8;

const encoder = new TextEncoder();
const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

async function hmac(secret: string, message: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, encoder.encode(message)));
}

// Compares fixed-length digests so timing does not reveal how much of the input matched
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function isAuthed(request: Request, env: Env) {
  if (!env.ADMIN_PASSWORD) return false;
  const cookie = (request.headers.get('cookie') || '').split(/;\s*/).find((c) => c.startsWith(COOKIE + '='));
  const [exp, sig] = (cookie?.slice(COOKIE.length + 1) || '').split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(env.ADMIN_PASSWORD, exp));
}

export async function handleLogin(request: Request, env: Env) {
  if (request.method !== 'POST') return json({ error: 'method' }, 405);
  if (!env.ADMIN_PASSWORD) return json({ error: 'not_configured' }, 503);
  if (!env.DB) return json({ error: 'no_database' }, 503);
  await ensureSchema(env.DB);

  const ipHash = await hmac(env.ADMIN_PASSWORD, request.headers.get('cf-connecting-ip') || 'local');
  const since = Date.now() - WINDOW_MS;
  const fails = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE ip_hash = ? AND ts > ?')
    .bind(ipHash, since).first<{ n: number }>();
  if ((fails?.n ?? 0) >= MAX_FAILS) return json({ error: 'too_many' }, 429);

  const body = await request.json<{ password?: unknown }>().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';
  const ok = safeEqual(await hmac(env.ADMIN_PASSWORD, password), await hmac(env.ADMIN_PASSWORD, env.ADMIN_PASSWORD));
  if (!ok) {
    await env.DB.prepare('INSERT INTO login_attempts (ip_hash, ts) VALUES (?, ?)').bind(ipHash, Date.now()).run();
    return json({ error: 'wrong_password' }, 401);
  }

  const exp = String(Date.now() + SESSION_MS);
  const value = `${exp}.${await hmac(env.ADMIN_PASSWORD, exp)}`;
  return json({ ok: true }, 200, {
    'set-cookie': `${COOKIE}=${value}; Path=/; Max-Age=${SESSION_MS / 1000}; HttpOnly; Secure; SameSite=Strict`,
  });
}

export const logoutResponse = () =>
  json({ ok: true }, 200, { 'set-cookie': `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict` });
