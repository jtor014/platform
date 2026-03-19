---
title: "Runbook template"
description: "Step-by-step incident response"
page_type: "template"
section: "templates"
group: "operational"
---
# Runbook Template

A runbook contains step-by-step procedures for operational tasks. Someone unfamiliar with the system should be able to follow a runbook without asking questions. Use this template at Project 6 to document critical procedures.

**Good step vs bad step:**
- Bad: "Restart the backend service"
- Good: "Run `docker compose restart backend`. Expected: terminal shows 'backend-1 | Started'. If it shows 'Error: port already in use', run `docker compose down` first, then `docker compose up -d`."

The difference: the good step has an exact command, an expected result, and a failure path. Every step in every runbook should follow this pattern.

---

## Instructions for AI

I need you to produce runbooks for the operational procedures listed below. Each runbook must be written for someone who has never seen this system before. Every step must be specific — "run this command" not "restart the service." Include what success looks like after each step and what to do if a step fails.

---

## Runbook: [Procedure Name]

### When to Use This
[Describe the situation that triggers this procedure — e.g., "The monitoring alert 'Backend Down' has fired" or "The client requests a database restore"]

### Prerequisites
- Access to: [list required access — server SSH, GitHub, cloud console, etc.]
- Tools needed: [list tools — Docker, psql, SSH client, etc.]
- Estimated time: [how long this procedure takes]

### Steps

**Step 1: [Action]**
```
[exact command to run]
```
Expected result: [what you should see]
If this fails: [what to do instead]

**Step 2: [Action]**
```
[exact command to run]
```
Expected result: [what you should see]
If this fails: [what to do instead]

[Continue for all steps...]

### Verification
After completing all steps, verify the procedure worked:
- [ ] [specific check — e.g., "Open the site in a browser. The homepage loads within 3 seconds."]
- [ ] [specific check — e.g., "Query the database: SELECT COUNT(*) FROM bookings; — count matches the pre-restore count."]
- [ ] [specific check — e.g., "The monitoring dashboard shows the service as 'UP'."]

### Rollback Criteria
If the procedure makes things worse, define when to stop and revert:
- [e.g., "If the site is still down after Step 3, rollback: run `docker compose down && docker compose up -d` to restore the previous state"]
- [e.g., "If the restored database has fewer records than expected, do NOT switch production to it — investigate first"]

### Escalation
If the procedure doesn't resolve the issue within [time limit]:
- [e.g., "If the site is still down after 15 minutes, escalate to [person/channel]"]
- [e.g., "If data loss is confirmed, notify the client immediately with what is known"]

### Post-Procedure
- [ ] Notify: [who should be told this procedure was run — e.g., the client, the team]
- [ ] Document: [record what happened — when, why, what was done, outcome]

---

## Suggested Runbooks for Every Project

1. **Deploy to production** — how to deploy a new version
2. **Rollback a bad deploy** — how to revert to the previous version
3. **Restore database from backup** — step-by-step restore and verify
4. **Respond to downtime alert** — what to check, how to restart, when to escalate
5. **Rotate secrets** — how to change API keys, database passwords, etc.
6. **Add a new user/role** — how to create admin or staff accounts

---

## After AI Generates the Runbook — Review Checklist

- [ ] Could someone unfamiliar with the system follow every step without asking questions?
- [ ] Every step has an exact command, not a vague instruction
- [ ] Every step has an expected result so the person knows it worked
- [ ] Every step has a failure path (what to do if it doesn't work)
- [ ] The verification section confirms the procedure actually fixed the problem
- [ ] Credentials and access requirements are listed upfront (not discovered mid-procedure)
