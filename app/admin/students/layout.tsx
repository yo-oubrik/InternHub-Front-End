"use client";

import { StudentsProvider } from "@/context/StudentsContext";
import { ReactNode } from "react";

export default function StudentsLayout({ children }: { children: ReactNode }) {
  return <StudentsProvider>{children}</StudentsProvider>;
}
