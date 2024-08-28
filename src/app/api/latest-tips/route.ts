import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Tip from "@/models/Tip";

export async function GET() {
  await dbConnect();

  try {
    const latestTips = await Tip.find().sort({ createdAt: -1 }).limit(3);
    return NextResponse.json(latestTips);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch latest tips" },
      { status: 500 }
    );
  }
}
