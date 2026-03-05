import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Static output with Cloudflare adapter; subscribe.ts uses prerender=false for server-side execution
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  adapter: cloudflare(),
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
});
