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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/axios";
import { ApiErrorResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CompanySignUpFormProps {
  className?: string;
}

export const CompanySignUpForm: React.FC<CompanySignUpFormProps> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const formSchema = z
    .object({
      name: z.string().min(1, "Company name is required"),
      email: z.string().email("Invalid email format"),
      password: z.string().min(8, "Password should be at least 8 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setServerErrors({});
      const request = { ...data };
      await axios.post("auth/verify-email/companies", request);
      toast.success("Account created successfully");
      router.push("/signin");
    } catch (e) {
      if (isAxiosError(e)) {
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
    <div className="pb-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
          <CardDescription>
            Complete the form to create your employer account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
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
                  {errors.confirmPassword?.message ||
                    serverErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <Button type="submit" size={"lg"}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
