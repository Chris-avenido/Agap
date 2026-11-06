# Composition Root App Factory Pattern

## Motivation

Integration tests need to verify full HTTP request cycles—including routing, input validation, service logic, database transactions, and queue jobs—without requiring actual JWT signing or colliding with external authentication services.

At the same time, security rules forbid using environment flags (such as `SKIP_AUTH=1`) or query parameters to bypass middleware in production code: flags can be inadvertently switched on in production, misconfigured in container environments, or exploited via header injection.

The clean, safe architectural pattern is **Dependency Injection at the Composition Root**:
1. Application routing and middlewares are wired inside a factory function (`createApp(deps, options)`).
2. Production bootstrap (`src/index.ts` / `server.ts`) passes production dependencies (`verifier`, `authenticate(verifier)`).
3. Integration tests import `createApp` directly and pass test doubles (`asUser(...)`, `passThroughLock()`), without spinning up an HTTP server or listening on a port.
4. Real middleware implementation files remain strictly unmodified.

## Architecture

```
                    ┌──────────────────────────┐
                    │       createApp()        │
                    │    (Composition Root)    │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       Production Entrypoint            Integration Tests
         (`src/index.ts`)               (`tests/integration/`)
                 │                               │
  Wires real authenticate(verifier)    Wires asUser(...) test double
  Wires real lock / passthrough        Wires passThroughLock() or lockHeld()
  Calls app.listen(port)               Passes directly to Supertest
```

## Before / After Diff Example

### 1. `apps/backend/src/app.ts`

```diff
-export interface AppDeps {
-  db: Database;
-  verifier: TokenVerifier;
-}
+export interface AppDeps {
+  db: Database;
+  verifier?: TokenVerifier;
+  authMiddleware?: express.RequestHandler;
+  lockMiddleware?: express.RequestHandler;
+}

 export function createApp(deps?: AppDeps, options: AppOptions = {}): express.Express {
   const app = express();
   app.set('trust proxy', options.trustProxy ?? 0);
   app.use(httpLogging(options.logger ?? pino({ level: 'silent' })));
   app.use(helmet());
   if (options.rateLimit) app.use(globalRateLimit(options.rateLimit));
   app.use(express.json({ limit: '1mb' }));
   app.use(healthRouter);
   if (deps) app.use(createSchoolProfileRouter(deps));
   app.use(notFoundHandler);
   app.use(errorHandler);
   return app;
 }
```

### 2. `apps/backend/src/routes/schoolProfile.ts`

```diff
 export interface SchoolProfileRouterDeps {
   db: Database;
-  verifier: TokenVerifier;
+  verifier?: TokenVerifier;
+  authMiddleware?: RequestHandler;
+  lockMiddleware?: RequestHandler;
 }

-export function createSchoolProfileRouter({ db, verifier }: SchoolProfileRouterDeps): Router {
+export function createSchoolProfileRouter({
+  db,
+  verifier,
+  authMiddleware,
+  lockMiddleware,
+}: SchoolProfileRouterDeps): Router {
   const router = Router();
-  const guard = authenticate(verifier);
+  const guard = authMiddleware ?? (verifier ? authenticate(verifier) : (_req, _res, next) => next());
+  const lock = lockMiddleware ?? ((_req, _res, next) => next());

   router.get('/api/schools/:schoolId/profile', guard, schoolAccess, async (req, res) => {
     const body: SchoolProfileResponse = await getSchoolProfile(getAuthContext(req), db);
     res.json(body);
   });

   router.put(
     '/api/schools/:schoolId/profile',
     guard,
     schoolAccess,
+    lock,
     validate(updateSchoolProfileRequestSchema),
     async (req, res) => {
...
```

### 3. Production Entry (`src/index.ts`)

Remains straightforward and unchanged:
```typescript
const app = createApp(
  { db, verifier: tokens },
  { logger, trustProxy: config.trustProxy, rateLimit: config.rateLimit },
);
const server = app.listen(config.port, () => { ... });
```

## Why Injection Beats Environment Flags

| Feature | Environment Flags (`BYPASS_AUTH=1`) | Dependency Injection (`createApp(deps)`) |
| :--- | :--- | :--- |
| **Risk of Production Leak** | High (accidentally set env var in cloud / Docker) | Zero (doubles are not imported in production bundle) |
| **Security Auditability** | Flawed (conditional branches live inside middleware) | Clean (production path has no bypass logic) |
| **Test Concurrency & Isolation**| Global process state affects all parallel tests | Per-instance configuration without side effects |
| **Flexibility** | Binary (all-on or all-off) | Granular (test user roles, missing tokens, locks) |

## Golden Rules
1. Never modify the implementation of `authenticate.ts` or real lock checks.
2. The default fallback when `authMiddleware` is not supplied MUST be the real `authenticate(verifier)`.
3. Test doubles must only be instantiated and passed within `tests/` or testing scripts.
