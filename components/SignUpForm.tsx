"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ApiErrorResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[A-Za-z]+$/, {
        message:
          "First name must contain only letters and be between 2 and 50 characters",
      }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[A-Za-z]+$/, {
        message:
          "Last name must contain only letters and be between 2 and 50 characters",
      }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignInFormProps {
  className?: string;
}
interface StudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export const SignUpForm: React.FC<SignInFormProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const router = useRouter();
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
      const student: StudentRequest = { ...data, profilePicture: "" };
      await axios.post(
        "http://localhost:8080/api/v1/auth/register/students",
        student
      );
      toast.success("Account created successfully");
      router.push("/signin");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorResponse = e.response?.data as ApiErrorResponse;
        // Display the backend error message directly
        toast.error(errorResponse?.message || "An unexpected error occurred");
        // Still store validation errors for field-level display
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
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Complete the form to create your student account.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
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
                    {errors.confirmPassword?.message ||
                      serverErrors.confirmPassword}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full mb-[-12px]"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
