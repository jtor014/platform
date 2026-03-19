# Web Development — Deep Dive

Web development is the sandbox, not the subject. The subject is **AI-directed development** — learning to plan, direct, verify, and operate software built by AI agents. Web apps are the context because they're visual, tangible, and cover enough breadth (frontend, backend, database, deployment) to exercise every part of the Framework.

---

## What Students Are Actually Learning

The durable skills — the ones that transfer regardless of which framework, language, or AI model is current:

### Planning with AI
- Using templates to guide AI through PRD creation — the student provides the brief and constraints, AI structures the output
- Reviewing AI-generated PRDs critically — catching when AI has added scope, assumed requirements, or left gaps
- Using templates to guide AI through architecture decisions — tech stack, schema, API contracts, ticket breakdown
- Reviewing AI-generated ticket backlogs — are the tickets small enough? Are the acceptance criteria testable? Are there dependencies the AI missed?
- Iterating with AI on design — wireframes, design systems, prototypes — guided by templates that keep the AI focused on the PRD's scope

### Directing AI Agents
- Using templates and structured prompts to guide AI through each phase — planning, design, architecture, building
- Writing effective CLAUDE.md files — project memory that actually works
- Sequencing tickets so each builds on the last without overwhelming context
- Recognising when AI is pattern-matching vs solving the actual problem
- Catching hallucinated APIs, libraries, or interfaces — verifying against real docs
- Maintaining consistency across a growing codebase when AI has no long-term memory
- Knowing when to give AI freedom and when to constrain it heavily
- Reviewing AI output at every stage — not just code, but PRDs, designs, architecture, tickets, and documentation

### Verifying AI Output
- Hands-on product testing against acceptance criteria — use the product like a real person, try to break it like a hostile one
- Reading code you didn't write well enough to spot problems — not writing code, but auditing it
- Using browser DevTools to verify visual output against a design spec
- The dual review system — self-review catches intent mismatches, independent review catches security
- Evidence-based debugging — collecting specific evidence before asking AI to fix ("the booking form accepts past dates, here's a screenshot" not "it's broken")
- Knowing what AI is reliably good at and what it's unreliable at (and updating that judgment as models improve)

### Managing the Lifecycle
- Board discipline — if it's not on the board it doesn't exist
- Sprint retros that calibrate trust in AI output over time
- Scope change management — client says "can you also..." and you know the process
- Estimation when AI is doing the implementation (different from estimating human work)
- Client communication about technical work you directed but didn't write
- Handover — could another director pick this up?

**Technical concepts (what an API is, what a database does, how auth works) are taught in context as they arise.** They're important — you can't direct effectively without understanding the landscape — but they're the secondary thread, not the primary one.

---

## The Progression: Repetition +1

Every project follows the same AI-First Development Framework loop. The loop becomes muscle memory through repetition. Each project adds ONE new capability that expands what the student thinks is possible. The process is the constant. The +1 is the curriculum.

### The Six Projects

| # | Project | The +1 | Tickets | Time |
|---|---|---|---|---|
| 1 | **The Static Site** | "I can direct AI to build a website and deploy it to a real URL" | 5-7 | A few days |
| 2 | **The Dynamic App** | "I can build an app with a database, API, Docker, and automated testing" | 8-11 | ~1 week |
| 3 | **The Interactive App** | "I can build something people USE — forms, validation, email. And I planned it myself" | 10-14 | 1-2 weeks |
| 4 | **The Integrated App** | "I can integrate external services — payments, maps — and catch when AI hallucinates the API" | 10-14 | 1-2 weeks |
| 5 | **The Multi-User App** | "I can build a system where different users see different things — and I can break my own permissions" | 12-16 | 2-3 weeks |
| 6 | **The Live System** | "I can keep a real system alive, recover it when it breaks, and hand it to someone else to run" | 12-16 | 2-3 weeks |

### Project 2: Two Internal Phases

Project 2 carries the most new concepts of any project. To prevent overload, it's structured internally as two emotional phases:

**Phase A — "The Stack Appears" (Tickets 1-5)**
Docker, containers, the API skeleton, the database, the Makefile. The student runs `make up` and an entire development environment appears. The wow is the tooling.

