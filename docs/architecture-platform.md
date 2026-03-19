# Architecture: The Platform (v4 — Lean)

## 1. Tech Stack

| Technology | Pinned Version | Why |
|---|---|---|
| Astro | 5.1.x | Static site generator. Zero JS by default. Pages are .astro components |
| Tailwind CSS | 4.0.x | Utility-first styling |
| TypeScript | 5.7.x | Type safety for manifest and data files |
| Node.js | 20.x LTS | Required by Astro 5 |
| Netlify | Free tier | Git-based deploy. Push to main auto-builds. SSL included |

**No React. No framework JS.** Copy-to-clipboard uses inline script (~15 lines). Mobile nav uses inline script (~10 lines). Expand/collapse uses native `<details>`/`<summary>`. That covers every interactive need.

**Fully static.** `output: 'static'` in astro.config. No SSR, no adapter, no server features.

**All versions pinned exactly.** No ^ or ~ in package.json.

## 2. Design Principles

1. **Three page shells only.** Landing page, content page with sidebar, index/grid page. No per-content-type page architectures.
2. **Content files are the source of truth for text.** Each page driven by a markdown file. Frontmatter defines metadata. Body renders in standard prose layout. Code only handles layout and styling.
3. **One manifest for routing/nav/order.** manifest.ts is canonical. Sidebar, breadcrumbs, prev/next all derive from it. No auto-grouping. No inference.
4. **No invention.** Claude must not invent routes, pages, content summaries, or navigation. If a source is missing, flag it.
5. **Prove it before you build it.** A component must be used 3+ times before it gets its own file.

## 3. Folder Structure

```
platform/
src/
  pages/                          # One .astro file per route
    index.astro                   # Landing page (LandingLayout)
    getting-started/
      index.astro                 # How This Works
      setup.astro                 # Shared Setup
    templates/
      index.astro                 # Templates index
    web-dev/
      index.astro                 # Category landing
      getting-started.astro       # Web Dev Setup
      projects/
        1/ (index, prd, backlog, guide, design, claude-md)
        2/ (index, prd, backlog, guide, claude-md)
        6/ (index)
      bridge/
        index.astro               # Bridge instructions
        choose-arc.astro          # Arc chooser + answer keys inline
      arcs/
        a/ (index, flawed-prd, project-3, project-4, project-5)
        b/ ... e/                 # Same structure
      checkpoints/ (1-6)
      guides/ (ci-setup, gemini-setup)
  layouts/
    BaseLayout.astro              # HTML shell, head, meta, fonts
    DocsLayout.astro              # Base + sidebar + breadcrumbs + content + prev/next + footer
    LandingLayout.astro           # Base + wide content (no sidebar)
  components/
    Sidebar.astro                 # Reads manifest. Current page highlighted
    Breadcrumbs.astro             # From manifest
    PageNav.astro                 # Prev/next from manifest
    Hero.astro                    # Landing page hero only
    Card.astro                    # Projects, arcs, tickets, templates, features
    Callout.astro                 # Variants: info, warning, client, scope-change
    CodeBlock.astro               # Dark code + optional inline copy script
    Checklist.astro               # Visual checkbox list (decorative)
    StepList.astro                # Numbered steps with visual progression
  data/
    manifest.ts                   # THE source of truth for every route
    templates.ts                  # OPTIONAL: metadata only (group, order). Content comes from markdown files
  styles/
    global.css                    # Tailwind directives + prose styling
content/                          # Markdown source files
  (structure mirrors page routes)
public/
  favicon.svg
  og-image.png
astro.config.mjs
tailwind.config.mjs
package.json
Makefile
CLAUDE.md
BACKLOG.md
.github/workflows/ci.yml         # Build check on PRs only
```

## 4. Content Model

Every page driven by a markdown file. Frontmatter defines metadata:

```yaml
---
title: "Project 1: The Static Site"
description: "Deploy a website to a real URL"
---
```

Allowed markdown patterns in content files:
- Headings (H1-H4)
- Paragraphs
- Bullet and numbered lists
- Fenced code blocks (with language tag)
- Blockquotes (rendered as Callout)
- Simple tables
- Bold, italic, inline code

**No custom shortcodes. No MDX. No component imports in content.**

Special patterns handled by the .astro page wrapping content sections in components. The page decides layout. The markdown provides text.

## 5. The Manifest (data/manifest.ts)

One typed array. Every route in the site:

