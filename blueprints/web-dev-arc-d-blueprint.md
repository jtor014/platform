# Web Dev Arc D: The Event Platform — Blueprint

## Overview

**The client:** An events organiser — workshops, community markets, conferences, sports registrations, meetups, or festivals.

**The arc:** Event listings with registration → ticketing and payments → multi-event management and live check-in.

**Why this arc:** Arcs A, B, and C operate entirely in the digital world. Arc D introduces **software that must work in a physical environment.** The check-in app at an event with 200 people and unreliable wifi is fundamentally different from a dashboard viewed from an office.

The second unique challenge is **date/time handling** — the domain where AI produces the most subtle, confident, hard-to-catch bugs. Timezones, daylight savings, "registration closes 2 hours before the event" — these are specification problems. If the student doesn't write extremely precise acceptance criteria, Claude builds something that works for the obvious case and fails for every edge case.

The third challenge is **capacity management under concurrent access** — similar to Arc B's inventory problem but with different stakes. A sold-out candle can be restocked. A workshop with 30 seats cannot exceed capacity.

**This document covers Projects 3-6 in Arc D context.** For Projects 1 and 2, see `web-dev-project-1-blueprint.md` and `web-dev-project-2-blueprint.md`.

**No Project 1 variant.** Event platforms inherently need a backend from the start. Students do Projects 1-2 then enter Arc D at Project 3.

---

## The Student Arrives With

After completing Projects 1 and 2, the student has:

- **18 ticket cycles completed** — the loop is familiar
- **Two PRDs read and annotated** — they understand PRD structure and anti-scope
- **One flawed PRD repaired**
- **Design and functional verification skills** — DevTools, Network tab, database shell
- **The full technical stack running**
- **Two judgment checkpoints passed**

They have NOT yet:
- Specified date/time behaviour with timezone precision
- Handled capacity constraints under concurrent access
- Integrated payments with capacity limits (combining Arc B and Arc D challenges)
- Built software for a physical environment
- Designed for offline operation
- Tested by physically scanning QR codes or going offline

---

## The Arc-Specific Flawed PRD (For the Bridge)

The brief it was generated from: "I need a website where people can register for my workshops."

**The flaws the student must find and fix:**

1. **Scope creep:** The AI added user account registration, recurring events, multi-session workshops, waitlists, and calendar sync. The client wants a simple registration form.
2. **Missing timezone specification:** Every date/time reference says "the event starts at 10am" with no timezone. Must specify: "displayed in the event's local timezone with abbreviation shown."
3. **Missing anti-scope:** No anti-scope section. Student must add: no user accounts, no payment (yet), no recurring events, no calendar sync, no SMS notifications.
4. **Vague capacity criteria:** "The system should handle capacity limits" — not testable. Must specify: "When an event has 1 spot remaining and two people submit registrations simultaneously, only one succeeds."
5. **Architecture stores dates as local strings:** The schema shows `event_date VARCHAR "2026-03-20 10:00"` instead of UTC timestamps. This breaks every timezone operation.
6. **Missing edge case:** No criteria for what happens when someone tries to register after the deadline, or for a date in the past.

---

## Project 3: "I Need Events with Registration"

### The Client Brief

> "I run monthly coding workshops and quarterly community markets. Right now I'm managing everything through Eventbrite, but I want my own site so I can build my brand and stop paying their fees. I need a page that lists my upcoming events — date, time, location, description, how many spots are left. People should be able to register by filling out a form with their name and email. I need to see who's registered for each event so I can plan. And once an event is full, no more registrations."

> **The scope creep moment (simulated):** "Can people cancel their registration? And my workshops are in Melbourne but I sometimes get registrations from people in other states. The event times need to be clear about which timezone."

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | First encounter with date/time as a core domain concern |
| All planning templates | PRD, architecture, design, CLAUDE.md |
| The repaired flawed PRD | Student just fixed timezone specs and vague capacity criteria |
| **Critical warning** | "Date/time is AI's most unreliable domain. Every date feature needs: what timezone, what format, what happens at boundaries, what 'before' and 'after' mean precisely." |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Generates** — every date/time reference must specify timezone behaviour |
| Architecture template | **Generates** — critical: dates stored as UTC always, displayed in local timezone |
| Design template | **Generates** — how are date/time/location displayed clearly? What does "3 spots left" look like? |
| CLAUDE.md template | **Generates** — must include date/time rules: store UTC, display local, show timezone in all output |
| Sprint retro template | **First formal use** |

