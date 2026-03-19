---
title: "PRD template"
description: "Turn a client brief into structured requirements"
page_type: "template"
section: "templates"
group: "planning"
---
# PRD Template

Use this template by pasting it into conversational AI along with the client brief. Review every section of the output critically before approving.

---

## Instructions for AI

I need you to produce a Product Requirements Document (PRD) based on the client brief I'll provide. Follow this structure exactly. Do not add features, technologies, or scope items that aren't directly supported by the client brief. If something isn't mentioned in the brief, it's not in scope.

---

## 1. Executive Summary

Write 2-3 sentences describing what we're building and why. Use the client's language, not technical language.

## 2. Problem Statement

What problem does the client have right now? What are they doing today that isn't working? Use specific details from the brief.

## 3. Target Users

Who will use this product? List each user type with:
- Who they are (role, technical ability)
- What they need from the product
- How they'll access it (desktop, mobile, both)

## 4. Scope — What We're Building

List every feature we're building. For each feature:
- A plain-English description appropriate for the client's technical level. If the client is non-technical, describe the feature in terms of what they see and do — not what the system does internally. Write all user-facing descriptions as if the client will read them. If a section would confuse the client, it's too technical for the PRD
- Why the client needs it (traced to something in the brief)
- 2-3 testable acceptance criteria (specific, measurable — not "should be user-friendly")

**Rules for acceptance criteria:**
- Every criterion must be verifiable by using the product (not by reading the code)
- Avoid vague verbs: "supports," "handles," "manages," and "processes" are red flags unless you define exactly what they mean. "Handles invalid input" → "Submitting an empty name field shows error message 'Name is required' and does not create a record"
- Include the expected behaviour for at least one edge case per feature
- If the feature involves dates/times, specify timezone behaviour
- If the feature involves money, specify exact decimal handling
- If the feature involves user input, specify what happens with invalid input

## 5. Anti-Scope — What We're NOT Building

List every feature, technology, or capability that is explicitly out of scope. Be specific:
- Bad: "No complex features"
- Good: "No user accounts, no payment processing, no recurring bookings, no calendar sync, no SMS notifications"

**Rules for anti-scope:**
- If the AI would likely assume this feature should exist, list it here
- If the client didn't ask for it, it's anti-scope
- If it would be "nice to have," it's anti-scope
- Anti-scope is a shield — it prevents AI from adding things during implementation

## 6. User Stories

For each feature, write user stories in this format:
"As a [user type], I want to [action] so that [benefit]."

Each story must be testable. If you can't describe how to test it, rewrite it.

## 7. Success Metrics

How do we know the product is done and working? List 3-5 measurable criteria:
- Performance: page load time, response time
- Functionality: all acceptance criteria pass
- Design: matches the provided design spec (if applicable)
- Deployment: live at a real URL, accessible on mobile and desktop

## 8. Technical Constraints

List any constraints from the Framework:
- Tech stack (if predetermined)
- Deployment target
- Browser support requirements
- Accessibility requirements
- Performance budget

## 9. Open Questions

List anything in the brief that's ambiguous or needs clarification from the client before building. Don't assume — ask.

---

## After AI Generates the PRD — Review Checklist

Before approving the PRD, check:

- [ ] **Scope matches the brief:** Every feature traces to something the client said. Nothing was added.
- [ ] **Anti-scope is specific:** Lists concrete features, not vague categories.
- [ ] **Acceptance criteria are testable:** Every criterion can be verified by using the product.
- [ ] **Edge cases are covered:** At least one edge case per feature (invalid input, empty state, boundary condition).
- [ ] **No technical jargon in user-facing descriptions:** Would the client understand every feature description?
- [ ] **No assumed features:** AI didn't add login, analytics, notifications, or any feature the client didn't request.
- [ ] **Open questions are honest:** If something is unclear, it's listed rather than assumed.
