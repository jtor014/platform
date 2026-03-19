---
title: "Client briefs"
description: "Client briefs for Projects 3, 4, and 5"
page_type: "multi-section"
section: "web-dev"
note: "Contains 3 project sections. Each extracted to its own page by the .astro file"
---
# Arc B: Online Store — Client Briefs

## Project 3: "People Want to Buy Online"

> "People keep DMing me asking how to order. I'm losing sales because I can't answer fast enough. I want a proper online shop — people add candles to a cart, check out, and pay. I'll handle shipping myself for now. I need to get a confirmation email when someone orders so I can pack and ship it. The customer should get a confirmation email too."

**What the client is actually asking for:**
A product catalogue, shopping cart, Stripe checkout, and confirmation emails to both the customer and the owner.

**What will tempt AI to overbuild:**
User accounts, wishlists, saved payment methods, reviews, order tracking dashboards, recommendation engines, shipping integrations. The client wants anonymous checkout — no accounts.

**What to clarify before approving the PRD:**
- Payment architecture: Stripe Checkout (redirect) is safe. Custom payment forms require PCI compliance — anti-scope
- Cart lives in the browser (no accounts = no server-side cart)
- Every payment ticket must include: "Verify against Stripe docs at [URL]"

**What to verify personally in the finished product:**
Add items to cart. Check the cart total. Complete a test purchase. Verify: cart total = Stripe charge amount = order record amount. All three must match exactly. Check webhook signature verification — AI often skips this.

**Templates to use:** PRD template, architecture template

**Simulated scope change (two weeks in):**
The client asks: "Can we add discount codes? I want to do a 15% off promo for my newsletter subscribers."

**Handling:**
1. New ticket on the board — don't squeeze it into an existing ticket
2. The discount must flow through the entire payment chain:
   - Cart displays the discounted subtotal
   - Discount code passed to Stripe Checkout session
   - Stripe charges the discounted amount (verify in Stripe dashboard)
   - Order record stores original amount, discount, and final amount
   - Confirmation email shows the discount breakdown
3. Edge cases for the PRD: invalid code, expired code, minimum order threshold, stacking with other discounts? Anti-scope anything complex
4. Test with exact values: $24.50 × 2 + $18.00 = $67.00, 15% off = $10.05, total = $56.95. If the system shows anything else, investigate

---

## Project 4: "I Need to Manage Inventory and Orders"

> "Sales are going well — maybe too well. Last week I sold a candle that I'd actually run out of. Had to email the customer and apologise. I need the website to know how many of each product I have. When something sells out, it should say 'sold out' and not let people buy it. I also need a proper order dashboard — right now I'm relying on email notifications and it's easy to miss one. I want to see all orders, filter by status (new, shipped, delivered), and update them as I pack and ship."

**What the client is actually asking for:**
Stock tracking per product, sold-out prevention, and an order dashboard with status filtering and updates.

**What will tempt AI to overbuild:**
Automated reordering, supplier management, batch inventory updates, barcode scanning, shipping label generation.

**What to clarify before approving the PRD:**
- The critical question: "What happens when two people try to buy the last candle at the same time?"
- Stock must be decremented atomically at webhook confirmation, not at add-to-cart
- Write the race condition acceptance criterion explicitly

**What to verify personally in the finished product:**
Open 5 browser tabs. Add the same last-in-stock candle to all 5 carts. Click "checkout" on all 5 within seconds. Only one should succeed. Test the order dashboard: filter by status, update a status, verify it persists.

**Templates to use:** PRD template, architecture template

**Simulated stress test (mid-build):**
The client mentions: "I'm doing a launch on Instagram next week and expect a rush. Will the site handle it?"

**Handling:**
1. Assess the likely scale: 50-200 orders over a few hours for a small candle business. That's 1-3 per minute — fine for a single server
2. The real risk is simultaneous checkouts. Test the race condition (5 tabs, last item)
3. Communicate honestly: "For an Instagram-level rush, the site should handle it. I've tested the scenario where multiple people try to buy the last item simultaneously. If you're expecting something much bigger, give me 48 hours' notice"
4. Do NOT over-engineer: auto-scaling and load balancers are anti-scope for 200 orders

---

## Project 5: "I Want to Understand My Sales"

> "I've been running the store for three months now. I know I'm selling candles but I don't really know what's working. Which scents sell best? What day of the week do I get the most orders? What's my average order value? I got 50 orders from that Instagram post but I have no idea which post it was because I can't see where customers come from. I want a dashboard that shows me this stuff so I can make better decisions about what to make and where to advertise."

**What the client is actually asking for:**
A dashboard with: best-selling products, orders by day of week, average order value, and traffic source tracking.

**What will tempt AI to overbuild:**
A full analytics platform, cohort analysis, predictive modelling, A/B testing, marketing automation, customer segmentation.

**What to clarify before approving the PRD:**
- This is a fundamentally different type of PRD — "show data" not "build features"
- Specify accuracy requirements: "Dashboard revenue must match Stripe within $1"
- Verify chart library recommendations against actual docs (libraries change frequently)
- Date boundary edge cases: what does "this month" mean exactly? UTC midnight? Local midnight?

**What to verify personally in the finished product:**
Manually calculate expected values from the order data and compare to the dashboard output. If the dashboard says $2,340 and you calculate $2,340 from the records, good. If the numbers differ, investigate before accepting.

**Templates to use:** PRD template, architecture template

**Simulated data accuracy moment (after the build):**
The client says: "This says I did $2,340 in revenue last month. But my Stripe dashboard says $2,287. Which one is right?"

**Handling:**
1. Define "last month" in both systems. Your dashboard: midnight to midnight in which timezone? Stripe: UTC? The $53 gap could be a date boundary mismatch
2. Check refunds: does your dashboard subtract refunds? Does Stripe's figure include or exclude them?
3. Check failed payments: Stripe may show an attempted charge that was declined and retried. If your webhook handler counted both the failure and the success, you've double-counted
4. The fix is not to change the number. Find the EXACT cause, then decide which number is correct
5. Communicate: "Stripe's number is the authoritative source for actual revenue. Our dashboard was including [specific cause]. I've fixed it — the numbers now match."
