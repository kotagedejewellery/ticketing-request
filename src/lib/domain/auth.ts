import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import { z } from "zod";


export const USER_ROLES = ["admin", "engineer"] as const;

export const userRecordSchema = z.object({
  id: z.string().min(1),
  username: z.string().trim().toLowerCase().min(3).max(40).regex(/^[a-z0-9._-]+$/, "Username hanya boleh memakai huruf kecil, angka, titik, garis bawah, atau strip."),
  name: z.string().trim().min(2).max(100),
  role: z.enum(USER_ROLES),
  active: z.boolean(),
  passwordHash: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const userInputSchema = z.object({
  username: userRecordSchema.shape.username,
  name: userRecordSchema.shape.name,
  role: z.enum(USER_ROLES),
  password: z.string().min(12, "Password minimal 12 karakter."),
});

export const userUpdateSchema = z.object({
  name: userRecordSchema.shape.name.optional(),
  role: z.enum(USER_ROLES).optional(),
  active: z.boolean().optional(),
  password: z.string().min(12, "Password minimal 12 karakter.").optional(),
}).refine((value) => Object.keys(value).length > 0, "Pilih setidaknya satu perubahan.");

export const loginInputSchema = z.object({
  username: userRecordSchema.shape.username,
  password: z.string().min(1).max(200),
});

export type EngineerUser = z.infer<typeof userRecordSchema>;
export type PublicEngineerUser = Omit<EngineerUser, "passwordHash">;
export type SessionUser = Pick<EngineerUser, "id" | "username" | "name" | "role">;

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [salt, expectedHash] = passwordHash.split(":");
  if (!salt || !expectedHash) return false;

  const actualHash = scryptSync(password, salt, 64).toString("hex");
  const expected = Buffer.from(expectedHash, "hex");
  const actual = Buffer.from(actualHash, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function sanitizeUser(user: EngineerUser): PublicEngineerUser {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

export function createSessionToken(user: SessionUser, secret: string, now = new Date()) {
  const payload = Buffer.from(JSON.stringify({ user, exp: Math.floor(now.getTime() / 1000) + SESSION_MAX_AGE_SECONDS })).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function readSessionToken(token: string | undefined, secret: string, now = new Date()): SessionUser | undefined {
  if (!token) return undefined;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return undefined;

  const expectedSignature = sign(payload, secret);
  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return undefined;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { user?: unknown; exp?: unknown };
    if (typeof parsed.exp !== "number" || parsed.exp <= Math.floor(now.getTime() / 1000)) return undefined;
    const user = userRecordSchema.pick({ id: true, username: true, name: true, role: true }).safeParse(parsed.user);
    return user.success ? user.data : undefined;
  } catch {
    return undefined;
  }
}

export function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET belum dikonfigurasi dengan aman.");
  return secret;
}

export function getInitialAdminPassword() {
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  if (!password || password.length < 12) throw new Error("INITIAL_ADMIN_PASSWORD minimal 12 karakter wajib dikonfigurasi.");
  return password;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}
