"use client";
import Header from "@/components/Header";
import "./globals.css";
import ContextProvider from "@/providers/ContextProvider";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","900"],
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
      <body className={`${poppins.className} antialiased`}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { maxWidth: "650px" },
          }}
        />

        <ContextProvider>
          <Header />
          <div className="min-h-[calc(100vh-var(--header-height))]">
            {children}
          </div>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
