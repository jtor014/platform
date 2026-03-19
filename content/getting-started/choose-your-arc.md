---
title: "Choose your arc"
description: "Pick the business story that interests you for Projects 3-5"
page_type: "decision"
section: "web-dev"
prev: "/web-dev/bridge"
---
# Choose Your Arc

After completing Projects 1 and 2, you choose a business story for Projects 3-5. Each arc follows a realistic client whose needs grow over time. Different arcs teach different directing challenges.

**There's no wrong choice.** The Framework skills transfer across all arcs. Pick the one that interests you most.

---

## Arc A: The Service Business

**The client:** A landscaping company that's growing from a solo operator to a team with subcontractors.

**What you'll build:**
- Project 3: Online booking system with admin dashboard
- Project 4: Quoting, job tracking, and customer management
- Project 5: Contractor portals with role-based access

**What you'll learn that's unique:**
- Progressive client relationship — the same client across three projects
- Multi-entity data models (customers, quotes, jobs)
- Multi-user permissions (admin vs contractor)
- Mobile-first design for field workers
- Client demos and feedback handling

**Best for:** Students who want the simplest business domain so they can focus purely on Framework skills. Also great for software engineering or business students.

**Estimated time for Projects 3-5:** 4-6 weeks

---

## Arc B: The Online Store

**The client:** A handmade candle business going from Instagram DMs to a real online shop.

**What you'll build:**
- Project 3: Shopping cart and Stripe payment checkout
- Project 4: Inventory management with stock tracking and order dashboard
- Project 5: Sales analytics dashboard

**What you'll learn that's unique:**
- Third-party API verification — checking Claude's Stripe integration against actual docs
- Financial accuracy — cart total must exactly match Stripe charge must exactly match order record
- Concurrent operations — two buyers, one item, who gets it?
- Data discrepancy investigation — your dashboard says $2,340, Stripe says $2,287, which is right?

**Best for:** E-commerce, digital business, or accounting students. Anyone who wants to work with money and external APIs.

**Estimated time for Projects 3-5:** 4-6 weeks

---

## Arc C: The Content Platform

**The client:** A community association that needs to publish articles and engage readers.

**What you'll build:**
- Project 3: Content management system for non-technical writers
- Project 4: Newsletter with email subscription
- Project 5: Comments with moderation and members-only content

**What you'll learn that's unique:**
- Anti-scope discipline — content platforms are where AI over-engineers the most aggressively
- Non-technical user acceptance criteria — "the grandmother test"
- Rich text editor verification — does it actually work like a word processor?
- Content moderation and abuse response — what happens when someone posts something offensive?
- Email deliverability — why emails land in spam and how to fix it

**Best for:** Digital media, communications, or community development students. Anyone who wants to build for people who don't know what HTML is.

**Estimated time for Projects 3-5:** 4-6 weeks

---

## Arc D: The Event Platform

**The client:** A workshop organiser who needs registrations, ticketing, and day-of check-in.

**What you'll build:**
- Project 3: Event listings with registration and capacity management
- Project 4: Ticketing with multiple tiers, payments, and waitlists
- Project 5: QR code check-in app that works offline

**What you'll learn that's unique:**
- Date/time precision — AI's most unreliable domain. Timezones, daylight savings, "registration closes 2 hours before" in which timezone?
- Combinatorial scoping — ticket types × pricing × discounts = complexity explosion. Define what's supported, what's anti-scope
- Offline-first design — the wifi drops during check-in with 40 people queuing. What happens?
- Physical environment testing — scanning QR codes, testing in sunlight, going offline on your phone

**Best for:** Event management, IT, or community development students. Anyone who wants to build software that works in the real world, not just the browser.

**Estimated time for Projects 3-5:** 4-6 weeks

---

## Arc E: The Community Directory

**The client:** A local business association that needs a searchable directory with self-service listings and reviews.

**What you'll build:**
- Project 3: Searchable business directory with map integration
- Project 4: Business owner self-service with image uploads and approval workflows
- Project 5: Reviews and reputation system with abuse detection

**What you'll learn that's unique:**
- Search specification — AI gives the most confidently wrong answers about search. You specify: what fields, what matching, how filters combine, what happens with no results
- User-generated content safety — XSS testing, image validation, input sanitisation
- Adversarial thinking — fake reviews, review bombing, self-reviews. Writing PRDs that assume users will game the system
- Stakeholder pressure — a business owner demands "remove that negative review or I'll leave the association"

**Best for:** Information systems, cybersecurity, or data management students. Anyone who wants to think like an attacker and a policymaker, not just a builder.

**Estimated time for Projects 3-5:** 4-6 weeks

---

## After Your Arc: Project 6

All arcs end with Project 6: The Live System. You take whatever you built and make it production-grade — monitoring, backups, security, handover documentation. Project 6 is the same regardless of which arc you chose.

---

## Still Not Sure?

Start with **Arc A**. It has the simplest business domain, so you can focus on the Framework skills without being distracted by complex business logic. You can always do a second arc later — the process gets faster each time.
