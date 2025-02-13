import { SignUpForm } from "@/components/SignUpForm";

const Page = () => {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full max-w-md">
        <img
          className="mx-auto"
          src="/logo.svg"
          alt="logo"
          width={105}
          height={105}
        />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Page;
