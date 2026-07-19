# AGENTS.md

Instructions for agents working in this repository.

## Project Overview

This is an Eleventy static travel blog for `umamisavvy.com`, deployed via Cloudflare
Workers Builds (git-connected), which builds and deploys with Wrangler rather than
classic Cloudflare Pages.

- Source content lives in `_posts/`, `_drafts/`, root page templates, `_includes/`, `_data/`, `css/`, `js/`, `img/`, and `fonts/`.
- Eleventy writes the generated site to `_site/`.
- Cloudflare builds with `npm run build`, then deploys with `npx wrangler deploy`, which reads `wrangler.jsonc` and publishes `_site` as static assets.
- The project still contains legacy Clean Blog/Jekyll-era files; do not remove or modernize them unless the task specifically requires it.

## Commands

- Install dependencies: `npm ci`
- Run locally: `npm run serve`
- Build for production: `npm run build`
- There is no meaningful test suite currently; `npm test` is a placeholder that exits with failure.

Always run `npm run build` after changing templates, data, posts, assets referenced by templates, or Eleventy config.

## Editing Rules

- Do not manually edit `_site/`; it is generated output. Change source files and rebuild instead.
- Do not commit `node_modules/`.
- Keep edits narrowly scoped to the requested change.
- Prefer existing Eleventy, Nunjucks, Markdown, Bootstrap, and Clean Blog patterns over introducing new frameworks.
- Keep source files ASCII unless an existing file already uses non-ASCII content or the travel content requires proper names in another language.
- Preserve existing URLs and post slugs unless the task explicitly asks for a migration.

## Content Rules

- Published posts belong in `_posts/`.
- Draft or unfinished posts belong in `_drafts/`; Eleventy ignores `_drafts/**`.
- Post filenames should keep the existing date-slug pattern: `YYYY-MM-DD-post-slug.md`.
- Posts should include destination metadata when they are part of a destination collection:

```yaml
destination: japan
```

- Destination labels, ids, and URLs are managed in `_data/destinations.json`.
- Destination listing pages are generated through `destinations.njk` and `_data/destinationPages.js`.
- Preserve travel-log voice and personal chronology when editing posts. Avoid rewriting content into generic SEO copy unless asked.

## Templates and Styles

- Layouts live in `_includes/layouts`.
- Reusable template partials live in `_includes`.
- Runtime styles are loaded from `css/clean-blog.css`.
- If editing theme styles, keep related changes synchronized with `less/clean-blog.less` when applicable.
- Static assets are passed through from `css`, `js`, `img`, and `fonts` in `.eleventy.js`.

## Cloudflare Deployment

Use these deployment assumptions unless the user says otherwise:

```text
Build command: npm run build
Deploy command: npx wrangler deploy
Root directory: /
```

`wrangler.jsonc` at the repo root configures the Worker (`name`, `compatibility_date`)
and points `assets.directory` at `_site`.

Do not add Cloudflare-specific runtime code, server-side Worker logic, or
environment-variable dependencies unless explicitly requested. This site should
remain statically generated — the Worker only serves static assets.

## Verification

Before finishing changes that affect the site:

1. Run `npm run build`.
2. Check the build output for Eleventy errors, broken template data, or missing assets.
3. For visual/layout changes, run `npm run serve` and inspect the affected pages in a browser when feasible.

