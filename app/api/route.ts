import { NextResponse } from "next/server";

import { connect } from "@/app/api/controller";

export async function GET(): Promise<NextResponse> {
  try {
    await connect();

    return NextResponse.json(
      {
        message: "DB connected!"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "DB connection failed!"
      },
      { status: 500 }
    );
  }
}
