# Web Dev Arc B: The Online Store — Blueprint

## Overview

**The client:** Someone selling products — handmade candles, specialty hot sauce, vintage furniture, a local bakery going online. The specific product doesn't matter; the commerce pattern is universal.

**The arc:** Cart & checkout → payment integration → inventory & order management → sales analytics.

**Why this arc:** Arc A teaches directing through a domain where the core data is simple (bookings, quotes, jobs). Arc B introduces fundamentally different directing challenges: third-party API integration where Claude can hallucinate the interface, financial accuracy where "close enough" isn't acceptable, client-side state management (the cart lives in the browser, not the database), and concurrent operations where two people buying the last item creates a race condition. These are directing problems, not just technical problems — the student must write acceptance criteria and verification strategies that are qualitatively different from Arc A.

**This document covers Projects 3-6 in Arc B context.** For Projects 1 and 2, see `web-dev-project-1-blueprint.md` and `web-dev-project-2-blueprint.md`. Every student completes those before starting an arc.

**Note on Project 1 variant:** If the student uses Arc B for Project 1, the static site is a product showcase (image-heavy grid, category filtering, performance verification via Lighthouse). The key difference from Arc A's static site is that image performance becomes a primary acceptance criterion.

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
- Integrated a third-party API (that happens at Project 4)
- Verified financial accuracy (amounts must be exact, not approximate)
- Handled client-side state (cart in the browser)
- Dealt with concurrent operations (two buyers, one item)
- Investigated data discrepancies across systems

---

## The Arc-Specific Flawed PRD (For the Bridge)

The brief it was generated from: "I want people to buy my candles online."

**The flaws the student must find and fix:**

1. **Scope creep:** The AI added user account registration, wishlists, saved payment methods, product reviews, and order tracking with login. The client said nothing about accounts — they want anonymous checkout.
2. **Vague acceptance criteria:** The checkout ticket says "payment should be processed securely." Not testable. Should specify: "Customer is redirected to Stripe Checkout. On successful payment, webhook fires, order is created, stock is decremented, confirmation email is sent within 60 seconds."
3. **Missing anti-scope:** No anti-scope section. The student must add: no user accounts, no saved payment methods, no wishlists, no reviews, no subscription/recurring orders, no custom payment form (Stripe Checkout redirect only).
4. **Dangerous architecture:** The AI recommended building a custom payment form with Stripe Elements to "look more professional." This requires PCI compliance. For a candle business, Stripe Checkout redirect is the correct and safe approach.
5. **Oversized ticket:** One ticket says "Build the shopping cart and checkout flow" — that's at least four tickets (cart component, cart state, checkout form, payment integration). The student must split it.
6. **Missing edge case:** No acceptance criteria for what happens when a product sells out while it's in someone's cart. The student must add this.

---

## Project 3: "People Want to Buy Online"

### The Client Brief

> "People keep DMing me asking how to order. I'm losing sales because I can't answer fast enough. I want a proper online shop — people add candles to a cart, check out, and pay. I'll handle shipping myself for now. I need to get a confirmation email when someone orders so I can pack and ship it. The customer should get a confirmation email too."

> **The scope creep moment (simulated):** Two weeks in, the client asks: "Can we add discount codes? I want to do a 15% off promo for my newsletter subscribers."

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | First encounter with payment and commerce |
| All planning templates | PRD, architecture, design, CLAUDE.md |
| The repaired flawed PRD | The student just fixed dangerous architecture and missing edge cases |
| The existing Project 1 codebase | The product showcase site |
| **Critical warning** | "Payment integration requires verifying Claude's output against actual Stripe docs. AI frequently hallucinates payment API interfaces." |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Generates** — first time. Must specify exact payment flow step by step |
| Architecture template | **Generates** — critical: where does cart state live? How is payment processed? |
| Design template | **Generates** — wireframes for cart and checkout. How many steps? |
| CLAUDE.md template | **Generates** — must include "third-party API verification" rule |
| Sprint retro template | **First formal use** |

