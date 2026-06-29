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
  // Prefetch on hover/tap intent only. The lesson sidebar lists ~100 links;
  // a blanket `viewport` + `prefetchAll` strategy downloaded every one of them
  // on page load, saturating the network and main thread. Prev/Next links are
  // opted into eager prefetch individually via `data-astro-prefetch`.
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  devToolbar: { enabled: false },
});
