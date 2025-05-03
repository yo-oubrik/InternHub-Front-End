"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SignUpFormData,
  signUpSchema,
  VERIFICATION_CODE_COOLDOWN,
} from "../types";

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: (email: string, data: SignUpFormData, cooldown: number) => void;
}

export function SignUpForm({
  isLoading,
  setIsLoading,
  onSuccess,
}: SignUpFormProps) {
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      setServerErrors({});
      const student = { ...data };
      await axios.post("auth/verify-email/students", student);

      toast.success("Verification code sent to your email");
      onSuccess(data.email, data, VERIFICATION_CODE_COOLDOWN);
    } catch (e) {
      if (isAxiosError(e)) {
        const errorResponse = e.response?.data;
        toast.error(errorResponse?.message || "An unexpected error occurred");
        if (errorResponse?.validationErrors) {
          setServerErrors(errorResponse.validationErrors);
        }
      } else {
        console.error("Registration error:", e);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" type="text" {...register("firstName")} />
          {(errors.firstName || serverErrors.firstName) && (
            <p className="text-red-500">
              {errors.firstName?.message || serverErrors.firstName}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" type="text" {...register("lastName")} />
          {(errors.lastName || serverErrors.lastName) && (
            <p className="text-red-500">
              {errors.lastName?.message || serverErrors.lastName}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {(errors.email || serverErrors.email) && (
            <p className="text-red-500">
              {errors.email?.message || serverErrors.email}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {(errors.password || serverErrors.password) && (
            <p className="text-red-500">
              {errors.password?.message || serverErrors.password}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Password Confirmation</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {(errors.confirmPassword || serverErrors.confirmPassword) && (
            <p className="text-red-500">
              {errors.confirmPassword?.message || serverErrors.confirmPassword}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}
