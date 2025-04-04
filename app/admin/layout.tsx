"use client";

import { Unauthorized } from "@/components/Unauthorized";
import { useAuth } from "@/context/authContext";
import { Role } from "@/types/types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = useAuth();
  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return <Unauthorized />;
  }
  return <div>{children}</div>;
}