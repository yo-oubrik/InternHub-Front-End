"use client";

import { CompaniesProvider } from "@/context/CompaniesContext";
import { ReactNode } from "react";

export default function StudentsLayout({ children }: { children: ReactNode }) {
  return <CompaniesProvider>{children}</CompaniesProvider>;
}
