import connectDB from "@/db/mongoose";

export async function connect(): Promise<void> {
  await connectDB();
}
