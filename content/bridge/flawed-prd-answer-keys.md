---
title: "Flawed PRD answer keys"
description: "Answers for all five flawed PRD repair exercises"
page_type: "reference"
section: "web-dev"
note: "Rendered inline on choose-arc page as details/summary, not a separate route"
---
# Flawed PRD Answer Keys

Use these after completing the repair exercise. Check your work — did you find all the flaws?

---

## Arc A: Online Booking System

**Brief:** "I need customers to book appointments online."

| # | Flaw | Where | Fix |
|---|---|---|---|
| 1 | **Scope creep:** User registration, social login, profile management, password reset. Client never mentioned user accounts | Scope section 1 | Remove entirely. Booking form collects name + email, no account needed |
| 2 | **Vague criteria:** "Users can register and log in" / "should be easy to use" / "processed securely" / "sent at the right times" — none of these are testable | Acceptance criteria throughout | Rewrite with specifics: "Submitting a booking with a past date shows error 'Please select a future date'" |
| 3 | **Missing anti-scope:** No anti-scope section at all | Missing section | Add: No user accounts, no payment, no recurring bookings, no calendar sync, no SMS, no reviews, no analytics dashboard |
| 4 | **Over-engineered architecture:** Kubernetes, Redis, RabbitMQ, Elasticsearch, Twilio, MongoDB, Datadog for a simple booking form | Technical stack | Replace with: React, FastAPI, PostgreSQL, Docker. Single app, single database |
| 5 | **Oversized ticket:** "Build the booking system frontend and backend" is the entire project | Ticket 3 | Split into: booking schema, available slots endpoint, create booking endpoint, booking form UI, admin bookings view, connect frontend to API |
| 6 | **Dangerous payment architecture:** Stripe Elements (custom payment form requiring PCI compliance) | Scope section 3 + Tech stack | Remove payment entirely (not in client brief). If payment were needed, use Stripe Checkout redirect |

**Additional issues:** Payment (section 3), reviews (section 6), calendar sync (section 7), and SMS (section 8) are all features the client never asked for.

---

## Arc B: Online Candle Store

**Brief:** "I want people to buy my candles online."

| # | Flaw | Where | Fix |
|---|---|---|---|
| 1 | **Scope creep:** User accounts, wishlists, saved payment methods, reviews, order tracking with login, recommendation engine. Client wants anonymous checkout | Scope sections 1, 6, 7, 8 | Remove sections 1, 6, 7, 8 entirely. Anonymous checkout only |
| 2 | **Vague criteria:** "Checkout should be smooth" / "Payment is processed securely" / "Recommendations increase average order value" | Acceptance criteria throughout | Rewrite: "Cart total, Stripe charge amount, and order record total must be identical. Test with exact values." |
| 3 | **Missing anti-scope:** No anti-scope section | Missing section | Add: No user accounts, no wishlists, no saved payment methods, no reviews, no recommendation engine, no shipping integration, no subscription orders |
| 4 | **Dangerous payment architecture:** Stripe Elements (custom embedded payment form) + Apple Pay + Google Pay + Afterpay | Scope section 4 + Tech stack | Use Stripe Checkout redirect only. No card details touch the server. Additional payment methods are scope creep |
| 5 | **Oversized ticket:** "Build shopping cart and checkout flow with Stripe payment" | Ticket 4 | Split into: cart component, cart state management, checkout form, Stripe integration, webhook handler, order confirmation |
| 6 | **Missing edge case:** No criteria for what happens when a product sells out while it's in someone's cart | Scope section 3 | Add: "If a cart item's stock reaches zero before checkout completes, the customer is notified and prevented from completing purchase" |

**Additional issues:** Shipping integration (Australia Post API), recommendation engine (Python microservice with scikit-learn), and Algolia search are all massive over-engineering for 20 candles.

---

## Arc C: Community Publication Website

**Brief:** "Our committee needs a way to publish articles online." Four writers, none technical.

| # | Flaw | Where | Fix |
|---|---|---|---|
| 1 | **Massive scope creep:** Reader accounts, comments with threading and voting, social sharing buttons, newsletter with A/B testing and segmentation, RSS feeds with podcast support, analytics dashboard, full-text search with Algolia, author profiles. Client said "publish articles" | Scope sections 2-9 | Remove sections 2, 3, 4, 5, 6, 7, 8, 9. Keep only the CMS (section 1, rewritten) |
| 2 | **Developer-facing criteria:** "Writers create articles using a Markdown editor" / "Configure SEO metadata (title tag, meta description, canonical URL)" | Scope section 1 | Writers don't know Markdown or SEO. Rewrite: "Writers use a rich text editor that looks like a word processor. SEO metadata is auto-generated from the article content." |
| 3 | **Missing anti-scope:** No anti-scope section | Missing section | Add: No reader accounts, no comments, no social sharing buttons, no newsletter (yet), no RSS, no analytics, no search, no author profiles. This will be the longest anti-scope of any arc |
| 4 | **Over-engineered architecture:** Headless CMS (Strapi), GraphQL API, Algolia, Cloudflare CDN, separate frontend/backend hosting | Technical stack | Replace with: React, FastAPI, PostgreSQL, Docker. Single app. The committee has 500 weekly readers, not 500,000 |
| 5 | **Oversized ticket:** "Build article creation and publishing with Markdown editor" | Ticket 2 | Split into: auth system, article database migration, CMS layout, article list view, rich text editor, image upload, preview, save draft, publish/schedule |
| 6 | **Technical language in user-facing features:** "Configure SEO metadata" / "Markdown editor with live preview" / "canonical URL" | Throughout | All SEO should be auto-generated. Editor should be WYSIWYG. No technical terms visible to writers |

