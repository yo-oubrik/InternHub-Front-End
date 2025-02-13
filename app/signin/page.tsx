import { SignInForm } from "@/components/SignInForm";

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full max-w-md mt-28">
        <img className="mx-auto" src="/logo.svg" alt="logo" width={105} height={105} />
        <SignInForm />
      </div>
    </div>
  )
}
