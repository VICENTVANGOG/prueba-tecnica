import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("myTokenName");

  if (!token) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    const { email, username } = jwt.verify(token.value, "secret") as { email: string; username: string };

    return NextResponse.json({
      email,
      username,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
