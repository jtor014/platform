# Ticket Backlog

The loop for every ticket:

1. You say **"Start Ticket N."**
2. Claude creates a feature branch, implements the ticket, commits, opens a PR with "Closes #N"
3. Claude runs self-review against acceptance criteria, posts as PR comment
4. CI and Gemini review run automatically
5. Claude reports back: CI status, reviews, recommendation
6. You verify: open the dev server, check the page, test on mobile, compare to design system
7. You decide: **"Merge it"** or **"Fix those"**

---

## Completed

Tickets 1–9 from the original backlog are done. The platform has:
- Astro + Tailwind + TypeScript project with CI (T1–T2)
- Design system, layouts, 9 components (T3–T4)
- Homepage, Web Dev landing, Getting Started (setup), Projects landing (T5–T6)
- Project 1: full 8-step SDLC pages with content (T7)
- CI and Gemini setup guides (T8)
- Project 2: full 8-step SDLC pages with content (T9)

Original tickets 12–14e (bridge, arcs, arc materials) were removed when the platform linearised to 6 straight projects.

---

## Ticket 10: Project 3–5 Stub Pages

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 10. The projects landing and web-dev landing link to /web-dev/projects/3, /web-dev/projects/4, and /web-dev/projects/5 but no pages exist. Create minimal stub pages for each. Use DocsLayout. Each shows the project title, a "Coming soon" message, a one-sentence description of what the project will cover, and prev/next navigation. Check the manifest — entries for these routes already exist.

**Acceptance Criteria:**
- Pages exist at /web-dev/projects/3, /web-dev/projects/4, /web-dev/projects/5
- Each shows the project title and "Coming soon" — not a blank page or 404
- Prev/next navigation works (matches manifest prev/next values)
- Breadcrumbs render correctly
- No broken links remain on the projects landing or web-dev landing

**Director's verification:**
- Click each "Coming soon" project card on the projects landing — a real page loads
- Prev/next links chain correctly through the project sequence

---

## Ticket 11: Checkpoint Pages (×6)

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 11. Build all 6 checkpoint pages at /web-dev/checkpoints/after-project-1 through /web-dev/checkpoints/after-project-6. Read content files in content/checkpoints/. Each exercise uses details/summary with "Check your answer" (question visible, answer behind the toggle). Code snippets use CodeBlock. Tables use styled HTML tables. Summary section at the bottom. Link to the next step ("Ready? Start [next thing]"). Note: checkpoint-after-project-2.md has `next: "/web-dev/bridge"` in frontmatter — ignore that, use the manifest's next value instead. checkpoint-after-project-6.md mentions "pick a second arc" — replace with "wait for new categories as they launch" or similar.

**Acceptance Criteria:**
- All 6 checkpoint pages render correctly at their manifest routes
- Each exercise: question visible, answer hidden by default behind "Check your answer" toggle
- Clicking toggle reveals answer; revealing one does not reveal others
- Code snippets use CodeBlock component
- Tables use styled HTML tables
- Each page ends with a link to the next step (per manifest prev/next, not content frontmatter)
- No references to arcs, bridge, or "choose your arc" in the rendered pages
- Consistent styling across all 6 pages

**Director's verification:**
- Visit each checkpoint page
- Attempt an exercise mentally, then click to reveal — does the answer make sense?
- Check that revealing one answer doesn't reveal others
- Check the "Ready?" links — correct destinations (per manifest)
- Search page text for "arc" or "bridge" — should find nothing

---

## Ticket 12: Templates Page

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 12. Build the templates page at /templates. Read content files in content/templates/. Each markdown file IS the template — read its body as the copyable text. Use frontmatter for title and description. All 10 templates on one page using Card + details + CodeBlock components. Grouped into three sections: Planning (PRD, Architecture, Design, Ticket Backlog), Build (CLAUDE.md, Component Spec), Operational (Sprint Retro, Risk Assessment, Runbook, Handover). Each template: name, one-sentence description, expandable preview (details/summary), copy button for full markdown text.

**Acceptance Criteria:**
- All 10 templates listed with name and one-sentence description
- Grouped under three section headings: Planning, Build, Operational
- Each has a copy button that copies the full markdown template text
- Each has an expandable preview (collapsed by default, click to expand)
- "Copied!" confirmation appears for 2 seconds after clicking Copy
- Copy works on mobile
- Copy preserves markdown formatting (paste into a text editor — headers, bullets, code blocks all present)
- A student can identify the right template without expanding anything

