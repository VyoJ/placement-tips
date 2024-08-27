"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, User, Briefcase, MessageSquare, HelpCircle } from 'lucide-react';
import { submitInterviewData } from "@/app/actions";

interface IFormData {
  _id: string;
  fullName: string;
  email: string;
  university: string;
  course: string;
  otherCourse?: string;
  graduationYear: string;
  linkedinUrl: string;
  companyName: string;
  jobTitle: string;
  jobLocation: string;
  salary: string;
  totalRounds: string;
  technicalRoundDetails: string;
  hrRoundDetails: string;
  preparationStrategy: string;
  challengingQuestion: string;
  advice: string;
}

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  university: z.string().min(2, { message: "University name must be at least 2 characters." }),
  course: z.string().min(2, { message: "Course name must be at least 2 characters." }),
  otherCourse: z.string().optional(),
  graduationYear: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year." }),
  linkedinUrl: z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional().or(z.literal('')),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  jobTitle: z.string().min(2, { message: "Job title must be at least 2 characters." }),
  jobLocation: z.string().min(2, { message: "Job location must be at least 2 characters." }),
  salary: z.string().min(1, { message: "Please enter the salary offered." }),
  totalRounds: z.string().min(1, { message: "Please enter the number of interview rounds." }),
  technicalRoundDetails: z.string().min(10, { message: "Please provide more details about the technical round." }),
  hrRoundDetails: z.string().min(10, { message: "Please provide more details about the HR round." }),
  preparationStrategy: z.string().min(10, { message: "Please provide more details about your preparation strategy." }),
  challengingQuestion: z.string().min(10, { message: "Please provide more details about the most challenging question." }),
  advice: z.string().min(10, { message: "Please provide some advice for future candidates." }),
});

export default function PlacementInterviewForm() {
  const [step, setStep] = useState(0);
  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      university: "",
      course: "",
      otherCourse: "",
      graduationYear: "",
      linkedinUrl: "",
      companyName: "",
      jobTitle: "",
      jobLocation: "",
      salary: "",
      totalRounds: "",
      technicalRoundDetails: "",
      hrRoundDetails: "",
      preparationStrategy: "",
      challengingQuestion: "",
      advice: "",
    },
  });

  async function onSubmit(values: IFormData) {
    if (values.course === "Other" && values.otherCourse) {
      values.course = values.otherCourse;
    }
    delete values.otherCourse;
    const result = await submitInterviewData(values);
    if (result.success) {
      console.log(result.message);
      form.reset();
      setStep(0);
    } else {
      console.error(result.message);
    }
  }

  const steps = [
    { title: "Personal Details", icon: <User className="w-6 h-6" /> },
    { title: "Job Details", icon: <Briefcase className="w-6 h-6" /> },
    { title: "Interview Rounds", icon: <MessageSquare className="w-6 h-6" /> },
    { title: "Additional Questions", icon: <HelpCircle className="w-6 h-6" /> },
  ];

  const isLastStep = step === steps.length - 1;

  return (
    <div className='px-4 py-6 md:py-8'>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold text-center">Placement Interview Form</CardTitle>
          <CardDescription className="text-center text-sm md:text-base">Share your interview experience to help future candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {steps.map((s, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`rounded-full p-1 md:p-2 ${step >= index ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {s.icon}
                  </div>
                  <span className="text-[10px] md:text-xs mt-1">{s.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="university"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>University</FormLabel>
                          <FormControl>
                            <Input placeholder="University of Example" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="graduationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Graduation Year</FormLabel>
                          <FormControl>
                            <Input placeholder="2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Information Technology">Information Technology</SelectItem>
                            <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                            <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch("course") === "Other" && (
                    <FormField
                      control={form.control}
                      name="otherCourse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Course</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your course" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.linkedin.com/in/yourprofile" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Tech Corp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Location</FormLabel>
                        <FormControl>
                          <Input placeholder="New York, NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Offered</FormLabel>
                        <FormControl>
                          <Input placeholder="$80,000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="totalRounds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Number of Rounds</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the number of rounds" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5+">5 or more</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="technicalRoundDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technical Round Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the questions asked and your approach to answering them"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hrRoundDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HR Round Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the questions asked in the HR round"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="preparationStrategy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How did you prepare for this interview?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your preparation strategy"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="challengingQuestion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What was the most challenging question you faced?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the question and how you handled it"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="advice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What advice would you give to future candidates?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your insights and tips"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            disabled={step === 0}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (isLastStep) {
                form.handleSubmit(onSubmit)();
              } else {
                setStep((prev) => Math.min(steps.length - 1, prev + 1));
              }
            }}
            className="w-full sm:w-auto"
          >
            {isLastStep ? 'Submit' : 'Next'}
            {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}