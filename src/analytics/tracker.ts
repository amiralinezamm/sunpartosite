// First-party analytics for the private /admin dashboard. Stores no names, phone numbers,
// form contents or IP addresses; visitors are identified only by a random id in localStorage.

const ENDPOINT = '/api/t';
const FLUSH_MS = 15_000;
const SESSION_IDLE_MS = 30 * 60_000;
const ACTIVE_WINDOW_MS = 30_000;
const TICK_MS = 5_000;
const MAX_ERRORS = 5;

type QueuedEvent = {
  t: string; at: number; n?: string; l?: string; v?: number; x?: number; y?: number;
};

let enabled = false;
let visitorId = '';
let sessionId = '';
let isNewVisitor = false;
let context: Record<string, string> = {};
let queue: QueuedEvent[] = [];
let pendingEngagedMs = 0;
let maxScroll = 0;
let lastActivity = 0;

const randomId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => (b % 36).toString(36)).join('');

const storage = {
  get(key: string) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string) {
    try { localStorage.setItem(key, value); } catch { /* private mode: ids last for this page only */ }
  },
  remove(key: string) {
    try { localStorage.removeItem(key); } catch { /* nothing stored */ }
  },
};

// Anywhere in the app can call this; it is a no-op on the server and for excluded browsers
export function track(type: string, name?: string, label?: string, value?: number) {
  if (!enabled) return;
  queue.push({ t: type, at: Date.now(), n: name, l: label, v: value });
  if (queue.length >= 30) flush();
}

function flush(useBeacon = false) {
  if (!enabled) return;
  const engaged = Math.round(pendingEngagedMs);
  if (!queue.length && engaged < 1000) return;

  const now = Date.now();
  const batch = queue.splice(0, 40);
  pendingEngagedMs = 0;
  touchSession(now);
  const body = JSON.stringify({
    v: visitorId, s: sessionId, n: isNewVisitor ? 1 : 0, c: context, e: engaged, m: maxScroll,
    ev: batch.map(({ at, ...e }) => ({ ...e, d: now - at })),
  });
  const sent = useBeacon && navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'application/json' }));
  if (!sent) {
    fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'content-type': 'application/json' } }).catch(() => {});
  }
}

function touchSession(now: number) {
  storage.set('sp_session', JSON.stringify({ id: sessionId, last: now }));
}

function identify() {
  const stored = storage.get('sp_vid');
  isNewVisitor = !stored;
  visitorId = stored || randomId();
  if (!stored) storage.set('sp_vid', visitorId);

  const now = Date.now();
  let session: { id?: string; last?: number } = {};
  try { session = JSON.parse(storage.get('sp_session') || '{}'); } catch { /* start a new session */ }
  sessionId = session.id && now - (session.last ?? 0) < SESSION_IDLE_MS ? session.id : randomId();
  touchSession(now);
}

function buildContext() {
  const params = new URLSearchParams(location.search);
  const take = (key: string) => params.get(key) || '';
  context = {
    p: location.pathname, ref: document.referrer, sc: `${screen.width}x${screen.height}`, la: navigator.language || '',
    us: take('utm_source'), um: take('utm_medium'), uc: take('utm_campaign'),
  };
}

const placeOf = (el: Element) => {
  if (el.closest('.fixed')) return 'floating';
  const area = el.closest('section[id], header, footer');
  return area ? area.id || area.tagName.toLowerCase() : 'page';
};

function labelOf(el: Element) {
  const text = el.getAttribute('aria-label') || el.getAttribute('title') || (el as HTMLElement).innerText || '';
  return text.replace(/\s+/g, ' ').trim().slice(0, 100);
}

function watchClicks() {
  let recent: { at: number; x: number; y: number }[] = [];
  let rageSent = 0;

  document.addEventListener('click', (e) => {
    const target = e.target as Element | null;
    if (!target?.closest) return;
    const area = target.closest('section[id], header, footer');
    const rect = area?.getBoundingClientRect();
    const control = target.closest('a, button, [role="button"], summary, select');
    queue.push({
      t: 'click', at: Date.now(), n: placeOf(target), l: control ? labelOf(control) : undefined,
      x: Math.round((e.clientX / innerWidth) * 1000) / 10,
      y: rect && rect.height ? Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10 : undefined,
    });

    const link = target.closest('a');
    const href = link?.getAttribute('href') || '';
    if (href.startsWith('tel:')) track('call_click', placeOf(link!), labelOf(link!));
    else if (/wa\.me|whatsapp/i.test(href)) track('whatsapp_click', placeOf(link!), labelOf(link!));
    else if (/^https?:/.test(href) && !href.includes(location.host)) track('outbound', placeOf(link!), new URL(href).hostname);

    const now = Date.now();
    recent = recent.filter((c) => now - c.at < 800 && Math.abs(c.x - e.clientX) < 30 && Math.abs(c.y - e.clientY) < 30);
    recent.push({ at: now, x: e.clientX, y: e.clientY });
    if (recent.length >= 3 && now - rageSent > 3000) {
      rageSent = now;
      track('rage', placeOf(target), control ? labelOf(control) : undefined);
    }

    if (target.closest('#calculator')) oncePerPage('calc_use');
    // Conversion clicks open another app, which can kill the page before the next timer
    if (href.startsWith('tel:') || /wa\.me|whatsapp/i.test(href)) flush(true);
  }, { capture: true, passive: true });

  document.addEventListener('focusin', (e) => {
    const target = e.target as Element | null;
    if (target?.closest?.('#contact form')) oncePerPage('form_start');
    if (target?.closest?.('#calculator')) oncePerPage('calc_use');
  }, { passive: true });
}

