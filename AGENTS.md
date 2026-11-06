# AGENTS.md — agap_applicant

Applicant portal for the AGAP system: Express + Postgres (`pg` pool) backend, React + Vite frontend.

## Layout
- `backend/` — Express API. Entry `src/index.ts`; DB pool in `src/database.ts` (the only pool; never swap the `pg` driver).
- `frontend/` — React/Vite app. Large legacy files live in `src/components` and `src/pages`.
- `.agents/` — role guides (backend, frontend, database, debugger, designer, modular architecture).
- `.claude/skills/` — runnable skills (see routing table).

## Verify before you finish (run from repo root)
| Command | What it does |
| --- | --- |
| `npm run lint` | backend ESLint (`lint:check`, no autofix) + frontend oxlint |
| `npm run typecheck` | `tsc --noEmit` for backend and frontend |
| `npm run ci` | `lint` then `typecheck` — must pass before declaring work done |

Lint debt (type-safety/prettier rules) is reported as warnings; **errors fail CI**. Don't add new warnings.

## Backend architecture rules
- Feature modules: `backend/src/features/<name>/<name>.routes.ts` → `.controller.ts` → `.service.ts`.
  Routes only wire paths; controllers handle `req`/`res`; services own logic and SQL.
- Existing features: `features/auth`, `features/reclass`. `address/` has `address.service.ts`.
  Legacy `applicants/applicants.service.ts` is still the shared data layer; do not grow it, add to a feature service.
- ESLint enforces: `import/no-cycle`; routes may not import routes; controllers/services may not import routes/controllers.
- All SQL uses `pool` from `backend/src/database.ts`. No inline SQL in routes/controllers.
- Public URLs are stable (`/api/applicants/*`, `/api/address/*`, `/api/register-hr`); moving code must not change them.

## Frontend architecture rules
- New UI goes in `frontend/src/features/<name>/{components,hooks}`; keep files focused (<500 lines target).
- `ApplicationModal.tsx` is being decomposed into `features/application/`; extend those pieces, not the monolith.
- Follow `insighted-ui-rules` (Plus Jakarta Sans, palette, no new UI libraries).

## Code modification guidelines (preserved from `.agents/agents.md`)
- Do not remove working functions or validation unless explicitly told to.
- Document core logic changes in `CHANGELOG.md`; add new strict patterns here.
- Show "None Required" in the frontend when years of experience or training hours is 0.
- Bug fixes: investigate root cause first, make the smallest change, touch only related files,
  preserve business logic, DB operations and backward compatibility, never rename APIs without need.
- Workflow: investigate → explain root cause → list affected files → minimal fix → verify nothing unrelated changed → summarize.

## Skill routing
| Task | Skill |
| --- | --- |
| Verify / final gate | `ci-gate` |
| Repo structure score | `folder-architecture-audit` |
| Dev error/slow-query logs | `dev-diagnostics-logger` |
| Check all endpoints for 5xx | `api-endpoint-health-check` |
| Backend end-to-end tests | `backend-integration-tests` |
| Scan a diff for vulns | `diff-vuln-scan` |
| Whole-repo security scan | `security-testing` |
| Slow SQL / N+1 | `orm-optimizer` |
| DB schema/data-flow review | `data-workflow-narrative`, `pg-health-assessment` |
| Pool/cache planning | `pgbouncer-redis-plan` |
| Load/capacity | `load-capacity-test` |
| UI rules / redesign | `insighted-ui-rules`, `impeccable`, `ui-visual-audit` |
| Local DB clone | `pg-clone-to-local` |
| Commit & push to main | `git-sync-push` |

When troubleshooting or improving runtime behavior, read `.logs/LATEST.md` first (run `npm run logs:summary` to refresh it); raw entries are in `.logs/*.jsonl`.
