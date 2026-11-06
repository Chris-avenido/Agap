# Design language

## Core look

Calm, crisp, purposeful, and data-dense where the job calls for it. Think of a well-made working tool, not a marketing page. One primary brand color carries the interface, including the chrome (navigation, header, primary actions, selected states), so the brand is visible. Accents are small and each has a single job: critical, attention, success, interactive. Neutral grays and a light tint soften the base. Light and dark themes are designed together, not one derived from the other as an afterthought. In dark themes, brand shades used as text or icons step up to the lighter end of the scale; check every one in the dark screenshot, since the audit script only checks token pairs.

## Typography

- One family from the tokens (default Plus Jakarta Sans). Hierarchy comes from size and weight, never from a second typeface.
- At least five roles from the token scale: page title (about 28-32), section title (about 18-20), label (14, medium), body (14-16), caption (12).
- Titles are bold or semibold. Helper text uses the muted text color at 4.5:1 or better.
- Keep body line length under 80 characters.
- Use tabular figures (`.tabular`, `font-feature-settings: "tnum"`) for numbers in tables and key figures. Verify the font supports `tnum` in a rendered check (compare the width of "1111" and "8888"); if it does not, right-align numerals in columns.

## Surfaces and layering

- At least three visible layers: page tint, panel, and raised or selected.
- Panels use 1px borders and a large radius; dense tables use a smaller radius.
- Prefer borders and tint changes over drop shadows. Vary treatment by importance.
- Use width intentionally: for example a main column with a sticky side panel, not a narrow column with empty margins.

## Section panels

Each logical section is a panel with a header row: icon chip, title, one-line description, and a status or count pill.

## Status and progress

Every form or multi-section screen shows completion progress and what remains, in a sticky status panel or strip, with unsaved and saved indicators next to the primary action.

## Structure patterns for working interfaces

- A left navigation with grouped sections and count badges.
- A top bar with search, notifications and account.
- Summary or stage cards above a main table so status is visible at a glance.
- Dense, readable tables with avatars, soft status pills, filters, sort, export and row actions.
- Urgency shown visually: time-left bars, and alert cards for missing data with a clear action.
- Tabs with counts.
- Icon-only rails are always labeled by tooltip and accessible name, with the active item clearly marked.
- Tables have a tinted header and row hover.
- Each record grouped inside its own panel.
- Navigation that can collapse to a rail and expand on hover without reflowing the main content (overlay or fixed rail).

Use the patterns the job needs; a settings form does not need a stage strip.

## Polish, used sparingly

Subtle depth, soft rounded panels, smooth charts with exact-value tooltips, donuts with a center total, gauges and progress bars for goals. No loud gradient backgrounds.

## Cards and surfaces

- Vary treatment by importance. Primary panels get the most presence; secondary information sits flat with a divider.
- Use a smaller radius for dense tables and a larger one for summary panels, so the radius carries meaning (tokens: `radius.table`, `radius.control`, `radius.panel`).
- Prefer 1px borders over drop shadows.
- Do not chop all content into identical cards.

## One memorable element per screen

Derive it from the product's own domain, for example a working map for geographic data, a timeline for scheduling, a scope or hierarchy selector for organizational data, a pipeline strip for workflow. Everything around it stays quiet. If you cannot name the element in one phrase, the screen has none yet.

## Motion

Only motion that responds to an action: expanding, confirming, a row updating. No decorative entrance animations. Respect `prefers-reduced-motion` (the generated `tokens.css` includes a reduced-motion rule).

## Domain grounding

Use the product's real vocabulary and real data shapes in labels, columns, empty states and examples. Discover them from the code and data model rather than inventing them.

See `craft-floor.md` for the minimum bar every screen must meet.
