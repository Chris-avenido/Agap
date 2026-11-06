/** PostgreSQL SQLSTATEs that are safe to retry: deadlock_detected, serialization_failure. */
const RETRYABLE_PG_CODES = new Set(['40P01', '40001']);

export interface RetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
}

/**
 * Runs `fn` (which must open and finish its own transaction) and retries it
 * on deadlock/serialization failures with exponential backoff + full jitter.
 */
export async function withDeadlockRetry<T>(
  fn: () => Promise<T>,
  { maxAttempts = 4, baseDelayMs = 50, maxDelayMs = 1000 }: RetryOptions = {},
): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (!RETRYABLE_PG_CODES.has(error?.code) || attempt >= maxAttempts) {
        throw error;
      }
      const ceiling = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      const delay = Math.floor(Math.random() * ceiling);
      console.warn(
        `Retrying transaction after ${error.code} (attempt ${attempt}/${maxAttempts}) in ${delay}ms`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
