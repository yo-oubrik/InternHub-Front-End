"use client";
import { CompanySignUpForm } from "@/app/signup/company/CompanySignUpForm";

const Page = () => {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full max-w-2xl">
        <img
          className="mx-auto"
          src="/logo.svg"
          alt="logo"
          width={105}
          height={105}
        />
        <CompanySignUpForm />
      </div>
    </div>
  );
};

export default Page;
