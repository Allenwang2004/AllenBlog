# AllenBlog

A personal blog / resume site built with Next.js 12 and Contentlayer. Content is written in MDX, with a bilingual (Chinese / English) UI.

## Tech Stack

- **Framework**: Next.js 12 (Pages Router, not App Router)
- **Content**: [Contentlayer](https://www.contentlayer.dev/) — compiles `content/posts/*.mdx` into typed `Post` objects at build time
- **Styling**: Tailwind CSS (`@tailwindcss/typography` for article typography, `next-themes` for dark mode)
- **i18n**: `next-i18next` (UI copy) + Next.js's built-in `i18n` routing (`en` / `zh-TW`)
- **Other**: `kbar` (command palette / search), `@giscus/react` (comments), `resend` (email subscribe API), `next-sitemap`, RSS/Atom/JSON feed generation

## Directory Structure

```
content/posts/           # Article source (.mdx), scanned by Contentlayer at build time
contentlayer.config.ts   # Post schema (title, date, language, descriptionEn...)
src/
  pages/                 # Next.js routes
    index.tsx            # Homepage (hero, work experience, latest posts)
    page/[page].tsx       # Paginated post list
    posts/[slug].tsx      # Single post page
    resume.tsx            # Resume page
    [...pathToRedirectFrom].tsx  # Legacy URL redirects
    api/                  # API routes (e.g. subscribe.ts)
  components/            # UI components (Header, Footer, PostBody, CommandPalette, WorkExperienceSection...)
  configs/               # Site-wide constants (siteConfigs, i18nConfigs, headerConfigs, workExperienceConfigs...)
  lib/                   # Utilities (contentLayerAdapter, generateRSS, formatDate...)
  plugins/               # Custom rehype/remark plugins (imageMetadata)
public/
  locales/{en,zh-TW}/    # next-i18next UI translation strings (JSON)
  resume.pdf             # Resume PDF, embedded via iframe on the resume page
```

## Content Rendering Flow

1. `content/posts/*.mdx` → Contentlayer (`contentlayer.config.ts`) parses frontmatter and body at build time, producing typed data under `.contentlayer/generated`.
2. `src/lib/contentLayerAdapter.js` exports `allPostsNewToOld`, consumed by `index.tsx`, `page/[page].tsx`, etc., sorted by date.
3. `posts/[slug].tsx` uses `getStaticPaths` / `getStaticProps` to fetch a single post by slug and renders it via `PostLayout` + `PostBody` (MDX, with rehype-slug and rehype-prism-plus for heading anchors and code highlighting).

## i18n Design

"UI copy" and "article content" are two independent localization mechanisms:

### 1. UI copy (`next-i18next`)
- `next-i18next.config.js` declares `locales: ['en', 'zh-TW']`. This config is read by `next.config.mjs` and passed to Next.js's built-in `i18n` router, so URLs are automatically prefixed by locale.
- Per-locale UI strings live in `public/locales/{locale}/*.json` (e.g. `common.json`, `indexPage.json`), split by namespace.
- Each page's `getStaticProps` calls `serverSideTranslations(locale, [...namespaces])` to serialize the matching translation JSON into props; components read strings via `useTranslation()`'s `t()`.
- `LanguageSwitch.tsx` toggles `en` ↔ `zh-TW` via `next/link`'s `locale` prop, preserving the current `pathname`/`query`.

### 2. Article content (Contentlayer `language` + `descriptionEn` fields)
- `contentlayer.config.ts` defines a `language` enum field on `Post` (options from `src/configs/i18nConfigs.ts`'s `LOCALES`, default `zh-TW`), letting each `.mdx` declare what language its body is written in.
- Post bodies are **not** filtered by the active UI locale — the same `allPostsNewToOld` list is shown regardless of `/en` or `/zh-TW`, with a small language badge (rendered by `PostList.tsx`) indicating each post's actual language.
- An optional `descriptionEn` frontmatter field lets a post's card summary follow the UI locale even when the full body hasn't been translated: `index.tsx` / `page/[page].tsx` pick `descriptionEn` when `locale === 'en'` and it exists, falling back to `description` otherwise.

### 3. Resume page (`resume.tsx`)
- Single version only — title/description are hardcoded in Chinese, and the same `public/resume.pdf` is embedded via iframe regardless of locale.

## Homepage Layout

The homepage (`index.tsx`) is split into full-viewport, scroll-snapped sections (CSS `scroll-snap-type`, scoped to the homepage via a `home-scroll-snap` class toggled on `<html>` in a `useEffect`):

1. **Hero** (`HeroSection.tsx`) — intro and avatar.
2. **Work Experience** (`WorkExperienceSection.tsx`) — expandable cards driven by `src/configs/workExperienceConfigs.ts`.
3. **Latest posts** — post grid (`PostList.tsx`) + pagination, flowing normally past the viewport so the footer stays reachable.

## Main Routes

| Path | Description |
|---|---|
| `/` | Homepage — hero, work experience, latest posts (`POSTS_PER_PAGE = 6`) |
| `/page/[page]` | Paginated post list |
| `/posts/[slug]` | Single post page |
| `/resume` | Resume page (embedded PDF) |
| `/api/subscribe` | Email subscribe API (via Resend) |
