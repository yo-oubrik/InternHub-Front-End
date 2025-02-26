"use client";
import React from "react";
import { InternshipContextProvider } from "@/context/internshipContext";
import { UserContextProvider } from "@/context/userContext";
import { AuthProvider } from "@/context/authContext";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <AuthProvider>
      <UserContextProvider>
        <InternshipContextProvider>
          {children}
        </InternshipContextProvider>
      </UserContextProvider>
    </AuthProvider>
  );
}

export default ContextProvider;
