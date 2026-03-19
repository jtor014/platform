# Web Dev Arc A: The Service Business — Blueprint

## Overview

**The client:** A small trades/service business — landscaping, electrical, plumbing, cleaning, consulting. The specific trade doesn't matter; the growth pattern is universal.

**The arc:** Online bookings → quoting & job management → contractor portals → operational maturity.

**Why this arc:** The business domain is deliberately simple. A student doesn't need to understand complex business logic to build a landscaping company's booking system. This means cognitive load goes where it belongs — on developing directing skills, not understanding the client's industry. The complexity comes from the product growing over four projects, not from the domain being hard.

**Unique directing challenges:** Progressive client relationship across four projects. First experience generating a PRD. First multi-entity architecture. First multi-user system. First operational hardening. This arc covers the complete product lifecycle — it's the recommended first path for any student.

**This document covers Projects 3-6 in Arc A context.** For Projects 1 and 2, see `web-dev-project-1-blueprint.md` (The Static Site) and `web-dev-project-2-blueprint.md` (The Dynamic App). Every student completes those two projects before starting an arc.

---

## The Student Arrives With

After completing Projects 1 and 2, the student has:

- **18 ticket cycles completed** — the loop is becoming familiar
- **Two PRDs read and annotated** — they understand the shape of a PRD, especially anti-scope
- **One flawed PRD repaired** — they can spot scope creep, vague criteria, and over-engineered architecture in AI output (from the Project 2→3 Bridge)
- **Design verification skill** — they can compare a Figma file to a live site using DevTools
- **Functional verification skill** — they can check APIs with the Network tab and query the database directly
- **The full technical stack running** — Docker, FastAPI, PostgreSQL, React, CI, Gemini review, deploy
- **Two judgment checkpoints passed** — they've demonstrated they can spot architectural errors, write evidence-based debug prompts, and size tickets

They have NOT yet:
- Generated a PRD from a client brief (that happens here, in Project 3)
- Made design decisions (wireframes, component specs)
- Handled a scope change through the board
- Built on an existing codebase
- Dealt with multi-user permissions
- Managed operational concerns

---

## The Arc-Specific Flawed PRD (For the Bridge)

As part of the Project 2→3 Bridge, the student repairs a deliberately flawed AI-generated PRD before generating their own. Here's what the Arc A flawed PRD contains:

**The brief it was generated from:** "I need customers to book appointments online."

**The flaws the student must find and fix:**

1. **Scope creep:** The AI added user account registration, login, password reset, and profile management. The client said nothing about accounts — they want an anonymous booking form.
2. **Vague acceptance criteria:** The booking form ticket says "should be easy to use and mobile-friendly." Not testable. Should specify: "form validates that selected date is in the future, time slot is available, and all required fields are completed. Inline error messages appear within 200ms."
3. **Missing anti-scope:** No anti-scope section at all. The student must add one: no user accounts, no payment, no recurring bookings, no calendar sync, no SMS notifications.
4. **Over-engineered architecture:** The AI recommended a separate microservice for notifications, a Redis cache for slot availability, and a WebSocket connection for real-time updates. For a simple booking form with ~20 bookings per week, this is absurd. A single FastAPI app with PostgreSQL is sufficient.
5. **Oversized ticket:** One ticket says "Build the booking system frontend" — that's at least three tickets (form, calendar view, admin view). The student must split it.
6. **Hallucinated library:** The AI recommends "react-booking-calendar v4.2" for the date picker. This library doesn't exist (or is unmaintained). The student must check npm before accepting the recommendation.

This repair exercise builds the critical review skills the student will use when generating their own PRD immediately after.

---

## Project 3: "Customers Want to Book Online"

### The Client Brief

> "Business is picking up. I'm missing calls because I'm on job sites all day. Customers have told me they'd book online if they could. I want people to be able to pick a date and time for a consultation, and I want to see all my upcoming bookings in one place so I can plan my week. Nothing too complicated — just a simple booking system."

