"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCompanyRegister } from "./CompanyRegisterContext";

export const administrationInfosSchema = z.object({
  ice: z.string().min(1, "ICE is required"),
  rc: z.string().min(1, "RC is required"),
});

type AdminFormData = z.infer<typeof administrationInfosSchema>;

export const AdminInfoForm = () => {
  const router = useRouter();
  const { setFormData, formData, goToPreviousSection } = useCompanyRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormData>({
    resolver: zodResolver(administrationInfosSchema),
    defaultValues: {
      ice: formData.ice,
      rc: formData.rc,
    },
  });
  const onSubmit = (data: AdminFormData) => {
    setFormData({ ...formData, ...data });
    router.push("/register/company/success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Administrative Information</h2>

      <div className="grid gap-2">
        <Label>ICE (Company Identification Number)</Label>
        <Input {...register("ice")} />
        {errors.ice && <p className="text-red-500">{errors.ice.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>RC (Commercial Registration)</Label>
        <Input {...register("rc")} />
        {errors.rc && <p className="text-red-500">{errors.rc.message}</p>}
      </div>

      <div className="flex justify-between mt-4">
        <Button
          variant={"outline"}
          onClick={() => {
            goToPreviousSection();
          }}
        >
          Previous
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
