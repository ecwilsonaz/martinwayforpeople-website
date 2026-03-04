export const prerender = false;

import type { APIRoute } from 'astro';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function hashIP(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sendNotification(env: Env, email: string, ctx: ExecutionContext) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return;

  const promise = fetch('https://api.resend.com/emails', {
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

  ctx.waitUntil(promise);
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { env, ctx } = locals.runtime;

  // Parse body
  let email: string;
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await request.json() as { email?: string };
    email = (body.email || '').trim().toLowerCase();
  } else {
    const form = await request.formData();
    email = (form.get('email')?.toString() || '').trim().toLowerCase();
  }

  // Validate
  if (!email || !EMAIL_RE.test(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Please enter a valid email address.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Hash IP for privacy
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
  const ipHash = await hashIP(ip);

  // Insert into D1
  try {
    await env.DB.prepare(
      'INSERT INTO subscribers (email, ip_hash) VALUES (?, ?)'
    ).bind(email, ipHash).run();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('UNIQUE constraint failed')) {
      return new Response(
        JSON.stringify({ ok: true, message: "You're already signed up — we'll be in touch!" }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    return new Response(
      JSON.stringify({ ok: false, error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Best-effort email notification
  sendNotification(env, email, ctx);

  return new Response(
    JSON.stringify({ ok: true, message: "You're signed up! We'll notify you when the comment window opens." }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};

// Reject other methods
export const ALL: APIRoute = () => {
  return new Response(
    JSON.stringify({ ok: false, error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } },
  );
};
