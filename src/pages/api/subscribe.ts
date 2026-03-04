export const prerender = false;

import type { APIRoute } from 'astro';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROD_ORIGIN = 'https://martinwayforpeople.org';
const LOCALHOST_RE = /^http:\/\/localhost(:\d+)?$/;

async function hashIP(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(salt + ip);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sendNotification(env: Env, email: string): Promise<void> {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Martin Way for People <notifications@martinwayforpeople.org>',
      to: [env.NOTIFY_EMAIL],
      subject: 'New signup: comment notification list',
      text: `${email} signed up for comment notifications.`,
    }),
  });

  if (!res.ok) console.error('Resend API error:', res.status);
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { env, ctx } = locals.runtime;

  // CSRF: check Origin header, fall back to Referer for browsers that strip Origin
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const hasValidOrigin = origin === PROD_ORIGIN || LOCALHOST_RE.test(origin);
  let hasValidReferer = false;
  if (referer) {
    try { hasValidReferer = referer.startsWith(PROD_ORIGIN) || LOCALHOST_RE.test(new URL(referer).origin); } catch {}
  }
  if (!hasValidOrigin && !hasValidReferer) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Parse body
  let email: string;
  const contentType = request.headers.get('content-type') || '';
  const isJSON = contentType.includes('application/json');
  if (isJSON) {
    try {
      const body = await request.json() as { email?: string };
      email = (body.email || '').trim().toLowerCase();
    } catch {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }
  } else {
    try {
      const form = await request.formData();
      email = (form.get('email')?.toString() || '').trim().toLowerCase();
    } catch {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }

  // Validate
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Please enter a valid email address.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Hash IP for privacy
  if (!env.IP_HASH_SALT) {
    console.error('IP_HASH_SALT is not configured');
    return new Response(
      JSON.stringify({ ok: false, error: 'Server configuration error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const ipHash = await hashIP(ip, env.IP_HASH_SALT);

  // Rate-limited insert: atomic check-and-insert via SQL subquery to avoid TOCTOU race
  const successMsg = "You're signed up! We'll notify you when the comment window opens.";
  const successRedirect = new URL('/', request.url);
  successRedirect.searchParams.set('subscribed', '1');
  successRedirect.hash = 'action';

  try {
    const result = await env.DB.prepare(
      `INSERT INTO subscribers (email, ip_hash)
       SELECT ?, ?
       WHERE (SELECT COUNT(*) FROM subscribers WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')) < 5`
    ).bind(email, ipHash, ipHash).run();

    if (result.meta.changes === 0) {
      // Rate limit exceeded — the WHERE clause prevented the insert
      return new Response(
        JSON.stringify({ ok: false, error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '3600' } },
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('UNIQUE constraint failed')) {
      if (!isJSON) return Response.redirect(successRedirect.toString(), 303);
      return new Response(
        JSON.stringify({ ok: true, message: successMsg }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    return new Response(
      JSON.stringify({ ok: false, error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Best-effort email notification
  ctx.waitUntil(sendNotification(env, email).catch(err => console.error('Notification failed:', err)));

  if (!isJSON) return Response.redirect(successRedirect.toString(), 303);
  return new Response(
    JSON.stringify({ ok: true, message: successMsg }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};

// Reject non-POST methods (Astro handles unmatched methods with 405 by default,
// but explicit GET export ensures a clear response for the most common case)
export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({ ok: false, error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } },
  );
};
