# umamisavvy.com

Travel log built with [Eleventy](https://www.11ty.dev/).

## Development

Install dependencies:

```bash
npm ci
```

Run a local development server:

```bash
npm run serve
```

Build the static site:

```bash
npm run build
```

The generated site is written to `_site/`.

## Content

Published posts live in `_posts/`. Drafts live in `_drafts/` and are ignored by Eleventy.

Posts use explicit destination metadata:

```yaml
destination: japan
```

Destination labels and URLs are configured in `_data/destinations.json`. Destination listing pages are generated from `destinations.njk`.

## Deployment

The site can be deployed to Cloudflare Pages.

Recommended Cloudflare Pages settings:

```text
Framework preset: Eleventy
Build command: npm run build
Build output directory: _site
Root directory: /
```

For direct upload with Wrangler:

```bash
npm run build
npx wrangler pages deploy _site --project-name=<cloudflare-pages-project-name>
```

## Assets

Header images should be approximately `1900x872` at `72px/inch`.

The site still includes the original Clean Blog CSS/LESS assets. Runtime styles are loaded from `css/clean-blog.css`; keep matching changes in `less/clean-blog.less` when editing theme styles.

## Credits

This blog is based on the Jekyll version of the Clean Blog theme by [Start Bootstrap](http://startbootstrap.com/).
