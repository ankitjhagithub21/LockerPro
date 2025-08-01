"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import axios from "axios";
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"
axios.defaults.withCredentials = true;

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  password: z.string().min(1, "Password is required"),
  website: z.string().optional(),
  username: z.string().optional(),
})

export function CreatePasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      password: "",
      website: "",
      username: "",
    },
  })

  const [isLoading,setIsLoading] = useState(false)
const { reset } = form

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
 
   setIsLoading(true);
   try{
    const {data}= await axios.post("/api/password/create",values);
    toast.success(data.message)
    reset()
   }catch(error:any){
      toast.error(error?.response?.data.message || 'Password not saved !')
   }finally{
    setIsLoading(false)
   }
  }

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-semibold mb-6">Create New Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., GitHub" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., johndoe123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., https://github.com" {...field} />
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
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Textarea placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {
              isLoading ? <><Loader2Icon className="animate-spin"/>
              Saving...
              </> : 'Save Password'
            }
          </Button>
        </form>
      </Form>
    </div>
  )
}
