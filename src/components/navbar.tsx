'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/modeToggle"
import { Button } from "@/components/ui/button"
import { X, Menu } from "lucide-react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <header className="bg-ring text-secondary border-b">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-semibold">
                            Placement Tips
                        </Link>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex items-center space-x-4 text-secondary hover:text-muted-secondary">
                            <NavLinks />
                            <Button className="bg-background text-foreground" variant="ghost">
                                <Link href="/form">Details Form</Link>
                            </Button>
                            <ModeToggle />
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-foreground" />}
                            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
                        </Button>
                    </div>
                </div>
            </nav>
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full bg-foreground transition-transform duration-300 ease-in-out sm:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-16 px-4 border-b">
                        <span className="text-xl font-semibold">Menu</span>
                        <Button variant="outline" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-6 w-6 text-foreground" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </div>
                    <div className="flex flex-col space-y-4 px-4 pt-8">
                        <NavLinks />
                        <Button className="bg-background text-foreground" variant="ghost">
                            <Link href="/form">Details Form</Link>
                        </Button>
                        <div className="pt-4">
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function NavLinks() {
    return (
        <>
            <Link href="/" className="dark:text-secondary dark:hover:text-muted-secondary">
                Home
            </Link>
            <Link href="/tips" className="dark:text-secondary dark:hover:text-muted-secondary">
                Tips
            </Link>
            <Link href="/companies" className="dark:text-secondary dark:hover:text-muted-secondary">
                Companies
            </Link>
        </>
    )
}