### The Planning Phase

**The timezone PRD review:**
Every feature involving date/time must specify timezone behaviour. Common AI failures:
- "Display the event date" — in what timezone?
- "Registration closes 2 hours before" — 2 hours in which timezone?
- "Show events this week" — week starts Monday or Sunday? Relative to server or user?

The CLAUDE.md rule: "All dates stored as UTC. Displayed in event's local timezone with abbreviation shown. All deadline calculations in UTC."

**The capacity architecture:**
How does the system prevent over-registration? The student reviews:
- Simple counter? (Race condition risk)
- Database-level constraint? (Better — INSERT fails if count exceeds capacity)
- Optimistic locking?

The student's acceptance criteria must address: "Two people register simultaneously for the last spot — only one succeeds."

### The Tickets

1. **Project Setup** — repo, CLAUDE.md with date/time rules, Docker Compose, CI
2. **Events Schema & API** — events table (title, description, date_start UTC, date_end UTC, timezone, location, capacity, registration_deadline UTC), CRUD endpoints
3. **Registration Schema & API** — registrations table, register endpoint with capacity check, registrations per event
4. **Event Listing Page** — upcoming events with date/time in event timezone, location, spots remaining
5. **Event Detail Page** — full description, date/time/location, map link, spots remaining, registration form
6. **Registration Form** — name, email, submit. Validates capacity. Prevents duplicate registrations (same email, same event). Confirmation message
7. **Registration Confirmation Email** — event details, calendar attachment (.ics file)
8. **Admin: Event Management** — create/edit/delete events. View registrations. Export CSV
9. **Capacity Enforcement** — atomic capacity check. Test: two simultaneous registrations for last spot
10. **Registration Deadline** — auto-close at deadline. Display countdown or "closed"
11. **Cancel Registration** — (scope addition) cancel via link in confirmation email. Spot opens. Can't cancel less than 24 hours before event
12. **Timezone Display** — (scope addition) show timezone abbreviation. If user's timezone differs, show both

### Key Directing Moments

**The datetime acceptance criteria exercise:**
For every date-related ticket, criteria must cover:

For Events Schema:
- "Start time stored as UTC. Event at 10:00 AM AEST stores as 00:00 UTC"
- "Retrieved event displays 10:00 AM AEST, not 00:00 UTC"

For Registration Deadline:
- "Deadline 9:00 AM AEST March 20 closes at exactly that time"
- "User in Perth (AWST) sees deadline as 7:00 AM AWST"
- "Deadline evaluated in UTC regardless of user timezone"

**The daylight savings trap:**
Event created during standard time for a date during daylight savings (or vice versa). AEST is UTC+10, AEDT is UTC+11. AI almost never handles this without explicit criteria.

**The .ics calendar attachment:**
Student verifies by importing into a real calendar app. Does the event appear at the correct time? In the correct timezone? With the right title and location?

**The capacity race condition test:**
Same pattern as Arc B's inventory — two simultaneous requests for last spot. Database-level enforcement, not application-level check-then-insert.

### What Can Go Wrong

- Dates stored as local strings instead of UTC — every timezone conversion breaks
- Event listing shows "10:00 AM" with no timezone indicator
- Registration deadline uses browser timezone instead of UTC comparison
- .ics file has wrong timezone — event appears at wrong time in calendar app
- Two registrations for last spot both succeed
- Daylight savings offset hardcoded instead of using timezone library

### Sprint Retro

- How many date/time bugs caught by acceptance criteria vs discovered during testing?
- Were timezone specifications in the PRD specific enough?
- Did the .ics test reveal issues automated tests missed?
- How did capacity enforcement compare to Arc B (if done)?

