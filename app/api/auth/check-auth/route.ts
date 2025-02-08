import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await getSession();

        if (!session?.user) {
            return NextResponse.json({ isAuthenticated: false, user: null }, { status: 401 });
        }
        return NextResponse.json({
            isAuthenticated: true,
            user: session.user,
        });
    } catch (error) {
        console.error("Error checking authentication:", error);
        return NextResponse.json({ isAuthenticated: false, user: null }, { status: 500 });
    }
};
