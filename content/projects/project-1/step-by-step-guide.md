---
title: "Step-by-step guide"
description: "Your first project walkthrough, ticket by ticket"
page_type: "guide"
section: "web-dev"
prev: "/web-dev/projects/1/backlog"
next: "/web-dev/projects/1/design"
---
# Project 1: Step-by-Step Guide

This guide walks you through your first project. By the end, you'll have a live website at a real URL that you directed AI to build.

## Before You Start

Complete the [Shared Setup](/getting-started/setup) and [Web Dev Setup](/web-dev/getting-started) first. You need all the tools from both guides installed and verified.

## What You've Been Given

Read these files before you start:

1. **`prd-greenscape.md`** — The Product Requirements Document. This describes what we're building. Read the whole thing. Pay special attention to:
   - The **Anti-Scope** section — these are things we are NOT building
   - The **Acceptance Criteria** under each feature — these are how we know it's correct

2. **`claude-md-greenscape.md`** — The AI's project memory file. This gets copied into the repo as CLAUDE.md. Read it to understand the tech stack and standards.

3. **`backlog-greenscape.md`** — All the tickets. This gets copied into the repo as BACKLOG.md.

4. **This guide** — follow it step by step for your first ticket. After that, you'll know the loop and can work through the remaining tickets independently.

---

## Setting Up

### Step 1: Open your terminal

On Mac: open Terminal (in Applications → Utilities)
On Windows: open Windows Terminal or PowerShell
On Linux: open your terminal emulator

### Step 2: Create a directory for your project

```bash
mkdir greenscape && cd greenscape
```

### Step 3: Start Claude Code

```bash
claude
```

Claude Code starts. You're now talking to your AI developer.

### Step 4: Direct Claude to set up the project

Type this to Claude:

```
I'm starting a new project. Here's the CLAUDE.md for the project:

[Paste the entire contents of claude-md-greenscape.md here]

And here's the BACKLOG.md:

[Paste the entire contents of backlog-greenscape.md here]

Please start Ticket 1: Project Setup.

Create a new GitHub repository called "greenscape", initialise it with the CLAUDE.md and BACKLOG.md files, create the GitHub labels (setup, frontend, deploy), create Issues for all tickets in the backlog, and create a Project board with columns: To Do, In Progress, Done. Add all Issues to the board.
```

### Step 5: Watch Claude work

Claude will:
- Create the GitHub repo
- Add CLAUDE.md and BACKLOG.md
- Create labels and Issues
- Create the Project board

**What to check:**
- Open GitHub in your browser. Navigate to your new repo
- Click the "Issues" tab — you should see 8 Issues (one per ticket)
- Click the "Projects" tab — you should see a board with all Issues in "To Do"

### Step 6: Open the project in VS Code

```
Open VS Code and open the greenscape folder. Look at the file tree on the left — you should see CLAUDE.md and BACKLOG.md.
```

**Congratulations — Ticket 1 is complete.** That's your first ticket cycle.

**What you just did:** You directed Claude to set up the project infrastructure — repo, issues, board. You verified the result by checking GitHub. You didn't write any code, but you now have a working project structure. The skill here was communication: giving Claude clear instructions and verifying the output against specific expectations.

---

## Your First Full Ticket Cycle (Ticket 2)

Now you'll do a complete cycle: branch → direct Claude → PR → review → merge.

### Step 1: Tell Claude to start the ticket

```
Start Ticket 2: Development Environment.

Create a branch, set up the React + Vite project with Tailwind CSS, create the Makefile, create the content data file, and when done open a PR.
```

### Step 2: Watch Claude work

Claude will:
- Create a branch (`feat/2-dev-environment`)
- Initialise the Vite + React project
- Install Tailwind CSS
- Create the Makefile
- Create `src/data/content.js` with placeholder content
- Commit everything
- Push the branch
- Open a PR with "Closes #2"

### Step 3: Verify it works

While Claude works (or after), open a new terminal tab and run:

```bash
cd greenscape
make dev
```

Open your browser to `http://localhost:5173`. You should see the page title "GreenScape Landscaping" in the browser tab.

**Check the acceptance criteria from the backlog:**
- [ ] `make dev` starts the server? ✓ or ✗
- [ ] Browser shows the page title? ✓ or ✗
- [ ] Tailwind is working? (Check if Claude used any Tailwind classes) ✓ or ✗
- [ ] `make lint` runs without errors? Try it: `make lint` ✓ or ✗

### Step 4: Read Claude's self-review

Claude will review its own PR against the acceptance criteria and report back. Read what it says. Does it match what you saw?

### Step 5: Check the Gemini review

If the Gemini reviewer is set up, look at the PR on GitHub. Gemini will have posted a comment with its review. Read it.

- Did Gemini find any issues?
- Do you understand what Gemini is saying?
- If you don't understand something, ask Claude: "Gemini said [paste the comment]. What does that mean? Should I be concerned?"

