import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Tip from "@/models/Tip";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = params;
    console.log("ID", id);
    const deletedTip = await Tip.findByIdAndDelete(id);
    if (!deletedTip) {
      return NextResponse.json({ error: "Tip not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Tip deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete tip" },
      { status: 500 }
    );
  }
}
