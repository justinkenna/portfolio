import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { COOKIE_NAME, signValue } from "@/proxy";

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };
  const sitePassword = process.env.SITE_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  if (!sitePassword || !secret) {
    return NextResponse.json(
      { error: "Site password is not configured." },
      { status: 500 }
    );
  }

  const provided = Buffer.from(password ?? "");
  const expected = Buffer.from(sitePassword);
  const valid =
    provided.length === expected.length &&
    timingSafeEqual(provided, expected);

  if (!valid) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const signedValue = await signValue("authenticated", secret);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, signedValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return response;
}
