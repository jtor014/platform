# The Platform — Example Implementation

*An instantiation of the AI-First Development Framework*

This document applies the AI-First Development Framework to building the learning platform website. It contains the design system, the complete CLAUDE.md to paste into Claude Code, and 18 fully-specified tickets that take the project from an empty directory to a live, deployed learning platform. The PRD and Architecture are companion documents — this document is the implementation guide.

---

## Part 1: Product Requirements

See companion document: `prd-platform.md`

**Summary:** A static website that organises ~55 learning content documents into a navigable student journey. Landing page, getting started guides, six project sections, five business story arcs, templates with copy-to-clipboard, and judgment checkpoints with hidden answers. No accounts, no backend, no database. Free and open.

---

## Part 2: Design System

### Brand

No name or logo yet. Use text-based branding for v1. The design should accommodate a logo addition later without restructuring.

- **Working title:** "The Platform" (placeholder)
- **Tagline:** "Build real software. Direct AI to do it."
- **Voice:** Direct, encouraging, practical. Not academic, not corporate. Talks to you like a knowledgeable friend who's done this before.

### Colours

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | #FFFFFF | Page background |
| `--color-bg-subtle` | #F8FAFC | Sidebar background, card backgrounds |
| `--color-bg-muted` | #F1F5F9 | Code block backgrounds, hover states |
| `--color-text` | #0F172A | Primary body text |
| `--color-text-secondary` | #475569 | Secondary text, descriptions, metadata |
| `--color-text-muted` | #94A3B8 | Placeholder text, disabled states |
| `--color-primary` | #2563EB | Links, buttons, active states, focus rings |
| `--color-primary-dark` | #1D4ED8 | Link hover, button hover |
| `--color-primary-bg` | #EFF6FF | Primary tint backgrounds (info callouts) |
| `--color-border` | #E2E8F0 | Borders, dividers, card outlines |
| `--color-border-strong` | #CBD5E1 | Active borders, focus borders |
| `--color-success` | #16A34A | Success states, "Available" badges |
| `--color-success-bg` | #F0FDF4 | Success backgrounds |
| `--color-warning` | #D97706 | Warning states, client brief callouts, scope changes |
| `--color-warning-bg` | #FFFBEB | Warning backgrounds |
| `--color-error` | #DC2626 | Error states |
| `--color-error-bg` | #FEF2F2 | Error backgrounds |
| `--color-sidebar` | #1E293B | Sidebar background (dark) |
| `--color-sidebar-text` | #CBD5E1 | Sidebar text |
| `--color-sidebar-active` | #FFFFFF | Sidebar active page text |
| `--color-sidebar-active-bg` | #334155 | Sidebar active page background |

### Typography

| Element | Font | Weight | Size | Line Height | Colour |
|---|---|---|---|---|---|
| H1 | Inter | 700 | 36px / 30px mobile | 1.2 | `--color-text` |
| H2 | Inter | 600 | 28px / 24px mobile | 1.3 | `--color-text` |
| H3 | Inter | 600 | 22px / 20px mobile | 1.4 | `--color-text` |
| H4 | Inter | 600 | 18px | 1.4 | `--color-text` |
| Body | Inter | 400 | 16px | 1.7 | `--color-text` |
| Body small | Inter | 400 | 14px | 1.5 | `--color-text-secondary` |
| Code inline | JetBrains Mono | 400 | 14px | 1.5 | `--color-text` on `--color-bg-muted` |
| Code block | JetBrains Mono | 400 | 14px | 1.6 | Light text on dark background |
| Nav link | Inter | 500 | 14px | 1 | `--color-sidebar-text` |
| Button | Inter | 600 | 16px | 1 | White on `--color-primary` |

**Font loading:** Inter and JetBrains Mono from Google Fonts. `font-display: swap` to prevent invisible text on slow connections.

### Spacing

Base unit: 4px. All spacing is multiples of 4.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Tight gaps (icon + label) |
| `--space-2` | 8px | Related elements |
| `--space-3` | 12px | List items |
| `--space-4` | 16px | Within sections |
| `--space-6` | 24px | Between components, card padding |
| `--space-8` | 32px | Between sections |
| `--space-12` | 48px | Major section dividers |
| `--space-16` | 64px | Page section padding (desktop) |
| `--space-20` | 80px | Hero section padding |

### Layout

| Token | Value |
|---|---|
| Sidebar width | 280px |
| Content max-width | 720px |
| Content padding (horizontal) | 24px mobile, 48px desktop |
| Page max-width (landing page) | 1200px |
| Breakpoint mobile | < 768px |
| Breakpoint tablet | 768px — 1023px |
| Breakpoint desktop | ≥ 1024px |

### Component Styles

**Buttons:**
- Primary: `--color-primary` background, white text, 8px padding vertical, 16px horizontal, 6px border-radius, 600 weight
- Primary hover: `--color-primary-dark`
- Ghost: transparent background, `--color-primary` text, border on hover
- Size: minimum 44×44px touch target on mobile

