# Web Development — Revised Progression Model

## The Principle: Repetition +1

Every project follows the same AI-First Development Framework loop. The loop becomes muscle memory through repetition. Each project adds ONE new capability that expands what the student thinks is possible. The process is the constant. The +1 is the curriculum.

This is not repetition that feels like repetition. It's repetition that compounds:

- Project 1: "I just built a website and deployed it from the terminal"
- Project 2: "I just built an app with a database and an API and automated testing"
- Project 3: "I just integrated a payment system and it actually charges real money"
- Project 4: "I just built a system where different users see different things"
- Project 5: "I just set up monitoring that texts me when the site goes down"

Each time the loop gets faster because you've done it before. Each +1 blows your mind because you couldn't have imagined it before you had the foundation.

**Autonomy increases naturally.** By project 3, the student doesn't need step-by-step instructions for setting up the repo, board, and CLAUDE.md — they've done it twice. By project 5, they're planning their own PRD because they've read four and understand the pattern. You don't need to formally teach "how to write a PRD" — you need enough reps that the student recognises the shape.

---

## The Progression

### Project 1: The Static Site
**The +1:** "I can direct AI to build a website and deploy it to a real URL."

**What's new and exciting:**
- VS Code, the terminal, Git — the professional toolkit
- Directing Claude to create files and write code
- Opening a PR and seeing the review cycle
- Typing a command and a website appears on a real URL anyone can visit

**The loop (first time through — heavily guided):**
- Provided PRD, provided Figma design, provided tickets
- CLAUDE.md from template
- GitHub repo, board, labels, issues
- Ticket by ticket: branch → direct Claude → PR → self-review → Gemini review → merge
- Deploy
- Director's Briefing after each ticket — "here's what Claude built and why"

**What the student verifies:**
- Does the site match the Figma design? (DevTools, side-by-side comparison)
- Did Claude add anything not in the PRD? (Anti-scope check)
- Does it work on mobile? (Responsive check)
- Is it live at the URL? (Deploy verification)

**Technical context discovered along the way:**
HTML/CSS, responsive design, Git, GitHub, PRs, CI, hosting, DNS, browser DevTools

**Client story:** Any simple business — the landscaping company, a café, a portfolio. The domain doesn't matter. The loop is the lesson.

**Tickets:** 5-7. Completable in a few days.

---

### Project 2: The Dynamic App
**The +1:** "I can direct AI to build an app with a database, an API, and automated testing — and it all runs in containers."

**What's new and exciting:**
- Docker — "I typed `make up` and a database and a server just appeared"
- A real database that persists data
- An API — the frontend talks to the backend (visualise this with Claude artifacts)
- Automated tests — Claude writes tests that prove the code works
- CI that runs tests on every PR — broken code can't merge

