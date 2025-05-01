"use client";
import { useUser } from "@/context/userContext";
import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import { Internship } from "@/types/types";

interface ApplicationProcessProps {
  setCV: (file: File) => void;
  setMotivationLetter: (file: File) => void;
  internship: Internship;
}

const ApplicationProcess = ({
  setCV,
  setMotivationLetter,
  internship,
}: ApplicationProcessProps) => {
  const { student, setStudent } = useUser();
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [selectedMotivationLetter, setSelectedMotivationLetter] =
    useState<string>("");

  useEffect(() => {
    setSelectedCV(student?.links?.cv || "");
    setSelectedMotivationLetter(student?.links?.motivationLetter || "");
  }, [student]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label
            htmlFor="cv"
            className="block text-base font-medium text-gray-700"
          >
            CV :
          </label>
          <div className="mt-1">
            <InputField
              type="file"
              value={selectedCV}
              className="w-full"
              required
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCV(file);
                  setSelectedCV(file.name);
                  setStudent({
                    ...student,
                    links: {
                      ...student?.links,
                      cv: file.name,
                    },
                  });
                }
              }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Supported formats: PDF</p>
        </div>
        <div>
          <label
            htmlFor="motivationLetter"
            className="block text-base font-medium text-gray-700"
          >
            Motivation letter :
          </label>
          <div className="mt-1">
            <InputField
              type="file"
              value={selectedMotivationLetter}
              className="w-full"
              required={internship.motivationLetterRequired}
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setMotivationLetter(file);
                  setSelectedMotivationLetter(file.name);
                  setStudent({
                    ...student,
                    links: {
                      ...student?.links,
                      motivationLetter: file.name,
                    },
                  });
                }
              }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Supported formats: PDF</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcess;
