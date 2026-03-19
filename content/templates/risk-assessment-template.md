---
title: "Risk assessment template"
description: "Failure modes, likelihood, impact, mitigation"
page_type: "template"
section: "templates"
group: "operational"
---
# Risk Assessment Template

Use this template at Project 6 (The Live System) to systematically identify what can go wrong and how to prepare for it. Paste into conversational AI along with a description of the current system.

---

## Instructions for AI

I need you to produce a risk assessment for the system described below. For each risk, be specific about the failure mode, realistic about the likelihood, honest about the impact, and practical about the mitigation. Don't list generic risks — focus on what could actually go wrong with this specific system.

---

## System Description

[Paste a brief description of the system: what it does, who uses it, what infrastructure it runs on, what third-party services it depends on]

## Risk Register

For each identified risk:

| # | Risk | Likelihood | Impact | Severity | Mitigation | Status |
|---|---|---|---|---|---|---|
| 1 | [specific failure] | Low / Medium / High | Low / Medium / High / Critical | [L×I score] | [specific action] | Not started / In progress / Mitigated |

### Risk Categories to Consider

**Infrastructure:**
- Server goes down (hosting provider outage)
- Database corruption or data loss
- Deployment breaks the live site
- DNS or SSL certificate expiry

**Security:**
- Unauthorised access to admin features
- Data breach (personal data exposed)
- XSS or injection attack via user input
- API keys or secrets exposed in code

**Third-Party Dependencies:**
- Payment processor (Stripe) goes down
- Email service becomes unavailable
- Map API changes or becomes paid
- A critical library is deprecated or has a vulnerability

**Data:**
- Backup fails silently (runs but produces empty/corrupt file)
- Data migration introduces inconsistencies
- Timezone handling produces wrong dates in certain conditions
- Financial calculations have rounding errors that accumulate

**Operational:**
- No one monitors alerts (alert fatigue or no alerting set up)
- The only person who understands the system is unavailable
- Cost unexpectedly increases (hit a paid tier, forgot to destroy test resources)

## Plain-English Summary for the Client

After completing the risk register, write a 1-page summary for the client:
- Top 3 risks they should know about
- What we've done to mitigate them
- What residual risk remains (what we can't fully prevent)
- Recommended actions (if any require client decisions or budget)

---

## After AI Generates the Assessment — Review Checklist

- [ ] Risks are specific to this system, not generic
- [ ] Likelihood assessments are realistic (not everything is "Low")
- [ ] Impact includes who is affected and how badly
- [ ] Mitigations are practical and affordable
- [ ] Third-party dependencies are included
- [ ] The silent failures are covered (backup runs but is empty, monitoring exists but nobody watches it)
- [ ] Client summary is in plain English, no jargon