### Technical Context (Discovered Along the Way)

- **UTC:** Universal time standard. Why all dates stored in UTC, displayed in local
- **Timezones:** Offsets from UTC. Why they're not fixed (daylight savings)
- **Daylight savings:** Clocks change. +10 in winter, +11 in summer. Breaks date math
- **iCalendar (.ics):** Standard file format for calendar events
- **Capacity enforcement:** Database constraints vs application checks. Race conditions

---

## Project 4: "I Need Ticketing and Payments"

### The Client Brief

> "The workshops are really taking off. I want to start charging. Different events should have different ticket types — like an 'early bird' at a lower price that expires after a certain date, a 'standard' ticket, and maybe a 'VIP' that includes lunch. I also want discount codes and a waitlist — when events sell out, people join and get notified if a spot opens."

> **The combinatorial complexity moment (simulated):** "Can early bird pricing apply to VIP tickets too? And can discount codes work on top of early bird pricing?"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | Combines payment (Arc B territory) with capacity constraints and date-based pricing |
| All templates | Student adapts for combinatorial pricing |
| The existing codebase from Project 3 | Events and registration working |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Adapts** — must include a combination matrix specifying which pricing combinations are supported |
| Architecture template | **Adapts** — multi-tier pricing, discount validation, waitlist lifecycle |

### The Planning Phase

**The combinatorial PRD:**
The client described: multiple ticket types, date-based pricing, discount codes, waitlist. The combinations multiply. The student explicitly scopes:

| Combination | Supported? |
|---|---|
| Early bird + Standard ticket | Yes — separate ticket types with own prices |
| Discount code + any ticket type | Yes — code applies to ticket price |
| Discount code + early bird price | Anti-scope — too complex. Codes apply to standard/VIP only |
| Multiple codes stacked | Anti-scope — one code per order |
| 100% discount (free ticket) | Yes — requires email confirmation |

Without this matrix, Claude either implements everything or makes arbitrary decisions.

**The waitlist architecture:**
When a spot opens (cancellation), who gets notified? First-come-first-served? How long to claim? What if they don't respond? The student specifies the full lifecycle.

### The Tickets

1. **Ticket Types Schema** — ticket_types table (event_id, name, price, quantity, sale_start, sale_end)
2. **Ticket Type Management** — admin creates types when creating events
3. **Event Page: Ticket Selection** — display available types, prices, remaining, sale status
4. **Checkout Flow** — select type and quantity → details → Stripe Checkout. Multi-line items
5. **Order & Ticket Records** — orders table, tickets table with unique codes. Generated on confirmed payment
6. **Discount Codes** — codes table (type, amount, limits, expiry, applicable types). Validation endpoint
7. **PDF Ticket Generation** — event details, ticket type, attendee name, unique QR code
8. **Waitlist** — join when sold out. Auto-offer to first person when spot opens. 24-hour claim window. Cascade to next
9. **Waitlist Notifications** — offer email, claim expiry email
10. **Financial Reconciliation** — admin: revenue per event, breakdown by type, discounts used. Must match Stripe

### Key Directing Moments

**The combination matrix enforcement:**
Student defined supported combinations in PRD. Verifies Claude implements exactly those — no more, no less. If Claude allows discount stacking, student catches during review.

**The date-based pricing transition:**
Early bird expires at a specific time. Same timezone challenges from Project 3. What if someone loads the page before expiry but pays after? "Early bird validated at payment confirmation, not page load."

**The QR code verification:**
Scan the QR code with a phone camera. Does it decode correctly? Large enough to scan from screen or print? PDF renders correctly on different devices? Physical verification — previews Project 5.

**The waitlist fairness test:**
Person A joins at 2pm, Person B at 3pm. Spot opens at 5pm. A gets the offer. A doesn't claim in 24 hours. B gets the offer. AI implements the simple case. The cascade logic is where bugs hide.