> **The scope creep moment (simulated):** A week into the build, the client calls: "Oh, I also want customers to get an email confirmation when they book. And can we add a way for me to block off days when I'm not available?"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | The problem, not the solution. The student generates everything else |
| All planning templates | PRD, architecture, design, CLAUDE.md, ticket backlog |
| The repaired flawed PRD | The student just fixed this in the bridge — they know the pitfalls |
| The existing Project 1 codebase | The static site for this client. Project 3 adds functionality to it |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Generates** — first time using the template with AI. Guided by the experience of repairing the flawed PRD |
| Architecture template | **Generates** — first time guiding AI through tech stack, schema, API contracts, tickets |
| Design template | **Generates** — first time creating wireframes with AI before building |
| CLAUDE.md template | **Generates** — student fills this for the first time |
| Sprint retro template | **First formal use** — student runs their first retro at the end of this project |

### The Planning Phase

This is the student's first time generating a PRD. The bridge prepared them (annotate → repair → generate), but it's still a significant moment. The sequence:

**Step 1: PRD**
Student pastes the client brief and the PRD template into conversational AI. Reviews the output:
- Did the AI add features the client didn't ask for? (Common: AI adds user accounts, email notifications, payment — the client said "simple booking system." The student has already caught this exact pattern in the flawed PRD exercise)
- Is the anti-scope specific? ("No complex features" is too vague. "No user accounts, no payment, no recurring bookings, no calendar sync" is specific)
- Are the user stories testable? ("As a customer, I want to book a consultation" needs: what information do they provide? What feedback do they get? What happens if the slot is taken?)
- Are the acceptance criteria precise? (The student just fixed "should be mobile-friendly" in the flawed PRD — they know to look for this)

**Step 2: Architecture**
Student pastes the approved PRD and the architecture template into AI. Reviews:
- Is the tech stack appropriate for the scope? (The student just caught over-engineering in the flawed PRD — microservices and Redis for 20 bookings/week. They should be skeptical of anything beyond the existing stack: React, FastAPI, PostgreSQL, Docker)
- Does the database schema model the booking correctly? (What fields? What types? What constraints?)
- Are the API contracts unambiguous? (Request shape, response shape, error cases)
- Are the tickets under 300 lines each? (The student just split an oversized ticket in the flawed PRD exercise)

**Step 3: Wireframes**
Student pastes the approved PRD and the design template into AI. Reviews:
- Did the AI add UI elements not in the PRD? (A login button when auth is anti-scope?)
- Does the booking flow make sense? (How many steps? What information at each step?)
- What does this look like on mobile?

**Step 4: CLAUDE.md**
Student uses the template to guide AI through creating the project memory file. Reviews:
- Does it accurately reflect the PRD's anti-scope?
- Is the tech stack correct?
- Are the engineering standards listed?
- Is the repo structure realistic?

### The Tickets

The student reviews the AI-generated ticket backlog and adjusts. Typical structure:

1. **Backend Skeleton & Docker** — FastAPI app with health endpoint added to existing Docker Compose, Makefile updated
2. **CI Pipeline Update** — GitHub Actions updated for the new backend service
3. **Bookings Schema & Connection** — bookings table (date, time, customer_name, customer_email, customer_phone, created_at), connection pool
4. **Available Slots Endpoint** — API to get available time slots for a given date
5. **Create Booking Endpoint** — API to create a booking (validates slot is available, date is in the future)
6. **Booking List Endpoint** — API to get all upcoming bookings (admin view, sorted by date)
7. **Frontend: Booking Form** — date picker, time slot selection, customer details, submit, validation, confirmation message
8. **Frontend: Admin Bookings View** — list of upcoming bookings with date filtering
9. **Frontend: Connect to API** — wire up the booking form and admin view to the backend. Loading, error, and empty states
10. **Availability Management** — (scope addition) admin can block off dates/times
11. **Email Confirmation** — (scope addition) send confirmation email on booking

### Handling the Scope Change

