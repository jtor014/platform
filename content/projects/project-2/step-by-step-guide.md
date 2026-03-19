---
title: "Step-by-step guide"
description: "Project 2 walkthrough focusing on new concepts"
page_type: "guide"
section: "web-dev"
prev: "/web-dev/projects/2/backlog"
next: "/web-dev/projects/2/claude-md"
---
# Project 2: Step-by-Step Guide

You've done Project 1. You know the loop: branch → direct → PR → review → merge. This guide doesn't repeat that. Instead, it highlights what's new in Project 2 and what to verify at each stage.

## What's New in This Project

| Concept | What It Is | When You'll See It |
|---|---|---|
| Docker | Runs the whole app in isolated containers | Ticket 1 — `make up` |
| PostgreSQL | A real database that remembers data | Ticket 1 — `make db` |
| FastAPI | A Python backend that serves data | Ticket 1 — `localhost:8000/docs` |
| CI Pipeline | Automated testing on every PR | Ticket 2 |
| Gemini Review | A second AI reviews Claude's code | Ticket 3 |
| Background Worker | The system does things on its own | Ticket 6 |
| API ↔ Frontend | The frontend calls the backend for data | Ticket 9 |

## Before You Start

You need everything from Project 1, plus:
- **Docker Desktop** (Mac/Windows) or Docker Engine (Linux) — install from https://docker.com
- **A Gemini API key** — get one free at https://aistudio.google.com/apikey

Verify Docker is working:
```bash
docker --version    # Should show Docker version
docker compose version   # Should show Docker Compose version
```

---

## Phase A — "The Stack Appears"

### Ticket 1: The Docker Moment

Direct Claude to start Ticket 1 using the provided CLAUDE.md and BACKLOG.md (same process as Project 1).

**The new thing to verify:**
After Claude finishes, run:
```bash
make up
```

Watch the terminal. Docker pulls images, builds containers, starts services. This may take a few minutes the first time.

Then:
```bash
make status
```
You should see three containers running: backend, frontend, postgres.

**Open in your browser:** `http://localhost:8000/docs`
This is FastAPI's auto-generated API documentation. It appeared automatically. You didn't ask for it — it's built into FastAPI.

**Check the database:**
```bash
make db
```
This opens a PostgreSQL shell. Type:
```sql
\dt
```
You should see the `facts` table. Type `\q` to exit.

**What just happened:** You typed one command (`make up`) and a backend API, a database, and a frontend server all appeared. They're running in isolated containers on your laptop. This is Docker.

### Ticket 2: CI Pipeline

Same PR cycle as Project 1. After merging, check GitHub → Actions tab. You should see the CI workflow running (or already completed with a green checkmark).

**The new thing to verify:** Open any future PR. At the bottom, you'll see "Checks" — CI runs automatically. If tests fail, the PR shows a red X and can't be merged.

### Ticket 3: Gemini Review

After this ticket, every PR gets two reviews: Claude's self-review AND Gemini's independent review.

**The new thing to verify:** Open the next PR Claude creates. Wait 1-2 minutes. A comment from Gemini appears on the PR. Read it. It's reviewing code that another AI wrote. Did it find anything Claude missed?

**Store the API key:** Claude will guide you through adding the Gemini API key as a GitHub Secret (Settings → Secrets → GEMINI_API_KEY). The key lives in GitHub, never in the code.

### Tickets 4-5: Database & Fetcher

Standard ticket cycles. After Ticket 4, verify the database connection:
```bash
make logs
```
Look for a line like "Database connection pool created" or "Connected to PostgreSQL."

After Ticket 5, the fetcher module exists but isn't running automatically yet. That comes in Phase B.

### — Pause Point —

Run `make status`. Three green containers. Open `localhost:8000/docs` — the API docs Claude generated. Open `make db` and run `SELECT * FROM facts;` — see the empty table waiting for data.

**You now have a working professional development stack.** Backend API, database, CI, and AI code review — all from `make up`. Take a breath. Phase B brings it to life.

---

## Phase B — "The System Proves Itself"

### Ticket 6: The Worker

After merging this ticket, wait 5-10 minutes. Then:
```bash
make db
```
```sql
SELECT COUNT(*) FROM facts;
```

If the number is greater than 0, the worker is fetching facts automatically. Nobody clicked anything. The system is doing work on its own.

Check the logs to see it happening:
```bash
make logs
```
Look for lines like "Fetched new fact" or "Duplicate skipped."

**What just happened:** A background process reaches out to the internet every 5 minutes, grabs a fact, and stores it in the database. Without any human intervention.

### Ticket 7: The API

After merging, open your browser to: `http://localhost:8000/api/facts/random`

You should see JSON:
```json
{"id": 1, "text": "Some interesting fact...", "source": "uselessfacts.jsph.pl", "fetched_at": "2026-03-17T..."}
```

Refresh the page. A different fact appears. The API works.

**Open DevTools → Network tab.** Reload the page. You can see the HTTP request and the JSON response. This is how you'll verify APIs for the rest of your career as a Director.

### Tickets 8-9: Frontend & Connection

After Ticket 8, the frontend shows a hardcoded fact. After Ticket 9, it shows real facts from the database.

**The moment to watch for:** Open the app. See a real fact. Click "Next Fact." A different fact appears. Now open DevTools → Network tab. Click "Next Fact" again. Watch the request fly from the frontend to the API. See the JSON response come back. The fact updates.

**You can see the data moving.** Browser → frontend → API → database → response → browser. The entire system is connected.

**Test the error states:**
1. Stop the backend: `docker compose stop backend`. Refresh the frontend. Do you see the error message?
2. Start it again: `docker compose start backend`. Does the app recover?

### Ticket 10: Deploy

Same as Project 1 but more complex — the whole stack needs to deploy, not just static files. Claude will handle it, but deployment errors are more likely. Handle them the same way: read the error, paste it to Claude, direct the fix.

**Verify in production:** Open the live URL. Click "Next Fact." Check that the worker is running (come back in 15 minutes and verify the fact count has increased).

---

## After All Tickets

### Judgment Checkpoint

Before moving to Project 3, complete the judgment checkpoint exercises (provided separately):

1. **Architecture quiz:** A system diagram with a mistake. Can you spot it?
2. **Evidence-based debugging:** An error message. Write the prompt you'd give Claude.
3. **Ticket sizing:** Three ticket descriptions. Which one is too large?
4. **PRD comparison:** Compare the Project 1 and Project 2 PRDs side by side.

### Bridge to Project 3

Before starting your arc, complete the bridge exercises:

1. **Annotate:** Re-read the Project 1 and Project 2 PRDs. For each section, write a one-sentence note about what it does and why.
2. **Repair:** You'll receive a flawed PRD for your chosen arc. Find and fix the flaws.
3. **Generate:** Create your own PRD from a client brief using the PRD template.

---

## What You've Learned

By completing Project 2, you can:
- Run a multi-service application with Docker
- Verify API responses using the browser and Network tab
- Query a database directly to verify data
- Read and act on dual AI reviews (Claude + Gemini)
- Understand the full request flow: browser → frontend → API → database → response
- Handle background processes that run without user interaction
- Deploy a full-stack application

**Next: Choose your arc and start Project 3. You'll plan it yourself. You're ready.**
