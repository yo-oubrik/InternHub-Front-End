"use client";
import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import CheckboxButton from "../CheckboxButton";
import Button from "../Button";
import { useInternship } from "@/context/internshipContext";
import { InternshipType } from "@/types/types";

function JobSkills() {
  const { skills, setSkills, tags, setTags } = useInternship();

  const skillInputRef = useRef<HTMLInputElement>(null);

  const handleAddSkill = () => {
    if (!skillInputRef.current) return;

    const skillValue = skillInputRef.current.value.trim();
    if (skillValue && !skills.includes(skillValue)) {
      setSkills([...skills, skillValue]);
      skillInputRef.current.value = "";
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill: string) => skill !== skillToRemove));
  };

  const handleAddTag = (value: InternshipType) => {
    if (!tags.includes(value)) {
      setTags((prev: InternshipType[]) => [...prev, value]);
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
            Add relevant skills for this internship post.
          </Label>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              ref={skillInputRef}
              type="text"
              id="skills"
              className="flex-1"
              placeholder="Enter a skill"
            />

            <Button label="Add Skill" type="button" onClick={handleAddSkill} />
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
          items={['PFA', 'PFE', 'Initiation']}
          itemsValue={[InternshipType.PFA, InternshipType.PFE, InternshipType.INITIATION]}
          onCheckedFunction={handleAddTag}
        />
      </div>
    </div>
  );
}

export default JobSkills;
