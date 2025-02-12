import { Statistics } from "@/app/WhyChooseClient";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const internships = await prisma.internship.count();
        const industries = await prisma.internship.findMany({
            distinct: ["domain"],
            select: { domain: true },
        });
        const companies = await prisma.company.count();
        const students = await prisma.student.count();

        const statistics: Statistics = {
            internshipListings: internships,
            internshipIndustries: industries.length,
            verifiedCompanies: companies,
            studentApplicants: students,
        };

        return NextResponse.json(statistics, { status: 200 });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
