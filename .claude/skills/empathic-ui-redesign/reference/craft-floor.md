# Craft floor

The minimum level of craft every screen must reach. Restraint means no decoration. It does not mean no structure, layering, status or detail. Check each item against screenshots and record one line of evidence. An item that does not apply needs a stated reason.

1. **Layers:** at least three distinct surfaces (page tint, panel, raised or selected), separated by borders and tint, not only by whitespace.
2. **Section panels:** each logical section sits in a panel with an icon chip, a title, a one-line description, and a status or count pill (for example "2 of 3 selected", "Complete", "Needs attention").
3. **Type range:** at least five clearly different roles (page title, section title, label, body, caption). Helper text meets 4.5:1 contrast.
4. **Brand in the chrome:** navigation, header and primary actions visibly use the brand color. The screen could not be mistaken for a default template.
5. **Summary or status element:** at least one of: progress or completion indicator, summary strip, counts, or a sticky status panel that says what remains before the user can finish.
6. **Designed states:** hover, focus-visible, selected, disabled (with the reason shown in a tooltip or inline), loading, empty, error, saved and unsaved.
7. **Jargon support:** every abbreviation or domain term a new user might not know has a tooltip, subtitle or short description.
8. **Icons and navigation:** one consistent icon set. Icon-only or number-only navigation has tooltip labels and accessible names, and the active item is clearly marked.
9. **Tables:** tinted header, row hover, aligned numerals, full available width, and empty or disabled cells explained (a muted dash with a tooltip), never blank or broken-looking boxes.
10. **Use of space:** content uses the available width intentionally (for example a main column plus a sticky aside). No large unexplained empty areas.
11. **Feedback near the action:** an unsaved-changes cue and a "saved just now" confirmation near the primary action. The primary action is reachable without long scrolling (sticky bar or header).
12. **Considered detail:** one thoughtful micro-detail tied to the product's domain (for example a live count that updates as selections change), not decoration.

## Scope notes
- Items 2, 5, 8 and 11 may need `refresh-plus` or `redesign` scope because they add presentational structure.
- In `refresh` scope, deliver everything that is purely visual and list the remaining items as recommendations to the user.
- In `refresh-plus`, these additions must not change routes, navigation destinations, form field names or types, validation, or data logic.

## Bareness tells (a screen showing several of these fails)
- One flat background with no layers, and a narrow column with large empty margins.
- Unlabeled icon or number rails; acronyms with no explanation.
- Plain default tables and checkboxes with no states; disabled controls with no stated reason.
- Little size and weight difference between headings, labels and helper text.
- Brand color absent from the chrome; no status, progress or saved feedback.
