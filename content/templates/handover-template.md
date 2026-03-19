---
title: "Handover template"
description: "System documentation for another director"
page_type: "template"
section: "templates"
group: "operational"
---
# Handover Template

A handover document enables another director to maintain and operate the system without asking the original builder questions. Use this template at Project 6 as the final deliverable. The test: give this document to a classmate. Can they explain how the system works?

**Write for the next operator, not for yourself.** You already know where things live and what the tricky parts are. The person reading this doesn't. Explain things that feel obvious to you — they won't be obvious to someone seeing the system for the first time.

**Remove sections that don't apply.** This template covers a full-stack application with a database, API, and multiple services. If your project is simpler, omit the sections that aren't relevant. The handover doc should reflect the real architecture, not a generic full-stack shape.

---

## Instructions for AI

I need you to produce a handover document for this project. Write it for someone who has never seen the codebase. They need to understand: what the system does, how it's built, how to deploy it, how to fix it when it breaks, and where the important things live. Be specific — "the database password is in the .env file on the server at /home/app/.env" not "check the environment variables."

---

## 1. System Overview

### What It Does
[2-3 sentences: what the system does, who uses it, why it exists]

### Architecture Diagram
[Text-based diagram showing: frontend → backend → database, plus any external services]

```
User → Frontend (React) → Backend API (FastAPI) → Database (PostgreSQL)
                                ↓
                         Email Service (SendGrid)
                         Payment (Stripe)
```

### User Types
| User Type | What They Do | How They Access |
|---|---|---|
| [e.g., Customer] | [e.g., Browse products, place orders] | [e.g., Public website] |
| [e.g., Admin] | [e.g., Manage orders, update products] | [e.g., /admin with login] |

## 2. Infrastructure

### Where It Runs
- **Frontend:** [hosted where, URL]
- **Backend:** [hosted where, URL, IP if relevant]
- **Database:** [hosted where, connection details location]
- **Domain & DNS:** [registrar, nameservers]
- **SSL Certificate:** [provider, expiry date, renewal process]

### Environment Variables
Location: [e.g., `.env` on the server at `/home/app/.env`]

| Variable | Purpose | Where to Get a New One |
|---|---|---|
| DATABASE_URL | Database connection | [instructions] |
| STRIPE_SECRET_KEY | Payment processing | [Stripe dashboard URL] |
| GEMINI_API_KEY | AI code review | [Google AI Studio URL] |

### Cost
| Service | Monthly Cost | Billing Account |
|---|---|---|
| [e.g., Hosting] | [amount] | [where the bill goes] |
| [e.g., Domain] | [amount/year] | [registrar account] |

## 3. Codebase

### Repository
- **URL:** [GitHub repo URL]
- **Main branch:** `main` (protected — PRs only, CI must pass)
- **Key files:**
  - `CLAUDE.md` — AI project memory (start here)
  - `BACKLOG.md` — ticket history
  - `docker-compose.yml` — all services
  - `Makefile` — common commands

### How to Run Locally
```
git clone [repo URL]
cp .env.example .env  # Fill in credentials
make up               # Start all services
make status           # Verify everything is running
```
Open: `http://localhost:3000` (frontend), `http://localhost:8000/docs` (API docs)

### How to Run Tests
```
make test    # All tests
make lint    # Code quality checks
```

## 4. Database

### Schema
[List all tables with their purpose — 1 sentence each]

### Access
```
make db    # Opens psql shell connected to the database
```

### Backups
- **Schedule:** [e.g., Daily at 2am UTC]
- **Location:** [where backups are stored]
- **Retention:** [how long they're kept]
- **Restore procedure:** See Runbook: "Restore Database from Backup"

## 5. Deployment

### How to Deploy
[Step-by-step: merge PR → CI runs → deploy happens automatically / manually trigger deploy]

### How to Rollback
[Step-by-step: revert the merge commit / deploy previous version / reference the runbook]

### Monitoring
- **Uptime:** [monitoring service and URL]
- **Alerts:** [where alerts go — email, Slack]
- **Dashboard:** [URL if applicable]

## 6. Third-Party Services

For each external service:

### [Service Name]
- **Purpose:** [what it does for the system]
- **Account:** [who owns the account, how to access]
- **Documentation:** [URL]
- **What happens if it's down:** [impact on users, fallback behaviour]
- **API key location:** [where the key is stored]

## 7. Known Issues & Technical Debt

| Issue | Impact | Priority | Notes |
|---|---|---|---|
| [describe] | [who it affects] | Low/Medium/High | [context] |

## 8. Common Tasks

### Add a New [Entity]
[Step-by-step for the most common admin task]

### Handle a [Common Issue]
[Step-by-step or reference to runbook]

## 9. Emergency Contacts

| Situation | Who to Contact | How |
|---|---|---|
| Site is down | [name/role] | [contact method] |
| Payment issues | Stripe support | [URL] |
| Domain/DNS issues | [registrar] | [URL] |

---

## After AI Generates the Handover — Review Checklist

- [ ] Could someone unfamiliar with the project run it locally using only this document?
- [ ] All credentials locations are documented (not the credentials themselves — the locations)
- [ ] Every third-party service is listed with its purpose and account owner
- [ ] The deploy and rollback processes are step-by-step, not hand-wavy
- [ ] Known issues are documented honestly, not hidden
- [ ] Cost breakdown is complete and current
- [ ] Backup and restore procedures are documented (or linked to runbooks)
- [ ] The "Common Tasks" section covers what the next person will actually need to do
