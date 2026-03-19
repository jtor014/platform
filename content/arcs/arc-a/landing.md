---
title: "Arc A: Service business"
description: "Business story arc for Projects 3-5"
page_type: "arc-landing"
section: "web-dev"
prev: "/web-dev/bridge/choose-arc"
next: "/web-dev/arcs/a/flawed-prd"
---
# Arc A: The Service Business

## The client

A landscaping company in Melbourne. Started as a solo operator — the owner does consultations, quotes, and jobs. Business is growing. By the end, there's a team of subcontractors.

## The story

You start with a solo operator who just needs a booking page. By Project 5, they have a team of subcontractors and the software you built manages the whole operation. Each project is a real conversation with the same client whose business is growing — and whose requests get more ambitious each time. You'll experience what it's like when a client says "just one more thing" mid-build, and learn how to handle it without derailing the project.

## What you'll build

- **Project 3:** Online booking system with admin dashboard — customers pick a date, owner sees all bookings
- **Project 4:** Quoting, job tracking, and customer management — create quotes, email them, track jobs through to invoiced
- **Project 5:** Contractor portals with role-based access — subcontractors see only their jobs, can't see customer details or financials

## What you'll learn that's unique

- Progressive client relationship — the same client across three projects, needs growing each time
- Multi-entity data models: customers, quotes, jobs — and how they connect
- Multi-user permissions: admin sees everything, contractors see only their assigned work
- Mobile-first design for field workers on job sites
- Handling scope changes mid-build (the client calls with "one more thing")
- Client demos and feedback — presenting work and responding to requests

## Best for

Students who want the simplest business domain so they can focus on Framework skills. The directing challenges here are process-oriented (scope changes, client feedback, multi-user permissions) rather than domain-specific. Good first arc if you're unsure.

## What makes this arc hard in practice

The client keeps coming back. Each project builds on the last, so by Project 5 your codebase is substantial and every change risks breaking something that worked before. Regression testing and CLAUDE.md management become real challenges.

## How you'll verify

Primarily by using the product as different user types. Log in as admin — see everything. Log in as a contractor — verify you can only see your own jobs. Try to access another contractor's data via direct URL — confirm it's blocked.

## Estimated time

4-6 weeks for Projects 3-5.