const seen = new Set<string>();
function oncePerPage(type: string) {
  if (seen.has(type)) return;
  seen.add(type);
  track(type);
}

function watchSections() {
  if (!('IntersectionObserver' in window)) return;
  const viewed = new Set<string>();
  const seconds: Record<string, number> = {};
  let current: string | null = null;

  // The zero-height band at mid-viewport means exactly one section counts as being read
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        current = id;
        if (!viewed.has(id)) {
          viewed.add(id);
          track('section_view', id);
        }
      } else if (current === id) {
        current = null;
      }
    }
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
  document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));

  const sendTimes = () => {
    for (const [id, secs] of Object.entries(seconds)) {
      if (secs >= 1) track('section_time', id, undefined, Math.round(secs));
      delete seconds[id];
    }
  };

  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    const active = Date.now() - lastActivity < ACTIVE_WINDOW_MS;
    if (!active) return;
    pendingEngagedMs += TICK_MS;
    if (current) seconds[current] = (seconds[current] ?? 0) + TICK_MS / 1000;
  }, TICK_MS);

  setInterval(() => {
    if (document.visibilityState === 'visible') {
      sendTimes();
      flush();
    }
  }, FLUSH_MS);

  const leave = () => {
    sendTimes();
    flush(true);
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') leave();
  });
  addEventListener('pagehide', leave);
}

function watchActivity() {
  lastActivity = Date.now();
  const mark = () => { lastActivity = Date.now(); };
  ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel'].forEach((name) =>
    addEventListener(name, mark, { passive: true }),
  );

  const marks = [25, 50, 75, 100];
  let ticking = false;
  const measure = () => {
    ticking = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.min(100, Math.round((scrollY / scrollable) * 100));
    for (const m of marks) {
      if (pct >= m && maxScroll < m) track('scroll', String(m));
    }
    maxScroll = Math.max(maxScroll, pct);
  };
  addEventListener('scroll', () => {
    mark();
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(measure);
    }
  }, { passive: true });
}

function watchPerformance() {
  addEventListener('load', () => {
    setTimeout(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (nav) {
        track('perf', 'ttfb', undefined, Math.round(nav.responseStart));
        track('perf', 'load', undefined, Math.round(nav.loadEventEnd || performance.now()));
      }
    }, 0);
  });

  let lcp = 0;
  let cls = 0;
  try {
    new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1);
      if (last) lcp = last.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as any[]) if (!e.hadRecentInput) cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
  } catch { /* older browsers lack these entry types */ }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'hidden' || seen.has('perf_vitals')) return;
    seen.add('perf_vitals');
    if (lcp) track('perf', 'lcp', undefined, Math.round(lcp));
    track('perf', 'cls', undefined, Math.round(cls * 1000) / 1000);
  }, { capture: true });
}

function watchErrors() {
  let count = 0;
  const report = (message: string) => {
    if (++count <= MAX_ERRORS) track('error', 'js', message.slice(0, 150));
  };
  addEventListener('error', (e) => {
    if (e.message) report(`${e.message} @${(e.filename || '').split('/').pop()}:${e.lineno}`);
  });
  addEventListener('unhandledrejection', (e) => report(`promise: ${String((e as PromiseRejectionEvent).reason)}`));
}

export function initAnalytics() {
  const flag = new URLSearchParams(location.search).get('notrack');
  if (flag === '1') storage.set('sp_notrack', '1');
  if (flag === '0') storage.remove('sp_notrack');
  if (storage.get('sp_notrack') === '1') return;

  enabled = true;
  identify();
  buildContext();
  track('pageview', location.pathname);
  watchActivity();
  watchClicks();
  watchSections();
  watchPerformance();
  watchErrors();
  flush();
}
