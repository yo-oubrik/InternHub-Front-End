"use client";

import { CompaniesProvider } from "@/context/CompaniesContext";
import { ReactNode } from "react";

export default function FlaggedCompaniesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <CompaniesProvider>{children}</CompaniesProvider>;
}
