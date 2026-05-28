# extralife (amaechler.com)

Personal blog built with [Astro](https://astro.build/). Site title is "extralife".

- Hosted on GitHub Pages, auto-deployed via GitHub Actions on push to `master`
- Domain registered at [GoDaddy](https://ca.godaddy.com/)
- DNS pointing to [Cloudflare](https://www.cloudflare.com) CDN

## Structure

- Blog content: `src/content/blog/<slug>.md`
- Templates: `src/pages/` (file-based routing)
- Global styles: `src/styles/global.css`

## Development

```sh
pnpm dev            # Astro dev server with hot reload
pnpm build          # production build (includes CNAME for custom domain)
pnpm preview        # serve production build locally
```

## Adding a blog post

Create a new markdown file in `src/content/blog/`. Frontmatter must include `title` and `date`.

```
src/content/blog/my-new-post.md
```

## Deployment

The site auto-deploys on every push to `master` via GitHub Actions. To deploy manually:

```sh
gh workflow run gh-pages.yml
```

This requires appropriate repository permissions for workflow dispatch.
