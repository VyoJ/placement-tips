import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import InterviewData from "@/models/InterviewData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const interviewData = await InterviewData.find({});
    return NextResponse.json(interviewData);
  } catch (error) {
    console.error("Error fetching interview data:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview data" },
      { status: 500 }
    );
  }
}
