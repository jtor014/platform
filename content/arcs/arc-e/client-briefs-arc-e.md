---
title: "Client briefs"
description: "Client briefs for Projects 3, 4, and 5"
page_type: "multi-section"
section: "web-dev"
note: "Contains 3 project sections. Each extracted to its own page by the .astro file"
---
# Arc E: Community Directory — Client Briefs

## Project 3: "I Need a Searchable Directory"

> "I run a local business association — about 150 businesses in our area. Right now we have a PDF list on our website that nobody can find anything in. I want a proper searchable directory. Each business has a name, category (restaurant, tradie, retail, health, professional services), address, phone, website, and a short description. People should be able to search by name or keyword, filter by category, and see businesses on a map. I'll enter all the business data myself to start with."

**What the client is actually asking for:**
A searchable directory with category filtering, map view, and admin-managed listings for 150 businesses.

**What will tempt AI to overbuild:**
Elasticsearch (overkill for 150 records), user accounts, business claiming, reviews, messaging, advertising tiers, recommendation engines.

**What to clarify before approving the PRD:**
- Search specification is the critical section: what fields does it match? What matching algorithm? How do filters combine (AND or OR)? What's the no-results state? Performance target?
- PostgreSQL full-text search is sufficient for 150 businesses — push back on Elasticsearch/Algolia
- Map API key stored as environment variable, not in frontend source
- URL-based search state: search results must be shareable via URL

**What to verify personally in the finished product:**
Search for a business by name — found? Search by keyword in description — found? Filter by category — correct results? Search with no results — helpful message? Check search with special characters. Test with 500+ generated fake businesses — still fast?

**Templates to use:** PRD template, architecture template

**Simulated scope change (mid-build):**
"Can we show which businesses are currently open? And can we sort by distance from the user's location?"

**Handling:**
1. **"Currently open" indicator:** Requires opening hours data for 150 businesses × 7 days. Who enters this? Admin alone? That's a data entry problem, not a code problem. Probably anti-scope for Project 3, revisit in Project 4 when businesses manage their own listings
2. **Sort by distance:** Requires browser geolocation permission. What if denied? Fallback to suburb/postcode sort. Geolocation is approximate — don't show "0.3km" when accuracy is ±500m. New ticket, but specify the permission-denied path

---

## Project 4: "Members Should Manage Their Own Listings"

> "The directory is getting traffic and businesses love it. But maintaining 150 listings is killing me — every week someone wants to update their phone number or description, and I have to do it for them. I want businesses to claim their own listing, create an account, and update their own details. They should be able to upload a logo and photos. New businesses should be able to apply to join the directory. But I need to approve new listings before they appear — I don't want spam businesses showing up."

**What the client is actually asking for:**
Business owner accounts, listing self-service (edit details, upload images), new listing applications with admin approval.

**What will tempt AI to overbuild:**
Complex approval workflows, automated verification, premium listing tiers, advertising, analytics per listing.

**What to clarify before approving the PRD:**
- Content safety section required: text limits, allowed characters, XSS sanitisation, image validation
- Image pipeline: accepted formats (no SVG), max 5MB, max 5 per listing, resize on upload, strip EXIF
- Approval workflow: new listings pending, minor edits auto-approve, major edits reviewed
- Claiming mechanism: verify ownership via email to the listed business email, or admin approval

**What to verify personally in the finished product:**
Claim a listing. Update the description. Upload a logo and photos. Apply as a new business — does it go to pending? As admin, approve it — does it appear? Paste `<script>alert('xss')</script>` into the description field — it must NOT execute. Upload a 50MB image — rejected?

**Templates to use:** PRD template, architecture template

**Simulated abuse incidents (after launch):**
1. A listing appears with a competitor's trademarked logo
2. A business uploads 15 high-resolution photos that slow their listing page
3. A "business" applies called "Best Plumber in Town — Call 0400 123 456" — the name field is free advertising

**Handling incident 3:** Content validation gap. Add name field rules: character limits, no phone numbers, no promotional language. New ticket. Retroactively clean existing listings. Communicate content standards to the association.

---

## Project 5: "We Need Reviews and Reputation"

> "The directory is working well — 180 businesses, active community, businesses are keeping their listings updated. Now people are asking: how do I know which plumber is good? I want people to be able to leave reviews — a star rating and a written comment. I need it to be trustworthy though. I've seen other directories full of fake reviews. Can we make it so only people who are real can review, and businesses can't review themselves? And I want businesses to be able to respond to reviews."

**What the client is actually asking for:**
Star ratings + written reviews, one review per business per person, self-review prevention, business responses to reviews.

**What will tempt AI to overbuild:**
Verified purchase badges (no purchases here), AI sentiment analysis, automated fake review detection with ML, review voting/helpfulness.

**What to clarify before approving the PRD:**
- Write the PRD as if every user is trying to game the system
- Review legitimacy rules: account required, one per business, owners can't self-review, minimum text length
- Abuse detection table: same-IP burst, rating burst, new-account reviews, duplicate text
- Flagged reviews EXCLUDED from average rating (not just hidden visually)
- Business response: one per review, same content rules as reviews
- Rating recalculation: if reviews hidden/deleted, average updates. Zero reviews = "No reviews yet" not "0 stars"
- Content policy page needed — flag to client for legal review

**What to verify personally in the finished product:**
Leave a review. Try to review the same business again — blocked? Create a business account and try to review your own business — blocked? Leave 5 reviews from the same IP in 5 minutes — flagged? Check the average rating after hiding a review — does it recalculate? Check the response flow — can a business respond? Can they respond twice?

**Templates to use:** PRD template, architecture template

**Simulated adversarial scenarios (multiple, after launch):**
1. A business creates 10 accounts and gives itself 5-star reviews
2. A competitor leaves five 1-star reviews on a rival business in one day
3. A person leaves a 1-star review saying "John the owner stole from my house" — potentially defamatory
4. A business owner demands "remove that negative review or I'll leave the association"

**Handling scenario 4:** This is governance, not code. Check: does the review violate the content policy? If no, it stays. Communicate: "We remove policy violations. We can't remove honest negative reviews — that undermines trust in the entire directory."