The client's mid-project request ("email confirmation" and "block off days") is a scripted teaching moment:

1. Student recognises this is new scope — it wasn't in the original PRD
2. Student directs Claude to create two new tickets on the board (Tickets 10 and 11)
3. Student updates the PRD's scope section to include these features
4. Student decides when to do them — after the core build (Tickets 1-9), not in the middle
5. Student updates CLAUDE.md to reflect the additions

This is the student's first time practising the "work arrives mid-project" pattern. The board is the single source of truth.

### Key Directing Moments

**The first self-generated PRD:**
The student compares their PRD to the flawed one they repaired. Did they make any of the same mistakes the AI made? Did they catch themselves adding scope? This is the most important self-awareness moment in the entire arc.

**The architecture evaluation:**
The client brief says "simple booking system." The AI-generated architecture says "React frontend, FastAPI backend, PostgreSQL database, Docker Compose." The student evaluates: does this match the brief's complexity? Is anything over-engineered? Is anything missing? They have enough context from Project 2 to make this judgment — they've seen this stack work.

**The hallucination check:**
During planning, AI may recommend a calendar library that doesn't exist, or an API pattern that doesn't match FastAPI's actual interface. The student has been warned by the flawed PRD exercise (which included a hallucinated library). They verify: "Is this library real? Check npm / PyPI."

**The acceptance criteria pressure test:**
The AI-generated ticket for "Available Slots Endpoint" might say "returns available slots." The student pushes: "What if someone requests a date in the past? What if there are no slots? What if two people book the same slot simultaneously?" This is the first time the student writes acceptance criteria that cover edge cases AI didn't think of.

**The first estimation attempt:**
Before starting tickets, the student estimates each one. After completing the project, they compare estimates to actuals. The point isn't accuracy — it's starting to calibrate how fast AI-directed work goes.

### What Can Go Wrong

