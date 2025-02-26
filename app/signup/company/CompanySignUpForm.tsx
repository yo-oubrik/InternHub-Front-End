"use client";
import { NavigationHeader } from "@/components/NavigationHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { administrationInfosSchema } from "./AdminInfoForm";
import { companyInfosSchema } from "./CompanyInfoForm";
import { useCompanyRegister } from "./CompanyRegisterContext";
import { contactInfosSchema } from "./ContactInfoForm";
interface CompanySignUpFormProps {
  className?: string;
}
export const enterpriseSchema = companyInfosSchema
  .merge(contactInfosSchema)
  .merge(administrationInfosSchema);
export type EnterpriseFormData = z.infer<typeof enterpriseSchema>;

export const CompanySignUpForm: React.FC<CompanySignUpFormProps> = ({}) => {
  const { formSections, currentSection } = useCompanyRegister();
  return (
    <div className="pb-16">
      <div className="mb-6">
        <NavigationHeader
          sections={formSections.map((s) => s.title)}
          currentSection={currentSection}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
          <CardDescription>
            Complete the form to create your employer account.
          </CardDescription>
        </CardHeader>
        <CardContent>{formSections[currentSection].component}</CardContent>
      </Card>
    </div>
  );
};
