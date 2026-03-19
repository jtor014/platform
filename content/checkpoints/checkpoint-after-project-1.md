---
title: "Checkpoint: After Project 1"
description: "Self-assessment exercises after completing Project 1"
page_type: "checkpoint"
section: "web-dev"
prev: "/web-dev/projects/1/claude-md"
next: "/web-dev/projects/2"
---
# Judgment Checkpoint: After Project 1

These exercises confirm you can spot problems, not just follow instructions. They're self-assessment — no grades, no scores. If you struggle with one, it tells you which skill to practise more.

---

## Exercise 1: Anti-Scope Detection

Below are three excerpts from PRDs for a small business website. The client brief said: "I need a website that shows my services, some photos of past work, and how to contact me."

**Which excerpt has scope items the client didn't ask for? Identify every feature that's anti-scope.**

**Excerpt A:**
> **Scope:** Homepage with hero section, services list with descriptions and icons, photo gallery of past work (6-8 images), contact section with phone number and email link, responsive design for mobile and desktop.

**Excerpt B:**
> **Scope:** Homepage, services page, portfolio gallery, contact page with a form that saves enquiries to a database, newsletter signup with Mailchimp integration, blog section for monthly updates, Google Analytics tracking, live chat widget for real-time customer support.

**Excerpt C:**
> **Scope:** Single-page site with sections for services (6 items with descriptions), work photos (scrollable gallery), about the owner (short bio and photo), and contact details (phone as tel: link, email as mailto: link). SEO meta tags for local search visibility.

<details>
<summary>Check your answer</summary>

**Excerpt B is the problem.** The client said "show services, photos, and contact info." Excerpt B adds:
- Contact form saving to a database (client said "how to contact me" — phone/email is sufficient)
- Newsletter signup with Mailchimp (never mentioned)
- Blog section (never mentioned)
- Google Analytics tracking (never mentioned)
- Live chat widget (never mentioned)

That's 5 anti-scope features. This is exactly what AI does — assumes a business website needs all of these.

Excerpts A and C are both valid. C includes SEO meta tags, which isn't explicitly in the brief but is reasonable for "show up when people search" — a judgment call. The key test: did the client ask for it or can it be reasonably inferred? SEO for a business site is reasonable. A blog and live chat are not.
</details>

---

## Exercise 2: Design Verification

Below are two descriptions of how a services section was implemented. The design spec says:
- 3 columns on desktop, 1 column on mobile
- Card background: #FFFFFF
- Card border: 1px solid #E5E5DC
- Card border-radius: 8px
- Card padding: 24px
- Heading font-size: 20px
- Body font-size: 16px

**Which implementation has discrepancies? What specifically is wrong?**

**Implementation A:**
Inspected in DevTools:
- Grid: 3 columns at 1024px+, 1 column below 768px
- Card: background #FFFFFF, border 1px solid #E5E5DC, border-radius 8px, padding 24px
- Heading: font-size 20px, font-weight 600
- Body: font-size 16px, line-height 1.6

**Implementation B:**
Inspected in DevTools:
- Grid: 3 columns at 1024px+, 2 columns at 768px, 1 column below 768px
- Card: background #F5F5F5, border none, border-radius 12px, padding 16px
- Heading: font-size 18px, font-weight 700
- Body: font-size 14px, line-height 1.4

<details>
<summary>Check your answer</summary>

**Implementation B has 5 discrepancies:**
1. Card background is #F5F5F5, should be #FFFFFF (slightly grey instead of white)
2. Card has no border, should have 1px solid #E5E5DC
3. Card border-radius is 12px, should be 8px
4. Card padding is 16px, should be 24px
5. Heading font-size is 18px, should be 20px
6. Body font-size is 14px, should be 16px

Implementation A also has a minor difference — the grid shows 2 columns at tablet size, which the spec didn't mention (spec only says 3 desktop, 1 mobile). This is a judgment call: is 2-column at tablet acceptable? Probably yes, but you should note it and decide whether to direct a fix.

The skill here is precision. "It looks roughly right" isn't good enough. You check specific CSS values against the spec.
</details>

---

## Exercise 3: Review Reading

Below is a Gemini review comment on a PR. Read it and decide: **Is this a real issue that needs fixing, or a false positive you can ignore?**

> ⚠️ **Security concern:** The contact section includes an email address rendered as plain text in the HTML (`<a href="mailto:info@greenscape.com.au">info@greenscape.com.au</a>`). This exposes the email address to email harvesting bots that scrape websites for addresses to add to spam lists. Consider using JavaScript-based email obfuscation or a contact form to protect the email address.

<details>
<summary>Check your answer</summary>

**This is a real concern but the recommended fix is wrong.**

The concern is valid — email addresses in plain HTML can be scraped by bots. However:

1. The PRD explicitly says no contact form (anti-scope). Gemini suggested a contact form as a fix, but that contradicts the requirements.
2. JavaScript email obfuscation is a reasonable suggestion but adds complexity for a minor risk. Most modern spam filtering handles this.
3. For a small business website, the risk of email scraping is low and the impact is manageable (some extra spam).

**The right response:** Acknowledge the concern, note it in the retro as a known tradeoff, but don't implement a fix. The PRD says phone and email links. The risk doesn't justify adding complexity or breaking scope.

This is a judgment call — recognising when a review finding is technically valid but not worth acting on. Not every review comment requires a code change.
</details>

---

## What These Exercises Tell You

- **Exercise 1:** Can you spot scope creep? This is the #1 directing skill. If you caught all 5 items in Excerpt B, your anti-scope radar is working.
- **Exercise 2:** Can you verify against a spec with precision? If you caught all the discrepancies, you're ready for design verification in future projects.
- **Exercise 3:** Can you evaluate review feedback critically? If you recognised the concern was valid but the fix was wrong, you're developing review judgment.

If you struggled with any exercise, spend more time on that skill in Project 2. Anti-scope detection gets harder as projects get more complex.
