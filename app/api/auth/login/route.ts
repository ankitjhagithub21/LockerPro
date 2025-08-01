import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { email, password } = await req.json()

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
      return NextResponse.json({ message: "Wrong email or password." }, { status: 401 })
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    // ✅ Set token in cookie
    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
    })

    return NextResponse.json({
      message: "User logged in successfully.",
      user: {
        username: user.username,
        email: user.email,
      },
    })

  } catch (error) {
    console.error("Login Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}