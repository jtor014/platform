---
title: "Project 6: The live system"
description: "Monitoring, backups, security, and handover documentation"
page_type: "project-landing"
section: "web-dev"
estimate: "About 1 week"
prev: "/web-dev/checkpoints/after-project-5"
next: "/web-dev/checkpoints/after-project-6"
---
# Project 6: The Live System

"I can keep a real system alive, recover it when it breaks, and hand it to someone else to run."

## What this project is

Every previous project added user-facing features. Project 6 adds nothing visible to users. Instead, you make the system trustworthy — the kind of system a client can rely on without worrying about it.

"Production-grade" in this course means four things:
1. **Observable** — you know when something breaks before your users do
2. **Recoverable** — you can restore from a disaster in under an hour
3. **Secure** — personal data is protected and access is controlled
4. **Transferable** — someone else can understand, operate, and maintain it

This project applies to every arc. The specifics change (a booking system vs an online store vs a content site) but the operational needs are the same.

## The Client Brief

> "The system is working and people are relying on it. Last week it went down for a few hours and I didn't know until someone called me. That can't happen again. Also, someone asked what data we hold on them and I wasn't sure what to say. I need this thing to be solid — backups, security, the works. And if something goes wrong, I need to know before my users do. Oh, and if something happened to you — could someone else keep this running?"

## What "enough" looks like

You don't need to build enterprise infrastructure. A minimum viable Project 6 means:
- One uptime monitor that alerts you within 2 minutes of downtime
- One automated daily backup that you've personally restored and verified
- Security headers present and dependency vulnerabilities resolved
- A privacy notice and data audit
- Runbooks for the 3 most common incidents
- A handover doc that a classmate can read and understand

Everything beyond that improves the system but isn't required to complete the project.

---

## Templates Used

| Template | Relationship |
|---|---|
| PRD template | **Owns** — adapted for operational work. Scope is "make it reliable" not "add features." Anti-scope: no new user-facing features |
| Risk assessment template | **First use** — failure modes, likelihood, impact, mitigation |
| Runbook template | **First use** — step-by-step incident response procedures |
| Handover template | **First use** — complete system documentation for another director |
| Sprint retro template | **Final comprehensive retro** — the entire arc |

---

## The Tickets

### Infrastructure

1. **HTTPS & Reverse Proxy** — Nginx or Caddy in front of the app. SSL certificate. HTTP→HTTPS redirect. Verify the padlock icon appears in the browser.
   - *Acceptance criteria:* Accessing the site via HTTP automatically redirects to HTTPS. The browser shows a padlock icon. The SSL certificate is valid for at least 90 days.

2. **Staging Environment** — A separate environment for testing changes before they hit production. Same infrastructure, different URL, different database.
   - *Acceptance criteria:* Changes can be deployed to staging without affecting production. Staging has its own database with test data. The staging URL is not publicly discoverable.

### Monitoring & Alerting

3. **Uptime Monitoring** — External service (UptimeRobot, Better Uptime, or similar) pinging the health endpoint every 60 seconds. Alert to email/Slack on downtime.
   - *Acceptance criteria:* Stop the backend container. Alert fires within 2 minutes. Start it again. Recovery alert fires. No alert fires during a normal deploy.

4. **Application Monitoring** — Basic dashboard: request rates, error rates, response times. Accessible to admin.
   - *Acceptance criteria:* Dashboard shows data for the last 24 hours. A spike in error rates is visible within 5 minutes of occurring.

5. **Error Tracking** — Catch and categorise production errors. Not just "it crashed" but where, why, how often.
   - *Acceptance criteria:* A deliberate error (e.g., accessing a non-existent endpoint) appears in the error tracker with stack trace, timestamp, and request details.

### Backups & Recovery

6. **Automated Backups** — pg_dump script, scheduled daily, stored securely. Retention policy (keep 7 days).
   - *Acceptance criteria:* A backup file is created daily. Backup files are not accessible to the public. Files older than 7 days are deleted automatically.

7. **Backup Restore Test** — Restore from the latest backup into a fresh database. Verify data integrity.
   - *Acceptance criteria:* All data from the backup is present in the restored database. Record counts match. Key records verified by spot-checking (e.g., verify a specific booking/order/article exists with correct data). The restore procedure is documented in a runbook.

### Security

