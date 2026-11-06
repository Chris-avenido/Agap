# Rules

## Hard rules

- Colors and fonts come from the project's tokens (or the default tokens). Never invent colors outside the token file. Never hand-edit generated theme files; change tokens and rerun the build script.
- Respect the scope tier. In `refresh` and `refresh-plus`, never change routes, navigation destinations, form field names or types, validation, or data logic. Stop and ask if a requested change would require it.
- **Restraint is not bareness.** Removing decoration must never remove structure. Every screen must pass `reference/craft-floor.md`. A screen that is only a heading, flat text and default controls on one background fails.
- Use the project's existing component library and conventions. Do not add dependencies without telling the user, and print install commands instead of running them silently.
- Platform human-interface guidelines (Apple Human Interface Guidelines first) are the guiding standard when revising UI.
- Never use color alone to convey status. Support light and dark themes where the project has or needs them.
- Official brand values from the user override any default or estimated values.
- Do not mention or hardcode specific products, organizations or people in the skill's output unless they come from the current project.

## Generic-AI tells to avoid

Review the design plan against this list before building.

- Warm cream background with a high-contrast serif and a terracotta accent.
- Near-black background with a single acid-green or vermilion accent.
- Identical rounded cards with one radius and one soft grey shadow everywhere, and gradient washes as decoration.
- Big number, small label and gradient accent as the default for every metric.
- Tracked-out all-caps eyebrow labels above headings, or all-caps labels generally.
- Accenting a single word of a headline in another color or italic.
- Numbered markers (01, 02, 03) on content that is not a sequence.
- Fade-and-slide-up entrances on every section, and hover transitions on every card.
- Meta strings joined with middle dots, arrows appended to every button, monospace for every small label.
- Placeholder or clever copy instead of plain, specific words.

## Bareness tells to avoid

Review the plan against this list in addition to the generic-AI tells.

- One flat background with no layers, and a narrow column with large empty margins.
- Unlabeled icon or number rails; acronyms with no explanation.
- Plain default tables and checkboxes with no states; disabled controls with no stated reason.
- Little size and weight difference between headings, labels and helper text.
- Brand color absent from the chrome; no status, progress or saved feedback.

## Known failure modes to prevent

- Copying a reference screenshot's look wholesale instead of its structure.
- Using pastel gradients as the main look.
- Letting accent colors spread across the screen.
- Skipping empty and error states.
- Hardcoding hex values in components.
- Forgetting dark mode.
- Changing layout or behavior during a `refresh` or `refresh-plus`.
- Assuming a stack instead of detecting it.
- Mistaking emptiness for restraint.

## Corrections log

Add a dated line whenever the user corrects an output, naming the rule that should have prevented it. Format: `YYYY-MM-DD: <what was corrected>. Rule: <rule that should have caught it, or the new rule added>.`

(none yet)

2026-10-23: Output was too plain and barebones: added the craft floor, bareness tells and the `refresh-plus` scope tier.
