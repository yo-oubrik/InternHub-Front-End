"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  VerificationFormData,
  verificationCodeSchema,
  SignUpFormData,
  VERIFICATION_CODE_COOLDOWN,
} from "../types";

interface VerificationFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  email: string;
  userData: SignUpFormData | null;
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  onSuccess: () => void;
}

export function VerificationForm({
  isLoading,
  setIsLoading,
  email,
  userData,
  countdown,
  setCountdown,
  onSuccess,
}: VerificationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationCodeSchema),
  });

  // Countdown timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (countdown > 0) {
      timerId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timerId);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [countdown, setCountdown]);

  const onSubmit = async (data: VerificationFormData) => {
    try {
      setIsLoading(true);

      await axios.post("/auth/confirm/students", {
        email: email,
        verificationCode: data.verificationCode,
      });

      toast.success("Email verified successfully!");
      onSuccess();
    } catch (e) {
      if (isAxiosError(e)) {
        const errorResponse = e.response?.data;
        toast.error(errorResponse?.message || "Verification failed");
      } else {
        console.error("Verification error:", e);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) {
      toast.error(
        `Please wait ${countdown} seconds before requesting a new code`
      );
      return;
    }

    try {
      setIsLoading(true);
      if (!userData) {
        toast.error("User data is missing");
        return;
      }

      await axios.post("auth/verify-email/students", userData);
      setCountdown(VERIFICATION_CODE_COOLDOWN);
      toast.success("A new verification code has been sent to your email");
    } catch (e) {
      if (isAxiosError(e)) {
        const errorResponse = e.response?.data;
        toast.error(
          errorResponse?.message || "Failed to resend verification code"
        );
      } else {
        console.error("Resend error:", e);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              placeholder="Enter 6-digit code"
              {...register("verificationCode")}
            />
            {errors.verificationCode && (
              <p className="text-red-500">{errors.verificationCode.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      </form>

      <div className="flex flex-col items-center gap-4 mt-2">
        <p className="text-sm text-center text-gray-600">
          Didn't receive the code?
        </p>
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResendCode}
            disabled={countdown > 0 || isLoading}
          >
            {countdown > 0 ? `Resend Code (${countdown}s)` : "Resend Code"}
          </Button>
        </div>
      </div>
    </div>
  );
}