**The Stripe multi-line-item verification:**
2x Standard @ $45 + 1x VIP @ $85 - 15% discount = $181.75. Cart, Stripe, and order record must agree. Percentage discount rounding on individual items vs total may produce different results.

### What Can Go Wrong

- Discount codes apply to early bird tickets despite anti-scope matrix
- Early bird checked at page load, not payment — stale pricing
- QR code too small to scan or encodes wrong data
- Waitlist notifies everyone simultaneously instead of first-come-first-served
- 24-hour claim window miscalculated due to email delivery delay
- Discount rounding inconsistent across tickets

### Sprint Retro

- How did the combination matrix work as a scoping tool?
- Financial calculations verified end-to-end?
- Waitlist fairness tested?
- Any timezone or expiry bugs?

---

## Project 5: "I Run Multiple Events and Need Check-In"

### The Client Brief

> "I'm now running 3-4 events a month across different venues. The PDF tickets with QR codes are great, but check-in is still manual — ticking names off a printed list. I need a check-in app that my volunteers can use on their phones. Scan the QR code, see the person's name and ticket type, mark them as checked in. I need a live dashboard showing arrivals vs registered. And here's the thing — the community centre where I run workshops has terrible wifi. Check-in has to work even when the internet drops."

> **The physical environment constraint (simulated):** On event day, wifi goes down for 8 minutes during peak arrival. 40 people in the queue. What happens?

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | First time building software for a physical environment with unreliable connectivity |
| All templates | Student extends for offline behaviour |
| The existing codebase from Projects 3-4 | Events, ticketing, payments all working |
| **Critical framing** | "The default AI assumption is 'the user has internet.' You must specify behaviour for when they don't. Every feature needs online AND offline acceptance criteria." |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Extends** — adds "Offline Behaviour" section. Every feature specifies what happens with and without connectivity |
| Architecture template | **Extends** — local storage, service workers, sync-on-reconnect, conflict resolution |
| Design template | **Extends** — mobile-first for volunteers on phones at a door. Large touch targets, high contrast, works in sunlight |
| Component spec template | **Multiple** — check-in result states (valid, already checked in, invalid, wrong event, offline indicator) |

### The Planning Phase

**The offline-first PRD:**
The signature directing challenge. Every feature has two modes:

| Feature | Online | Offline |
|---|---|---|
| Scan QR | Validate against server | Validate against cached attendee list |
| Check-in result | Real-time confirmation | Confirmation from local data, queued for sync |
| Dashboard | Live numbers | Last known + "offline" indicator |
| Duplicate scan | Server rejects | Local data rejects |
| Two volunteers scanning | Server handles concurrency | Independent local data — sync resolves conflicts |

AI will not produce this dual-mode specification unless explicitly directed.

**The sync architecture:**
When phones come back online, locally-cached check-ins must sync. What if two phones checked in the same person offline? What if a ticket was cancelled online during the outage? Conflict resolution rules must be specified.

**Mobile-first physical environment design:**
Used outdoors or in a venue lobby, by volunteers who may never have used the system, while people queue. Large scan button, enormous feedback text, high contrast, no small tap targets, no scrolling during check-in flow.

### The Tickets

1. **Multi-Event Dashboard** — admin view of all upcoming events, registration numbers, quick links
2. **Event Check-In Page** — select event, display expected vs arrived count
3. **QR Code Scanner** — camera-based scanner in the browser. Camera permission handling
4. **Check-In Validation (Online)** — send code to server. Validates: exists, correct event, not already checked in
5. **Check-In UI Feedback** — full-screen result: green "CHECKED IN" / red "INVALID" / yellow "ALREADY CHECKED IN." Auto-reset after 3 seconds
6. **Attendee Pre-Cache** — on opening check-in page, download full attendee list to local storage
7. **Offline Check-In** — validate against cached list when offline. Mark locally. Queue for sync. "OFFLINE MODE" indicator
8. **Sync on Reconnect** — push queued check-ins to server. Handle conflicts. Update local cache
9. **Live Arrival Dashboard** — real-time: X of Y arrived. Percentage. Breakdown by ticket type. Updates on each check-in
10. **Volunteer Onboarding** — "how to use check-in" guide accessible from check-in page. 4-5 steps. 2 minutes to learn

