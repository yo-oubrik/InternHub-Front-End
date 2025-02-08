import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const internships = await prisma.internship.findMany();
        return NextResponse.json(internships, { status: 200 });
    } catch (error) {
        console.error("Error fetching internships:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