**Cards:**
- Background: `--color-bg-subtle` or white with `--color-border` border
- Border-radius: 8px
- Padding: 24px
- Hover: subtle shadow `0 2px 8px rgba(0,0,0,0.08)`

**Callout boxes:**
- Info: `--color-primary-bg` background, `--color-primary` left border (4px), 16px padding
- Warning: `--color-warning-bg` background, `--color-warning` left border (4px)
- Client brief: `--color-warning-bg` background, `--color-warning` left border, italic text, slightly larger font for the quote
- Success: `--color-success-bg` background, `--color-success` left border

**Code blocks:**
- Background: #1E293B (dark, matches sidebar)
- Text: #E2E8F0 (light)
- Border-radius: 8px
- Padding: 16px
- Horizontal scroll on overflow
- Optional copy button in top-right corner
- Language label in top-left (subtle)

**CodeBlock terminal commands:**
- Same as code blocks but with a `$` prompt character in muted colour
- Copy button copies the command without the `$`

**Tables:**
- Header row: `--color-bg-muted` background, 600 weight text
- Body rows: alternating white / `--color-bg-subtle`
- Border: `--color-border` between rows
- Cell padding: 12px vertical, 16px horizontal
- Horizontal scroll on mobile (container overflow)

**Disclosure (details/summary):**
- Trigger: full-width button with label + chevron icon (right-pointing when closed, down-pointing when open)
- Content: revealed with smooth height transition (200ms)
- Background: slightly different from surrounding content (`--color-bg-subtle`)
- Border: `--color-border` top and bottom when open

**Badges:**
- Available: `--color-success` text, `--color-success-bg` background, 4px horizontal padding, border-radius 4px, 12px font
- Coming soon: `--color-text-muted` text, `--color-bg-muted` background

---

## Part 3: CLAUDE.md

Copy everything below the line into a file called CLAUDE.md in the project root. This is what Claude Code reads at the start of every session.

---

```
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
```

---

## Part 4: Getting Started

### Step 1 — Create the project

Open a terminal and run:

```
mkdir platform && cd platform
git init
gh repo create platform --public --source=. --remote=origin
code .
```

### Step 2 — Start Claude Code and create CLAUDE.md

In the VS Code integrated terminal:

```
claude
```

Then tell Claude:

> Create a file called CLAUDE.md with exactly the following content. Then commit it to main.

Paste the entire CLAUDE.md from Part 3 above.

### Step 3 — Create the content directory

Tell Claude:

> Create a /content directory and copy in all the reference markdown files from [your content folder]. Organise them into subdirectories: getting-started, projects/project-1, projects/project-2, projects/project-6, bridge, arcs/arc-a through arc-e, checkpoints, templates, and guides. Commit to main.

This gives Claude the reference material it needs to build every page.

### Step 4 — Create BACKLOG.md and the board

Tell Claude:

> Create a file called BACKLOG.md with the following tickets. Then create GitHub labels (setup, frontend, deploy), create Issues for all tickets, and create a Project board with To Do, In Progress, and Done columns.

Paste the ticket backlog from Part 5 below.

---

## Part 5: Ticket Backlog

The loop for every ticket:

1. You say **"Start Ticket N."**
2. Claude creates a feature branch, implements the ticket, commits, opens a PR with "Closes #N"
3. Claude runs self-review against acceptance criteria, posts as PR comment
4. CI and Gemini review run automatically
5. Claude reports back: CI status, reviews, recommendation
6. You verify: open the dev server, check the page, test on mobile, compare to design system
7. You decide: **"Merge it"** or **"Fix those"**

### Ticket 1: Project Setup

**Labels:** setup

**What to tell Claude:**
> Start Ticket 1. Initialise an Astro 5.1 project with TypeScript and Tailwind CSS. Configure for static output (`output: 'static'` in astro.config). Pin all dependency versions exactly in package.json (no ^ or ~). Create the Makefile with dev, build, preview, lint, and check commands. Set up the repository structure from CLAUDE.md. Verify make dev starts the server and make build produces output in dist/.

**Acceptance Criteria:**
- `make dev` starts Astro dev server at localhost:4321
- `make build` produces static files in `dist/`
- `make preview` serves the built site locally
- Tailwind utility classes render correctly (create a test page with a styled heading)
- TypeScript compiles without errors
- All dependency versions pinned exactly in package.json (no ^ or ~)
- astro.config has `output: 'static'`
- The repository structure matches CLAUDE.md
- Remove the test page before merging

**Director's verification:**
- Open localhost:4321 — see the test page
- Check the styled heading (Tailwind works)
- Run `make build` — no errors, `dist/` directory appears
- Check package.json — versions pinned exactly

---

### Ticket 2: CI Pipeline

**Labels:** setup

**What to tell Claude:**
> Start Ticket 2. Create a GitHub Actions CI workflow that runs on pull requests: install dependencies, run the linter, run TypeScript type checking, and run the Astro build. Set up branch protection requiring CI to pass before merge.

**Acceptance Criteria:**
- Opening a PR triggers the CI workflow
- CI runs: install → lint → type-check → build
- A build failure (e.g., TypeScript error) blocks the merge
- CI results are visible on the PR page (green checkmark or red X)
- Branch protection configured on main: CI must pass, no direct pushes