### Step 6: Decide to merge

If everything passes:

```
Everything looks good. Merge it.
```

Claude merges the PR. The Issue moves to "Done" on the board.

**That's one complete ticket cycle.** You'll do this for every ticket:

1. Tell Claude to start the ticket
2. Claude branches, implements, commits, opens PR, self-reviews
3. You verify against acceptance criteria (use the product, not just trust Claude)
4. Read the Gemini review
5. Decide: merge, or direct Claude to fix something first
6. Claude merges

---

## Continuing Through the Tickets

Work through Tickets 3-7 using the same cycle. Here's what to focus on for each:

### Ticket 3: Site Layout & Navigation
**Your verification focus:** Open the site in the browser. Does the header look right? Open DevTools (F12 or right-click → Inspect). Check: is the font what the design specifies? Is the colour correct? On mobile (DevTools → toggle device toolbar), does the navigation become a hamburger menu?

### Ticket 4: Hero & Services
**Your verification focus:** Count the service cards. Are there exactly 6? Open DevTools → responsive mode. Switch between phone, tablet, desktop. Does the grid change: 1 column → 2 columns → 3 columns?

### Ticket 5: Testimonials & About
**Your verification focus:** Are there exactly 4 testimonials? Are quotes in quotation marks? Are star ratings visual, not text? Is the About section text readable — not too wide on desktop?

### Ticket 6: Service Area & Contact
**Your verification focus:** Are all 10 suburbs listed? **Critical anti-scope check:** did Claude add a contact form? The PRD says no forms — only phone and email links. If there's a form, tell Claude: "The PRD anti-scope says no contact form. Remove it and keep only the tel: and mailto: links." Test the phone link on your phone — does it open the dialer?

### Ticket 7: SEO & Meta Tags
**Your verification focus:** This is invisible — you can't see it by looking at the page. You need to:
1. Right-click anywhere on the page → "View Page Source"
2. Search (Ctrl+F) for `<meta name="description"` — is there a unique description?
3. Search for `og:title` — are Open Graph tags present?
4. Open DevTools → Lighthouse tab → run an audit → check the SEO score (aim for 90+)

### Ticket 8: Deploy
**Your verification focus:** Open the live URL on your phone. Does everything work? Test the phone link. Check that images load. Run Lighthouse on the live URL (not localhost).

---

## After You Finish All Tickets

### Reflect (Not a Formal Retro Yet)

Ask yourself:
- Did the design match what I expected? Did I catch any discrepancies?
- Did Claude add anything not in the PRD? Did I catch it?
- How did the first deploy go? Did something go wrong?
- What was confusing? What felt natural?

### Show Someone

Open the live URL on your phone. Show it to a friend, a classmate, or a family member. Say: "I directed AI to build this." That feeling is the point of Project 1.

### Judgment Checkpoint

Before moving to Project 2, complete the judgment checkpoint exercises (provided separately). They confirm you can spot problems, not just follow instructions.

---

## Common Issues

### "make dev doesn't work"
- Is Node.js installed? Run `node --version` — you need v20+
- Are dependencies installed? Run `npm install` first
- Is the terminal in the right directory? Run `pwd` — you should be in the greenscape folder

### "Claude can't create the GitHub repo"
- Is GitHub CLI installed? Run `gh auth status`
- Are you logged in? Run `gh auth login`

### "The site looks different from the design"
- That's normal — it's your job to catch the differences
- Use DevTools to compare specific values (font size, colours, spacing)
- Direct Claude to fix specific discrepancies: "The heading font size is 18px but should be 24px per the design"

### "Claude added something not in the PRD"
- This is expected and educational. AI does this constantly
- Direct Claude to remove it: "The PRD anti-scope says no [feature]. Remove it."
- This is the most important skill you're learning

### "I don't understand what Claude built"
- Read the Director's Briefing Claude provides after each ticket
- If you still don't understand, ask: "Explain what you built in Ticket N in plain English"
- You don't need to understand every line of code — you need to understand what was built and how to verify it

### "The deploy failed"
- Read the error message. Copy it
- Paste it to Claude: "The deploy failed with this error: [paste]. Fix it."
- This is directing. You don't fix it — you communicate the error and direct the fix

---

## What You've Learned

By completing Project 1, you can:
- Set up a project using the AI-First Development Framework
- Direct Claude through a ticket cycle (branch → implement → PR → review → merge)
- Verify AI output against a design specification using DevTools
- Catch anti-scope violations (AI adding things you didn't ask for)
- Read and act on AI code reviews
- Deploy a site to a live URL
- Handle deploy failures by communicating errors

**Next: Project 2 — The Dynamic App.** Same loop, but now with a database, an API, Docker, and automated testing. The loop is the same. The +1 will blow your mind.
