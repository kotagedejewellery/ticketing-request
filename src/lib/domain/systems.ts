import { z } from "zod";


export const systemInputSchema = z.object({
  name: z.string().trim().min(2, "Nama sistem minimal 2 karakter.").max(100, "Nama sistem maksimal 100 karakter."),
});

export const systemRecordSchema = systemInputSchema.extend({
  id: z.string().min(1),
  active: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ManagedSystem = z.infer<typeof systemRecordSchema>;

export function createSystem(input: z.infer<typeof systemInputSchema>, now = new Date()): ManagedSystem {
  const timestamp = now.toISOString();
  return {
    id: `SYS-${now.getTime()}`,
    name: input.name,
    active: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
