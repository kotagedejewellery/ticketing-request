const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attemptsByKey = new Map<string, number[]>();


export function canAttemptLogin(key: string, now = new Date()) {
  const attempts = recentAttempts(key, now);
  return attempts.length < MAX_ATTEMPTS;
}

export function recordFailedLogin(key: string, now = new Date()) {
  const attempts = recentAttempts(key, now);
  attempts.push(now.getTime());
  attemptsByKey.set(key, attempts);
}

export function resetLoginAttempts(key: string) {
  attemptsByKey.delete(key);
}

function recentAttempts(key: string, now: Date) {
  const cutoff = now.getTime() - WINDOW_MS;
  const attempts = (attemptsByKey.get(key) ?? []).filter((attempt) => attempt > cutoff);
  if (attempts.length) attemptsByKey.set(key, attempts);
  else attemptsByKey.delete(key);
  return attempts;
}
