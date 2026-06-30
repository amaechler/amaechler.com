// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/data/siteMetadata";

// https://astro.build/config
export default defineConfig({
    site: site.siteUrl,
    integrations: [sitemap()],
    markdown: {
        // Astro 7 ships Sätteri as the default Markdown processor. Its built-in
        // smart punctuation replaces remark-smartypants; shikiConfig still drives
        // syntax highlighting.
        processor: satteri({ features: { smartPunctuation: true } }),
        shikiConfig: { theme: "one-light" }
    }
});
