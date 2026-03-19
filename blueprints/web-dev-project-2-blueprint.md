# Web Dev Project 2: The Dynamic App — Blueprint

## The +1

"I can build an app with a database, an API, automated testing, and Docker — and it all just works."

This is the universal on-ramp. Every student does this project regardless of which arc they choose for Projects 3-5. It introduces the core technical stack that every subsequent project builds on: a backend API, a database, Docker containers, CI/CD, and automated testing.

The product is deliberately simple (a random facts app, a quote of the day, a daily tip feed) so the student's attention stays on the amazing new tools, not the domain. The "wow" moments are: Docker running containers on my laptop. An API returning data. Tests running automatically on every PR. A database that remembers things after I restart.

---

## The Client Brief

> "Build me a simple web app that shows a random interesting fact each time I visit. The facts should come from an external source and be stored in a database so the app works even if the external source is down. The app should have a 'Next Fact' button. It should be containerised, tested, and deployed."

This is a technical brief, not a client story — Project 2 is about the tools, not the business domain. The "client" is the student themselves. The brief exists to give the PRD a structure, not to simulate a real client relationship. Real client stories begin at Project 3.

---

## What's Provided

| Material | What It Is | Why It's Provided |
|---|---|---|
| **PRD** | Provided — but the student reads it more critically now, having seen one in Project 1 | Student should notice: the anti-scope section, the API contract, the database schema. They're starting to understand what each section does |
| **CLAUDE.md** | Provided — pre-filled for this project. Student reads it and notices more detail than Project 1's: engineering standards, Makefile commands, the merge rule, the PR workflow | This is the file the student will write themselves from Project 3 onwards |
| **BACKLOG.md** | Provided — but the student reviews the tickets. Are they the right size? Do the acceptance criteria make sense? | Building the skill of reviewing tickets before executing them |
| **Design** | Minimal — this project is functional, not beautiful. A simple wireframe, not a full Figma file | The design +1 doesn't happen until Project 3. Here the focus is on the technical stack |
| **Step-by-step guide** | Lighter than Project 1 — covers new concepts (Docker, database, API) but doesn't hand-hold the ticket cycle | The student already knows the PR loop from Project 1 |

### What the Student Notices in the Provided PRD (Compared to Project 1)

The student has now seen two PRDs. The guide directs them to compare:

- **Project 1 PRD had:** no backend, no database, no API. Just static files deployed to a host.
- **Project 2 PRD has:** a backend (FastAPI), a database (PostgreSQL), an API contract (GET /api/facts/random → JSON response), a background worker (fetches facts periodically), Docker Compose to run everything.
- **The anti-scope is different:** No user authentication, no likes/comments, no complex frontend state. The student recognises the pattern: anti-scope prevents AI from building features that aren't in the brief.
- **The API contract is new:** The PRD specifies exactly what the endpoint returns — the JSON shape, the fields, the error response. "This is how the frontend and backend agree on communication."

---

## The Tickets

## Phase A — "The Stack Appears" (Tickets 1-5)

The first half of Project 2. The student runs one command and an entire professional development environment appears: containers, a database, an API with auto-generated docs, and automated CI. The wow is the tooling.

### Ticket 1: Project Setup & Docker Compose

**What Claude does:** Creates the repo structure, CLAUDE.md, BACKLOG.md, .gitattributes, docker-compose.yml (backend + postgres services), backend Dockerfile, Makefile with standard commands, .env.example and .env, db/init.sql with the facts table schema.

**What the student does:**
- Directs Claude: "Start Ticket 1"
- The student has done project setup before (Project 1) — the repo/board/labels part is fast
- **THE +1 MOMENT:** Student runs `make up` and Docker pulls images, builds containers, and starts a database and a backend server. This is probably the first time the student sees Docker in action. "I typed one command and a database appeared."
- Runs `make status` — sees running containers
- Runs `make logs` — sees server output streaming in real time
- Opens `localhost:8000/docs` — FastAPI's auto-generated API documentation appears. "Wait, it generated documentation automatically?"

