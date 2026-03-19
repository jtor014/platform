---
title: "Checkpoint: After Project 6"
description: "Self-assessment exercises after completing Project 6"
page_type: "checkpoint"
section: "web-dev"
prev: "/web-dev/projects/6"
next: "/"
---
# Judgment Checkpoint: After Project 6

You've made a system production-grade: monitoring, backups, security, documentation, handover. These exercises test your operational judgment — can you assess risk, evaluate documentation, and make cost decisions?

---

## Exercise 1: Risk Assessment Review

Below is an AI-generated risk assessment for a small booking system. **What's missing or underestimated?**

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Server goes down | Low | High | Uptime monitoring with 60-second checks |
| Database corruption | Very Low | Critical | Daily automated backups |
| DDoS attack | Very Low | High | Cloudflare free tier |
| SSL certificate expires | Low | Medium | Auto-renewal configured |
| Dependency vulnerability | Medium | Medium | Monthly dependency scan |

<details>
<summary>Check your answer</summary>

**Missing risks:**

1. **Backup fails silently.** The mitigation says "daily automated backups" but doesn't mention testing the restore. A backup that runs daily but produces empty or corrupt files is useless. Add: "Monthly restore test to verify backup integrity."

2. **Deployment breaks the live site.** Not listed at all. Every deploy is a risk. Mitigation: staging environment + rollback procedure documented in a runbook.

3. **Third-party service changes.** If the booking system uses an email service or payment API, those can change without notice. Mitigation: pin API versions, monitor for deprecation notices.

4. **The only person who understands the system is unavailable.** The "bus factor" risk. Mitigation: handover documentation that someone else can follow.

5. **Cost surprise.** Free tiers have limits. If traffic grows, you may suddenly hit a paid tier. Mitigation: document free tier limits and set billing alerts.

**Underestimated:**

- "Dependency vulnerability" is rated Medium likelihood / Medium impact. For a web application with 50+ npm packages, the likelihood of at least one vulnerability in any given month is HIGH, not medium. Impact depends on the vulnerability, but some are critical (e.g., prototype pollution, RCE).

- "Database corruption" mitigation is backups, but there's no mention of tested restores. The mitigation is incomplete.
</details>

---

## Exercise 2: Runbook Quality

Below is a runbook for "Restore Database from Backup." **Would someone unfamiliar with the system be able to follow it? Identify every gap.**

> **Runbook: Restore Database from Backup**
>
> 1. SSH into the server
> 2. Stop the application
> 3. Find the latest backup file
> 4. Restore the backup
> 5. Restart the application
> 6. Verify the data is correct

<details>
<summary>Check your answer</summary>

**This runbook is useless.** Every step is vague. An unfamiliar person would fail at Step 1.

**Gaps:**

1. "SSH into the server" — what's the server address? What user? What SSH key? Where's the key stored?
2. "Stop the application" — what command? `make down`? `docker compose down`? `systemctl stop`? What if it doesn't stop?
3. "Find the latest backup file" — where are backups stored? What directory? What's the naming convention? How do you identify "latest"?
4. "Restore the backup" — what command? `pg_restore`? `psql < backup.sql`? What are the database credentials? What happens to the existing data — is it overwritten or merged?
5. "Restart the application" — same problem as Step 2. What command? How do you verify it started?
6. "Verify the data is correct" — HOW? What queries to run? What counts to check? What records to spot-check?

**A proper version of Step 1 would be:**
```
Step 1: SSH into the production server
  Command: ssh deploy@203.0.113.45 -i ~/.ssh/buildwith_prod
  Expected: You see the terminal prompt "deploy@prod:~$"
  If this fails: Check that your SSH key is at ~/.ssh/buildwith_prod
  and that your IP is whitelisted in the security group (contact admin)
```

Every step needs: exact command, expected output, failure handling.
</details>

---

## Exercise 3: Cost Review

Below is an infrastructure cost breakdown for a small web application. **What's missing? What seems wrong?**

| Service | Monthly Cost |
|---|---|
| Railway hosting (backend) | $5.00 |
| Railway hosting (frontend) | $5.00 |
| Railway PostgreSQL | $5.00 |
| Netlify (CDN) | $0.00 (free tier) |
| UptimeRobot (monitoring) | $0.00 (free tier) |
| **Total** | **$15.00/month** |

<details>
<summary>Check your answer</summary>

**Missing costs:**

1. **Domain name.** Not listed. Typically $10-15/year ($1/month). If the app uses a custom domain, this is a real cost.

2. **Email service.** If the app sends confirmation emails (most do), there's either a cost (SendGrid, Mailgun) or a free tier with limits. Not listed.

3. **SSL certificate.** If not using a service that includes it (Railway and Netlify do), this is a separate cost. Probably covered here, but should be documented.

4. **Stripe fees.** If the app processes payments, Stripe takes ~2.9% + $0.30 per transaction. This isn't infrastructure but the client should know about it.

5. **Backup storage.** Where are daily database backups stored? If on the same server, they're at risk if the server fails. If on S3 or similar, there's a (tiny) storage cost.

6. **GitHub.** Free for public repos, but if the repo is private, GitHub Teams is $4/user/month.

**What seems wrong:**

- Running both frontend AND backend on separate Railway instances is probably unnecessary for a small app. A single instance running both (or a static site for the frontend) would halve the cost.

- The total should include an "estimated annual" column so the client sees $180/year, not just $15/month. Clients think in yearly budgets.

**The pattern:** AI-generated cost breakdowns always miss something. Domain, email, payment processing fees, and backup storage are the most commonly omitted.
</details>

---

## What These Exercises Tell You

- **Exercise 1:** Can you evaluate a risk assessment critically? AI underestimates silent failures and operational risks. You add what's missing.
- **Exercise 2:** Can you tell whether documentation is complete enough for someone else? Vague runbooks fail when they're needed most — during incidents.
- **Exercise 3:** Can you spot missing costs? AI lists the obvious services but misses domains, email, payment fees, and storage. The client needs the real number.

---

## What you can now do

Six projects. The full lifecycle. You can:

- Direct AI to build software from an empty directory to a production system
- Plan with templates, review critically, catch hallucinations and scope creep
- Verify through hands-on product testing — visual, functional, numerical, adversarial, operational
- Manage scope changes, client communication, and multi-user permissions
- Harden a system: monitoring, backups, security, data protection
- Document well enough for someone else to maintain what you built
- Assess risk and cost honestly

That's the Web Development category complete. The directing skills — planning, reviewing, verifying, communicating — transfer to any technology and any domain. If you want to go further, pick a second arc and work through it faster, or wait for new categories as they launch.