**Phase B — "The System Proves Itself" (Tickets 6-11)**
Tests, CI, the Gemini reviewer, the background worker, the full frontend-to-database flow, deployment. The wow is the system working end-to-end with automated quality gates.

A natural pause point between Phase A and Phase B. The student has a working stack. They take a breath. Then they see that stack come alive.

### How Autonomy Increases Naturally

Autonomy isn't a declared level — it's what happens when you've done the loop five times.

| Project | Loop | PRD | Tickets | Verification |
|---|---|---|---|---|
| 1 | First time — step by step | Provided | Provided | "Here's what to check" |
| 2 | Second time — faster | Provided — student reads critically | Provided — student questions sizing | Student uses DevTools confidently |
| 3 | Routine | **Student generates with AI + template** (scaffolded — see Bridge below) | **Student reviews AI-generated backlog** | Student runs first sprint retro |
| 4 | Automatic | Student generates — complex brief | Student scopes — handles dependencies | Student verifies against third-party docs |
| 5 | Muscle memory | Student drives — permission matrices | Student manages — existing codebase | Student tests by trying to break things |
| 6 | Second nature | Student writes operational PRD | Student writes infra/security tickets | Student verifies disaster recovery |

### The Project 2→3 Bridge: Scaffolded Planning

Project 3 is where the student generates a PRD for the first time. This is the biggest autonomy jump in the course. To bridge it:

**Step 1 — Annotate (end of Project 2):** Before finishing Project 2, the student re-reads both provided PRDs (Project 1 and 2) and annotates them: what does each section do? Why is the anti-scope written this way? Why are the acceptance criteria specific rather than vague? This turns passive reading into active analysis.

**Step 2 — Repair (start of Project 3):** The student receives a deliberately flawed AI-generated PRD for their chosen arc's Project 3 brief. The flaws are realistic AI failures:
- Scope items the client didn't ask for (features added by AI)
- Vague acceptance criteria ("the form should be user-friendly")
- Missing anti-scope section
- Architecture that's over-engineered for the brief
- A ticket that's actually three tickets

The student identifies and fixes the flaws. This is easier than generating from scratch and builds the critical review skill.

**Step 3 — Generate:** Now the student generates their own PRD from the client brief using the template. They've read two good PRDs, annotated them, and fixed a bad one. They know the shape.

---

## Judgment Checkpoints

Completing projects proves the student can follow the process. Judgment checkpoints prove they've internalised the directing skill. These are lightweight exercises embedded between projects.

### After Project 1: "Can You Spot the Problem?"
- **Anti-scope quiz:** Three PRD excerpts. Which one has scope items the client didn't ask for?
- **Design verification:** Two screenshots — one matches the Figma file, one has subtle differences. Identify the differences.
- **Review reading:** A Gemini review comment. Is it a real issue or a false positive?

### After Project 2: "Can You Read the System?"
- **Architecture quiz:** A system diagram with a mistake (e.g., the frontend calls the database directly instead of the API). Spot the error.
- **Evidence-based debugging:** An error message. Write the prompt you'd give Claude to fix it — must include specific evidence, not just "it's broken."
- **Ticket sizing:** Three ticket descriptions. Which one is too large for a single PR?

### After Project 3: "Can You Plan?"
- **PRD review:** An AI-generated PRD for an unfamiliar project. Identify: scope creep, vague acceptance criteria, missing anti-scope items, over-engineered architecture.
- **Ticket splitting:** A feature description that would produce a 500-line PR. Split it into 2-3 tickets under 300 lines each.
- **Scope change:** A mid-project client request. Decide: is this a new ticket, a change to an existing ticket, or anti-scope?

### After Project 4: "Can You Verify?"
- **Hallucination detection:** Three code snippets using third-party APIs. One uses a hallucinated API method. Identify which one by checking the actual docs.
- **Financial accuracy:** A cart with items and a discount. Calculate the correct total. Compare to the system's displayed total. Are they the same?
- **Client communication:** The client asks "will it handle 500 users at once?" Draft a honest, non-technical response.

