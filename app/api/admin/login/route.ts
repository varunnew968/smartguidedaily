import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || typeof password !== "string" || password.length > 300 || password !== expected) {
      return NextResponse.json({ error: "Invalid password or ADMIN_PASSWORD is not configured." }, { status: 401 });
    }
    await createSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
