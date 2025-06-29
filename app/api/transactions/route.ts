import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("GET /api/transactions called");
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session?.user?.id) {
      console.log("No session or user ID");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("User ID:", session.user.id);
    await connectMongoDB();

    const transactions = await Transaction.find({
      userId: session.user.id,
    }).sort({ date: -1 });
    console.log("Found transactions:", transactions.length);

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/transactions called");
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session?.user?.id) {
      console.log("No session or user ID");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, amount, category, description, date } = await request.json();
    console.log("Transaction data:", {
      type,
      amount,
      category,
      description,
      date,
    });

    // Validation
    if (!type || !amount || !category || !description || !date) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (type !== "income" && type !== "expense") {
      return NextResponse.json(
        { error: "Invalid transaction type" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be positive" },
        { status: 400 }
      );
    }

    // Validate date format
    const transactionDate = new Date(date);
    if (isNaN(transactionDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const transaction = await Transaction.create({
      type,
      amount: Number(amount),
      category,
      description,
      date: transactionDate,
      userId: session.user.id,
    });

    console.log("Created transaction:", transaction);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    // Only allow users to delete their own transactions
    await Transaction.findOneAndDelete({ _id: id, userId: session.user.id });
    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
