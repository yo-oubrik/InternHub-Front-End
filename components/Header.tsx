"use client";
import { useAuth } from "@/context/authContext";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Profile from "./Profile";
import SignUpDropDown from "./SignUpDropDown";
import { Button } from "@/components/ui/button";

function Header() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  return (
    <header className="px-14 bg-[#f0f5fa] flex justify-between items-center">
      <Link href={"/"} className="outline-none">
        <img src="/logo.svg" alt="logo" width={105} height={105} />
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-6">
            <Button onClick={() => { router.push("/signin") }}>
              <LogIn /> {" "} Sign In
            </Button>
            <SignUpDropDown />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
