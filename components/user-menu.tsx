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
import { setUser } from "@/lib/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
axios.defaults.withCredentials = true;

export default function UserMenu() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector((state)=>state.auth.user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {data} = await axios.get("/api/auth/user")
        dispatch(setUser(data.user))
      } catch (err) {
        dispatch(setUser(null))
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    await axios.post("/api/auth/logout")
    dispatch(setUser(null))
    router.push("/login") 
    toast.success("Logout successfully.")
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>{user?.email}</DropdownMenuItem>
           <DropdownMenuItem>
            <Link className="text-sm" href={"/saved-passwords"}>Saved Passwords</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link className="text-sm" href={"/create-password"}>Create New Password</Link>
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
