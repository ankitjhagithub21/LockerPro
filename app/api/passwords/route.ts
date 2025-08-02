import { connectToDatabase } from "@/lib/db"
import { Password } from "@/models/Password"
import { getAuthUser } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const user = await getAuthUser()

    if (!user || !user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const passwords = await Password.find({ userId: user.userId }).sort({ createdAt: -1 })

    return NextResponse.json({ data: passwords }, { status: 200 })

  } catch (error) {
    console.error("Error fetching passwords:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
