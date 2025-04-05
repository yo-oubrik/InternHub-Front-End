"use client";

import { StudentsProvider } from "@/context/StudentsContext";
import { ReactNode } from "react";

export default function FlaggedStudentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <StudentsProvider>{children}</StudentsProvider>;
}
