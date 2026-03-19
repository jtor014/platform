# Content Map

Every content file and its purpose. Content files live in `/content/`. Each page has exactly one primary content source. Do not combine sources unless explicitly noted.

## Content Rules

1. Content files are the authority for TEXT
2. Design rules are the authority for LOOK
3. Route inventory is the authority for STRUCTURE
4. If a content file is missing, FLAG IT. Do not improvise content
5. Each .astro page reads its content file and builds a designed page using components
6. Do NOT render markdown through a pipeline — each page is a crafted Astro component

## Allowed Markdown in Content Files

- Headings (H1-H4)
- Paragraphs
- Bullet and numbered lists
- Fenced code blocks (with language tag)
- Blockquotes (page wraps in Callout component)
- Simple tables
- Bold, italic, inline code

Nothing else. No shortcodes. No MDX. No component imports.

## File Inventory

### Getting Started (shared)

| File | Page | Notes |
|---|---|---|
| `getting-started/homepage.md` | `/` | Landing page content. Hero text, project descriptions, how it works, categories |
| `getting-started/how-this-works.md` | `/getting-started` | Methodology explainer. Roles, the loop, progression |
| `getting-started/shared-setup.md` | `/getting-started/setup` | VS Code, Git, GitHub CLI, Claude Code ONLY. No category tools |
| `getting-started/web-dev-setup.md` | `/web-dev/getting-started` | Node.js, Docker, Gemini API, Netlify ONLY. No shared tools |
| `getting-started/choose-your-arc.md` | `/web-dev/bridge/choose-arc` | 5 arc descriptions with interest/course tables |
| `getting-started/setup-guide.md` | NOT USED | Moved to content/archive/. Superseded by shared-setup.md + web-dev-setup.md |

### Web Dev Category

| File | Page | Notes |
|---|---|---|
| `web-dev/category-landing.md` | `/web-dev` | Category overview, project list, arc summary |

### Project 1

| File | Page | Notes |
|---|---|---|
| `projects/project-1/landing.md` | `/web-dev/projects/1` | Project overview, +1, prerequisites, time, materials list |
| `projects/project-1/prd-greenscape.md` | `/web-dev/projects/1/prd` | Full PRD with scope, anti-scope, acceptance criteria |
| `projects/project-1/backlog-greenscape.md` | `/web-dev/projects/1/backlog` | 8 tickets with acceptance criteria |
| `projects/project-1/step-by-step-guide.md` | `/web-dev/projects/1/guide` | 265 lines. Full walkthrough, verification steps, common issues |
| `projects/project-1/design-spec-greenscape.md` | `/web-dev/projects/1/design` | Colours, typography, spacing, section specs. Render swatches visually |
| `projects/project-1/claude-md-greenscape.md` | `/web-dev/projects/1/claude-md` | Pre-filled CLAUDE.md. Render in CodeBlock with full-file copy |

### Project 2

| File | Page | Notes |
|---|---|---|
| `projects/project-2/landing.md` | `/web-dev/projects/2` | Phase A/B structure, prerequisites |
| `projects/project-2/prd-factfeed.md` | `/web-dev/projects/2/prd` | Full PRD |
| `projects/project-2/backlog-factfeed.md` | `/web-dev/projects/2/backlog` | 11 tickets, Phase A/B split with pause point |
| `projects/project-2/step-by-step-guide.md` | `/web-dev/projects/2/guide` | Links to CI and Gemini guides |
| `projects/project-2/claude-md-factfeed.md` | `/web-dev/projects/2/claude-md` | Pre-filled CLAUDE.md |

### Project 6

| File | Page | Notes |
|---|---|---|
| `projects/project-6/project-6-universal.md` | `/web-dev/projects/6` | Universal ops content + arc-specific sections (render arc sections in details/summary) |

### Guides

| File | Page | Notes |
|---|---|---|
| `guides/ci-setup-guide.md` | `/web-dev/guides/ci-setup` | YAML in CodeBlock with copy. StepList for setup. details/summary for troubleshooting |
| `guides/gemini-setup-guide.md` | `/web-dev/guides/gemini-setup` | Same pattern |

### Bridge

| File | Page | Notes |
|---|---|---|
| `bridge/bridge-instructions.md` | `/web-dev/bridge` | Annotate → Repair → Generate. Visual 3-step flow |
| `bridge/flawed-prd-answer-keys.md` | `/web-dev/bridge/choose-arc` | Answer keys rendered as details/summary INLINE on the choose-arc page. Not a separate route |

### Arcs (×5 — all identical structure)

| File | Page | Notes |
|---|---|---|
| `arcs/arc-[x]/landing.md` | `/web-dev/arcs/[x]` | Client, projects overview, challenges, audience, time |
| `arcs/arc-[x]/flawed-prd-arc-[x].md` | `/web-dev/arcs/[x]/flawed-prd` | Flawed PRD with note: "Find and fix every flaw" |
| `arcs/arc-[x]/client-briefs-arc-[x].md` | `/web-dev/arcs/[x]/project-3`, `/project-4`, `/project-5` | ONE file contains all 3 project briefs. Each .astro page extracts its section. Blockquotes → Callout client. "Guidance" → details/summary. "Simulated scope change" → Callout scope-change |

### Checkpoints

| File | Page | Notes |
|---|---|---|
| `checkpoints/checkpoint-after-project-[n].md` | `/web-dev/checkpoints/after-project-[n]` | Exercises with answers. Wrap each answer in details/summary |

### Templates

| File | Page | Notes |
|---|---|---|
| `templates/prd-template.md` | `/templates` (section) | All 10 template files appear on ONE page. Each as a Card with details/summary preview + CodeBlock with copy |
| `templates/architecture-template.md` | `/templates` (section) | |
| `templates/claude-md-template.md` | `/templates` (section) | |
| `templates/design-template.md` | `/templates` (section) | |
| `templates/component-spec-template.md` | `/templates` (section) | |
| `templates/ticket-backlog-template.md` | `/templates` (section) | |
| `templates/sprint-retro-template.md` | `/templates` (section) | |
| `templates/risk-assessment-template.md` | `/templates` (section) | |
| `templates/runbook-template.md` | `/templates` (section) | |
| `templates/handover-template.md` | `/templates` (section) | |

## Summary

- 53 active content files (plus 1 archived legacy file)
- 54 pages total (some files serve multiple pages via section extraction)
- Every page has exactly one primary content source (or one section of a multi-section file)
- 1 archived legacy file (setup-guide.md — superseded)
