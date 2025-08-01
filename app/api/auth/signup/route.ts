import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { username, email,password } = await req.json()
    
    let user = await User.findOne({email})

    if(user){
        return NextResponse.json({ message: "Email already exist." }, { status: 400 })
    }
 
    user = await User.create({ username, email, password })

    return NextResponse.json({message:"Account created successfully.", data:{
        username:user.username,
        email:user.email
    }}, { status: 201 })
  } catch (error) {
    console.error("DB Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
