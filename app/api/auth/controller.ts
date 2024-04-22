// libraries
import connectDB from "@/db/mongoose";

// models
import Models from "@/db/models";
const { Users } = Models;

// types
import { UserDocument } from "@/schemas/user";

export async function createUser(
  addData: Partial<UserDocument>
): Promise<UserDocument | null> {
  try {
    await connectDB();

    const newUser = new Users(addData);
    const user = await newUser.save();

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(`[ERROR] createUser:
${error}`);

    return null;
  }
}

export async function readUser({
  username,
  password
}: Partial<UserDocument>): Promise<UserDocument | null> {
  try {
    await connectDB();

    const user = await Users.findOne({
      username,
      password
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(`[ERROR] readUser:
${error}`);

    return null;
  }
}
