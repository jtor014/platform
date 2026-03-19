# Web Dev Project 1: The Static Site — Blueprint

## The +1

"I can direct AI to build a website and deploy it to a real URL."

This is the student's first experience with AI-directed development. Everything is new: the terminal, VS Code, Git, GitHub, PRs, Claude Code, the review cycle, deployment. The product is deliberately simple — a static website — so all cognitive load goes to learning the Framework loop, not understanding complex technology.

By the end, the student has a live website at a real URL that they directed AI to build. They've never written a line of code, but they've shipped working software.

---

## The Client Brief

> "I run a small landscaping business. I've been getting work through word of mouth but I want to look more professional and show up when people search online. I need a website that shows what I do, where I work, what past clients have said about me, and how to get in touch. Nothing fancy — I just want something that looks clean and works on phones."

The specific business can vary across arcs (landscaping for Arc A, product showcase for Arc B, publication site for Arc C). The structure below uses the landscaping example but the Framework experience is identical regardless of domain.

---

## What's Provided

Everything is provided at Project 1. The student's job is to execute the loop and verify the output — not to plan.

| Material | What It Is | Why It's Provided |
|---|---|---|
| **Worked-example PRD** | A complete PRD produced by guiding AI through the template | The student reads this to understand what a good PRD looks like before they produce one in Project 3 |
| **Figma design file** | A clean, professional design for the site | The student's job is to direct Claude to implement this faithfully, then verify it matches |
| **Pre-written BACKLOG.md** | All tickets with acceptance criteria and labels | The student creates the board from this, not from scratch |
| **Pre-filled CLAUDE.md** | Project memory file with tech stack, anti-scope, standards | The student copies this into the repo and reads it to understand what it does |
| **Step-by-step guide** | Literal instructions for the first ticket cycle | "Now type this command. Now check this. Now read this." Removed after Project 1 |

### What the Student Notices in the Provided PRD

The step-by-step guide directs the student to read the PRD before starting and notice specific things:

- **The anti-scope section:** No booking, no login, no CMS, no contact form that saves to a database, no social media feed, no blog. Just a static site. "This is what stops the AI from adding things you didn't ask for."
- **The user stories:** Written as "As a [person], I want [thing] so that [reason]." Each one is testable.
- **The success metrics:** "The site loads in under 3 seconds on mobile. All content from the brief is present. The design matches the provided Figma file."

---

## The Tickets

### Ticket 1: Project Setup

**What Claude does:** Creates GitHub repo, copies CLAUDE.md into it, creates BACKLOG.md from provided content, creates .gitattributes, makes initial commit.

**What the student does:**
- Follows the step-by-step guide to start Claude Code in the terminal
- Tells Claude: "Set up the project using the CLAUDE.md and BACKLOG.md I've provided"
- Watches Claude create files and commit them
- Opens VS Code and sees the file tree — this is probably the first time the student sees a project structure

**What the student learns:**
- CLAUDE.md is the project's memory — Claude reads it every session
- BACKLOG.md holds all the tickets — this is the work to be done
- Git tracks every change — nothing is lost

**Directing focus:** Following instructions. Understanding that every project starts the same way.

---

### Ticket 2: GitHub Board Setup

**What Claude does:** Creates GitHub labels (frontend, setup, deploy), creates Issues for all tickets from BACKLOG.md, creates a Project board, adds all Issues.

**What the student does:**
- Tells Claude: "Create the GitHub labels, Issues, and Project board from BACKLOG.md"
- Runs `make board` (or equivalent) to see the board in the terminal
- Opens GitHub in a browser to see the visual board

**What the student learns:**
- The board is the single source of truth — if it's not on the board, it doesn't exist
- Every ticket becomes a trackable Issue
- The board has columns: To Do, In Progress, Done

**Directing focus:** Board discipline. The student sees the full scope of work laid out.

---

### Ticket 3: Development Environment

**What Claude does:** Creates package.json, installs React + Tailwind, sets up basic project structure, creates Makefile with `make dev` command, creates .gitignore.

**What the student does (FIRST FULL TICKET CYCLE):**
1. Tells Claude: "Start Ticket 3"
2. Claude creates a branch, writes the code, commits
3. Claude opens a PR with "Closes #3"
4. Claude runs self-review — reads the diff against the acceptance criteria
5. Gemini reviews automatically (if set up — may skip for Project 1)
6. Claude reports: "PR is open. Self-review: all acceptance criteria met. Ready for your merge sign-off."
7. Student reviews: opens VS Code, looks at the files Claude created. Runs `make dev` — does it work?
8. Student says: "Merge it"
9. Claude merges. Issue moves to Done.

