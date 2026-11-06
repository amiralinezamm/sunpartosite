import dashboardHtml from './dashboard.html';
import { handleLogin, isAuthed, logoutResponse } from './auth';
import { cleanup, handleCollect } from './collect';
import { handleAdminApi } from './reports';
import { Env, json } from './shared';

function dashboard() {
  const nonce = crypto.randomUUID().replace(/-/g, '');
  return new Response(dashboardHtml.replaceAll('__NONCE__', nonce), {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
      'referrer-policy': 'no-referrer',
      'x-content-type-options': 'nosniff',
      'content-security-policy': [
        `default-src 'self'`,
        `script-src 'nonce-${nonce}'`,
        `style-src 'self' 'unsafe-inline'`,
        `img-src 'self' data:`,
        `frame-src 'self'`,
        `frame-ancestors 'none'`,
        `base-uri 'none'`,
        `form-action 'none'`,
      ].join('; '),
    },
  });
}

export default {
  async fetch(request, env, _ctx): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === '/api/t') return handleCollect(request, env, url);
    if (pathname === '/admin' || pathname === '/admin/') return dashboard();
    if (pathname === '/api/admin/login') return handleLogin(request, env);

    if (pathname.startsWith('/api/admin/')) {
      if (!(await isAuthed(request, env))) {
        return json({ error: env.ADMIN_PASSWORD ? 'unauthorized' : 'not_configured' }, 401);
      }
      const path = pathname.slice('/api/admin/'.length);
      if (path === 'logout') return request.method === 'POST' ? logoutResponse() : json({ error: 'method' }, 405);
      if (path === 'me') return json({ ok: true });
      return handleAdminApi(path, url, env);
    }

    if (pathname.startsWith('/api/') || pathname.startsWith('/admin/')) return json({ error: 'not_found' }, 404);
    return env.ASSETS.fetch(request);
  },

  async scheduled(_event, env, _ctx) {
    await cleanup(env);
  },
} satisfies ExportedHandler<Env>;
