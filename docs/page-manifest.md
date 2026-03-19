# Page Manifest

Every route on the platform. This is the canonical source of truth. If a ticket prompt contradicts this table, the table wins.

## Shared Pages (top level)

| Route | Page Title | Type | Content Source | Layout | Prev → Next | JS Required | Ticket |
|---|---|---|---|---|---|---|---|
| `/` | Home | Marketing landing | `content/getting-started/homepage.md` | LandingLayout | — → /getting-started | No | T5 |
| `/getting-started` | How this works | Onboarding | `content/getting-started/how-this-works.md` | DocsLayout | / → /getting-started/setup | No | T6 |
| `/getting-started/setup` | Shared setup | Setup guide | `content/getting-started/shared-setup.md` | DocsLayout | /getting-started → /web-dev/getting-started | Yes (inline copy script) | T6 |
| `/templates` | Templates | Tool page | `content/templates/*.md` (frontmatter for metadata, body for copyable text) | DocsLayout | — | Yes (inline copy script) | T11 |

## Web Dev Category

| Route | Page Title | Type | Content Source | Layout | Prev → Next | JS Required | Ticket |
|---|---|---|---|---|---|---|---|
| `/web-dev` | Web development | Category landing | `content/web-dev/category-landing.md` | DocsLayout | — | No | T5b |
| `/web-dev/getting-started` | Web dev setup | Setup guide | `content/getting-started/web-dev-setup.md` | DocsLayout | /getting-started/setup → /web-dev/projects/1 | Yes (inline copy script) | T6 |

### Projects

| Route | Page Title | Type | Content Source | Layout | Prev → Next | JS Required | Ticket |
|---|---|---|---|---|---|---|---|
| `/web-dev/projects/1` | Project 1: The static site | Project landing | `content/projects/project-1/landing.md` | DocsLayout | /web-dev/getting-started → /web-dev/projects/1/prd | No | T7 |
| `/web-dev/projects/1/prd` | PRD: GreenScape | Material | `content/projects/project-1/prd-greenscape.md` | DocsLayout | /web-dev/projects/1 → /web-dev/projects/1/backlog | No | T7 |
| `/web-dev/projects/1/backlog` | BACKLOG: GreenScape | Material | `content/projects/project-1/backlog-greenscape.md` | DocsLayout | /web-dev/projects/1/prd → /web-dev/projects/1/guide | No | T7 |
| `/web-dev/projects/1/guide` | Step-by-step guide | Material | `content/projects/project-1/step-by-step-guide.md` | DocsLayout | /web-dev/projects/1/backlog → /web-dev/projects/1/design | Yes (inline copy script) | T7 |
| `/web-dev/projects/1/design` | Design specification | Material | `content/projects/project-1/design-spec-greenscape.md` | DocsLayout | /web-dev/projects/1/guide → /web-dev/projects/1/claude-md | No | T7 |
| `/web-dev/projects/1/claude-md` | CLAUDE.md | Material | `content/projects/project-1/claude-md-greenscape.md` | DocsLayout | /web-dev/projects/1/design → /web-dev/checkpoints/after-project-1 | Yes (inline copy script) | T7 |
| `/web-dev/checkpoints/after-project-1` | Checkpoint: After Project 1 | Checkpoint | `content/checkpoints/checkpoint-after-project-1.md` | DocsLayout | /web-dev/projects/1/claude-md → /web-dev/projects/2 | No (details/summary is native HTML) | T10 |
| `/web-dev/projects/2` | Project 2: The dynamic app | Project landing | `content/projects/project-2/landing.md` | DocsLayout | /web-dev/checkpoints/after-project-1 → /web-dev/projects/2/prd | No | T9 |
| `/web-dev/projects/2/prd` | PRD: FactFeed | Material | `content/projects/project-2/prd-factfeed.md` | DocsLayout | /web-dev/projects/2 → /web-dev/projects/2/backlog | No | T9 |
| `/web-dev/projects/2/backlog` | BACKLOG: FactFeed | Material | `content/projects/project-2/backlog-factfeed.md` | DocsLayout | /web-dev/projects/2/prd → /web-dev/projects/2/guide | No | T9 |
| `/web-dev/projects/2/guide` | Step-by-step guide | Material | `content/projects/project-2/step-by-step-guide.md` | DocsLayout | /web-dev/projects/2/backlog → /web-dev/projects/2/claude-md | Yes (inline copy script) | T9 |
| `/web-dev/projects/2/claude-md` | CLAUDE.md | Material | `content/projects/project-2/claude-md-factfeed.md` | DocsLayout | /web-dev/projects/2/guide → /web-dev/checkpoints/after-project-2 | Yes (inline copy script) | T9 |
| `/web-dev/guides/ci-setup` | CI pipeline setup | Guide | `content/guides/ci-setup-guide.md` | DocsLayout | — | Yes (inline copy script) | T8 |
| `/web-dev/guides/gemini-setup` | Gemini reviewer setup | Guide | `content/guides/gemini-setup-guide.md` | DocsLayout | — | Yes (inline copy script) | T8 |
| `/web-dev/checkpoints/after-project-2` | Checkpoint: After Project 2 | Checkpoint | `content/checkpoints/checkpoint-after-project-2.md` | DocsLayout | /web-dev/projects/2/claude-md → /web-dev/bridge | No (details/summary is native HTML) | T10 |

