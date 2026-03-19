---
title: "CLAUDE.md"
description: "Project memory file for FactFeed"
page_type: "material"
section: "web-dev"
prev: "/web-dev/projects/2/guide"
next: "/web-dev/checkpoints/after-project-2"
---
# CLAUDE.md

## Project Overview

FactFeed — a random facts web application. Backend API (FastAPI), PostgreSQL database, background worker (fetches facts from an external API every 5 minutes), React frontend. All services run in Docker containers.

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS 3
- **Backend:** FastAPI + Python 3.12 + asyncpg
- **Database:** PostgreSQL 16
- **Background Worker:** APScheduler (or similar) in the FastAPI process
- **Containerisation:** Docker + Docker Compose
- **CI/CD:** GitHub Actions (lint + test + build)
- **AI Review:** Gemini (via GitHub Actions workflow)
- **Deployment:** Railway / Render / EC2

## Repository Structure

```
factfeed/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI app, lifespan, routes
│   │   ├── database.py       # Connection pool
│   │   ├── models.py         # Pydantic models
│   │   ├── worker.py         # Background fact fetcher
│   │   └── config.py         # Settings from environment
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py       # Test fixtures
│   │   └── test_api.py       # Endpoint tests
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FactCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── Dockerfile
├── db/
│   └── init.sql              # Schema initialisation
├── docker-compose.yml
├── .env.example
├── .env                      # Not committed (in .gitignore)
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── gemini-review.yml
├── Makefile
├── CLAUDE.md
├── BACKLOG.md
└── .gitignore
```

## Anti-Scope

Do NOT implement, suggest, or add code for any of the following:

- No user accounts or login
- No ability to submit, like, or favourite facts
- No categories, tags, or filtering of facts
- No comments or social features
- No admin panel or dashboard
- No analytics or tracking
- No complex state management (no Redux, Zustand, etc.)
- No caching layer (no Redis)
- No load balancer or auto-scaling
- No custom domain setup

## Engineering Standards

### Git & Branching
- Branch naming: `feat/ticket-number-short-description` or `fix/ticket-number-short-description`
- Conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`
- Every PR references its Issue: "Closes #N"
- No direct pushes to `main`

### Testing
- TDD: write failing tests first, then implement
- pytest with async fixtures for FastAPI endpoints
- Every endpoint: test for success (200) and at least one error case (404, 422)
- Run `make test` before opening PR

### Code Quality
- Backend: Ruff for linting and formatting
- Frontend: ESLint + Prettier
- Maximum PR size: 300 lines (excluding tests and generated code)
- Type hints on all Python function signatures

### PR Workflow
1. Create feature branch from `main`
2. Implement with TDD
3. Run `make test` and `make lint`
4. Commit with conventional commit
5. Push and open PR with "Closes #N"
6. Self-review against acceptance criteria
7. Wait for CI and Gemini review
8. Report to Director

### Director's Briefing
After each ticket, provide:
- What was built and why
- Key technical decisions
- What to verify
- Any concerns

## Makefile Commands

```
make up          # Start all services (backend, frontend, postgres)
make down        # Stop all services
make restart     # Restart all services
make logs        # Follow logs from all services
make test        # Run pytest
make lint        # Run Ruff (backend) + ESLint (frontend)
make db          # Open psql shell
make status      # Show running containers
make clean       # Remove all containers and volumes
```

## Environment Variables

See `.env.example`:
```
DATABASE_URL=postgresql://factfeed:factfeed@db:5432/factfeed
FACTS_API_URL=https://uselessfacts.jsph.pl/api/v2/facts/random
FETCH_INTERVAL_MINUTES=5
```

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS facts (
    id SERIAL PRIMARY KEY,
    text VARCHAR(1000) NOT NULL UNIQUE,
    source VARCHAR(500),
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Current State

- Last completed ticket: None — project starting
- Known issues: None
- Technical debt: None