**What the student learns:**
- The complete ticket cycle — this is the loop they'll repeat for every ticket in every project
- What a PR is (a proposed change, reviewed before it's accepted)
- What self-review is (Claude checks its own work against the criteria)
- What "merge sign-off" means (nothing ships without the Director's approval)

**Directing focus:** Executing the loop for the first time. The step-by-step guide walks through every command. This is the most heavily guided moment in the entire platform.

---

### Ticket 4: Site Layout & Navigation

**What Claude does:** Implements the header, navigation, footer, and page structure from the Figma design file. Responsive across mobile/tablet/desktop.

**What the student does:**
- Directs Claude to start the ticket
- After Claude opens the PR, the student opens the site in the browser
- Opens the Figma design file side-by-side
- **First design verification:** Does the header match? Is the font right? Is the spacing correct? Is the navigation in the right place?
- Opens DevTools (Inspect Element) for the first time — checks a specific CSS value against the Figma spec
- If something doesn't match: "The header font size is 18px but the Figma shows 24px. Fix it."
- Merges when satisfied

**What the student learns:**
- The Figma design file is the acceptance criteria for visual output — not "does it look OK to me"
- Browser DevTools: Inspect Element shows exactly what CSS values are applied
- How to give specific, actionable feedback to Claude — not "it looks wrong" but "the font size is 18px, should be 24px"

**Directing focus:** Design verification. This is the core visual verification skill that applies to every future project.

---

### Ticket 5: Services Section

**What Claude does:** Implements the services section from the Figma file — service cards with icons, titles, descriptions.

**What the student does:**
- Same ticket cycle (getting faster now)
- Design verification: do the service cards match the Figma layout?
- Responsive check: switch to mobile view in DevTools — does the grid collapse to a single column?
- Reads the Director's Briefing from Claude: "I created a ServiceCard component that takes a title, description, and icon. The grid uses CSS Grid with responsive breakpoints at 768px and 1024px."

**What the student learns:**
- Components — reusable pieces of UI
- Responsive breakpoints — how the same page adapts to different screen sizes
- Reading a Director's Briefing — understanding what Claude built and why, without needing to understand the code itself

**Directing focus:** Reading the briefing. The student opens the file Claude mentions and looks at it. They don't need to understand every line — they need to understand the structure.

---

### Ticket 6: Testimonials & About

**What Claude does:** Implements testimonials section (client quotes) and about section from Figma.

**What the student does:**
- Same cycle (routine by now for a simple ticket)
- Design verification
- **First critical review reading:** The student reads Claude's self-review AND Gemini's review (if present). Do they agree? Did Gemini flag anything Claude's self-review missed? Does the student understand the feedback?

**What the student learns:**
- Reading review feedback critically — not just accepting "looks good"
- If Gemini flags something the student doesn't understand, they ask Claude: "Gemini said [X]. What does that mean? Should I be concerned?"

**Directing focus:** Engaging with the review system, not just rubber-stamping it.

---

### Ticket 7: Contact & SEO

**What Claude does:** Implements contact section (phone, email, service area — no form that saves to a database). Adds meta tags, page title, semantic HTML, Open Graph tags.

**What the student does:**
- Design verification for the contact section
- **ANTI-SCOPE CHECK:** The PRD says "no contact form that saves to a database." Did Claude add one anyway? (It often does.) If so: "The PRD says no database-backed contact form. Remove it and replace with a mailto link."
- **SEO verification (invisible output):** Opens View Page Source. Is there a `<meta name="description">` tag? Is there a `<title>` tag with meaningful content? Opens a social media preview tool — does the link show a proper card with title and description?

**What the student learns:**
- Anti-scope enforcement — the most important directing skill. AI adds features you didn't ask for. You catch them and remove them
- Invisible verification — checking things that don't appear in the browser (meta tags, structured data)
- View Page Source — seeing the raw HTML the browser received

**Directing focus:** Anti-scope enforcement and invisible verification. These are the two skills that separate a Director from someone who just accepts AI output.

---

### Ticket 8: Deploy

**What Claude does:** Deploys the site to a real URL (Netlify, Vercel, or similar static hosting).

**What the student does:**
- Directs Claude to deploy
- **Something may go wrong.** A build error, a missing config, a path problem. This is expected and educational.
- If it fails: reads the error message, pastes it to Claude, directs the fix. "The deploy failed with this error: [paste]. Fix it."
- When it succeeds: opens the URL in their browser. Opens it on their phone. The site is live. Anyone with the URL can see it.
- Final verification: does the live site match the Figma design on both desktop and mobile?

**What the student learns:**
- Deployment — making something live on the internet
- Error handling — reading error messages and directing fixes (not panicking)
- The thrill of "I directed AI to build this and it's live at a real URL"

**Directing focus:** The deploy experience. Something will probably go wrong — handling that is the skill.

---

## Key Directing Moments

### The Design Verification Loop (Tickets 4-6)
The student opens Figma and the browser side-by-side. They inspect elements and compare CSS values. This is the core verification skill. It's not "does it look roughly right" — it's "the Figma says 24px font, 16px padding, #0a0a0a text colour. Does the browser show the same?" This precision carries forward to every project.

### The Anti-Scope Catch (Ticket 7)
Claude has a strong tendency to add contact forms, social media feeds, blog sections, newsletter signups — especially on business websites. The PRD explicitly excludes these. If the student catches Claude adding something not in scope, they've learned the single most important directing lesson: AI builds what it thinks is needed, not what you asked for. The anti-scope in the PRD is your shield.

### The First Deploy (Ticket 8)
Most first deploys have an issue. The student's job isn't to fix it themselves — it's to read the error, share it with Claude, and direct the fix. "The deploy failed with: [error]. Fix it." This is directing. The student doesn't need to understand the error technically — they need to know how to communicate it.

---

## What Can Go Wrong

- Claude implements a layout that differs from the Figma file — student catches through design verification
- Claude adds features not in the PRD (contact form, blog, social feed) — student catches through anti-scope review
- Claude uses different fonts or colours than specified in the Figma design tokens — student catches through DevTools inspection
- The deploy fails — student learns to read errors and direct fixes
- Gemini's review flags something the student doesn't understand — student asks Claude to explain it
- The site isn't responsive on mobile — student catches by checking responsive mode in DevTools
- Meta tags are missing or generic — student catches through View Page Source

---

## Sprint Retro (End of Project 1)

Not a formal retro yet — Project 1 is too short. A guided reflection:

- Did the design verification process work? Did you catch discrepancies?
- Did Claude add anything not in the PRD? Did you catch it?
- How did the first deploy go? What went wrong and how was it fixed?
- What was confusing? What felt natural?
- How does it feel to have a live site you directed AI to build?

This reflection seeds the habit. Formal retros begin at Project 3.

---

## Technical Context (Discovered Along the Way)

The student doesn't study these — they encounter them while directing:

- **HTML & CSS:** The building blocks of what appears in the browser
- **Responsive design:** Why the site looks different on phone vs desktop
- **Figma:** How to read a design file — layers, inspect panel, CSS values
- **Git:** Version control. Every change is tracked, every change can be undone
- **GitHub:** Where the code lives online. PRs, reviews, the board
- **CI/CD:** Automated checks on every PR. Broken code can't merge
- **Browser DevTools:** Inspect Element. The tool you'll use every day
- **Hosting & DNS:** Where the files live. How a URL maps to a server
- **Semantic HTML:** Why `<nav>` is better than `<div>` — accessibility and SEO
- **View Page Source:** Seeing the raw HTML the browser received

---

## What the Student Has After Project 1

- A live website at a real URL
- Experience with the full ticket cycle (×7)
- The ability to verify AI output against a design file
- The ability to catch anti-scope violations
- Familiarity with VS Code, Git, GitHub, PRs, and DevTools
- A sense of "I can do this" — the foundation for everything that follows

---

## Judgment Checkpoint: After Project 1

Lightweight self-assessment before moving to Project 2:

- **Anti-scope quiz:** Three PRD excerpts. Which one has features the client didn't ask for? (Tests the most important directing skill from Project 1)
- **Design verification:** Two screenshots of the same page — one matches the Figma file, one has subtle differences (wrong font size, wrong spacing, wrong colour). Identify the differences. (Tests the core verification skill)
- **Review reading:** A Gemini review comment on a PR. Is it flagging a real issue or a false positive? Explain your reasoning. (Tests whether the student reads reviews critically or rubber-stamps)

These aren't graded. They confirm the student can spot problems, not just follow instructions.

---

## If You're Struggling

Project 1 throws a lot of new tools at you at once. That's normal. Here's what matters and what doesn't at this stage:

**It's fine if:**
- You don't understand the Git commands — you'll learn them through repetition. Just follow the steps.
- The terminal feels unfamiliar — it will feel natural by Project 3.
- You don't fully understand what CI does — you'll see it catch a real bug in Project 2.
- The Figma file is confusing — focus on one thing: can you find a colour value? A font size? That's enough.
- The deploy fails — directing Claude to fix it IS the skill. An error is a learning moment, not a failure.

**Pay attention to:**
- Did the site match the design? (This is YOUR verification skill — it doesn't automate)
- Did Claude add anything not in the PRD? (This is YOUR anti-scope skill — only you catch this)
- Can you show someone the live URL? (This is YOUR reward — you shipped something real)

The loop will feel clunky the first time. It gets faster. By Project 3, you won't think about the mechanics at all.

**Next:** Project 2 — The Dynamic App. Same loop, but now with a database, an API, Docker, and automated testing. The loop is the same. The +1 will blow your mind.
