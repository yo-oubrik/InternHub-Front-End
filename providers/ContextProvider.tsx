"use client";
import React from "react";
import { GlobalContextProvider } from "@/context/globalContext";
import { InternshipContextProvider } from "@/context/internshipContext";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <GlobalContextProvider>
      <InternshipContextProvider>{children}</InternshipContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
