"use client";
import { useAuth } from "@/context/authContext";
import { YouAreBlocked } from "@/components/YouAreBlocked";

interface BlockedUserCheckProps {
  children: React.ReactNode;
}

export const BlockedUserCheck = ({ children }: BlockedUserCheckProps) => {
  const { currentUser } = useAuth();

  if (currentUser?.blocked) {
    return <YouAreBlocked />;
  }

  return <>{children}</>;
};
