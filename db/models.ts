import { model, models } from "mongoose";

import {
  TransactionDocument,
  TransactionModel,
  transactionSchema
} from "@/schemas/transaction";
import {
  TripDocument,
  TripModel,
  tripSchema
} from "@/schemas/trip";
import {
  UserDocument,
  UserModel,
  userSchema
} from "@/schemas/user";

export interface ModelsType {
  Transactions: TransactionModel;
  Trips: TripModel;
  Users: UserModel;
}

const Models: ModelsType = {
  Transactions:
    models.Transaction ||
    model<TransactionDocument, TransactionModel>(
      "Transaction",
      transactionSchema
    ),
  Trips:
    models.Trip ||
    model<TripDocument, TripModel>(
      "Trip",
      tripSchema
    ),
  Users:
    models.User ||
    model<UserDocument, UserModel>(
      "User",
      userSchema
    )
};

export default Models;
