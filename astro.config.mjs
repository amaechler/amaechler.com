// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkSmartypants from "remark-smartypants";
import { site } from "./src/data/siteMetadata";

const smartypants = /** @type {any} */ (remarkSmartypants);

// https://astro.build/config
export default defineConfig({
    site: site.siteUrl,
    integrations: [sitemap()],
    markdown: {
        shikiConfig: { theme: "github-light" },
        remarkPlugins: [smartypants]
    }
});
