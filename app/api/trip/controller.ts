import connectDB from "@/db/mongoose";

import Models from "@/db/models";
const { Trips } = Models;

import { TripDocument } from "@/schemas/trip";

export async function addTrip(
  addData: Partial<TripDocument>
): Promise<TripDocument | null> {
  try {
    await connectDB();

    const newTrip = new Trips(addData);
    const trip = await newTrip.save();

    if (!trip) {
      return null;
    }

    const populatedTrip = await Trips.findById(
      trip._id
    )
      .populate({
        path: "owner",
        select: "username"
      })
      .populate({
        path: "members",
        select: "username"
      });

    if (!populatedTrip) {
      return null;
    }

    return populatedTrip;
  } catch (error) {
    console.error(`[ERROR] addTrip:
${error}`);

    return null;
  }
}
