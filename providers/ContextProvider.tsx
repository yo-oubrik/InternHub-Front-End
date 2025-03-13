"use client";
import React from "react";
import { InternshipContextProvider } from "@/context/internshipContext";
import { UserContextProvider } from "@/context/userContext";
import { AuthProvider } from "@/context/authContext";
import { FiltersContextProvider } from "@/context/FiltersContext";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <AuthProvider>
      <FiltersContextProvider>
        <UserContextProvider>
          <InternshipContextProvider>{children}</InternshipContextProvider>
        </UserContextProvider>
      </FiltersContextProvider>
    </AuthProvider>
  );
}

export default ContextProvider;
