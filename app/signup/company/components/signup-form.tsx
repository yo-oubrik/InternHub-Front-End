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
  CompanySignUpFormData,
  companySignUpSchema,
  VERIFICATION_CODE_COOLDOWN,
} from "../types";
import { ApiErrorResponse } from "@/types/types";

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: (
    email: string,
    data: CompanySignUpFormData,
    cooldown: number
  ) => void;
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
  } = useForm<CompanySignUpFormData>({
    resolver: zodResolver(companySignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: CompanySignUpFormData) => {
    try {
      setIsLoading(true);
      setServerErrors({});
      const request = { ...data };
      await axios.post("auth/verify-email/companies", request);

      toast.success("Verification code sent to your email");
      onSuccess(data.email, data, VERIFICATION_CODE_COOLDOWN);
    } catch (e) {
      if (isAxiosError(e)) {
        const errorResponse = e.response?.data as ApiErrorResponse;
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label>Company Name</Label>
        <Input {...register("name")} />
        {(errors.name || serverErrors.name) && (
          <p className="text-red-500">
            {errors.name?.message || serverErrors.name}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Email</Label>
        <Input type="email" {...register("email")} />
        {(errors.email || serverErrors.email) && (
          <p className="text-red-500">
            {errors.email?.message || serverErrors.email}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Password</Label>
        <Input type="password" {...register("password")} />
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

      <Button type="submit" size={"lg"} disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
