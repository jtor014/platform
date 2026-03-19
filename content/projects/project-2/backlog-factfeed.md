---
title: "BACKLOG: FactFeed"
description: "11 tickets split into Phase A and Phase B"
page_type: "material"
section: "web-dev"
prev: "/web-dev/projects/2/prd"
next: "/web-dev/projects/2/guide"
---
# BACKLOG

## Phase A — "The Stack Appears"

---

## Ticket 1: Project Setup & Docker Compose

**Labels:** setup
**Dependencies:** None
**Size:** M

**Description:**
Create the GitHub repository with CLAUDE.md and BACKLOG.md. Set up Docker Compose with three services: backend (FastAPI), database (PostgreSQL), and a placeholder frontend service. Create the Makefile with all standard commands. Create the database initialisation script. Create `.env.example` and `.env`. Set up GitHub labels, Issues, and Project board.

**Acceptance Criteria:**
- [ ] `make up` starts all three containers (backend, frontend, postgres)
- [ ] `make status` shows all containers as running and healthy
- [ ] `make down` stops all services
- [ ] `make clean` removes containers and volumes completely
- [ ] `make db` opens a psql shell connected to the database
- [ ] The `facts` table exists in the database (verify: `make db` → `\dt`)
- [ ] `.env.example` is committed; `.env` is in `.gitignore`
- [ ] FastAPI app responds at `http://localhost:8000/docs` with auto-generated API docs
- [ ] GitHub Issues created for all tickets; Project board set up

---

## Ticket 2: CI Pipeline

**Labels:** setup
**Dependencies:** Ticket 1
**Size:** S

**Description:**
Create GitHub Actions CI workflow that runs on every PR: checkout code, set up Python, install dependencies, run Ruff linter, run pytest. Create a basic health endpoint test that verifies `/api/health` returns 200.

**Acceptance Criteria:**
- [ ] Opening a PR triggers the CI workflow
- [ ] CI runs Ruff linting check
- [ ] CI runs pytest
- [ ] A test exists for `GET /api/health` → 200 with `{"status": "ok"}`
- [ ] CI results are visible on the PR page (green checkmark or red X)
- [ ] Branch protection: CI must pass before merge is allowed

---

## Ticket 3: Gemini AI Reviewer

**Labels:** setup
**Dependencies:** Ticket 2
**Size:** S

**Description:**
Create GitHub Actions workflow that sends PR diffs to the Gemini API for code review. Store the Gemini API key as a GitHub Secret. Configure branch protection to require a review.

**Acceptance Criteria:**
- [ ] Every PR receives a Gemini review comment within 2 minutes of opening
- [ ] The review comment is substantive (mentions specific code, not just "looks good")
- [ ] The Gemini API key is stored as a GitHub Secret, not in any committed file
- [ ] Branch protection requires: CI passes AND review exists

**Technical Notes:**
- API key goes in GitHub repository Settings → Secrets → GEMINI_API_KEY
- The review workflow extracts the PR diff and sends it with a review prompt

---

## Ticket 4: Database Connection & Models

**Labels:** backend
**Dependencies:** Ticket 1
**Size:** S

**Description:**
Create the database connection pool using asyncpg. Create Pydantic models for the Fact response. Verify the connection works by querying the facts table (should be empty). Add type hints to all functions.

**Acceptance Criteria:**
- [ ] Backend connects to PostgreSQL on startup (visible in `make logs`)
- [ ] Connection pool opens on startup, closes on shutdown (FastAPI lifespan)
- [ ] Pydantic model `FactResponse` defines: id (int), text (str), source (str), fetched_at (str)
- [ ] `make db` → `SELECT * FROM facts;` returns an empty table (not an error)
- [ ] All Python functions have type hints

---

## Ticket 5: Fact Fetcher Module

**Labels:** backend
**Dependencies:** Ticket 4
**Size:** S

**Description:**
Create a worker module that fetches a random fact from the external API (uselessfacts.jsph.pl), parses the JSON response, and returns a typed model. Handle timeouts and network errors gracefully.

**Acceptance Criteria:**
- [ ] Fetcher can retrieve a fact from the external API (visible in logs when triggered manually)
- [ ] Response is parsed into a typed model (text and source extracted)
- [ ] Network timeout (5 second limit) produces a logged warning, not a crash
- [ ] Invalid JSON response produces a logged warning, not a crash
- [ ] The fetcher function has a test that mocks the external API

---

## — Pause Point —

*The stack is running. You have: Docker containers, a database with a schema, a FastAPI backend with auto-docs, CI that runs on every PR, and an AI code reviewer. Run `make status`. See three green containers. Open `localhost:8000/docs`. Take a breath.*

