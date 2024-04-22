// libraries
import connectDB from "@/db/mongoose";

// models
import Models from "@/db/models";
const { Users } = Models;

// types
import { UserDocument } from "@/schemas/user";

export async function readUsers(): Promise<
  UserDocument[] | null
> {
  try {
    await connectDB();

    const users = await Users.find({});

    if (!users) {
      return null;
    }

    return users;
  } catch (error) {
    console.error(`[ERROR] readUsers:
${error}`);

    return null;
  }
}

export async function readUser(
  userId: string
): Promise<UserDocument | null> {
  try {
    await connectDB();

    const user = await Users.findById(userId);

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

export async function updateUser(
  userId: string,
  updateData: Partial<UserDocument>
): Promise<UserDocument | null> {
  try {
    await connectDB();

    const user = await Users.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(`[ERROR] updateUser:
${error}`);

    return null;
  }
}

export async function deleteUser(
  userId: string
): Promise<UserDocument | null> {
  try {
    await connectDB();

    const user =
      await Users.findByIdAndDelete(userId);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(`[ERROR] deleteUser:
${error}`);

    return null;
  }
}