**Director's verification:**
- Copy each template — paste into a text editor — markdown formatting correct?
- Open on mobile — copy buttons work? Layout readable?
- Expand and collapse previews — smooth?
- Can you find the Sprint Retro template in under 5 seconds? (Scannable test)

---

## Ticket 13: Project 6 Page

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 13. Build /web-dev/projects/6 page. Read content/projects/project-6/project-6-universal.md. Important: the content file has an "Arc-Specific Additions" section (lines 155–183) and references to arcs in the "Final Sprint Retro" — skip those entirely. The platform no longer has arcs. Render only the universal content: what the project is, the client brief, "what enough looks like", templates table, the 14 tickets (grouped by section with Checklist components), and the 5 key directing moments. The "concrete thrills" (backup verification, monitoring calibration, data audit, handover test, cost conversation) should be highlighted prominently. End with the "What You Can Now Do" section — edit out any arc references.

**Acceptance Criteria:**
- Page exists at /web-dev/projects/6 and renders correctly
- Universal content displayed: intro, client brief, "what enough looks like", templates, tickets, directing moments
- No references to arcs, arc-specific additions, or "choose an arc" anywhere on the page
- Tickets displayed as Checklist sections grouped under Infrastructure, Monitoring, Backups, Security, Data Protection, Documentation, Cost
- Key directing moments highlighted prominently (Callout or similar)
- "What You Can Now Do" section at the end — clean, no arc references
- Links to relevant templates (risk assessment, runbook, handover)
- Prev/next navigation works per manifest

**Director's verification:**
- Page renders all universal content without missing sections
- Search page text for "arc" — should find nothing
- Key directing moments stand out visually
- Template links work
- Prev/next links correct

---

## Ticket 14: Content Cleanup

**Labels:** chore

**What to tell Claude:**
> Start Ticket 14. Clean up orphaned content files and stale references. Delete: content/arcs/ (entire directory), content/bridge/ (entire directory), content/getting-started/choose-your-arc.md, content/getting-started/how-this-works.md, content/getting-started/shared-setup.md. These files are leftover from the arc-based structure that was removed. Also fix stale frontmatter in content/checkpoints/checkpoint-after-project-2.md — the `next` field points to "/web-dev/bridge" which no longer exists. Remove or update it. Check content/checkpoints/checkpoint-after-project-6.md for "pick a second arc" — update to remove arc references.

**Acceptance Criteria:**
- content/arcs/ directory deleted
- content/bridge/ directory deleted
- content/getting-started/choose-your-arc.md deleted
- content/getting-started/how-this-works.md deleted
- content/getting-started/shared-setup.md deleted
- No content file references arcs or bridge
- `make build` still succeeds after deletions
- No broken links introduced

**Director's verification:**
- `ls content/arcs` and `ls content/bridge` — should not exist
- `grep -r "arc" content/checkpoints/` — only benign matches (e.g., "architecture"), no arc-as-pathway references
- `make build` passes

---

## Ticket 15: SEO & Meta

**Labels:** frontend

**What to tell Claude:**
> Start Ticket 15. Add SEO metadata to all pages. Every page needs: unique title tag ("[Page Title] | The Platform"), meta description, Open Graph tags (og:title, og:description, og:image, og:url), canonical URL. Create a default OG image (simple text-based graphic). Add @astrojs/sitemap integration to generate sitemap.xml. Add robots.txt.

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

## Ticket 16: Deploy

**Labels:** deploy

**What to tell Claude:**
> Start Ticket 16. Connect the GitHub repo to Netlify. Configure build settings (command: npm run build, publish: dist/). Netlify auto-deploys on push to main — no GitHub Actions deploy workflow needed. Verify all pages render correctly on the live URL.

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

**Director's verification:**
- Open the live URL on desktop and mobile
- Click through every section in the sidebar
- Test copy buttons and details/summary disclosures on the live site
- Run Lighthouse on the live URL
- Push a small change to main — verify live site updates within 5 minutes
- Send the URL to someone — ask them "what is this?" after 30 seconds
