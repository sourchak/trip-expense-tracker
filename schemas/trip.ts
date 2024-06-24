// libraries
// mongoose (ODM) [mongoDB]
import {
  Document,
  models,
  Model,
  Schema
} from "mongoose";

// types
import { UserDocument } from "@/schemas/user";

// document type (row) [typescript]
export interface TripDocument extends Document {
  owner: Schema.Types.ObjectId | UserDocument;
  title: string;
  description: string;
  members:
    | Schema.Types.ObjectId[]
    | UserDocument[];
  createdAt: Date;
  updatedAt: Date;
}

// model type (table) [typescript]
export interface TripModel
  extends Model<TripDocument> {}

// schema (table data structure) [mongoose]
export const tripSchema = new Schema<
  TripDocument,
  TripModel
>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

// middlewares
// pre-save
tripSchema.pre("save", async function (next) {
  // extracting fields
  const { owner: ownerId, members } = this;

  // validation
  // validating owner
  const isValid =
    await models.User.findById(
      ownerId
    ).countDocuments();

  if (!isValid) {
    throw new Error("Invalid Owner");
  }

  // validating members
  for (let memberId of members) {
    const isValid =
      await models.User.findById(
        memberId
      ).countDocuments();

    if (!isValid) {
      throw new Error("Invalid Member");
    }
  }

  // validating unique members
  const hasDuplicateMembers =
    new Set(
      members.map((memberId) =>
        memberId.toString()
      )
    ).size !== members.length;

  if (hasDuplicateMembers) {
    throw new Error("Duplicate Member");
  }

  next();
});