### Bridge

| Route | Page Title | Type | Content Source | Layout | Prev → Next | JS Required | Ticket |
|---|---|---|---|---|---|---|---|
| `/web-dev/bridge` | Bridge to Project 3 | Bridge | `content/bridge/bridge-instructions.md` | DocsLayout | /web-dev/checkpoints/after-project-2 → /web-dev/bridge/choose-arc | No | T12 |
| `/web-dev/bridge/choose-arc` | Choose your arc | Decision | `content/getting-started/choose-your-arc.md` + `content/bridge/flawed-prd-answer-keys.md` (inline as details/summary) | DocsLayout | /web-dev/bridge → (arc landing) | No | T12 |

### Arcs (×5 — showing Arc A, B-E identical structure)

| Route | Page Title | Type | Content Source | Layout | Prev → Next | JS Required | Ticket |
|---|---|---|---|---|---|---|---|
| `/web-dev/arcs/a` | Arc A: Service business | Arc landing | `content/arcs/arc-a/landing.md` | DocsLayout | /web-dev/bridge/choose-arc → /web-dev/arcs/a/flawed-prd | No | T13 |
| `/web-dev/arcs/a/flawed-prd` | Flawed PRD: Booking system | Bridge exercise | `content/arcs/arc-a/flawed-prd-arc-a.md` | DocsLayout | /web-dev/arcs/a → /web-dev/arcs/a/project-3 | No | T14a |
| `/web-dev/arcs/a/project-3` | Project 3: Customers want to book | Arc material | `content/arcs/arc-a/client-briefs-arc-a.md` (P3 section) | DocsLayout | /web-dev/arcs/a/flawed-prd → /web-dev/checkpoints/after-project-3 | No (details/summary is native HTML) | T14a |
| `/web-dev/arcs/a/project-4` | Project 4: Quotes and job tracking | Arc material | `content/arcs/arc-a/client-briefs-arc-a.md` (P4 section) | DocsLayout | /web-dev/checkpoints/after-project-3 → /web-dev/checkpoints/after-project-4 | No (details/summary is native HTML) | T14a |
| `/web-dev/arcs/a/project-5` | Project 5: Subcontractor access | Arc material | `content/arcs/arc-a/client-briefs-arc-a.md` (P5 section) | DocsLayout | /web-dev/checkpoints/after-project-4 → /web-dev/checkpoints/after-project-5 | No (details/summary is native HTML) | T14a |

*Arcs B (`/web-dev/arcs/b`), C, D, E follow the same structure → Tickets T14b, T14c, T14d, T14e*

### Remaining Checkpoints & Project 6

| Route | Page Title | Type | Content Source | Layout | Prev → Next | JS Required | Ticket |
|---|---|---|---|---|---|---|---|
| `/web-dev/checkpoints/after-project-3` | Checkpoint: After Project 3 | Checkpoint | `content/checkpoints/checkpoint-after-project-3.md` | DocsLayout | (arc project-3) → (arc project-4) | No (details/summary is native HTML) | T10 |
| `/web-dev/checkpoints/after-project-4` | Checkpoint: After Project 4 | Checkpoint | `content/checkpoints/checkpoint-after-project-4.md` | DocsLayout | (arc project-4) → (arc project-5) | No (details/summary is native HTML) | T10 |
| `/web-dev/checkpoints/after-project-5` | Checkpoint: After Project 5 | Checkpoint | `content/checkpoints/checkpoint-after-project-5.md` | DocsLayout | (arc project-5) → /web-dev/projects/6 | No (details/summary is native HTML) | T10 |
| `/web-dev/projects/6` | Project 6: The live system | Project landing | `content/projects/project-6/project-6-universal.md` | DocsLayout | /web-dev/checkpoints/after-project-5 → /web-dev/checkpoints/after-project-6 | No (details/summary is native HTML) | T15 |
| `/web-dev/checkpoints/after-project-6` | Checkpoint: After Project 6 | Checkpoint | `content/checkpoints/checkpoint-after-project-6.md` | DocsLayout | /web-dev/projects/6 → / | No (details/summary is native HTML) | T10 |

## Totals

| Category | Pages |
|---|---|
| Shared (home, getting started, templates) | 4 |
| Web Dev category + setup | 2 |
| Projects 1-2 (landings + materials) | 12 |
| Guides | 2 |
| Bridge | 2 |
| Arcs (5 arcs × 5 pages: landing + flawed PRD + P3 + P4 + P5) | 25 |
| Checkpoints | 6 |
| Project 6 | 1 |
| **Total** | **54** |

*Note: Arc material pages for P3/P4/P5 extract sections from the client-briefs file. Each section becomes its own page.*
