// Update the import path if the location is different, for example:
import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find and delete transaction, ensuring it belongs to the user
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deletedTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