```typescript
export interface PageEntry {
  route: string;
  title: string;
  description: string;
  section: string;
  navLabel: string;
  navParent?: string;
  order: number;
  contentFile: string;
  layout: "landing" | "docs";
  prev?: string;
  next?: string;
}
```

Sidebar, Breadcrumbs, PageNav, SEO meta all read from this. No other source. If it is not in the manifest, the page does not exist.

## 6. Interactivity

| Feature | Implementation | JS |
|---|---|---|
| Copy-to-clipboard | Inline script in CodeBlock | ~15 lines |
| Mobile nav | Inline script in DocsLayout | ~10 lines |
| Expand/collapse | Native details/summary + CSS | 0 |
| Checkpoint answers | details/summary | 0 |
| Directing hints | details/summary | 0 |
| Template previews | details/summary | 0 |
| Answer keys | details/summary on choose-arc page | 0 |

No React. Most pages ship zero JS.

## 7. Components (9 total)

| Component | Purpose | Usage |
|---|---|---|
| Sidebar | Nav from manifest | ~50 pages |
| Breadcrumbs | Trail from manifest | ~50 pages |
| PageNav | Prev/next from manifest | ~50 pages |
| Hero | Landing page hero | 1 page |
| Card | Projects, arcs, tickets, templates, features | ~15 pages |
| Callout | Info, warning, client, scope-change variants | ~30 pages |
| CodeBlock | Code display + optional copy | ~20 pages |
| Checklist | Visual checkbox list | ~15 pages |
| StepList | Numbered steps | ~10 pages |

Every component used 3+ times. Nothing speculative.

## 8. What Was Removed

- React and all .tsx files
- 5 layouts collapsed to 3
- 7 components collapsed into Card, Callout variants, and native HTML
- Standalone answer-keys page (inline on choose-arc)
- GitHub Actions deploy workflow (Netlify git deploy)
- Separate navigation.ts and categories.ts (collapsed into manifest.ts)
- templates.ts removed as content source (markdown is single source for template text)

## 9. Ticket Backlog

| # | Ticket | Deps | Size | Pages |
|---|---|---|---|---|
| 1 | Project setup | — | M | 0 |
| 2 | CI pipeline | T1 | S | 0 |
| 3 | Manifest + layouts + nav | T1 | L | 0 (infrastructure) |
| 4 | Content components | T3 | M | 1 (showcase — removed after) |
| 5 | Landing page | T4 | M | 1 |
| 5b | Web Dev category landing | T4 | S | 1 |
| 6 | Getting started (3 pages) | T4 | M | 3 |
| 7 | Project 1 pages | T4 | L | 6 |
| 8 | Guides | T4 | M | 2 |
| 9 | Project 2 pages | T7, T8 | L | 5 |
| 10 | Checkpoints | T4 | L | 6 |
| 11 | Templates page | T4 | M | 1 |
| 12 | Bridge + arc chooser | T4 | M | 2 |
| 13 | Arc landings | T12 | M | 5 |
| 14a-e | Arc materials (per arc) | T13 | M each | 4 each = 20 |
| 15 | Project 6 | T4 | M | 1 |
| 16 | SEO + meta | All | S | 0 (updates all) |
| 17 | Deploy | All | S | 0 |

**Total: 54 pages across 22 tickets.**

## 10. Build-Time Validation

Add `make validate` — a TypeScript script that checks:

- Every route in manifest.ts has a page file in src/pages/
- Every contentFile in manifest.ts exists in content/
- Every prev/next route resolves to a manifest entry
- No orphan pages (page exists, not in manifest)
- No orphan content files
- No duplicate routes
- Every entry has title and description

Run as part of CI. Fails the build if anything is wrong.

## 11. Infrastructure

- Build: `astro build` produces `dist/`
- Host: Netlify free tier, git-based deploy
- Deploy: Push to main triggers Netlify auto-build (~60 seconds)
- Rollback: Netlify dashboard, click previous deploy
- CI: GitHub Actions `make build` on PRs. Blocks merge if fails
- Cost: $0/month

## 12. Hard Rules

1. No React. If something needs JS, use inline script or native HTML
2. No invention. Do not create routes, pages, or content not in manifest
3. No duplication. Content in markdown. Metadata in manifest. Neither repeated
4. Three layouts. BaseLayout, DocsLayout, LandingLayout. No exceptions
5. Prove before building. Component needs 3+ uses to earn a file
6. Manifest wins. If a ticket contradicts manifest.ts, manifest is correct
7. Markdown constraints. Only: headings, paragraphs, lists, code, blockquotes, tables, inline formatting
8. Pin versions. Every dependency pinned exactly
