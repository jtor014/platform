# The Platform

## What This Is
Static learning platform. Astro + Tailwind. No React. No backend. No database.

## Hard Rules
1. No React. Interactivity via inline <script> or native <details>/<summary>
2. No invention. Do not create routes, pages, or content not in .claude/routes.md
3. No duplication. Content in markdown. Metadata in manifest. Neither repeated
4. Three layouts only. BaseLayout, DocsLayout, LandingLayout
5. Routes file wins. If a ticket contradicts .claude/routes.md, routes file is correct
6. Content constraints. Only: headings, paragraphs, lists, code blocks, blockquotes, tables, inline formatting. No MDX
7. Pin versions. Every dependency pinned exactly. No ^ or ~
8. If a content source is missing, flag it. Do not improvise

## Roles
- Director (Human): Signs off on all merges
- Lead Developer (Claude Code): Builds pages and components
- Gemini: Reviews PRs via GitHub Actions

## Merge Rule
Never merge without Director sign-off. Fix review issues and push. Cycle repeats.

## PR Workflow
1. Branch: feat/ticket-number-short-description
2. Implement. Follow .claude/design-rules.md exactly
3. Conventional commits: feat:, fix:, chore:, docs:
4. If >300 lines, split into sub-PRs
5. Push, open PR: gh pr create "Closes #N"
6. Self-review: compare diff against acceptance criteria, post as PR comment
7. Report to Director: CI status, review, PR size, recommendation
8. Director says "merge it" or "fix those"

## Anti-Scope
No user accounts. No backend. No React. No progress tracking. No comments.
No search. No CMS. No analytics. No email. No payment. No blog. No dark mode.
No i18n. No PDF generation. No code editor. No AI in the platform.

## Tech Stack
- Astro 5.1.x (pin exact, output: 'static')
- Tailwind CSS 4.0.x (pin exact)
- TypeScript 5.7.x (pin exact)
- Node.js 20.x LTS
- Netlify free tier (git-based deploy)
- CI: GitHub Actions build check on PRs only

## Layouts
- BaseLayout: HTML shell, head, meta, Google Fonts (Inter + JetBrains Mono)
- DocsLayout: Base + sidebar + breadcrumbs + content (720px) + prev/next + footer
- LandingLayout: Base + wide content (1200px, no sidebar)

## Components (9 only)
Sidebar, Breadcrumbs, PageNav, Hero, Card, Callout, CodeBlock, Checklist, StepList
No others without proving 3+ uses first.

## Sources of Truth
- Routes and nav: .claude/routes.md
- Content-to-page mapping: .claude/content-map.md
- Design tokens and patterns: .claude/design-rules.md
- Ticket detail: BACKLOG.md
- This file: rules only

## Makefile
make dev       # Astro dev (localhost:4321)
make build     # Build to dist/
make preview   # Preview built site
make lint      # Linters
make check     # TypeScript check
make validate  # Check routes against filesystem

## Current State
- Last completed ticket: None
- Known issues: None
