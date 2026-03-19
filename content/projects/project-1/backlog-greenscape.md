---
title: "BACKLOG: GreenScape Landscaping"
description: "8 tickets from empty directory to live site"
page_type: "material"
section: "web-dev"
prev: "/web-dev/projects/1/prd"
next: "/web-dev/projects/1/guide"
---
# BACKLOG

## Ticket 1: Project Setup

**Labels:** setup
**Dependencies:** None
**Size:** S

**Description:**
Create the GitHub repository, copy CLAUDE.md and BACKLOG.md into it, set up the initial project structure. Create GitHub labels (setup, frontend, deploy), create Issues for all tickets, and create a GitHub Project board.

**Acceptance Criteria:**
- [ ] GitHub repository exists with CLAUDE.md and BACKLOG.md committed
- [ ] GitHub labels created: `setup`, `frontend`, `deploy`
- [ ] GitHub Issues created for all tickets in this backlog
- [ ] GitHub Project board created with columns: To Do, In Progress, Done
- [ ] All Issues added to the Project board in the To Do column
- [ ] .gitignore includes node_modules, dist, .env

---

## Ticket 2: Development Environment

**Labels:** setup
**Dependencies:** Ticket 1
**Size:** S

**Description:**
Initialise the React + Vite project with Tailwind CSS. Create the basic file structure from CLAUDE.md. Create the Makefile with dev, build, lint, and preview commands. Create the content data file with placeholder text.

**Acceptance Criteria:**
- [ ] `make dev` starts the Vite development server on localhost:5173
- [ ] The browser shows a blank page with "GreenScape Landscaping" as the page title
- [ ] Tailwind CSS is working (a test utility class like `text-red-500` renders correctly)
- [ ] `make lint` runs ESLint without errors
- [ ] `src/data/content.js` exists with placeholder content for all sections
- [ ] The repository structure matches CLAUDE.md

---

## Ticket 3: Site Layout & Navigation

**Labels:** frontend
**Dependencies:** Ticket 2
**Size:** M

**Description:**
Implement the page layout from the design file: sticky header with logo/business name and navigation links, main content area, footer with copyright and contact info. Navigation links scroll to the corresponding section. Layout is responsive across mobile, tablet, and desktop.

**Acceptance Criteria:**
- [ ] Header displays business name and navigation links (Services, Area, Testimonials, About, Contact)
- [ ] Clicking a navigation link smooth-scrolls to the corresponding section
- [ ] Header remains visible when scrolling (sticky)
- [ ] Footer displays copyright year and basic contact info
- [ ] On mobile: navigation collapses into a hamburger menu that opens/closes on tap
- [ ] On desktop: navigation links are displayed horizontally
- [ ] Page background, fonts, and colours match the design tokens in CLAUDE.md

**Technical Notes:**
- Use `scroll-behavior: smooth` for navigation scrolling
- Use Tailwind responsive prefixes (`md:`, `lg:`) for breakpoints
- Header z-index must be above all content

---

## Ticket 4: Hero & Services Section

**Labels:** frontend
**Dependencies:** Ticket 3
**Size:** M

**Description:**
Implement the hero section (headline, tagline, background image placeholder, call-to-action that scrolls to contact) and the services section (6 service cards in a responsive grid). Content comes from `content.js`.

**Acceptance Criteria:**
- [ ] Hero section displays business name, tagline, and a call-to-action button ("Get in Touch")
- [ ] Call-to-action button scrolls to the Contact section
- [ ] Hero has a background image or colour that matches the design
- [ ] 6 service cards displayed, each with: icon/image placeholder, service name, brief description
- [ ] Services grid: 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] All text content comes from `content.js`, not hardcoded in the component
- [ ] No horizontal scrolling on any screen size

---

## Ticket 5: Testimonials & About Sections

**Labels:** frontend
**Dependencies:** Ticket 4
**Size:** M

**Description:**
Implement the testimonials section (4 client testimonials in cards) and the about section (owner photo placeholder, bio text). Content from `content.js`.

**Acceptance Criteria:**
- [ ] 4 testimonials displayed, each with: quote text in quotation marks, client first name and suburb, 5-star rating visual
- [ ] Testimonials have a visually distinct style (different background or card treatment)
- [ ] About section has a photo placeholder area and 2-3 paragraphs of bio text
- [ ] About text has proper line length for readability (not full-width on large screens, max ~700px)
- [ ] Star ratings are visual (icons or CSS), not text ("★★★★★" is acceptable, "5/5" is not)

---

## Ticket 6: Service Area & Contact Sections

**Labels:** frontend
**Dependencies:** Ticket 5
**Size:** M

**Description:**
Implement the service area section (list of suburbs served) and the contact section (phone, email, address, business hours). Phone number must be a clickable `tel:` link. Email must be a clickable `mailto:` link.

**Acceptance Criteria:**
- [ ] Service area displays all 10 suburbs listed in the PRD
- [ ] Contact section shows: phone number, email address, business address, business hours
- [ ] Phone number is a `tel:` link — tapping on mobile opens the phone dialer
- [ ] Email address is a `mailto:` link — clicking opens the default email client
- [ ] Business hours are clearly formatted (e.g., "Mon–Fri: 7am–5pm, Sat: 8am–2pm, Sun: Closed")
- [ ] No contact form exists (anti-scope) — only direct contact links

**Technical Notes:**
- Check anti-scope: if Claude adds a contact form, remove it. The PRD says phone and email links only.

---

## Ticket 7: SEO & Meta Tags

**Labels:** frontend
**Dependencies:** Ticket 6
**Size:** S

**Description:**
Add SEO metadata: page title, meta description, Open Graph tags for social sharing, semantic HTML verification. Ensure proper heading hierarchy.

**Acceptance Criteria:**
- [ ] Page title contains "GreenScape Landscaping" and "Melbourne" (check in browser tab)
- [ ] `<meta name="description">` tag exists with a unique description (150-160 characters)
- [ ] Open Graph tags present: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] Only one `<h1>` element on the page (verify in DevTools)
- [ ] Heading hierarchy is logical: h1 → h2 → h3 (no skipped levels)
- [ ] All sections use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- [ ] All images have `alt` text
- [ ] Lighthouse SEO score is 90 or above

**Technical Notes:**
- To verify: View Page Source (Ctrl+U) and search for `<meta`. Also run Lighthouse in DevTools → Audits tab.

---

## Ticket 8: Deploy

**Labels:** deploy
**Dependencies:** Ticket 7
**Size:** S

**Description:**
Deploy the site to Netlify free tier. Verify the live site matches the development version.

**Acceptance Criteria:**
- [ ] Site is deployed to a live URL (e.g., greenscape-landscaping.netlify.app)
- [ ] All sections load correctly on the live site
- [ ] Images load on the live site (not broken)
- [ ] Phone `tel:` link works on a real mobile phone
- [ ] Site is responsive on the live URL (check on actual phone, not just DevTools)
- [ ] Lighthouse performance score is 80 or above on the live site
- [ ] Lighthouse SEO score is 90 or above on the live site
