"use client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import RadioButton from "./RadioButton"; 
import { Button } from "./ui/button";
import { useFilters } from "@/context/FiltersContext";
import { useInternship } from "@/context/internshipContext";
import { ApplicationStatus } from "@/types/types";

function Filters({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const {
    searchInternships,
    setSearchQuery,
  } = useInternship();

  const { handleFilterChange, filters, setFilters } = useFilters();

  const [status, setStatus] = useState<string | null>(null);
  const [applicationDate, setApplicationDate] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState<string | null>(null);

  const clearAllFilters = () => {
    setFilters({
      remote: false,
      onSite: false,
      hybrid: false,
      pfa: false,
      pfe: false,
      initiation: false,
      renumerated: false,
    });
    setSearchQuery({ location: "", title: "" });
    setStatus(null);
    setApplicationDate(null);
    setInterviewDate(null);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatus(value);
    onFilterChange({ status: value, applicationDate, interviewDate });
  };

  const handleApplicationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setApplicationDate(value);
    onFilterChange({ status, applicationDate: value, interviewDate });
  };

  const handleInterviewDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInterviewDate(value);
    onFilterChange({ status, applicationDate, interviewDate: value });
  };

  return (
    <div className="w-[18rem] pr-4 space-y-6 border-r-gray-300 border-r-2">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">Job Type</h2>

          <Button
            variant={"ghost"}
            className="h-auto p-0 text-primary hover:text-primary-hover"
            onClick={() => {
              clearAllFilters();
              // searchInternships();
            }}
          >
            Clear All
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={filters.remote}
              onCheckedChange={() => handleFilterChange("remote")}
            />
            <Label htmlFor="remote">Remote</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="onSite"
              checked={filters.onSite}
              onCheckedChange={() => handleFilterChange("onSite")}
            />
            <Label htmlFor="onSite">On-site</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hybrid"
              checked={filters.hybrid}
              onCheckedChange={() => handleFilterChange("hybrid")}
            />
            <Label htmlFor="hybrid">Hybrid</Label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Type</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pfa"
              checked={filters.pfa}
              onCheckedChange={() => handleFilterChange("pfa")}
            />
            <Label htmlFor="PFA">PFA</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pfe"
              checked={filters.pfe}
              onCheckedChange={() => handleFilterChange("pfe")}
            />
            <Label htmlFor="PFE">PFE</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="initiation"
              checked={filters.initiation}
              onCheckedChange={() => handleFilterChange("initiation")}
            />
            <Label htmlFor="initiation">Initiation</Label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Include Salary</h2>
        <RadioButton
          value={filters.renumerated}
          items={['Renumerated', 'Non Renumerated']}
          itemsValue={[true, false]}
          onValueChange={() => handleFilterChange('renumerated')} // Use onCheckedChange here!
          classNameGroup="flex flex-col gap-5"
          classNameItem="flex items-center space-x-2"
          defaultValue={false}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Filter by Status
          </label>
          <select
            id="status"
            value={status || ""}
            onChange={handleStatusChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            {Object.values(ApplicationStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700">
            Filter by Application Date
          </label>
          <input
            type="date"
            id="applicationDate"
            value={applicationDate || ""}
            onChange={handleApplicationDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700">
            Filter by Interview Date
          </label>
          <input
            type="date"
            id="interviewDate"
            value={interviewDate || ""}
            onChange={handleInterviewDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
