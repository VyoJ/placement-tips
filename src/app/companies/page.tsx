// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Building2, Users, GraduationCap } from "lucide-react"

// export default function CompaniesPage() {
//     const companies = [
//         {
//             name: "Tech Giant Inc.",
//             description: "A leading technology company known for innovation and growth.",
//             roles: ["Software Engineer", "Product Manager", "Data Scientist"],
//             requirements: "Strong computer science fundamentals, problem-solving skills",
//         },
//         {
//             name: "Finance Pro Corp",
//             description: "Global financial services firm with diverse opportunities.",
//             roles: ["Financial Analyst", "Investment Banking Associate", "Risk Management"],
//             requirements: "Strong analytical skills, understanding of financial markets",
//         },
//         {
//             name: "StartUp Innovate",
//             description: "Fast-growing startup disrupting the tech industry.",
//             roles: ["Full Stack Developer", "UX Designer", "Growth Hacker"],
//             requirements: "Adaptability, passion for technology, entrepreneurial mindset",
//         },
//         {
//             name: "Consulting Excellence",
//             description: "Top-tier management consulting firm solving complex business problems.",
//             roles: ["Business Analyst", "Associate Consultant", "Research Associate"],
//             requirements: "Strong analytical and communication skills, business acumen",
//         },
//     ]

//     return (
//         <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
//             <div className="max-w-6xl mx-auto space-y-8">
//                 <div className="space-y-2">
//                     <h1 className="text-3xl font-bold tracking-tight">Company Information</h1>
//                     <p className="text-xl text-muted-foreground">
//                         Learn about top companies recruiting from our college and their requirements.
//                     </p>
//                 </div>

//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {companies.map((company, index) => (
//                         <Card key={index} className="flex flex-col">
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <Building2 className="h-5 w-5" />
//                                     {company.name}
//                                 </CardTitle>
//                                 <CardDescription>{company.description}</CardDescription>
//                             </CardHeader>
//                             <CardContent className="flex-grow flex flex-col justify-between">
//                                 <div className="space-y-4">
//                                     <div>
//                                         <h3 className="font-semibold mb-2 flex items-center gap-2">
//                                             <Users className="h-4 w-4" />
//                                             Available Roles:
//                                         </h3>
//                                         <div className="flex flex-wrap gap-2">
//                                             {company.roles.map((role, roleIndex) => (
//                                                 <Badge key={roleIndex} variant="secondary">
//                                                     {role}
//                                                 </Badge>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <h3 className="font-semibold mb-2 flex items-center gap-2">
//                                             <GraduationCap className="h-4 w-4" />
//                                             Key Requirements:
//                                         </h3>
//                                         <p className="text-sm text-muted-foreground">{company.requirements}</p>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// app/companies/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, GraduationCap } from "lucide-react"

interface Company {
    _id: string;
    name: string;
    description: string;
    roles: string[];
    requirements: string;
}

async function getCompanies(): Promise<Company[]> {
    const res = await fetch(`/api/companies`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch companies');
    }
    return res.json();
}

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return (
        <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Company Information</h1>
                    <p className="text-xl text-muted-foreground">
                        Learn about top companies recruiting from our college and their requirements.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company) => (
                        <Card key={company._id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    {company.name}
                                </CardTitle>
                                <CardDescription>{company.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            Available Roles:
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {company.roles.map((role, roleIndex) => (
                                                <Badge key={roleIndex} variant="secondary">
                                                    {role}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4" />
                                            Key Requirements:
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{company.requirements}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}