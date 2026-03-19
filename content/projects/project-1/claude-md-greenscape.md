---
title: "CLAUDE.md"
description: "Project memory file for GreenScape"
page_type: "material"
section: "web-dev"
prev: "/web-dev/projects/1/design"
next: "/web-dev/checkpoints/after-project-1"
---
# CLAUDE.md

## Project Overview

GreenScape Landscaping business website. A static site showcasing services, testimonials, service area, and contact information. No backend, no database, no user accounts.

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS 3
- **Containerisation:** None (static site — no Docker needed)
- **CI/CD:** GitHub Actions (lint + build check)
- **AI Review:** Gemini (via GitHub Actions workflow)
- **Deployment:** Netlify (free tier)

## Repository Structure

```
greenscape/
├── public/
│   └── images/           # Optimised site images
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceArea.jsx
│   │   ├── Testimonials.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── content.js    # All text content in one place
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── gemini-review.yml
├── package.json
├── tailwind.config.js
├── vite.config.js
├── Makefile
├── CLAUDE.md
├── BACKLOG.md
└── .gitignore
```

## Anti-Scope

Do NOT implement, suggest, or add code for any of the following:

- No booking system or scheduling
- No contact form that submits data to a server (phone and email links only)
- No user accounts, login, or admin panel
- No CMS or content management
- No blog, news, or articles section
- No database or backend API
- No social media feed or embed
- No newsletter signup
- No live chat or chatbot
- No e-commerce, pricing calculator, or payment
- No image gallery or portfolio page
- No analytics tracking scripts

If you believe any of these should be added, raise it as a question rather than implementing it.

## Engineering Standards

### Git & Branching
- Branch naming: `feat/ticket-number-short-description`
- Conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`
- Every PR references its Issue: "Closes #N"
- No direct pushes to `main` — all changes via PR

### Code Quality
- ESLint + Prettier for linting and formatting
- Maximum PR size: 300 lines (excluding generated code)
- All components are functional React components
- All text content lives in `src/data/content.js`, not hardcoded in components

### PR Workflow
1. Create feature branch from `main`
2. Implement changes
3. Run `make lint` locally
4. Commit with conventional commit message
5. Push and open PR with "Closes #N"
6. Self-review: read the diff against acceptance criteria
7. Wait for CI and Gemini review
8. Report to Director: CI status, self-review findings, Gemini findings, recommendation

### Director's Briefing
After each ticket, provide:
- What was built and why
- Key decisions made
- What to verify (specific things the Director should check in the browser)
- Any concerns

## Makefile Commands

```
make dev       # Start development server (Vite)
make build     # Build for production
make lint      # Run ESLint + Prettier
make preview   # Preview production build locally
```

## Design Reference

The site design follows the provided Figma file. Key design tokens:
- Primary colour: #2D5016 (forest green)
- Secondary colour: #8B6914 (warm gold)
- Background: #FAFAF5 (warm white)
- Text: #1A1A1A (near black)
- Heading font: Inter (bold)
- Body font: Inter (regular)
- Body size: 16px, line-height 1.6
- Max content width: 1200px
- Section padding: 80px vertical, 24px horizontal
- Card border-radius: 8px

## Current State

- Last completed ticket: None — project starting
- Known issues: None
- Technical debt: None
