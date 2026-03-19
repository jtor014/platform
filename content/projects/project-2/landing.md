---
title: "Project 2: The dynamic app"
description: "Build an app with a database, API, Docker, and automated testing"
page_type: "project-landing"
section: "web-dev"
estimate: "About 1 week"
prerequisites: "Project 1 complete"
prev: "/web-dev/checkpoints/after-project-1"
next: "/web-dev/projects/2/prd"
---
# Project 2: The Dynamic App

"I can build an app with a database, API, Docker, and automated testing."

## What you'll build

FactFeed — a random facts application with a React frontend, FastAPI backend, PostgreSQL database, and a background worker that fetches facts from an external API. The full stack runs in Docker on your laptop and deploys to a live server.

The domain is deliberately low-stakes — random facts — so your attention goes entirely to the new technical stack, not the business logic. There's nothing to debate about requirements here. The complexity is all infrastructure.

## Why this project feels harder

Project 1 had one moving part: a static website. Project 2 has five: a React frontend, a Python API, a PostgreSQL database, a background worker, and Docker orchestrating all of them. The loop is the same — branch, direct, verify, merge — but now "verify" means checking database records, reading API responses in the Network tab, and watching container logs. You're learning to inspect systems, not just pages.

## Phase A — "The stack appears"

Docker, containers, the API, the database, the Makefile. You type `make up` and an entire development environment appears. Tickets 1-5.

## Phase B — "The system proves itself"

Tests, CI, Gemini review, the background worker, the full frontend-to-database flow, deployment. Tickets 6-11.

**Pause point between phases.** The stack is running. Take a breath. Phase B brings it to life.

## What you'll learn

- Direct Claude through a multi-service Docker Compose setup
- Read and verify database schema, API contracts, and test output
- Set up CI (GitHub Actions) and dual AI review (Claude + Gemini)
- Debug using evidence: Network tab, container logs, test output
- Deploy a full-stack application to a live server

## Prerequisites

- Completed Project 1
- Docker installed (from Web Dev setup)
- Gemini API key (from Web Dev setup)

## Estimated time

About 1 week. 8-11 tickets split across two phases.

## Materials

- [Product Requirements (PRD)](/web-dev/projects/2/prd) — what we're building, Phase A and Phase B scope
- [BACKLOG.md](/web-dev/projects/2/backlog) — Phase A and Phase B tickets with pause point between them
- [Step-by-step guide](/web-dev/projects/2/guide) — lighter than Project 1 (you know the loop now), focuses on what's new
- [CLAUDE.md](/web-dev/projects/2/claude-md) — the project memory file
- [CI Setup Guide](/web-dev/guides/ci-setup) — creating the GitHub Actions pipeline
- [Gemini Reviewer Guide](/web-dev/guides/gemini-setup) — setting up the independent AI reviewer
