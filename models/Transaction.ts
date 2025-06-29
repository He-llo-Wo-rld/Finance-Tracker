import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  userId: string; // Changed from ObjectId to string for OAuth compatibility
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: String, // Changed to String to handle both OAuth and regular user IDs
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
