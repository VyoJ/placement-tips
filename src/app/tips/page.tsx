import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Component() {
    const tips = [
        {
            title: "Mastering the Technical Interview",
            description: "Learn how to ace your technical interviews with confidence.",
            link: "https://www.youtube.com/watch?v=example1",
        },
        {
            title: "Building a Standout Resume",
            description: "Tips and tricks to make your resume shine among the competition.",
            link: "https://www.youtube.com/watch?v=example2",
        },
        {
            title: "Effective Communication in Interviews",
            description: "Improve your communication skills to impress interviewers.",
            link: "https://www.youtube.com/watch?v=example3",
        },
        {
            title: "Navigating the Job Offer Process",
            description: "Understanding and negotiating job offers like a pro.",
            link: "https://www.youtube.com/watch?v=example4",
        },
    ];

    return (
        <div className="container mx-auto py-8 max-w-6xl">
            <header className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-500">
                    Placement Tips and Resources
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Explore our curated list of tips and video resources to help you succeed in your placements.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 auto-rows-fr">
                {tips.map((tip, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                        <CardHeader className="flex-grow bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6">
                            <CardTitle className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">{tip.title}</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300">{tip.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-start p-4">
                            <Link
                                href={tip.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-300"
                            >
                                Watch Video
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}