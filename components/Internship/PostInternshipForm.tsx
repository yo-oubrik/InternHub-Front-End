"use client";
import React from "react";
import AlertModal from "../AlertModal";
import Button from "../Button";
import JobDetails from "./JobDetails";
import JobSkills from "./JobSkills ";
import JobTitle from "./JobTitle";
import { useInternship } from "@/context/internshipContext";
import Summary from "./Summary";
import toast from "react-hot-toast";
import { object } from "zod";

function PostInternshipForm() {
  const { createInternship, resetInternshipForm, internship } = useInternship();

  const sections = ["About", "Post Details", "Skills", "Summary"];
  const [visitedSections, setVisitedSections] = React.useState<Set<string>>(
    new Set([sections[0]])
  );
  const [activeSection, setActiveSection] = React.useState<string>(sections[0]);

  const handleSectionChange = (section: string, Type: string) => {
    setVisitedSections((prev) => {
      const updatedSet = new Set(prev);
      Type === "add" ? updatedSet.add(section) : updatedSet.delete(section);
      return updatedSet;
    });
  };

  const validateInternshipTitleForm = () => {
    const title = internship?.title;
    const workMode = internship?.workMode;

    if (!title || !workMode) {
      return false;
    }
    return true;
  };

  const validateInternshipDetailsForm = () => {
    const description = internship?.description;
    const duration = internship?.duration;
    const salary = internship?.salary;
    const paid = internship?.paid;
    const salaryType = internship?.salaryType;

    if (
      !description ||
      !duration ||
      (paid && (!salary || salary < 500 || !salaryType))
    ) {
      return false;
    }
    return true;
  };

  const validateInternshipSkillsForm = () => {
    const skills = internship?.skills;
    const tags = internship?.tags;
    if (!skills || skills.length === 0 || !tags || tags.length === 0) {
      return false;
    }
    return true;
  };

  const handleNextSection = () => {
    if (activeSection === "About") {
      if (!validateInternshipTitleForm()) {
        toast.error("Please fill all the fields", { id: "error" });
        return;
      }
    }
    if (activeSection === "Post Details") {
      if (!validateInternshipDetailsForm()) {
        toast.error("Please fill all the fields", { id: "error" });
        return;
      }
    }
    if (activeSection === "Skills") {
      if (!validateInternshipSkillsForm()) {
        toast.error("Please fill all the fields", { id: "error" });
        return;
      }
    }

    const currentIndex = sections.indexOf(activeSection);
    setActiveSection(sections[currentIndex + 1]);
    handleSectionChange(sections[currentIndex + 1], "add");
  };

  const renderStages = () => {
    switch (activeSection) {
      case "About":
        return <JobTitle />;
      case "Post Details":
        return <JobDetails />;
      case "Skills":
        return <JobSkills />;
      case "Summary":
        return <Summary />;
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeSection === "Summary") {
      createInternship();
      resetInternshipForm();
    }
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="self-start w-full flex flex-row items-center bg-white rounded-full h-10 shadow-sm overflow-hidden">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`w-full flex items-center justify-center ${
              visitedSections.size > index + 1 ? "bg-primary" : "bg-transparent"
            }`}
          >
            <div
              className={`py-3 relative gap-2 w-full text-center font-medium rounded-r-full border-r-2
                  ${
                    visitedSections.has(section)
                      ? "text-white bg-primary"
                      : "text-black"
                  }
                  `}
            >
              {section}
              {/* {currentSection === section && (
                <span className="w-1 h-full absolute left-0 top-0 bg-[#7263F3] rounded-full"></span>
              )} */}
            </div>
          </div>
        ))}
      </div>

      <form
        action=""
        className="p-6 flex-1 bg-white rounded-lg w-full"
        onSubmit={handleSubmit}
      >
        {renderStages()}

        <div className="gap-4 mt-4 w-full flex justify-between">
          <Button
            label="Previous"
            onClick={() => {
              const currentIndex = sections.indexOf(activeSection);
              setActiveSection(sections[currentIndex - 1]);
              handleSectionChange(sections[currentIndex], "del");
            }}
            outline={true}
            disabled={activeSection === "About"}
            className="px-6 py-2 text-black rounded-md"
          />
          {activeSection !== "Summary" && (
            <Button
              label="Next"
              onClick={handleNextSection}
              className="px-6 py-2 text-white rounded-md"
            />
          )}

          {activeSection === "Summary" && (
            <button
              type="submit"
              className="self-end px-6 py-2 bg-[#7263F3] text-white rounded-md"
            >
              Post Job
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PostInternshipForm;
