# Hard rules

1. Plus Jakarta Sans is mandatory and is the only font family (an existing monospace is allowed for `code`, `pre`, `kbd` only). If Impeccable's rules recommend a different typeface or discourage this one, the user's choice wins: note the override in the proposal and do not change the font.
2. Never edit application code before the user has explicitly approved `design-direction.md`. Check `git status` at the approval step to prove it.
3. Frontend only. Never modify the backend, database schema, migrations, environment files or secrets.
4. Never change behavior, routes, copy text, API calls, form logic, `data-testid` attributes or accessible names.
5. Preserve accessibility: WCAG AA contrast, visible focus states, `prefers-reduced-motion` support, minimum touch target sizes.
6. Local only. Screenshots and checks run against localhost or private addresses, never production or staging. Do not start production processes.
7. Never write the test account password into any file, report or log. Pass credentials through `CRAWL_USER` and `CRAWL_PASSWORD` environment variables only.
8. Install Impeccable at project scope only, and tell the user the source and version installed.
9. Do not generate the visual design from imagination. Every decision must trace back to evidence in `ui-context.json` or the codebase.
10. Do not hardcode Impeccable command names; read them from the installed `SKILL.md`.

## Known failure modes to prevent

- Replacing one generic template with another (a new "premium" template that is just as context-free).
- Applying the same palette and motion to every product regardless of context.
- Adding animation to everything instead of purposeful transitions.
- Making changes that break Mantine theme overrides or dark mode.
- Silently skipping the approval step.
- Claiming the font is retained without checking computed styles in the browser (use `check-font-and-contrast.mjs`).
