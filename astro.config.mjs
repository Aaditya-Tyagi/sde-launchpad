// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  // Output a static, fully offline-capable site.
  output: 'static',
  // Pretty, predictable URLs that also behave well when self-hosted.
  trailingSlash: 'ignore',
  // Prefetch internal links as they enter the viewport → near-instant
  // lesson navigation, with zero backend.
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  build: { inlineStylesheets: 'auto' },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  devToolbar: { enabled: false },
});
