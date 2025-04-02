"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-5xl font-semibold text-primary">
        Unauthorized access
      </h2>
      <p className="mt-5 text-lg text-gray-600 max-w-lg">
        You do not have permission to access this page. Please contact your
        administrator if you believe this is an error.
      </p>
      <Button
        className="mt-6"
        variant="default"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
}
