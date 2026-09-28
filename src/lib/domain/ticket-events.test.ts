import { describe, expect, it } from "vitest";

import { createTicketEvent, getPublicTicketEvent } from "./ticket-events";

describe("ticket events", () => {
  it("records an engineer update with the preceding status", () => {
    const event = createTicketEvent(
      "IRH-20260928-001",
      { status: "Dikerjakan", publicProgress: "Engineer sedang menyiapkan perubahan.", technicalClassification: "Perubahan data input" },
      { actorId: "USR-01", actorName: "Nadia" },
      "Ditinjau",
      new Date("2026-09-28T08:00:00.000Z"),
    );

    expect(event).toMatchObject({
      ticketId: "IRH-20260928-001",
      actorName: "Nadia",
      previousStatus: "Ditinjau",
      status: "Dikerjakan",
    });
  });

  it("keeps actor and technical classification out of public history", () => {
    const event = createTicketEvent(
      "IRH-20260928-001",
      { status: "Ditinjau", publicProgress: "Request sedang ditinjau.", technicalClassification: "Perlu cek integrasi POS" },
      { actorId: "USR-01", actorName: "Nadia" },
      "Baru",
      new Date("2026-09-28T08:00:00.000Z"),
    );

    expect(getPublicTicketEvent(event)).toEqual({
      id: event.id,
      createdAt: "2026-09-28T08:00:00.000Z",
      status: "Ditinjau",
      publicProgress: "Request sedang ditinjau.",
      initial: false,
    });
  });
});
