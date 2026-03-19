# Web Dev Arc E: The Community Directory — Blueprint

## Overview

**The client:** A professional network, local business directory, community association, industry body, or marketplace connecting people.

**The arc:** Searchable directory → self-service listings with user-generated content → reviews and reputation.

**Why this arc:** Arcs A-D build products where the business controls the data. Arc E is the first arc where **the users create the data.** This fundamentally changes the directing challenge. When users create listings, upload images, and write reviews, you can't trust anything — and the student must direct AI to handle that distrust systematically.

The first unique challenge is **search.** Search appears simple but is the domain where AI gives the most confidently wrong answers. Claude will implement a basic LIKE query that works for 10 listings and fails at 1,000.

The second unique challenge is **user-generated content at scale.** Every input is untrusted. Every image might be inappropriate. Every listing might be spam.

The third challenge is **trust and reputation systems.** Reviews are where human behaviour is most adversarial: fake reviews, review bombing, self-reviews, revenge reviews.

**This document covers Projects 3-6 in Arc E context.** For Projects 1 and 2, see `web-dev-project-1-blueprint.md` and `web-dev-project-2-blueprint.md`.

**No Project 1 variant.** Directories inherently need a backend from the start.

---

## The Student Arrives With

After completing Projects 1 and 2, the student has:

- **18 ticket cycles completed** — the loop is familiar
- **Two PRDs read and annotated** — they understand PRD structure and anti-scope
- **One flawed PRD repaired**
- **Design and functional verification skills** — DevTools, Network tab, database shell
- **The full technical stack running**
- **Two judgment checkpoints passed**

They have NOT yet:
- Specified search behaviour with precision (matching logic, filters, edge cases, performance)
- Handled untrusted user input (XSS, file upload security, content moderation)
- Built approval workflows for user-generated content
- Designed adversarial trust systems (abuse detection, gaming prevention)
- Tested by trying to attack their own system
- Handled stakeholder pressure to compromise system integrity

---

## The Arc-Specific Flawed PRD (For the Bridge)

The brief it was generated from: "I need a directory where people can find local businesses."

**The flaws the student must find and fix:**

1. **Scope creep:** The AI added business owner accounts, self-service listings, reviews, messaging between users, advertising tiers, and premium placements. The client wants a searchable directory managed by the admin.
2. **Vague search specification:** "The directory is searchable" — not a spec. Must specify: what fields are searched, what matching logic, how filters combine, what happens with no results, how results are ranked.
3. **Missing anti-scope:** No anti-scope. Student must add: no user accounts (yet), no reviews (yet), no messaging, no advertising, no payment.
4. **Over-engineered search:** AI recommended Elasticsearch and Algolia for a 150-business directory. PostgreSQL full-text search is sufficient.
5. **Missing scale consideration:** No acceptance criteria for performance. Student must add: "Search returns results within 500ms for any query against the full dataset."
6. **Missing edge cases:** No criteria for special characters in business names, empty categories, or what happens when search returns 100+ results (pagination).

---

## Project 3: "I Need a Searchable Directory"

### The Client Brief

> "I run a local business association — about 150 businesses. Right now we have a PDF list on our website that nobody can find anything in. I want a proper searchable directory. Each business has a name, category, address, phone, website, and a short description. People should be able to search by name or keyword, filter by category, and see businesses on a map. I'll enter all the business data myself to start with."

> **The scope creep moment (simulated):** "Can we show which businesses are currently open? And can we sort by distance from the user's location?"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | First encounter with search as a core feature |
| All planning templates | PRD, architecture, design, CLAUDE.md |
| The repaired flawed PRD | Student just fixed vague search specs and over-engineered architecture |
| **Sample data** | CSV of 150 businesses with realistic edge cases: special characters, long descriptions, missing fields, duplicates |
| **Critical warning** | "Search is where AI is most confidently wrong. Claude will recommend a search that works for 10 records and breaks at 500+." |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Generates** — the search specification must be precise (fields, matching, filters, empty state, ranking, performance) |
| Architecture template | **Generates** — search implementation decision: LIKE vs full-text vs external service |
| Design template | **Generates** — search bar prominence, filter UX, results layout, empty state |
| CLAUDE.md template | **Generates** — search specification rules, data validation requirements |
| Sprint retro template | **First formal use** |

### The Planning Phase

