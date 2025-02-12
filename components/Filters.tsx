"use client";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import RadioButton from "./RadioButton"; // Ensure lowercase 'components'
import { Button } from "./ui/button";
import { useFilters } from "@/context/FiltersContext";
import { useInternship } from "@/context/internshipContext";


function Filters() {
  const {
    searchJobs,
    setSearchQuery,
  } = useInternship();

  const { handleFilterChange, filters, setFilters } = useFilters();

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
    </div>
  );
}

export default Filters;
