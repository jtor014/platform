# buildwith.dev — Platform Overview

## What This Is

A free, open learning resource that teaches people to build real software by directing AI agents. Project-based, growing over time, built in public.

The platform itself is being built using the AI-First Development Framework — the methodology it teaches.

---

## Core Concept

**One methodology. Many projects.**

The AI-First Development Framework is the constant underneath every project. Students learn it once and apply it to any domain. The framework covers: planning (PRD → design → architecture), building (ticket-by-ticket with TDD, CI, dual AI review), deploying, and operating.

Students never write code. They direct Claude Code to build, Gemini to review, and they sign off on merges. They ship working software.

---

## Who This Is For

University and tertiary students who are asked to produce technical outputs — apps, dashboards, pipelines, security audits, deployed systems — across degrees that aren't purely computer science. Business, IT, data science, cybersecurity, digital media, public policy, health informatics, and more.

Also: self-taught learners, career changers, and anyone who hit the "build a thing" moment with no methodology for how to actually do it.

---

## How It's Organised

Students pick a category that matches their course or interest. Each category contains multiple projects at different difficulty levels. Every project follows the same Framework methodology.

The Web Development category uses a **Repetition +1** progression — six sequential projects that repeat the same AI-directed development loop, each adding one new capability:

1. **The Static Site** — learn the loop (Git, PRs, deploy)
2. **The Dynamic App** — loop + database + API + Docker + CI (universal on-ramp)
3. **The Interactive App** — loop + forms + validation + email + student writes first PRD
4. **The Integrated App** — loop + third-party APIs + verifying against real docs
5. **The Multi-User App** — loop + auth + roles + permissions + breaking your own system
6. **The Reliable System** — loop + monitoring + backups + security + handover

Autonomy increases naturally through repetition — by Project 3 the student writes their own PRD, by Project 5 it's muscle memory. Client story arcs provide the business context for Projects 3-5.

Other categories will follow similar progressive structures adapted to their domains.

---

## Categories

Six categories validated against major learning platforms (Pluralsight, Coursera, freeCodeCamp), university CS/IT curricula, and 2026 employer demand data.

### 1. Web Development
→ *See separate deep-dive document: `web-dev-deep-dive.md`*

Full-stack apps, SPAs, APIs, and deployment. The foundational category — most students start here.

- **Uni courses:** Web Development, Software Engineering, IT, Digital Media, Capstone Projects
- **Employer demand:** Strong and consistent
- **Key tools:** React, FastAPI/Node, PostgreSQL, Docker, Tailwind, Git, CI/CD

**Structure:** Six sequential projects following the Repetition +1 model. Projects 1-2 are universal (every student). Projects 3-5 are contextualised by five client story arcs (Service Business, Online Store, Content Platform, Event Platform, Community Directory). Project 6 is arc-agnostic (production hardening). Design skills (Figma, wireframing, component specs) and professional skills (standups, estimation, code reading, DevTools, evidence-based debugging) are woven through all projects.

**Goal:** After completing all six projects, a student could walk into a junior web dev role and contribute from day one.

---

### 2. Data

Databases, pipelines, analysis, and visualisation. One category with two tracks that crossover.

- **Uni courses:** Data Science, Business Analytics, Statistics, Economics, Database Systems, Data Engineering
- **Employer demand:** 22% business leader priority; data engineering and analytics consistently top-5
- **Key tools:** SQL, PostgreSQL, Python, Pandas, Jupyter notebooks, Plotly/Matplotlib, dbt

#### Track A: Data Engineering

Schema design, SQL, NoSQL, data modelling, migrations, ETL pipelines, data quality, warehousing. Building the infrastructure that stores and moves data.

#### Track B: Data Analytics & Visualisation

Exploring data, statistical analysis, building charts and dashboards, automated reporting, Jupyter notebooks, dataframes. Making sense of data and communicating findings.

#### How the tracks connect

Track A produces the databases and clean datasets. Track B consumes them. A foundation project spans both (load → store → query → visualise), then students branch into whichever track matches their needs. Projects can feed into each other.

#### Projects (to be detailed in deep-dive)

- Foundation (shared): End-to-End Data Project (ingest CSV → design schema → store → query → visualise)
- Engineering: ETL Pipeline
- Engineering: Database Design & Migration
- Engineering: Data Quality & Validation System
- Analytics: Interactive Dashboard
- Analytics: Survey & Research Data Tool
- Analytics: Automated Reporting System
- Advanced: Multi-Source Data Warehouse

---

### 3. Machine Learning

Model training, evaluation, deployment, and MLOps. The "build and serve models" discipline.