**Director's verification:**
- After merging Ticket 2, create a test PR with the next ticket
- Check the GitHub Actions tab — CI should run automatically
- Verify the green checkmark appears on the PR

---

### Ticket 3: Design System & Base Layout

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 3. Build the design system and base layout from CLAUDE.md's design system section. Create: Tailwind configuration with all colour tokens, typography, and spacing. BaseLayout with HTML shell, meta tags, Google Fonts (Inter + JetBrains Mono). DocsLayout with sidebar + content area + breadcrumbs + footer. The Sidebar component reading from manifest.ts (the single source of truth for all routes and nav structure). inline mobile nav script for hamburger menu on mobile. Breadcrumbs component. PageNav component ("Previous / Next" links). Footer component. Create a temporary test page that demonstrates the layout with placeholder content.

**Acceptance Criteria:**
- Tailwind config contains all colour tokens from the design system
- BaseLayout renders HTML with correct meta tags and font loading
- Sidebar is visible on screens ≥1024px with correct dark background and styling
- Sidebar highlights the current page (different background + white text)
- Expanding a sidebar section does not collapse other sections
- On mobile (<1024px): sidebar hidden, hamburger icon visible in header
- Tapping hamburger opens sidebar as overlay, tapping again closes it
- Breadcrumbs show on the test page: Home > Section > Page
- Content area has max-width 720px, centred
- Body text is Inter 16px with line-height 1.7
- Footer shows at the bottom of every page, consistent styling
- Navigation links work without JavaScript (plain `<a>` tags)

**Director's verification:**
- Open localhost:4321 — see the layout with sidebar, content area, footer
- Resize the browser to mobile width — sidebar becomes hamburger
- Tap the hamburger — sidebar opens as overlay
- Check font in DevTools: Inter for body, correct sizes
- Check content width in DevTools: max-width around 720px

---

### Ticket 4: Content Components

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 4. Build the 9 reusable components listed in CLAUDE.md: Card, Callout, CodeBlock, Checklist, StepList, Hero, Sidebar, Breadcrumbs, PageNav. Create a component showcase page at /component-test that demonstrates every component with realistic content. All components are .astro files — no React, no .tsx. CodeBlock has an optional inline script for copy-to-clipboard. Expand/collapse uses native details/summary styled with CSS.

