---
title: "Design template"
description: "Design system and wireframes"
page_type: "template"
section: "templates"
group: "planning"
---
# Design Template

Use this template by pasting it into conversational AI along with the approved PRD. The design must serve the PRD scope — no visual elements for features not in scope.

---

## Instructions for AI

I need you to produce wireframes and a basic design system based on the approved PRD. Describe each screen in enough detail that a developer (or AI) could implement it. Do not add UI elements for features not in the PRD scope.

---

## 1. Design System

### Colours
- Primary: [hex]
- Secondary: [hex]
- Background: [hex]
- Text: [hex]
- Error: [hex]
- Success: [hex]

### Typography
- Headings font: [font name]
- Body font: [font name]
- Body size: [size]
- Line height: [ratio]
- Maximum content width: [px] (for readable line length)

### Spacing
- Base unit: [px] (all spacing is multiples of this)
- Section padding: [units]
- Card padding: [units]
- Element gap: [units]

### Components
- Buttons: [describe styles for primary, secondary, disabled]
- Form inputs: [describe styles for default, focus, error, disabled]
- Cards: [describe style — border, shadow, radius, padding]

## 2. Page Wireframes

For each page in the PRD, describe:
- **Page name and URL path**
- **Layout:** header, main content areas, sidebar (if any), footer
- **Content blocks:** what appears in each area, in order from top to bottom
- **Responsive behaviour:** how it adapts from desktop → tablet → mobile
- **States:** loading, empty, error (what does the page look like with no data?)

## 3. Key Interactions

For each interactive element:
- **What triggers it:** click, hover, submit, scroll
- **What happens:** animation, navigation, state change, API call
- **Feedback:** what the user sees while waiting (loading spinner, skeleton, progress bar)
- **Error state:** what happens if it fails

---

## After AI Generates the Design — Review Checklist

- [ ] Every screen traces to a PRD feature
- [ ] No UI elements for anti-scope features (no login button if auth is anti-scope)
- [ ] Responsive behaviour specified for every page
- [ ] Empty, loading, and error states defined
- [ ] Design is simple enough for the target user (would the client's end users understand it?)