**What the student learns:**
- Docker Compose — multiple services running in isolated containers from one command
- Makefile — short commands that wrap complex Docker operations
- Environment variables — .env file for secrets, .env.example committed to Git with dummy values
- Database initialisation — init.sql creates the table when Postgres first starts
- FastAPI auto-docs — the API documents itself

**Directing focus:** The "wow" of Docker. The student runs one command and an entire development environment appears.

---

### Ticket 2: CI Pipeline

**What Claude does:** Creates .github/workflows/ci.yml — checks out code, sets up Python, runs linter (Ruff), runs tests (pytest). Creates a basic passing test for the health endpoint.

**What the student does:**
- Same ticket cycle as Project 1 (branch → PR → review → merge) but faster now
- After merge, the student opens the GitHub Actions tab and watches the CI pipeline run
- **THE +1 MOMENT:** "Every time I open a PR, tests run automatically. If they fail, I can't merge. That's why broken code can't get into production."

**What the student learns:**
- CI (Continuous Integration) — automated checks on every PR
- Linting — automated style checking
- The test runner — pytest runs tests and reports pass/fail
- Branch protection — CI must pass before merge is allowed

**Directing focus:** Understanding that CI is the safety net. From now on, every PR is automatically tested.

---

### Ticket 3: Gemini AI Reviewer

**What Claude does:** Creates .github/workflows/gemini-reviewer.yml — a custom workflow that extracts the PR diff, sends it to the Gemini API with a review prompt, and posts the response as a PR comment. Configures branch protection.

**What the student does:**
- Directs Claude through the ticket
- Stores the Gemini API key as a GitHub Secret (the step-by-step guide walks through this)
- On the next PR, the student sees two automated responses: CI results AND Gemini's code review
- **THE +1 MOMENT:** "An AI just reviewed the code that another AI wrote. And it found something the first AI missed."

**What the student learns:**
- Automated AI code review — independent verification by a different model
- GitHub Secrets — storing API keys securely
- Branch protection — CI must pass AND a review must exist before merge
- The dual review system — Claude self-reviews against acceptance criteria, Gemini independently checks for security and best practices

**Directing focus:** The dual review concept. Two independent checks. The student starts reading both reviews critically.

---

### Ticket 4: Database Connection

**What Claude does:** Adds asyncpg to dependencies. Creates a connection pool in the FastAPI app lifecycle. Verifies the facts table (from init.sql) is accessible. Creates a Pydantic model for the Fact response with type hints.

**What the student does:**
- Directs Claude through the ticket
- **Verifies the database connection:** Opens a database shell with `make db`, runs `SELECT * FROM facts;` — sees the empty table
- Reads the Director's Briefing: "I created a database connection pool that opens when the server starts and closes when it stops. The Pydantic model defines the exact shape of the API response."

**What the student learns:**
- Database connection — the backend talks to Postgres through a connection pool
- Pydantic models — defining the shape of data (what fields, what types)
- The database shell — `make db` opens psql, you can run SQL queries directly

**Directing focus:** Verifying the database. The student opens a shell and checks. This is hands-on verification, not trusting Claude's word.

---

### Ticket 5: Fact Fetcher (External API)

**What Claude does:** Creates a worker module that fetches a random fact from uselessfacts.jsph.pl via httpx, parses the JSON, returns a typed model. Handles timeouts and errors gracefully.

**What the student does:**
- Directs Claude through the ticket
- Reads the Director's Briefing — learns about HTTP clients, external APIs, error handling
- **Verifies:** Can manually trigger the fetcher and check the logs (`make logs`) to see it working. "It reached out to the internet, grabbed a fact, and logged it."

**What the student learns:**
- External APIs — the backend calls another service to get data
- HTTP clients — making requests from the server (not the browser)
- Error handling — what happens when the external service is slow or down

**Directing focus:** Understanding the data flow. The backend fetches from an external source, processes it, and stores it.

