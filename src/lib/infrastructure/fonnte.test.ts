import { describe, expect, it } from "vitest";

import { formatFonnteTicketMessage } from "./fonnte";
import { createTicket } from "../domain/tickets";

describe("Fonnte ticket notification", () => {
  it("uses the ticket identifier and requester-safe title in the notification", () => {
    const ticket = createTicket({
      type: "enhancement",
      requesterName: "Nadia",
      division: "Marketing",
      systemName: "CRM",
      requestedChange: "Tambahkan sumber lead.",
      reason: "Evaluasi kampanye.",
      urgency: "Tinggi",
      attachmentUrl: undefined,
    }, new Date("2026-09-26T00:00:00.000Z"));

    expect(formatFonnteTicketMessage(ticket)).toContain(ticket.id);
    expect(formatFonnteTicketMessage(ticket)).toContain("CRM");
    expect(formatFonnteTicketMessage(ticket)).not.toContain("technicalClassification");
  });
});
