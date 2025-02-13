"use client";
import { CompanySignUpForm } from "@/app/signup/company/CompanySignUpForm";
import { CompanyRegisterProvider } from "./CompanyRegisterContext";

const Page = () => {
  return (
    <CompanyRegisterProvider>
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
    </CompanyRegisterProvider>
  );
};

export default Page;
