"use client";
import React, { useState, useRef } from "react";
import CompanyInfosForm from "@/components/Profile/company/update-form/CompanyInfosForm";
import Button from "@/components/Button";
import { CompanyLocation } from "@/components/Profile/company/update-form/CompanyLocation";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const UpdateCompanyProfile = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Update Company Information
            </h2>
            <CompanyInfosForm />
            <div className="w-full flex justify-end">
              <Button
                label="Next"
                onClick={nextStep}
                className="mt-4 px-4 py-2 rounded"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold">Update Company Location</h2>
            <CompanyLocation />
            <div className="mt-4 flex justify-between">
              <Button
                label="Previous"
                onClick={prevStep}
                outline={true}
                className="px-4 py-2 rounded"
              />
              <Button
                label="Next"
                onClick={nextStep}
                className="px-4 py-2 rounded"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold">Summary</h2>
            {/* Display a summary of the updates */}
            <Button
              label="Previous"
              onClick={prevStep}
              outline={true}
              className="mt-4 px-4 py-2 rounded"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 mb-8 bg-white rounded shadow-md">
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 mb-4 cursor-pointer hover:text-primary"
          onClick={() => router.push("/profile/company")}
        >
          <ArrowLeft size={20} />
          <span>Back to profile</span>
        </div>
        <div className="flex-1 mb-4">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-primary rounded"
              style={{ width: `${step * 33}%` }}
            ></div>
          </div>
        </div>
      </div>
      {renderStepContent()}
    </div>
  );
};

export default UpdateCompanyProfile;
