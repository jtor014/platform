# Design Rules

Visual tokens and layout patterns. Follow exactly. Do not improvise.

## Colours

| Token | Hex | Usage |
|---|---|---|
| bg | #FFFFFF | Page background |
| bg-subtle | #F8FAFC | Cards, sidebar item hover |
| bg-muted | #F1F5F9 | Code bg (light context), hover states |
| text | #0F172A | Primary body text |
| text-secondary | #475569 | Descriptions, metadata |
| text-muted | #94A3B8 | Placeholder, disabled |
| primary | #2563EB | Links, buttons, active states |
| primary-dark | #1D4ED8 | Hover states |
| primary-bg | #EFF6FF | Info callout background, primary tint |
| border | #E2E8F0 | Default borders, dividers |
| border-strong | #CBD5E1 | Active borders |
| success | #16A34A | Available badges |
| success-bg | #F0FDF4 | Success backgrounds |
| warning | #D97706 | Warning callouts, client brief callouts |
| warning-bg | #FFFBEB | Warning backgrounds |
| sidebar-bg | #1E293B | Sidebar background |
| sidebar-text | #CBD5E1 | Sidebar text |
| sidebar-active-text | #FFFFFF | Sidebar active page |
| sidebar-active-bg | #334155 | Sidebar active background |
| code-bg | #1E293B | Code block background |
| code-text | #E2E8F0 | Code block text |

## Typography

| Element | Font | Weight | Size | Line Height |
|---|---|---|---|---|
| Body | Inter | 400 | 16px | 1.7 |
| H1 | Inter | 700 | 36px (30px mobile) | 1.2 |
| H2 | Inter | 600 | 28px (24px mobile) | 1.3 |
| H3 | Inter | 600 | 22px (20px mobile) | 1.4 |
| H4 | Inter | 600 | 18px | 1.4 |
| Code | JetBrains Mono | 400 | 14px | 1.6 |
| Nav | Inter | 500 | 14px | 1 |

Fonts: Inter + JetBrains Mono from Google Fonts. `font-display: swap`.

## Layout

| Property | Value |
|---|---|
| Sidebar width | 280px |
| Content max-width | 720px |
| Content padding | 24px mobile, 48px desktop |
| Landing max-width | 1200px |
| Mobile breakpoint | < 768px |
| Desktop breakpoint | ≥ 1024px |

## Spacing

Base unit: 4px. Use multiples: 4, 8, 12, 16, 24, 32, 48, 64, 80.

## Component Patterns

**Card**
- Background: white or bg-subtle
- Border: 1px solid border
- Border-radius: 8px
- Padding: 24px
- Hover: shadow 0 2px 8px rgba(0,0,0,0.08)
- Touch target: min 44×44px

**Callout**
- 4px coloured left border
- 16px padding
- Background tint matching border colour
- border-radius: 0 on left, 8px on right
- Variants:
  - info: primary border, primary-bg background
  - warning: warning border, warning-bg background
  - client: warning border, warning-bg background, italic text
  - scope-change: warning border, warning-bg background, "Scope Change" label in bold

**CodeBlock**
- Background: code-bg (#1E293B)
- Text: code-text (#E2E8F0)
- Font: JetBrains Mono 14px
- Border-radius: 8px
- Padding: 16px
- Horizontal scroll on overflow
- Terminal variant: $ prompt in text-muted colour, copy omits $
- Copy button: top-right, subtle styling, "Copied!" for 2 seconds

**Checklist**
- Visual checkbox (decorative square, not interactive)
- 18px checkbox with 2px border
- 10px gap between checkbox and text
- 5px vertical padding between items

**StepList**
- Numbered circles (32px, primary-bg background, primary text)
- Vertical connector line (1.5px, border colour) between steps
- 16px gap between number and content
- 12px vertical padding between steps

**details/summary**
- summary: full-width, 10px 14px padding, 500 weight, primary colour text
- Chevron: ▸ rotates to ▾ when open (CSS transform)
- Content: bg-subtle background when open, 12px 14px padding
- Smooth transition (CSS, no JS)

**Tables**
- Header: bg-muted background, 600 weight
- Rows: alternating white / bg-subtle
- Cell padding: 12px vertical, 16px horizontal
- Border: border colour between rows
- Horizontal scroll wrapper on mobile

**Buttons**
- Primary: primary background, white text, 8px vertical / 16px horizontal padding, 6px radius, 600 weight
- Hover: primary-dark background
- Min touch target: 44×44px

**Badges**
- Available: success text on success-bg, 3px 10px padding, 20px radius
- Coming soon: text-muted on bg-muted

## Hard Layout Rules

Every page shares:
- Same content width (720px)
- Same heading rhythm (H1 → H2 → H3, consistent spacing)
- Same sidebar behaviour
- Same code block treatment
- Same callout styles
- Same prev/next placement (bottom of content area, border-top divider above)

Minimal layout variation. Consistency over creativity.
