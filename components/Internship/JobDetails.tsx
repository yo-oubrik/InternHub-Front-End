"use client";
import React from "react";
import "react-quill-new/dist/quill.snow.css";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import dynamic from "next/dynamic";
import { Switch } from "../ui/switch";
import { useInternship } from "@/context/internshipContext";
import { Label } from "../ui/label";
import RadioButton from "../RadioButton";
import { SalaryType } from "@/types/types";


const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

function MyEditor() {
  const { setInternshipDescription, internshipDescription } = useInternship();

  return (
    <ReactQuill
      value={internshipDescription}
      onChange={setInternshipDescription}
      style={{
        minHeight: "400px",
        maxHeight: "900px",
      }}
      modules={{
        toolbar: true,
      }}
      className="custom-quill-editor"
    />
  );
}

function JobDetails() {
  const {
    setSalary,
    salary,
    setSalaryType,
    duration,
    setDuration,
    setNegotiable,
    negotiable,
    renumerated,
    setRenumerated,
  } = useInternship();

  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-black font-bold">Internship Description</h3>
          <Label htmlFor="internshipDescription" className="text-gray-500 mt-2">
            Provide a detailed description of the internship.
          </Label>
        </div>
        <div className="flex-1">
          <MyEditor />
        </div>
      </div>

      <Separator className="my-2" />

      <div className="grid grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-black font-bold">Internship Duration</h3>
          <Label htmlFor="duration" className="text-gray-500 mt-2">
            Enter the duration of the internship post.
          </Label>
        </div>
        <div className="flex-1">
          <Input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(Number.parseInt(e.target.value))}
            className="flex-1 w-full mt-2"
            placeholder="Enter internship duration"
          />
          <span>Months</span>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="relative grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-black font-bold">Salary</h3>
          <Label htmlFor="salary" className="text-gray-500 mt-2">
            Enter the salary range for the internship.
          </Label>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center gap-2">
            <Input
              type="number"
              id="salary"
              placeholder="Enter Salary"
              value={salary}
              onChange={(e) => setSalary(Number.parseFloat(e.target.value))}
              className="w-2/3"
              disabled={!renumerated ? true : false}
            />
            <div className="w-1/3">
              <Select
                onValueChange={(value: string) => setSalaryType(value as SalaryType)}
                disabled={!renumerated ? true : false}
                defaultValue={SalaryType.MONTH}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="w-[120px] mt-2">
                  <SelectItem value={SalaryType.YEAR}>Yearly</SelectItem>
                  <SelectItem value={SalaryType.MONTH}>Month</SelectItem>
                  <SelectItem value={SalaryType.HOUR}>Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <RadioButton
              value={negotiable}
              onValueChange={setNegotiable}
              items={["Negotiable", "Fixed"]}
              itemsValue={[true, false]}
              classNameGroup="w-2/3 border-border border py-2 px-2 rounded-md"
              disabled={!renumerated ? true : false}
            />
            <div className="flex items-center justify-start flex-row-reverse gap-2 w-1/3">
              <Switch
                id="renumerated"
                checked={renumerated}
                onCheckedChange={setRenumerated}
              />
              <Label htmlFor="renumerated">Renumerated</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
