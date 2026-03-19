---
title: "Checkpoint: After Project 3"
description: "Self-assessment exercises after completing Project 3"
page_type: "checkpoint"
section: "web-dev"
---
# Judgment Checkpoint: After Project 3

You've just generated your first PRD, reviewed an AI-generated backlog, handled a scope change, and run your first sprint retro. These exercises confirm your planning judgment is developing.

---

## Exercise 1: PRD Review

Below is an AI-generated PRD excerpt for a simple booking system. The client brief said: "I want customers to pick a date and time and book a consultation. I need to see my upcoming bookings."

**Find every problem.**

> **Scope:**
>
> 1. **User Registration** — Customers create an account with email, password, and phone number. Profile page with booking history and saved preferences.
>
> 2. **Smart Booking** — AI-powered scheduling that analyses the customer's preferences and the business owner's historical availability patterns to suggest optimal time slots. Machine learning model trained on past booking data.
>
> 3. **Booking Form** — Customer selects a date, picks from available time slots, enters their name and email, and submits. Confirmation displayed on screen.
>    - Acceptance criteria: The booking form should work well on all devices.
>
> 4. **Admin View** — Business owner sees all upcoming bookings in a calendar view with day, week, and month modes. Drag-and-drop rescheduling. Colour-coded by service type.
>    - Acceptance criteria: The calendar provides a good overview of the schedule.

<details>
<summary>Check your answer</summary>

**Four problems:**

1. **User Registration is anti-scope.** The client said "pick a date and time and book." No mention of accounts. A simple form with name + email is sufficient. Remove the entire feature.

2. **Smart Booking is massively over-engineered.** The client wants customers to pick from available slots. An ML model analysing historical patterns is absurd for a small business. Remove entirely.

3. **Booking Form acceptance criteria are vague.** "Should work well on all devices" isn't testable. Should be: "Form displays correctly on mobile (single column), tablet, and desktop. Date picker is usable on touch devices. Submitting with a past date shows error message 'Please select a future date.' Submitting with all valid fields shows confirmation with booking details."

4. **Admin View is over-engineered.** The client said "see my upcoming bookings." A simple list sorted by date is sufficient. Drag-and-drop rescheduling, three calendar modes, and colour coding are all scope creep. A filtered list view covers the brief.
</details>

---

## Exercise 2: Scope Change Handling

You're in the middle of building a booking system (6 of 9 tickets complete). The client calls:

> "Hey, quick question — can we also add online payment so customers pay a deposit when they book? And my business partner wants login access too so she can see the bookings."

**What do you do? Put these steps in the correct order:**

A. Tell Claude to implement payment right now since we're already building
B. Update CLAUDE.md to reflect the additions
C. Finish the current core tickets (7-9) before starting the new work
D. Create new tickets on the board for both features
E. Tell the client both features are anti-scope and refuse
F. Update the PRD scope section to include these features
G. Estimate the new tickets and communicate timeline to the client

<details>
<summary>Check your answer</summary>

**Correct order: D → F → B → C → G**

1. **D — Create tickets on the board.** The board is the single source of truth. New work = new tickets.
2. **F — Update the PRD.** The scope section now includes these features. Document the change.
3. **B — Update CLAUDE.md.** AI needs to know these features are now in scope.
4. **C — Finish core tickets first.** Don't interrupt in-progress work. Complete 7-9, then start the new tickets.
5. **G — Communicate timeline.** "I've added these to the board. They'll be built after the core system is complete, which should be [estimate]."

**Why the other options are wrong:**
- **A is wrong.** Never implement outside the ticket cycle. Every change goes through: ticket → branch → PR → review → merge.
- **E is wrong.** These are reasonable requests. They weren't in the original brief, but scope changes are normal. The process handles them — that's the point.
</details>

---

## Exercise 3: Acceptance Criteria Quality

Below are three sets of acceptance criteria for the same feature: "Admin can block off dates when they're unavailable."

**Which set is best? Why are the others weak?**

**Set A:**
- Admin can mark dates as unavailable
- Blocked dates don't show for customers
- It should work correctly

**Set B:**
- Admin clicks a date on the calendar and selects "Block this date"
- Blocked dates appear greyed out on the admin calendar with a "Blocked" label
- Blocked dates do not appear as available slots on the customer booking form
- Attempting to book a blocked date via direct API request returns 400 with "This date is not available"
- Admin can unblock a date by clicking it and selecting "Unblock"
- Blocking a date that already has bookings shows a warning: "This date has 2 existing bookings" and requires confirmation

**Set C:**
- The system shall provide date blocking functionality
- The blocking mechanism shall integrate with the availability service
- Blocked dates shall be persisted in the database with appropriate indexing
- The frontend shall reflect blocked status via the component state management layer

<details>
<summary>Check your answer</summary>

**Set B is correct.**

Every criterion describes what a person does and what they see. Every criterion is testable by using the product. It covers the happy path (block, unblock), the edge case (blocking a date with existing bookings), and the security case (direct API request for a blocked date).

**Set A is too vague.** "Should work correctly" means nothing. "Don't show for customers" is close but doesn't specify the mechanism (do they disappear? show as greyed out?). No edge cases.

**Set C is developer language.** "The system shall" is specification-speak. "Component state management layer" and "appropriate indexing" are implementation details, not user-verifiable criteria. A student can't test "appropriate indexing" by using the product.

**The pattern:** Good acceptance criteria describe user actions and visible outcomes. They include at least one edge case. They can be verified by using the product, not by reading the code.
</details>

---

## What These Exercises Tell You

- **Exercise 1:** Can you review an AI-generated PRD and catch scope creep, over-engineering, and vague criteria? You'll do this for every PRD going forward.
- **Exercise 2:** Do you know the scope change process? Work arrives mid-project in every real engagement.
- **Exercise 3:** Can you distinguish good acceptance criteria from vague or developer-oriented ones? The quality of your criteria determines the quality of what AI builds.

If you struggled with Exercise 1, re-read the [GreenScape PRD](/web-dev/projects/1/prd) and [FactFeed PRD](/web-dev/projects/2/prd) — study the anti-scope and acceptance criteria sections specifically. If Exercise 2 was unclear, review the scope change handling in your arc's Project 3 client brief. If Exercise 3 tripped you up, compare your checkpoint answers against the [answer keys](/web-dev/bridge/choose-arc) and look for the pattern: good criteria describe user actions and visible outcomes.
