"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { useAuth, User } from "@/context/authContext";

interface ProfileProps {
  user: User;
}
export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { logout } = useAuth();
  const { role, profilePicture } = user;
  return (
    <DropdownMenu>
      <div className="flex items-center gap-4">
        <Badge>{role}</Badge>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image
            src={profilePicture ? profilePicture : "/user.png"}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-lg"
          />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            logout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
