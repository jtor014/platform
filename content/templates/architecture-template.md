---
title: "Architecture template"
description: "Turn a PRD into schema, API contracts, and tickets"
page_type: "template"
section: "templates"
group: "planning"
---
# Architecture Template

Use this template by pasting it into conversational AI along with the approved PRD. The architecture must serve the PRD — nothing more, nothing less.

**Important:** Not every project needs every section. If the project is a static site or a simpler app, omit sections that don't apply (e.g., no database schema for a static site, no API contracts for a frontend-only project). The template is a maximum, not a minimum. Do not invent services just because the template includes a section for them.

---

## Instructions for AI

I need you to produce an architecture document based on the approved PRD I'll provide. Every architectural decision must be justified by a PRD requirement. Do not add infrastructure, services, or complexity that aren't required by the current scope. Simpler is better.

---

## 1. Tech Stack

For each technology, state:
- What it is
- Why it's needed (traced to a PRD requirement)
- Why this specific choice over alternatives

**Rules:**
- Don't recommend technologies not needed by the current PRD
- Don't recommend external services when built-in solutions work for the current scale
- If the PRD anti-scope excludes a feature, don't include infrastructure for it
- State the specific version or latest stable for each technology

## 2. Repository Structure

Show the file and directory structure:
```
project-root/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── Makefile
├── CLAUDE.md
├── BACKLOG.md
└── .github/workflows/
```

Adapt this to the actual project. If there's no backend (static site), remove backend directories. If there's no frontend (API-only), remove frontend directories.

## 3. Database Schema

For each table:
- Table name
- Columns with types and constraints
- Primary keys, foreign keys, indexes
- Why this table exists (traced to a PRD feature)

**Rules:**
- Don't create tables for features in anti-scope
- Don't create separate tables when a column on an existing table would suffice
- Every table must serve a specific PRD requirement
- Include created_at and updated_at on every table

Show the schema as SQL CREATE TABLE statements.

## 4. API Contracts

For each endpoint:
- Method and path (e.g., GET /api/bookings)
- Request parameters or body (with types)
- Success response (with exact JSON shape)
- Error responses (with status codes and messages)
- Which PRD feature this serves

**Rules:**
- Every endpoint must trace to a PRD feature
- Don't create endpoints for anti-scope features
- Error responses must be specific ("Booking date must be in the future") not generic ("Bad request")
- Include pagination for any endpoint that could return many results

## 5. Third-Party Integrations

For each external service:
- What it is and why it's needed
- The specific API or SDK being used
- **Verification note:** "This integration must be verified against the official documentation at [URL] before implementation"
- What happens if the service is unavailable (fallback behaviour)

## 6. Ticket Backlog

Break the PRD features into implementation tickets. For each ticket:
- Title (clear, specific)
- Description (what gets built)
- Acceptance criteria (copied or derived from the PRD)
- Dependencies (which tickets must be completed first)
- Labels (frontend, backend, setup, deploy, etc.)
- Estimated size: S (< 100 lines changed), M (100-200), L (200-300)

**Rules:**
- Every ticket must trace back to a user-visible requirement or a deployment need in the PRD. If a ticket can't be justified by a PRD feature, it shouldn't exist
- No ticket should produce a PR over 300 lines
- If a ticket is larger than L, split it
- First ticket is always project setup
- Last ticket is always deploy
- TDD: every ticket with backend logic must include tests
- Tickets are ordered by dependency — no ticket depends on a later ticket

## 7. Infrastructure & Deployment

- How is the app deployed? (Docker Compose, cloud service, static host)
- What environment variables are needed?
- What's the deploy process? (merge to main → auto-deploy, or manual)
- What's the rollback process?
- Estimated infrastructure cost (if applicable)

## 8. Risks & Assumptions

- What could go wrong technically?
- What assumptions are we making about scale, usage, or user behaviour?
- What would need to change if the client's needs grow?

---

## After AI Generates the Architecture — Review Checklist

- [ ] **Every component traces to the PRD:** No infrastructure for features not in scope
- [ ] **Schema matches the PRD's data model:** No extra tables for assumed features
- [ ] **API contracts are complete:** Every PRD feature has corresponding endpoints
- [ ] **Third-party integrations are flagged for verification:** Not assumed to be correct
- [ ] **Tickets are under 300 lines each:** No oversized tickets
- [ ] **Tickets are ordered by dependency:** No circular or out-of-order dependencies
- [ ] **Complexity matches the brief:** Not over-engineered for the current scale
- [ ] **Anti-scope is respected:** Nothing in the architecture supports features excluded in the PRD
