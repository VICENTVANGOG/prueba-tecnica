import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("myTokenName");
  console.log(token);

  if (!token) {
    return NextResponse.json(
      {
        message: "Not logged in",
      },
      {
        status: 401,
      }
    );
  }

  try {
    cookieStore.delete("myTokenName");

    const response = NextResponse.json({}, {
      status: 200,
    });

    return response;
  } catch (error: unknown) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message: errorMessage }, {
      status: 500,
    });
  }
}
