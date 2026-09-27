import { describe, expect, it } from "vitest";

import { canAttemptLogin, recordFailedLogin, resetLoginAttempts } from "./login-rate-limit";


describe("login rate limit", () => {
  it("blocks repeated failed logins until the window expires", () => {
    const now = new Date("2026-09-26T00:00:00.000Z");
    const key = "198.51.100.20";

    resetLoginAttempts(key);
    for (let attempt = 0; attempt < 5; attempt += 1) recordFailedLogin(key, now);

    expect(canAttemptLogin(key, now)).toBe(false);
    expect(canAttemptLogin(key, new Date("2026-09-26T00:16:00.000Z"))).toBe(true);
  });
});