---

---

## Pause Point: The Stack Is Running

The student now has: a backend API with auto-generated docs, a PostgreSQL database with a schema, CI that runs on every PR, an AI code reviewer, and the ability to query the database directly. All running in Docker containers from a single `make up` command.

**Take a breath.** Run `make status`. See three green containers. Open `localhost:8000/docs` — the API documentation Claude generated. Open `make db` and run `SELECT * FROM facts;` — see the empty table waiting for data.

This is a working professional development stack. In Phase B, the student will watch it come alive.

---

## Phase B — "The System Proves Itself" (Tickets 6-11)

The second half of Project 2. The stack from Phase A starts doing real work: fetching data automatically, serving it through an API, displaying it in a frontend, and deploying to production. The wow is the system working end-to-end with no human intervention.

### Ticket 6: Background Worker

**What Claude does:** Creates a scheduled task that runs the fetcher every 5 minutes. Inserts fetched facts into the database. Handles duplicates gracefully.

**What the student does:**
- Directs Claude through the ticket
- **Verifies:** Waits a few minutes, then checks the database: `make db` → `SELECT COUNT(*) FROM facts;` → sees facts accumulating
- **THE +1 MOMENT:** "The system is doing things on its own. I didn't click anything. It's fetching facts automatically and storing them."

**What the student learns:**
- Background tasks — scheduled work that happens without user interaction
- Data accumulation — the database grows over time
- Duplicate handling — what happens when the same fact is fetched twice

**Directing focus:** Autonomous systems. The backend works without anyone using the frontend.

---

### Ticket 7: Random Fact API Endpoint

**What Claude does:** Creates GET /api/facts/random — queries Postgres with `ORDER BY RANDOM() LIMIT 1`, returns the Pydantic model. Returns 404 if the table is empty. Creates pytest tests for both 200 and 404 cases.

**What the student does:**
- Directs Claude through the ticket
- **Verifies the API directly:** Opens the browser to `localhost:8000/api/facts/random` — sees JSON. Refreshes — sees a different fact. "The API works."
- Opens DevTools Network tab — sees the request and response. Status 200. JSON body. This is the same tool they'll use when the frontend calls the API.
- **Verifies the tests:** `make test` — watches pytest run. Both tests pass.
- Reads the test names: `test_get_random_fact_returns_200` and `test_get_random_fact_returns_404_when_empty`. "The test names describe what they check. I can read this."

**What the student learns:**
- API endpoints — a URL that returns data (not a webpage)
- JSON — the format the frontend and backend use to communicate
- HTTP status codes — 200 means success, 404 means not found
- Reading test names — understanding what automated tests verify without reading the code

**Directing focus:** Verifying the API works by using it directly. The Network tab becomes a familiar tool.

---

### Ticket 8: React Frontend

**What Claude does:** Initialises a Vite + React app with Tailwind. Creates a FactCard component, a "Next Fact" button, and basic layout. Renders with a hardcoded fact to verify the UI works. Adds the frontend to Docker Compose.

**What the student does:**
- Directs Claude through the ticket
- **Verifies:** Opens the frontend in the browser. Sees a fact displayed with a "Next Fact" button. It's using hardcoded data — not connected to the API yet.
- Checks it looks reasonable on mobile (DevTools responsive mode)

**What the student learns:**
- Frontend frameworks — React renders the UI
- Components — FactCard is a reusable piece
- The frontend and backend are separate services in Docker Compose — they run independently

**Directing focus:** Understanding the separation. The frontend shows things. The backend provides data. They're not connected yet.

---

### Ticket 9: Connect Frontend to Backend

**What Claude does:** Configures Vite proxy to forward /api requests to the backend. FactCard fetches from /api/facts/random on load and on "Next Fact" click. Adds loading, error, and empty states.

