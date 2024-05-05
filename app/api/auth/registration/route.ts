// libraries
import { NextResponse } from "next/server";

// controllers
import { createUser } from "@/app/api/auth/controller";

// types
import { UserDocument } from "@/schemas/user";

// request handlers (@ -> /api/auth/register)
export async function POST(
  req: Request
): Promise<NextResponse> {
  try {
    const addData =
      (await req.json()) as Partial<UserDocument>;

    const user = await createUser(addData);

    if (!user) {
      console.error(
        `[ERROR] POST /api/auth/register:
no user`
      );

      return NextResponse.json(
        {
          message: "Not Registered",
          data: null
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Registered",
        data: user
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      `[ERROR] POST /api/auth/register:
${error}`
    );

    return NextResponse.json(
      {
        message: "Not Registered`",
        data: null
      },
      { status: 500 }
    );
  }
}
