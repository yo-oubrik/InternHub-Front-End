"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RadioButton from "../RadioButton";
import { useInternship } from "@/context/internshipContext";
import { WorkMode } from "@/types/types";

function JobTitle() {
  const { internship, setInternship } = useInternship();

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
          value={internship?.title}
          onChange={(e) =>
            setInternship({ ...internship, title: e.target.value })
          }
          className="flex-1 w-full mt-2 focus:border-primary focus:ring-0"
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
            value={internship?.workMode}
            items={["Remote", "On site", "Hybrid"]}
            itemsValue={[WorkMode.REMOTE, WorkMode.ON_SITE, WorkMode.HYBRID]}
            onValueChange={(value) => {
              setInternship({ ...internship, workMode: value });
            }}
            classNameGroup="flex flex-row"
            classNameItemContainer="bg-white border-border border rounded-md cursor-pointer"
            classNameLabel="cursor-pointer font-medium w-full h-full p-6 space-x-0"
            classNameItem="hidden"
            classNameItemContainerWhenChecked="border border-primary text-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default JobTitle;