### Key Directing Moments

**The offline simulation test:**
The student must physically test offline mode:
1. Open check-in page while connected (attendee list downloads)
2. DevTools → Network → Offline (or turn off wifi)
3. Scan a QR — validates from cache?
4. Scan same code again — "already checked in"?
5. Scan invalid code — "invalid"?
6. Go back online — queued check-ins sync?
7. Check server — records present?

**The "wifi dies during peak arrival" scenario:**
40 people queuing, wifi drops 8 minutes. Two volunteers keep scanning — neither shows errors. When wifi returns, both sync. Dashboard updates. No duplicates. The student writes this as a test scenario and walks through it.

**The camera permission UX:**
What if user denies camera permission? Error message, not crash. What about devices without cameras? Fallback to manual code entry.

**The sunlight readability test:**
Open check-in UI on phone, go outside in daylight. Is the result readable? Green-on-white may be invisible in sunlight. Test in realistic conditions.

### What Can Go Wrong

- QR scanner library doesn't work on iOS Safari — test on actual devices
- Attendee list not actually cached — first offline scan fails
- Sync sends all queued check-ins but doesn't handle same-person-checked-in-on-two-devices — duplicates
- Check-in text too small to read while holding phone and welcoming someone
- Camera permission denial crashes page instead of showing fallback
- Dashboard doesn't update after sync — shows pre-outage numbers until next poll
- Timestamps stored in phone's timezone instead of UTC

### Sprint Retro (Final for Arc D)

- How did offline-first PRD work? Were both online and offline criteria written for every feature?
- Did the wifi outage simulation reveal issues?
- How did physical environment testing compare to browser testing?
- Was the volunteer guide usable in 2 minutes?
- Full arc retrospective: date/time, capacity, offline — what's unique about physical environments?

---

## Project 6: "It Needs to Be Reliable"

Project 6 follows the same structure across all arcs — see Arc A's Project 6 for the full blueprint.

**Arc D-specific operational concerns:**
- Event-day reliability — system must be stable during events, not just generally
- Pre-event checklist — automated verification that attendee cache, QR scanner, and offline mode are functional before doors open
- Timezone monitoring — alerts if events display times in wrong timezone (daylight savings transitions)
- Capacity alert — warning when events approach sold-out during high-traffic launches

---

## Summary

| Project | Client Says | Tickets | Primary Directing Challenge |
|---|---|---|---|
| 3 | "Events with registration" | 10-12 | Date/time precision. Timezone specs in every criterion. Capacity enforcement |
| 4 | "Ticketing and payments" | 8-10 | Combinatorial scoping. Financial accuracy across line items. Waitlist fairness |
| 5 | "Multi-event check-in" | 8-10 | Offline-first PRD (dual-mode specs). Physical environment testing. Multi-device sync |
| 6 | "It needs to be reliable" | 11-13 | Operational + event-day reliability + timezone monitoring |
| **Arc Total** | | **37-45** | |
| **With Projects 1-2** | | **~55-63** | **Date/time, physical environments, offline-first** |

### How Arc D Differs from Other Arcs

| Dimension | Arc A (Service) | Arc B (Store) | Arc C (Content) | Arc D (Events) |
|---|---|---|---|---|
| Primary verification | Visual | Numerical | Invisible (SEO) | **Physical (devices, offline)** |
| Environment | Digital only | Digital only | Digital only | **Digital + physical** |
| AI's weakness | Adding features | Hallucinating APIs | Over-engineering | **Date/time handling** |
| Testing requires | Browser | Browser + Stripe docs | Browser + View Source | **Browser + phone + camera + going offline + sunlight** |
| Unique constraint | Multi-role | Financial accuracy | Non-technical users | **Intermittent connectivity** |

A student who completes Arc D has practised the most rigorous date/time specification of any arc, built for physical environments with unreliable connectivity, tested by physically scanning QR codes and going offline, and handled combinatorial pricing complexity.
