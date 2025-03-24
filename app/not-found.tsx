"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-9xl font-bold text-primary-dark/80">404</h1>
      <h2 className="mt-4 text-2xl font-semibo`ld">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600 max-w-lg">
        The page you are looking for does not exist or has been moved.
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
