"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import Link from "next/link"
axios.defaults.withCredentials = true;

export default function UserMenu() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {data} = await axios.get("/api/auth/user")
        setUser(data.user)
      } catch (err) {
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    await axios.post("/api/auth/logout")
    setUser(null)
    router.push("/login") 
    toast.success("Logout successfully.")
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="" alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => router.push("/login")}>Login</Button>
      <Button onClick={() => router.push("/signup")}>Sign Up</Button>
    </div>
  )
}
