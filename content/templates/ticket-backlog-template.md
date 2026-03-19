---
title: "Ticket backlog template"
description: "Structured tickets with acceptance criteria"
page_type: "template"
section: "templates"
group: "planning"
---
# Ticket Backlog Template

This template defines how tickets are structured in BACKLOG.md. AI generates the backlog from the architecture document; the student reviews it against the PRD.

---

## BACKLOG.md Format

```markdown
# BACKLOG

## Ticket 1: [Clear, specific title]

**Labels:** [setup / frontend / backend / deploy / testing]
**Dependencies:** None / Requires Ticket N
**Size:** S (< 100 lines) / M (100-200 lines) / L (200-300 lines)

**Description:**
[1-3 sentences: what gets built in this ticket]

**Acceptance Criteria:**
- [ ] [Specific, testable criterion — verified by using the product]
- [ ] [Edge case criterion — what happens with bad input, empty state, boundary]
- [ ] [If money: exact amount matching across systems]
- [ ] [If dates: timezone behaviour specified]
- [ ] [If user input: invalid input handling specified]

**Technical Notes:**
[Optional: any specific implementation guidance for the AI — libraries to use or avoid, patterns to follow, files to modify]

---

## Ticket 2: [Title]
[Same structure...]
```

---

## Rules for Good Tickets

### Size
- No ticket should produce a PR over 300 lines (this includes test files — tests are real code and count toward the limit)
- If a ticket description includes the word "and" between two distinct features, it's probably two tickets
- **Watch for bundle tickets.** "Build dashboard and analytics" is two things. "Build checkout flow with Stripe integration" is at least three: cart UI, Stripe session creation, webhook handler + order creation
- When in doubt, split it

**Example of a good split:**
A "shopping cart with checkout" ticket should become:
1. Cart component (add/remove items, display total) — frontend
2. Stripe Checkout session creation endpoint — backend
3. Stripe webhook handler + order creation — backend
4. Checkout success/cancel pages — frontend

Each is independently testable, independently reviewable, and under 300 lines.

### Ordering
- Ticket 1 is always project setup (repo, CLAUDE.md, Docker, Makefile)
- CI pipeline comes before feature tickets (so every PR gets tested)
- Backend before frontend (API exists before the UI calls it)
- Schema before endpoints (tables exist before queries run)
- Core features before enhancements
- Deploy is the final ticket (or second-to-last if followed by deploy-on-merge)
- No ticket depends on a ticket that comes after it

### Acceptance Criteria
- Every criterion is testable by using the product (not by reading code)
- At least one edge case per ticket
- Criteria use specific values, not vague qualities:
  - Bad: "Form should validate input"
  - Good: "Submitting with an empty name field shows the error message 'Name is required' below the field within 200ms"
- If the ticket involves a third-party API, include: "Verify implementation against [service] documentation at [URL]"

### Labels
Use consistent labels across all projects:
- `setup` — project scaffolding, configuration
- `backend` — API endpoints, database, server logic
- `frontend` — UI components, pages, styling
- `testing` — test infrastructure, test data
- `deploy` — deployment configuration, infrastructure
- `scope-addition` — features added after initial PRD (scope changes)

---

## After AI Generates the Backlog — Review Checklist

- [ ] Every ticket traces to a PRD feature (no tickets for anti-scope items)
- [ ] No ticket would produce a PR over 300 lines
- [ ] Dependencies are in order (no ticket depends on a later ticket)
- [ ] Every ticket has at least one edge case in acceptance criteria
- [ ] Acceptance criteria are testable by using the product
- [ ] The backlog covers everything in the PRD scope (nothing missing)
- [ ] Setup is first, deploy is last