8. **Security Hardening** — Dependency scanning (check for known vulnerabilities). Security headers (CSP, HSTS, X-Frame-Options). Rate limiting on authentication endpoints. Document the secrets rotation procedure.
   - *Acceptance criteria:* Dependency scan reports zero critical or high vulnerabilities. Security headers are present (verify with securityheaders.com or DevTools). Rate limiting prevents more than 10 login attempts per minute from the same IP.

### Data Protection

9. **Data Protection Audit** — Document all personal data stored in the system. Add consent capture where missing. Build data export endpoint (user can request their data). Build data deletion/anonymisation endpoint (user can request removal).
   - *Acceptance criteria:* A document lists every table and column that contains personal data. Consent is captured at every point personal data is collected. The export endpoint returns all personal data for a given identifier. The deletion endpoint removes or anonymises personal data while preserving business records.

10. **Privacy Notice** — User-facing page explaining what data is collected, why, and how to request access or deletion.
    - *Acceptance criteria:* Privacy notice is accessible from the site footer. It's written in plain English (not legal jargon). It accurately reflects the data audit findings. It includes instructions for requesting access or deletion.

### Documentation

11. **Risk Assessment** — Using the risk assessment template: identify failure modes, assess likelihood and impact, document mitigations. Produce a plain-English summary for the client.
    - *Acceptance criteria:* At least 10 specific risks identified (not generic). Each has likelihood, impact, and mitigation. The client summary is understandable by a non-technical person. Top 3 risks are highlighted with recommended actions.

12. **Runbooks** — Step-by-step procedures for: deploy to production, rollback a bad deploy, restore database from backup, respond to downtime alert, rotate secrets.
    - *Acceptance criteria:* Each runbook has numbered steps with exact commands. Each step has expected output and failure handling. A person unfamiliar with the system can follow each runbook without asking questions.

13. **Handover Documentation** — Complete system documentation for another director. Architecture, deployment, monitoring, secrets locations, common tasks, known issues.
    - *Acceptance criteria:* Give the handover doc to a classmate or friend. They can explain what the system does, how to deploy a change, and how to respond to downtime — without asking you any questions.

### Cost

14. **Cost Assessment** — Document all infrastructure costs. Communicate to the client in plain English.
    - *Acceptance criteria:* Every paid service is listed with monthly cost. Total monthly cost is calculated. The client receives a clear summary: "Running the platform costs approximately $X per month."

---

## Key Directing Moments

### The Backup Verification
Directing Claude to set up backups is easy. The critical step: personally directing a restore and verifying data integrity. An untested backup is not a backup.

**What to ask Claude:** "Restore the latest backup into a fresh database. Show me the record counts and let me spot-check specific records."
**What to inspect personally:** Compare record counts. Look up a specific booking/order/article by ID — is the data intact? Check timestamps — are they the same?
**What usually goes wrong:** Claude sets up the backup script but doesn't test the restore path. Or the restore works but file permissions prevent the backup script from running on the schedule. Check `cron` logs.

### The Monitoring Calibration
Claude sets up monitoring. You verify by breaking things on purpose.

**What to ask Claude:** "Set up uptime monitoring. I want an alert within 2 minutes of downtime."
**What to inspect personally:** Stop the backend container. Time how long until the alert arrives. Start it again — does the recovery alert fire? Now do a normal deploy — does it trigger a false alert? Alert fatigue (constant false alarms) is worse than no alerting.
**What usually goes wrong:** The health endpoint returns 200 even when the database is down because it only checks "is the web server running." A good health check verifies the database connection.

### The Data Protection Audit
Someone asked "what data do you hold on me?" You need to be able to answer.

**What to ask Claude:** "Audit every table for personal data. List each column that contains PII and whether we have consent to hold it."
**What to inspect personally:** Read the audit. Is anything surprising? Does the system store data you didn't expect (e.g., IP addresses in logs, browser fingerprints)? Can a user actually request and receive their data? Can they request deletion? What happens to related records?
**What usually goes wrong:** Claude lists the obvious fields (name, email) but misses logs, analytics events, and session data. Push back: "What about request logs? Do they contain IP addresses or user agents?"

### The Handover Test
The ultimate verification: give the handover doc to someone who's never seen the system.

**What to ask Claude:** "Generate the handover documentation from the template. Include architecture, deployment, monitoring, secrets locations, common tasks, and known issues."
**What to inspect personally:** Give it to a classmate or friend. Ask them: "What does this system do? How would you deploy a change? What would you do if it went down at 2am?" If they can't answer from the document alone, the documentation has gaps.
**What usually goes wrong:** The handover doc describes the architecture but not the operations. It says "PostgreSQL database" but not "here's how to connect, here's where backups are stored, here's the restore command."