**What the student does:**
- Directs Claude through the ticket
- **THE +1 MOMENT:** Opens the app. Sees a real fact from the database. Clicks "Next Fact" — a different fact appears. "The frontend called the API, which queried the database, which was filled by the background worker. The whole system is connected."
- Opens Network tab — watches the API request fly from the frontend to the backend. Sees the JSON response. "I can see the data moving."
- Tests the error state: stops the backend container (`make down` then restart only frontend). Does the frontend show an error message, not a blank screen?
- Tests the empty state: what if the database has no facts? (Clear the database with `make clean`, restart). Does it show a friendly message?

**What the student learns:**
- The full request flow: browser → frontend → API → database → response → browser
- Proxy — how the frontend reaches the backend without CORS issues
- The three states every screen needs: loading, error, empty (besides success)
- End-to-end verification — testing the whole system, not just individual parts

**Directing focus:** Seeing the full flow. The Network tab shows the student how all the pieces connect.

---

### Ticket 10: Deploy

**What Claude does:** Deploys the complete application to a server (simple deployment method — single EC2, Railway, or similar). The full stack: frontend, backend, database, worker — all running in production.

**What the student does:**
- Directs Claude to deploy
- Handles any deploy issues (same pattern as Project 1 — read error, direct fix)
- Opens the production URL. Clicks "Next Fact." It works. The worker is fetching facts in production. The database is persisting.
- **THE +1 MOMENT:** "A full-stack application. Database, API, background worker, frontend. Running on a real server. I directed AI to build all of it."

**What the student learns:**
- Production deployment — the app runs on someone else's server, not just your laptop
- Production vs development — .env differs, URLs differ, but the app is the same code
- The complete lifecycle: build locally → test → deploy → verify in production

**Directing focus:** The deploy-and-verify cycle. The student checks everything works in production, not just dev.

---

### Ticket 11 (Optional): Deploy-on-Merge

**What Claude does:** Creates .github/workflows/deploy.yml — when a PR is merged to main, the live server automatically updates.

**What the student does:**
- Makes a small visible change (update the page title)
- Opens a PR, reviews pass, merges
- Watches the deploy action run on GitHub
- Refreshes the production URL — the change is live
- **THE +1 MOMENT:** "I said 'merge it' and the production site updated automatically."

**What the student learns:**
- Deploy-on-merge — the CI/CD pipeline doesn't just test, it deploys
- The full loop: direct Claude → PR → review → merge → live in production

**Directing focus:** The complete Director's loop from merge to production.

---

## Key Directing Moments

### "I Typed `make up` and a Database Appeared" (Ticket 1)
The student's first experience with Docker. One command, multiple services running. This is the moment that hooks people — the tools feel powerful.

### "An AI Reviewed Another AI's Code" (Ticket 3)
The dual review system. Claude writes code and reviews it. Gemini independently reviews it. The student reads both. This is the quality gate that makes AI-directed development trustworthy.

### "The System Runs Without Me" (Ticket 6)
The background worker fetches facts automatically. The database fills up on its own. The student realises the system is autonomous — it doesn't need someone clicking buttons.

### "I Can See the Data Moving" (Ticket 9)
The Network tab shows the request from the frontend to the API. The student sees the JSON response. The full flow from browser to database and back is visible. This is the "how does the internet work" moment.

### "I Directed AI to Build All of This" (Ticket 10)
The production deploy. A full-stack application running on a real server. Database, API, worker, frontend. The student directed every piece. They never wrote a line of code.

---

## What Can Go Wrong

- Docker fails to start because Docker Desktop isn't running (or Docker isn't installed correctly on Linux) — step-by-step guide covers this
- The database container starts before init.sql runs — facts table doesn't exist. `make clean` and `make up` fixes it
- Claude uses a Python library that's not in requirements.txt — the container builds but the import fails. CI should catch this
- The external facts API is temporarily down — the worker fails but the app should still serve previously fetched facts. If it crashes instead, the error handling is inadequate
- Claude adds a complex frontend state management library (Redux) despite anti-scope — student catches during review
- The deploy fails because environment variables aren't set in production — student reads the error and directs Claude to fix
- Gemini's review flags something about database connection handling that the student doesn't understand — student asks Claude to explain in plain English

