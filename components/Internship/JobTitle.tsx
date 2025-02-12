"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RadioButton from "../RadioButton";
import JobLocation from "./JobLocation";
import { useInternship } from "@/context/internshipContext";
import { WorkMode } from "@/types/types";

function JobTitle() {
  const { InternshipTitle, setInternshipTitle, activeInternshipType, setActiveInternshipType } =
    useInternship();

  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Post Title</h3>
          <Label
            htmlFor="InternshipTitle"
            className="text-sm text-muted-foreground mt-2"
          >
            An internship title defines the role and responsibilities of an
            intern in an organization.
          </Label>
        </div>
        <Input
          type="text"
          id="InternshipTitle"
          value={InternshipTitle}
          onChange={(e) => setInternshipTitle(e.target.value.trimStart())}
          className="flex-1 w-full mt-2"
          placeholder="Enter Post Title"
        />
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Internship Type</h3>
          <Label
            htmlFor="internshipType"
            className="text-sm text-muted-foreground mt-2"
          >
            Select the type of internship.
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioButton
            value={activeInternshipType}
            items={["remote", "on-site", "hybrid"]}
            itemsValue={[WorkMode.REMOTE, WorkMode.ON_SITE, WorkMode.HYBRID]}
            onValueChange={setActiveInternshipType}
            classNameGroup="flex flex-col"
            classNameItem="py-1 pl-1 border-border border rounded-md"
          />
        </div>
        <JobLocation />
      </div>
    </div>
  );
}

export default JobTitle;
