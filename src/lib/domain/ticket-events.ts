import { z } from "zod";

import { TICKET_STATUSES } from "./tickets";

const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().min(1).optional(),
);

export const ticketEventSchema = z.object({
  id: z.string().min(1),
  ticketId: z.string().min(1),
  createdAt: z.string().datetime(),
  actorId: z.string().min(1),
  actorName: z.string().trim().min(1),
  previousStatus: z.enum(TICKET_STATUSES).optional(),
  status: z.enum(TICKET_STATUSES),
  publicProgress: z.string().trim().min(1),
  technicalClassification: optionalText,
});

export type TicketEvent = z.infer<typeof ticketEventSchema>;
export type TicketEventActor = Pick<TicketEvent, "actorId" | "actorName">;
export type PublicTicketEvent = Pick<TicketEvent, "id" | "createdAt" | "status" | "publicProgress"> & { initial: boolean };

export function createTicketEvent(
  ticketId: string,
  changes: Pick<TicketEvent, "status" | "publicProgress" | "technicalClassification">,
  actor: TicketEventActor,
  previousStatus?: TicketEvent["status"],
  now = new Date(),
): TicketEvent {
  return ticketEventSchema.parse({
    id: `TEV-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    ticketId,
    createdAt: now.toISOString(),
    ...actor,
    previousStatus,
    ...changes,
  });
}

export function getPublicTicketEvent(event: TicketEvent): PublicTicketEvent {
  return {
    id: event.id,
    createdAt: event.createdAt,
    status: event.status,
    publicProgress: event.publicProgress,
    initial: event.actorId === "system" && !event.previousStatus,
  };
}