- The AI-generated PRD includes user accounts and login — student catches during review (they've practised this in the flawed PRD exercise)
- The AI-generated schema is over-engineered (separate slots table, services table, customers table when a simple bookings table is sufficient) — student simplifies
- Claude implements the booking form differently from the wireframes — student verifies against design
- The "available slots" logic has a bug where two people can book the same slot — the acceptance criteria should have covered this; if not, the sprint retro captures the lesson
- Email confirmation requires a third-party email service — Claude may hallucinate the API
- The scope change is handled by telling Claude "also add email" instead of creating a ticket on the board — if this happens, the sprint retro captures why board discipline matters

### Sprint Retro (First Formal Retro)

Using the sprint retro template for the first time. The student guides AI through five areas:

1. **Workflow:** How did the planning phase feel? Was the bridge (annotate → repair → generate) effective? Did the PRD review catch scope creep?
2. **Architecture:** Is the error handling consistent across all endpoints? Are database queries parameterised? Is the logging format consistent?
3. **Cost:** What subscription tier is the student on? Did they hit any rate limits?
4. **Tooling:** Is the Gemini reviewer model string still valid? Any dependency warnings?
5. **Lessons learned:** Written to CLAUDE.md. Examples: "AI-generated PRDs consistently add auth when not asked for." "Estimation was 40% too optimistic."

### Technical Context (Discovered Along the Way)

- **Forms & validation:** Collecting user input safely. Frontend and backend validation
- **Date/time handling (basic):** Storing dates, displaying dates, basic timezone awareness
- **CRUD operations:** Create, Read, Update, Delete — almost every feature maps to these
- **Email integration:** Sending emails programmatically. Third-party services
- **Scope change management:** Board discipline. Ticket creation. PRD updates
- **Wireframing:** Designing the interface before building. Boxes and labels, not pixels

---

## Project 4: "I Need to Send Quotes and Track Jobs"

### The Client Brief

> "We've grown — I've got two guys working with me now. The booking system is great but we're still doing quotes on paper and tracking jobs in a text message group chat. It's a mess. I need to be able to create a quote for a customer, email it to them, and when they accept it, turn it into a work order. I want to track each job: scheduled, in progress, done, invoiced. And I need proper customer records — right now customer info is scattered across my phone, email, and scraps of paper."

> **The client demo moment (simulated):** After the build, the student presents the system to the "client." The client's response: "This is great. Two things though — can the quote show my business logo? And the job status thing — can I add notes to each job so I remember what was discussed?"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | More complex — multiple interconnected features |
| All templates | Student adapts them to fit the increased complexity |
| Component spec template | **First use** — defining reusable UI components with all states |
| The existing codebase from Project 3 | The booking system. Project 4 adds quoting, jobs, and customer management |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Adapts** — student adds sections for entity relationships and status workflows |
| Architecture template | **Adapts** — student adds entity-relationship review, multi-table schema evaluation |
| Component spec template | **First use** — defining QuoteCard, StatusBadge, JobTimeline with all states |
| Sprint retro template | **Second use** — comparing to Project 3 retro findings |

### The Planning Phase

**PRD complexity jump:**
First PRD with multiple interconnected entities: Customers, Quotes, Work Orders (Jobs). The AI must model the relationships: a Customer has many Quotes, a Quote (when accepted) becomes a Work Order, a Work Order moves through statuses. The student reviews the entity model — does it match the client's workflow?

Common AI mistake: creating a separate "Invoice" entity when the client said "invoiced" is just a status on the Work Order. The student must catch assumptions about business logic that differ from the brief.

**Architecture complexity:**
Multiple database tables with foreign keys. The student reviews:
- Does the schema normalise correctly? (Customer data in one place, referenced by quotes and jobs)
- Does the status workflow make sense? (What statuses? Can a job go backwards? Can it skip a status?)
- Are the API contracts complete? (What does "create quote" need? What does it return? What if the customer doesn't exist yet?)

**Component specs:**
First time using the component spec template:
- **QuoteCard:** Customer name, service, total, status (draft/sent/accepted/declined). What does each status look like?
- **StatusBadge:** Reusable across quotes and jobs. Colours AND icons (accessibility: colour alone isn't enough)
- **JobTimeline:** Visual status progression. Current step vs completed vs future

The better these specs are, the more consistently Claude implements them across the application.

### The Tickets

1. **Customer Schema & API** — customers table (name, email, phone, address, notes), CRUD endpoints
2. **Customer Management UI** — customer list with search, customer detail view, add/edit customer form
3. **Quote Schema & API** — quotes table (customer_id, line_items JSON, total, status, created_at), CRUD endpoints
4. **Quote Builder UI** — form with customer selection, line items (service, description, amount), running total, save as draft
5. **Quote PDF Generation** — generate a professional PDF quote from the data. Business name, logo placeholder, line items, total
6. **Quote Email** — send the PDF quote to the customer's email. Track "sent" status
7. **Quote → Work Order Conversion** — when a quote is accepted, create a work order from it. Link the work order to the quote and customer
8. **Work Order Schema & Status Workflow** — work orders table (quote_id, customer_id, status, scheduled_date, notes, created_at). Status transitions: scheduled → in progress → complete → invoiced
9. **Work Order Management UI** — list view with status filters, detail view with status update buttons, notes field, timeline showing status history
10. **Authentication** — admin login (email/password). All management pages require login. Public booking page doesn't
11. **Logo on Quotes** — (client feedback) upload business logo, include in PDF quotes
12. **Job Notes** — (client feedback) add notes to work orders with timestamps

### Key Directing Moments

**The entity relationship review:**
AI produces a schema. The student traces through it with a real scenario: "A customer calls. I create a quote. They accept. It becomes a job. I update status as work happens. I mark it invoiced." Does the schema support every step? If the AI created a separate Invoices table, is that what the client described?

**The dependency chain:**
Tickets have real dependencies. Quote Builder needs the Customer table. Quote→Job Conversion needs both Quotes and Jobs tables. The student sequences tickets correctly — and catches it if the AI-generated backlog doesn't.

**The 300-line split:**
The quote system (form + line items + totals + PDF + email) is too large for one ticket. The student splits it: Ticket 3 (data model + API), Ticket 4 (form UI), Ticket 5 (PDF), Ticket 6 (email). This is the first time the student proactively splits work they scoped themselves.

**The client demo:**
After building, the student presents to the "client." Walk through the system, show how it works, handle feedback. The client's two requests (logo, notes) become tickets on the board. The student doesn't promise them now — they scope and prioritise.

**The pattern consistency check:**
The codebase now has patterns from Project 3 (booking endpoints) and Project 4 (customer/quote/job endpoints). The student verifies that Claude uses the same error handling, response format, and logging approach across both. If Claude has drifted, the sprint retro captures it.

### What Can Go Wrong

- AI generates a schema with too many tables or too few — student evaluates against the workflow
- Claude implements the quote builder as one massive component instead of composable pieces — student references the component specs
- The status workflow has a bug where a job can be "invoiced" without going through "complete" — acceptance criteria should specify valid transitions
- Claude uses different patterns in Project 4 endpoints than Project 3 — student checks consistency
- The demo reveals the client meant "estimates" not "quotes" (different document, different implications) — PRD review should have caught this
- PDF generation requires a library — Claude may recommend one that's unmaintained

### Sprint Retro

Comparing to Project 3:
- Was the PRD review more effective? Did the student catch business logic assumptions?
- Was estimation more accurate? (Compare Project 3 estimates to Project 4)
- Did component specs produce consistent UI?
- Is the codebase clean or is technical debt accumulating?
- Update CLAUDE.md's "unreliable at" section with new findings

### Technical Context (Discovered Along the Way)

- **Authentication:** Login, sessions/JWTs, staying logged in
- **Authorisation:** What you're allowed to do (admin vs public)
- **Relational data:** Foreign keys, joins. "This quote belongs to that customer"
- **State machines:** Status transitions with rules. Valid paths through a workflow
- **Email integration (deeper):** Sending PDFs as attachments
- **PDF generation:** Creating documents from data programmatically
- **Component specs:** Defining reusable UI pieces with all their states

---

## Project 5: "My Subcontractors Need Access"

### The Client Brief

> "Things are going really well. I've started using subcontractors for overflow work — two concreters and a garden maintenance crew. Right now I'm texting them job details and they text me photos when they're done. It's chaos. I need them to have their own login where they can see their assigned jobs, update the status, log their hours, and upload completion photos. But I don't want them seeing each other's work or my customer details or quote amounts. I also need a dashboard where I can see what all my contractors are doing at a glance."

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | Introduces a second user type with different permissions |
| All templates | Student extends them with permissions-specific sections |
| The existing codebase from Projects 3-4 | Substantial — booking, customers, quotes, jobs, auth |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Extends** — student adds a permissions matrix section |
| Architecture template | **Extends** — student adds data isolation requirements |
| Component spec template | **Two sets** — admin dashboard components and contractor portal components |
| CLAUDE.md | **Restructured** — file exceeds 150 lines, student moves detail to .claude/ subdirectory |

### The Planning Phase

**The permissions matrix:**
The most important planning artefact at Project 5. Before any tickets:

| Action | Admin | Contractor |
|---|---|---|
| View all customers | ✓ | ✗ |
| View assigned jobs | ✓ (all) | Own only |
| View quote amounts | ✓ | ✗ |
| Update job status | ✓ | Assigned only |
| Upload photos | ✓ | Assigned only |
| Log hours | ✗ | Own only |
| View contractor hours | ✓ (all) | Own only |

The student reviews this against the brief. Did the AI assume correctly? The client said contractors shouldn't see "customer details" — does that mean contact info, or also the customer's name? The student resolves ambiguity before building.

**Negative acceptance criteria:**
For the first time, criteria specify what users CANNOT do:
- "A contractor cannot view jobs assigned to other contractors"
- "A contractor cannot view quote amounts"
- "A contractor cannot access customer contact details"

If the student doesn't write these, Claude won't test for them.

**The context management crisis:**
CLAUDE.md has grown across Projects 3-4. By Project 5 it's past 150 lines. Claude produces inconsistent output. The student restructures: schema to `.claude/schema.md`, standards to `.claude/standards.md`, CLAUDE.md becomes a lean index. This is a critical directing skill for sustained work.

### The Tickets

1. **Contractor User Role** — add contractor role to auth system. Separate registration flow (admin creates contractor accounts, not self-registration)
2. **Contractor Portal: Job List** — contractor sees only their assigned jobs. Filtered by status (today's jobs, upcoming, completed)
3. **Contractor Portal: Job Detail** — job info (service, location, scheduled date, notes) WITHOUT customer contact details or quote amounts
4. **Contractor Portal: Status Update** — contractor can update status on assigned jobs only (scheduled → in progress → complete)
5. **Contractor Portal: Hours Logging** — log start time, end time, notes per job. Only on own assigned jobs
6. **Contractor Portal: Photo Upload** — upload completion photos per job. Client-side validation (type, size). Server-side resize and EXIF strip. Mobile-friendly (camera integration)
7. **Admin: Contractor Dashboard** — overview of all contractors: active jobs, hours this week, recent activity. Quick links to each contractor's assignments
8. **Admin: Assign Jobs to Contractors** — from the job detail view, assign a job to a contractor. Contractor sees it on their portal
9. **Data Isolation Tests** — end-to-end tests verifying: contractor A cannot see contractor B's jobs, contractors cannot see customer details, contractors cannot see quote amounts. Automated, run in CI
10. **Audit Trail** — log who changed what, when. Especially: status changes, job assignments, hour logs. Visible to admin
11. **Contractor Onboarding Doc** — plain-language guide: how to log in, view jobs, update status, log hours, upload photos. Written for someone who's never seen the system

### Key Directing Moments

**The permission boundary test:**
The student logs in as Contractor A. Tries to access Contractor B's job (by changing the URL). Does the system block it? Tries to hit the quotes API endpoint directly. Does it return 403? This is adversarial testing of their own system — the student thinks like an attacker for the first time.

**The mobile-first verification:**
Contractors are on job sites using phones. The student opens the contractor portal on a phone (or DevTools mobile mode). Is it usable with one hand? Are touch targets large enough? Does the photo upload trigger the camera? If not, the PRD didn't specify mobile-first strongly enough.

**The context management restructure:**
CLAUDE.md is too long. Claude starts producing inconsistent output. The student restructures to `.claude/` subdirectory. This is a directing skill unique to sustained AI work — managing the AI's memory as the project grows.

**The existing code challenge:**
Every change touches code from Projects 3-4. Adding roles to auth, adding permission checks to existing endpoints, building new views that share components with existing views. If earlier tests were shallow, bugs surface now.

### What Can Go Wrong

- Claude implements roles at the API level but not the frontend — contractor portal still shows navigation links they shouldn't see
- A new endpoint bypasses the permission check because Claude didn't copy the pattern
- The contractor portal looks like a desktop app shrunk to mobile — "responsive" isn't the same as "mobile-first"
- CLAUDE.md restructuring breaks Claude's consistency — may need a stabilisation sprint
- Photo upload works locally but breaks in production (storage path doesn't exist on deployed server)
- E2E tests from Project 4 break when auth changes affect existing flows — regression

### Sprint Retro

- Did the permissions matrix catch all boundary cases?
- Did the CLAUDE.md restructuring improve consistency?
- How did working with existing code compare to greenfield?
- Is the test suite catching regressions?
- Estimation calibration continuing

### Technical Context (Discovered Along the Way)

- **Role-based access control (RBAC):** Different users, different permissions, enforced at API and frontend
- **Data isolation:** Queries filtered by user. "WHERE contractor_id = current_user"
- **File uploads:** Accepting images, validation, storage, EXIF stripping
- **Image optimisation:** Resizing uploaded photos for web delivery
- **Audit trails:** Who changed what, when. Business records
- **Mobile-first design:** Designing for the smallest screen first
- **Context management:** Structuring AI project memory for large codebases

---

## Project 6: "We're Getting Bigger — It Needs to Be Reliable"

### The Client Brief

> "The business is doing really well. We've got real money flowing through the system now — about 40 active jobs and 3 contractors. Last week the site went down for a few hours and I didn't know until a customer called. That can't happen again. Also, a contractor asked what data I hold on them, and I wasn't sure what to say. I need this thing to be solid — backups, security, the works. And if something goes wrong, I need to know before my customers do."

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | Entirely about reliability, security, and compliance — no new features |
| Operational templates | Risk assessment, runbook, handover — first use |
| The existing codebase from Projects 3-5 | A substantial, multi-user application |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Owns** — adapted for operational work. Scope is "make it reliable" not "add features." Anti-scope: no new user-facing features |
| Risk assessment template | **First use** — guides AI through failure modes, likelihood, impact, mitigation |
| Runbook template | **First use** — guides AI through incident response procedures |
| Handover template | **First use** — guides AI through documentation for another director |
| Sprint retro template | **Final comprehensive retro** — covering the entire arc |

### Key Directing Moments

**The risk assessment:**
Student uses the template to guide AI through: what can fail? (Server down, database corrupted, deployment breaks, data breach, contractor sees data they shouldn't.) How likely is each? How bad? What mitigates it? The student reviews AI's output and translates it into plain English for the client.

**The backup verification:**
Directing Claude to set up backups is easy. The critical step: the student personally directs a restore and verifies the data is intact. An untested backup is not a backup.

**The monitoring calibration:**
Claude sets up monitoring. The student verifies: stop the backend container. Does the alert fire within 2 minutes? Start it again. Does the recovery alert fire? Now: does a deploy trigger a false alert? If monitoring alerts constantly for non-issues (alert fatigue), people learn to ignore them.

**The data protection audit:**
The contractor asked "what data do you hold on me?" The student guides AI through an audit: what personal data is in the database? Is any unnecessary? Can a user request export? Can they request deletion? (What happens to job records when a contractor is deleted — anonymise, don't delete, because job history is a business record.) Is consent captured?

**The handover test:**
The student guides AI through handover documentation, then stress-tests it: could a classmate pick this up and maintain it without asking questions? If they can't explain a subsystem, that's a gap the Director's Briefings should have caught.

**The cost assessment:**
AI generates an infrastructure cost breakdown. The student reviews: is anything surprisingly expensive? Is anything missing? They communicate to the client: "Running the platform costs approximately $X per month."

**The concrete thrills:**
- Stop the server. Watch the monitoring alert fire. "I would have known before any user did."
- Delete the database. Restore from backup. All data intact. "I just recovered from a disaster."
- Give the handover doc to a classmate. They can explain the system. "I built something that outlasts me."

### The Tickets

1. **HTTPS & Reverse Proxy** — Nginx/Caddy in front of the app. SSL certificate. HTTP→HTTPS redirect
2. **Automated Backups** — pg_dump script, scheduled daily, stored securely. Retention policy (keep 7 days)
3. **Backup Restore Test** — restore from backup into fresh database. Verify data integrity. Document the restore procedure
4. **Uptime Monitoring** — external service (UptimeRobot or similar) pinging /api/health every 60 seconds. Alert to email/Slack on downtime
5. **Application Monitoring** — basic dashboard: request rates, error rates, response times. Accessible to admin
6. **Error Tracking** — catch and categorise production errors. Not just "it crashed" but where, why, how often
7. **Security Hardening** — dependency scanning, security headers, rate limiting, secrets rotation documentation
8. **Staging Environment** — test changes before they hit production. Separate from the live site
9. **Data Protection Audit** — document all personal data stored. Add consent capture. Add data export endpoint. Add data deletion/anonymisation endpoint
10. **Privacy Notice** — user-facing page explaining what data is collected, why, and how to request access/deletion
11. **Risk Assessment Document** — plain-English summary of risks, mitigations, and residual risk. For the client
12. **Runbooks** — step-by-step procedures: how to restore from backup, how to deploy, how to respond to downtime, how to rotate secrets
13. **Handover Documentation** — complete system documentation for another director. Architecture, deployment, monitoring, secrets, common issues

### What Can Go Wrong

- The backup runs successfully but produces an empty or corrupted file — student catches by testing the restore
- Monitoring alerts fire on every deploy (false positive) — student tunes thresholds
- The data audit reveals unexpected personal data (log files with IP addresses, analytics) — student learns data protection isn't just about the database
- The handover doc has a gap — refers to CLAUDE.md but CLAUDE.md doesn't explain that subsystem — student learns handover must stand alone
- The cost assessment misses hidden costs (data transfer, S3 storage) — student learns infrastructure has non-obvious expenses
- The client asks "what's our uptime been?" and there's no historical data because monitoring was just set up — student learns monitoring should start earlier (lesson for next project)

### Final Sprint Retro (Full Arc)

This retro covers the entire journey from Project 3 to Project 6:

**Workflow:**
- How did the planning process evolve? Is PRD review faster and sharper now?
- How did the directing relationship with Claude change? What prompts work? What fails?
- How did estimation accuracy improve across projects?

**Architecture:**
- Is the codebase healthy? Are patterns consistent? Is there technical debt?
- Was the CLAUDE.md restructuring in Project 5 effective?

**Cost:**
- Total infrastructure cost for the running application
- AI subscription usage — was the tier adequate?

**Tooling:**
- Did all tools (Gemini reviewer, CI, Docker, deployment) work reliably?
- Any tools to change for the next project?

**Lessons learned — for the student's personal Framework retro:**
- What would they do differently if starting this arc again?
- What templates need improvement?
- What did they learn about directing AI that isn't in the Framework?

### Technical Context (Discovered Along the Way)

- **HTTPS / TLS:** Encrypted traffic. Why the padlock matters
- **Reverse proxies:** Nginx/Caddy in front of the app. SSL termination
- **Backups & restore:** Automated snapshots. Tested recovery. Retention policies
- **Monitoring & alerting:** Uptime checks. Dashboards. Alert rules. Alert fatigue
- **SLAs & uptime:** What "99.9% uptime" means in practice (8.7 hours/year)
- **Data protection:** Consent, right to access, right to deletion, data minimisation
- **Rate limiting:** Preventing abuse
- **Security hardening:** Dependency scanning, security headers, secrets rotation
- **Error tracking:** Categorising production errors
- **Staging environments:** Testing before production

---

## Summary

| Project | Client Says | Tickets | Primary Directing Skills |
|---|---|---|---|
| 3 | "Customers want to book" | 10-11 | First PRD generation. Template use. Scope changes. Architecture evaluation. Estimation |
| 4 | "I need quotes and jobs" | 10-12 | Entity relationships. Dependencies. Ticket splitting. Client demo. Component specs. Pattern consistency |
| 5 | "Subcontractors need access" | 9-11 | Permissions matrix. Negative criteria. Existing code. Context management. Mobile-first. Adversarial testing |
| 6 | "It needs to be reliable" | 11-13 | Operational PRD. Risk assessment. Backup verification. Monitoring calibration. Data audit. Handover |
| **Arc Total** | | **40-47** | |
| **With Projects 1-2** | | **~58-65** | **Complete product lifecycle** |

At the end of this arc, the student has directed AI to build a real, multi-user, production-grade business application. They planned it, built it, demoed it, hardened it, and documented it well enough for someone else to maintain. They've done it entirely through the AI-First Development Framework, using templates at every stage, and they can articulate how every part of the system works — even though they never wrote a line of code.
