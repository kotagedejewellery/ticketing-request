import { describe, expect, it } from "vitest";


import { createSystem, systemInputSchema } from "./systems";

describe("system management", () => {
  it("normalizes a system name and creates an active option", () => {
    const input = systemInputSchema.parse({ name: "  CRM Nasional  " });
    const system = createSystem(input, new Date("2026-09-26T00:00:00.000Z"));

    expect(system).toMatchObject({ name: "CRM Nasional", active: true });
    expect(system.id).toMatch(/^SYS-/);
  });
});
