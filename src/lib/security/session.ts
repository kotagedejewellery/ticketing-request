import { cookies } from "next/headers";

import { createSessionToken, getAuthSecret, readSessionToken, type SessionUser } from "../domain/auth";
import { findEngineerUser } from "../infrastructure/sheet-store";

export const SESSION_COOKIE = "irh_engineer_session";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return undefined;
  return readSessionToken(token, getAuthSecret());
}

export async function getActiveSessionUser(): Promise<SessionUser | undefined> {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return undefined;

  const currentUser = await findEngineerUser(sessionUser.username);
  if (!currentUser || !currentUser.active || currentUser.id !== sessionUser.id) return undefined;

  return {
    id: currentUser.id,
    username: currentUser.username,
    name: currentUser.name,
    role: currentUser.role,
  };
}

export async function setSessionUser(user: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(user, getAuthSecret()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSessionUser() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
}
