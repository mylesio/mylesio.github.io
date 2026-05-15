import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import llmstxt from 'astro-llmstxt';

export default defineConfig({
  site: 'https://mylesio.github.io',
  integrations: [
    sitemap(),
    llmstxt({
      title: "Myles Liu's Knowledge Base",
      description: 'Frontend engineer at Meituan. Notes on AI, engineering, and building things.',
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
