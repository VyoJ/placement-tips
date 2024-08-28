import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Company from "@/models/Company";

export async function GET() {
  await dbConnect();

  try {
    const featuredCompanies = await Company.find({ featured: true }).limit(3);
    return NextResponse.json(featuredCompanies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch featured companies" },
      { status: 500 }
    );
  }
}
