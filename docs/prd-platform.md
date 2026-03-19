# PRD: The Platform

## 1. Executive Summary

Build a website that organises the AI-directed development learning content into a navigable student journey. The platform will eventually host six categories (Web Dev, Data, ML, AI Integration, Cybersecurity, Cloud & DevOps). Web Development is the first category to launch, with 55 content documents. The site structure must accommodate future categories without restructuring URLs or navigation. Shared content (getting started, templates) lives at the top level. Category-specific content (projects, arcs, checkpoints) lives under a category prefix (e.g., `/web-dev/`).

## 2. Problem Statement

The content currently exists as files in a folder. A student opening this folder has no idea where to start, what order to follow, or how the pieces connect. The content needs a home that:

- Makes the first 30 seconds clear: what is this, who is it for, how do I start
- Guides students through the correct sequence without them needing to read a map
- Presents templates in a copy-pasteable format (students paste these into AI)
- Keeps the content free, open, and fast-loading

There is no existing platform. This is a new build.

## 3. Target Users

| User | Who They Are | What They Need | Access |
|---|---|---|---|
| New visitor | Someone who found the platform via a link, search, or recommendation. May be a university student, self-taught learner, or career changer. Not technical | Understand what this is in 30 seconds. Decide if it's for them. Know how to start | Desktop and mobile browser |
| Active student | Someone working through the projects. Returns repeatedly over weeks | Find their current project quickly. Access the right materials for their current step. Copy templates into AI. Complete checkpoint exercises | Primarily desktop (they're coding alongside), but mobile for reading |
| Returning student | Someone who completed some projects and comes back after a break | Remember where they left off. Find the arc materials. Access templates they've used before | Desktop and mobile |

## 4. Scope — What We're Building

### 4.1 Landing Page

The first thing anyone sees. Must communicate what the platform is, who it's for, and how to start within 30 seconds of scrolling.

- Hero: one-line value proposition + subtitle
- What you'll build: the six projects listed with their +1
- How it works: the loop explained in 3-4 steps
- Who it's for: audience descriptions
- What you need: prerequisites summary
- Call to action: "Start here" → Getting Started
- Categories table showing Web Dev as available, others as coming soon

**Acceptance criteria:**
- A first-time visitor can explain what the platform does after 30 seconds on the page
- The "Start here" link navigates to the Getting Started section
- Categories table links to category landing pages (Web Dev links to `/web-dev`)
- The page loads in under 2 seconds on a 4G mobile connection
- All content is readable without horizontal scrolling on a 375px-wide screen (iPhone SE)

### 4.2 Category Landing Page (Web Dev)

The entry point for the Web Development category at `/web-dev`. Shows the category overview: what Web Dev covers, the six-project progression, the five arcs, and a "Start Project 1" CTA. When future categories launch, each gets the same structure at its own prefix.

**Acceptance criteria:**
- Page exists at `/web-dev`
- Shows: category name, description, the six projects with +1 statements, the five arcs as summary cards
- "Start Project 1" CTA links to `/web-dev/projects/1`
- "Choose Your Arc" links to `/web-dev/bridge/choose-arc`
- Page is linked from the homepage categories table

### 4.3 Getting Started Section

Four pages in sequence: How This Works → Shared Setup → Category Setup → Project 1.

**How This Works page (`/getting-started`):**
- The roles (Director, Claude Code, Gemini)
- The loop (plan → build → verify → deploy → reflect)
- The progression (six projects, each +1)
- Clear "Next: Setup" link at the bottom

**Shared Setup page (`/getting-started/setup`):**
- Tools every category needs: VS Code, Git, GitHub CLI, Claude Code
- Accounts every category needs: GitHub, Claude Pro/Max
- Verify commands for each tool
- Troubleshooting section for shared tools
- Clear "Next" link to the student's chosen category setup (for now, links to Web Dev setup)

**Category Setup page (`/web-dev/getting-started`):**
- Tools specific to Web Development: Node.js, Docker
- Accounts specific to Web Development: Gemini API key, Netlify
- Verify commands for each tool
- Troubleshooting section for category-specific tools
- Clear "Next: Project 1" link at the bottom
- Note: when future categories launch, each gets its own setup page (e.g., `/data/getting-started` for Python, Jupyter, etc.)

**Acceptance criteria:**
- Each page has a clear "Next" link at the bottom leading to the next page in sequence
- Shared setup does NOT include Node.js, Docker, or any category-specific tools
- Category setup does NOT repeat VS Code, Git, GitHub CLI, or Claude Code
- Terminal commands are displayed in code blocks visually distinct from prose
- Pages work without JavaScript

### 4.4 Project Pages (×6)

Each project has a landing page and sub-pages for its materials.

**Project landing page:**
- Project name and the +1 statement
- What you'll build (2-3 sentences)
- What you'll learn (bullet list)
- Prerequisites (what project comes before this)
- Estimated time
- Materials list with links: PRD, CLAUDE.md, BACKLOG, step-by-step guide, design spec (if applicable)
- "Start this project" call to action

**Material sub-pages:**
- Each material (PRD, BACKLOG, guide, etc.) rendered as its own page
- Code blocks and terminal commands visually distinct
- Tables rendered properly
- Checkbox lists rendered as visual checklists (for acceptance criteria and backlogs)

**Acceptance criteria:**
- Every project landing page shows: name, +1, description, prerequisites, time estimate, and material links
- Clicking a material link opens the full content on its own page
- Code blocks use monospace font with a distinct background colour
- Tables are readable on mobile (horizontal scroll if necessary, not broken layout)
- Project 2 materials show the Phase A / Phase B structure with the pause point visually distinct

### 4.5 Bridge Section

A dedicated section between Project 2 and Project 3 containing:
- Bridge instructions (annotate → repair → generate)
- Arc chooser (which arc is right for you)
- Links to the five flawed PRDs (one per arc)
- Link to the answer keys (hidden by default, revealed on click/toggle)

**Acceptance criteria:**
- The bridge section appears in the navigation between Project 2 and Project 3
- Answer keys are hidden behind a toggle/accordion — not visible by default
- The arc chooser includes both the interest-based table and the course-based table
- Each arc links to its flawed PRD and then to its Project 3 materials

### 4.6 Arc Pages (×5)

Each arc has a landing page and sub-pages.

**Arc landing page:**
- Arc name, client description, what you'll build across Projects 3-5
- Unique directing challenges
- Who this arc is best for
- Estimated time
- Links to materials for Projects 3, 4, and 5

**Material sub-pages for each project within the arc:**
- Client brief (student-facing text only — guidance notes displayed as expandable hints, not inline)
- Simulated scope changes and incidents displayed as callout boxes that can be revealed at the right moment (or all shown upfront — student choice)

**Acceptance criteria:**
- Each arc landing page shows: name, description, projects, challenges, audience, time estimate
- Client briefs are displayed as readable prose without the instructor guidance inline
- Guidance notes are accessible via an expandable "Directing hints" section below the brief
- Simulated scope changes are in a visually distinct callout box (e.g., coloured border or background)

### 4.7 Checkpoint Pages (×6)

One page per checkpoint (after each project).

- Exercise text with the scenario or question
- Answer hidden behind a toggle/accordion — student attempts the exercise before revealing
- "What these exercises tell you" summary at the bottom

**Acceptance criteria:**
- Answers are not visible until the student clicks to reveal them
- Each checkpoint page links back to the next project ("Ready? Start Project N")
- The toggle works without a full page reload

### 4.8 Templates Section

A single page listing all 10 templates with:
- Template name and one-sentence description
- "Copy to clipboard" button for each template's full text
- Expandable preview of each template's content

**Acceptance criteria:**
- Clicking "Copy to clipboard" copies the full template text and shows a brief confirmation ("Copied!")
- The copied text preserves markdown formatting (students paste into AI, which reads markdown)
- All 10 templates are listed on one page, not 10 separate pages
- The copy button works on mobile

### 4.9 Project 6 Page

A single page with the universal Project 6 brief and guidance, plus collapsible sections for each arc's specific operational concerns.

**Acceptance criteria:**
- The universal content is displayed by default
- Arc-specific sections are collapsible/expandable, labelled by arc name
- A student who only did Arc A sees the universal content + Arc A specifics without being distracted by Arcs B-E

### 4.10 URL Structure

The platform is designed for multiple categories. Web Dev launches first. URLs reflect this:

**Shared content (top level):**
- `/` — Landing page
- `/getting-started` — How This Works
- `/getting-started/setup` — Setup Guide
- `/templates` — All templates (Framework templates are category-agnostic)

**Category-specific content (prefixed):**
- `/web-dev` — Web Dev category landing page
- `/web-dev/projects/1` — Project 1
- `/web-dev/projects/1/guide` — Project 1 step-by-step guide
- `/web-dev/projects/2` — Project 2
- `/web-dev/bridge` — Bridge instructions
- `/web-dev/bridge/choose-arc` — Arc chooser
- `/web-dev/arcs/a` — Arc A landing
- `/web-dev/arcs/a/project-3` — Arc A Project 3 materials
- `/web-dev/checkpoints/after-project-1` — Checkpoint
- `/web-dev/projects/6` — Project 6

When future categories launch (e.g., `/data/projects/1`), no existing URLs change.

### 4.11 Navigation

**Sidebar navigation (desktop):**
- Home
- Getting Started (expandable: How This Works, Setup Guide)
- Web Development (expandable):
  - Projects (expandable: Project 1, Project 2, Bridge, Project 3*, Project 4*, Project 5*, Project 6)
    - *Projects 3-5 show arc-specific sub-navigation when an arc is selected
  - Choose Your Arc
  - Checkpoints (expandable: After Project 1, 2, 3, 4, 5, 6)
- Templates
- *Future categories appear here as they launch*

**Mobile navigation:**
- Hamburger menu with the same structure
- Current page highlighted

**Breadcrumbs:**
- Every page shows: Home > Section > Page (e.g., Home > Web Dev > Projects > Project 2 > BACKLOG)

**Acceptance criteria:**
- The sidebar shows the student's current page as highlighted/active
- Expanding a section in the sidebar doesn't collapse other sections
- Breadcrumbs are present on every page except the homepage
- The category name ("Web Development") appears in the sidebar and breadcrumbs
- The URL structure uses `/web-dev/` prefix for all category-specific content
- On mobile, the hamburger menu opens and closes without a full page reload
- Navigation works with JavaScript disabled (links still navigate, even if expand/collapse doesn't animate)

### 4.12 Visual Design

- Clean, minimal, content-focused
- Dark sidebar, light content area
- Typography-forward: good line height, readable font size, appropriate line length (max ~720px for prose)
- Code blocks: monospace font, distinct background (light grey or dark), with subtle border
- Callout boxes for client briefs and simulated incidents (coloured left border)
- Tables: readable, with header row styled distinctly
- Mobile-responsive: content stacks cleanly, tables scroll horizontally, code blocks scroll horizontally

**Acceptance criteria:**
- Body text is at least 16px with line-height of at least 1.6
- Maximum content width is between 680px and 760px
- Code blocks are visually distinct from surrounding text at a glance
- The site looks professional — not a default template, not over-designed
- Light and dark mode not required (light only is fine)

## 5. Anti-Scope — What We're NOT Building

- **No user accounts or login** — the platform is open, no registration
- **No progress tracking** — no database storing which projects a student has completed
- **No backend or API** — this is a static site serving content
- **No comments or community features** — no forums, no chat, no discussions
- **No search** — the sidebar navigation is sufficient for the amount of content
- **No CMS** — content is managed as files in the repository, not through an admin interface
- **No analytics beyond basic page views** — no user tracking, no session recording, no A/B testing
- **No email collection or newsletter** — no signup forms
- **No payment or donations** — the platform is free
- **No blog or news section**
- **No dark mode** — light mode only for v1
- **No internationalisation** — English only
- **No PDF generation or download** — templates are copy-to-clipboard, not downloadable files
- **No interactive code editor or sandbox** — students use their own local tools
- **No AI integration in the platform** — the platform serves content, students use AI separately

## 6. User Stories

- As a new visitor, I want to understand what this platform does within 30 seconds so I can decide if it's relevant to me
- As a new visitor, I want to see what I'll build so I can imagine the outcome
- As a new student, I want a clear starting point so I don't get overwhelmed by the amount of content
- As a student working on Project 2, I want to find the Project 2 materials quickly so I can continue where I left off
- As a student about to start Project 3, I want to choose an arc that matches my interests so I build something I care about
- As a student in the bridge exercise, I want to attempt the flawed PRD repair without seeing the answers so I can test my own judgment
- As a student directing Claude, I want to copy a template to my clipboard in one click so I can paste it into the AI immediately
- As a student on a checkpoint page, I want to attempt the exercise before seeing the answer so the self-assessment is honest
- As a student on mobile, I want to read the project guides on my phone so I can review while away from my computer
- As a student returning after a break, I want to navigate to my current project quickly so I don't waste time finding my place

## 7. Success Metrics

- **Performance:** Every page loads in under 2 seconds on 4G. Lighthouse performance score above 90.
- **SEO:** Lighthouse SEO score above 95. Pages are indexable. Open Graph tags on all pages.
- **Accessibility:** Lighthouse accessibility score above 90. All images have alt text. All interactive elements keyboard-accessible. Sufficient colour contrast.
- **Content completeness:** All 55 documents are accessible through the navigation. No broken links. No missing pages.
- **Functionality:** Copy-to-clipboard works on desktop and mobile. Expand/collapse elements (details/summary) work. Navigation highlights the current page.
- **Deployment:** Live at a public URL. SSL certificate. Loads on mobile and desktop.

## 8. Technical Constraints

- **Static site** — no server, no database, no backend. Content is pre-rendered at build time.
- **Tech stack:** Astro (static site generator) + Tailwind CSS. Astro renders markdown to HTML at build time, produces zero-JS pages by default, and supports interactive islands where needed (copy button, toggles).
- **Hosting:** Netlify or Vercel (free tier)
- **Content format:** Markdown files in the repository. The existing .md content files become the source of truth.
- **Browser support:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Repository:** Public GitHub repo

## 9. Open Questions

1. **Name and domain:** The platform doesn't have a name or domain yet. The PRD uses "the platform" as a placeholder. A name is needed before deploy but not before building.
2. **Astro vs alternatives:** Astro is recommended because it renders markdown natively, produces fast static sites, and supports interactive islands. Other options: Next.js (heavier, more JS), Docusaurus (opinionated, may feel too much like docs), Hugo (fast but less flexible for interactive elements). Decision: proceed with Astro unless there's a strong reason not to.
3. **Content updates:** When content is updated, the site is rebuilt and redeployed. This is fine for the current scale. No CMS needed.
4. **Favicon and branding:** No logo or brand assets exist yet. Use text-based branding for v1. A logo can be added later.
