"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                    <p className="mt-2 text-muted-foreground">Enter your email and password below to access your account.</p>
                </div>
                <Card>
                    <CardContent className="space-y-4">
                        {error && <div className="text-red-500">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <CardFooter>
                                <Button className="w-full" type="submit">Sign in</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="font-medium underline" prefetch={false}>
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
