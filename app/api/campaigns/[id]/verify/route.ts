import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const campaign = await prisma.campaign.update({
      where: { id },
      data: { verified: true },
    });
    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Error verifying campaign:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
