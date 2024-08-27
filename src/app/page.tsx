import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Briefcase, ChevronRight, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-12 p-4">
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white py-12 md:py-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Welcome to Placement Tips!</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Your one-stop resource for college placements, career guidance, and interview preparation</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/tips" className="w-full sm:w-auto">
                Explore Tips
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white dark:bg-white/5 dark:hover:bg-white/10">
              <Link href="/companies" className="w-full sm:w-auto">View Companies</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center mix-blend-overlay"></div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 dark:text-white">Featured Resources</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl md:text-2xl">
                <BookOpen className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
                Latest Placement Tips
              </CardTitle>
              <CardDescription className="dark:text-gray-300">Stay updated with the latest advice</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="dark:text-gray-200">How to prepare for technical interviews</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="dark:text-gray-200">Top 10 resume mistakes to avoid</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="dark:text-gray-200">Mastering the art of group discussions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl md:text-2xl">
                <Briefcase className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
                Featured Companies
              </CardTitle>
              <CardDescription className="dark:text-gray-300">Learn about top recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="dark:text-gray-200">Tech Giant Inc.</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="dark:text-gray-200">Finance Pro Corp</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="dark:text-gray-200">StartUp Innovate</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-900 py-12 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Ready to boost your placement chances?</h2>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 dark:from-blue-500 dark:to-indigo-600 dark:hover:from-blue-600 dark:hover:to-indigo-700">
            <Link href="/tips" className="w-full sm:w-auto">
              Get Started Now
              <GraduationCap className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}