'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { IInterviewData } from '@/models/InterviewData'
import isAuth from '@/components/isAuth'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

function InterviewDashboard() {
    const [interviewData, setInterviewData] = useState<IInterviewData[]>([])
    const [selectedInterview, setSelectedInterview] = useState<IInterviewData | null>(null)
    const [darkMode, setDarkMode] = useState(false)


    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/interview-data')
            setInterviewData(response.data)
            if (response.data.length > 0) {
                setSelectedInterview(response.data[0])
            }
        } catch (error) {
            console.error('Error fetching interview data:', error)
        }
    }

    const handleDeleteInterview = async (id: string) => {
        try {
            await axios.delete(`/api/interview-data/${id}`)
            setInterviewData(prevData => prevData.filter(interview => interview._id !== id))
            if (selectedInterview && selectedInterview._id === id) {
                setSelectedInterview(null)
            }
        } catch (error) {
            console.error('Error deleting interview:', error)
        }
    }

    if (interviewData.length === 0) {
        return (
            <h1>No Data!</h1>
        )
    }

    const averageSalary = interviewData.reduce((sum, interview) => sum + parseInt(interview.salary), 0) / interviewData.length
    const maxSalary = Math.max(...interviewData.map(interview => parseInt(interview.salary)))
    const minSalary = Math.min(...interviewData.map(interview => parseInt(interview.salary)))
    const totalInterviews = interviewData.length

    const companyCounts = interviewData.reduce((acc, interview) => {
        acc[interview.companyName] = (acc[interview.companyName] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const companyData = Object.entries(companyCounts).map(([name, count]) => ({ name, count }))

    const salaryData = interviewData.map(interview => ({
        name: interview.fullName,
        salary: parseInt(interview.salary)
    }))

    const jobTitleData = interviewData.reduce((acc, interview) => {
        acc[interview.jobTitle] = (acc[interview.jobTitle] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const jobTitleChartData = Object.entries(jobTitleData).map(([name, value]) => ({ name, value }))

    const difficultyHeatmapData = interviewData.map(interview => ({
        company: interview.companyName,
        difficulty: interview.totalRounds.length
    }))

    return (
        <div className={`mx-auto p-4 ${darkMode ? 'dark' : ''}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Interview Data Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalInterviews}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${averageSalary.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Highest Salary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${maxSalary}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lowest Salary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${minSalary}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Individual Interview Data</CardTitle>
                        <CardDescription>Select an interview to view details or delete</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-4 mb-4">
                            <Select
                                onValueChange={(value) => setSelectedInterview(interviewData.find(i => i._id === value)!)}
                                value={selectedInterview?._id}
                            >
                                <SelectTrigger className="w-[300px]">
                                    <SelectValue placeholder="Select an interview" />
                                </SelectTrigger>
                                <SelectContent>
                                    {interviewData.map((interview) => (
                                        <SelectItem key={interview._id} value={interview._id}>
                                            {interview.fullName} - {interview.companyName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <ScrollArea className="h-[200px] mb-4 border rounded-md p-4">
                            {interviewData.map((interview) => (
                                <div key={interview._id} className="flex justify-between items-center mb-2">
                                    <span>{interview.fullName} - {interview.companyName}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteInterview(interview._id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </ScrollArea>

                        {selectedInterview && (
                            <ScrollArea className="h-[400px] border rounded-md p-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold">Personal Information</h3>
                                        <p>Name: {selectedInterview.fullName}</p>
                                        <p>Email: {selectedInterview.email}</p>
                                        <p>University: {selectedInterview.university}</p>
                                        <p>Course: {selectedInterview.course}</p>
                                        <p>Graduation Year: {selectedInterview.graduationYear}</p>
                                        <p>LinkedIn: <a href={selectedInterview.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{selectedInterview.linkedinUrl}</a></p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Job Information</h3>
                                        <p>Company: {selectedInterview.companyName}</p>
                                        <p>Job Title: {selectedInterview.jobTitle}</p>
                                        <p>Location: {selectedInterview.jobLocation}</p>
                                        <p>Salary: ${selectedInterview.salary}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Interview Details</h3>
                                        <p>Total Rounds: {selectedInterview.totalRounds}</p>
                                        <p>Technical Round: {selectedInterview.technicalRoundDetails}</p>
                                        <p>HR Round: {selectedInterview.hrRoundDetails}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Advice</h3>
                                        <p>Preparation Strategy: {selectedInterview.preparationStrategy}</p>
                                        <p>Challenging Question: {selectedInterview.challengingQuestion}</p>
                                        <p>Advice: {selectedInterview.advice}</p>
                                    </div>
                                </div>
                            </ScrollArea>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Analytics Overview</CardTitle>
                        <CardDescription>Key insights from all interviews</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="companies">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="companies">Companies</TabsTrigger>
                                <TabsTrigger value="salaries">Salaries</TabsTrigger>
                                <TabsTrigger value="jobTitles">Job Titles</TabsTrigger>
                            </TabsList>
                            <TabsContent value="companies">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={companyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </TabsContent>
                            <TabsContent value="salaries">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={salaryData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="salary" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </TabsContent>
                            <TabsContent value="jobTitles">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={jobTitleChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {jobTitleChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default isAuth(InterviewDashboard)
