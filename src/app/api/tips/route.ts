import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Tip from "@/models/Tip";

export async function GET() {
  await dbConnect();

  try {
    const tips = await Tip.find({});
    return NextResponse.json(tips);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tips" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const newTip = new Tip(body);
    await newTip.save();
    return NextResponse.json(newTip, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create tip" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { _id, ...updateData } = body;
    const updatedTip = await Tip.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    if (!updatedTip) {
      return NextResponse.json({ error: "Tip not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTip);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update tip" },
      { status: 500 }
    );
  }
}
