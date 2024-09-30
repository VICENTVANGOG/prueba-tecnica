import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

async function saveUser(email: string, password: string) {
  return true;
}

export async function POST(request: Request) {
  const { email, password }: { email: string; password: string } = await request.json();
  
  const userSaved = await saveUser(email, password);
  
  if (userSaved) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email,
        username: email.split('@')[0],
      },
      "secret"
    );

    const response = NextResponse.json({ token });
    
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
      { message: "Error al registrar el usuario" },
      { status: 400 }
    );
  }
}
