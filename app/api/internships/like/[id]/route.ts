import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { internshipId: string } }) {
  try {
    const studentId = req.headers.get("student-id"); // Get the studentId from headers or session
    if (!studentId) {
      return NextResponse.json({ error: "Student not authenticated" }, { status: 401 });
    }

    const { internshipId } = params;

    // Check if the internship exists
    const internship = await prisma.internship.findUnique({
      where: { id: internshipId },
    });
    if (!internship) {
      return NextResponse.json({ error: "Internship not found" }, { status: 404 });
    }

    // Check if the student already liked the internship
    const existingLike = await prisma.like.findFirst({
      where: {
        studentId: studentId,
        internshipId: internshipId,
      },
    });

    if (existingLike) {
      return NextResponse.json({ message: "Internship already liked" }, { status: 400 });
    }

    // Create the like record
    const like = await prisma.like.create({
      data: {
        studentId,
        internshipId,
      },
    });

    return NextResponse.json({ message: "Internship liked successfully", like }, { status: 200 });
  } catch (error) {
    console.error("Error liking internship:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
