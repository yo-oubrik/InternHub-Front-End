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
import { Switch } from "../ui/switch";
import { useInternship } from "@/context/internshipContext";
import { Label } from "../ui/label";
import RadioButton from "../RadioButton";
import { SalaryType } from "@/types/types";
import TextEditor from "../TextEditor";



function JobDetails() {
  const {
    internship,
    setInternship
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
          <TextEditor
            value={internship.description}
            onChange={(value) => setInternship({...internship, description : value})}
            style={{ minHeight: "400px", backgroundColor: "white" }}
            modules={{ toolbar: true }}
          />
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
            value={internship.duration}
            onChange={(e) => setInternship({...internship, duration : Number.parseInt(e.target.value)})}
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
              value={internship.salary}
              onChange={(e) => setInternship({...internship, salary : Number.parseFloat(e.target.value)})}
              className="w-2/3"
              disabled={!internship.paid ? true : false}
            />
            <div className="w-1/3">
              <Select
                onValueChange={(value: string) =>
                  setInternship({...internship, salaryType : value as SalaryType})
                }
                disabled={!internship.paid ? true : false}
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
              value={internship.negotiable}
              onValueChange={(value) => setInternship({...internship, negotiable : value})}
              items={["Negotiable", "Fixed"]}
              itemsValue={[true, false]}
              classNameGroup="w-2/3 border-border border py-2 px-2 rounded-md"
              disabled={!internship.paid ? true : false}
            />
            <div className="flex items-center justify-start flex-row-reverse gap-2 w-1/3">
              <Switch
                id="paid"
                checked={internship.paid}
                onCheckedChange={(value) => setInternship({...internship, paid : value})}
              />
              <Label htmlFor="paid">Paid</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
