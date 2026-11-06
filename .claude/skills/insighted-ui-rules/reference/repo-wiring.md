# Repo wiring

The wiring commit, done after all ten retrofit commits. Use what `scripts/detect-stack.mjs` reported (`agentFiles`, `themeFileCandidates`, `storybook`, `eslint`, `profile`). Edit only files that exist, except where stated. Never edit generated or build output files. Rules are copied once, into `.agents/rules/ui.md`; every other file points to it.

## 1. `.agents/rules/ui.md` (always create)

Copy `assets/ui-rules.md` to `<repo>/.agents/rules/ui.md`. Create the folder if missing. If the file already exists, show the diff to the user before overwriting.

## 2. `AGENTS.md`

- If it exists, append a short section, three lines at most:

  ```
  ## UI rules

  All UI follows the InsightED design language: see `.agents/rules/ui.md`. To retrofit or check a UI, use the `insighted-ui-rules` skill.
  ```
- If neither `AGENTS.md` nor any `CLAUDE.md` exists, create `AGENTS.md` containing only that section.
- Do not copy any rule text into it.

## 3. Every `CLAUDE.md` found (`agentFiles.claudeMd`, all locations)

Add one line, nothing else: `UI rules: see .agents/rules/ui.md; retrofit with the insighted-ui-rules skill.` Do not copy the workflow. If a `CLAUDE.md` already imports `@AGENTS.md`, still add the line only if the AGENTS.md section is not reachable from it.

## 4. Theme file

Generate it from `assets/insighted-tokens.json`, choosing by profile. Reuse the repo's existing theme file when `themeFileCandidates` has a real one; create one only if none exists.

- `react-mantine`: a `createTheme` object with `primaryColor: 'brand'`, `primaryShade` from the token file, `colors` from `mantine.colors` (brand, success, warning, danger), `fontFamily` and `headings` (family, per-level size, weight, line height) from `font` and `typeScale`, `radius` and `defaultRadius`, `shadows`, `breakpoints`, `spacing`, and component defaults (`Table` `verticalSpacing: 'md'`, input and button radius and height). Provide dark surfaces through `cssVariablesResolver` (`--mantine-color-body`, card/raised, text, border, using the `dark` token block) and pass the theme to `MantineProvider` with `defaultColorScheme="light"`. Do not use `forceColorScheme`.
- `react-other-ui`: the library's own theme mechanism (`createTheme`, `extendTheme`, `ConfigProvider`), same values.
- `other-framework`: a generated CSS file of custom properties (`--color-*`, `--radius-*`, `--shadow-*`, `--font-family`, type scale) with a `[data-theme='dark']` block, imported once at the app root.
- `server-rendered`: the same CSS variables file, referenced from the shared layout/template with one `<link>`.

Name tokens by role (`--color-text-secondary`), never by value. Include the status scales. Keep the exact hex values from the token file so the scanner allow-list matches.

## 5. Storybook (only if `storybook.present`; never install it)

- Provide the stack's theme provider in `.storybook/preview.*` as a global decorator (for Mantine: `MantineProvider` with the InsightED theme, wrapped in the repo's icon provider).
- Add a light/dark toolbar toggle through `globalTypes` and apply the chosen scheme in the decorator by calling the library's color-scheme setter (Mantine: `useMantineColorScheme().setColorScheme`). Load the font and the global CSS the app loads.
- Verify with the repo's Storybook build script and check one story in each scheme.

## 6. ESLint (only if `eslint.present`)

Match the scanner rule ids in messages. For a flat config (`eslint.config.*`) add objects; for legacy configs put the same options under `rules` and `overrides`.

```js
{
  files: ['**/*.{ts,tsx,js,jsx}'],
  ignores: ['**/theme/**', '**/*.stories.*'], // adjust to the detected theme file location
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [
        // one entry per banned package of the detected profile, taken from the JSON block in reference/libraries.md
        { group: ['lucide-react', '@tabler/icons-react', 'react-icons/*'], message: 'lib-banned: use Phosphor duotone' },
        { group: ['framer-motion', 'motion/*'], message: 'motion: use plain CSS transitions' },
        { group: ['recharts'], message: 'lib-banned: use @mantine/charts' },
      ],
    }],
    'no-restricted-syntax': ['error',
      { selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]", message: 'color-raw: use theme tokens' },
      { selector: "Literal[value=/^(rgb|hsl)a?\\(/]", message: 'color-raw: use theme tokens' },
      { selector: "JSXAttribute[name.name='weight'][value.value!='duotone']", message: 'icon-weight: duotone only' },
    ],
  },
}
```

Generate the `group` entries from the banned lists for the detected profile instead of typing them by hand, so the linter and scanner stay aligned. Keep the repo's existing rules and plugins. Run the repo's lint script scoped to the touched files, then once in full. If existing code already violates a new rule, the retrofit commits should have fixed it; do not downgrade the rule to `warn` to make it pass.

## 7. Commit

One commit containing only the wiring files. Message: `chore: wire InsightED UI rules into agent files, theme, Storybook and ESLint`.
