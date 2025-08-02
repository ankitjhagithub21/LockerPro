import { connectToDatabase } from "@/lib/db"
import { Password } from "@/models/Password"
import { getAuthUser } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: any }) {
  try {
    await connectToDatabase();

    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, website, username, password } = await req.json();

    if (!title || !password) {
      return NextResponse.json({ message: "Title and password are required" }, { status: 400 });
    }

    const passwordEntry = await Password.findOne({ _id: params.id, userId: user.userId });

    if (!passwordEntry) {
      return NextResponse.json({ message: "Password not found or access denied" }, { status: 404 });
    }

    passwordEntry.title = title;
    passwordEntry.website = website || "";
    passwordEntry.username = username || "";
    passwordEntry.password = password;

    await passwordEntry.save();

    return NextResponse.json({ message: "Password updated successfully", data: passwordEntry }, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}