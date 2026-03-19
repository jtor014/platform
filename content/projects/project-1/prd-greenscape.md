---
title: "PRD: GreenScape Landscaping"
description: "Product requirements for the static business website"
page_type: "material"
section: "web-dev"
prev: "/web-dev/projects/1"
next: "/web-dev/projects/1/backlog"
---
# PRD: GreenScape Landscaping — Business Website

## Executive Summary

Build a professional website for GreenScape Landscaping, a small landscaping business in Melbourne. The site showcases services, displays past work, shares client testimonials, and provides contact information. This replaces word-of-mouth as the primary way new customers discover the business.

## Problem Statement

The owner currently gets all work through word-of-mouth referrals. There's no online presence — no way for potential customers to see the quality of work, understand what services are available, or confirm the business is legitimate. When someone searches for landscapers in the area, GreenScape doesn't appear.

## Target Users

| User | Who They Are | What They Need | Access |
|---|---|---|---|
| Potential customer | Homeowner searching for a landscaper. May be on their phone. Not technical | See services, view past work, read testimonials, make contact | Mobile and desktop browser |
| Business owner | The client. Uses the site to direct potential customers to | A professional online presence that represents the business accurately | Views the site on their phone to show prospective clients |

## Scope — What We're Building

### 1. Homepage
The first thing visitors see. Establishes credibility immediately.
- Hero section with business name, tagline, and a professional landscape photo
- Brief introduction (2-3 sentences about the business)
- Links/navigation to all other sections
- **Acceptance criteria:**
  - Page loads in under 3 seconds on a mobile connection
  - Hero image is optimised (under 200KB, lazy-loaded if below the fold)
  - All navigation links work and scroll to the correct section

### 2. Services Section
Shows what GreenScape does.
- Service cards displaying: service name, brief description, an icon or image
- Services: Garden Design, Lawn Care & Mowing, Landscaping & Paving, Hedge Trimming, Garden Clean-ups, Irrigation Systems
- **Acceptance criteria:**
  - All 6 services are displayed with name, description, and visual element
  - Cards are readable on mobile (single column) and desktop (2-3 column grid)
  - No service card is cut off or requires horizontal scrolling on any device

### 3. Service Area
Shows where GreenScape operates.
- Text listing of suburbs served: Northcote, Fitzroy, Collingwood, Carlton, Brunswick, Thornbury, Preston, Fairfield, Alphington, Ivanhoe
- Optional: simple map showing the area
- **Acceptance criteria:**
  - All suburbs are listed
  - Text is readable without zooming on mobile

### 4. Testimonials
Social proof from past clients.
- 4 client testimonials with: quote text, client first name and suburb, star rating (all 5 stars)
- **Acceptance criteria:**
  - All 4 testimonials are displayed with name, suburb, quote, and rating
  - Testimonials are visually distinct from other content (different background or card style)
  - Quotes are wrapped in proper quotation marks

### 5. About Section
Personal touch — who is the business owner.
- Photo placeholder (or actual photo if provided)
- 2-3 paragraphs about the owner: experience, values, qualifications
- **Acceptance criteria:**
  - About section includes photo area and text
  - Text is readable (proper line length, not full-width on desktop)

### 6. Contact Section
How to get in touch.
- Phone number (clickable on mobile — `tel:` link)
- Email address (clickable — `mailto:` link)
- Physical address or general location
- Business hours
- **Acceptance criteria:**
  - Phone number opens the dialer when tapped on mobile
  - Email opens the default email client when clicked
  - Contact information is accurate (matches the brief)

### 7. SEO & Meta
The client said "show up when people search online."
- Unique page title including "Landscaping" and "Melbourne"
- Meta description (150-160 characters)
- Open Graph tags (title, description, image) for social sharing
- Semantic HTML throughout (proper heading hierarchy, nav, main, footer)
- **Acceptance criteria:**
  - View Page Source shows a `<title>` tag containing "landscaping" and "Melbourne"
  - View Page Source shows a `<meta name="description">` tag with a unique description
  - Open Graph tags are present (og:title, og:description, og:image)
  - Only one `<h1>` per page
  - Lighthouse SEO score above 90

## Anti-Scope — What We're NOT Building

- **No booking system** — customers call or email to book
- **No contact form** — no form that submits data to a server. Phone and email links only
- **No user accounts or login** — no admin panel, no CMS
- **No blog or news section**
- **No database or backend** — this is a static site
- **No social media feed** — just links to social profiles if they exist
- **No newsletter signup**
- **No live chat or chatbot**
- **No e-commerce or payment** — no online quotes, no pricing calculator
- **No image gallery or portfolio page** — testimonials provide social proof for now

## User Stories

- As a potential customer, I want to see what services are available so I can check if the business does what I need
- As a potential customer, I want to read testimonials so I can trust the business before calling
- As a potential customer, I want to tap the phone number on my mobile so I can call without retyping the number
- As a potential customer, I want to see the service area so I know if they work in my suburb
- As the business owner, I want a professional-looking site so I can send the URL to potential clients with confidence

## Success Metrics

- Page loads in under 3 seconds on 4G mobile connection
- Lighthouse performance score above 80
- Lighthouse SEO score above 90
- All content from the brief is present and accurate
- Site is responsive — usable on phone, tablet, and desktop
- Deployed to a live URL accessible by anyone

## Technical Constraints

- Static site (no backend, no database)
- React + Vite + Tailwind CSS
- Deployed to Netlify (free tier)
- Must work in Chrome, Firefox, Safari, and Edge
- Must be accessible (proper heading structure, alt text on images, sufficient colour contrast)

## Open Questions

- Does the client have a logo? (Use text-based logo if not)
- Does the client have photos of past work? (Use placeholder images if not)
- Does the client want specific colours? (Design will propose a palette based on landscaping/nature themes if not specified)
