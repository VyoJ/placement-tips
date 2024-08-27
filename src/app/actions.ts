"use server";

import dbConnect from "../lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import InterviewData, { IInterviewData } from "../models/InterviewData";

interface SubmitResult {
  success: boolean;
  message: string;
}

interface GetDataResult {
  success: boolean;
  data?: IInterviewData[];
  message?: string;
}

export async function submitInterviewData(
  formData: IInterviewData
): Promise<SubmitResult> {
  try {
    await dbConnect();
    const newInterviewData = new InterviewData(formData);
    await newInterviewData.save();
    return { success: true, message: "Interview data submitted successfully" };
  } catch (error) {
    console.error("Error submitting interview data:", error);
    return { success: false, message: "Failed to submit interview data" };
  }
}

export async function getInterviewData(): Promise<GetDataResult> {
  try {
    await dbConnect();
    const interviewData = await InterviewData.find({}).sort({ createdAt: -1 });
    return { success: true, data: interviewData };
  } catch (error) {
    console.error("Error fetching interview data:", error);
    return { success: false, message: "Failed to fetch interview data" };
  }
}
