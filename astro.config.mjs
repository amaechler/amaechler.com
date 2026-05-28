// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkSmartypants from "remark-smartypants";

const smartypants = /** @type {any} */ (remarkSmartypants);

// https://astro.build/config
export default defineConfig({
    site: "https://amaechler.com/",
    integrations: [sitemap()],
    markdown: {
        syntaxHighlight: "prism",
        remarkPlugins: [smartypants]
    }
});
