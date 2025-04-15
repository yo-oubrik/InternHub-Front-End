"use client";

import { Unauthorized } from "@/components/Unauthorized";
import { useAuth } from "@/context/authContext";
import { Role } from "@/types/types";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = useAuth();
  const router = useRouter();
  if (currentUser) {
    return router.push("/");
  }
  return <div>{children}</div>;
}
