---
title: "Sprint retro template"
description: "Structured reflection after each sprint"
page_type: "template"
section: "templates"
group: "operational"
---
# Sprint Retro Template

Run this retro at the end of each project (or every 3-4 tickets within a project). Paste this template into conversational AI and discuss each section. Write the findings into CLAUDE.md so they carry forward.

---

## Instructions for AI

I want to run a sprint retrospective for the work we just completed. Help me think through each area below. Be honest about what went well and what didn't. I'll provide context about the tickets we completed and any issues that came up.

---

## 1. Workflow

- How did the planning phase feel? Was the PRD review effective?
- How long did tickets take vs estimates? Are we estimating well?
- Did any tickets need to be split after starting? (Sign they were scoped too large)
- Were acceptance criteria specific enough, or did we discover gaps during testing?
- How was the PR review cycle? Did self-review and Gemini review catch real issues?
- Were there any tickets where the directing instructions were unclear and Claude went in the wrong direction?

**Write down:** One specific thing to do differently in the next sprint's planning.

## 2. Architecture & Code Quality

- Is the codebase consistent? (Same patterns, same error handling, same response format across all endpoints)
- Are there patterns that should be documented in CLAUDE.md but aren't?
- Any technical debt introduced? (Shortcuts we took that should be revisited)
- Is CLAUDE.md still accurate? Does it reflect the current state of the project?
- Is CLAUDE.md still concise enough for AI to use effectively, or has it grown too large?

**Write down:** Any patterns or rules to add to CLAUDE.md.

## 3. Cost & Resources

- What's the current infrastructure cost? (Hosting, database, email service, etc.)
- Are we within free tiers, or is billing starting?
- What AI subscription tier are we on? Did we hit rate limits?
- Are there any services we're paying for that we're not using?

**Write down:** Current monthly cost estimate.

## 4. Tooling & Dependencies

- Is the Gemini reviewer still working? Is the model string current?
- Are there any dependency warnings or deprecation notices?
- Is Docker running smoothly, or were there issues?
- Did any third-party service change their API since we last checked?

**Write down:** Any tooling issues to address before the next sprint.

## 5. Directing Skill Calibration

- What did the AI do well without much direction?
- What did the AI consistently get wrong, requiring correction?
- Were there any hallucinations (libraries, APIs, patterns that don't exist)?
- What acceptance criteria should we have written but didn't?
- What verification did we do that caught a real issue?
- What issue slipped through that better criteria would have caught?

**Write down:** Update CLAUDE.md's "AI tends to..." section with new observations.

## 6. Lessons Learned

Write 2-3 specific, actionable lessons. Not "we should plan better" but "AI-generated PRDs consistently add authentication when the brief doesn't mention it — always check anti-scope for auth features."

These lessons get added to CLAUDE.md so they carry into the next project.

---

## Template for CLAUDE.md Update

After the retro, add a section like this to CLAUDE.md:

```
## Retro Findings — [Date]

### What AI Does Well
- [specific observation]

### What AI Gets Wrong
- [specific observation with how to catch it]

### Rules Added
- [new rule based on a lesson learned]
```
