// libraries
import { NextResponse } from "next/server";

// controllers
import { addTransaction } from "@/app/api/transaction/controller";

import { TransactionDocument } from "@/schemas/transaction";

// request handlers (@ -> /api/transaction)
export async function POST(
  req: Request
): Promise<NextResponse> {
  try {
    const addData =
      (await req.json()) as Partial<TransactionDocument>;

    const transaction =
      await addTransaction(addData);

    if (!transaction) {
      console.error(
        `[ERROR] POST /api/transaction:
no transaction`
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
        data: transaction
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      `[ERROR] POST /api/transaction:
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