- **Uni courses:** Intro to ML, Data Science, AI Foundations, Applied ML, Computational Science
- **Employer demand:** 45% business leader priority (combined with AI); ML engineers among fastest-growing roles
- **Key tools:** Scikit-learn, PyTorch/TensorFlow, Jupyter notebooks, Pandas, FastAPI (for serving)
- **Note:** Training on large datasets needs compute — design projects around small/medium datasets or Google Colab for GPU access

#### Projects (to be detailed in deep-dive)

- Foundation: ML Model Training & Evaluation (classification or regression, proper train/test/validate)
- Intermediate: ML Model Serving API (trained model → containerised API endpoint)
- Intermediate: NLP Text Classification Pipeline
- Advanced: Recommendation System
- Advanced: Time Series Forecasting

---

### 4. AI Integration

Building with LLMs, RAG, agents, and AI APIs. The "use AI in real workflows" discipline. Distinct from ML because the tools and projects are completely different — API calls and prompt engineering vs model training and evaluation.

- **Uni courses:** AI Applications, Digital Transformation, IT Management, Business Innovation, NLP (newer modules)
- **Employer demand:** 45% business leader priority; prompt engineering and AI implementation skills increasingly expected even in non-AI roles
- **Key tools:** Claude/OpenAI APIs, LangChain, vector databases, embeddings, prompt engineering

#### Projects (to be detailed in deep-dive)

- Foundation: AI-Powered Document Processor (upload docs → structured extraction via API)
- Intermediate: AI Triage & Routing System (classify, prioritise, route with human-in-the-loop)
- Intermediate: RAG Knowledge Base (embeddings, vector search, grounded answers with citations)
- Advanced: AI Agent with Tool Use (function calling, orchestration, safety)
- Advanced: Multi-Model Pipeline (chain different AI capabilities together)

---

### 5. Cybersecurity

Application security, vulnerability assessment, hardening, and incident response. Both offensive (attack your own apps) and defensive (harden them).

- **Uni courses:** Application Security, Penetration Testing, Network Security, Digital Forensics, Secure Software Development, DevSecOps
- **Employer demand:** #1 most important skill for 2026; information security analyst roles projected to grow 32% by 2032
- **Key tools:** Kali Linux, Nmap, Burp Suite, Metasploit, Wireshark, OWASP Juice Shop/DVWA, WAF
- **Note:** Offensive security projects require virtualisation (VirtualBox + Kali + vulnerable target on isolated network). Hardware requirement: 8-16GB RAM recommended

#### Lab Setup

