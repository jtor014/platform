---
title: "Client briefs"
description: "Client briefs for Projects 3, 4, and 5"
page_type: "multi-section"
section: "web-dev"
note: "Contains 3 project sections. Each extracted to its own page by the .astro file"
---
# Arc C: Content Platform — Client Briefs

## Project 3: "Our Writers Need to Publish Without a Developer"

> "The website looks great and people are reading it. But here's the problem — every time we want to publish a new article, we have to ask you to add it. Our committee has four people who write content, and none of them are technical. I need them to be able to log in, write an article, preview it, and publish it — without needing to know anything about code. We also want to be able to save drafts and schedule articles to go live at a specific date and time."

**What the client is actually asking for:**
A simple publishing tool: login for 4 writers, a word-processor-style editor, drafts, scheduled publishing, preview that matches the live site.

**What will tempt AI to overbuild:**
A full CMS framework with plugins, themes, custom layouts, revision history, content workflows with approval chains, SEO tools, analytics dashboards.

**What to clarify before approving the PRD:**
- The "grandmother test": every feature described in the user's language. "Enter the article slug" → "The system generates the URL automatically"
- "Write in Markdown" → "The editor looks like a word processor with bold, italic, and heading buttons"
- Verify the rich text editor library actually exists and is maintained (check npm/GitHub)
- Preview must match the public site exactly — same fonts, same spacing

**What to verify personally in the finished product:**
Log in as a writer. Write an article. Add a heading, bold text, a link. Preview it — does it match the live site? Save as draft. Schedule for tomorrow. Check that it doesn't appear until the scheduled time. Could a non-technical person do all of this without help?

**Templates to use:** PRD template, architecture template

**Simulated scope change (mid-build):**
One of the writers asks: "Can I add images in the middle of my article? And can we have different article layouts — like some with a big header image and some without?"

**Handling:**
1. **Inline images:** Reasonable. New ticket. But specify: how does the writer add the image? What sizes are accepted? Does it auto-resize? The rich text editor may or may not support this natively — check the docs before estimating
2. **Multiple layouts:** Scope boundary. Two options (with/without header image) = manageable boolean toggle. "Different layouts" in general = page builder territory = anti-scope. Explicitly define: "Two layout options: standard and featured. No custom layouts, no drag-and-drop." Put the boundary in the PRD

---

## Project 4: "We Want a Newsletter"

> "Readers love the site. We want to build our email list — a simple 'subscribe for updates' that sends people an email when we publish a new article. Nothing fancy, just title, summary, and a link."

**What the client is actually asking for:**
Subscribe form, double opt-in, and a notification email when articles are published. Title, summary, link.

**What will tempt AI to overbuild:**
Full email marketing platform, A/B testing subject lines, scheduled sends, audience segmentation, unsubscribe analytics, email template builder.

**What to clarify before approving the PRD:**
- Third-party email service — verify AI's recommended API against actual docs
- Double opt-in is mandatory (legal requirement): subscribe → confirmation email → click link → subscribed
- Unsubscribe must be one-click in every email (also legal)
- Rate limiting on the subscribe form: prevent someone entering 1000 addresses
- Edge case: subscribe, unsubscribe, subscribe again — what happens?

**What to verify personally in the finished product:**
Subscribe with a real email. Check your inbox AND spam folder. Click the confirmation link. Publish an article. Does the notification arrive? Click unsubscribe — does it work with one click? Try subscribing from Gmail, Outlook, and Yahoo — deliverability varies.

**Templates to use:** PRD template, architecture template

**Simulated email deliverability incident (after launch):**
A writer publishes an article. The newsletter goes out to 85 subscribers. Three hours later, only 12 people have opened it. The client asks: "Did the emails actually send?"

**Handling:**
1. Check the email service dashboard for delivery stats (sent, delivered, bounced, opened)
2. Ask the client to check their own spam folder
3. Likely cause: new sending domain without DNS authentication (SPF, DKIM, DMARC not configured)
4. Communicate honestly: "Email deliverability from new domains takes time to establish. Here's what we need to configure, and here's the realistic timeline for improvement."

---

## Project 5: "We Want Readers to Engage"

> "The site is getting good traffic — about 500 readers a week. People are discussing our articles on Facebook, but we'd love to keep that conversation on our site. We want readers to be able to leave comments on articles. Oh, and one of our committee members asked if we could have a 'members only' section for committee documents and meeting minutes that the general public can't see."

**What the client is actually asking for:**
Comments on articles (with moderation) and a members-only section for ~12 committee members.

**What will tempt AI to overbuild:**
Full public registration, comment threading, reactions/likes, social sharing, user profiles, gamification. And for the members section: a full permissions system when really there are 12 people who need a password.

**What to clarify before approving the PRD:**
- Abuse-first PRD: define moderation rules BEFORE building comments. What's a violation? Who moderates? What actions exist (hide, delete, ban)? What does the commenter see?
- Comments default to "pending" — moderated by default, not published immediately
- "Members only" means 12 committee members, not public registration. Prevent AI from building a full user registration system
- Content gating: titles visible (discoverable) but content requires login
- Content policy page needed — flag to client that they need legal review. Don't write legal text with AI

**What to verify personally in the finished product:**
Leave a comment — does it appear immediately or go to moderation? Leave a comment with a swear word — does the system catch it? Leave a comment with a link to a scam site — caught? Log out — can you see the members-only article titles but not the content?

**Templates to use:** PRD template, architecture template

**Simulated abuse incident (two weeks after launch):**
Someone posts a comment containing offensive language and a link to a scam website. The client calls: "How do we deal with this?"

**Handling:**
1. Find and hide the comment using moderation tools
2. Assess: ban this commenter's email?
3. Review: would existing spam prevention have caught this? If not, create a ticket
4. Communicate to client: what happened, what was done, what safeguards exist
5. If moderation rules need updating, create follow-up tickets
