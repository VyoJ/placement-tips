'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ICompany } from '@/models/Company'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import isAuth from '@/components/isAuth'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const companySchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    roles: z.string().refine(value => value.split(',').filter(Boolean).length > 0, {
        message: "At least one role is required.",
    }),
    requirements: z.string().min(10, {
        message: "Requirements must be at least 10 characters.",
    }),
    featured: z.boolean().default(false),
})

function AdminCompanies() {
    const [companies, setCompanies] = useState<ICompany[]>([])
    const [editingCompany, setEditingCompany] = useState<ICompany | null>(null)
    const { toast } = useToast()
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const addForm = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: "",
            description: "",
            roles: "",
            requirements: "",
            featured: false,
        },
    })

    const editForm = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
    })

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("/api/companies")
                setCompanies(response.data)
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch companies.",
                })
            }
        }

        fetchCompanies()
    }, [toast])

    const deleteCompany = async (id: string) => {
        try {
            await axios.delete(`/api/companies/${id}`)
            setCompanies(companies.filter(company => company._id !== id))
            toast({
                title: "Company Deleted",
                description: "The company has been successfully deleted.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete the company.",
            })
        }
    }

    const handleEditSubmit = async (values: z.infer<typeof companySchema>) => {
        if (!editingCompany) return

        try {
            const updatedCompany = { ...editingCompany, ...values, roles: values.roles.split(',').map(role => role.trim()) }
            const response = await axios.put(`/api/companies`, updatedCompany)
            setCompanies(companies.map(company => company._id === editingCompany._id ? response.data : company))
            setEditingCompany(null)
            setIsEditDialogOpen(false)
            toast({
                title: "Company Updated",
                description: "The company has been successfully updated.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update the company.",
            })
        }
    }

    const handleAddSubmit = async (values: z.infer<typeof companySchema>) => {
        try {
            const newCompany = { ...values, roles: values.roles.split(',').map(role => role.trim()) }
            const response = await axios.post(`/api/companies`, newCompany)
            setCompanies([...companies, response.data])
            setIsAddDialogOpen(false)
            addForm.reset()
            toast({
                title: "Company Added",
                description: "The new company has been successfully added.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add the company.",
            })
        }
    }

    return (
        <div className="space-y-6 p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-2xl font-bold">Manage Companies</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Company
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Company</DialogTitle>
                        </DialogHeader>
                        <Form {...addForm}>
                            <form onSubmit={addForm.handleSubmit(handleAddSubmit)} className="space-y-4">
                                <FormField
                                    control={addForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={addForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={addForm.control}
                                    name="roles"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Roles (comma-separated)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={addForm.control}
                                    name="requirements"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Requirements</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={addForm.control}
                                    name="featured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Featured</FormLabel>
                                                <FormDescription>
                                                    Set this company as featured
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Add Company</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {companies.map((company) => (
                    <Card key={company._id}>
                        <CardHeader>
                            <CardTitle>{company.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{company.description}</p>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                <strong>Roles:</strong> {company.roles.join(', ')}
                            </div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                <strong>Requirements:</strong> {company.requirements}
                            </div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                <strong>Featured:</strong> {company.featured ? 'Yes' : 'No'}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={() => {
                                        setEditingCompany(company)
                                        editForm.reset({
                                            name: company.name,
                                            description: company.description,
                                            roles: company.roles.join(', '),
                                            requirements: company.requirements,
                                            featured: company.featured,
                                        })
                                    }}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit Company</DialogTitle>
                                    </DialogHeader>
                                    {editingCompany && (
                                        <Form {...editForm}>
                                            <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4">
                                                <FormField
                                                    control={editForm.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Name</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={editForm.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Description</FormLabel>
                                                            <FormControl>
                                                                <Textarea {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={editForm.control}
                                                    name="roles"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Roles (comma-separated)</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={editForm.control}
                                                    name="requirements"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Requirements</FormLabel>
                                                            <FormControl>
                                                                <Textarea {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={editForm.control}
                                                    name="featured"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>Featured</FormLabel>
                                                                <FormDescription>
                                                                    Set this company as featured
                                                                </FormDescription>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="submit">Update Company</Button>
                                            </form>
                                        </Form>
                                    )}
                                </DialogContent>
                            </Dialog>
                            <Button variant="destructive" onClick={() => deleteCompany(company._id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default isAuth(AdminCompanies);