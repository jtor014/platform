---
title: "Checkpoint: After Project 2"
description: "Self-assessment exercises after completing Project 2"
page_type: "checkpoint"
section: "web-dev"
prev: "/web-dev/projects/2/claude-md"
next: "/web-dev/bridge"
---
# Judgment Checkpoint: After Project 2

These exercises confirm you can read a system, debug with evidence, and evaluate tickets. Complete these before starting the bridge to Project 3.

---

## Exercise 1: Architecture Error

Below is a system diagram for a facts application. **Find the architectural mistake.**

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│              │     │              │     │              │
│   Browser    │────▶│   React      │────▶│  PostgreSQL  │
│              │     │   Frontend   │     │   Database   │
│              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                                                ▲
                                                │
                                          ┌─────┴────────┐
                                          │              │
                                          │   Background │
                                          │   Worker     │
                                          │              │
                                          └──────────────┘
```

<details>
<summary>Check your answer</summary>

**The frontend is connected directly to the database.** In a correct architecture, the frontend calls the backend API, and the backend queries the database:

```
Browser → React Frontend → FastAPI Backend → PostgreSQL Database
                                                    ↑
                                              Background Worker
```

The frontend should never talk to the database directly. It doesn't have credentials, it can't run SQL from a browser, and exposing the database to the internet is a security risk. The backend API is the gatekeeper.

If you saw this in an AI-generated architecture, you'd direct Claude to fix it: "The frontend must call the API, not the database directly. Add the backend service between frontend and database."
</details>

---

## Exercise 2: Evidence-Based Debugging

You're working on the FactFeed app. You click "Next Fact" and nothing happens — the fact doesn't change, no loading spinner appears, no error message shows.

Below are three prompts a student might give Claude to fix this. **Which prompt gives Claude the best evidence to work with? Why are the others weak?**

**Prompt A:**
> "The Next Fact button is broken. Fix it."

**Prompt B:**
> "When I click Next Fact, nothing happens. No loading spinner, no new fact, no error message. The button click doesn't seem to trigger anything. I checked the Network tab in DevTools and no API request is being sent when I click the button."

**Prompt C:**
> "I think there might be a bug in the frontend code. Can you check the FactCard component and the API call and the state management and make sure everything is wired up correctly?"

<details>
<summary>Check your answer</summary>

**Prompt B is correct.** It provides:
1. What happened: "I click Next Fact, nothing happens"
2. What didn't happen: "No loading spinner, no new fact, no error message"
3. Specific evidence: "Network tab shows no API request is being sent"

This tells Claude exactly where the problem is: the button click isn't triggering the API call. Claude can go straight to the click handler.

**Prompt A is too vague.** "Broken" could mean anything. Claude would have to guess what "broken" means and might fix the wrong thing.

**Prompt C is too broad.** It asks Claude to check everything rather than pointing to the problem. It also guesses at the cause ("I think it might be...") instead of reporting evidence.

**The pattern:** Describe what you did → what you expected → what actually happened → what evidence you collected. This is evidence-based debugging, and it's one of the most valuable directing skills.
</details>

---

## Exercise 3: Ticket Sizing

Below are three ticket descriptions. **Which one is too large for a single PR (over 300 lines)?** How would you split it?

**Ticket A:**
> Add a health check endpoint. Create GET /api/health that returns {"status": "ok"} with a 200 status code. Add a pytest test for the endpoint.

**Ticket B:**
> Build the complete frontend for the facts app. Create the React project with Vite and Tailwind. Create the FactCard component that displays a fact with text, source, and attribution. Create the "Next Fact" button. Connect the frontend to the backend API with fetch calls. Add loading state (spinner while fetching). Add error state (message when API is unreachable). Add empty state (message when no facts exist). Make the layout responsive for mobile and desktop. Add the frontend to Docker Compose.

**Ticket C:**
> Add the background worker to fetch facts every 5 minutes. Use APScheduler to run the fetch function on a timer. Handle duplicate facts by catching the unique constraint violation. Log each fetch cycle result.

<details>
<summary>Check your answer</summary>

**Ticket B is too large.** It includes: project setup, a component, a button, API integration, three different states (loading, error, empty), responsive design, and Docker configuration. That's easily 400-600 lines.

**Split it into 3 tickets:**
1. **Frontend shell:** React + Vite + Tailwind setup, basic layout, FactCard with hardcoded data, Docker Compose integration. (~100-150 lines)
2. **API connection:** Connect FactCard to the backend API. Add fetch on load and on button click. (~100-150 lines)
3. **States and polish:** Loading spinner, error message, empty state, responsive tweaks. (~100-150 lines)

Each ticket is now under 300 lines and can be reviewed independently.

**Tickets A and C are appropriately sized.** A is small (S), C is medium (M). Neither would exceed 300 lines.
</details>

---

## Exercise 4: PRD Comparison

You've now read two PRDs: Project 1 (GreenScape static site) and Project 2 (FactFeed dynamic app).

**Answer these questions without re-reading the PRDs:**

1. What three sections does every PRD need? (Name them)
2. What was in Project 2's anti-scope that wasn't relevant to Project 1? (Name at least 2 items)
3. What type of acceptance criteria appears in Project 2 that doesn't appear in Project 1? (Think about what's different when you have a backend)

<details>
<summary>Check your answer</summary>

**1. Essential sections:** Scope (what we're building), Anti-Scope (what we're NOT building), and Acceptance Criteria (how we know it works). Every PRD needs all three. Other sections matter too (user stories, technical constraints), but these three are non-negotiable.

**2. Project 2 anti-scope included:** No caching layer (Redis), no complex state management (Redux), no load balancer, no admin panel. These weren't relevant to Project 1 because there was no backend — but AI would suggest them for any backend project.

**3. Backend acceptance criteria:** Project 2 has API response specifications — exact JSON shapes, specific HTTP status codes (200, 404), response time requirements. Project 1's criteria were visual (matches the design) and functional (links work). Project 2 adds a new verification type: checking data format and status codes in the Network tab.

**The pattern:** As projects get more complex, the PRD gets more precise about data, not just appearance. You'll write even more precise criteria in Project 3 when you create your own PRD.
</details>

---

## What These Exercises Tell You

- **Exercise 1:** Can you read a system diagram and spot structural errors? You'll evaluate AI-generated architectures in Project 3.
- **Exercise 2:** Can you collect evidence before asking AI to fix something? This skill prevents wasted cycles and vague bug reports.
- **Exercise 3:** Can you judge whether a ticket is the right size? You'll review AI-generated backlogs in Project 3.
- **Exercise 4:** Do you understand the shape of a PRD well enough to generate one? You're about to.

If you're comfortable with all four, you're ready for the bridge.