- VM 1: Deliberately vulnerable target (Metasploitable, DVWA, Juice Shop, or student's own app from Web Development)
- VM 2: Kali Linux as attacker
- Both on isolated host-only virtual network — nothing touches the real internet
- Natural learning arc: build an app (Web Dev) → attack it (Security) → harden it (Security) → verify fixes

#### Projects (to be detailed in deep-dive)

- Foundation: Secure Web Application (OWASP Top 10, input sanitisation, security headers, secure auth)
- Intermediate: Vulnerability Scanner & Audit Tool (port scanning, header analysis, SSL checks, dependency audit)
- Intermediate: Infrastructure Hardening Playbook (firewall, WAF, secrets rotation, least-privilege IAM)
- Advanced: SIEM & Log Analysis Platform (log collection, event correlation, anomaly detection, alerting)
- Advanced: Penetration Test & Report (full assessment of own application, professional report format)

---

### 6. Cloud & DevOps

Infrastructure, containers, CI/CD pipelines, monitoring, and operations. Merged from two potential categories because they overlap heavily in practice.

- **Uni courses:** Cloud Computing, DevOps, Systems Administration, IT Infrastructure, Distributed Systems
- **Employer demand:** Cloud architecture 24% priority, IT operations 36% priority; Docker, Kubernetes, Terraform, CI/CD consistently top skill requirements
- **Key tools:** AWS, Terraform, Docker, GitHub Actions, Prometheus, Grafana, Loki
- **Note:** Requires real cloud accounts with real billing — projects must emphasise free-tier usage and `terraform destroy` to avoid surprise bills

#### Projects (to be detailed in deep-dive)

- Foundation: CI/CD Pipeline from Scratch (linting, testing, security scanning, build, deploy)
- Foundation: Container Orchestration (multi-service Docker Compose, health checks, networking)
- Intermediate: Infrastructure as Code (Terraform for compute, networking, databases, DNS)
- Intermediate: Monitoring & Observability Stack (Prometheus, Grafana, Loki, alerting)
- Advanced: Auto-Scaling & Load Balancing (ALB, ASG, rolling deploys, zero downtime)
- Advanced: Multi-Environment Pipeline (dev → staging → production with promotion gates)

---

## Categories Considered and Excluded

| Category | Reason for Exclusion |
|---|---|
| **Automation & Integration** | Not a distinct discipline — projects are web apps or data engineering applied to business processes. Relevant projects filed into Web Development and Data instead |
| **Software Testing & QA** | A practice, not a thing you build. TDD is already baked into every project via the Framework. Testing tools taught within relevant category projects |
| **UX/UI & Design** | Doesn't fit the "direct AI to build it" model as a standalone category. Woven into Web Development as a design thread across all levels instead |
| **Governance & Compliance** | Mostly documentation and knowledge work, not building. Woven into relevant projects (e.g. GDPR consent flow, data anonymisation, audit trails) |
| **Academic Projects** | Not a distinct discipline — portfolio sites are Web Dev, research tools are Data, capstone templates are "use the Framework on your own thing" |
| **Mobile Development** | Viable but adds complexity (emulators, device testing, app store accounts). Parked for future addition |

---

## The Methodology (Constant Across All Projects)

Every project follows the AI-First Development Framework:

### Planning (before any code)
1. **Product Strategy** — Turn idea into a PRD with strict scope and anti-scope
2. **Design** — Wireframes → design tokens → interactive prototype
3. **Architecture** — Database schema, API contracts, repo structure, ticket backlog

### Building (the development loop)
1. Director says "Start Ticket N"
2. Claude writes failing tests first (TDD), then implements
3. Claude commits, pushes, opens PR referencing "Closes #N"
4. Claude runs self-review against acceptance criteria
5. Gemini independently reviews for security and best practices
6. Claude reports proactively: CI status, both reviews, PR size, recommendation
7. Director decides: merge / fix / show full review

### Quality Gates
- No PR over 300 lines — split if larger
- Branch protection enforces: CI must pass, review must exist, no direct pushes to main
- Sprint retro every 3-4 tickets
- Director's Briefing after every ticket (teaches what was built)

### Deployment
- Merge = deploy (GitHub Actions)
- Rollback via `make rollback`
- Infrastructure via Terraform (plan → review → apply → destroy)

---

## Cross-Cutting Concerns

These aren't separate categories but are woven into projects across all categories:

- **Testing:** TDD from Ticket 2 in every project. Specific testing tools (pytest, Jest, Cypress) introduced in relevant categories
- **Security:** Secure coding practices in Web Dev, dedicated category for deeper work, hardening in Cloud & DevOps
- **Design:** Design thread in Web Development. Other categories include relevant design decisions (dashboard layouts, data visualisation choices)
- **Documentation:** CLAUDE.md, BACKLOG.md, Director's Briefings built into every project
- **Governance & Compliance:** Data privacy, consent flows, audit trails woven into relevant projects (especially Data and AI Integration)
- **Version Control:** Git workflow is core to the Framework — every project uses branches, PRs, conventional commits
- **Accessibility:** Introduced in Web Development, expected in all projects that have a user interface

---

## Platform Design

- Free and open
- Organised by category, not a linear curriculum
- Students pick the category that matches their course/interest
- Each project card shows: difficulty level, ticket count, what you'll learn, relevant uni courses
- Projects within a category progress from Level 1 → Level 5
- The Framework documentation is freely available as the methodology reference
- Built in public — new projects added as they're completed

---

## Source Documents

- **AI-First Development Framework** — The methodology (project-agnostic)
- **Daily Fact Platform Example Implementation** — First example project (Web Development, Level 2 equivalent)

---

## Deep-Dive Documents

**Web Development (complete):**
- `web-dev-deep-dive-blueprint.md` — Category structure, 6-project progression, arcs, templates, verification methods
- `web-dev-project-1-blueprint.md` — The Static Site (full detail — every student's first project)
- `web-dev-project-2-blueprint.md` — The Dynamic App / universal on-ramp (full detail — every student's second project)
- `web-dev-arc-a-blueprint.md` — Service Business arc (Projects 3-6 in Arc A context)
- `web-dev-arc-b-blueprint.md` — Online Store arc (Projects 3-6 in Arc B context)
- `web-dev-arc-c-blueprint.md` — Content Platform arc (Projects 3-6 in Arc C context)
- `web-dev-arc-d-blueprint.md` — Event Platform arc (Projects 3-6 in Arc D context)
- `web-dev-arc-e-blueprint.md` — Community Directory arc (Projects 3-6 in Arc E context)

**Other categories (to be developed):**
- *(Future)* `data-deep-dive-blueprint.md`
- *(Future)* `ml-deep-dive-blueprint.md`
- *(Future)* `ai-integration-deep-dive-blueprint.md`
- *(Future)* `cybersecurity-deep-dive-blueprint.md`
- *(Future)* `cloud-devops-deep-dive-blueprint.md`

---

*This document is a living plan. Updated as categories are fleshed out and deep-dives are completed.*
