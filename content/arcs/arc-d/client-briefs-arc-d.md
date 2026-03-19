---
title: "Client briefs"
description: "Client briefs for Projects 3, 4, and 5"
page_type: "multi-section"
section: "web-dev"
note: "Contains 3 project sections. Each extracted to its own page by the .astro file"
---
# Arc D: Event Platform — Client Briefs

## Project 3: "I Need Events with Registration"

> "I run monthly coding workshops and quarterly community markets. Right now I'm managing everything through Eventbrite, but I want my own site so I can build my brand and stop paying their fees. I need a page that lists my upcoming events — date, time, location, description, how many spots are left. People should be able to register by filling out a form with their name and email. I need to see who's registered for each event so I can plan. And once an event is full, no more registrations."

**What the client is actually asking for:**
Event listings with date/time/location/capacity, a registration form, an admin view of registrations, and capacity enforcement.

**What will tempt AI to overbuild:**
User accounts, recurring events, calendar sync, SMS notifications, waitlists, payment processing. The client wants registration — not ticketing.

**What to clarify before approving the PRD:**
- EVERY date/time reference must specify timezone behaviour. CLAUDE.md must include: "All dates stored as UTC. Displayed in event's local timezone with abbreviation"
- Capacity enforcement must be atomic: two simultaneous registrations for the last spot → only one succeeds
- Registration confirmation email should include a .ics calendar attachment — verify by importing into a real calendar app
- Test daylight savings: event created during standard time for a date during daylight savings

**What to verify personally in the finished product:**
Register for an event. Check the confirmation email — does the .ics open in your calendar with the right time and timezone? Register until full — does the form close? Try two simultaneous registrations for the last spot. Check the admin view on a phone.

**Templates to use:** PRD template, architecture template

**Simulated scope change (mid-build):**
"Can people cancel their registration? And I just realised — my workshops are in Melbourne but I sometimes get registrations from people in other states. The event times need to be clear about which timezone."

**Handling:**
1. **Cancellation:** New ticket. Define the lifecycle: spot reopens immediately? Confirmation email? Cancellation deadline? What if there's a waitlist later — does the next person get auto-notified?
2. **Timezone display:** More subtle than it looks. Not just adding "AEST" — it affects storage (UTC), display (local timezone), and logic ("registration closes 2 hours before" in which timezone?). Test the DST boundary: event created in April (AEST, UTC+10) for a date in October (AEDT, UTC+11). Update CLAUDE.md with an explicit timezone rule

---

## Project 4: "I Need Ticketing and Payments"

> "The workshops are really taking off. I want to start charging. Different events should have different ticket types — like an 'early bird' at a lower price that expires after a certain date, a 'standard' ticket, and maybe a 'VIP' that includes lunch. I also want discount codes so I can give speakers and sponsors free or discounted entry. And I need a waitlist — when events sell out, people should be able to join a waitlist and get notified if a spot opens up."

**What the client is actually asking for:**
Multiple ticket tiers with pricing, early bird expiry, discount codes, and a waitlist with notifications.

**What will tempt AI to overbuild:**
Every possible pricing combination, complex discount stacking rules, automated tier upgrades, subscription passes, group discounts.

**What to clarify before approving the PRD:**
- Build a pricing matrix: which combinations are supported? Early bird + VIP? Discount on early bird? Stack discounts? Anti-scope the complex ones explicitly
- Early bird pricing validated at payment confirmation, NOT at page load (prevents race conditions)
- Waitlist lifecycle: first-come-first-served offer → 24-hour claim window → cascade to next
- PDF tickets with QR codes — verify by actually scanning with a phone camera

**What to verify personally in the finished product:**
Buy each ticket type. Apply a discount code. Try applying a discount to a tier that doesn't support it — correct error? Join a waitlist. Release a spot — does the waitlist notification arrive? Scan a QR code. Check: revenue in admin view matches Stripe dashboard exactly.

**Templates to use:** PRD template, architecture template

**Simulated combinatorial complexity (mid-planning):**
"Can early bird pricing apply to VIP tickets too? And can discount codes work on top of early bird pricing?"

**Handling:**
Build a pricing matrix table in the PRD before writing any tickets. Example:

| Combination | Supported? |
|---|---|
| Early bird + Standard | Yes |
| Early bird + VIP | Anti-scope for v1 |
| Discount on Standard | Yes |
| Discount on Early bird | Anti-scope (already discounted) |
| Multiple stacked discounts | Anti-scope |

Put this in CLAUDE.md. Test with exact values. Communicate: "To keep the launch reliable, v1 supports these combinations. We can add more in a future release."

---

## Project 5: "I Run Multiple Events and Need Check-In"

> "I'm now running 3-4 events a month across different venues. The PDF tickets with QR codes are great, but check-in is still manual — I'm ticking names off a printed list at the door. I need a check-in app that my volunteers can use on their phones. Scan the QR code, see the person's name and ticket type, mark them as checked in. I need a live dashboard showing how many people have arrived vs registered so I know when to start. And here's the thing — the community centre where I run workshops has terrible wifi. The check-in has to work even when the internet drops."

**What the client is actually asking for:**
A mobile check-in app (scan QR, mark attended), a live arrival dashboard, and offline capability.

**What will tempt AI to overbuild:**
Full event management app, attendee messaging, check-in kiosks, NFC badges, real-time analytics.

**What to clarify before approving the PRD:**
- EVERY feature needs two sets of acceptance criteria: online behaviour AND offline behaviour
- Pre-cache the full attendee list when the check-in page opens
- Sync queued check-ins when connectivity returns — handle conflicts (same person checked in on two phones)
- Mobile-first: large touch targets, high contrast, works in sunlight
- Camera permission: handle denial gracefully (manual code entry fallback)

**What to verify personally in the finished product:**
Open the check-in page on your phone. Scan a QR code — name and ticket type appear. Go to airplane mode (DevTools → Network → Offline). Scan another code — still works. Go back online — both check-ins appear on the dashboard. No duplicates.

**Templates to use:** PRD template, architecture template

**Simulated physical environment incident (event day):**
Wifi goes down for 8 minutes during peak arrival. 40 people in the queue. Two volunteers are scanning on separate phones.

**Handling:** Both phones should keep scanning in offline mode. When wifi returns, both sync. Dashboard updates. No duplicates. Walk through this as a test scenario before event day — don't discover it doesn't work with 40 real people waiting.
