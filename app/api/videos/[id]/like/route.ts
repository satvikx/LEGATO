// app/api/videos/[id]/like/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import  Video  from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { id } = await params;
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json(
        { message: "Video not found" },
        { status: 404 }
      );
    }

    const userId = session.user.id;
    const isLiked = video.likes.includes(userId);

    if (isLiked) {
      // Unlike
      video.likes = video.likes.filter(
        (id: string) => id.toString() !== userId
      );
    } else {
      // Like
      video.likes.push(userId);
    }

    await video.save();

    return NextResponse.json({
      message: isLiked ? "Video unliked" : "Video liked",
      likes: video.likes.length
    });
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}