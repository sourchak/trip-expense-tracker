// libraries
// mongoose (ODM) [mongoDB]
import {
  Document,
  models,
  Model,
  Schema,
  Types
} from "mongoose";

//
import { TripDocument } from "@/schemas/trip";
import { UserDocument } from "@/schemas/user";

export interface ContributionDocument
  extends Document {
  contributor: Types.ObjectId | UserDocument;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IssueDocument extends Document {
  title: string;
  message: string;
  isResolved: boolean;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipientDocument
  extends Document {
  recipient: Types.ObjectId | UserDocument;
  amount: number;
  issue: IssueDocument;
  createdAt: Date;
  updatedAt: Date;
}

// document type (row) [typescript]
export interface TransactionDocument
  extends Document {
  trip: Types.ObjectId | TripDocument;
  owner: Types.ObjectId | UserDocument;
  category:
    | "personal"
    | "food"
    | "rent"
    | "travel"
    | "others";
  title: string;
  contributions: ContributionDocument[];
  recipients: RecipientDocument[];
  createdAt: Date;
  updatedAt: Date;
}

// model type (table) [typescript]
export interface TransactionModel
  extends Model<TransactionDocument> {}

// schema (table data structure) [mongoose]
export const contributionSchema =
  new Schema<ContributionDocument>(
    {
      contributor: {
        type: Types.ObjectId,
        ref: "User",
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

export const issueSchema =
  new Schema<IssueDocument>(
    {
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      isResolved: {
        type: Boolean,
        required: true,
        default: false
      },
      isClosed: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    {
      timestamps: true
    }
  );

export const recipientSchema =
  new Schema<RecipientDocument>(
    {
      recipient: {
        type: Types.ObjectId,
        ref: "User",
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      issue: {
        type: issueSchema,
        required: false
      }
    },
    {
      timestamps: true
    }
  );

export const transactionSchema = new Schema<
  TransactionDocument,
  TransactionModel
>(
  {
    trip: {
      type: Types.ObjectId,
      ref: "Trip",
      required: true
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: String,
      enum: [
        "personal",
        "food",
        "rent",
        "travel",
        "others"
      ],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    contributions: [
      {
        type: contributionSchema,
        required: true
      }
    ],
    recipients: [
      {
        type: recipientSchema,
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
transactionSchema.pre(
  "save",
  async function (next) {
    // extracting fields
    const {
      trip: tripId,
      owner: ownerId,
      contributions,
      recipients
    } = this;

    // validation
    // validating owner
    const isValid =
      await models.User.findById(
        ownerId
      ).countDocuments();

    if (!isValid) {
      throw new Error("Invalid Owner");
    }

    // validating contributors
    for (let contribution of contributions) {
      const contributorId =
        contribution.contributor as Types.ObjectId;

      const isValid = await models.User.findById(
        contributorId
      ).countDocuments();

      if (!isValid) {
        throw new Error("Invalid Contributor");
      }
    }

    // validating recipients
    for (let recipient of recipients) {
      const recipientId =
        recipient.recipient as Types.ObjectId;

      const isValid =
        await models.User.findById(
          recipientId
        ).countDocuments();

      if (!isValid) {
        throw new Error("Invalid Recipient");
      }
    }

    // validating unique contributors
    const hasDuplicateContributors =
      new Set(
        contributions.map(({ contributor }) =>
          (
            contributor as Types.ObjectId
          ).toString()
        )
      ).size !== contributions.length;

    if (hasDuplicateContributors) {
      throw new Error("Duplicate Contributors");
    }

    // validating unique recipients
    const hasDuplicateRecipients =
      new Set(
        recipients.map(({ recipient }) =>
          (recipient as Types.ObjectId).toString()
        )
      ).size !== recipients.length;

    if (hasDuplicateRecipients) {
      throw new Error("Duplicate Recipients");
    }

    next();
  }
);
