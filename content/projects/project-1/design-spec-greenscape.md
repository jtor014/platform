---
title: "Design specification"
description: "Colours, typography, spacing, and section layouts for GreenScape"
page_type: "material"
section: "web-dev"
prev: "/web-dev/projects/1/guide"
next: "/web-dev/projects/1/claude-md"
---
# Design Specification: GreenScape Landscaping Website

This document serves as the design reference for Project 1. In a real project, this would be a Figma file. The student verifies Claude's output against these specifications using browser DevTools.

---

## Design Tokens

### Colours
| Name | Hex | Usage |
|---|---|---|
| Primary | #2D5016 | Headers, buttons, links, accents |
| Primary Light | #4A7A2E | Button hover states |
| Secondary | #8B6914 | Star ratings, highlights, secondary accents |
| Background | #FAFAF5 | Page background |
| Card Background | #FFFFFF | Card and section backgrounds |
| Text | #1A1A1A | Body text |
| Text Light | #555555 | Secondary text, descriptions |
| Border | #E5E5DC | Card borders, dividers |
| Error | #D32F2F | Error messages (not used in this project) |
| Success | #2D5016 | Success states (same as primary) |

### Typography
| Element | Font | Weight | Size | Line Height | Colour |
|---|---|---|---|---|---|
| H1 (hero) | Inter | 700 (bold) | 48px / 36px mobile | 1.2 | #1A1A1A |
| H2 (section titles) | Inter | 700 (bold) | 32px / 24px mobile | 1.3 | #1A1A1A |
| H3 (card titles) | Inter | 600 (semibold) | 20px / 18px mobile | 1.4 | #1A1A1A |
| Body | Inter | 400 (regular) | 16px | 1.6 | #1A1A1A |
| Body small | Inter | 400 (regular) | 14px | 1.5 | #555555 |
| Navigation | Inter | 500 (medium) | 16px | 1 | #1A1A1A |
| Button | Inter | 600 (semibold) | 16px | 1 | #FFFFFF |

### Spacing
| Name | Value | Usage |
|---|---|---|
| Base | 8px | All spacing is multiples of 8px |
| Section padding (vertical) | 80px / 48px mobile | Space between sections |
| Section padding (horizontal) | 24px | Side padding on all screen sizes |
| Card padding | 24px | Inside cards |
| Element gap (small) | 8px | Between closely related elements |
| Element gap (medium) | 16px | Between elements within a section |
| Element gap (large) | 24px | Between cards in a grid |
| Max content width | 1200px | Content doesn't stretch wider than this |

### Components

**Buttons**
- Primary: Background #2D5016, text #FFFFFF, padding 12px 24px, border-radius 6px, font-weight 600
- Primary hover: Background #4A7A2E
- Disabled: Background #CCCCCC, text #666666

**Cards**
- Background #FFFFFF, border 1px solid #E5E5DC, border-radius 8px, padding 24px
- Shadow: 0 2px 4px rgba(0,0,0,0.05)
- Hover: shadow 0 4px 8px rgba(0,0,0,0.1) with 200ms transition

**Star Ratings**
- Colour: #8B6914 (secondary/gold)
- Size: 20px
- Filled stars only (all testimonials are 5 stars)

---

## Page Layout

### Overall Structure
```
[Sticky Header]
[Hero Section]
[Services Section]
[Service Area Section]
[Testimonials Section]
[About Section]
[Contact Section]
[Footer]
```

All sections are full-width with content constrained to max 1200px, centred.

---

### Header (Sticky)
- Height: 64px
- Background: #FFFFFF with bottom border 1px #E5E5DC
- Sticks to top on scroll (z-index above all content)
- Left: Business name "GreenScape" in primary colour, font-weight 700, size 20px
- Right: Navigation links — Services | Area | Testimonials | About | Contact
- Mobile: Navigation collapses to hamburger icon (3 horizontal lines). Tap opens a full-width dropdown with links stacked vertically

### Hero Section
- Full-width background: gradient from #2D5016 (left) to #4A7A2E (right), or a landscape photo with dark overlay
- Padding: 120px vertical / 64px mobile
- Content centred:
  - H1: "Professional Landscaping in Melbourne's Inner North"
  - Subtitle: "Garden design, lawn care, and landscaping services for homes and businesses" (body text, #FFFFFF or light colour)
  - CTA button: "Get in Touch" — scrolls to Contact section
- Text is white on the dark background

### Services Section
- Background: #FAFAF5
- H2: "Our Services" centred
- 6 service cards in a grid:
  - Desktop: 3 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- Each card:
  - Icon area (48×48px, placeholder circle in primary colour)
  - H3: Service name
  - Body text: 2-3 sentence description
  - Card component styling (white background, border, shadow)

### Service Area Section
- Background: #FFFFFF
- H2: "Where We Work" centred
- Subtitle: "Servicing Melbourne's inner north and surrounding suburbs"
- Suburb list displayed as pills/tags (inline, wrapping): Northcote, Fitzroy, Collingwood, Carlton, Brunswick, Thornbury, Preston, Fairfield, Alphington, Ivanhoe
- Pill styling: background #F0F0EA, border-radius 20px, padding 8px 16px, font-size 14px

### Testimonials Section
- Background: #FAFAF5
- H2: "What Our Clients Say" centred
- 4 testimonial cards:
  - Desktop: 2 columns
  - Mobile: 1 column
- Each card:
  - 5 gold stars at top
  - Quote text in italics with quotation marks
  - Client name (bold) and suburb (regular) below the quote
  - Card has a subtle left border in primary colour (4px, #2D5016)

### About Section
- Background: #FFFFFF
- Two-column layout on desktop (image left, text right), single column on mobile
- Left: Photo placeholder (grey rectangle with rounded corners, 400×400px)
- Right:
  - H2: "About GreenScape"
  - 2-3 paragraphs of bio text
  - Body text max-width 600px for readability

### Contact Section
- Background: #2D5016 (primary, dark)
- Text colour: #FFFFFF
- H2: "Get in Touch" centred
- Content in two columns on desktop, stacked on mobile:
  - Left: Phone, email, address, business hours
  - Right: "Ready to transform your garden?" text + CTA button (white background, primary text)
- Phone: displayed with a phone icon, clickable `tel:` link
- Email: displayed with an email icon, clickable `mailto:` link

### Footer
- Background: #1A1A1A
- Text: #AAAAAA, size 14px
- Centred: "© 2026 GreenScape Landscaping. All rights reserved."
- Padding: 24px vertical

---

## Responsive Breakpoints

| Name | Width | Grid columns |
|---|---|---|
| Mobile | < 768px | 1 column |
| Tablet | 768px – 1023px | 2 columns |
| Desktop | ≥ 1024px | 2-3 columns (varies by section) |

---

## How to Verify Against This Spec

1. **Colours:** Right-click any element → Inspect → check the colour values in the Styles panel
2. **Font sizes:** Inspect → check `font-size` in the Computed panel
3. **Spacing:** Inspect → hover over elements to see the box model (margin, padding)
4. **Responsive:** DevTools → toggle device toolbar (Ctrl+Shift+M) → select iPhone, iPad, desktop widths
5. **Max width:** Inspect the main content container → check `max-width` is 1200px
6. **Sticky header:** Scroll down → header stays at top
7. **Navigation:** Click each nav link → page scrolls to the correct section