---

## Sprint Retro (End of Project 2)

More structured than Project 1's reflection, but not yet the full retro template:

- **The loop:** How did the ticket cycle feel this time? Faster than Project 1?
- **Docker:** Was the Docker experience smooth or frustrating? Any issues that should be documented?
- **The reviews:** Did the dual review system (Claude + Gemini) catch anything? Did the student read both reviews or just rubber-stamp them?
- **The PRD:** Comparing Project 1's PRD to Project 2's — what's different? What patterns are the same?
- **Verification:** How did the student verify the API? The database? The full flow? What tools were most useful?
- **What's next:** The student is about to write their first PRD in Project 3. Having read two PRDs now, do they feel ready?

---

## Technical Context (Discovered Along the Way)

- **Docker & containers:** Isolated environments that run consistently everywhere. `make up` starts everything
- **Docker Compose:** Multiple services (frontend, backend, database) orchestrated together
- **Makefile:** Short commands wrapping complex operations
- **FastAPI:** Python backend framework. Auto-generates API docs
- **PostgreSQL:** Relational database. Stores data persistently
- **SQL basics:** `SELECT * FROM facts` — querying the database directly
- **APIs & JSON:** How services communicate. Request/response cycle
- **HTTP status codes:** 200 = OK, 404 = not found, 500 = server error
- **Background workers:** Scheduled tasks that run without user interaction
- **Environment variables:** Keeping secrets out of code
- **Pydantic models:** Defining the shape of data
- **CI/CD:** Automated testing on every PR. Automated deploy on merge
- **The Network tab:** Watching API requests in DevTools — the most useful debugging tool at this stage

---

## What the Student Has After Project 2

- A live full-stack application (frontend + API + database + background worker)
- Experience with Docker, CI/CD, and automated AI code review
- The ability to verify APIs using the browser and Network tab
- The ability to verify database state using the database shell
- Understanding of the full request flow (browser → frontend → API → database → response)
- Two PRDs read and internalised — ready to produce their own in Project 3
- The ticket cycle is becoming automatic — 11 cycles completed across two projects
- A growing sense of "these tools are amazing and I can use them"

---

## Judgment Checkpoint: After Project 2

Before moving to Project 3, the student completes a lightweight self-assessment:

- **Architecture quiz:** A system diagram with a mistake (frontend calling the database directly instead of the API). Can you spot the error?
- **Evidence-based debugging:** An error message from a failing deploy. Write the prompt you'd give Claude — must include specific evidence, not just "it's broken."
- **Ticket sizing:** Three ticket descriptions. Which one is too large for a single PR? Why?
- **PRD comparison:** Look at the Project 1 and Project 2 PRDs side by side. List three things every PRD needs and one thing that was different between them.

These aren't graded. They confirm the student has enough judgment to start planning their own project.

---

## Bridge to Project 3: Preparing to Plan

Project 3 is where the student generates a PRD for the first time. This bridge prepares them:

**Step 1 — Annotate:** Re-read the Project 1 and Project 2 PRDs. For each section, write a one-sentence note: what does this section do? Why is it written this way? Pay special attention to anti-scope — why are those specific items excluded?

**Step 2 — Repair:** Receive a deliberately flawed AI-generated PRD for the Project 3 brief (provided as part of the Arc materials). Find and fix the flaws:
- Features the client didn't ask for (AI added them)
- Acceptance criteria that are vague ("should be user-friendly")
- Missing anti-scope section
- Architecture over-engineered for the brief
- A ticket that's actually three tickets

**Step 3 — Generate:** Now generate your own PRD from the client brief using the template. You've read two good ones, annotated them, and fixed a bad one. You know the shape.

**Next:** Project 3 — The Interactive App. Same loop. The +1: you planned it yourself, and people will actually use what you build.
