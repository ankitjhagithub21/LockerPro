import { connectToDatabase } from "@/lib/db"
import { Password } from "@/models/Password"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectToDatabase()

    const body = await req.json()
    const { userId, title, website, username, encryptedPassword } = body

    // Validate required fields
    if (!title || !encryptedPassword) {
      return NextResponse.json(
        { message: "Title and encrypted password are required." },
        { status: 400 }
      )
    }

    const newPassword = new Password({
      userId,
      title,
      website,
      username,
      encryptedPassword,
    })

    await newPassword.save()

    return NextResponse.json(
      {
        message: "Password saved successfully.",
        data: newPassword,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating password:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
