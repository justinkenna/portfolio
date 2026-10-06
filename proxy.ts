import { NextRequest, NextResponse } from "next/server";

export const COOKIE_NAME = "site_auth";
const COOKIE_VALUE = "authenticated";

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signValue(value: string, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return toHex(signature);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function isValidAuthCookie(cookieValue: string | undefined) {
  const secret = process.env.AUTH_SECRET;
  if (!cookieValue || !secret) return false;
  const expected = await signValue(COOKIE_VALUE, secret);
  return timingSafeEqual(cookieValue, expected);
}

export async function proxy(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;

  if (await isValidAuthCookie(cookie)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login|api/auth).*)"],
};
