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
interface CompanyRequest {
  name: string;
  description: string;
  address: string;
  email: string;
  ice: string;
  password: string;
}
export const CompanySignUpForm: React.FC<CompanySignUpFormProps> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const formSchema = z.object({
    name: z.string().min(1, "Company name is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be less than 500 characters"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email format"),
    ice: z
      .string()
      .min(1, "ICE number is required")
      .regex(/^\d{15}$/, "ICE must be exactly 15 digits"),
    password: z.string().min(8, "Password should be at least 8 characters"),
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
      description: "",
      address: "",
      email: "",
      ice: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setServerErrors({});
      const request: CompanyRequest = { ...data };
      await axios.post("auth/register/companies", request);
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
              <Label>Description</Label>
              <Textarea {...register("description")} className="resize-none" />
              {(errors.description || serverErrors.description) && (
                <p className="text-red-500">
                  {errors.description?.message || serverErrors.description}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Address</Label>
              <Input {...register("address")} />
              {(errors.address || serverErrors.address) && (
                <p className="text-red-500">
                  {errors.address?.message || serverErrors.address}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>ICE Number (Identifiant Commun de l'Entreprise)</Label>
              <Input {...register("ice")} />
              {(errors.ice || serverErrors.ice) && (
                <p className="text-red-500">
                  {errors.ice?.message || serverErrors.ice}
                </p>
              )}
            </div>

            <Separator />
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

            <div className="flex justify-between mt-4">
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
