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

The site auto-deploys on every push to `master` via GitHub Actions (using the native GitHub Pages deployment).

### Setup Required on GitHub

To enable native deployments:

1. Go to your repository settings on GitHub (**Settings > Pages**).
2. Under **Build and deployment > Source**, select **GitHub Actions** (instead of "Deploy from a branch").

To deploy manually, you can run:

```sh
gh workflow run gh-pages.yml
```

This requires appropriate repository permissions for workflow dispatch.

## Cloudflare DNS & SSL Settings

Since the site uses a custom apex domain (`amaechler.com`) managed through Cloudflare DNS, configure the following settings:

### 1. DNS Records

Set up the following records in your Cloudflare DNS panel:

- **A Records** (Apex Domain):
    - Type: `A`
    - Name: `@`
    - IPv4 addresses (add all four of GitHub Pages' IPs):
        - `185.199.108.153`
        - `185.199.109.153`
        - `185.199.110.153`
        - `185.199.111.153`
    - Proxy status: **Proxied** (orange cloud) or **DNS Only** (grey cloud).
- _Alternative_: If Cloudflare supports CNAME Flattening, you can create a `CNAME` for `@` pointing to `amaechler.github.io`.

### 2. SSL/TLS Settings

If you enable **Proxied** (orange cloud) on your DNS records:

- Go to the **SSL/TLS** tab in Cloudflare.
- Set the encryption mode to **Full** or **Full (strict)**.
- _Caution_: Do **not** use _Flexible_, as it will cause a redirect loop error (`ERR_TOO_MANY_REDIRECTS`) because Cloudflare will request the site from GitHub Pages over HTTP while GitHub Pages enforces HTTPS redirection.
