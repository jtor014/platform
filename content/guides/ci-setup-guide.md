---
title: "CI pipeline setup"
description: "Creating the GitHub Actions CI pipeline for automated build checks"
page_type: "guide"
section: "web-dev"
---
# Guide: Setting Up the CI Pipeline

This guide walks you through creating a GitHub Actions CI pipeline that runs automatically on every pull request. After this, broken code can't be merged — the tests must pass first.

You'll set this up in Project 2, Ticket 2. This guide gives you the details that Claude will implement.

---

## What CI Does

CI stands for Continuous Integration. Every time you (or Claude) open a pull request:

1. GitHub spins up a temporary server
2. It checks out the code from the PR
3. It runs the linter (code quality checks)
4. It runs the tests
5. It reports back: green checkmark (all passed) or red X (something failed)

If anything fails, the PR can't be merged. That's the safety net.

---

## The Workflow File

Claude will create this file at `.github/workflows/ci.yml`. Here's what it looks like and what each part does:

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run linter
        run: |
          cd backend
          ruff check .
      
      - name: Run tests
        env:
          DATABASE_URL: postgresql://testuser:testpass@localhost:5432/testdb
        run: |
          cd backend
          pytest -v
```

**What each section means:**

- `on: pull_request` — triggers when a PR is opened against main
- `services: postgres` — spins up a test database (separate from your dev database)
- `steps` — the sequence of things to do: checkout code, install Python, install dependencies, run linter, run tests
- `env: DATABASE_URL` — tells the tests where to find the test database

---

## Branch Protection

After CI is working, you'll set up branch protection so merging requires CI to pass.

**Steps (Claude will guide you, but here's what's happening):**

1. Go to your GitHub repo → Settings → Branches
2. Under "Branch protection rules," click "Add rule"
3. Branch name pattern: `main`
4. Check: "Require status checks to pass before merging"
5. Search for and select: "test" (the job name from the CI workflow)
6. Check: "Require branches to be up to date before merging"
7. Save

Now: no one (not even you) can push directly to `main`. Every change must go through a PR, and CI must pass.

---

## How to Read CI Results

On any PR page in GitHub, scroll to the bottom. You'll see the "Checks" section:

- ✅ **Green checkmark** — all checks passed. Safe to merge.
- ❌ **Red X** — something failed. Click the X to see which step failed and what the error message is.
- 🟡 **Yellow circle** — still running. Wait for it to finish.

**If CI fails:**
1. Click the red X to see the error
2. Read the error message — it usually tells you exactly what's wrong
3. Tell Claude: "CI failed with this error: [paste the error]. Fix it."
4. Claude pushes a fix. CI runs again.

This is normal. CI catches problems before they reach production. A failing CI is doing its job.

---

## Verify It's Working

After Ticket 2 is merged:

1. Create any small change (Claude can update a comment in the code)
2. Open a PR
3. Go to the PR page on GitHub
4. Within 1-2 minutes, you should see the CI workflow running
5. When it finishes, you should see a green checkmark or red X

If you don't see any checks running, the workflow file might not be in the right location or might have a syntax error. Check that `.github/workflows/ci.yml` exists in the repo.
