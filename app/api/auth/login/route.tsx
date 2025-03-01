import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password }: { email: string; password: string } = await request.json();

  if (email === "movie@gmail.com" && password === "movie") {

    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email,
        username: "movie",
      },
      "secret"
    );

    const response = NextResponse.json({
      token,
    });

    response.cookies.set({
      name: "myTokenName",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      {
        message: "Invalid credentials",
      },
      {
        status: 401,
      }
    );
  }
}
