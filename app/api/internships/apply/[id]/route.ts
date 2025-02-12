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
      include: { applicants: true },  // Include applicants
    });

    if (!internship) {
      return NextResponse.json({ error: "Internship not found" }, { status: 404 });
    }

    // Check if the student has already applied to this internship
    const hasApplied = internship.applicants.some((applicant) => applicant.id === studentId);
    if (hasApplied) {
      return NextResponse.json({ message: "You have already applied to this internship" }, { status: 400 });
    }

    // Create the application record
    const application = await prisma.application.create({
      data: {
        studentId: studentId,
        internshipId: internshipId,
      },
    });

    return NextResponse.json({ message: "Applied to internship successfully", application }, { status: 200 });
  } catch (error) {
    console.error("Error applying to internship:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
