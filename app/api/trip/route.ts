// libraries
import { NextResponse } from "next/server";

// controllers
import { addTrip } from "@/app/api/trip/controller";

import { TripDocument } from "@/schemas/trip";

// request handlers (@ -> /api/trip)
export async function POST(
  req: Request
): Promise<NextResponse> {
  try {
    const addData =
      (await req.json()) as Partial<TripDocument>;

    const trip = await addTrip(addData);

    if (!trip) {
      console.error(
        `[ERROR] POST /api/trip:
no trip`
      );

      return NextResponse.json(
        {
          message: "Not Added",
          data: null
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Added",
        data: trip
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      `[ERROR] POST /api/trip:
${error}`
    );

    return NextResponse.json(
      {
        message: "Not Added",
        data: null
      },
      { status: 500 }
    );
  }
}
