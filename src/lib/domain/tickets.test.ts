import { describe, expect, it } from "vitest";


import {
  bugRequestSchema,
  changeTicket,
  createTicket,
  getPublicTicket,
  getSafeExternalUrl,
  newSystemRequestSchema,
} from "./tickets";

describe("request schemas", () => {
  it("accepts a complete new system request and trims its text", () => {
    const result = newSystemRequestSchema.safeParse({
      type: "new-system",
      requesterName: "  Rina Putri  ",
      division: "Keuangan",
      needName: "Portal pengajuan cuti",
      currentProblem: "Pengajuan masih melalui chat dan sulit dilacak.",
      expectedOutcome: "Pengajuan dapat masuk dalam satu tempat.",
      users: "Seluruh staf kantor pusat",
      urgency: "Sedang",
      deadline: "",
      attachmentUrl: "",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.requesterName).toBe("Rina Putri");
      expect(result.data.deadline).toBeUndefined();
    }
  });

  it("requires impact information for an error report", () => {
    const result = bugRequestSchema.safeParse({
      type: "bug",
      reporterName: "Dimas",
      division: "Operasional",
      affectedSystem: "POS Outlet",
      incident: "Layar kasir berhenti setelah klik bayar.",
      since: "Pagi ini",
      workImpact: "",
      attachmentUrl: "",
      additionalNotes: "",
    });

    expect(result.success).toBe(false);
  });
});

describe("createTicket", () => {
  it("creates a traceable ticket with the default Baru status", () => {
    const ticket = createTicket(
      {
        type: "enhancement",
        requesterName: "Nadia",
        division: "Marketing",
        systemName: "CRM",
        requestedChange: "Tambahkan kolom sumber lead.",
        reason: "Agar evaluasi kampanye lebih jelas.",
        urgency: "Tinggi",
        attachmentUrl: undefined,
      },
      new Date("2026-09-25T08:00:00.000Z"),
      7,
    );

    expect(ticket.id).toBe("IRH-20260925-007");
    expect(ticket.status).toBe("Baru");
    expect(ticket.publicProgress).toContain("diterima");
  });
});

describe("changeTicket", () => {
  it("updates only the selected ticket and records its new public progress", () => {
    const createdAt = new Date("2026-09-25T08:00:00.000Z");
    const original = createTicket(
      {
        type: "enhancement",
        requesterName: "Nadia",
        division: "Marketing",
        systemName: "CRM",
        requestedChange: "Tambahkan kolom sumber lead.",
        reason: "Agar evaluasi kampanye lebih jelas.",
        urgency: "Tinggi",
        attachmentUrl: undefined,
      },
      createdAt,
      1,
    );

    const result = changeTicket(
      [original],
      original.id,
      {
        status: "Dikerjakan",
        publicProgress: "Engineer sedang menyiapkan perubahan.",
        technicalClassification: "Perubahan data input",
      },
      new Date("2026-09-26T08:00:00.000Z"),
    );

    expect(result[0]).toMatchObject({
      status: "Dikerjakan",
      publicProgress: "Engineer sedang menyiapkan perubahan.",
      technicalClassification: "Perubahan data input",
      updatedAt: "2026-09-26T08:00:00.000Z",
    });
  });
});

describe("getPublicTicket", () => {
  it("does not expose the engineer's technical classification to a requester", () => {
    const ticket = createTicket(
      {
        type: "bug",
        reporterName: "Dimas",
        division: "Operasional",
        affectedSystem: "POS Outlet",
        incident: "Layar kasir berhenti.",
        since: "Pagi ini",
        workImpact: "Sebagian terganggu",
        attachmentUrl: undefined,
        additionalNotes: undefined,
      },
      new Date("2026-09-25T08:00:00.000Z"),
    );
    ticket.technicalClassification = "Koneksi API pembayaran";
    ticket.trackingToken = "tracking-token-yang-tidak-boleh-terlihat";

    expect(getPublicTicket(ticket)).toEqual({
      id: ticket.id,
      type: "bug",
      title: "POS Outlet",
      status: "Baru",
      publicProgress: ticket.publicProgress,
      updatedAt: ticket.updatedAt,
    });
    expect(getPublicTicket(ticket)).not.toHaveProperty("trackingToken");
  });
});

describe("getSafeExternalUrl", () => {
  it("only returns http and https attachment URLs", () => {
    expect(getSafeExternalUrl("https://drive.example.com/file")).toBe("https://drive.example.com/file");
    expect(getSafeExternalUrl("javascript:alert(1)")).toBeUndefined();
  });
});
