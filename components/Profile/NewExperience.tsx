"use client";
import { Company, Experience } from "@/types/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { DatePicker } from "../DatePicker";
import InputField from "../InputField";
import SearchableCombobox from "../SearchableCombobox";
import TextEditor from "../TextEditor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useUser } from "@/context/userContext";

interface Props {
  setExperiences: Dispatch<SetStateAction<Experience[]>>;
  setWantToAdd: Dispatch<SetStateAction<boolean>>;
}

const NewExperience = ({ setExperiences, setWantToAdd }: Props) => {
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const [selectedCompany, setSelectedCompany] = useState<Company>(
    {} as Company
  );

  const { companies } = useUser();

  const initialExperienceState: Experience = {
    id: "",
    poste: "",
    startDate: "",
    endDate: "",
    company: {} as Company,
    description: "",
  };
  const [experience, setExperience] = useState<Experience>(
    initialExperienceState
  );

  const handleSelectCombobox = (value: string) => {
    const selectedCompany =
      companies.find((option) => option.name === value) || ({} as Company);
    setSelectedCompany(selectedCompany);
    setExperience({ ...experience, company: selectedCompany });
  };

  const handleSave = () => {
    setExperiences((prev) => [...prev, experience]);
    setExperience(initialExperienceState);
    setWantToAdd(false);
  };

  const handleCancel = () => {
    setExperience(initialExperienceState);
    setWantToAdd(false);
  };

  console.log(experience);
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem
        value="item-1"
        className="border-[2px] divide-y-2 rounded-lg py-1 px-4"
      >
        <AccordionTrigger
          onClick={(e) => e.preventDefault()}
          className="[&>svg]:hidden focus:ring-0 focus:outline-none hover:no-underline"
        >
          <div className="w-full flex justify-between">
            <div className="flex gap-4 justify-center items-center">
              <div className="w-14 h-14">
                <img
                  src={selectedCompany?.profilePicture || ""}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="h-full space-y-1 text-start">
                <InputField
                  type="text"
                  placeholder="Title..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setExperience({ ...experience, poste: e.target.value })
                  }
                />
                <p className="flex font-normal text-gray-700">
                  <SearchableCombobox
                    options={companies}
                    onSelect={handleSelectCombobox}
                  />
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-center ">
              <DatePicker
                setDateValue={(value: string) =>
                  setExperience({ ...experience, startDate: value })
                }
              />
              <span className="mt-2">-</span>
              <div
                className={`flex gap-1 ${
                  experience.endDate === "PRESENT"
                    ? "flex-col-reverse"
                    : "flex-col"
                }`}
              >
                <DatePicker
                  setDateValue={(value: string) =>
                    setExperience({ ...experience, endDate: value })
                  }
                  resetDate={experience.endDate === "PRESENT"}
                />
                <div
                  onClick={() =>
                    setExperience({ ...experience, endDate: "PRESENT" })
                  }
                  className="rounded-md bg-background py-2 px-4 border border-gray-200 font-medium text-sm cursor-pointer"
                >
                  PRESENT
                </div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col py-1">
          {showEditor ? (
            <TextEditor
              value={experience.description}
              onChange={(value: string) =>
                setExperience({ ...experience, description: value })
              }
              style={{ minHeight: "400px", maxHeight: "900px" }}
              modules={{ toolbar: true }}
              className="bg-background w-full h-full"
            />
          ) : (
            <span
              className="bg-background rounded-lg py-4 w-full h-full text-center cursor-text"
              onClick={() => setShowEditor(true)}
            >
              Click Here to Add Description
            </span>
          )}
          <div className="flex justify-center gap-4 my-2">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 hover:bg-opacity-90"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-black py-2 px-4 rounded opacity-75 hover:bg-gray-400 hover:bg-opacity-60"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NewExperience;
