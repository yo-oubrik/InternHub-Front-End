"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCompanyRegister } from "./CompanyRegisterContext";

export const companyInfosSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  logo: z.any().optional(),
  companySize: z.string().min(1, "Company Size is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type CompanyFormData = z.infer<typeof companyInfosSchema>;

export const CompanyInfoForm = () => {
  const { setFormData, formData, goToNextSection } = useCompanyRegister();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companyInfosSchema),
    defaultValues: {
      companyName: formData.companyName,
      companySize: formData.companySize,
      description: formData.description,
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    setFormData({ ...formData, ...data });
    goToNextSection();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Company Information</h2>

      <div className="grid gap-2">
        <Label>Company Name</Label>
        <Input {...register("companyName")} />
        {errors.companyName && (
          <p className="text-red-500">{errors.companyName.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Company Logo</Label>
        <Input
          type="file"
          {...register("logo")}
          onChange={(e) => setValue("logo", e.target.files?.[0] || null)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Company Size</Label>
        <Select
          onValueChange={(value) => setValue("companySize", value)}
          defaultValue={watch("companySize")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Startup">Startup</SelectItem>
            <SelectItem value="SME">SME</SelectItem>
            <SelectItem value="Large Enterprise">Large Enterprise</SelectItem>
          </SelectContent>
        </Select>
        {errors.companySize && (
          <p className="text-red-500">{errors.companySize.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Description</Label>
        <Textarea {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex mt-4 justify-end">
        <Button type="submit" size={"lg"}>
          Next
        </Button>
      </div>
    </form>
  );
};
