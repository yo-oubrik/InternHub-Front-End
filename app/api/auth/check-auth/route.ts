import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET(req: NextRequest , res : NextResponse) {
  try {
    const session = await getSession( req , res); 

    if (!session?.user) {
      return NextResponse.json({ isAuthenticated: false, user: null }, { status: 401 });
    }

    return NextResponse.json({
      isAuthenticated: true,
      user: session.user,
    });
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({ isAuthenticated: false, user: null }, { status: 500 });
  }
}





// export async function GET(req: NextRequest) {
//   try {
//     // Assuming you are using some form of authentication like JWT, cookies, or sessions
//     const user = await checkAuthMiddleware(req);

//     if (user) {
//       return NextResponse.json({
//         isAuthenticated: true,
//         user: user, // Return the authenticated user data
//       }, { status: 200 });
//     } else {
//       return NextResponse.json({
//         isAuthenticated: false,
//         user: null,
//       }, { status: 200 });
//     }
//   } catch (error) {
//     console.error("Error checking authentication", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



// // Function to check the authentication status (e.g., by checking a cookie or token)
// async function checkAuthMiddleware(req: NextRequest) {
//   // Implement your authentication logic here (JWT token, session check, etc.)
//   // Example using JWT token from cookies:
//   const token = req.cookies.get("auth-token");
//   if (!token) return null;

//   try {
//     // Decode the JWT token (using your preferred JWT library or custom logic)
//     const user = await decodeJwtToken(token); // Replace with your JWT decoding logic
//     return user;
//   } catch (error) {
//     console.error("Error decoding token", error);
//     return null;
//   }
// }

// // Example function to decode the JWT token (you'll need to replace this with your actual JWT decoding logic)
// async function decodeJwtToken(token: string) {
//   // Example of decoding the token and retrieving user info
//   // Use a package like 'jsonwebtoken' for decoding (https://www.npmjs.com/package/jsonwebtoken)
//   const jwt = require("jsonwebtoken");
//   const secretKey = process.env.JWT_SECRET_KEY;
//   return jwt.verify(token, secretKey);
// }
