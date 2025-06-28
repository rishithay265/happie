import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const projectId = req.nextUrl.searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }
    const comments = await prisma.comment.findMany({
      where: { projectId: Number(projectId) },
      orderBy: { createdAt: "asc" },
      include: {
        user: { select: { id: true, name: true, profile_picture: true } },
        investor: { select: { id: true, name: true, profile_picture: true } },
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { projectId, content } = await req.json();
    if (!projectId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const userId = Number((session.user as { id?: string }).id);
    const role = (session.user as { role?: string }).role;
    const data: any = {
      content,
      projectId: Number(projectId),
      commenterType: role === "investor" ? "investor" : "user",
    };
    if (role === "investor") {
      data.investorId = userId;
    } else {
      data.userId = userId;
    }
    const comment = await prisma.comment.create({ data });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