### The Planning Phase

**The payment architecture decision:**
The most important planning moment in Arc B. The student evaluates AI's payment recommendation:

- **The safe path:** Stripe Checkout (redirect) — customer sent to Stripe's hosted page. No card details touch the student's server. Correct for this project.
- **The dangerous path:** Custom payment form with Stripe Elements — requires PCI compliance understanding. AI may recommend this because it "looks more professional." The student already caught this in the flawed PRD exercise.
- **The hallucinated path:** AI may recommend API methods, library versions, or integration patterns that don't match current Stripe docs. The student verifies every payment recommendation against https://stripe.com/docs.

**The cart state decision:**
No user accounts (anti-scope). Where does the cart live?
- Browser state (localStorage or React state) — simplest, cart disappears on tab close
- Database — needs user accounts, which is anti-scope

For anonymous checkout, browser state is correct. The student understands the tradeoff and can explain it to the client.

### The Tickets

1. **Cart Component** — frontend cart with add/remove, quantity adjustment, running total
2. **Cart State Management** — persistent cart in browser (survives page navigation)
3. **Checkout Flow: Customer Details** — shipping name, email, address form with validation
4. **Checkout Flow: Payment Integration** — Stripe Checkout redirect, success/failure handling
5. **Webhook Handler** — receive Stripe payment confirmation, verify signature, create order record
6. **Order Confirmation** — display confirmation page on successful payment
7. **Email Notifications** — confirmation to customer, notification to client
8. **Orders Schema & Admin View** — orders table, basic admin list of orders for the client
9. **Financial Accuracy Tests** — automated tests verifying cart total = Stripe amount = order record
10. **Discount Codes** — (scope addition) validate code, apply percentage/fixed discount, verify discount flows through entire payment chain

### Key Directing Moments

