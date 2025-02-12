import { NextRequest, NextResponse } from "next/server";

// Define the GET method to get an internship by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Capture the 'id' from the dynamic route

    // Query internship from the database
    const internship = await prisma.internship.findUnique({
      where: { id }, // Look for internship by ID
      include : {
        applicants : true , 
        likes : true ,
      }
    });

    if (!internship) {
      return NextResponse.json({ error: "Internship not found" }, { status: 404 });
    }

    // Return the found internship as JSON
    return NextResponse.json(internship, { status: 200 });
  } catch (error) {
    console.error("Error getting internship by id:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { internshipId: string } }) {
  try {
    const { internshipId } = params;

    // Check if the internship exists
    const internship = await prisma.internship.findUnique({
      where: { id: internshipId },
    });

    if (!internship) {
      return NextResponse.json({ error: "Internship not found" }, { status: 404 });
    }

    // Delete the internship
    await prisma.internship.delete({
      where: { id: internshipId },
    });

    return NextResponse.json({ message: "Internship deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting internship:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
