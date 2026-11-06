# Visual standards

Numeric limits live in `thresholds.json`; the scripts read them. If a project has its own tokens, audit consistency with those tokens and flag only contrast and scale violations. The sample values below are not mandatory.

## Principles

- Scales over arbitrary values.
- Hierarchy through contrast: one focal point per screen.
- Consistency over novelty.
- Tokens, not literals.
- Accessible by default: WCAG 2.2 AA is the floor.
- Never convey meaning by color alone.

## Typography

- One primary sans-serif family; an optional second for display only.
- Fallback stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Tabular figures for numbers in tables.
- Scale (px at base 16, size / line-height / weight):

| Role | Size | Line height | Weight |
|---|---|---|---|
| display | 40 | 1.1 | 700 |
| h1 | 32 | 1.2 | 700 |
| h2 | 24 | 1.25 | 600 |
| h3 | 20 | 1.3 | 600 |
| body | 16 | 1.5 | 400 |
| body-sm | 14 | 1.45 | 400 |
| caption | 12 | 1.4 | 400 |
| button | 14 to 16 | 1 | 500 |

- Body 16px minimum; inputs 16px on mobile; nothing below 12px.
- Line height 1.4 to 1.6 for body, 1.1 to 1.3 for headings.
- Line length 45 to 75 characters.
- Weights: 400, 500, and 600 or 700 only.
- Left-align; no justified text. Use rem units.

## Color

- Roles: neutral about 60%, secondary about 30%, primary/accent about 10%; semantic colors only for status.
- Tonal scale of 10 steps per hue, generated in OKLCH or HCT.
- Sample light-mode values: primary #2563EB, success #15803D, warning #B45309, error #B91C1C, info #0369A1, text primary #111827, text secondary #4B5563, control border #6B7280 (3:1 or better), decorative divider #D1D5DB.
- Contrast: 4.5:1 body text; 3:1 large text (24px, or 18.66px bold), icons, control boundaries and focus rings. 7:1 is an AAA target, not a requirement.
- Never color alone. One accent hue. Avoid pure black on pure white.

## Dark mode

- A separate token set, not an inversion.
- Surfaces #0F172A to #1E293B, not pure black. Elevation via lighter surfaces.
- Desaturated, lighter accents.
- Re-verify every contrast pair.

## Spacing

- 4px base, 8px working grid; scale 4, 8, 12, 16, 24, 32, 48, 64.
- Proximity: space between related items is smaller than between unrelated groups.
- Grid: mobile under 600px = 4 columns, 16 gutter, 16 margin; tablet 600 to 1023 = 8 columns, 24/24; desktop 1024+ = 12 columns, 24 gutter, max width 1200.

## Shape and elevation

- Radius: 4 (inputs, tags), 8 (buttons, cards), 16 (modals), full (pills, avatars).
- Borders 1px (2px focus).
- Shadows: `0 1px 2px rgba(0,0,0,.08)`, `0 4px 12px rgba(0,0,0,.12)`, `0 12px 32px rgba(0,0,0,.16)`.
- Three to five elevation levels at most. Nested radii shrink inward.

## Targets

- Recommended 44x44pt (Apple) or 48x48dp (Material). WCAG 2.2 AA floor is 24x24 CSS px.

## Components and states

- default, hover (one tonal step), focus (visible 2px ring with 2px offset, 3:1, never removed), active (two steps), disabled (readable, not-allowed), loading (same size), error (color plus icon plus text, 3:1 border).
- Sample sizes: button 40 high with 16 horizontal padding (small 32, large 48); input 40 high with 12 padding; chip 24 high; list row 48.

## Iconography

- One style, one stroke weight, sizes 16/20/24.
- Labels with icons; accessible names for meaningful icons.

## Motion

- 100 to 150ms for small changes, 200 to 300ms for transitions, always under 500ms.
- Ease-out entering, ease-in exiting. Animate opacity and transform only.
- Honor `prefers-reduced-motion`. Nothing flashes more than 3 times per second.

## Tokens

- Primitive plus semantic layers (CSS custom properties or equivalent).
- Components reference only tokens. Dark mode remaps semantic tokens.

## Judgment rubric (workflow step 5)

Review the screenshots against these points. Each is a judgment (confidence: medium), not a measurement. Never put a number you estimated into a finding; cite the script output or describe what you see.

1. One focal point per screen.
2. Visible hierarchy of at least three levels.
3. Consistent alignment.
4. Whitespace separates groups.
5. Consistent component patterns.
6. Icon style consistency.
7. No decorative element competes with the primary action.

### judgment.json schema

An array; write `[]` if there are no judgment findings. Each object:

```json
{
  "id": "focal-point",
  "category": "judgment",
  "severity": "warn",
  "title": "Two competing primary buttons on the dashboard",
  "evidence": "What is seen and on which screenshot (screenshots/home-1280-light.png)",
  "fix": "Concrete recommendation",
  "screenshot": "screenshots/home-1280-light.png",
  "confidence": "medium"
}
```

`severity` is `warn` or `pass`. `category` is always `"judgment"` and `confidence` is always `"medium"`. Use one object per rubric point (pass or warn) so the score is meaningful.

## Reference systems

Cite these when recommending patterns: Apple Human Interface Guidelines, Material Design 3, Microsoft Fluent 2, IBM Carbon, Shopify Polaris, Atlassian Design System.
