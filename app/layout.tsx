"use client"
import Header from "@/components/Header";
import "./globals.css";
import ContextProvider from "@/providers/ContextProvider";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/authContext";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <Toaster position="top-center" />
        <ContextProvider>
          <AuthProvider>
            <Header />
            <div className="min-h-[calc(100vh-var(--header-height))]">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
