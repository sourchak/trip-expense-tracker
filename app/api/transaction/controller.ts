import connectDB from "@/db/mongoose";

import Models from "@/db/models";
const { Transactions } = Models;

import { TransactionDocument } from "@/schemas/transaction";

export async function addTransaction(
  addData: Partial<TransactionDocument>
): Promise<TransactionDocument | null> {
  try {
    await connectDB();

    const newTransaction = new Transactions(
      addData
    );
    const transaction =
      await newTransaction.save();

    if (!transaction) {
      return null;
    }

    const populatedTransaction =
      await Transactions.findById(transaction._id)
        .populate({
          path: "trip",
          select: "title"
        })
        .populate({
          path: "owner",
          select: "username"
        })
        .populate({
          path: "contributions",
          populate: {
            path: "contributor",
            select: "username"
          }
        })
        .populate({
          path: "recipients",
          populate: {
            path: "recipient",
            select: "username"
          }
        });

    if (!populatedTransaction) {
      return null;
    }

    return populatedTransaction;
  } catch (error) {
    console.error(`[ERROR] addTransaction:
${error}`);

    return null;
  }
}
