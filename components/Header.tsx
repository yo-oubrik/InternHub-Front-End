"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Profile from "./Profile";
import SignUpDropDown from "./SignUpDropDown";

function Header() {
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();
  return (
    <header className="px-14 bg-background flex justify-between items-center">
      <Link href={"/"} className="outline-none">
        <img src="/logo.svg" alt="logo" width={105} height={105} />
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated && currentUser ? (
          <Profile user={currentUser} />
        ) : (
          <div className="flex items-center gap-6">
            <Button
              onClick={() => {
                router.push("/signin");
              }}
            >
              <LogIn /> Sign In
            </Button>
            <SignUpDropDown />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
