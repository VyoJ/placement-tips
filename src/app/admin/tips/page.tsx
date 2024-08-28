'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ITip } from '@/models/Tip'
import isAuth from '@/components/isAuth'

interface Tip {
    title: string;
    description: string;
    link: string;
}

function AdminTips() {
    const [tips, setTips] = useState<ITip[]>([])
    const [editingTip, setEditingTip] = useState<ITip | null>(null)
    const { toast } = useToast()

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const response = await axios.get(`/api/tips`)
                setTips(response.data)
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch tips.",
                })
            }
        }

        fetchTips()
    }, [toast])

    const deleteTip = async (id: string) => {
        try {
            await axios.delete(`/api/tips/${id}`)
            setTips(tips.filter(tip => tip._id !== id))
            toast({
                title: "Tip Deleted",
                description: "The tip has been successfully deleted.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete the tip.",
            })
        }
    }

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!editingTip) return

        try {
            let editedTip: ITip = await axios.put(`/api/tips`, editingTip)
            setTips(tips.map(tip => tip._id === editingTip._id ? editingTip : tip))
            setEditingTip(editedTip)
            toast({
                title: "Tip Updated",
                description: "The tip has been successfully updated.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update the tip.",
            })
        }
    }

    const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newTip: Tip = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            link: formData.get('link') as string,
        }

        try {
            let savedTip: ITip = await axios.post(`/api/tips`, newTip)
            console.log("savedTip", savedTip)
            setTips([...tips, savedTip])
            toast({
                title: "Tip Added",
                description: "The new tip has been successfully added.",
            })
            e.currentTarget.reset()
        } catch (error) {
            console.log("error", error)
            toast({
                title: "Error",
                description: "Failed to add the tip.",
            })
        }
    }

    return (
        <div className="space-y-6 p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-2xl font-bold">Manage Tips</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Tip
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Tip</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="add-title">Title</Label>
                                <Input id="add-title" name="title" required />
                            </div>
                            <div>
                                <Label htmlFor="add-description">Description</Label>
                                <Textarea id="add-description" name="description" required />
                            </div>
                            <div>
                                <Label htmlFor="add-link">Link</Label>
                                <Input id="add-link" name="link" type="url" required />
                            </div>
                            <Button type="submit">Add Tip</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tips.map((tip) => (
                    <Card key={tip._id}>
                        <CardHeader>
                            <CardTitle>{tip.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
                            <a href={tip.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-2 block">
                                Learn More
                            </a>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={() => setEditingTip(tip)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Tip</DialogTitle>
                                    </DialogHeader>
                                    {editingTip && (
                                        <form onSubmit={handleEditSubmit} className="space-y-4">
                                            <div>
                                                <Label htmlFor="edit-title">Title</Label>
                                                <Input
                                                    id="edit-title"
                                                    value={editingTip.title}
                                                    onChange={(e) => setEditingTip({ ...editingTip, title: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="edit-description">Description</Label>
                                                <Textarea
                                                    id="edit-description"
                                                    value={editingTip.description}
                                                    onChange={(e) => setEditingTip({ ...editingTip, description: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="edit-link">Link</Label>
                                                <Input
                                                    id="edit-link"
                                                    value={editingTip.link}
                                                    onChange={(e) => setEditingTip({ ...editingTip, link: e.target.value })}
                                                    type="url"
                                                    required
                                                />
                                            </div>
                                            <Button type="submit">Update Tip</Button>
                                        </form>
                                    )}
                                </DialogContent>
                            </Dialog>
                            <Button variant="destructive" onClick={() => deleteTip(tip._id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default isAuth(AdminTips);