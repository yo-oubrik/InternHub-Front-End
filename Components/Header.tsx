"use client";
import { useGlobalContext } from "@/context/globalContext";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Profile from "./Profile";
import Button from "./Button";
import { useAuth } from "@/context/authContext";

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
            <Button label="Login" Icon={
              LogIn
            } onClick={() => { router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`) }} />
            <Button label="Register" Icon={
              UserPlus
            } onClick={() => { router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`) }} outline />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
