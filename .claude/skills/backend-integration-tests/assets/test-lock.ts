/** TEST ONLY. Must never be imported outside tests/. */
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ApiErrorResponse } from '@esf7/shared';

export interface LockHeldOptions {
  by?: string;
}

/**
 * Creates an Express middleware test double that allows requests through without locking checks.
 */
export function passThroughLock(): RequestHandler {
  const middleware: RequestHandler = (_req: Request, _res: Response, next: NextFunction): void => {
    next();
  };
  Object.defineProperty(middleware, 'name', { value: 'passThroughLock' });
  (middleware as unknown as { tag: string }).tag = 'lock';
  return middleware;
}

/**
 * Creates an Express middleware test double that simulates an active lock conflict,
 * returning the expected 409 SUBMISSION_LOCKED response body.
 */
export function lockHeld(options: LockHeldOptions = {}): RequestHandler {
  const middleware: RequestHandler = (_req: Request, res: Response): void => {
    const errorBody: ApiErrorResponse = {
      error: {
        code: 'SUBMISSION_LOCKED',
        message: options.by
          ? `This eSF7 is locked by ${options.by}.`
          : 'This eSF7 has been submitted and can no longer be edited.',
      },
    };
    res.status(409).json(errorBody);
  };
  Object.defineProperty(middleware, 'name', { value: 'lockHeld' });
  (middleware as unknown as { tag: string }).tag = 'lock';
  return middleware;
}
