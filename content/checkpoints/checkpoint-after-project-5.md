---
title: "Checkpoint: After Project 5"
description: "Self-assessment exercises after completing Project 5"
page_type: "checkpoint"
section: "web-dev"
next: "/web-dev/projects/6"
---
# Judgment Checkpoint: After Project 5

You've built a multi-user system, written a permissions matrix, tested by trying to break your own access controls, and managed a substantial codebase. These exercises test your adversarial thinking and system-level judgment.

---

## Exercise 1: Permission Audit

A system has two user types: **Admin** and **Staff**. Below is the permissions matrix from the PRD, and below that is a list of API endpoints Claude implemented.

**Find the endpoint that violates the permissions matrix.**

**Permissions Matrix:**
| Action | Admin | Staff |
|---|---|---|
| View all orders | ✓ | ✓ |
| View order details | ✓ | ✓ |
| Update order status | ✓ | ✓ |
| View customer contact details | ✓ | ✗ |
| Export customer data | ✓ | ✗ |
| Create staff accounts | ✓ | ✗ |
| View revenue dashboard | ✓ | ✗ |

**Implemented Endpoints:**
```
GET  /api/orders                    → requires: Staff or Admin
GET  /api/orders/{id}               → requires: Staff or Admin
     Response includes: order items, status, customer name, customer email, customer phone
PATCH /api/orders/{id}/status       → requires: Staff or Admin
GET  /api/customers                 → requires: Admin
GET  /api/customers/{id}            → requires: Admin
GET  /api/export/customers          → requires: Admin
POST /api/staff                     → requires: Admin
GET  /api/dashboard/revenue         → requires: Admin
```

<details>
<summary>Check your answer</summary>

**`GET /api/orders/{id}` violates the matrix.** The response includes customer email and phone — which are "customer contact details" that Staff should NOT see.

The endpoint correctly requires Staff or Admin (both can view order details). But the response body leaks data that Staff shouldn't access. The fix: the response should include customer name (needed to fulfil the order) but NOT email or phone when the requester is Staff.

This is a common pattern: the endpoint-level permission is correct, but the response includes more data than the user should see. It's why you test by logging in as Staff and checking what data actually comes back — not just whether the request succeeds.

**How to catch this in practice:** Log in as Staff. Open an order. Check the response in the Network tab. If customer email and phone are in the JSON, that's a data leak even if the page doesn't display them.
</details>

---

## Exercise 2: Negative Acceptance Criteria

You're building a contractor portal where contractors see only their assigned jobs. Below are the positive acceptance criteria Claude generated.

**Write three negative acceptance criteria that Claude didn't think of.**

Claude's criteria:
- Contractor can view a list of their assigned jobs
- Contractor can click a job to see details (service type, location, date, notes)
- Contractor can update the status of their assigned jobs
- Contractor can log hours on their assigned jobs
- Contractor can upload completion photos on their assigned jobs

<details>
<summary>Check your answer — example negatives</summary>

Good negative criteria:

1. "A contractor who navigates directly to `/jobs/{id}` where `{id}` is a job assigned to a different contractor receives a 403 Forbidden response, NOT the job details."

2. "A contractor cannot see any customer contact information (email, phone, address) — the job detail response excludes these fields entirely when the requester is a contractor."

3. "A contractor cannot see the quote amount or invoice total for any job — financial information is admin-only."

**Bonus negatives:**
4. "A contractor cannot access the admin dashboard URL — it returns 403, not a blank page or redirect to login."
5. "A contractor cannot create, edit, or delete jobs — only update status, log hours, and upload photos on assigned jobs."

The pattern: for every "can do" criterion, ask "what should they NOT be able to do?" AI writes the happy path. You write the boundaries.
</details>

---

## Exercise 3: Regression Awareness

You've just added contractor portals (Project 5) to a system that already has bookings (Project 3) and quoting/jobs (Project 4). 

Below are 5 changes Claude made in Project 5. **For each change, identify which existing feature from Projects 3-4 might break and how you'd test it.**

1. Added a `role` field to the users table and updated the login endpoint to return the user's role
2. Added permission middleware that checks user role on every API request
3. Changed the jobs table to add a `contractor_id` foreign key
4. Updated the jobs list endpoint to filter by contractor when the requester is a contractor
5. Added image upload functionality for contractor completion photos

<details>
<summary>Check your answer</summary>

1. **Login change → might break admin login.** Test: log in as admin, verify you still get the correct role and can access all admin features. The login response shape changed — any frontend code parsing the old shape will break.

2. **Permission middleware → might break ALL existing endpoints.** Test: log in as admin and verify every endpoint from Projects 3-4 still works. The middleware might be too strict (blocking admin from endpoints it shouldn't) or might not handle the "no role" case (what about the public booking endpoint that doesn't require login?).

3. **Jobs table change → might break existing job queries.** Test: view existing jobs that have no contractor assigned. Does the admin jobs list still show them? Does filtering work? The new foreign key might cause queries to fail for jobs with NULL contractor_id.

4. **Filtered jobs endpoint → might break admin's view.** Test: log in as admin. Can you still see ALL jobs, not just your "assigned" ones? The filter might apply to everyone, not just contractors.

5. **Image upload → unlikely to break existing features** unless it changed the server configuration (file size limits, CORS settings) that affects other parts of the system.

**The pattern:** Every change to shared infrastructure (auth, middleware, database schema, API response shapes) can break existing features. Test the old stuff after changing the foundations.
</details>

---

## What These Exercises Tell You

- **Exercise 1:** Can you audit a system for data leaks beyond endpoint-level permissions? The response body matters as much as the access control.
- **Exercise 2:** Can you write negative criteria that define boundaries? AI writes what works. You define what must be prevented.
- **Exercise 3:** Do you think about regression? Adding features to an existing system is more dangerous than building from scratch because changes ripple.

If you struggled with Exercise 1, make it a habit to test as every user type — not just admin. Log in as Staff, as Contractor, as a regular user, and check what data comes back in the Network tab. If Exercise 2 was hard, start every PR review by asking: "What should this user NOT be able to do?" and write those as acceptance criteria before approving. If Exercise 3 feels overwhelming, keep a simple checklist: after every infrastructure change, test the three most important existing features.
