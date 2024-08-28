"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from 'next-auth/react';
import { FileText, Building, FormInput } from "lucide-react";
import isAuth from '@/components/isAuth';

function AdminDashboard() {
    const { data: session } = useSession();
    console.log("Here", session)
    const [tipsCount, setTipsCount] = useState(0);
    const [companiesCount, setCompaniesCount] = useState(0);
    const [submissionsCount, setSubmissionsCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tipsResponse = await axios.get('/api/tips');
                console.log("tipsResponse", tipsResponse);
                const companiesResponse = await axios.get('/api/companies');
                console.log("companiesResponse", companiesResponse)
                const submissionsResponse = await axios.get('/api/interview-data');

                setTipsCount(tipsResponse.data.count || 0);
                setCompaniesCount(companiesResponse.data.count || 0);
                setSubmissionsCount(submissionsResponse.data.count || 0);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tips</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tipsCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Companies Listed</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{companiesCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
                        <FormInput className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{submissionsCount}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default isAuth(AdminDashboard);