**This is the most aggressively over-scoped flawed PRD.** AI added 8 major feature areas to a brief that said "publish articles." The student should remove approximately 80% of the scope.

---

## Arc D: Event Registration Website

**Brief:** "I need a website where people can register for my workshops." Monthly workshops, quarterly markets.

| # | Flaw | Where | Fix |
|---|---|---|---|
| 1 | **Scope creep:** User accounts, ticketing and payments, recurring events, Google Calendar two-way sync, SMS notifications | Scope sections 3, 4, 5, 6, 8 | Remove sections 3, 4, 5, 6, 8. Client wants registration (name + email), not accounts, tickets, or payments |
| 2 | **Missing timezone specification:** "event_date VARCHAR(50)" stores "2026-03-20 10:00" — a string with no timezone | Database schema | Store as TIMESTAMP WITH TIME ZONE in UTC. Display in event's local timezone with abbreviation. Add timezone column to events table |
| 3 | **Missing anti-scope:** No anti-scope section | Missing section | Add: No user accounts, no payment (yet), no recurring events, no calendar sync, no SMS, no waitlist. These are all future features, not the current brief |
| 4 | **Vague capacity criteria:** "The system should handle capacity limits" | Acceptance criteria, section 2 | Rewrite: "When an event has 1 spot remaining and two people register simultaneously, only one succeeds. The other sees 'Event is full.'" |
| 5 | **Architecture stores dates as strings:** `event_date VARCHAR(50)` instead of `TIMESTAMP WITH TIME ZONE` | Database schema | Use proper timestamp type. Store UTC. Add timezone column. All date operations use timezone-aware functions |
| 6 | **Missing edge cases:** No criteria for past dates, registration after deadline, timezone display | Acceptance criteria | Add: "Attempting to register for a past event shows 'This event has already occurred.' Registration deadline specified and enforced. Event times displayed with timezone abbreviation." |

**The date/time storage flaw is the most dangerous.** It looks correct (a date string) but breaks every timezone operation. This is exactly the kind of confident-but-wrong output AI produces for date handling.

---

## Arc E: Local Business Directory

**Brief:** "I need a directory where people can find local businesses." 150 businesses, managed by admin.

| # | Flaw | Where | Fix |
|---|---|---|---|
| 1 | **Scope creep:** Business owner accounts, reviews and ratings, messaging, advertising tiers, recommendation engine. Client wants a searchable directory managed by the admin | Scope sections 3, 4, 5, 6, 7 | Remove sections 3, 4, 5, 6, 7. Admin manages all listings. No user-facing accounts |
| 2 | **Vague search specification:** "The directory is searchable" / "Users can find businesses" | Scope section 1 | Rewrite with precision: what fields are searched, what matching logic (partial, case-insensitive), how filters combine (AND), what happens with no results, how results are ordered, performance target (500ms) |
| 3 | **Missing anti-scope:** No anti-scope section | Missing section | Add: No user accounts, no reviews, no messaging, no advertising, no payment, no recommendation engine |
| 4 | **Over-engineered search:** Elasticsearch for 150 businesses | Technical stack | PostgreSQL full-text search (tsvector) is sufficient. Elasticsearch is designed for millions of documents |
| 5 | **Missing performance criteria:** No acceptance criteria for search speed or scale | Acceptance criteria | Add: "Search returns results within 500ms for any query against the full 150-business dataset" |
| 6 | **Missing edge cases:** No criteria for special characters in business names, empty categories, search with no results, pagination | Acceptance criteria | Add: "O'Brien's Café is findable by searching 'obriens cafe'. Empty search + category filter returns all businesses in that category. Search with no matches shows 'No businesses found' with suggestion to broaden search." |

**The search specification flaw is Arc E's signature.** "The directory is searchable" is the most confidently vague thing AI produces. It sounds complete but specifies nothing.

---

## Scoring Yourself

For each flawed PRD, count how many of the 6 flaws you found:

| Found | Meaning |
|---|---|
| 6/6 | Excellent — your PRD review skill is strong |
| 4-5/6 | Good — you caught the major issues. Review what you missed |
| 2-3/6 | Developing — re-read the PRD template review checklist and try again |
| 0-1/6 | Needs practice — go back to the annotate step and study the worked-example PRDs more carefully |

The most commonly missed flaws are: missing anti-scope (students forget to add one), vague acceptance criteria (students accept "should work well"), and over-engineered architecture (students don't push back on AI's tech stack recommendations).

---

## Patterns to remember in your own PRDs

These are the same flaw categories you'll need to catch when reviewing your own AI-generated PRDs for Projects 3-5:

1. **Scope creep** — AI adds features the client didn't ask for. Every feature should trace back to the brief. If it doesn't, remove it or move it to anti-scope.
2. **Vague acceptance criteria** — "should work well," "handles correctly," "is user-friendly." Replace with specific, testable outcomes: what the user does, what they see, what values are expected.
3. **Weak or missing anti-scope** — If the anti-scope section is empty or generic, AI will add features freely. List every feature you're deliberately NOT building.
4. **Oversized tickets** — "Build the booking system" is not a ticket. If a ticket touches more than one feature or would take more than ~300 lines of code, split it.
5. **Over-engineered architecture** — Kubernetes, Elasticsearch, microservices, ML models. If the brief is "150 businesses" or "monthly workshops," the architecture should be simple. Push back on any technology the scale doesn't justify.
6. **Hallucinated libraries** — AI recommends tools that don't exist or are unmaintained. Check every library recommendation against its actual documentation or GitHub repo before approving.
