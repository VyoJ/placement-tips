import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import InterviewData from "@/models/InterviewData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  try {
    const interviewData = await InterviewData.findById(id);

    if (!interviewData) {
      return NextResponse.json(
        { error: "Interview data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(interviewData);
  } catch (error) {
    console.error("Error fetching interview data by id:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview data" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  try {
    const result = await InterviewData.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { error: "Interview data not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Interview data successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting interview data by id:", error);
    return NextResponse.json(
      { error: "Failed to delete interview data" },
      { status: 500 }
    );
  }
}
