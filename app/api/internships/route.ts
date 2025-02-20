import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const internships = await prisma.internship.findMany({
            include : {
                applicants : true , 
                likes : true 
            }
        });

        return NextResponse.json(internships, { status: 200 });
    } catch (error) {
        console.error("Error fetching internships:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("this is the data : ",data);
        const internship = await prisma.internship.create({
            data , 
            include : {
                applicants : true , 
                likes : true 
            }
        })
        return NextResponse.json(internship, { status: 200 });
    } catch (error) {
        console.error("Error creating internship:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}