**The search specification PRD:**
The defining planning challenge. The student pushes for precision:

| Question | What the Student Must Specify |
|---|---|
| What fields are searched? | Business name and description. NOT category (that's a filter) |
| What matching logic? | Partial match, case-insensitive. "Plumb" matches "Plumber" and "A1 Plumbing" |
| How do search + filters combine? | Search text AND category filter |
| No results? | "No businesses found" with suggestion to broaden search |
| Result ordering? | By relevance to query. If no query (browsing), alphabetical |
| Performance? | Results within 500ms for any query against full dataset |
| Special characters? | "O'Brien's Café" findable by "obriens cafe" |

**The search architecture:**
- SQL LIKE: simplest, slow at 5,000, no relevance ranking. Acceptable for 150.
- PostgreSQL full-text search (tsvector): built in, handles relevance and partial matching. Good choice.
- External service (Algolia, Meilisearch): over-engineered for 150 listings.

The student evaluates against the brief. The flawed PRD exercise already caught over-engineering — they should be skeptical.

**The map integration:**
Requires a mapping library and an API key. Student verifies: library exists? Free tier sufficient? API key stored as environment variable, not hardcoded in frontend JavaScript? Fallback if map fails to load?

### The Tickets

1. **Project Setup** — repo, CLAUDE.md, Docker Compose, CI
2. **Business Schema & Seed Data** — businesses table, import 150-business CSV
3. **Search API** — search endpoint with query string and optional category filter. Full-text search
4. **Category Filter API** — list categories with business count. Filter by category
5. **Directory Listing Page** — search bar, category pills, business cards (name, category, description, phone)
6. **Search UX** — real-time search (debounced). Loading indicator. No-results state. URL updates with query (shareable)
7. **Business Detail Page** — full description, contact, address, website, map showing location
8. **Map View** — all businesses on a map. Click pin for name/category. Cluster when zoomed out
9. **Admin: Business Management** — add/edit/delete businesses. Geocode address on save
10. **Search Edge Cases** — test and fix: special characters, long descriptions, missing fields, duplicate names, whitespace-only search
11. **"Open now" display** — (scope addition) open/closed status from business hours
12. **Distance sorting** — (scope addition) sort by distance from user location (browser geolocation)

### Key Directing Moments

**The search quality test:**
The student tests beyond the happy path:
- "plumb" → matches "Joe's Plumbing", "A1 Plumber"?
- "O'Brien" → matches "O'Brien's Café"?
- "café" → matches "cafe"?
- "the" → ranked by relevance, not every business equally?
- "xyznonexistent" → no-results state, not error?
- Empty query + category filter → all businesses in category?
- 3 characters → should it search? (Minimum query length)

Claude builds search that passes the first 2-3. The comprehensive test list catches edge cases.

**The "works at 10, breaks at 1,000" test:**
Student directs Claude to generate 500-1,000 fake businesses and runs search. If results take 3 seconds, the implementation needs improvement. "Works in demo" vs "works in production."

**The map API key management:**
Key stored as environment variable, not in frontend source. HTTP referrer restrictions. Fallback if map fails. Free tier limits known.

**The URL-based search state:**
Search "plumber" with category "Tradie" → URL updates to `/directory?q=plumber&category=tradie`. Shareable, back button works, bookmarkable. AI frequently implements search as client-side state only (URL doesn't change).

### What Can Go Wrong

- Case-sensitive search — "plumber" doesn't match "Plumber"
- Partial matching fails — "plumb" returns nothing
- Map API key visible in page source — security issue
- Special characters break search query (potential SQL injection)
- No-results shows blank page instead of helpful message
- Geocoding fails for some addresses — no map pin
- Category counts don't update when search is active

### Sprint Retro

- How detailed was the search specification?
- Did the scale test reveal performance issues?
- Was the map API key properly managed?
- How did search + filter combination testing go?

### Technical Context (Discovered Along the Way)

- **Full-text search:** Why LIKE isn't real search. Tokenisation, relevance, stemming
- **Geocoding:** Address → latitude/longitude. API services
- **Map integration:** Interactive maps, pins, clusters, tile servers
- **API key security:** Frontend keys need restrictions. Environment variables
- **URL query parameters:** Encoding state in the URL. Shareable links
- **Debouncing:** Don't send a request on every keystroke

---

## Project 4: "Members Should Manage Their Own Listings"

### The Client Brief

> "Maintaining 150 listings is killing me — every week someone wants to update their phone number. I want businesses to claim their own listing, create an account, and update their own details. They should be able to upload a logo and photos. New businesses can apply to join. But I need to approve new listings before they appear — I don't want spam."

> **The abuse scenario (simulated):** A listing appears with a competitor's trademarked logo. Another business uploads 15 high-resolution photos that slow their page to a crawl.

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | User-generated content with all its risks |
| All templates | Student extends for content safety |
| The existing codebase from Project 3 | Working directory with search and map |
| **Critical framing** | "Every piece of user-submitted content is untrusted. Every text field can contain malicious input. Every image can be inappropriate, oversized, or not an image at all." |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Adapts** — adds "Content Safety" section: what can users submit, limits, approval flow, violation handling |
| Architecture template | **Adapts** — image storage (not in database), validation (type, size, dimensions), serving (optimised) |
| Component spec template | **First use** — listing edit form, image upload with preview/crop/limits, status badges (pending/approved/flagged) |

### The Planning Phase

**The content safety PRD:**
Like Arc C's "abuse-first" approach. Must specify:

**Text content:** Maximum lengths. Allowed characters. Input sanitisation (XSS prevention). SEO spam handling.

**Image content:** Accepted formats (JPEG, PNG, WebP — no SVG which can contain scripts). Max 5MB per image. Max 5 images per listing. Resize on upload to max 1200px. EXIF data stripped (privacy — GPS coordinates).

**Listing approval:** New listings pending until admin approves. Minor edits (phone) auto-approve. Major edits (description, images) require review.

**Account security:** Business owners create accounts. Claiming mechanism — verify ownership (email to listed business email or admin approval).

### The Tickets

1. **Business Owner Accounts** — registration, login, password reset
2. **Listing Claim Flow** — request claim, verification email, admin approval fallback
3. **Listing Edit Interface** — edit all fields with validation and character limits
4. **Image Upload** — client-side validation (type, size). Server-side validation (re-check, resize, strip EXIF). Preview
5. **Image Storage & Serving** — stored outside database. Served optimised. Lazy-loaded
6. **New Listing Application** — form with all fields + images. Goes to "pending"
7. **Admin: Approval Queue** — pending listings and flagged existing. Approve/reject with reason. Notification
8. **Edit Approval Rules** — minor edits auto-approve. Major edits go to review. Admin sees diff
9. **Input Sanitisation** — all text fields sanitised for XSS. Tested with `<script>alert('xss')</script>` in every field
10. **Content Limits** — character limits, image count limits, file size enforcement. Graceful errors
11. **Listing Privacy Settings** — owner chooses: show email/phone/address publicly or not
12. **Flagging & Reporting** — any user can flag a listing. Admin sees flag with reason. Dismiss/request changes/suspend

### Key Directing Moments

**The XSS test:**
The student personally verifies input sanitisation:
1. Enter `<script>alert('hacked')</script>` in business name
2. Save the listing
3. View on public directory
4. If JavaScript alert pops up — XSS vulnerability

More subtle: `<img src=x onerror=alert('xss')>` in description. `javascript:alert('xss')` in website URL. The student doesn't need to be a security expert — they need to know these test patterns.

**The image upload verification chain:**
1. Upload 10MB JPEG → rejects?
2. Upload .svg → rejects?
3. Upload 4000px JPEG → resized to 1200px?
4. Upload JPEG with GPS EXIF → EXIF stripped?
5. Upload 6 images (limit 5) → prevents 6th?
6. Upload renamed PDF as .jpg → server catches magic bytes?

**The approval workflow test:**
Full lifecycle: edit description → goes to review? Edit phone → auto-approves? New application → pending? Admin approves → appears? Admin rejects → owner notified with reason?

**The "two people claim the same business":**
Business A is unclaimed. Person X claims. While pending, Person Y also claims. What happens? Second claim queued? Admin sees both? This must be specified.

### What Can Go Wrong

- Client-side-only image validation — bypassed via direct API request
- Input sanitisation strips HTML but not JavaScript in URL fields
- EXIF data not stripped — photos contain GPS coordinates
- All edits require review — admin overwhelmed with phone number changes
- Images stored in database as base64 — kills performance at scale
- Missing authorisation check on edit endpoint — wrong user can edit any listing
- Flagging allows no-reason flags — floods admin with unhelpful reports

### Sprint Retro

- Did content safety section catch real abuse scenarios?
- Were XSS tests comprehensive?
- How did image pipeline verification go?
- Was approval workflow smooth for admin?

### Technical Context (Discovered Along the Way)

- **XSS:** User input rendered as code. Why sanitisation matters
- **Input sanitisation:** Server-side, not just client-side
- **File upload security:** Check magic bytes, not just extensions
- **EXIF data:** Metadata in photos — camera, GPS. Privacy implications
- **Image optimisation:** Resize, compress, format conversion on upload
- **Content moderation workflows:** Pending → approved → flagged → suspended
- **Claiming/verification:** Proving ownership of a listing

---

## Project 5: "We Need Reviews and Reputation"

### The Client Brief

> "The directory is working well — 180 businesses, active community. Now people are asking: how do I know which plumber is good? I want people to leave reviews — a star rating and a comment. I need it to be trustworthy though. I've seen other directories full of fake reviews. Can we make it so only real people can review, and businesses can't review themselves? Businesses should be able to respond to reviews."

> **The adversarial scenarios (simulated, multiple):**
> 1. A business creates 10 accounts and gives itself 5-star reviews
> 2. A competitor leaves five 1-star reviews on a rival in one day
> 3. A review says "John the owner stole from my house" — potentially defamatory
> 4. A business owner demands "remove that negative review or I'll leave the association"

### What's Provided

| Material | What It Is |
|---|---|
| Client brief | The most adversarial directing challenge in any web dev arc |
| All templates | Student extends for adversarial design |
| The existing codebase from Projects 3-4 | Directory with search, listings, claiming |
| **Critical framing** | "The PRD must be written as if every user is trying to game the system, because some will be." |

### Template Usage

| Template | Relationship |
|---|---|
| PRD template | **Extends** — adds "Trust & Integrity" section: what makes a review legitimate, what's abuse, what safeguards prevent gaming |
| Architecture template | **Extends** — reviewer identity verification, abuse pattern detection |
| Component spec template | **Multiple** — review card, star rating, review summary histogram, moderation interface |

### The Planning Phase

**The adversarial PRD:**
The most challenging PRD in any web dev arc. For every feature: "How would someone game this?"

**Review legitimacy rules:**

| Rule | Why |
|---|---|
| Account required (email verified) | Prevents anonymous fakes |
| One review per business per reviewer | Prevents 10 fake reviews from one account |
| Owners can't review own business | Cross-reference account ownership |
| Minimum 20 characters text | Prevents "5 star" with no substance |
| Star rating required (1-5) | Quantitative component |
| Businesses can respond (one per review) | Fair right of reply |

**Abuse detection rules:**

| Pattern | Detection | Action |
|---|---|---|
| Same IP, multiple reviews, one business | Log IP per review | Hold for admin review |
| >3 five-star reviews in one day | Count per business per day | Flag business |
| >3 one-star reviews in one day | Same pattern | Flag reviews — possible attack |
| Review from account created today | Account age check | Flag review |
| Same text on multiple businesses | Text similarity | Auto-reject |

AI will not produce these tables. The student creates them.

### The Tickets

1. **Reviewer Accounts** — separate registration for reviewers. Email verification. Display name, member-since date
2. **Review Schema & API** — reviews table (business_id, reviewer_id, rating, text, status). Legitimacy checks on create
3. **Review Display** — reviews on business detail page. Star rating, text, reviewer name, date. Most recent first
4. **Review Summary** — average rating on listing cards. Rating distribution histogram on detail page
5. **Review Form** — star selector, text area (min 20, max 500), content policy checkbox. Validates: one per business, not own business
6. **Business Response** — owner replies to review. One response per review. Displayed below
7. **Self-Review Prevention** — cross-reference reviewer email/account with business owner. Block with explanation
8. **Abuse Pattern Detection** — log IP, flag burst reviews, new-account reviews, duplicate text. Flagged → admin review
9. **Review Moderation** — admin sees flagged reviews with pattern data. Approve/hide/delete. Notification to reviewer if hidden
10. **Review Dispute Process** — owner disputes a review. Admin sees both sides. Dismiss/hide/request edit
11. **Rating Integrity** — hidden/deleted reviews excluded from average. All hidden → "No reviews yet" not "0 stars"
12. **Content Policy & Terms** — review guidelines page. Linked from review form

### Key Directing Moments

**The self-review prevention test:**
Log in as business owner. Navigate to own listing. Try to review — blocked? But: log in with a different email and review your own business? (Same-email catches obvious, but same-person-different-email requires pattern detection.)

**The review bombing simulation:**
Create 5 reviewer accounts with different emails. Leave 1-star reviews on same business within an hour. Does abuse detection flag these? Does admin see pattern data? Are flagged reviews excluded from the average?

**The defamatory review response:**
"John stole from my house" — legal, not technical. The student:
1. Recognises this is a policy issue
2. Tests the dispute process
3. Flags to client that a real content policy (reviewed by legal) is needed
4. Does NOT direct Claude to write legal text

**The "remove the negative review" pressure:**
Business owner threatens to leave the association. The student:
1. Checks: does the review violate the content policy?
2. If no, it stays
3. Communicates: "We remove policy violations. We can't remove honest negative reviews — that would undermine trust in the entire directory."

Stakeholder management, not code.

**The rating recalculation test:**
10 reviews, average 4.2. Admin hides 2 (flagged as fake). Average recalculates from remaining 8. If hidden reviews were fake 5-stars, real average is lower. All reviews hidden → "No reviews yet" not "0 stars."

### What Can Go Wrong

- Self-review check only matches exact emails, not account IDs
- Abuse detection flags legitimate reviews (threshold too aggressive — two reviews from same office IP)
- Flagged reviews still in average rating — tanked by attack reviews
- Business response allows unlimited back-and-forth arguments
- Dispute process has no notification — owner disputes and never hears back
- Review text not sanitised — XSS in a new input point
- Rating displays "NaN" for zero-review businesses (division by zero)

### Sprint Retro (Final for Arc E)

- How effective was the adversarial PRD?
- Were simulated attack scenarios handled?
- How did stakeholder pressure feel?
- Were there unanticipated abuse patterns?
- Full arc retrospective: trust and safety vs Arc C's content moderation — what's harder?

---

## Project 6: "It Needs to Be Reliable"

Project 6 follows the same structure across all arcs — see Arc A's Project 6 for the full blueprint.

**Arc E-specific operational concerns:**
- Review integrity monitoring — alerts if review patterns suggest coordinated attack
- Search performance monitoring — alerts if search response time exceeds threshold
- Image storage monitoring — disk usage, upload rate anomalies
- User data in privacy audit — reviewer accounts, commenter emails, business owner PII
- Abuse detection tuning — regular review of false positive and false negative rates

---

## Summary

| Project | Client Says | Tickets | Primary Directing Challenge |
|---|---|---|---|
| 3 | "Searchable directory" | 10-12 | Search specification precision. Scale testing. Map API management |
| 4 | "Members manage listings" | 10-12 | UGC safety. XSS prevention. Image pipeline. Approval workflows |
| 5 | "Reviews and reputation" | 10-12 | Adversarial PRD. Abuse detection. Trust integrity. Stakeholder pressure |
| 6 | "It needs to be reliable" | 11-13 | Operational + review integrity monitoring + search performance |
| **Arc Total** | | **41-49** | |
| **With Projects 1-2** | | **~59-67** | **Search, user-generated content safety, trust and reputation** |

### How Arc E Differs from All Other Arcs

| Dimension | Arc A | Arc B | Arc C | Arc D | Arc E |
|---|---|---|---|---|---|
| Primary verification | Visual | Numerical | Invisible (SEO) | Physical | **Adversarial (gaming)** |
| Data created by | Business | Business | Organisation | Organisation | **Users** |
| Trust assumption | Trusted | Trusted | Moderated | Trusted | **Untrusted everything** |
| AI's weakness | Adding features | Hallucinating APIs | Over-engineering | Date/time | **Assuming good faith** |
| Testing requires | Browser | Browser + Stripe | Browser + source | Browser + phone + offline | **Browser + attack mindset** |
| Stakeholder challenge | Technical risk | Financial discrepancy | Moderation policy | Offline constraints | **"Remove that review"** |

A student who completes Arc E has practised the most adversarial thinking of any arc — PRDs that assume gaming, search at scale, XSS testing, abuse detection for fake reviews, and handling stakeholder pressure to compromise integrity. Directing skills that require thinking like an attacker and a policymaker, not just a builder.
