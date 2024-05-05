// libraries
// mongoose (ODM) [mongoDB]
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
// document type (row) [typescript]
export interface UserDocument extends Document {
  mobileNo: number;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// model type (table) [typescript]
export interface UserModel
  extends Model<UserDocument> {}

// schema (table data structure) [mongoose]
export const userSchema = new Schema<
  UserDocument,
  UserModel
>(
  {
    mobileNo: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