---

## Phase B — "The System Proves Itself"

---

## Ticket 6: Background Worker

**Labels:** backend
**Dependencies:** Ticket 5
**Size:** M

**Description:**
Create a scheduled task that runs the fact fetcher every 5 minutes. On each run: fetch a fact, check for duplicates, insert into the database if new. Log each fetch (success, duplicate, or error).

**Acceptance Criteria:**
- [ ] Worker starts automatically when the backend container starts
- [ ] Facts appear in the database without anyone using the frontend (verify: wait 5-10 minutes, then `make db` → `SELECT COUNT(*) FROM facts;`)
- [ ] Duplicate facts are silently skipped (the text column has a unique constraint)
- [ ] Each fetch cycle is logged: "Fetched new fact", "Duplicate skipped", or "Fetch failed: [reason]"
- [ ] If the external API is down, the worker logs the error and retries next cycle — it does not crash

---

## Ticket 7: Random Fact API Endpoint

**Labels:** backend
**Dependencies:** Ticket 6
**Size:** S

**Description:**
Create `GET /api/facts/random` endpoint. Queries the database for a random fact using `ORDER BY RANDOM() LIMIT 1`. Returns the fact as JSON matching the Pydantic model. Returns 404 if no facts exist.

**Acceptance Criteria:**
- [ ] `GET /api/facts/random` returns 200 with a fact object (id, text, source, fetched_at)
- [ ] Refreshing the endpoint multiple times returns different facts (random selection)
- [ ] When the database is empty, returns 404 with `{"detail": "No facts available"}`
- [ ] Pytest tests exist for both 200 (with data) and 404 (empty database) cases
- [ ] The endpoint appears in the auto-generated docs at `/docs`

---

## Ticket 8: React Frontend Shell

**Labels:** frontend
**Dependencies:** Ticket 1
**Size:** M

**Description:**
Set up the React frontend with Vite and Tailwind. Create a FactCard component that displays a fact (text and source). Create a "Next Fact" button. For now, use a hardcoded fact to verify the UI — API connection comes in the next ticket.

**Acceptance Criteria:**
- [ ] Frontend loads at `http://localhost:5173` (or the Docker-mapped port)
- [ ] A fact card is visible with text and source attribution
- [ ] A "Next Fact" button is visible and styled
- [ ] The page title is "FactFeed"
- [ ] Layout is centred and readable on both mobile and desktop
- [ ] Tailwind CSS is working (utility classes render correctly)

---

## Ticket 9: Connect Frontend to Backend

**Labels:** frontend, backend
**Dependencies:** Ticket 7, Ticket 8
**Size:** M

**Description:**
Configure the Vite proxy to forward `/api` requests to the backend. Update FactCard to fetch from `/api/facts/random` on page load and on "Next Fact" click. Add loading, error, and empty states.

**Acceptance Criteria:**
- [ ] On page load, the frontend fetches and displays a real fact from the database
- [ ] Clicking "Next Fact" fetches and displays a different fact
- [ ] While fetching: a loading indicator is shown (spinner or "Loading...")
- [ ] If the API is unreachable: the error message "Unable to load facts. Please try again." is shown
- [ ] If no facts exist: the message "No facts available yet. Check back soon." is shown
- [ ] Open DevTools → Network tab: API requests to `/api/facts/random` are visible with 200 status
- [ ] The fact source is displayed with attribution below the fact text

---

## Ticket 10: Deploy

**Labels:** deploy
**Dependencies:** Ticket 9
**Size:** M

**Description:**
Deploy the complete application to a server. All services running in production: frontend, backend, database, background worker.

**Acceptance Criteria:**
- [ ] The app is accessible at a public URL
- [ ] A fact loads on the production site
- [ ] "Next Fact" works on the production site
- [ ] The worker is fetching facts in production (verify: check the fact count after 15 minutes)
- [ ] The health endpoint returns 200 on the production URL
- [ ] Environment variables are set in production (not hardcoded)

---

## Ticket 11: Deploy-on-Merge (Optional)

**Labels:** deploy
**Dependencies:** Ticket 10
**Size:** S

**Description:**
Create a GitHub Actions deployment workflow. When a PR is merged to `main`, the production server automatically updates.

**Acceptance Criteria:**
- [ ] Merging a PR to `main` triggers the deploy workflow
- [ ] The deploy workflow completes successfully
- [ ] A visible change (e.g., updated page title) appears on the production site within 5 minutes of merge
- [ ] Failed deploys do not take down the existing site (deploy failure is not downtime)
