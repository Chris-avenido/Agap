/** TEST ONLY. Must never be imported outside tests/. */
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { setAuthContext, type AuthContext, type Role } from '../../src/auth/context.js';

export interface TestUserOptions {
  id: string;
  role?: Role;
  tenantId?: string;
  schoolId?: string;
}

/**
 * Creates an Express middleware test double that injects the authenticated user context
 * without requiring valid JWT signatures or tokens.
 */
export function asUser({
  id,
  role = 'SCHOOL_HEAD',
  tenantId,
  schoolId,
}: TestUserOptions): RequestHandler {
  const resolvedSchoolId = tenantId ?? schoolId ?? id;
  const ctx: AuthContext = {
    userId: id,
    role,
    schoolId: resolvedSchoolId,
  };

  const middleware: RequestHandler = (req: Request, _res: Response, next: NextFunction): void => {
    setAuthContext(req, ctx);
    (req as Request & { user?: unknown }).user = {
      id,
      role,
      tenantId: resolvedSchoolId,
      schoolId: resolvedSchoolId,
    };
    next();
  };

  Object.defineProperty(middleware, 'name', { value: 'testAuthMiddleware' });
  (middleware as unknown as { tag: string }).tag = 'auth';
  return middleware;
}

/**
 * Creates an Express middleware test double that simulates an unauthenticated request
 * by bypassing any context injection.
 */
export function asAnonymous(): RequestHandler {
  const middleware: RequestHandler = (_req: Request, _res: Response, next: NextFunction): void => {
    next();
  };
  Object.defineProperty(middleware, 'name', { value: 'testAnonymousMiddleware' });
  (middleware as unknown as { tag: string }).tag = 'auth';
  return middleware;
}
