"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/authContext";
import { Company, Student, User } from "@/types/types";
import { LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProfileProps {
  user: User | Company | Student;
}
export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const { profilePicture } = user;
  return (
    <DropdownMenu>
      <div className="flex items-center gap-4">
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image
            src={profilePicture || "/user.png"}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-lg"
          />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-56 z-[1000]" align="end">
        <DropdownMenuItem
          onClick={() =>
            router.push(`/profile/${user.role.toLowerCase()}/${user.id}`)
          }
        >
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
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