**The loop (second time — faster, less hand-holding):**
- Provided PRD (student reads it more critically this time — they've seen one before)
- Student sets up the project (repo, board, CLAUDE.md) — they've done this before, it's faster
- Same ticket cycle, but now the Director's Briefings explain new concepts: "here's what an API is, here's how the database stores this data, here's what Docker is doing"
- Deploy with Docker on a real server

**What the student verifies:**
- Does the API return the right data? (Network tab in DevTools — watching requests fly)
- Is the data in the database? (Open a database shell and check)
- Do the tests actually test what the acceptance criteria say? (Read the test names, run them)
- Does it work after a restart? (Data persists because it's in a database, not memory)

**Technical context discovered along the way:**
APIs and request/response, databases and schemas, SQL basics, Docker and containers, environment variables, automated testing, Makefiles

**Client story:** Something like the Daily Fact Platform — simple enough that the tech is the exciting part, not the domain. A random facts app. A quote of the day. A simple data feed.

**Tickets:** 8-11. Completable in about a week.

---

### Project 3: The Interactive App
**The +1:** "I can direct AI to build something people actually USE — with forms, validation, and real user interaction."

**What's new and exciting:**
- Forms that collect user input
- Validation — the app rejects bad input and tells the user why
- The data the user submits is stored and visible in the admin view
- Email — the system sends actual emails
- The student writes their first PRD (with AI, using the template — they've read two by now)

**The loop (third time — the student is starting to drive):**
- Client brief provided. Student uses the PRD template to guide AI through producing the PRD. Reviews it: did AI add scope? Are the acceptance criteria testable?
- Student sets up the project (automatic by now)
- Student reviews the AI-generated ticket backlog — are the tickets the right size?
- Same ticket cycle, but faster. The student reads Director's Briefings for new concepts only — they skip the Git/PR explanations they already know
- First sprint retro — reflecting on what worked

**What the student verifies:**
- Submit the form with valid data — does it save? Check the database
- Submit the form with invalid data — does it reject with a clear message?
- Does the email actually arrive? Check inbox (and spam folder)
- Anti-scope review: did Claude add features the client didn't ask for?

**Technical context discovered along the way:**
Forms and validation (frontend and backend), CRUD operations, email integration, the PRD template, sprint retros, estimation (first attempt)

**Client story:** A booking system. An event registration. A contact form that actually saves. Something where a real person submits real data.

**Tickets:** 10-14. Completable in 1-2 weeks.

---

### Project 4: The Integrated App
**The +1:** "I can direct AI to integrate with external services — payment, maps, calendars — and verify it against real documentation."

**What's new and exciting:**
- Payment integration — real money flows through the system (Stripe test mode)
- Or map integration — real maps with real pins
- Or calendar integration — real .ics files that import into Google Calendar
- Third-party API verification — checking Claude's output against actual documentation
- The student learns that Claude WILL hallucinate API interfaces and they MUST verify

**The loop (fourth time — the student drives planning with AI):**
- Client brief is more complex. Student uses templates to guide AI through PRD, architecture, wireframes
- Student reviews everything critically: has AI recommended a library that doesn't exist? Does the architecture match the brief?
- The ticket cycle is fast — the student focuses review time on the +1 (the integration) not the routine
- Client demo — presenting what was built, handling feedback
- Scope change — the client asks for something extra, student manages it through the board

**What the student verifies:**
- Does the Stripe integration match the actual Stripe docs? (Open the docs, compare)
- Are the financial amounts exact? (Cart total = Stripe charge = order record)
- Does the map show pins in the right locations?
- Does the calendar file import correctly?
- Anti-scope + integration verification: the highest-stakes review yet

**Technical context discovered along the way:**
Third-party API integration, payment processing concepts, webhooks, API key management, financial accuracy testing, client demos, scope change management

**Client story:** An online store with checkout. An event platform with maps. A booking system with payments. Something with a real external integration.

**Tickets:** 10-14. Completable in 1-2 weeks.

---

### Project 5: The Multi-User App
**The +1:** "I can direct AI to build a system where different people see different things — and verify that permissions actually work."

**What's new and exciting:**
- Authentication — real login with real accounts
- Roles — admin sees everything, staff see some things, customers see their own stuff
- A second user type with their own portal or view
- Data isolation — User A cannot see User B's data
- The student tests by trying to BREAK the permissions — "can I access this as the wrong user?"

**The loop (fifth time — the student manages a real codebase):**
- Student drives PRD and architecture with AI — they've done this twice now
- The permissions matrix in the PRD — who can see what, who can do what
- Working with existing code from Project 4 (or a new project, but the concept of evolving a codebase is introduced)
- CLAUDE.md may need restructuring — context management at scale
- Negative acceptance criteria — "Contractor CANNOT see other contractors' jobs"
- End-to-end testing of permission boundaries

**What the student verifies:**
- Log in as User A. Try to access User B's data. Can you? That's a bug
- Log in as a contractor. Can you see the quote amounts? You shouldn't be able to
- The permissions matrix from the PRD is the test script — every cell gets verified
- Regression: do the features from the previous project still work?

**Technical context discovered along the way:**
Authentication and sessions/JWTs, authorisation and RBAC, data isolation, multi-role interfaces, security testing (trying to break your own system), context management for growing codebases

**Client story:** The service business adding contractor portals. The store adding staff order management. The directory adding business owner self-service. Something with genuinely different user types.

**Tickets:** 12-16. Completable in 2-3 weeks.

---

### Project 6: The Reliable System
**The +1:** "I can direct AI to make a system production-grade — monitored, backed up, secured, and documented well enough for someone else to run."

**What's new and exciting:**
- HTTPS — the padlock icon
- Monitoring — an alert fires when the site goes down
- Backups — and actually testing the restore
- A staging environment — testing changes before they hit production
- Handover documentation — could someone else maintain this?
- The student writes a risk assessment for the client in plain English

**The loop (sixth time — the student manages operations, not features):**
- A completely different type of PRD — "make this reliable" not "add a feature"
- Operational templates: risk assessment, runbooks, handover docs
- Tickets about infrastructure and security, not user-facing features
- Verification shifts from "does it work" to "will it keep working when something goes wrong"
- Cost assessment — what does this actually cost to run?
- Final sprint retro — looking back at the whole journey

**What the student verifies:**
- Stop the server. Does the monitoring alert fire?
- Restore from backup. Is the data intact?
- Run a security scan. Are there vulnerabilities?
- Give the handover doc to someone who's never seen the project. Can they understand it?
- Does the cost match what the client was told?

**Technical context discovered along the way:**
HTTPS/TLS, reverse proxies, monitoring and alerting, backup and restore, security hardening, staging environments, cost management, runbooks, handover documentation, SLAs

**Client story:** Any of the previous projects going "live for real." The stakes just got higher because real people use it and downtime costs money.

**Tickets:** 12-16. Completable in 2-3 weeks.

---

## How This Changes the Structure

### Before (Level-Based)
```
Level 1 (Guided) → Level 2 (Assisted) → Level 3 (Directed) → Level 4 (Independent) → Level 5 (Operational)
```
Problem: Big jump between levels. Autonomy changes at the same time as technical complexity.

### After (Repetition +1)
```
Project 1 (Static) → Project 2 (Dynamic) → Project 3 (Interactive) → Project 4 (Integrated) → Project 5 (Multi-User) → Project 6 (Reliable)
```
Each project: same loop, one new capability, slightly more autonomy because the loop is more familiar.

### The Autonomy Ramp (Happens Naturally)

| Project | Loop Familiarity | PRD | Tickets | Review |
|---|---|---|---|---|
| 1 | First time — step by step | Provided | Provided | Guided — "here's what to look for" |
| 2 | Second time — faster, less hand-holding | Provided — student reads more critically | Provided — student starts to question sizing | Student knows what to check in DevTools |
| 3 | Routine | **Student generates with AI + template** | **Student reviews AI-generated backlog** | Student runs first sprint retro |
| 4 | Automatic | Student generates — more complex brief | Student scopes — handles dependencies | Student verifies against third-party docs |
| 5 | Muscle memory | Student drives — permission matrices | Student manages — existing codebase | Student tests by trying to break things |
| 6 | Second nature | Student writes operational PRD | Student writes infra/security tickets | Student verifies disaster recovery |

The autonomy increase isn't a declared "level" — it's what naturally happens when you've done the loop five times.

---

## How Arcs Fit Into This

The six projects above are the **spine** — the recommended sequential path. The arcs provide the **business context** for each project. A student can follow one business story across all six projects, or mix and match.

| Project | Arc A (Service) | Arc B (Store) | Arc C (Content) | Arc D (Events) | Arc E (Directory) |
|---|---|---|---|---|---|
| 1: Static | Landscaper brochure | Product showcase | Publication site | — | — |
| 2: Dynamic | — (skip to 3) | — (skip to 3) | — (skip to 3) | — | — |
| 3: Interactive | Booking system | Cart + checkout | CMS for writers | Event registration | Searchable directory |
| 4: Integrated | Email + PDF quotes | Payment (Stripe) | Newsletter integration | Ticketing + payments | Map integration |
| 5: Multi-User | Contractor portals | Staff order management | Reader comments + moderation | Volunteer check-in app | Business owner self-service + reviews |
| 6: Reliable | Production hardening | Production hardening | Production hardening | Production hardening | Production hardening |

**Project 2 (Dynamic App) is the universal on-ramp.** Every student does it — it's the Daily Fact Platform style project that teaches the core technical stack (API, database, Docker, CI). After Project 2, students choose their arc for Projects 3-5 based on interest.

**Project 6 is arc-agnostic** — you take whatever you built in Projects 3-5 and make it production-grade.

---

## What This Solves

**The L1→L2 cliff:** Gone. Autonomy increases gradually across six projects, not in a single jump.

**The setup fatigue:** Each project starts the same way (repo, board, CLAUDE.md). By Project 3, it takes 5 minutes. The process IS the skill, and repetition makes it automatic.

**The "repetition feels like repetition" concern:** It doesn't, because each project has a +1 that makes you feel more powerful than you were yesterday. The reviewer who worried about repetition was thinking like a syllabus designer. The student thinks: "last time I deployed a static site. This time I have a DATABASE."

**The onboarding problem:** Project 1 is a static site. The only tools are VS Code, Git, and a hosting service. No Docker, no database, no backend. The simplest possible first experience. Docker arrives in Project 2 when there's a reason for it. AWS arrives in Project 6 when there's a reason for it.

**The assessment problem:** Verification is hands-on and concrete at every project. Did the site match the design? Does the API return the right data? Does the payment charge the right amount? Can you break the permissions? Does the backup restore work? These are pass/fail — the student either caught the issue or didn't.

---

## What About the Detailed Arc Blueprints We Already Wrote?

They're still valid — they just reorganise. The directing challenges, client briefs, "what can go wrong" sections, and key moments all still apply. They map to the new project structure like this:

| Old Structure | New Structure |
|---|---|
| Arc A Level 1 | Project 1 (Arc A context) |
| Arc A Level 2 | Project 3 (Arc A context) |
| Arc A Level 3 | Project 4 (Arc A context) |
| Arc A Level 4 | Project 5 (Arc A context) |
| Arc A Level 5 | Project 6 (any arc) |
| Arc B Level 1 | Project 1 (Arc B context) |
| Arc B Level 2 | Project 3+4 combined (Arc B context) |
| Arc B Level 3 | Project 5 (Arc B context) |
| Arc B Level 4 | Becomes data verification content within Project 5 or standalone |

The content is reframed, not rewritten. The +1 progression determines the order concepts appear. The arc determines the business context and specific directing challenges.

---

## The Student's Experience

Week 1: "I just deployed a website. From my terminal. It's on a real URL. I'm showing my friends."

Week 2: "I just built an app with a database. Docker is running containers on my laptop. There's an automated code reviewer on my GitHub. What is happening."

Week 3-4: "I just built a booking system. People can submit a form and I can see the bookings in an admin panel. I wrote the PRD myself. Well, AI wrote it, but I guided it and caught two things it added that weren't in the brief."

Week 5-6: "I just integrated Stripe. The checkout actually works. I found a place where Claude used the wrong API because I checked the actual Stripe docs. I CAUGHT THE AI BEING WRONG."

Week 7-8: "I built a contractor portal. Logged in as a contractor and tried to see another contractor's data. It let me through. Caught the bug. Directed Claude to fix it. Verified the fix. I'M DOING SECURITY TESTING."

Week 9-10: "The system is now production-grade. Monitoring alerts work. Backups restore cleanly. I wrote a handover doc and my classmate could follow it. I could hand this to a real client."

That's the emotional arc. Each step makes the student feel more capable than the last. The loop is the same. The +1 is the thrill.
