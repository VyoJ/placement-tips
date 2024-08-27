import { Inter } from "next/font/google";
import { Provider } from "../provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={inter.className}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <main className="container mx-auto px-6 py-8">
                    {children}
                </main>
                <Toaster />
            </ThemeProvider>
        </div>
    )
}
