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
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { ApiErrorResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  className?: string;
}
interface LoginRequest {
  email: string;
  password: string;
}
interface AuthResponse {
  token: string;
  expiresIn: number;
}

export const SignInForm: React.FC<SignInFormProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      const loginRequest: LoginRequest = data;
      console.log("Login request:", loginRequest);
      const response = await api.post("/auth/login", loginRequest);
      console.log("Login response:", response.data);
      const authResponse: AuthResponse = response.data;
      localStorage.setItem("token", authResponse.token);
      localStorage.setItem("expiresIn", authResponse.expiresIn.toString());
      toast.success("Logged in successfully");
      window.location.href = "/";
    } catch (e) {
      if (isAxiosError(e)) {
        const errorResponse = e.response?.data as ApiErrorResponse;
        console.error("Login error:", errorResponse);
        // Display the backend error message directly
        toast.error(errorResponse?.message || "An unexpected error occurred");
        // Still store validation errors for field-level display
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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Please enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full my-[-12px]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
