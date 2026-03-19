# Route Inventory

Every route on the site. If it is not here, it does not exist. Do not invent routes.

## Shared

| Route | Title | Layout | Content File |
|---|---|---|---|
| `/` | Home | landing | getting-started/homepage.md |
| `/getting-started` | How this works | docs | getting-started/how-this-works.md |
| `/getting-started/setup` | Shared setup | docs | getting-started/shared-setup.md |
| `/templates` | Templates | docs | templates/*.md (frontmatter for metadata, body for copyable text) |

## Web Dev Category

| Route | Title | Layout | Content File |
|---|---|---|---|
| `/web-dev` | Web development | docs | web-dev/category-landing.md |
| `/web-dev/getting-started` | Web dev setup | docs | getting-started/web-dev-setup.md |

### Projects

| Route | Title | Content File |
|---|---|---|
| `/web-dev/projects/1` | Project 1: The static site | projects/project-1/landing.md |
| `/web-dev/projects/1/prd` | PRD: GreenScape | projects/project-1/prd-greenscape.md |
| `/web-dev/projects/1/backlog` | BACKLOG: GreenScape | projects/project-1/backlog-greenscape.md |
| `/web-dev/projects/1/guide` | Step-by-step guide | projects/project-1/step-by-step-guide.md |
| `/web-dev/projects/1/design` | Design specification | projects/project-1/design-spec-greenscape.md |
| `/web-dev/projects/1/claude-md` | CLAUDE.md | projects/project-1/claude-md-greenscape.md |
| `/web-dev/projects/2` | Project 2: The dynamic app | projects/project-2/landing.md |
| `/web-dev/projects/2/prd` | PRD: FactFeed | projects/project-2/prd-factfeed.md |
| `/web-dev/projects/2/backlog` | BACKLOG: FactFeed | projects/project-2/backlog-factfeed.md |
| `/web-dev/projects/2/guide` | Step-by-step guide | projects/project-2/step-by-step-guide.md |
| `/web-dev/projects/2/claude-md` | CLAUDE.md | projects/project-2/claude-md-factfeed.md |
| `/web-dev/projects/6` | Project 6: The live system | projects/project-6/project-6-universal.md |

### Guides

| Route | Title | Content File |
|---|---|---|
| `/web-dev/guides/ci-setup` | CI pipeline setup | guides/ci-setup-guide.md |
| `/web-dev/guides/gemini-setup` | Gemini reviewer setup | guides/gemini-setup-guide.md |

### Bridge

| Route | Title | Content File |
|---|---|---|
| `/web-dev/bridge` | Bridge to Project 3 | bridge/bridge-instructions.md |
| `/web-dev/bridge/choose-arc` | Choose your arc | getting-started/choose-your-arc.md + bridge/flawed-prd-answer-keys.md (inline as details) |

### Arcs (×5 — identical structure)

| Route | Title | Content File |
|---|---|---|
| `/web-dev/arcs/a` | Arc A: Service business | arcs/arc-a/landing.md |
| `/web-dev/arcs/a/flawed-prd` | Flawed PRD: Booking system | arcs/arc-a/flawed-prd-arc-a.md |
| `/web-dev/arcs/a/project-3` | Project 3: Customers want to book | arcs/arc-a/client-briefs-arc-a.md (P3 section) |
| `/web-dev/arcs/a/project-4` | Project 4: Quotes and job tracking | arcs/arc-a/client-briefs-arc-a.md (P4 section) |
| `/web-dev/arcs/a/project-5` | Project 5: Subcontractor access | arcs/arc-a/client-briefs-arc-a.md (P5 section) |
| `/web-dev/arcs/b` | Arc B: Online store | arcs/arc-b/landing.md |
| `/web-dev/arcs/b/flawed-prd` | Flawed PRD: Candle store | arcs/arc-b/flawed-prd-arc-b.md |
| `/web-dev/arcs/b/project-3` | Project 3 | arcs/arc-b/client-briefs-arc-b.md (P3) |
| `/web-dev/arcs/b/project-4` | Project 4 | arcs/arc-b/client-briefs-arc-b.md (P4) |
| `/web-dev/arcs/b/project-5` | Project 5 | arcs/arc-b/client-briefs-arc-b.md (P5) |
| `/web-dev/arcs/c` | Arc C: Content platform | arcs/arc-c/landing.md |
| `/web-dev/arcs/c/flawed-prd` | Flawed PRD: Publication site | arcs/arc-c/flawed-prd-arc-c.md |
| `/web-dev/arcs/c/project-3` | Project 3 | arcs/arc-c/client-briefs-arc-c.md (P3) |
| `/web-dev/arcs/c/project-4` | Project 4 | arcs/arc-c/client-briefs-arc-c.md (P4) |
| `/web-dev/arcs/c/project-5` | Project 5 | arcs/arc-c/client-briefs-arc-c.md (P5) |
| `/web-dev/arcs/d` | Arc D: Event platform | arcs/arc-d/landing.md |
| `/web-dev/arcs/d/flawed-prd` | Flawed PRD: Event registration | arcs/arc-d/flawed-prd-arc-d.md |
| `/web-dev/arcs/d/project-3` | Project 3 | arcs/arc-d/client-briefs-arc-d.md (P3) |
| `/web-dev/arcs/d/project-4` | Project 4 | arcs/arc-d/client-briefs-arc-d.md (P4) |
| `/web-dev/arcs/d/project-5` | Project 5 | arcs/arc-d/client-briefs-arc-d.md (P5) |
| `/web-dev/arcs/e` | Arc E: Community directory | arcs/arc-e/landing.md |
| `/web-dev/arcs/e/flawed-prd` | Flawed PRD: Business directory | arcs/arc-e/flawed-prd-arc-e.md |
| `/web-dev/arcs/e/project-3` | Project 3 | arcs/arc-e/client-briefs-arc-e.md (P3) |
| `/web-dev/arcs/e/project-4` | Project 4 | arcs/arc-e/client-briefs-arc-e.md (P4) |
| `/web-dev/arcs/e/project-5` | Project 5 | arcs/arc-e/client-briefs-arc-e.md (P5) |

### Checkpoints

| Route | Title | Content File |
|---|---|---|
| `/web-dev/checkpoints/after-project-1` | Checkpoint: After Project 1 | checkpoints/checkpoint-after-project-1.md |
| `/web-dev/checkpoints/after-project-2` | Checkpoint: After Project 2 | checkpoints/checkpoint-after-project-2.md |
| `/web-dev/checkpoints/after-project-3` | Checkpoint: After Project 3 | checkpoints/checkpoint-after-project-3.md |
| `/web-dev/checkpoints/after-project-4` | Checkpoint: After Project 4 | checkpoints/checkpoint-after-project-4.md |
| `/web-dev/checkpoints/after-project-5` | Checkpoint: After Project 5 | checkpoints/checkpoint-after-project-5.md |
| `/web-dev/checkpoints/after-project-6` | Checkpoint: After Project 6 | checkpoints/checkpoint-after-project-6.md |

## Navigation Order (prev → next)

```
/ → /getting-started → /getting-started/setup → /web-dev/getting-started
→ /web-dev/projects/1 → .../prd → .../backlog → .../guide → .../design → .../claude-md
→ /web-dev/checkpoints/after-project-1
→ /web-dev/projects/2 → .../prd → .../backlog → .../guide → .../claude-md
→ /web-dev/checkpoints/after-project-2
→ /web-dev/bridge → /web-dev/bridge/choose-arc
→ (student picks arc — prev/next within arc)
→ /web-dev/arcs/[x] → .../flawed-prd → .../project-3
→ /web-dev/checkpoints/after-project-3
→ /web-dev/arcs/[x]/project-4
→ /web-dev/checkpoints/after-project-4
→ /web-dev/arcs/[x]/project-5
→ /web-dev/checkpoints/after-project-5
→ /web-dev/projects/6
→ /web-dev/checkpoints/after-project-6
```

Standalone pages (no prev/next): /web-dev, /templates, /web-dev/guides/*

## Totals

54 pages. All docs layout except homepage (landing layout).
