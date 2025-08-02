"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Eye, Trash2, Loader2Icon } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import Link from "next/link"
axios.defaults.withCredentials = true;

interface PasswordItem {
    _id: string
    title: string
    website?: string
    username?: string
    password: string
    createdAt:string
}

export default function PasswordManager() {
    const [passwords, setPasswords] = useState<PasswordItem[]>([])
    const [filtered, setFiltered] = useState<PasswordItem[]>([])
    const [search, setSearch] = useState("")
    const [selected, setSelected] = useState<PasswordItem | null>(null)
    const [dialogType, setDialogType] = useState<"view" | "edit" | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchPasswords()
    }, [])

    useEffect(() => {
        setFiltered(
            passwords.filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase())
        ))
    }, [search, passwords])

    const fetchPasswords = async () => {
        try {
            const { data } = await axios.get("/api/passwords")
            setPasswords(data.data || [])
        } catch (error) {
            setPasswords([])
        }
    }

    const deletePassword = async (id: string) => {
        try {
            const { data } = await axios.delete(`/api/passwords/${id}`)
            toast.success(data.message)
            fetchPasswords()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Password not deleted.')
        }
    }

    const editPassword = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.put(`/api/passwords/update/${selected?._id}`, selected)
            toast.success(data.message)
            fetchPasswords()
            setDialogType(null)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Password not saved.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (field: keyof PasswordItem, value: string) => {
        if (selected) {
            setSelected({
                ...selected,
                [field]: value
            })
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Saved Passwords</h2>
                <Link href={"/create-password"}>
                    <Button>Add</Button>
                </Link>
            </div>
            <Input
                placeholder="Search passwords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4"
            />

            <ScrollArea className="h-[500px] rounded-md border p-4">
                {filtered.length === 0 ? (
                    <p className="text-muted-foreground">No passwords found.</p>
                ) : (
                    filtered.map((item) => (
                        <Card key={item._id} className="mb-4">
                            <CardHeader className="flex md:flex-row flex-col-reverse justify-between md:items-center items-start">
                                  <p className="text-sm"> Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost" onClick={() => { setSelected(item); setDialogType("view") }}><Eye size={18} /></Button>
                                    <Button size="icon" variant="ghost" onClick={() => { setSelected(item); setDialogType("edit") }}><Pencil size={18} /></Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="icon" variant="ghost" onClick={() => setDeleteId(item._id)}>
                                                <Trash2 size={18} />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to delete this password?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => {
                                                        if (deleteId) deletePassword(deleteId)
                                                    }}
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                    <h4 className="font-medium ">Title {item.title}</h4>
                                 
                                <p className="text-sm">Username: {item.username || "-"}</p>
                            </CardContent>
                            
                        </Card>
                    ))
                )}
            </ScrollArea>

            <Dialog open={!!dialogType && !!selected} onOpenChange={() => { setSelected(null); setDialogType(null) }}>
                <DialogContent onInteractOutside={(e) => e.preventDefault()} showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>{dialogType === "view" ? "View Password" : "Edit Password"}</DialogTitle>
                    </DialogHeader>
                    {selected && (
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">Title</p>
                                <Input
                                    value={selected.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    disabled={dialogType === "view"}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Website</p>
                                <Input
                                    value={selected.website || ''}
                                    onChange={(e) => handleInputChange('website', e.target.value)}
                                    disabled={dialogType === "view"}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Username</p>
                                <Input
                                    value={selected.username || ''}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    disabled={dialogType === "view"}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Password</p>
                                <Textarea
                                    value={selected.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    disabled={dialogType === "view"}
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter className="mt-4">
                        <Button variant="outline" disabled={isLoading} onClick={() => { setDialogType(null); setSelected(null) }}>Close</Button>
                        {dialogType === "edit" && (
                            <Button onClick={editPassword} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2Icon className="animate-spin mr-2" />
                                        Saving...
                                    </>
                                ) : 'Save changes'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}