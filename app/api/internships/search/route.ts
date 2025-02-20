import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Define the GET method for the search route
export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from the request using .get()
    const location = req.nextUrl.searchParams.get('location');
    const title = req.nextUrl.searchParams.get('title');

    // Initialize filter object
    const filter: any = {};

    if (location) {
      filter.location = { contains: location, mode: "insensitive" }; // Case-insensitive search
    }

    if (title) {
      filter.title = { contains: title, mode: "insensitive" }; // Case-insensitive search
    }

    // Query internships based on the filter
    const internships = await prisma.internship.findMany({
      where: filter, // Apply filters dynamically based on query parameters
    });

    // Return the list of internships as JSON
    return NextResponse.json(internships, { status: 200 });
  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
