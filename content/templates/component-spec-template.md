---
title: "Component spec template"
description: "UI component states and props"
page_type: "template"
section: "templates"
group: "build"
---
# Component Spec Template

Use this template to define reusable UI components before Claude builds them. A well-specified component produces consistent results across the application. A vague one produces a different implementation every time Claude encounters it.

**When to use this template:** Only for components that appear on 3+ pages or have complex state (loading, error, empty, populated). Don't spec a component before you know it's reused — if it only appears once, just describe it in the ticket's acceptance criteria.

**When this template is overkill:** A simple card that displays a title and description doesn't need a full component spec. A complex form with validation, error states, loading states, and conditional fields probably does. Use judgment — the goal is consistency, not documentation for its own sake.

---

## Instructions for AI

I need you to produce a component specification for [component name]. Define every visual state, every prop/input, every interaction. The spec must be specific enough that the component looks and behaves identically every time it's used in the application.

---

## Component: [Name]

### Purpose
What does this component do? Where is it used? (List every page/context it appears in.)

### Visual States

For each state, describe exactly what the user sees:

| State | Appearance | When It Occurs |
|---|---|---|
| Default | [describe] | Normal display |
| Hover | [describe] | Mouse over (desktop only) |
| Active/Pressed | [describe] | During click/tap |
| Loading | [describe] | Waiting for data |
| Empty | [describe] | No data to display |
| Error | [describe] | Something went wrong |
| Disabled | [describe] | Action not available |
| Success | [describe] | Action completed |

Delete states that don't apply. Add states if needed (e.g., selected, expanded, collapsed).

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| [name] | [type] | Yes/No | [value] | [what it controls] |

### Content Rules

- **Maximum text length:** [e.g., title truncates at 60 characters with ellipsis]
- **Image handling:** [e.g., 16:9 aspect ratio, object-fit cover, lazy loaded]
- **Empty content:** [e.g., show placeholder text "No description provided"]

### Responsive Behaviour

- **Desktop (>1024px):** [layout description]
- **Tablet (768-1024px):** [layout description]
- **Mobile (<768px):** [layout description]

### Accessibility

- **Keyboard navigation:** [how to interact without a mouse]
- **Screen reader:** [what gets announced]
- **Colour contrast:** [meets WCAG AA minimum]
- **Touch targets:** [minimum 44×44px on mobile]

### Interactions

| Action | Trigger | Result |
|---|---|---|
| [e.g., View details] | Click on card | Navigate to detail page |
| [e.g., Dismiss] | Click X button | Component removed from view |

---

## After AI Generates the Spec — Review Checklist

- [ ] Every visual state is defined (not just "default")
- [ ] Loading, empty, and error states are included
- [ ] Text truncation and overflow are specified
- [ ] Responsive behaviour is described for all breakpoints
- [ ] The component is simple enough for its purpose (not over-specified)
