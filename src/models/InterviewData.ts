import mongoose, { Schema } from "mongoose";

export interface IInterviewData {
  _id: string;
  fullName: string;
  email: string;
  university: string;
  course: string;
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

const InterviewDataSchema = new Schema<IInterviewData>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    university: { type: String, required: true },
    course: { type: String, required: true },
    graduationYear: { type: String, required: true },
    linkedinUrl: { type: String, required: false },
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobLocation: { type: String, required: true },
    salary: { type: String, required: true },
    totalRounds: { type: String, required: true },
    technicalRoundDetails: { type: String, required: true },
    hrRoundDetails: { type: String, required: true },
    preparationStrategy: { type: String, required: true },
    challengingQuestion: { type: String, required: true },
    advice: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.InterviewData ||
  mongoose.model<IInterviewData>("InterviewData", InterviewDataSchema);
