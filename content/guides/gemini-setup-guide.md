---
title: "Gemini reviewer setup"
description: "Adding independent AI code review to your project"
page_type: "guide"
section: "web-dev"
---
# Guide: Setting Up the Gemini AI Reviewer

This guide walks you through adding an independent AI code reviewer to your project. After this, every pull request gets reviewed by two AIs: Claude (who wrote the code and reviews its own work) and Gemini (who reviews independently, seeing the code for the first time).

You'll set this up in Project 2, Ticket 3. This guide gives you the details.

---

## Why Two Reviewers?

Claude wrote the code. When Claude reviews its own code, it has blind spots — it knows what it intended, so it may not see where the implementation doesn't match the acceptance criteria. Gemini sees the code fresh. It catches things Claude missed: security issues, error handling gaps, patterns that could cause problems.

Neither reviewer is perfect. You read both reviews and decide what matters.

---

## Step 1: Get a Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Sign in with a Google account
3. Click "Create API Key"
4. Copy the key — it looks like `AIzaSy...` (about 40 characters)
5. Save it somewhere safe (you'll add it to GitHub in the next step)

The free tier is sufficient for this course. It allows enough requests per minute for PR reviews.

---

## Step 2: Add the Key to GitHub Secrets

Your API key must never appear in code. It goes in GitHub Secrets — encrypted, only accessible by GitHub Actions.

1. Go to your GitHub repo
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GEMINI_API_KEY`
5. Value: paste your API key
6. Click **Add secret**

The secret is now stored. Your workflow can use it as `${{ secrets.GEMINI_API_KEY }}`, but it never appears in logs or code.

---

## Step 3: The Workflow File

Claude will create this file at `.github/workflows/gemini-review.yml`. Here's what it does and what each part means:

```yaml
name: Gemini Code Review

on:
  pull_request:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get PR diff
        id: diff
        run: |
          DIFF=$(git diff origin/main...HEAD)
          echo "diff<<EOF" >> $GITHUB_OUTPUT
          echo "$DIFF" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Review with Gemini
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          PR_DIFF: ${{ steps.diff.outputs.diff }}
        run: |
          REVIEW=$(curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}" \
            -H 'Content-Type: application/json' \
            -d "{
              \"contents\": [{
                \"parts\": [{
                  \"text\": \"You are a senior code reviewer. Review this pull request diff for: security vulnerabilities, error handling gaps, potential bugs, performance issues, and best practice violations. Be specific — reference exact lines and explain why each finding matters. If the code looks good, say what's good about it specifically.\n\nDiff:\n${PR_DIFF}\"
                }]
              }]
            }" | jq -r '.candidates[0].content.parts[0].text')

          echo "$REVIEW"
          echo "review<<EOF" >> $GITHUB_OUTPUT
          echo "$REVIEW" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT
        id: review

      - name: Post review comment
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## 🤖 Gemini Code Review\n\n${{ steps.review.outputs.review }}`
            });
```

**What each section means:**

- `on: pull_request` — runs when a PR is opened against main
- `permissions: pull-requests: write` — allows the workflow to post comments on the PR
- `Get PR diff` — extracts the code changes (what's different between the PR branch and main)
- `Review with Gemini` — sends the diff to the Gemini API with a review prompt
- `Post review comment` — posts Gemini's review as a comment on the PR

---

## Step 4: Update Branch Protection

After both CI and Gemini review are working, update branch protection:

1. Go to repo → Settings → Branches → Edit the `main` rule
2. Under "Require status checks," add both: `test` (CI) and `review` (Gemini)
3. Save

Now merging requires: CI passes AND Gemini has reviewed.

---

## How to Read Gemini's Review

On any PR, after 1-2 minutes, a comment appears from "github-actions" with the heading "🤖 Gemini Code Review."

**Gemini might flag:**
- Security issues: "This endpoint doesn't validate the input, which could allow SQL injection"
- Error handling: "The API call doesn't handle the timeout case — if the external service is slow, this will hang"
- Best practices: "This query could be optimised with an index on the `created_at` column"
- Positive feedback: "Good use of parameterised queries — this prevents SQL injection"

**How to respond:**
- **Real issue:** Tell Claude to fix it. "Gemini flagged that the input isn't validated. Add validation."
- **Valid but not worth fixing now:** Note it in the retro. "Gemini suggested adding an index. Not needed at our scale but good to know."
- **False positive:** Ignore it. Gemini isn't always right. If you're unsure, ask Claude: "Gemini said [paste]. Is this a real concern?"

Over time, you'll develop judgment about which Gemini findings matter and which don't. That judgment is one of the directing skills you're building.

---

## Troubleshooting

### "The workflow ran but no comment appeared"
- Check the Actions tab — did the workflow succeed or fail?
- If it failed on the "Review with Gemini" step, the API key might be wrong or the free tier might be rate-limited
- If it failed on "Post review comment," the workflow might not have write permissions — check the `permissions` section

### "The review says 'unable to process' or returns an error"
- The diff might be too large for the Gemini API. Very large PRs (500+ lines) may exceed the context limit
- Solution: keep PRs under 300 lines (which the Framework already requires)

### "The review isn't substantive — just says 'looks good'"
- The review prompt may need tuning. The prompt in the workflow asks for specific findings — if Gemini is being vague, the diff may genuinely be clean
- Over time, Claude will get better at writing code that passes Gemini review with fewer findings. That's the system working.

### "I don't have a GEMINI_API_KEY secret"
- Go back to Step 2. The key must be added as a repository secret, not an environment variable or a file in the repo.

---

## Verify It's Working

After Ticket 3 is merged:

1. Open the next PR (Ticket 4 or later)
2. Wait 1-2 minutes
3. Check the PR comments — you should see a "🤖 Gemini Code Review" comment
4. Read the review — it should mention specific code, not just generic advice

If you see the comment with substantive feedback, the reviewer is working. Every PR from now on gets dual review automatically.
