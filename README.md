# amaechler.com

- Blog using [Gatsby](https://www.gatsbyjs.org/)
- Hosted on Github Pages, deployed using [`gh-pages`](https://github.com/tschaub/gh-pages)
- Domain registered at [GoDaddy](https://ca.godaddy.com/)
- DNS pointing to [Cloudflare](https://www.cloudflare.com) CDN

## How to develop

```sh
yarn develop
```

## How to deploy

To deploy a new version, run

```sh
yarn deploy
```

 `yarn deploy` will

- trigger a clean gatsby build
- use `gh-pages` to commit and push the build output to the `gh-pages` branch on GitHub (which is tied to GitHub Pages)
- run `yarn clobber` to cleanup
