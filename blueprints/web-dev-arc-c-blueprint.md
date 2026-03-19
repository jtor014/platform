# Web Dev Arc C: The Content Platform — Blueprint

## Overview

**The client:** A community organisation, local publication, neighbourhood blog, industry newsletter, or small media outlet. Someone with content to publish and an audience to reach.

**The arc:** CMS for writers → newsletter integration → community engagement (comments, moderation, member content).

**Why this arc:** Arc A and B operate in domains where the data model is transactional (bookings, orders). Arc C introduces completely different directing challenges: **anti-scope vigilance and non-technical user acceptance criteria.** Content platforms are the domain where AI most aggressively over-engineers. Tell Claude "build a blog" and it produces a full CMS with user accounts, comments, social sharing, RSS, newsletters, tag clouds, and a WYSIWYG editor — when the brief said "a site that shows our articles." The student's primary skill is holding the line. The second unique challenge is building for people who don't know what HTML is.

**This document covers Projects 3-6 in Arc C context.** For Projects 1 and 2, see `web-dev-project-1-blueprint.md` and `web-dev-project-2-blueprint.md`.

**Note on Project 1 variant:** If the student uses Arc C for Project 1, the static site is an editorial publication (typography-forward, SEO-heavy, article pages rendered from markdown). The key differences from Arc A: invisible verification (meta tags, structured data, sitemaps via View Source), anti-scope as the primary battle (Claude will aggressively try to add a CMS, comments, newsletter), and typography verification (reading experience, not just layout).

---

## The Student Arrives With

After completing Projects 1 and 2, the student has:

- **18 ticket cycles completed** — the loop is familiar
- **Two PRDs read and annotated** — they understand PRD structure and anti-scope
- **One flawed PRD repaired** — they can spot scope creep, vague criteria, and over-engineering
- **Design and functional verification skills** — DevTools, Network tab, database shell
- **The full technical stack running** — Docker, FastAPI, PostgreSQL, React, CI, Gemini review, deploy
- **Two judgment checkpoints passed**

