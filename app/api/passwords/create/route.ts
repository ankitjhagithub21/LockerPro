import { connectToDatabase } from "@/lib/db"
import { Password } from "@/models/Password"
import { AuthUser, getAuthUser } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()

    const user  = await getAuthUser()

    if (!user || !user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, website, username, password } = await req.json()

    if (!title || !password) {
      return NextResponse.json({ message: "Title and password are required." }, { status: 400 })
    }

    const newPassword = new Password({
      userId:user.userId,
      title,
      website,
      username,
      password,
    })

    await newPassword.save()

    return NextResponse.json({
      message: "Password saved successfully.",
      data: newPassword,
    }, { status: 201 })

  } catch (error) {
    console.error("Password Save Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
