"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import {Loader2Icon} from "lucide-react"
import {useRouter} from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter valid email address."
  }),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters long."
  })
}).required()

const SignupForm = () => {

  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setIsLoading(true)
    try{ 
      const {data} = await axios.post(`/api/auth/signup`,values)
      router.push("/login")
      toast.success(data.message)
    
    }catch(error:any){
      toast.error(error?.response?.data?.message || 'Failed to create account.')
     
    }finally{
      setIsLoading(false)
    }
    
  }


  return (
    <div className="max-w-md w-full mx-auto p-5 rounded-lg border">
      <h2 className="mb-4 text-2xl">Create an account</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="exampl@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {
            isLoading ? <>
            <Loader2Icon className="animate-spin"/> 
            Please wait...
            </> : 'Register'
          }
          </Button>
      </form>

    </Form>
     <p className="text-sm mt-4">Already have an account ? <Link href={"/login"} className="underline">Login here</Link> </p>
    </div>
  )
}

export default SignupForm