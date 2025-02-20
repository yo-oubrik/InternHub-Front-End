"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Briefcase, GraduationCap, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
function SignUpDropDown() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <div className="flex items-center gap-4">
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"
          }>
            <UserPlus />
            {" "}
            Sign Up
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-44 mt-2" align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/register/company")}
        >
          <Briefcase className="mr-2 h-4 w-4" />
          <span>I am Employer</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/register/student")}
        >
          <GraduationCap className="mr-2 h-4 w-4" />
          <span>I am Student</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SignUpDropDown;
