# InsightED official palette

Values live in `assets/insighted-tokens.json`. Generate theme files from that file; do not retype hex values from this page. Contrast ratios below come from `scripts/check-contrast.mjs`.

## Brand (sampled from the approved screenshot, exact)

| Role | Value | Use |
|---|---|---|
| Primary brand blue | `#0F4C8A` | donut, bars, progress, primary dots, primary buttons, links |
| Sidebar gradient, top to bottom | `#0F4B88` → `#0B3868` → `#092E58` | sidebar background, same in light and dark |
| Active nav item | translucent white overlay (`rgba(255,255,255,0.14)`) with a `#FFC629` left marker | current page in the sidebar |
| Mid blue | `#8FB0D3` | second chart series, second dot |
| Pale blue | `#D3E1F0` | empty bars, third series, info pills |
| Page background | `#E8EFF7` | app background |
| Surface | `#FFFFFF` | cards, top bar |
| Top accent line | `#D4182F` left half, `#FFC629` right half | 3px line above the top bar |
| Heading text | `#0F172A` | headings, primary body text |
| Secondary text | `#586679` | captions, helper text |
| Neutral muted | `#CBD5E1` | hairline dividers, disabled borders |

Accent color is reserved for key actions: primary buttons, active nav, links, key chart series. Everything else is neutral.

## Status (proposed, contrast-checked)

Pills use the tint as background and the text shade as text. Dots and graphics use the text shade.

| Status | Tint | Text and dot | Solid fill |
|---|---|---|---|
| Success | `#E2F3EB` | `#14603F` | none |
| Warning | `#FDF0D8` | `#8A5605` | none |
| Danger | `#FBE6E9` | `#9B1022` | `#D4182F` with white text |
| Info | `#D3E1F0` | `#0F4C8A` | none |

## Dark mode (proposed, derived from the palette; light is the default)

| Role | Value |
|---|---|
| Page | `#0B1727` |
| Card | `#11233A` |
| Raised | `#172E4A` |
| Border | `#24405F` |
| Text | `#E8EFF7` |
| Secondary text | `#9DB0C6` |
| Accent text | `#8FB0D3` |
| Primary fill | `#1B64AE` with white text |
| Primary graphics and links | `#4D8FD1` |
| Status text on dark | success `#5FD39A`, warning `#F2B552`, danger `#FF7A8A`, info `#8FB0D3` |
| Status backgrounds on dark | the status text color at 16% alpha over the card |

The sidebar keeps the same gradient in both modes.

## Proposals the owner should confirm

- All four light status tints and text shades.
- Every dark-mode value, including the 16% status tint alpha and the info text on dark.
- The Mantine 10-step scales in the token file. Steps not anchored on a palette value (brand 2 and 5, and the in-between steps of success, warning, danger) are interpolations that Mantine needs; they are never used as standalone design colors.
- Dark info text `#8FB0D3` (reuses the accent text value).

## Contrast results to know about

All text and graphic pairs pass (4.5:1 and 3:1). Four exact brand colors cannot reach 3:1 on a white card and are therefore marked `decorative` in the token file:

| Color on white | Ratio | Rule |
|---|---|---|
| Mid blue `#8FB0D3` | 2.25:1 | second series only; always add a legend entry or a value label |
| Pale blue `#D3E1F0` | 1.33:1 | empty bars and third series; never the only carrier of meaning |
| Neutral muted `#CBD5E1` | 1.48:1 | hairlines and disabled borders only; never text or form-field borders that must be seen |
| Gold `#FFC629` | 1.57:1 | top accent line only; on the sidebar the active marker passes at 7.51:1 |

Form-field borders and focus rings use the primary blue (8.67:1) or, in dark mode, `#4D8FD1`. Ask the owner whether a darker neutral should replace `#CBD5E1` for field borders.
