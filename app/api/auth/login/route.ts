// libraries
import { NextResponse } from "next/server";

// controllers
import { readUser } from "@/app/api/auth/controller";

// types
import { UserDocument } from "@/schemas/user";

// request handlers (@ -> /api/auth/login)
export async function POST(
  req: Request
): Promise<NextResponse> {
  try {
    const credentials =
      (await req.json()) as Partial<UserDocument>;

    const user = await readUser(credentials);

    if (!user) {
      console.error(
        `[ERROR] GET /api/auth/login:
no user`
      );

      return NextResponse.json(
        {
          message: "Invalid Credentials",
          data: null
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Logged In",
        data: user
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `[ERROR] GET /api/auth/login:
${error}`
    );

    return NextResponse.json(
      {
        message: "Couldn't Login",
        data: null
      },
      { status: 500 }
    );
  }
}
