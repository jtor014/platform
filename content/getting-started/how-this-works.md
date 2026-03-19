---
title: "How this works"
description: "You direct. AI builds. You verify. The AI-First Development Framework explained."
page_type: "content"
section: "getting-started"
next: "/getting-started/setup"
---
# How This Works

You're going to build real software — websites, apps, APIs, databases — by directing AI to do it. You'll learn to read, inspect, and challenge the code AI produces, without needing to write it yourself.

This isn't a trick. It's a methodology. The same one professional teams are adopting right now.

---

## The Roles

**You are the Director.** You decide what gets built, review the work, verify it's correct, and sign off on every change. Nothing ships without your approval.

**Claude Code is your AI Developer.** It writes the code, creates files, runs tests, opens pull requests. It's fast and capable, but it makes mistakes — hallucinating APIs that don't exist, adding features you didn't ask for, writing code that works for the simple case but fails at the edges. Your job is to catch those mistakes.

**Gemini is your AI Reviewer.** It independently reviews every pull request for security issues and best practices. It's a second pair of eyes that hasn't seen the code before — it catches things Claude missed in its own self-review.

---

## The Loop

Every project follows the same cycle. You'll do this dozens of times until it's muscle memory.

**1. Plan**
You give AI a client brief and a template. AI produces a Product Requirements Document (PRD). You review it: did it add features the client didn't ask for? Are the acceptance criteria specific enough to test? You approve or direct changes.

**2. Architect**
AI produces the technical design: database schema, API contracts, ticket backlog. You review: is it over-engineered? Are the tickets small enough? Are there dependencies the AI missed?

**3. Build (ticket by ticket)**
For each ticket:
- You say "Start Ticket N"
- Claude creates a branch, writes failing tests, implements the code, commits, opens a pull request
- Claude reviews its own work against the acceptance criteria
- Gemini independently reviews for security and best practices
- Claude reports back: CI status, both reviews, recommendation
- You verify: open the product, test it, check it against the design
- You decide: merge it, or direct Claude to fix something

**4. Deploy**
You direct Claude to deploy. The product goes live at a real URL. You verify it works in production, not just on your laptop.

**5. Reflect**
Sprint retro: what went well? What did AI get wrong? What acceptance criteria were missing? What would you do differently? Lessons get written into the project memory file so AI improves next time.

---

## What You Actually Do

You don't write code. But you're not passive. Here's what takes skill:

**Planning:** AI will produce a PRD that looks complete. Your job is to catch what it added that wasn't asked for (scope creep), what it described vaguely ("should be user-friendly"), and what it missed entirely (edge cases, error handling, what happens when things go wrong).

**Reviewing:** Every pull request gets two AI reviews. You read both. You decide whether the findings matter. Sometimes Gemini flags a real security issue. Sometimes it's a false positive. You develop judgment about which is which.

**Verifying:** You open the product and test it like a real user. Does the booking form reject a date in the past? Does the payment charge the right amount? Can a contractor see another contractor's data? You try to break it. If you can, the acceptance criteria weren't specific enough.

**Communicating:** You explain technical decisions to non-technical clients. "The dashboard shows $2,340 but Stripe shows $2,287 — here's why, and here's what we'll do about it." You directed the work. You understand what was built. You communicate it clearly.

---

## The Templates

Templates are structured prompts you give to AI. They constrain AI's output so it produces what you need, not what it assumes.

There are templates for every phase:
- **PRD template** — turns a client brief into a structured requirements document
- **Architecture template** — turns a PRD into a technical design with database schema, API contracts, and tickets
- **CLAUDE.md template** — creates the project memory file that keeps AI consistent across sessions
- **Sprint retro template** — structures the reflection that improves your next project

You start by using templates as-is. Over time, you adapt them for specific projects, extend them with new sections, and eventually create your own.

---

## Why This Works

AI is powerful but unreliable. It will confidently:
- Add features you didn't ask for
- Recommend libraries that don't exist
- Write code that works for the simple case and fails for every edge case
- Produce financial calculations that are close but not exact
- Implement security patterns that look right but have gaps

The Framework makes AI reliable by adding structure: templates constrain planning, acceptance criteria constrain implementation, dual review catches errors, and the Director verifies everything before it ships.

You're learning the skill that makes AI useful — not typing commands, but managing output quality. That skill works regardless of which AI model, which programming language, or which framework is popular next year.

---

## The Progression

Six projects, each repeating the same loop with one new capability:

| Project | The +1 |
|---|---|
| 1. The Static Site | "I can direct AI to build a website and deploy it to a real URL" |
| 2. The Dynamic App | "I can build an app with a database, API, Docker, and automated testing" |
| 3. The Interactive App | "I can build something people USE — and I planned it myself" |
| 4. The Integrated App | "I can integrate external services and catch when AI hallucinates the API" |
| 5. The Multi-User App | "I can build a system where different users see different things — and I can break my own permissions" |
| 6. The Live System | "I can keep a real system alive, recover it when it breaks, and hand it to someone else to run" |

The loop gets faster each time because you've done it before. The +1 is what stretches you. By Project 6, you've directed AI through a complete product lifecycle — from an empty directory to a production-grade system with monitoring, backups, and handover documentation.