### The Cost Conversation
AI generates an infrastructure cost breakdown. You communicate it to the client.

**What to ask Claude:** "List every paid service, its monthly cost, and its purpose. Calculate the total."
**What to inspect personally:** Is anything missing? (Domain registration? Email service? Monitoring tool?) Is anything surprisingly expensive? Could anything be cheaper without losing reliability?
**What usually goes wrong:** Claude forgets about free tier limits. "Netlify free tier" is fine until you exceed 100GB bandwidth. "UptimeRobot free tier" only checks every 5 minutes, not every 60 seconds. Check the actual tier limits.

---

## Arc-Specific Additions

In addition to the universal tickets above, each arc has operational concerns unique to its domain. Add these as additional tickets.

### Arc A: Service Business
- **Contractor data audit:** Hours, photos, personal details — what can a contractor request to see or delete? What about photos they uploaded of job sites?
- **Job history integrity:** Restored jobs must have correct status history. A job that was "scheduled → in progress → done → invoiced" should show the full timeline after restore, not just the final status
- **Mobile access monitoring:** Contractors use the portal from job sites on phones. Monitor mobile response times separately

### Arc B: Online Store
- **Payment pipeline monitoring:** Alert if a Stripe webhook arrives but the order record isn't created within 60 seconds. This means money was taken but the order wasn't recorded — the worst failure mode
- **Financial reconciliation runbook:** Monthly comparison of your order records total vs Stripe dashboard total. Document the process, expected discrepancies (refunds, currency conversion), and who to contact if they don't match
- **PCI compliance documentation:** What card data does the system handle? (Answer: none, if you used Stripe Checkout redirect correctly.) Document this explicitly — it matters if the client is ever audited

### Arc C: Content Platform
- **Content moderation monitoring:** Alert if the pending moderation queue exceeds 10 items. A sudden spike usually means a coordinated abuse attack, not organic growth
- **Newsletter deliverability monitoring:** Track bounce rate and spam complaint rate. Alert if either exceeds 2% — email providers will start blocking you
- **Subscriber data in privacy audit:** The email list is personal data. Unsubscribed users' emails must be removed (not just marked inactive), or documented with a legal basis for retention

### Arc D: Event Platform
- **Event-day reliability:** The system must be stable during events. No deploys on event days. Add a "deploy freeze" runbook step
- **Pre-event checklist:** 24 hours before each event, verify: attendee cache is fresh, QR scanner works, offline mode works, check-in dashboard loads. Automate what you can, document the rest as a runbook
- **Timezone monitoring:** Alert if any event's displayed time doesn't match its stored UTC time + timezone offset. This catches daylight savings transition bugs before attendees see the wrong time

### Arc E: Community Directory
- **Review integrity monitoring:** Alert for patterns: 5+ reviews from the same IP in one hour, 3+ new accounts reviewing the same business in one day, duplicate review text across businesses
- **Search performance monitoring:** Alert if search response time exceeds 500ms. With 150+ businesses and full-text search, this is the most likely performance bottleneck
- **Image storage monitoring:** Track total storage and upload rate. Alert if a single business uploads more than 50MB (probable abuse or misuse)

---

## Final Sprint Retro (Full Arc)

This retro covers the entire journey from Project 3 to Project 6:

- **Workflow:** How did planning evolve? Is PRD review faster and sharper?
- **Architecture:** Is the codebase healthy? Consistent patterns? Technical debt?
- **Cost:** Total monthly infrastructure cost. AI subscription usage.
- **Tooling:** Did all tools work reliably throughout?
- **Key lessons:** What would you do differently starting over? What templates need improvement? What did you learn about directing AI that isn't in the Framework?

---

## What You Can Now Do

You can take a client brief and turn it into a live, tested, monitored, documented system — entirely by directing AI. Specifically:

- Plan a product from a brief (PRD, architecture, tickets)
- Build it ticket-by-ticket with AI, catching scope creep and hallucinations along the way
- Verify it works by testing like a real user and breaking your own access controls
- Deploy it to a live URL and keep it alive with monitoring and tested backups
- Protect user data and communicate privacy practices to the client
- Hand it to someone else with documentation they can actually follow
- Assess costs and risks in plain language

That's the Web Development category complete. The methodology transfers to any domain — data, ML, AI integration, cybersecurity, cloud infrastructure. The loop is the same. The +1 changes.
