# AGENTS.md — extralife (amaechler.com)

**What this is:** Static personal blog built with Gatsby v4 + React 17. No tests. No linter (only Prettier).

## Commands

| Script | What it does |
| --- | --- |
| `yarn start` | `gatsby develop` — dev server with hot reload |
| `yarn build` | `gatsby build && yarn add-domain` — writes `CNAME` to `public/` |
| `yarn serve` | `gatsby serve` — serves production build locally |
| `yarn deploy` | `yarn clobber && yarn build && gh-pages -d public && yarn clobber` |
| `yarn clobber` | `gatsby clean && shx rm -rf public .cache` |
| `yarn format` | Prettier over all source files |

## Content

- Blog posts live in `content/blog/<slug>/index.md` — the directory structure becomes the URL path via `createFilePath` in `gatsby-node.js`.
- New post = new directory under `content/blog/` with an `index.md`. Frontmatter must include `title` and `date`.
- Template: `src/templates/blog-post.js`.

## Architecture notes

- Default branch is `master` (CI workflows target `master`).
- Site title is `extralife` (configured in `gatsby-config.js` `siteMetadata.title`).
- Blog post ordering in RSS and listing is by `frontmatter.date` ascending (oldest first).
- `gatsby-node.js` `createSchemaCustomization` defines the GraphQL types for `MarkdownRemark` frontmatter and `Fields` — keep these in sync with actual frontmatter fields.

## Styling / formatting

- Prettier only. No ESLint or TypeScript.
- JS/TS/JSON formatting: 4-space indent, arrowParens avoid, trailingComma none, printWidth 120.
- JSON/YAML formatting: 2-space indent (via Prettier override).
- Global styles loaded in `gatsby-browser.js`: `normalize.css`, `style.css`, `prism.css`, Montserrat + Merriweather typefaces.

## Deployment

- Hosted on GitHub Pages (deployed to `gh-pages` branch via `gh-pages` npm package).
- Custom domain `amaechler.com` via Cloudflare → GoDaddy.
- `yarn add-domain` step in `build` writes `public/CNAME`.