**Acceptance Criteria:**
- **Card:** Renders with title, optional subtitle, optional metadata. 8px border-radius, 24px padding. Hover shadow. Used for projects, arcs, tickets, templates
- **Callout:** 4 variants via prop — info (blue left border, blue tint), warning (amber), client (green, italic text), scope-change (amber, "Scope Change" label). Each with 4px left border and background tint
- **CodeBlock:** Monospace (JetBrains Mono), dark background (#1E293B), 8px border-radius, horizontal scroll on overflow. Optional copy button (inline script): copies content, shows "Copied!" for 2 seconds. Terminal variant: $ prompt in muted colour, copy omits the $
- **Checklist:** Visual checkbox items (decorative, not interactive). Consistent spacing
- **StepList:** Numbered steps with visual connectors (circles + line). Clear progression
- **Hero:** Large heading, subtitle, CTA button. Used on landing page only
- **Sidebar, Breadcrumbs, PageNav:** Already built in T3. Verify they work with components on the showcase page
- **details/summary:** Native HTML, styled with CSS. Test on showcase page: click to expand, click to collapse. Used for checkpoint answers, directing hints, troubleshooting, template previews
- Copy button works on mobile (Clipboard API with fallback)
- Showcase page demonstrates every component with realistic content
- All components are .astro files. Zero framework JS. Pages ship no JS unless they have a copy button

**Director's verification:**
- Open localhost:4321/component-test — every component visible
- Check each visually against the design system colours and spacing
- Test copy button — paste into a text editor, correct content?
- Test details/summary — smooth expand/collapse
- Mobile — all components readable, tables scroll, copy works
- Network tab — zero JS on pages without copy buttons

---

### Ticket 5: Landing Page

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 5. Build the homepage at /. Read content/getting-started/homepage.md for the text content. Build a proper marketing page — not rendered markdown. Hero section with the value proposition and tagline. "What you'll build" section with six Cards. "How it works" section with the loop visualised as steps with icons or graphics. "Who this is for" section. "What you need" prerequisites. Categories table with styled badge spans. CTA button linking to /getting-started.

**Acceptance Criteria:**
- Hero section: H1 heading ≥28px, subtitle below it, CTA button visible without scrolling on 1440px desktop
- Six projects displayed as Cards with the +1 statement
- "How it works" is visual — icons or numbered step graphics, not a bullet list
- "Who this is for" lists at least 3 audience types (university students, self-taught learners, career changers) with 1-2 sentence descriptions each
- CTA "Start here" is prominent and links to /getting-started
- Categories table: Web Dev = green "Available" badge, others = grey "Coming soon"
- Open Graph tags: og:title, og:description, og:image present in page source
- Page loads in under 2 seconds (check Lighthouse)
- Responsive: looks good on 375px iPhone SE through 1920px+ desktop
- Zero JavaScript on this page (no interactive elements needed)

**Director's verification:**
- Open the homepage — first impression test. Does it communicate "what this is" in 30 seconds?
- Scroll through — is the progression natural? Hero → what you build → how it works → who it's for → start
- Open on mobile — everything stacks cleanly
- Run Lighthouse — performance and SEO scores
- View Page Source — check OG tags

---

### Ticket 5b: Web Dev Category Landing Page

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 5b. Build the Web Dev category landing page at /web-dev. Read content/web-dev/category-landing.md for text. This is the entry point for the Web Development category. Show: category title and description, the six-project progression as Cards with +1 statements, the five arcs as a summary table, a "Start Project 1" CTA linking to /web-dev/projects/1, and a "Choose Your Arc" link to /web-dev/bridge/choose-arc. Use DocsLayout.

**Acceptance Criteria:**
- Page exists at /web-dev and renders correctly
- Category title "Web Development" displayed as H1
- Six projects displayed as Cards with project number, name, and +1 statement
- Five arcs displayed in a summary table with name, domain, and signature challenge
- "Start Project 1" CTA button links to /web-dev/projects/1
- "Choose Your Arc" link points to /web-dev/bridge/choose-arc
- Page linked from the homepage categories table (Web Dev row links to /web-dev)
- Sidebar shows "Web Development" section with this page as the top-level entry
- Breadcrumbs: Home > Web Development

**Director's verification:**
- Navigate from homepage → click "Web Development" in categories → lands on /web-dev
- Six project cards present and readable
- CTA links work correctly
- Sidebar highlights this page

---

### Ticket 6: Getting Started Pages

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 6. Build three pages: /getting-started (How This Works), /getting-started/setup (Shared Setup), and /web-dev/getting-started (Web Dev Setup). Read the content files in content/getting-started/ for text. How This Works: explain the roles visually (Director, Claude Code, Gemini), the loop as a stepped diagram, and the six-project progression as a visual timeline. Shared Setup: only the tools every category needs — VS Code, Git, GitHub CLI, Claude Code. Use CodeBlock with terminal props for every command, a verify section after each tool, and a troubleshooting accordion. Web Dev Setup: only the tools specific to Web Development — Node.js, Docker, Gemini API key, Netlify account. Same Terminal/verify/troubleshooting pattern. Add "Next" PageNav links: How This Works → Shared Setup → Web Dev Setup → Project 1.

**Acceptance Criteria:**
- How This Works: roles section has visual treatment (icons or cards for each role, not just text paragraphs)
- How This Works: the loop is displayed as a stepped diagram or numbered visual flow
- How This Works: six-project progression shown as a visual timeline or card sequence
- Shared Setup: covers ONLY VS Code, Git, GitHub CLI, Claude Code, GitHub account, Claude subscription
- Shared Setup: does NOT mention Node.js, Docker, Netlify, or any category-specific tools
- Shared Setup: links to Web Dev Setup at the bottom ("Next: Web Dev Setup")
- Web Dev Setup: covers ONLY Node.js, Docker, Gemini API key, Netlify account
- Web Dev Setup: does NOT repeat VS Code, Git, GitHub CLI, or Claude Code
- Web Dev Setup: opens with "You've installed the shared tools. Now install what's needed for Web Development."
- All setup pages: every terminal command uses CodeBlock with terminal prop with copy button
- All setup pages: each tool has a "Verify" sub-section with command and expected output
- All setup pages: troubleshooting uses details/summary accordion
- "Next" links: How This Works → Shared Setup → Web Dev Setup → Project 1
- Every terminal command on setup pages uses the CodeBlock with terminal prop (dark background, $ prompt, copy button) — no raw text commands
- Each tool section follows the pattern: what it is → install command → verify command → expected output
- All CodeBlock copy buttons work on mobile

**Director's verification:**
- Read How This Works — does the visual treatment of roles and the loop work?
- Read Shared Setup — does it stop at Claude Code? No Node.js or Docker?
- Read Web Dev Setup — does it start where Shared Setup left off? No duplication?
- Could a genuine beginner follow the full sequence without getting lost?
- Test every copy button — correct commands?
- Check "Next" links — correct sequence?
- Mobile check — everything readable and usable

---

### Ticket 7: Project 1 Pages

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 7. Build Project 1 pages: /web-dev/projects/1 (landing), /web-dev/projects/1/prd, /web-dev/projects/1/backlog, /web-dev/projects/1/guide, /web-dev/projects/1/design, /web-dev/projects/1/claude-md. Read content files in content/projects/project-1/ for text. Use DocsLayout. Landing page: project name, +1 statement, what you'll build, prerequisites, time estimate, materials list as links. PRD page: structured sections with styled HTML tables. BACKLOG page: each ticket as a card section with Checklists for acceptance criteria. Guide page: StepList component with CodeBlock terminal commands and copy buttons. Design spec page: render colour swatches as actual coloured squares with hex labels. CLAUDE.md page: full content in a CodeBlock with copy button for the entire file.

**Acceptance Criteria:**
- Landing page shows: "Project 1: The Static Site" as title, +1 statement prominently, materials list as clickable links
- PRD page: sections clearly structured, tables styled with styled HTML table, anti-scope section visually distinct (Callout)
- BACKLOG page: each ticket is a card/section, acceptance criteria as Checklists, ticket metadata (labels, size, deps) displayed
- Guide page: numbered steps using StepList, CodeBlock terminal commands with copy button, verification sections highlighted
- Design spec page: colour swatches rendered as actual coloured squares (CSS background-color) next to hex labels
- Design spec: typography examples shown in their actual font and size (e.g., the H1 example is actually 48px Inter Bold)
- CLAUDE.md page: entire file content in a CodeBlock with a copy button that copies the whole thing
- "Next" links: guide → Checkpoint After Project 1 → Project 2
- All pages use DocsLayout with sidebar, breadcrumbs work correctly

**Director's verification:**
- Navigate to /web-dev/projects/1 — landing page clear and inviting
- Click each material link — correct page loads
- On the backlog page: each ticket is a distinct card/section with visible title, labels badge, and size badge. Acceptance criteria render as Checklists
- On the guide page: CodeBlock terminal commands have working copy buttons
- On the design spec: colour swatches are actual colours, not just hex text
- On CLAUDE.md: copy the whole file, paste somewhere — formatting preserved
- Breadcrumbs: Home > Web Dev > Projects > Project 1 > [Material]

---

### Ticket 8: CI & Gemini Setup Guides

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 8. Build two guide pages: /web-dev/guides/ci-setup and /web-dev/guides/gemini-setup. Read content files in content/guides/. Heavy use of CodeBlock components. YAML configurations displayed in CodeBlocks with copy buttons. Step-by-step sections using StepList. Troubleshooting using details/summary accordion at the bottom.

**Acceptance Criteria:**
- CI guide page exists at /web-dev/guides/ci-setup and renders correctly
- CI guide: workflow YAML in CodeBlock with copy button (copies full YAML)
- CI guide: branch protection steps as StepList with numbered instructions
- Gemini guide page exists at /web-dev/guides/gemini-setup and renders correctly
- Gemini guide: API key setup as StepList ("Go to... → Click... → Copy...")
- Gemini guide: workflow YAML in CodeBlock with copy button
- Both: troubleshooting section using details/summary accordion (each issue collapsible)
- Both: accessible from sidebar navigation under Web Dev > Guides
- Both: breadcrumbs show Home > Web Dev > Guides > [Guide Name]

**Director's verification:**
- Copy the YAML from the CI guide — paste into a text editor — is it correct and complete?
- Same for Gemini guide YAML
- Troubleshooting toggles work smoothly
- Both pages accessible from sidebar

---

### Ticket 9: Project 2 Pages

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 9. Build Project 2 pages: /web-dev/projects/2 (landing) and material sub-pages (prd, backlog, guide, claude-md). Read content files in content/projects/project-2/ for text, including content/projects/project-2/landing.md for the landing page. Same component patterns as Project 1. BACKLOG page must show Phase A and Phase B as visually distinct sections with a styled pause point between them. Guide links to /web-dev/guides/ci-setup and /web-dev/guides/gemini-setup at the appropriate steps (these pages already exist from Ticket 8). Bridge section at the end of the guide links to /web-dev/bridge.

**Acceptance Criteria:**
- Landing page exists at /web-dev/projects/2 and renders content from landing.md
- Landing page mentions Phase A ("The Stack Appears") and Phase B ("The System Proves Itself")
- BACKLOG page: Phase A and Phase B are visually distinct sections with a styled divider/pause point between them (not just a heading — a visual break with encouraging text)
- Guide page: CI setup guide link points to /web-dev/guides/ci-setup and loads correctly
- Guide page: Gemini setup guide link points to /web-dev/guides/gemini-setup and loads correctly
- Guide page: bridge section at the bottom with link to /web-dev/bridge
- All material pages use appropriate components
- Breadcrumbs: Home > Web Dev > Projects > Project 2 > [Material]

**Director's verification:**
- BACKLOG page: is the Phase A/B split visually clear? Does the pause point feel like a natural break?
- Guide page: click the CI and Gemini guide links — correct pages load?
- Consistency: do these pages match Project 1's quality and layout?

---

### Ticket 10: Checkpoint Pages (×6)

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 10. Build all 6 checkpoint pages at /web-dev/checkpoints/after-project-1 through /web-dev/checkpoints/after-project-6. Read content files in content/checkpoints/. Each exercise uses the details/summary with "Check your answer" (question visible, answer behind details/summary with "Check your answer" label). Code snippets in exercises use CodeBlock. Tables use styled HTML table. Summary section at the bottom. Link to the next step ("Ready? Start [next thing]").

**Acceptance Criteria:**
- All 6 checkpoint pages render correctly
- Each exercise: question visible, answer hidden by default behind "Check your answer" toggle
- Clicking toggle reveals answer with smooth transition
- Revealing one answer does not reveal others on the same page
- Code snippets in checkpoints 4 and 5 use CodeBlock component
- Tables in exercises use standard HTML table with Tailwind styling
- Each page ends with a "Ready? Start..." link to the next step
- Consistent styling across all 6 pages

**Director's verification:**
- Visit each checkpoint page
- Attempt an exercise mentally, then click to reveal — does the answer make sense?
- Check that revealing one answer doesn't reveal others
- Check the "Ready?" links — correct destinations

---

### Ticket 11: Templates Page

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 11. Build the templates page at /templates. Read content files in content/templates/. Each markdown file IS the template — read its body as the copyable text. Use frontmatter for title and description. No templates.ts needed unless grouping metadata is useful. All 10 templates on one page using Card + details + CodeBlock components. Grouped into three sections: Planning (PRD, Architecture, Design, Ticket Backlog), Build (CLAUDE.md, Component Spec), Operational (Sprint Retro, Risk Assessment, Runbook, Handover). Each Card + details + CodeBlock: name, one-sentence description, expandable preview (details/summary), copy button for full markdown text.

**Acceptance Criteria:**
- All 10 templates listed with name and one-sentence description
- Grouped under three section headings: Planning, Build, Operational
- Each has a copy button that copies the full markdown template text
- Each has an expandable preview (collapsed by default, click to expand)
- "Copied!" confirmation appears for 2 seconds after clicking Copy
- Copy works on mobile
- Copy preserves markdown formatting (paste into a text editor — headers, bullets, code blocks all present)
- Templates grouped under section headings (Planning, Build, Operational). Each template shows name and description without expanding. A student can identify the right template without clicking anything

**Director's verification:**
- Copy each template — paste into a text editor — markdown formatting correct?
- Open on mobile — copy buttons work? Layout readable?
- Expand and collapse previews — smooth?
- Can you find the Sprint Retro template in under 5 seconds? (Scannable test)

---

### Ticket 12: Bridge & Arc Chooser

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 12. Build two pages: /web-dev/bridge (instructions) and /web-dev/bridge/choose-arc (arc chooser with answer keys inline). Read content files in content/bridge/ and content/getting-started/choose-your-arc.md. Bridge instructions: display the annotate → repair → generate sequence as a visual 3-step flow (Cards or step graphics, not a numbered list). Arc chooser: 5 Cards with full comparison information, plus both interest-based and course-based tables. At the bottom of the choose-arc page, add a "Flawed PRD Answer Keys" section with 5 details/summary blocks (one per arc) using content from content/bridge/flawed-prd-answer-keys.md. There is NO separate answer-keys page.

**Acceptance Criteria:**
- Bridge page exists at /web-dev/bridge
- Bridge page: three steps displayed as a visual flow/progression — Cards or step graphics, not a plain numbered list
- Bridge page: each step has a clear description of what to do and estimated time
- Arc chooser page exists at /web-dev/bridge/choose-arc
- Arc chooser: each arc as a Card with name, client, what you'll build, unique challenges, who it's for
- Arc chooser: interest-based table ("If you want to... → Choose...") AND course-based table ("Your course → Best arc")
- Arc chooser: "Still not sure? Start with Arc A" at the bottom
- Arc chooser: each arc links to its flawed PRD and its arc landing page
- Arc chooser: answer keys section at bottom with 5 details/summary blocks, one per arc
- Opening one answer key does not reveal others
- There is NO route at /web-dev/bridge/answer-keys — answer keys are inline on choose-arc only

**Director's verification:**
- Bridge page: does the 3-step visual flow communicate the progression clearly?
- Arc chooser: could an undecided student choose an arc from this page?
- Arc links: do they navigate correctly?
- Answer keys: scroll to bottom of choose-arc, toggle each — correct content? Others stay hidden?
- Verify: navigating to /web-dev/bridge/answer-keys returns 404 (no such page)

---

### Ticket 13: Arc Landing Pages (×5)

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 13. Build 5 arc landing pages at /web-dev/arcs/a through /web-dev/arcs/e. Read content files in content/arcs/. Use DocsLayout. Each page shows: arc name, client description, the three projects (3-5) as a mini-progression (visual timeline or cards), unique directing challenges, who this arc is best for, estimated time. Links to the flawed PRD for the bridge exercise and to each project's material page. Use a different subtle accent colour per arc to give each a visual identity while staying consistent.

**Acceptance Criteria:**
- Each arc landing page shows: name, client, projects overview, challenges, audience, time estimate
- Projects 3-5 displayed as a visual progression (timeline, connected cards, or stepped layout)
- Link to flawed PRD for bridge exercise (e.g., "Start the bridge exercise → Flawed PRD")
- Links to each project's material page (Project 3, 4, 5)
- Consistent layout across all 5 arcs
- Subtle visual identity per arc (different accent colour: A=blue, B=green, C=purple, D=orange, E=red — or similar)
- All 5 pages render correctly
- Sidebar navigation shows arcs section with all 5

**Director's verification:**
- Visit all 5 arc landing pages — consistent structure, distinct identity
- Projects progression is visual and clear
- Links to flawed PRDs and project materials work
- Arc accent colours are subtle and professional

---

### Ticket 14a: Arc A Material Pages (×4)

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 14a. Build 4 pages for Arc A: /web-dev/arcs/a/flawed-prd, /web-dev/arcs/a/project-3, /web-dev/arcs/a/project-4, /web-dev/arcs/a/project-5. Read content files in content/arcs/arc-a/. Flawed PRD: display as a realistic document with a note at top: "This PRD was generated by AI. Find and fix every flaw." Include the original brief in a Callout client variant callout. Project pages: extract the relevant project section from client-briefs-arc-a.md. Client brief text in Callout (client variant). Guidance notes in a collapsible details/summary section (not visible by default). Simulated scope changes in amber Callout with "Scope Change" label. Simulated incidents in amber Callout with "Incident" label.

**Acceptance Criteria:**
- Flawed PRD page exists at /web-dev/arcs/a/flawed-prd and displays the full flawed PRD
- Flawed PRD has the original brief ("I need customers to book appointments online") in a Callout client variant callout at the top
- Flawed PRD has a prominent warning note: "Find and fix every flaw"
- Project 3 page exists at /web-dev/arcs/a/project-3 with client brief, hints, scope change callout
- Project 4 page exists at /web-dev/arcs/a/project-4 with client brief, hints, demo feedback callout
- Project 5 page exists at /web-dev/arcs/a/project-5 with client brief, hints, key question callout
- Guidance notes hidden by default — click "Directing hints" to reveal
- All 4 pages linked from Arc A landing page (/web-dev/arcs/a)
- Breadcrumbs: Home > Web Dev > Arcs > Arc A > [Page]

**Director's verification:**
- Flawed PRD looks like a real (but flawed) document
- Project 3 brief is readable; hints are hidden until clicked; scope change callout is distinct
- Navigate: Arc A landing → flawed PRD → project 3 → project 4 → project 5

---

### Ticket 14b: Arc B Material Pages (×4)

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 14b. Build 4 pages for Arc B: /web-dev/arcs/b/flawed-prd, /web-dev/arcs/b/project-3, /web-dev/arcs/b/project-4, /web-dev/arcs/b/project-5. Read content files in content/arcs/arc-b/. Same component patterns as Arc A (Ticket 14a).

**Acceptance Criteria:**
- All 4 pages exist at correct /web-dev/arcs/b/ routes
- Flawed PRD displays the candle store PRD with original brief in Callout client variant
- Project pages extract the correct section from client-briefs-arc-b.md
- Guidance in details/summary sections, scope changes in amber Callout, incidents in amber Callout
- All linked from Arc B landing page
- Consistent with Arc A page styling

**Director's verification:**
- Compare with Arc A pages — same structure, different content
- Hints and callouts work correctly

---

### Ticket 14c: Arc C Material Pages (×4)

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 14c. Build 4 pages for Arc C: /web-dev/arcs/c/flawed-prd, /web-dev/arcs/c/project-3, /web-dev/arcs/c/project-4, /web-dev/arcs/c/project-5. Read content files in content/arcs/arc-c/. Same component patterns as Arc A (Ticket 14a).

**Acceptance Criteria:**
- All 4 pages exist at correct /web-dev/arcs/c/ routes
- Flawed PRD displays the community publication PRD with original brief in Callout client variant
- Project pages extract the correct section from client-briefs-arc-c.md
- Components consistent with Arcs A and B
- All linked from Arc C landing page

**Director's verification:**
- Consistent with previous arc pages
- Abuse incident callout on Project 5 page is distinct from scope change callouts

---

### Ticket 14d: Arc D Material Pages (×4)

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 14d. Build 4 pages for Arc D: /web-dev/arcs/d/flawed-prd, /web-dev/arcs/d/project-3, /web-dev/arcs/d/project-4, /web-dev/arcs/d/project-5. Read content files in content/arcs/arc-d/. Same component patterns as Arc A (Ticket 14a).

**Acceptance Criteria:**
- All 4 pages exist at correct /web-dev/arcs/d/ routes
- Flawed PRD displays the event registration PRD with original brief in Callout client variant
- Project pages extract the correct section from client-briefs-arc-d.md
- Components consistent with previous arcs
- All linked from Arc D landing page

**Director's verification:**
- Consistent with previous arc pages
- Physical environment incident callout on Project 5 page renders correctly

---

### Ticket 14e: Arc E Material Pages (×4)

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 14e. Build 4 pages for Arc E: /web-dev/arcs/e/flawed-prd, /web-dev/arcs/e/project-3, /web-dev/arcs/e/project-4, /web-dev/arcs/e/project-5. Read content files in content/arcs/arc-e/. Same component patterns as Arc A (Ticket 14a).

**Acceptance Criteria:**
- All 4 pages exist at correct /web-dev/arcs/e/ routes
- Flawed PRD displays the business directory PRD with original brief in Callout client variant
- Project pages extract the correct section from client-briefs-arc-e.md
- Components consistent with previous arcs
- All linked from Arc E landing page
- Project 5 page has 4 distinct adversarial scenario callouts

**Director's verification:**
- All 5 arcs now complete — navigate each: landing → flawed PRD → P3 → P4 → P5
- Consistent structure across all arcs
- Each arc's accent colour distinguishes it in the sidebar and arc landing

---

### Ticket 15: Project 6 Page

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 15. Build /web-dev/projects/6 page. Read content/projects/project-6/project-6-universal.md. Universal operational content displayed by default. 5 collapsible arc-specific sections using details/summary (labelled by arc name). Tickets displayed with Checklist components. The "concrete thrills" section (monitoring alert, disaster recovery, handover test) highlighted in a prominent Callout box.

**Acceptance Criteria:**
- Universal content displayed by default
- 5 arc-specific sections behind details/summary (Arc A: Service Business, Arc B: Online Store, etc.)
- Opening one arc section doesn't close others
- Tickets displayed as Checklist sections
- "Concrete thrills" section in a prominent Callout (info variant, or a custom "highlight" variant)
- Links to relevant templates (risk assessment, runbook, handover)
- Final retro section visible

**Director's verification:**
- Page renders all universal content from project-6-universal.md without missing sections
- Arc sections expand correctly
- Concrete thrills section stands out visually

---

### Ticket 16: SEO & Meta

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 16. Add SEO metadata to all pages. Every page needs: unique title tag ("[Page Title] | The Platform"), meta description, Open Graph tags (og:title, og:description, og:image, og:url), canonical URL. Create a default OG image (simple text-based graphic). Add @astrojs/sitemap integration to generate sitemap.xml. Add robots.txt.

**Acceptance Criteria:**
- Every page has a unique `<title>` tag
- Every page has a `<meta name="description">` with relevant description
- Every page has OG tags (check with View Page Source)
- sitemap.xml exists at /sitemap.xml listing all pages
- robots.txt exists at /robots.txt
- Lighthouse SEO score above 95 on the homepage
- Run Lighthouse on 3-4 different page types — all above 90

**Director's verification:**
- View Page Source on the homepage — check title, description, OG tags
- Open /sitemap.xml — all pages listed
- Run Lighthouse on homepage, a project page, the templates page, and a checkpoint page

---

### Ticket 17: Deploy

**Labels:** deploy

**What to tell Claude:**
> Start Ticket 17. Connect the GitHub repo to Netlify. Configure build settings (command: npm run build, publish: dist/). Netlify auto-deploys on push to main — no GitHub Actions deploy workflow needed. Verify all pages render correctly on the live URL.

**Acceptance Criteria:**
- Netlify site connected to GitHub repo with correct build settings
- Site is live at a public URL with SSL (padlock icon)
- All navigation links work on the live site (click through every sidebar link)
- Copy buttons work on the live site
- details/summary disclosures work on the live site
- Mobile navigation (hamburger) works on a real phone
- Lighthouse on the live site: performance >90, SEO >95, accessibility >90
- Page load under 2 seconds on 4G mobile connection
- No broken images, missing styles, or console errors
- Auto-deploy works: make a small text change, push to main, verify it appears on the live site within 5 minutes
- A failed build does not take down the existing live site

**Director's verification:**
- Open the live URL on desktop and mobile
- Click through every section in the sidebar
- Test copy buttons and details/summary disclosures on the live site
- Run Lighthouse on the live URL
- Push a small change to main — verify live site updates within 5 minutes
- Send the URL to someone — ask them "what is this?" after 30 seconds

---

## Part 6: Post-Build

### Remove Test Pages

After all tickets are merged, remove:
- /component-test (from Ticket 4)
- Any other test pages created during development

### Final Verification

Walk through the entire student journey:
1. Landing page → "Start here"
2. How This Works → Shared Setup → Web Dev Setup → Project 1
3. Web Dev category landing → Project 1 landing → PRD → BACKLOG → Guide → Design Spec → CLAUDE.md
4. Checkpoint After Project 1
5. Project 2 landing → materials → CI Guide → Gemini Guide
6. Checkpoint After Project 2
7. Bridge → Choose Your Arc → pick an arc
8. Flawed PRD for chosen arc
9. Arc landing → Project 3 → Project 4 → Project 5
10. Checkpoints after 3, 4, 5
11. Project 6
12. Checkpoint After Project 6
13. Templates page — copy a template

Every link should work. Every page should load. Every interactive element should function.

### Sprint Retro

Run a retro covering the full build:

**Workflow:**
- How did the ticket progression feel? Were tickets the right size?
- Which tickets were harder than expected? Why?
- Were the acceptance criteria specific enough?

**Design:**
- Is the design consistent across all 54 pages?
- Are there any visual inconsistencies to fix?
- Does the mobile experience work well?

**Performance:**
- Lighthouse scores across page types?
- Any pages loading slowly?

**Content:**
- Walking the full student journey — any gaps or confusing transitions?
- Any content that needs updating based on what was learned during the build?

**Lessons:**
- What would you do differently if building this again?
- What did Claude Code do well? What did it struggle with?
- What acceptance criteria should you have written but didn't?
