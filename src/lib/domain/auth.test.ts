import { describe, expect, it } from "vitest";


import {
  createSessionToken,
  hashPassword,
  readSessionToken,
  sanitizeUser,
  verifyPassword,
} from "./auth";

describe("password and session helpers", () => {
  it("verifies the correct password without exposing its hash", () => {
    const passwordHash = hashPassword("sandi-kuat-2026");

    expect(verifyPassword("sandi-kuat-2026", passwordHash)).toBe(true);
    expect(verifyPassword("sandi-yang-salah", passwordHash)).toBe(false);
    expect(sanitizeUser({ id: "USR-001", username: "admin", name: "Admin", role: "admin", active: true, passwordHash, createdAt: "2026-09-26T00:00:00.000Z", updatedAt: "2026-09-26T00:00:00.000Z" })).not.toHaveProperty("passwordHash");
  });

  it("rejects a session token whose signature was changed", () => {
    const token = createSessionToken({ id: "USR-001", username: "admin", name: "Admin", role: "admin" }, "test-secret");

    expect(readSessionToken(token, "test-secret")).toMatchObject({ username: "admin", role: "admin" });
    expect(readSessionToken(`${token}x`, "test-secret")).toBeUndefined();
  });
});
