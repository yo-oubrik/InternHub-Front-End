import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const companyId = req.nextUrl.pathname.split('/').pop(); // Extract userId from the URL
    
    if (!companyId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch internships for this user using the Application model to filter by studentId
    const companyInternships = await prisma.company.findMany({
      where: {
        id: companyId, // Filter by the userId (student)
      },
      include: {
        internships: true, // Include the internship details related to the application
      },
    });

    return NextResponse.json(companyInternships.map( app => app.internships ), { status: 200 }); // Return only internships details

  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