### After Project 5: "Can You Protect?"
- **Permission audit:** A permissions matrix and a test scenario. Does the system correctly prevent access? Identify the gap.
- **Negative criteria:** A feature description. Write three things a user should NOT be able to do (that the AI probably didn't think of).
- **Regression check:** A list of new changes. Which existing features might these break?

### After Project 6: "Can You Hand Over?"
- **Risk assessment review:** An AI-generated risk assessment. What's missing? What risk did the AI underestimate?
- **Runbook test:** A runbook for restoring from backup. Is it complete enough that someone unfamiliar with the system could follow it?
- **Cost review:** An infrastructure cost breakdown. What's missing? What seems too expensive?

These checkpoints are not exams. They're self-assessment — the student checks their own judgment. Patterns: if they consistently miss anti-scope violations, they need more practice with that skill. If they can't split tickets, they need to review more backlogs.

---

## Choose Your Arc

After completing Projects 1 and 2, the student chooses an arc for Projects 3-5. Each arc provides the business context and introduces unique directing challenges.

### Which Arc Is Right for You?

| If you want to... | Choose |
|---|---|
| Follow the simplest business domain and focus purely on Framework skills | **Arc A: Service Business** |
| Work with money, payments, and financial accuracy | **Arc B: Online Store** |
| Fight AI scope creep and build for non-technical users | **Arc C: Content Platform** |
| Handle dates/times, physical environments, and offline constraints | **Arc D: Event Platform** |
| Build search, handle untrusted user content, and think like an attacker | **Arc E: Community Directory** |

### Which Arc Matches Your Course?

| Your course | Best arc |
|---|---|
| Web Development 101 / Intro to IT | Arc A (simplest domain) |
| Software Engineering / Capstone | Arc A (full lifecycle) or Arc B (integration complexity) |
| E-Commerce / Digital Business | Arc B (payments, inventory, analytics) |
| Digital Media / Communications | Arc C (content management, editorial design) |
| Event Management / Community Development | Arc D (events, registrations, physical constraints) |
| Information Systems / Data Management | Arc E (search, data quality, user-generated content) |
| Cybersecurity (with web dev component) | Arc E (adversarial thinking, XSS, abuse prevention) |

### Arc Summary

| Arc | Projects | Total Tickets | Signature Challenge | Verification Type |
|---|---|---|---|---|
| A: Service Business | 1-6 (full lifecycle) | 53-71 | Progressive client relationship | Visual → Functional → Behavioural |
| B: Online Store | 1-6 | 40-55 | Financial accuracy + API verification | Numerical + Documentary |
| C: Content Platform | 1-6 | 38-48 | Anti-scope + non-technical users | Invisible (SEO) + Experiential |
| D: Event Platform | 2-6 | 35-48 | Date/time + physical environment | Physical (devices, offline) |
| E: Community Directory | 2-6 | 38-52 | Search + adversarial trust | Adversarial (attack mindset) |

→ Full arc details in separate blueprint documents.

---

## Drop-Off Points and How the Design Addresses Them

Students are most likely to quit at these moments. The course anticipates each one.

### Project 1: "The tools are overwhelming"
**The risk:** Terminal, VS Code, Git, GitHub, PRs, CI — all at once.
**The mitigation:** Everything is provided. Step-by-step instructions for every command. The product is a static site — the simplest possible output. The +1 payoff ("it's live at a real URL") comes fast.
**The signal that it's working:** The student shows the URL to someone. That's the hook.

### Project 2 Phase A: "Docker is confusing"
**The risk:** Containers, images, volumes, ports — abstract concepts with no visible output yet.
**The mitigation:** Phase A is structured so `make up` is the very first action and the student immediately sees containers running. Makefile commands hide Docker complexity. The +1 payoff ("I typed one command and a database appeared") is immediate.
**The signal that it's working:** The student runs `make status` and sees three green containers.

### Project 2 Phase B: "Too much at once"
**The risk:** Tests, CI, Gemini review, background worker, full-stack connection, deploy — stacked on top of Phase A.
**The mitigation:** A natural pause between Phase A and Phase B. The student has a working stack. Phase B adds one thing at a time, each with its own visible payoff. The final +1 ("the whole system is connected and I can see data moving in the Network tab") is the emotional peak.
**The signal that it's working:** The student clicks "Next Fact" and watches the API request in DevTools.

### Project 3: "I have to plan this myself?"
**The risk:** First time generating a PRD. First time reviewing an AI-generated backlog. First real planning autonomy.
**The mitigation:** The Bridge (annotate → repair → generate). The student has read two PRDs, annotated them, and fixed a broken one before generating their own. The template constrains AI's output. The judgment checkpoint after Project 2 confirmed they can read a system diagram and spot errors.
**The signal that it's working:** The student catches something the AI added to the PRD that isn't in the brief. They feel smart.

### Project 5: "Permissions are hard to think about"
**The risk:** Multi-role systems require abstract reasoning about who can see and do what. It's not visual — it's logical.
**The mitigation:** The permissions matrix is a concrete planning artifact. The verification is concrete too: log in as User A, try to see User B's data. The judgment checkpoint after Project 4 includes hallucination detection and client communication — skills that prepare for the more complex verification in Project 5.
**The signal that it's working:** The student finds a permission bug by testing as the wrong user. They feel like a security tester.

### Project 6: "Operational work isn't exciting"
**The risk:** Monitoring, backups, security hardening, handover documentation — none of this has the dopamine of "it charges real money" or "different users see different things."
**The reframe:** Project 6 is not "The Reliable System." It's **"The Live System."** The +1 is: "I can keep a real system alive, recover it when it breaks, and hand it to someone else to run." The emotional payoff isn't building — it's the confidence that what you built will survive without you.
**The concrete thrills:**
- Stop the server. Watch the monitoring alert fire on your phone within 2 minutes. Start it again. Watch the recovery alert. "I would have known before any user did."
- Delete the database. Restore from backup. All the data is back. "I just recovered from a disaster."
- Give the handover doc to a classmate. They can explain how the system works without asking you. "I built something that outlasts me."
**The signal that it's working:** The student trusts the system. They know it can break and they know how to fix it.

---

## Design as a Directing Skill

Design is part of directing. A Director who can't review and refine AI-generated design output will ship whatever Claude invents.

- **Project 1:** Receives a provided Figma file. Learns to read it and verify Claude's output with DevTools. Design file = acceptance criteria.
- **Project 2:** No design focus — the app is functional, not beautiful. Focus is on the technical +1.
- **Project 3:** Uses design template to guide AI through wireframes. Reviews for scope creep. First time making design decisions.
- **Project 4:** Component specs with states (default, hover, loading, error, empty). Specifying precisely enough that Claude is consistent.
- **Project 5:** Information architecture for multiple user types. Mobile-first for field users. Different experiences for different roles.
- **Project 6:** Design for trust — privacy notices, error pages, consent flows. The design nobody finds exciting but everyone needs.

---

## Professional Skills as Directing Skills

Reframed from "things a developer does" to "things a Director does":

- **Standups:** From Project 3. Not "what code did I write" but "what did I direct, what's building, what's blocked."
- **Estimation:** From Project 3. Estimating AI-directed work — faster on boilerplate, slower on edge cases. Calibrate over time.
- **Code reading:** Every Director's Briefing. Not "can I write this" but "can I verify this is correct." Tracing request flow, spotting anomalies.
- **Evidence-based debugging:** From Project 2. "The API returns a 500 error when I submit a booking for yesterday. Here's the network tab screenshot." Not "it's broken, fix it."
- **Review feedback:** From Project 2. "This doesn't match the acceptance criteria because..." — requirements language, not implementation language.
- **DevTools:** From Project 1. Inspect, network tab, responsive mode, console. The Director's primary verification instrument.
- **Client communication:** From Project 4. Explaining technical decisions you directed but didn't implement.

---

## The Templates

Templates guide AI through each phase of the Framework. The student's skill is choosing the right template, providing context, and critically reviewing what AI produces.

### Template Inventory

**Planning templates:**
- **PRD template** — scope, anti-scope, user stories, success metrics
- **Design system template** — colours, typography, spacing, component patterns
- **Architecture template** — tech stack, schema, API contracts, repo structure
- **Ticket backlog template** — micro-scoped tickets with acceptance criteria

**Build templates:**
- **CLAUDE.md template** — project memory file
- **Component spec template** — UI components with all states

**Operational templates:**
- **Sprint retro template** — workflow, architecture, cost, tooling, lessons
- **Risk assessment template** — failure modes, likelihood, impact, mitigation
- **Runbook template** — incident response procedures
- **Handover template** — documentation for another director

### Template Autonomy Progression

| Project | Template Relationship |
|---|---|
| 1 | **Consumes** — receives completed template output as worked examples |
| 2 | **Studies** — reads provided PRD and CLAUDE.md more critically, annotates what each section does |
| 3 | **Generates** — repairs a flawed template output, then generates with AI for the first time |
| 4 | **Adapts** — modifies templates for the project's specific needs (e.g., adds "third-party verification" section) |
| 5 | **Extends** — adds project-specific sections (permissions matrix, data isolation rules) |
| 6 | **Owns** — recognises when standard templates are insufficient, creates custom sections for operational concerns |

---

## Verification Methods by Project

The student's primary verification is hands-on product testing — use the product like a real person and try to break it like a hostile one. The specific verification skills grow across projects:

| Project | Primary Verification Method |
|---|---|
| 1 | **Visual** — does it match the Figma file? DevTools inspection |
| 2 | **Functional** — does the API return the right data? Database shell. Network tab |
| 3 | **Behavioural** — submit the form with bad data. Does it reject? Try edge cases |
| 4 | **Documentary** — does Claude's Stripe code match the actual Stripe docs? |
| 5 | **Adversarial** — log in as the wrong user. Can you see data you shouldn't? |
| 6 | **Operational** — stop the server. Does the alert fire? Restore the backup. Is the data intact? |

Judgment checkpoints after each project verify that the student can apply these skills to unfamiliar situations, not just the project they completed. See the Judgment Checkpoints section above.

---

## What This Progression Achieves

By the end of Project 6, a student can:

**Direct AI agents to build software:**
- Use templates to guide AI through planning, design, architecture, and ticketing
- Review AI-generated output critically at every stage
- Scope tickets at the right granularity for AI to execute reliably
- Maintain project memory (CLAUDE.md) that keeps AI consistent across sessions
- Catch when AI is pattern-matching vs solving the actual problem
- Verify AI output through hands-on product testing, DevTools, and documentation checks

**Manage the full product lifecycle:**
- Plan, build, demo, iterate, deploy, monitor, harden, and hand over
- Handle scope changes through a board, not ad-hoc requests
- Run sprint retros that improve the next project
- Communicate technical decisions to non-technical stakeholders
- Assess cost, risk, and reliability — not just features

**Demonstrate directing judgment:**
- Spot anti-scope violations in PRDs
- Identify hallucinated APIs and libraries
- Write acceptance criteria that AI can test against
- Split oversized tickets
- Gather evidence before directing AI to fix bugs
- Evaluate whether an architecture matches a brief
- Identify permission gaps in multi-user systems
- Assess operational risks and write runbooks

**Produce a professional portfolio:**
- 6 real projects showing progressive complexity
- PRDs, wireframes, architecture decisions, sprint retros
- Judgment checkpoint results showing directing competence
- Evidence of the complete delivery lifecycle
- A live system with monitoring, backups, and handover docs

---

## Note on Technology Choices

The projects currently reference React, FastAPI, PostgreSQL, Tailwind, Docker, and Terraform. These are the current tools — they will change. The Framework doesn't depend on them. The directing skill transfers to any stack.

The tech stack is the sandbox. The directing skill is the education. The templates are the tools that make AI-directed development repeatable across any project, any domain, any tech stack.

---

## Detailed Project Documents

- `web-dev-project-1-blueprint.md` — The Static Site (full detail)
- `web-dev-project-2-blueprint.md` — The Dynamic App / universal on-ramp (full detail, with Phase A/B structure)
- `web-dev-arc-a-blueprint.md` — Service Business arc (Projects 3-6 in Arc A context)
- `web-dev-arc-b-blueprint.md` — Online Store arc (Projects 3-6 in Arc B context)
- `web-dev-arc-c-blueprint.md` — Content Platform arc (Projects 3-6 in Arc C context)
- `web-dev-arc-d-blueprint.md` — Event Platform arc (Projects 3-6 in Arc D context)
- `web-dev-arc-e-blueprint.md` — Community Directory arc (Projects 3-6 in Arc E context)
