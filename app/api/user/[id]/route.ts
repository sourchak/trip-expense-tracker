// libraries
import { NextResponse } from "next/server";

// controllers
import {
  deleteUser,
  readUser,
  updateUser
} from "@/app/api/user/controller";
import { UserDocument } from "@/schemas/user";

// constants
const ROUTE_SLUG = `/user/`;

// request handlers (@ -> /api/user/[id])
export async function GET(
  req: Request
): Promise<NextResponse> {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    const user = await readUser(id);

    if (!user) {
      console.error(
        `[ERROR] GET /api/user/[id]:
no user`
      );

      return NextResponse.json(
        {
          message: "Not Found",
          data: null
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Found",
        data: user
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `[ERROR] GET /api/user/[id]:
${error}`
    );

    return NextResponse.json(
      {
        message: "Error Reading User",
        data: null
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request
): Promise<NextResponse> {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    const updateData =
      (await req.json()) as Partial<UserDocument>;

    const user = await updateUser(id, updateData);

    if (!user) {
      console.error(
        `[ERROR] PATCH /api/user/[id]:
no user`
      );

      return NextResponse.json(
        {
          message: "Not Found",
          data: null
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Updated",
        data: user
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `[ERROR] PATCH /api/user/[id]:
${error}`
    );

    return NextResponse.json(
      {
        message: "Error Updating User",
        data: null
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request
): Promise<NextResponse> {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    const user = await deleteUser(id);

    if (!user) {
      console.error(
        `[ERROR] DELETE /api/user/[id]:
no user`
      );

      return NextResponse.json(
        {
          message: "Not Found",
          data: null
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Deleted",
        data: user
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `[ERROR] DELETE /api/user/[id]:
${error}`
    );

    return NextResponse.json(
      {
        message: "Error Deleting User",
        data: null
      },
      { status: 500 }
    );
  }
}
