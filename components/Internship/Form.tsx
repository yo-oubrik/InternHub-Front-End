"use client";
import React from "react";
import AlertModal from "../AlertModal";
import Button from "../Button";
import JobDetails from "./JobDetails";
import JobSkills from "./JobSkills ";
import JobTitle from "./JobTitle";
import { useInternship } from "@/context/internshipContext";

function Form() {
  const {
    createInternship,
    InternshipTitle,
    internshipDescription,
    salaryType,
    activeInternshipType,
    salary,
    duration,
    location,
    skills,
    tags,
    negotiable,
    renumerated,
    resetInternshipForm,
  } = useInternship();

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

  const renderStages = () => {
    switch (activeSection) {
      case "About":
        return <JobTitle />;
      case "Post Details":
        return <JobDetails />;
      case "Skills":
        return <JobSkills />;
    }
  };

  const [showAlert, setShowAlert] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const loc = `${location.address ? location.address + ", " : ""}${location.city ? location.city + ", " : ""
      }${location.country}`;

    if (activeSection === 'Summary') {
      if (InternshipTitle === "" || tags.length === 0 || internshipDescription === "" || loc === "" ) {
        setShowAlert(true);
        return;
      }
    }

    createInternship({
      id : '' ,
      title: InternshipTitle,
      description: internshipDescription,
      salaryType,
      workMode: activeInternshipType,
      salary,
      duration,
      location: loc,
      skills,
      tags,
      domain : '' ,
      negotiable,
      renumerated
    });

    activeSection === 'Summary' && resetInternshipForm();
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="self-start w-full flex flex-row items-center bg-white rounded-full h-10 shadow-sm overflow-hidden">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`w-full flex items-center justify-center ${visitedSections.size > index + 1 ? "bg-primary" : "bg-transparent"
              }`}
          >
            <div
              className={`py-3 relative gap-2 w-full text-center font-medium rounded-r-full border-r-2
                  ${visitedSections.has(section)
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
            className="px-6 py-2 text-black rounded-md"
          />
          {activeSection !== "Summary" && (
            <Button
              label="Next"
              onClick={() => {
                const currentIndex = sections.indexOf(activeSection);
                setActiveSection(sections[currentIndex + 1]);
                handleSectionChange(sections[currentIndex + 1], "add");
              }}
              className="px-6 py-2 bg-[#7263F3] text-white rounded-md"
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
      {showAlert && (
        <AlertModal
          isOpenModal={showAlert}
          setIsOpenModal={setShowAlert}
          title="🚨 Missing Required Fields"
          titleClassName="mb-1"
          content={"Oops! It looks like you missed some required fields. Please review the form and complete all necessary details before proceeding."}
          contentClassName="text-base" // whitespace-pre-line if inserting \n within the content attribute.         
          confirmButton={false}
          cancelButtonClassName="bg-primary hover:bg-primary-hover text-white hover:text-white"
          onCancel={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default Form;