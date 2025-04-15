"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Unauthorized } from "@/components/Unauthorized";
import axios from "@/lib/axios";
import { ApiErrorResponse } from "@/types/types";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email") || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerificationInitiated, setIsVerificationInitiated] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("Invalid email address", {
        id: "invalid-email",
      });
      router.push("/signup/student");
    }
    const isVerificationInitiated = async () => {
      try {
        const { data: status } = await axios.get(
          `/auth/verification-status/students?email=${btoa(email)}`
        );
        setIsVerificationInitiated(status);
      } catch (e) {
        if (isAxiosError(e)) {
          const errorResponse = e.response?.data as ApiErrorResponse;
          toast.error(
            errorResponse?.message || "An unexpected error occurred",
            {
              id: "verification-status-error",
            }
          );
        } else {
          console.error("Failed to check if verification was initiated:", e);
          toast.error("An unexpected error occurred", {
            id: "verification-status-error",
          });
        }
      } finally {
        setLoading(false);
      }
    };
    isVerificationInitiated();
  }, [email, router]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      toast.error("Please enter verification code", {
        id: "verification-code-empty",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post("/auth/confirm/students", {
        email,
        verificationCode,
      });
      toast.success("Email verified successfully! Redirecting to login...", {
        id: "email-verified",
      });
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (e) {
      if (isAxiosError(e)) {
        const errorResponse = e.response?.data as ApiErrorResponse;
        toast.error(errorResponse?.message || "An unexpected error occurred", {
          id: "verification-error",
        });
      } else {
        console.error("Email Verification error:", e);
        toast.error("An unexpected error occurred", {
          id: "verification-error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  if (!isVerificationInitiated) {
    return <Unauthorized />;
  }
  return (
    <div className="flex items-center justify-center min-h-full-except-header">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-600 mb-4">
          We sent a verification code to{" "}
          <span className="font-medium">{email}</span>. Please enter it below to
          complete your registration.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full"
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
