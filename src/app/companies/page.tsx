import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CompaniesPage() {
    const companies = [
        {
            name: "Tech Giant Inc.",
            description: "A leading technology company known for innovation and growth.",
            roles: ["Software Engineer", "Product Manager", "Data Scientist"],
            requirements: "Strong computer science fundamentals, problem-solving skills",
        },
        {
            name: "Finance Pro Corp",
            description: "Global financial services firm with diverse opportunities.",
            roles: ["Financial Analyst", "Investment Banking Associate", "Risk Management"],
            requirements: "Strong analytical skills, understanding of financial markets",
        },
        {
            name: "StartUp Innovate",
            description: "Fast-growing startup disrupting the tech industry.",
            roles: ["Full Stack Developer", "UX Designer", "Growth Hacker"],
            requirements: "Adaptability, passion for technology, entrepreneurial mindset",
        },
        {
            name: "Consulting Excellence",
            description: "Top-tier management consulting firm solving complex business problems.",
            roles: ["Business Analyst", "Associate Consultant", "Research Associate"],
            requirements: "Strong analytical and communication skills, business acumen",
        },
    ]

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Company Information</h1>
            <p className="text-xl">Learn about top companies recruiting from our college and their requirements.</p>

            <div className="grid md:grid-cols-2 gap-6">
                {companies.map((company, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{company.name}</CardTitle>
                            <CardDescription>{company.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-2">Available Roles:</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {company.roles.map((role, roleIndex) => (
                                    <Badge key={roleIndex} variant="secondary">{role}</Badge>
                                ))}
                            </div>
                            <h3 className="font-semibold mb-2">Key Requirements:</h3>
                            <p>{company.requirements}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}