**The Stripe documentation verification:**
The signature directing challenge. Claude generates Stripe integration code. The student:
1. Opens actual Stripe docs (https://stripe.com/docs/checkout/quickstart)
2. Compares Claude's implementation against the docs
3. Checks: is the API version current? Is the endpoint correct? Are parameters right? Is webhook signature verification included?

This isn't about understanding Stripe's code — it's about developing the habit of verifying AI output against authoritative sources when the stakes are high.

**The financial accuracy chain:**
Cart total → Stripe amount → order record. Are they identical? Common AI bugs:
- Stripe uses cents, not dollars ($12.50 = 1250) — wrong conversion charges the wrong amount
- Floating point: 0.1 + 0.2 ≠ 0.3 — rounding errors accumulate across line items
- Discount applied to displayed total but not Stripe total — customer sees one price, pays another

Acceptance criteria: "The amount displayed in the cart, sent to Stripe, and stored in the order record must be identical. Tests verify exact amounts, not approximate."

**The webhook security check:**
After payment, Stripe sends a webhook. Claude must implement signature verification — confirming the webhook came from Stripe, not an attacker faking "payment successful" events. AI sometimes skips this. The student's review must catch it.

**The client-side state verification:**
Add 3 items, navigate away and back — cart still there? Refresh — still there? New tab — there too? The student must understand what their architecture produces and verify it matches expectations.

### What Can Go Wrong

- Claude implements a custom payment form instead of Stripe Checkout redirect — student catches during architecture review (they caught this in the flawed PRD)
- Claude uses an outdated Stripe API or hallucinated endpoint — student catches by checking docs
- Cart total is $12.50 but Stripe receives 12.50 (dollars not cents) — charges $0.13. Financial accuracy tests catch this
- Webhook signature verification skipped — "it works" but is insecure
- Discount code applies to displayed total but not Stripe total — customer sees one price, pays another
- Email confirmation sends before payment is confirmed (on checkout submit, not webhook) — emails go out for failed payments

### Sprint Retro

- Did Stripe doc verification catch any hallucinations?
- Were financial accuracy tests specific enough for the full chain?
- How did client-side state verification compare to backend verification?
- Was the scope change (discount codes) handled through the board?

### Technical Context (Discovered Along the Way)

- **Payment integration:** How online payments work. Redirect vs embedded. PCI compliance basics
- **Client-side state:** Data in the browser. React state vs localStorage
- **Webhooks:** Server-to-server notifications. "Stripe tells your server the payment worked"
- **Decimal arithmetic:** Why 0.1 + 0.2 ≠ 0.3. How to handle money correctly
- **Third-party API verification:** Checking AI recommendations against official docs

---

## Project 4: "I Need to Manage Inventory and Orders"

### The Client Brief

> "Sales are going well — maybe too well. Last week I sold a candle that I'd actually run out of. Had to email the customer and apologise. I need the website to know how many of each product I have. When something sells out, it should say 'sold out' and not let people buy it. I also need a proper order dashboard — right now I'm relying on email notifications and it's easy to miss one. I want to see all orders, filter by status (new, shipped, delivered), and update them as I pack and ship."

> **The stress test moment (simulated):** The client mentions an upcoming Instagram launch expecting a rush of orders. "Will the site handle it?"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | Introduces inventory constraints and concurrent operations |
| All templates | Student adapts them for inventory-specific concerns |
| The existing codebase from Project 3 | Cart, checkout, payment all working |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Adapts** — student adds concurrency requirements, capacity considerations |
| Architecture template | **Adapts** — student adds database locking strategy, stock decrement timing |
| Component spec template | **First use** — stock badges, order status cards, dashboard filters |
| Sprint retro template | **Second use** — comparing to Project 3 findings |

### The Planning Phase

**The concurrency challenge:**
The student pushes AI on: "What happens when two people try to buy the last candle at the same time?" AI-generated PRDs typically ignore this. Required acceptance criteria:
- "When a product has 1 unit remaining and two customers submit orders simultaneously, only one succeeds. The other receives a 'sold out' message."
- "Stock is decremented atomically at webhook confirmation, not at add-to-cart."

**The inventory timing decision:**
Where does stock get decremented?
- At "add to cart"? (Reserves stock but abandoned carts lock inventory)
- At "checkout submit"? (Payment might fail)
- At "webhook confirmation"? (Most correct — stock only decrements when paid)

For a candle business, decrement on webhook is right. The student evaluates and decides.

### The Tickets

1. **Inventory Schema** — add stock_quantity to products, admin interface to manage stock levels
2. **Stock Display** — "In Stock" / "Low Stock" / "Sold Out" on product cards and detail pages
3. **Cart Stock Validation** — check stock when adding to cart, warn if stock changed during browsing
4. **Atomic Stock Decrement** — decrement on confirmed payment with database-level locking to prevent overselling
5. **Sold Out Prevention** — prevent checkout if any cart item is out of stock at payment time
6. **Orders Dashboard: List View** — all orders with status filter (new, shipped, delivered), search
7. **Orders Dashboard: Detail View** — individual order, customer info, items, payment status
8. **Order Status Management** — update status (new → packed → shipped → delivered) with timestamps
9. **Low Stock Alerts** — email to client when product drops below threshold
10. **Transactional Integrity Tests** — automated tests verifying the full chain: stock → payment → order → notification

### Key Directing Moments

**The race condition test:**
The defining directing challenge. Two simultaneous requests for the last unit — only one succeeds. This requires database-level locking. Claude may implement check-then-decrement that passes basic tests but fails under concurrent load. The student directs Claude to write a test simulating concurrent requests.

**The "sold out while in cart" UX:**
Customer adds item (1 remaining). Someone else buys it. Customer goes to checkout — what happens? The student must specify this. AI will ignore it. Options: message at checkout, real-time cart update, or block checkout button.

**The transactional integrity chain:**
Product shows "3 in stock" → customer buys 1 → product shows "2 in stock" → order record exists → Stripe charged correctly → client notification sent. Every step must be consistent.

**The capacity question:**
Client asks "will the site handle 200 orders in an hour?" The student assesses honestly: 200/hour is ~3/minute, probably fine for the current setup. But 200 simultaneous checkouts is different. The student communicates realistic limits — "I need to check" rather than "sure, no problem."

### What Can Go Wrong

- Check-then-decrement without locking — stock goes negative under concurrent access
- Stock display caches and shows "In Stock" when actually sold out
- Stock decremented at add-to-cart — abandoned carts lock inventory permanently
- Order dashboard query slow without indexes — first encounter with database performance
- CSV export crashes on 500 orders because Claude loads all into memory

### Sprint Retro

- Did race condition tests catch the concurrency issue?
- Is the transactional chain verified end-to-end?
- How was the capacity question handled?
- Pattern consistency with Project 3 code?

### Technical Context (Discovered Along the Way)

- **Concurrency:** Two things happening simultaneously. Race conditions. Database locking
- **Atomic operations:** All or nothing — stock and order created together
- **Database transactions:** Group operations to succeed or fail as a unit
- **Inventory patterns:** When to decrement. Reserve vs confirm
- **Database indexing:** Why queries slow as data grows
- **Capacity thinking:** Assessing whether a system handles expected load

---

## Project 5: "I Want to Understand My Sales"

### The Client Brief

> "I've been running the store for three months now. I know I'm selling candles but I don't really know what's working. Which scents sell best? What day of the week do I get the most orders? What's my average order value? I got 50 orders from that Instagram post but I have no idea which post it was. I want a dashboard that shows me this stuff so I can make better decisions."

> **The data accuracy moment (simulated):** The student builds the dashboard. The client says: "This says I did $2,340 in revenue last month. But my Stripe dashboard says $2,287. Which one is right?"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | No new user-facing features — purely understanding existing data |
| All templates | Student extends for data accuracy requirements |
| The existing codebase from Projects 3-4 | With real order data from testing |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Extends** — fundamentally different PRD: "show data" not "build features." Must specify accuracy requirements |
| Architecture template | **Extends** — aggregation queries, caching strategy, chart library selection |
| Component spec template | **Multiple** — chart components, metrics cards, filter controls |

### The Planning Phase

**A different type of PRD:**
Not "build a feature users interact with" but "build a view of data for business decisions." Must specify:
- What questions should the dashboard answer?
- What time periods matter?
- What metrics? (Revenue, order count, average order value, top products, orders by day)
- What accuracy? ("Must match Stripe within $1")

**The chart library verification:**
Claude will recommend a charting library. The student verifies: does it exist? Is it maintained? Is the API Claude uses the actual current API? Charting libraries change frequently.

### The Tickets

1. **Revenue Metrics Endpoint** — total revenue, order count, average order value for a date range
2. **Product Performance Endpoint** — revenue and units per product, sortable
3. **Time Series Endpoint** — orders/revenue grouped by day, week, or month
4. **Dashboard Layout** — metrics summary top, charts below, filters
5. **Revenue Chart** — line/bar chart, date range selector
6. **Top Products Chart** — best sellers by revenue and units
7. **Orders by Day/Time** — when orders happen (day of week, time of day)
8. **Dashboard Filters** — date range, category filter, apply to all charts
9. **Data Accuracy Tests** — automated comparison: dashboard totals vs raw database queries vs Stripe
10. **CSV Export** — export any dashboard view for the client's spreadsheet

### Key Directing Moments

**The mathematical verification challenge:**
Completely different from visual or functional verification. The student must verify numbers are correct:
1. Direct Claude to build the revenue endpoint
2. Manually calculate expected result from raw test data
3. Compare
4. If different — bug in query, aggregation, or test data?

AI aggregation queries frequently have subtle bugs: counting cancelled orders, double-counting multi-item orders, handling date boundaries incorrectly.

**The Stripe discrepancy investigation:**
Dashboard says $2,340, Stripe says $2,287. The student investigates:
- Dashboard includes orders from failed-then-retried payments?
- Different date boundaries (order creation vs payment confirmation)?
- Rounding accumulation across orders?
- Refunds included in one but not the other?

The student finds the cause, explains to the client in plain English, and decides whether to fix or document.

**The date boundary edge cases:**
"This month's revenue" — from the 1st at midnight UTC? Client's timezone? Including today's partial data? Order at 11:58pm last day of month, payment confirmed at 12:02am this month — which month?

### What Can Go Wrong

- Revenue includes cancelled/refunded orders — "revenue" not defined precisely enough
- Chart shows $0 for today because query uses UTC but client is in a different timezone
- Dashboard loads slowly — aggregation runs on every page load without caching
- Claude uses outdated charting library API — student catches by checking docs
- CSV export produces different totals than dashboard — different query, different numbers

### Sprint Retro (Final for Arc B)

- Did mathematical verification work? Were numbers accurate?
- How was the Stripe discrepancy investigation handled? Was the explanation clear?
- How confident is the student that dashboard numbers are correct? What's the evidence?
- Full arc retrospective: how did Arc B's directing challenges differ from Arc A?

### Technical Context (Discovered Along the Way)

- **Data aggregation:** GROUP BY, SUM, COUNT, AVG. Raw data into summaries
- **Date/time in queries:** Timezones, boundaries, grouping by period
- **Charting libraries:** Rendering data visually. Chart types for data shapes
- **Dashboard design:** Metrics, drill-down, filtering
- **Data accuracy:** "Numbers look right" isn't good enough. Cross-referencing sources
- **Caching:** Expensive queries shouldn't run on every page load

---

## Project 6: "It Needs to Be Reliable"

Project 6 follows the same structure across all arcs — see Arc A's Project 6 for the full blueprint. The student takes whatever they built in Projects 3-5 and makes it production-grade: HTTPS, monitoring, backups, security hardening, data protection, staging environment, runbooks, handover documentation.

**Arc B-specific operational concerns:**
- Payment system monitoring — alerts if webhook processing fails (orders not being created after payment)
- Financial reconciliation runbook — monthly process comparing internal records to Stripe
- PCI compliance documentation — what card data (if any) touches the system, how it's protected
- Backup verification must include order data integrity — restoring from backup must produce correct financial totals

---

## Summary

| Project | Client Says | Tickets | Primary Directing Challenge |
|---|---|---|---|
| 3 | "Let people buy online" | 8-10 | Third-party API verification (Stripe). Financial accuracy chain. Client-side state. Webhook security |
| 4 | "Manage inventory and orders" | 8-10 | Concurrent operations (race conditions). Transactional integrity. Capacity communication |
| 5 | "Understand my sales" | 8-10 | Mathematical verification. Data discrepancy investigation. Date boundary edge cases |
| 6 | "It needs to be reliable" | 11-13 | Operational (same as Arc A) + payment monitoring + financial reconciliation |
| **Arc Total** | | **35-43** | |
| **With Projects 1-2** | | **~53-61** | **Third-party integration, financial accuracy, concurrency, data verification** |

### How Arc B Differs from Arc A

| Dimension | Arc A (Service Business) | Arc B (Online Store) |
|---|---|---|
| Primary verification | Visual (design match) → Functional → Adversarial | Numerical (financial accuracy) → Documentary (Stripe docs) |
| Critical edge case | Permissions (who sees what) | Concurrency (two buyers, one item) |
| Third-party integration | Email | Payment processing (high stakes) |
| State management | Server-side only | Client-side (cart) + server-side |
| Client communication challenge | Technical risk explanation | Financial discrepancy investigation |
| AI's weakness | Adding features | Hallucinating API interfaces |

A student who completes Arc B has practised the most rigorous numerical verification of any arc, verified AI output against third-party documentation, handled race conditions, investigated data discrepancies across systems, and communicated financial accuracy issues to a non-technical client.
