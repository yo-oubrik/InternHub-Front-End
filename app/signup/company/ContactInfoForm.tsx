"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EnterpriseFormData } from "./CompanySignUpForm";
import { useCompanyRegister } from "./CompanyRegisterContext";

export const contactInfosSchema = z.object({
  address: z.string().min(1, "Address is required"),
  contactEmail: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
  links: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactInfosSchema>;

export const ContactInfoForm = () => {
  const { setFormData, formData, goToNextSection, goToPreviousSection } =
    useCompanyRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactInfosSchema),
    defaultValues: {
      address: formData.address,
      contactEmail: formData.contactEmail,
      phone: formData.phone,
      links: formData.links,
    },
  });
  const onSubmit = (data: ContactFormData) => {
    setFormData({ ...formData, ...data });
    goToNextSection();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Contact Information</h2>

      <div className="grid gap-2">
        <Label>Address</Label>
        <Input {...register("address")} />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Email</Label>
        <Input type="email" {...register("contactEmail")} />
        {errors.contactEmail && (
          <p className="text-red-500">{errors.contactEmail.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Phone Number</Label>
        <Input {...register("phone")} />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Links</Label>
        <Input {...register("links")} />
      </div>

      <div className="flex justify-between mt-4">
        <Button variant={"outline"} size={"lg"} onClick={goToPreviousSection}>
          Previous
        </Button>
        <Button type="submit" size={"lg"}>
          Next
        </Button>
      </div>
    </form>
  );
};
