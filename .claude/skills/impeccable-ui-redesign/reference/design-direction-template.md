# Design direction template

Copy this section layout into `design-direction.md`. Every claim cites a file or a screenshot.

```markdown
# Design direction: <product>

Status: AWAITING APPROVAL (no application code has been changed)

## 1. Context summary
Domain, primary users, tone, usage pattern, Impeccable mode (brand / product). Cite files.

## 2. Slop findings
| Finding | Where (file:line or screenshot) | Source (Impeccable detect / slop-patterns / contrast check) | Plan |

## 3. Color scheme
Palette with roles, light/dark decision, contrast ratios for each text/background pair.

## 4. Type scale (Plus Jakarta Sans only)
Role, size, weight, line height, letter spacing. Note any Impeccable override.

## 5. Spacing and layout rhythm
Scale, grouping rules, container widths.

## 6. Component treatment
Cards, badges, buttons, inputs, tables, navigation, empty states.

## 7. Motion
Durations, easing, which interactions animate, `prefers-reduced-motion` behavior. Say what is removed.

## 8. Ordered change list
Numbered; tokens first, then shared components, then pages, then motion. Each with affected files.

## 9. Risks
Mantine overrides, dark mode, tests, layout shifts.

## 10. Approval
- [ ] Approve  - [ ] Change requests: ...
```

## Worked example A: data-dense internal admin tool
Context: staff use it daily for hours; scanning matters more than expression. Direction: neutral surfaces, one restrained accent, status colors only for status, 13-14px body, tabular numerals, 100-160ms state transitions only, no decorative motion, density kept. Outcome: fewer tints and badges, stronger hierarchy through weight and spacing.

## Worked example B: public-facing page
Context: visitors decide in seconds; design is the product. Direction: a committed palette with one distinctive accent, larger display scale (up to 48-64px), generous spacing, one purposeful entrance animation per section (200-300ms ease-out), imagery from real evidence. Outcome: a clear point of view rather than a template.

The same method yields opposite choices because the context differs. Do not reuse one example's values for the other.
