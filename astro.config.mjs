import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  adapter: cloudflare(),
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
});
