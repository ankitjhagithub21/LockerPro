import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET as string

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const user = await User.findById(decoded.userId).select("-password") 

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "User fetched successfully",
      user:{
        username:user.username,
        email:user.email
      },
    })
  } catch (error) {
    console.error("Auth Error:", error)
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
  }
}
