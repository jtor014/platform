---
title: "Client briefs"
description: "Client briefs for Projects 3, 4, and 5"
page_type: "multi-section"
section: "web-dev"
note: "Contains 3 project sections. Each extracted to its own page by the .astro file"
---
# Arc A: Service Business — Client Briefs

## Project 3: "Customers Want to Book Online"

> "Business is picking up. I'm missing calls because I'm on job sites all day. Customers have told me they'd book online if they could. I want people to be able to pick a date and time for a consultation, and I want to see all my upcoming bookings in one place so I can plan my week. Nothing too complicated — just a simple booking system."

**What the client is actually asking for:**
A booking form (date, time, name, email) and an admin view of upcoming bookings. That's it.

**What will tempt AI to overbuild:**
User accounts, payment processing, recurring bookings, calendar sync, SMS notifications, reviews, analytics dashboards. The client said "simple" — hold AI to that.

**What to clarify before approving the PRD:**
- Does "pick a time" mean predefined slots or any time? (Predefined slots is simpler and probably what they mean)
- What information does the admin view need? A sorted list is enough — don't let AI build a full calendar UI
- Anti-scope must be specific and comprehensive

**What to verify personally in the finished product:**
Submit a booking. Does the admin view show it? Try to book a past date — does it error? Try to book a slot that's already taken — what happens? Check the admin view on a phone (the client is on job sites).

**Templates to use:** PRD template, architecture template, ticket backlog template

**Simulated scope change (introduce after core tickets are in progress):**
The client calls: "Oh, I also want customers to get an email confirmation when they book. And can we add a way for me to block off days when I'm not available?"

**Handling the scope change:**
1. Recognise this is new scope — not in the original PRD
2. Create new tickets on the board
3. Update the PRD scope section
4. Schedule the new tickets after the core build
5. Update CLAUDE.md

---

## Project 4: "I Need to Send Quotes and Track Jobs"

> "We've grown — I've got two guys working with me now. The booking system is great but we're still doing quotes on paper and tracking jobs in a text message group chat. It's a mess. I need to be able to create a quote for a customer, email it to them, and when they accept it, turn it into a work order. I want to track each job: scheduled, in progress, done, invoiced. And I need proper customer records — right now customer info is scattered across my phone, email, and scraps of paper."

**What the client is actually asking for:**
Three connected things: customer records, quotes that can be emailed and accepted, and job tracking with status progression.

**What will tempt AI to overbuild:**
A separate Invoice entity (when "invoiced" is just a job status), complex quote versioning, automated follow-ups, project management features, Gantt charts.

**What to clarify before approving the PRD:**
- What does "accept a quote" look like? A link in the email that marks it accepted? Or does the client mark it manually?
- Is "invoiced" a job status or a separate document? (Probably just a status for now)
- How do customers, quotes, and jobs connect? Review the AI's entity model against the client's actual workflow

**What to verify personally in the finished product:**
Create a customer. Create a quote for that customer. Email the quote — does it arrive? Accept the quote — does a job appear? Move the job through statuses. Check that ticket dependencies were correct — the quote system needs the customer system first.

**Templates to use:** PRD template, architecture template, component spec template (for QuoteCard, StatusBadge, JobTimeline)

**Simulated client demo feedback (introduce after the build):**
The client reviews the system: "This is great. Two things though — can the quote show my business logo? And the job status thing — can I add notes to each job so I remember what was discussed?"

**Handling:**
These are post-build enhancements, not mid-build scope changes — different process.

1. **Business logo on quotes:** Small scope. New ticket: add a logo upload in admin settings, render it on the quote page. Acceptance criteria: logo displays at correct size, fallback if no logo uploaded, image validation (file type, max size).
2. **Job notes:** Moderate scope. New ticket: add a notes field to jobs. But ask the client first: "Do you want one notes box you overwrite, or a history of notes with dates?" The answer changes the data model.

Both go on the board as future tickets. Neither interrupts the current work.

---

## Project 5: "My Subcontractors Need Access"

> "Things are going really well. I've started using subcontractors for overflow work — two concreters and a garden maintenance crew. Right now I'm texting them job details and they text me photos when they're done. It's chaos. I need them to have their own login where they can see their assigned jobs, update the status, log their hours, and upload completion photos. But I don't want them seeing each other's work or my customer details or quote amounts. I also need a dashboard where I can see what all my contractors are doing at a glance."

**What the client is actually asking for:**
A contractor portal: login, see assigned jobs, update status, log hours, upload photos. Admin dashboard showing all contractor activity. Data isolation between contractors.

**What will tempt AI to overbuild:**
A full team management platform, messaging between admin and contractors, scheduling algorithms, time tracking with GPS, expense management.

**What to clarify before approving the PRD:**
- "Customer details" — does that mean contact info only, or also the customer's name? Clarify before building
- Create a permissions matrix BEFORE any tickets: who can see what, who can do what
- Write negative acceptance criteria: "Contractor CANNOT view other contractors' jobs"

**What to verify personally in the finished product:**
Log in as admin — see everything. Log in as a contractor — see only your assigned jobs. Navigate directly to `/api/jobs/{id}` for someone else's job — confirm 403. Check the response body in the Network tab — are customer contact details actually absent, or just hidden from the UI? The contractor portal must work on a phone (field workers on job sites).

**Templates to use:** PRD template, architecture template. CLAUDE.md may need restructuring — it's getting long by Project 5.

**Simulated security incident (after launch):**
A contractor calls the client: "Hey, I can see your quote prices for other jobs when I click around. Is that supposed to happen?" The client calls you, worried.

**Handling:**
1. Immediately verify: log in as a contractor, navigate to `/api/jobs/{id}` for a job assigned to someone else
2. If you can see it, this is a data leak — not just a UI issue. The API is returning data it shouldn't
3. Severity assessment: what data was exposed? For how long? How many contractors could have seen it?
4. Fix: create an urgent ticket, fix the API response, test with every user role
5. Communicate to client: what happened, what was exposed, what's been fixed, what safeguards are now in place
