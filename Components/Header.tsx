"use client";
import { useGlobalContext } from "@/context/globalContext";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Profile from "./Profile";
import Button from "./Button";

function Header() {
  const { isAuthenticated } = useGlobalContext();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="px-14 bg-[#D7DEDC] flex justify-between items-center">
      <Link href={"/"}>
        <img src="/logo.svg" alt="logo" width={105} height={105} />
      </Link>


      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-6">
            <Button label="Login" Icon={
              LogIn
            } onClick={() => { router.push("http://localhost:8000/login") }} />
            <Button label="Register" Icon={
              UserPlus
            } onClick={() => { router.push("http://localhost:8000/login") }} outline />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