They have NOT yet:
- Built for non-technical end users (writers who don't know what HTML is)
- Written acceptance criteria from someone else's perspective
- Handled content migration (moving data between storage formats)
- Dealt with user-generated content and moderation
- Integrated a third-party email service
- Responded to an abuse incident

---

## The Arc-Specific Flawed PRD (For the Bridge)

The brief it was generated from: "Our committee needs a way to publish articles online."

**The flaws the student must find and fix:**

1. **Massive scope creep:** The AI added user registration, comments, social sharing, RSS feeds, newsletters, tag clouds, search, and author profiles. The client said "publish articles." This is the most aggressive anti-scope exercise — the student must cut 8+ features the AI assumed were needed.
2. **Developer-facing acceptance criteria:** The CMS ticket says "Authors can enter article content in Markdown format." Writers don't know Markdown. Should say: "Writers can type text and use formatting buttons that look like a word processor. They never see Markdown, HTML, or code."
3. **Missing anti-scope:** No anti-scope section. The student must add one — and it will be the longest anti-scope of any arc because content platforms attract the most feature assumptions.
4. **Over-engineered architecture:** The AI recommended a separate microservice for content delivery, a headless CMS, GraphQL API, and a CDN. For a community organisation with 30 articles and 500 weekly readers, this is absurd. A single app with PostgreSQL is sufficient.
5. **Oversized ticket:** "Build the content management system" — that's the entire project, not a ticket. The student must decompose it.
6. **Technical language in user-facing features:** "Configure the SEO metadata for each post" — writers want to write, not do SEO. The system should auto-generate SEO metadata from the content.

---

## Project 3: "Our Writers Need to Publish Without a Developer"

### The Client Brief

> "The website looks great and people are reading it. But here's the problem — every time we want to publish a new article, we have to ask you to add it. Our committee has four people who write content, and none of them are technical. I need them to be able to log in, write an article, preview it, and publish it — without needing to know anything about code. We also want to be able to save drafts and schedule articles to go live at a specific date and time."

> **The scope creep moment (simulated):** One of the writers asks: "Can I add images in the middle of my article? And can we have different article layouts — like some with a big header image and some without?"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | First time building for non-technical end users |
| All planning templates | PRD, architecture, design, CLAUDE.md |
| The repaired flawed PRD | The student just cut 8+ features and rewrote developer-facing criteria |
| The existing Project 1 codebase | The publication site with articles stored as markdown files |
| **Critical framing** | "Acceptance criteria must be written from the perspective of a writer who has never used a CMS and doesn't know what HTML, Markdown, or a 'slug' is." |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Generates** — every feature described in user's language, not developer terminology |
| Architecture template | **Generates** — critical: how does content migrate from markdown files to database? |
| Design template | **Generates** — wireframes for CMS. Focus on simplicity for non-technical users |
| Component spec template | **First use** — rich text editor, article status badge, article list with filters |
| Sprint retro template | **First formal use** |

### The Planning Phase

**The non-technical user PRD (the "grandmother test"):**
The student guides AI through the PRD template, reviewing every feature through: "Would a non-technical person understand this?"

Common AI failures:
- "Enter the article slug" — what's a slug?
- "Write your article in Markdown" — writers don't know Markdown
- "Configure the SEO metadata" — writers want to write, not do SEO
- "Submit for editorial review, then approve, then schedule" — three writers don't need a four-stage pipeline

The flow should be: log in → "New Article" → write in a rich text editor → "Preview" → "Publish" or "Save Draft" or "Schedule." That's it.

**The migration decision:**
Project 1 stored articles as markdown files. Project 3 needs a database. What happens to existing articles? The architecture must include a migration script. If AI skips migration, existing content disappears when the CMS goes live.

**The rich text editor verification:**
Claude will recommend a library. Libraries change, get abandoned, or have APIs that AI hallucinates. The student verifies: does it exist? Is it maintained? Does the API match? Does it output clean HTML?

### The Tickets

1. **Authentication System** — login for writers and admin. Email/password. Admin creates accounts (no public registration)
2. **Article Database Migration** — create articles table, migrate existing markdown to database, update rendering
3. **CMS Layout & Navigation** — admin interface shell: sidebar, header, main content area
4. **Article List View** — writer sees own articles, admin sees all. Status filters. Search by title
5. **Rich Text Editor** — WYSIWYG word processor. Bold, italic, headings, links, lists. No HTML/Markdown exposure
6. **Image Upload in Editor** — insert images mid-article. Upload, resize, alt text. Stored properly
7. **Article Preview** — exactly how it will look on the public site. Must match pixel-for-pixel
8. **Save Draft** — save without publishing. Return later to continue
9. **Publish & Schedule** — publish immediately or set future date/time. Scheduled articles auto-publish
10. **Article Management** — edit published, unpublish (return to draft), delete with confirmation
11. **Auto-generated SEO** — meta description from first paragraph, slug from title, Open Graph tags. Writer never sees these
12. **Featured Image** — (scope addition) optional header image. Writer chooses during editing

### Key Directing Moments

**The "grandmother test" for acceptance criteria:**
Every CMS feature needs criteria from the non-technical user's perspective:

Bad: "The rich text editor should support Markdown shortcuts and emit clean semantic HTML."
Good: "A writer can type text, make words bold or italic using buttons that look like a word processor, add headings from a dropdown, and insert links by highlighting text and clicking a link button. The writer never sees HTML, Markdown, or code of any kind."

Bad: "Articles should have configurable URL slugs."
Good: "When a writer creates an article titled 'Summer BBQ This Saturday,' the system automatically generates the URL. The writer never sees or edits the URL."

**The preview accuracy test:**
Preview must show exactly what the public site shows. Same fonts, spacing, layout. The student compares side-by-side. AI frequently builds preview as a separate rendering path that drifts from the public template.

**The rich text editor hands-on test:**
The student writes an article as a non-technical writer:
- Make text bold? (Click a button, not Ctrl+B)
- Add a heading? (Dropdown, not "type ##")
- Add a link? (Select text, click button, paste URL)
- Add an image? (Click button, select file, it appears)
- Undo? (Ctrl+Z works?)

If any fail, the editor isn't suitable.

**The content migration verification:**
After migration, all existing articles intact? Metadata preserved? Categories work? URLs unchanged? (Changed URLs break existing links and SEO.)

### What Can Go Wrong

- Claude builds a Markdown editor instead of rich text — writers see `## Heading`
- Recommended editor library deprecated or missing features
- Preview doesn't match public page
- Migration changes URLs — breaks SEO and existing links
- Scheduling uses server timezone, not writer's local timezone
- Claude adds "SEO Settings" to the editor — violates "writers never see technical details"
- Auto-generated slugs create duplicates for similar titles
- Image uploads work locally, break in production

### Sprint Retro

- Did the "grandmother test" produce effective acceptance criteria?
- How many times did AI expose technical concepts to writers?
- Was the editor library verified properly?
- How was migration handled?
- Did preview match the public site?

---

## Project 4: "We Want a Newsletter"

### The Client Brief

> "Readers love the site. We want to build our email list — a simple 'subscribe for updates' that sends people an email when we publish a new article. Nothing fancy, just title, summary, and a link."

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | Third-party email integration |
| All templates | Student adapts for email service integration |
| The existing codebase from Project 3 | Live CMS |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Adapts** — adds email service integration and deliverability requirements |
| Architecture template | **Adapts** — third-party email service selection and verification |

### The Tickets

1. **Newsletter Subscription Form** — email-only form on the site. Client-side and server-side validation
2. **Subscriber Management** — store subscribers. Admin view of subscriber list. Export to CSV
3. **Double Opt-In** — confirmation email with unique link. Only confirmed subscribers receive content. Link expires after 24 hours
4. **Unsubscribe** — one-click unsubscribe link in every email. Immediate removal
5. **Publish Notification** — when article published, send email to confirmed subscribers with title, summary, link
6. **Email Service Integration** — connect to third-party service (SendGrid, Buttondown, etc). Verify API against actual docs
7. **Deliverability Testing** — verify emails arrive in inbox, not spam. Test across email providers

### Key Directing Moments

**The double opt-in enforcement:**
Without double opt-in, anyone can subscribe anyone else. AI frequently skips this. Acceptance criteria: "Entering an email does not add to subscriber list. Confirmation email sent with unique link. Only after clicking is user added. Link expires after 24 hours."

**The email service verification:**
Same pattern as Stripe in Arc B — verify the recommended service exists, API is real, setup is correct. Email services change APIs frequently.

**The deliverability reality check:**
Emails from new domains often hit spam folders. The student verifies actual delivery, communicates limitations to client, recommends DNS configuration (SPF, DKIM).

### What Can Go Wrong

- No double opt-in — anyone can subscribe anyone
- Full article text in email (readers never visit the site, killing traffic)
- Emails land in spam — deliverability not tested
- Email API hallucinated — service doesn't work as Claude implemented
- Unsubscribe link missing or broken — potential legal issue

---

## Project 5: "We Want Readers to Engage"

### The Client Brief

> "The site is getting good traffic — about 500 readers a week. People discuss our articles on Facebook, but we'd love to keep that conversation on our site. We want readers to leave comments on articles. We also need a 'members only' section for committee documents and meeting minutes that the general public can't see."

> **The abuse scenario (simulated):** Two weeks after comments launch, someone posts a comment containing offensive language and a scam link. The client calls: "How do we deal with this?"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | User-generated content and content gating |
| All templates | Student extends for content moderation and safety |
| The existing codebase from Projects 3-4 | Live CMS with newsletter |
| **Critical framing** | "User-generated content is a liability. The PRD must address abuse before features." |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Extends** — adds "Content Moderation" section. What constitutes abuse, who moderates, what actions exist |
| Architecture template | **Extends** — comment storage, moderation states, content gating logic |
| Component spec template | **Multiple** — comment (states: pending/approved/flagged/removed), members-only badge |

### The Planning Phase

**The abuse-first PRD:**
The signature planning challenge. The student guides AI to address moderation before features:
- What constitutes a violation? (offensive language, spam, personal attacks, illegal content)
- Who moderates? (admin + writers on own articles)
- What actions exist? (approve, hide, delete, ban email)
- Default state? (Moderated-by-default — comments pending until approved)
- What does the commenter experience? (Held for moderation message, removal notification)
- Legal: content policy needed (flag to client — don't write legal text with AI)

**The content gating decision:**
"Members only" — who are members? The student prevents AI from building full public registration when the client means "12 committee members need access." Simple approach: add committee member role to existing auth, or gate to existing CMS accounts.

### The Tickets

1. **Comment Schema & API** — comments table with moderation status (pending/approved/hidden/deleted), CRUD endpoints
2. **Comment Display** — approved comments on article pages. Author name, date, body. Flat (no nesting)
3. **Comment Form** — name, email (not public), body. Submitted as "pending"
4. **Comment Moderation Interface** — pending list, approve/hide/delete actions, notification count
5. **Spam Prevention** — honeypot field, rate limiting, basic content filtering
6. **Comment Notifications** — email to author when comment pending, email to commenter when approved
7. **Members-Only Section** — "Committee" category visible but gated. Titles visible, content requires login
8. **Content Policy Page** — static page with comment guidelines. Linked from comment form
9. **Abuse Incident Response** — (simulated) review offensive comment, action it, assess safeguards, communicate to client, create follow-up tickets if needed

### Key Directing Moments

**The moderation-first implementation:**
Claude will try "build comments, add moderation later." The student enforces: comments default to "pending" from Ticket 1. Approval flow exists before any comment is visible. Security by design.

**The abuse response exercise:**
A process exercise, not a technical one. The student:
1. Finds and hides the offensive comment
2. Assesses: ban this email?
3. Reviews: would spam prevention have caught this? Update rules?
4. Communicates to client: what happened, what was done, what safeguards exist
5. Creates follow-up tickets if needed

**The content gating UX:**
Discoverable but not accessible. Committee category appears in navigation. Titles visible. Clicking shows login prompt. Claude may either hide entirely (bad for transparency) or show everything (no gating). Student specifies the middle ground.

**The honeypot test:**
The hidden form field that bots fill out — student verifies it's actually hidden with CSS. A visible empty field confuses real users.

### What Can Go Wrong

- Comments visible immediately (no moderation) — student catches during review
- Honeypot field visible — confuses users
- Notifications sent for auto-rejected spam — noisy
- Members-only content gated in frontend but API returns full content — security bug, student tests API directly
- Content policy contains AI-generated legal language — student flags for legal review
- Moderation interface doesn't show commenter email — can't ban abusers

### Sprint Retro (Final for Arc C)

- How effective was abuse-first PRD?
- Did the incident response feel realistic?
- Were non-technical user criteria from Project 3 maintained? (Comments are also submitted by non-technical users)
- Full arc retrospective: anti-scope discipline across all projects — what's the student's strategy?

---

## Project 6: "It Needs to Be Reliable"

Project 6 follows the same structure across all arcs — see Arc A's Project 6 for the full blueprint.

**Arc C-specific operational concerns:**
- Content moderation monitoring — alerts if moderation queue grows past threshold (abuse attack)
- Newsletter deliverability monitoring — bounce rate tracking, complaint rate
- Content backup verification — restored articles must include images and formatting, not just text
- Privacy considerations for subscriber data — email list is personal data
- Comment data in privacy audit — commenter emails stored even when not displayed publicly

---

## Summary

| Project | Client Says | Tickets | Primary Directing Challenge |
|---|---|---|---|
| 3 | "Writers need to publish" | 10-12 | Non-technical user acceptance criteria ("grandmother test"). Rich text editor verification. Content migration. Preview accuracy |
| 4 | "We want a newsletter" | 5-7 | Third-party email integration. Double opt-in. Email deliverability verification |
| 5 | "Readers want to engage" | 7-9 | Abuse-first PRD. Moderation as process. Spam prevention. Content gating UX |
| 6 | "It needs to be reliable" | 11-13 | Operational (same as Arc A) + content moderation monitoring + subscriber privacy |
| **Arc Total** | | **33-41** | |
| **With Projects 1-2** | | **~51-59** | **Anti-scope, non-technical users, content safety** |

### How Arc C Differs from Other Arcs

| Dimension | Arc A (Service) | Arc B (Store) | Arc C (Content) |
|---|---|---|---|
| Primary verification | Visual (design) | Numerical (money) | Invisible (SEO) + experiential (usability) |
| Critical edge case | Permissions | Concurrency | Abuse (offensive content, spam) |
| User type | Client + contractors | Client + customers | Client + writers (non-technical) + readers (anonymous) |
| Anti-scope pressure | AI adds features | AI adds e-commerce | AI adds everything (CMS is most over-engineered domain) |
| AI's weakness | Adding features | Hallucinating APIs | Over-engineering + using developer language |
| Client communication | Technical risk | Financial discrepancy | Content moderation policy and abuse response |

A student who completes Arc C has practised the most intense anti-scope discipline of any arc, built for non-technical users, handled content moderation and abuse prevention, and verified output that's invisible in the browser (SEO metadata, email deliverability).
