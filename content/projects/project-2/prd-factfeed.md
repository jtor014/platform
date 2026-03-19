---
title: "PRD: FactFeed"
description: "Product requirements for the random facts application"
page_type: "material"
section: "web-dev"
prev: "/web-dev/projects/2"
next: "/web-dev/projects/2/backlog"
---
# PRD: FactFeed — Random Facts App

## Executive Summary

Build a web application that displays random interesting facts. Facts are fetched from an external API, stored in a local database, and served through a backend API to a React frontend. The app shows one fact at a time with a "Next Fact" button. The system fetches new facts automatically in the background.

## Problem Statement

This is a learning project — the "problem" is building something simple enough that the student can focus on the technical stack (Docker, API, database, CI, automated review) rather than complex business logic. The domain is deliberately boring. The tools are the exciting part.

## Target Users

| User | Who They Are | What They Need |
|---|---|---|
| Visitor | Anyone with a browser | See a random interesting fact. Get a new one on demand |

## Scope — What We're Building

### 1. Backend API
A FastAPI application that serves random facts from the database.
- **GET /api/health** — returns `{"status": "ok"}` (health check for monitoring)
- **GET /api/facts/random** — returns one random fact from the database as JSON
- **Acceptance criteria:**
  - `/api/health` returns 200 with `{"status": "ok"}`
  - `/api/facts/random` returns 200 with `{"id": int, "text": string, "source": string, "created_at": string}`
  - `/api/facts/random` returns a different fact on most requests (random selection)
  - `/api/facts/random` returns 404 with `{"detail": "No facts available"}` when the database is empty
  - API documentation auto-generated at `/docs` (FastAPI default)

### 2. Database
PostgreSQL storing the facts.
- **facts** table: id (serial), text (varchar), source (varchar), fetched_at (timestamp UTC)
- **Acceptance criteria:**
  - Facts persist after container restart (`make down` then `make up` — facts are still there)
  - No duplicate facts (unique constraint on text)
  - At least 10 facts in the database after the worker has run for 30 minutes

### 3. Background Worker
A scheduled task that fetches facts from an external API and stores them.
- Source: https://uselessfacts.jsph.pl/api/v2/facts/random
- Runs every 5 minutes
- Handles: duplicate facts (skip), network errors (log and retry next cycle), API downtime (app still serves existing facts)
- **Acceptance criteria:**
  - Worker runs automatically every 5 minutes without manual intervention
  - New facts appear in the database without anyone using the frontend
  - If the external API is down, the application still serves previously fetched facts
  - Duplicate facts are silently skipped, not stored twice

### 4. Frontend
A React application that displays facts.
- Shows one random fact with source attribution
- "Next Fact" button fetches and displays a new random fact
- Loading state while fetching
- Error state if the API is unreachable
- Empty state if no facts are available
- **Acceptance criteria:**
  - Page shows a fact on initial load
  - Clicking "Next Fact" shows a different fact (most of the time — random means occasional repeats are OK)
  - While fetching: a loading indicator is visible
  - If the API is unreachable: an error message is shown ("Unable to load facts. Please try again.")
  - If no facts exist: a message is shown ("No facts available yet. Check back soon.")

### 5. Docker Compose
All services run in containers.
- Backend (FastAPI)
- Frontend (React + Vite)
- Database (PostgreSQL)
- **Acceptance criteria:**
  - `make up` starts all three services
  - `make status` shows all containers as running
  - `make down` stops all services
  - `make clean` removes all containers and volumes (fresh start)

### 6. CI Pipeline
Automated checks on every PR.
- Linting (Ruff for Python)
- Tests (pytest)
- Build check
- **Acceptance criteria:**
  - Opening a PR triggers the CI pipeline
  - If tests fail, the PR cannot be merged (branch protection)
  - CI status is visible on the PR page

### 7. Gemini AI Review
Automated code review by a second AI.
- Reviews every PR for security issues, best practices, and potential bugs
- Posts review as a PR comment
- **Acceptance criteria:**
  - Every PR receives a Gemini review comment
  - The review is substantive (not just "looks good")

### 8. Deployment
The application runs on a real server.
- **Acceptance criteria:**
  - The app is accessible at a public URL
  - Facts load on the live site
  - "Next Fact" works on the live site
  - The worker is fetching facts in production

## Anti-Scope — What We're NOT Building

- No user accounts or login
- No ability to submit or favourite facts
- No categories, tags, or filtering
- No comments or social features
- No admin panel
- No analytics or tracking
- No complex frontend state management (no Redux, Zustand, etc.)
- No caching layer (Redis, etc.)
- No load balancer or auto-scaling
- No custom domain (free tier subdomain is fine)

## Success Metrics

- All services start with `make up` and are healthy within 30 seconds
- API responds in under 200ms
- Frontend loads in under 3 seconds
- CI pipeline passes on all merged PRs
- At least 10 facts accumulated within 1 hour of deployment
- The application works after a full restart (`make clean && make up`)

## Technical Constraints

- Backend: FastAPI + Python 3.12
- Frontend: React 18 + Vite + Tailwind CSS
- Database: PostgreSQL 16
- All services: Docker + Docker Compose
- CI: GitHub Actions
- AI Review: Gemini via GitHub Actions
- Deployment: Railway, Render, or single EC2 instance

## Open Questions

- None — this is a fully specified learning project
