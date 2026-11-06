# Design rules

The owner's confirmed preferences as testable rules. Values come from `assets/insighted-tokens.json`. Follow without deviation. If a case is not covered here and has no edge-case default, do not improvise: leave it and list it in the final report.

Feel: corporate and trustworthy, balanced density, accent color only on key actions, light by default with dark mode supported.

## 1. Tokens and theme (`tokens`)

- Every color comes from the theme or CSS variables. No hex, `rgb()`, `hsl()` or named color outside the theme or token file (scanner: `color-raw`). Mantine default palette names (`blue`, `red`, `gray`, `teal`) are raw colors; use `brand`, `success`, `warning`, `danger` or `dimmed`.
- Corners are 4-6px. Only fully rounded pill badges (`9999px`) and circular avatars (`50%`) are exceptions (scanner: `radius`).
- Soft shadows separate surfaces; no heavy borders. Shadows come from the theme shadow tokens (scanner: `shadow`). Borders are 1px hairlines in neutral muted.
- Edge default, nested radius: outer container 6px, inner element 4px. Never below 4px, never above 6px.
- Edge default, resets: `border-radius: 0` is allowed only for joined elements (button groups, table cells, full-bleed images).
- Edge default, dense admin screens: keep the same type and radius; reduce only vertical padding, never below 10px per table row cell and never below 36px control height on desktop.

## 2. Typography (`typography`)

- Four families, one job each, never two in one element: Source Serif 4 700 for page, modal and person/school titles (italic 400 for subtitles, `.page-title`, `.page-subtitle`); Plus Jakarta Sans 600 for section and card headers and table headers, 500 for UI labels, buttons, tabs and nav; Public Sans 400 (600 for emphasis) for paragraphs, descriptions, table cells and alerts; IBM Plex Mono 400/500 14px for inputs, selects, date fields, IDs and numeric columns (`.num`, `.font-data`). Bold 700 only for page titles and KPI numbers; italic only for subtitles, helper text, hints, placeholders and remarks, one or two lines. All self-hosted via @fontsource, loaded once in theme/global.css. Allowed names live in `assets/insighted-tokens.json` (`font.also`). Every new component gets one of the four roles. Print, voucher and signature views keep their own fonts.
- Body 15px, 16px on mobile (prevents iOS input zoom). Small text 13px minimum.
- Headings are bold: h1 800, h2-h6 700, at the sizes in `typeScale`. Hierarchy comes from weight and color, not from many sizes.

## 3. App shell (`shell`)

- Top bar plus left sidebar. Top bar 56px on white with the 3px red/gold accent line above it. Sidebar 248px with the three-stop blue gradient, white text, active item as translucent white overlay plus gold left marker.
- Fully responsive with equal priority on mobile. Below the `md` breakpoint (1024px) the sidebar collapses into a drawer opened by a burger button in the top bar.
- Edge default, mobile: touch targets at least 44px; no horizontal page scroll at 360px width.

## 4. Tables (`tables`)

- Comfortable rows: cell padding `14px 16px` (Mantine `verticalSpacing="md"`), hairline row dividers, no zebra stripes, no vertical borders.
- Status is a colored pill badge (tint background, text shade) with a text label; color is never the only signal.
- On mobile, a table becomes stacked cards (each cell prefixed by its column label) or scrolls inside its own container (`overflow-x: auto`); the page itself never scrolls sideways.
- Edge default, empty state: one line of secondary text, one neutral duotone icon, and the primary action if the user can fix it. No illustration.
- Edge default, numeric columns: right-aligned with tabular figures.

## 5. Forms and validation (`forms`)

- Every text-like field goes through the one shared floating-label component (`FloatingLabelInput`, built on the library's input). No raw inputs elsewhere (scanner: `label`). Checkbox, radio, switch and file inputs are exempt.
- Validation errors appear twice: inline under the field (danger text, `aria-invalid`) and in one summary banner at the top of the form (`FormErrorSummary`, `role="alert"`) listing each error with a link to its field (scanner: `form-errors`).
- Edge default, error state: keep the user's input, focus the first invalid field on submit, never clear a form on failure.
- Controls are 40px high, 44px on mobile.

## 6. Feedback (`feedback`)

- Loading uses spinners, never skeleton placeholders (scanner: `loader`). Inline spinner for a button or a section; centered spinner for a page. Keep layout space reserved so content does not jump.
- Destructive actions (delete, remove, discard, overwrite) open the shared `ConfirmDestructiveDialog`, whose title and body name exactly what will be affected ("Delete 3 selected students?"), with a danger-filled confirm button and a neutral cancel (scanner: `destructive`).
- Status pills follow the palette status table.

## 7. Icons (`icons`)

- Phosphor only, weight `duotone`, set once through `IconContext.Provider` or a shared wrapper (scanner: `icon-weight`, `lib-banned`). No per-icon `weight` overrides, no second icon set, no emoji as icons.
- Icon color follows text color unless it is a status or key-action icon.

## 8. Charts (`charts`)

- `@mantine/charts` only in the Mantine profile. Series order: primary blue, mid blue, pale blue; further series use status text shades only when they carry status meaning.
- Every series that uses mid or pale blue gets a legend entry or value label (contrast note in `palette.md`).

## 9. Motion (`motion`)

- Subtle only: quick fades, hover feedback, 120-200ms, easing `cubic-bezier(0.2, 0, 0, 1)` (scanner: `motion`). No springs, bounce, elastic or overshoot, no animation libraries, no animated page transitions.
- Exception: a continuous linear spinner rotation may run longer than 200ms.
- Respect `prefers-reduced-motion`: disable non-essential transitions.

## 10. Dark mode (`dark`)

- Light is the default; dark is a supported scheme driven by the theme (`data-mantine-color-scheme` or `[data-theme]`), toggled by the user, defaulting to the system setting only if the repo already does so. Never force a scheme (scanner: `dark-forced`).
- Surfaces use the dark page/card/raised ladder; status uses the dark text colors on 16% tints. The sidebar gradient does not change.
- Every retrofitted component is checked in both schemes.

## Strictness

Follow the rules without deviation. Anything not covered and without a default above goes into the report under "uncovered cases".
