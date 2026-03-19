---
title: "Arc E: Community directory"
description: "Business story arc for Projects 3-5"
page_type: "arc-landing"
section: "web-dev"
prev: "/web-dev/bridge/choose-arc"
next: "/web-dev/arcs/e/flawed-prd"
---
# Arc E: The Community Directory

## The client

A local business association with about 150 member businesses. Currently has a PDF list on their website that nobody can use effectively. Needs a proper searchable directory.

## The story

Search sounds simple until you try to specify it. What fields does it match? What happens when the query matches nothing? How do filters combine? AI gives the most confidently vague answers about search — your job is to pin it down until there's no ambiguity left. By Project 5, you're building a review system and thinking like an attacker: fake reviews, review bombing, a business owner demanding you remove a negative review or they leave the association. This arc teaches adversarial thinking — writing PRDs that assume users will game the system.

## What you'll build

- **Project 3:** Searchable business directory with map integration — search, filter, browse on a map
- **Project 4:** Business owner self-service with image uploads and approval workflows — claim listing, update details, admin approves
- **Project 5:** Reviews and reputation system with abuse detection — ratings, responses, anti-gaming measures

## What you'll learn that's unique

- Search specification: AI gives the most confidently vague answers about search. You specify what fields, what matching, how filters combine, what happens with no results
- User-generated content safety: XSS testing, image validation, input sanitisation
- Adversarial thinking: fake reviews, review bombing, self-reviews. Writing PRDs that assume users will game the system
- Stakeholder pressure: a business owner demands "remove that negative review or I leave the association"

## Best for

Information systems, cybersecurity, or data management students. Anyone who wants to think like an attacker and a policymaker.

## What makes this arc hard in practice

Adversarial users. Every other arc assumes users are cooperating (even if they make mistakes). This arc assumes users are gaming the system — fake reviews, self-promotion, review bombing, content injection. You'll write PRDs that anticipate abuse and acceptance criteria that test for it.

## How you'll verify

Adversarial testing. Paste `<script>alert('xss')</script>` into every text field. Create fake accounts and try to review your own business. Leave five 1-star reviews on the same business and check if the system flags it. Upload a 50MB image and check if it's rejected. If any of these succeed, the acceptance criteria missed something.

## Estimated time

4-6 weeks for Projects 3-5.
