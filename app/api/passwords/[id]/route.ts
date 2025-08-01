import { connectToDatabase } from "@/lib/db";
import { Password } from "@/models/Password";
import { getAuthUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: any }
) {
  try {
    await connectToDatabase();
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = context.params; // Access params from context
    const password = await Password.findOne({ _id: id, userId: user.userId });

    if (!password) {
      return NextResponse.json(
        { message: "Password not found or access denied" },
        { status: 404 }
      );
    }

    await password.deleteOne();

    return NextResponse.json(
      { message: "Password deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting password:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}