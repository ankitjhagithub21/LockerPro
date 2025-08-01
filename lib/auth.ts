import jwt from "jsonwebtoken"
import { cookies } from "next/headers"


const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthUser {
  userId: string
  email?: string
}

// Reusable function to verify and return decoded user
export async function getAuthUser() : Promise<AuthUser | null>{
    const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}
