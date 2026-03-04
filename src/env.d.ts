/// <reference types="astro/client" />

type D1Database = import('@cloudflare/workers-types').D1Database;

interface Env {
  DB: D1Database;
  RESEND_API_KEY?: string;
  NOTIFY_EMAIL?: string;
  IP_HASH_SALT?: string;
}

declare namespace App {
  interface Locals extends Record<string, unknown> {
    runtime: {
      env: Env;
      cf: Record<string, unknown>;
      ctx: ExecutionContext;
    };
  }
}
