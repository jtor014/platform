# Platform Build Package

Everything needed to build the learning platform with Claude Code.

## How to start

1. Open terminal in `~/dev`
2. `claude`
3. Tell Claude:

> Unzip ~/Downloads/platform-build.zip to ~/dev/platform/. Then initialise a git repo there with git init and gh repo create platform --public --source=~/dev/platform/ --remote=origin.

4. `/exit`, then `cd ~/dev/platform`, then `claude`
5. Tell Claude:

> Read docs/platform-implementation.md — that's the build guide. Create CLAUDE.md from Part 3 (it's about 80 lines — rules only). Copy the dot-claude directory to .claude/ in the repo. Create BACKLOG.md from Part 5. Set up GitHub labels, Issues, and Project board. Tell me when you're ready for Ticket 1.

## Directory structure

```
docs/                           Build planning (you read these)
  prd-platform.md               What we're building
  architecture-platform.md      How it's built (Astro, no React, 3 layouts, 9 components)
  platform-implementation.md    Build guide: CLAUDE.md + 22 tickets
  page-manifest.md              Full route table with prev/next and content sources

dot-claude/                     → Becomes .claude/ in the repo (Claude reads these)
  routes.md                     Every route, title, layout, content source, nav order
  design-rules.md               Colour tokens, typography, spacing, component patterns
  content-map.md                Every content file and how it maps to pages

content/                        Markdown source files (54 files with frontmatter)
  getting-started/              Homepage, how it works, shared setup, web dev setup, arc chooser
  web-dev/                      Category landing
  projects/                     Project 1 (6 files), Project 2 (5 files), Project 6 (1 file)
  bridge/                       Bridge instructions, answer keys
  arcs/                         5 arcs × 3 files each (landing, flawed PRD, client briefs)
  checkpoints/                  6 checkpoint files
  templates/                    10 framework templates
  guides/                       CI setup, Gemini setup

blueprints/                     Internal design docs (your reference, not for the build)
  11 blueprint/rationale files from the design process

mockup/                         Visual reference ONLY (not structural authority)
  platform-mockup.html          Open in browser to see design direction
  README.md                     Explains what the mockup is and isn't
```

## Sources of truth

| What | File | Authority for |
|---|---|---|
| CLAUDE.md | Rules, anti-scope, workflow | What Claude must and must not do |
| .claude/routes.md | Every route | Structure, nav, prev/next |
| .claude/content-map.md | File-to-page mapping | Which content builds which page |
| .claude/design-rules.md | Visual tokens | How everything looks |
| BACKLOG.md | Ticket detail | What to build in what order |
| content/*.md frontmatter | Page metadata | Title, description, section, type |

If any of these contradict each other, the hierarchy is: routes.md > content-map.md > CLAUDE.md > ticket prompts.

## File counts

- 4 build planning docs
- 3 Claude reference files (dot-claude/)
- 54 content files with frontmatter
- 11 blueprint docs (reference only)
- 1 mockup + README
- 1 package README
- **74 files total**
