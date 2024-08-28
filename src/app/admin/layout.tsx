import { Metadata } from "next"
import Link from "next/link"
import { LayoutDashboard, FileText, Building, FormInput } from "lucide-react"

export const metadata: Metadata = {
    title: "Admin Dashboard | Placement Tips",
    description: "Admin dashboard for managing Placement Tips content",
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="w-64 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/tips"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <FileText className="h-5 w-5" />
                        <span>Tips</span>
                    </Link>
                    <Link
                        href="/admin/companies"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <Building className="h-5 w-5" />
                        <span>Companies</span>
                    </Link>
                    <Link
                        href="/admin/interview-data"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <FormInput className="h-5 w-5" />
                        <span>Interview Data</span>
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>
        </div>
    )
}