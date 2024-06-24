// libraries
import { NextResponse } from "next/server";

// controllers
import { readUsers } from "@/app/api/user/controller";

// request handlers (@ -> /api/user)
export async function GET(
  req: Request
): Promise<NextResponse> {
  try {
    const users = await readUsers();

    if (!users) {
      console.error(
        `[ERROR] GET /api/user:
no users`
      );

      return NextResponse.json(
        {
          message: "No Users",
          data: null
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "",
        data: users
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `[ERROR] GET /api/user:
${error}`
    );

    return NextResponse.json(
      {
        message: "No Users",
        data: null
      },
      { status: 500 }
    );
  }
}
