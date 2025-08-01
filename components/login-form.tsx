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
import { useAppDispatch } from "@/lib/hooks"
import { setUser } from "@/lib/features/auth/authSlice"
axios.defaults.withCredentials = true;

const formSchema = z.object({
 
  email: z.string().email({
    message: "Please enter valid email address."
  }),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters long."
  })
}).required()

const LoginForm = () => {

  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    setIsLoading(true)
    try{ 
      const {data} = await axios.post(`/api/auth/login`,values)
      dispatch(setUser(data.user))
      router.push("/")
      toast.success(data.message)
    
    }catch(error:any){
      toast.error(error?.response?.data?.message || 'Failed to login.')
     
    }finally{
      setIsLoading(false)
    }
    
  }


  return (
    <div className="max-w-md w-full mx-auto p-5 rounded-lg border">
      <h2 className="mb-4 text-2xl">Login to your account</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
       
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
            </> : 'Login'
          }
          </Button>
      </form>
    </Form>
    <p className="text-sm mt-4">Don't have an account ? <Link href={"/signup"} className="underline">Create here</Link></p>
    </div>
  )
}

export default LoginForm