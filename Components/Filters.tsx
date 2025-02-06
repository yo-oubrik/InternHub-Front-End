"use client";
import React from "react";
import { Button } from "./ui/button";
import { useJobsContext } from "@/context/jobsContext";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

function Filters() {
  const {
    handleFilterChange,
    filters,
    setFilters,
    renumerated , 
    setRenumerated , 
    searchJobs,
    setSearchQuery,
  } = useJobsContext();

  const clearAllFilters = () => {
    setFilters({
      remote: false,
      onSite: false,
      pfa : false , 
      pfe : false , 
      initiation : false
    });

    setRenumerated(false);
    setSearchQuery({ tags: "", location: "", title: "" });
  };

  function handleRenumeratedChange(value: string): void {
    setRenumerated(!renumerated);
    handleFilterChange('renumerated');
  }

  return (
    <div className="w-[22rem] pr-4 space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">Job Type</h2>

          <Button
            variant={"ghost"}
            className="h-auto p-0 text-red-500 hover:text-red-700"
            onClick={() => {
              clearAllFilters();
              searchJobs();
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
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Type</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pfa"
              checked={filters.pfa}
              onCheckedChange={() => handleFilterChange("PFA")}
            />
            <Label htmlFor="PFA">PFA</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pfe"
              checked={filters.pfe}
              onCheckedChange={() => handleFilterChange("PFE")}
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
        <RadioGroup
          onValueChange={handleRenumeratedChange} // Use onValueChange here!
          className="flex flex-col gap-5"
          defaultValue="nonRenumerated"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nonRenumerated" id="nonRenumerated" />
            <Label htmlFor="nonRenumerated">Non Renumerated</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="renumerated" id="renumerated" />
            <Label htmlFor="renumerated">Renumerated</Label>
          </div>
        </RadioGroup>
    </div>
  </div>
  );
}

export default Filters;
