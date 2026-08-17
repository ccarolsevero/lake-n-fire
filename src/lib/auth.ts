import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "lake_admin";
const CUSTOMER_COOKIE = "lake_customer";

function secret() {
  const value =
    process.env.SESSION_SECRET || "lake-n-fire-temporary-session-secret";
  return new TextEncoder().encode(value);
}

function envValue(name: string, fallback = "") {
  return (process.env[name] || fallback).trim().replace(/^["']|["']$/g, "");
}

export function verifyAdminCredentials(user: string, password: string) {
  const expectedUser = envValue("ADMIN_USER", "admin");
  const expectedPassword = envValue("ADMIN_PASSWORD");
  if (!expectedPassword) return false;
  return user === expectedUser && password === expectedPassword;
}

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export async function createCustomerSession(customerId: string) {
  const token = await new SignJWT({ role: "customer", customerId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());

  const jar = await cookies();
  jar.set(CUSTOMER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function destroyCustomerSession() {
  const jar = await cookies();
  jar.delete(CUSTOMER_COOKIE);
}

export async function getCustomerId() {
  const jar = await cookies();
  const token = jar.get(CUSTOMER_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.role !== "customer" || typeof payload.customerId !== "string") {
      return null;
    }
    return payload.customerId;
  } catch {
    return null;
  }
}

export { ADMIN_COOKIE, CUSTOMER_COOKIE };
