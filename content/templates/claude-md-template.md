---
title: "CLAUDE.md template"
description: "Project memory file for AI"
page_type: "template"
section: "templates"
group: "build"
---
# CLAUDE.md Template

Copy this template into your project root as `CLAUDE.md`. Fill in the sections with your project's specific details. This is the AI's project memory — it reads this file at the start of every session.

---

# CLAUDE.md

## Project Overview

[1-2 sentences: what is this project and who is the client]

## Tech Stack

- **Frontend:** [e.g., React 18 + Vite + Tailwind CSS 3]
- **Backend:** [e.g., FastAPI + Python 3.12]
- **Database:** [e.g., PostgreSQL 16]
- **Containerisation:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **AI Review:** Gemini (via GitHub Actions workflow)
- **Deployment:** [e.g., Netlify, Railway, EC2]

## Repository Structure

```
[Paste the directory structure from the architecture document]
```

## Anti-Scope

The following are explicitly NOT in scope. Do not implement, suggest, or add code for any of these:

- [List every anti-scope item from the PRD]
- [Be specific — "No user accounts" not "No complex features"]

If you believe something should be added, raise it as a question rather than implementing it.

## Engineering Standards

### Git & Branching
- Branch naming: `feat/ticket-number-short-description` or `fix/ticket-number-short-description`
- Conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`
- Every PR references its Issue: "Closes #N"
- No direct pushes to `main` — all changes via PR

### Testing
- TDD: write failing tests first, then implement
- Backend: pytest with fixtures
- Frontend: Vitest + React Testing Library (if applicable)
- Every endpoint must have tests for success case and at least one error case
- Run `make test` before opening PR

### Code Quality
- Backend: Ruff for linting and formatting
- Frontend: ESLint + Prettier (if applicable)
- Maximum PR size: 300 lines (excluding test files and generated code)
- If a PR would exceed 300 lines, split the ticket

### PR Workflow
1. Create feature branch from `main`
2. Implement with TDD (failing test → implementation → passing test)
3. Run `make test` and `make lint` locally
4. Commit with conventional commit message
5. Push and open PR with "Closes #N"
6. Self-review: read the diff against acceptance criteria
7. Wait for CI and Gemini review
8. Report to Director: CI status, self-review findings, Gemini findings, recommendation

### Director's Briefing
After each ticket, provide a brief summary:
- What was built and why
- Key technical decisions made
- What to verify (specific things the Director should check)
- Any concerns or things that felt fragile

## Makefile Commands

```
make up          # Start all services
make down        # Stop all services
make restart     # Restart all services
make logs        # Follow logs from all services
make test        # Run all tests
make lint        # Run linters
make db          # Open database shell
make status      # Show running containers
make clean       # Remove containers and volumes (fresh start)
```

## Database

- **Connection:** PostgreSQL running in Docker, port 5432
- **Credentials:** See `.env` file (never committed to Git)
- **Migrations:** [Describe how schema changes are applied]

## Environment Variables

Required environment variables (see `.env.example`):

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
[List all required environment variables with descriptions]
```

## Current State

[Update this section as the project progresses]

- **Last completed ticket:** #N — [description]
- **Current sprint focus:** [what we're working on]
- **Known issues:** [anything broken or incomplete]
- **Technical debt:** [shortcuts taken that should be revisited]

## Project-Specific Rules

[Add any rules specific to this project's domain]

[Examples:]
[- "All dates stored as UTC, displayed in event's local timezone with abbreviation"]
[- "All monetary amounts stored as integers in cents, displayed as dollars with 2 decimal places"]
[- "All user-submitted text must be sanitised for XSS before storage and display"]
[- "Third-party API integrations must be verified against official docs before implementation"]
