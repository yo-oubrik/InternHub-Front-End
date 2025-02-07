"use client";
import { useGlobalContext } from "@/context/globalContext";
import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button"; // Ensure lowercase 'components'
import { X } from "lucide-react";
import CheckboxButton from "../CheckboxButton";
import { useJobsContext } from "@/context/jobsContext";

function JobSkills() {
  const { skills, setSkills, tags, setTags } = useGlobalContext();
  const { filters , handleFilterChange } = useJobsContext();

  const skillInputRef = useRef<HTMLInputElement>(null);

  const handleAddSkill = () => {
    if (!skillInputRef.current) return; // Prevent errors
  
    const skillValue = skillInputRef.current.value.trim(); // Get input value
    if (skillValue && !skills.includes(skillValue)) {
      setSkills([...skills, skillValue]);
      skillInputRef.current.value = ""; // Clear input field after adding
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill : string ) => skill !== skillToRemove));
  };

  const handleAddTag = (value : string) => {
    console.log('from handle add tag function: ',value)
    handleFilterChange(value.toLowerCase());
    if (!tags.includes(value.trim())) {
      setTags((prev: string) => [...prev, value.trim()]);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Skills</h3>
          <Label
            htmlFor="skills"
            className="text-sm text-muted-foreground mt-2"
          >
            Add relevant skills for the job position.
          </Label>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
          <Input
              ref={skillInputRef} // Attach the ref to input
              type="text"
              id="skills"
              className="flex-1"
              placeholder="Enter a skill"
            />

            <Button type="button" onClick={handleAddSkill}>
              Add Skill
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill: string, index: number) => (
              <div
                key={index}
                className="bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center space-x-1"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-primary-foreground hover:text-red-500 focus:outline-none"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Type</h3>
          <Label htmlFor="tags" className="text-sm text-muted-foreground mt-2">
            Add relevant tags for the internship position.
          </Label>
        </div>
        <CheckboxButton
          items={['PFA','PFE',"Initiation"]}
          itemsValue={[filters.pfa,filters.pfe,filters.initiation]}
          onCheckedFunction={handleAddTag}
        />
      </div>
    </div>
  );
}

export default JobSkills;
