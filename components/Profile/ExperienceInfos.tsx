import {
  Building,
  Building2,
  Building2Icon,
  Dot,
  Pencil,
  Trash2,
} from "lucide-react";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import InputField from "../InputField";
import SearchableCombobox from "../SearchableCombobox";
import { DatePicker } from "../DatePicker";
import TextEditor from "../TextEditor";
import { Company, Experience, Role } from "@/types/types";
import { useUser } from "@/context/userContext";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import { Button } from "../ui/button";
import { universitiesSchools } from "@/utils/universities-schools";

interface ExperienceInfosProps {
  object: Experience | null;
  setExperiences: Dispatch<SetStateAction<Experience[]>>;
  setWantToAdd: Dispatch<SetStateAction<boolean>>;
  FLAG?: "VIEW" | "EDIT" | "NEW";
}

const ExperienceInfos = ({
  object,
  setExperiences,
  setWantToAdd,
  FLAG = "VIEW",
}: ExperienceInfosProps) => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [flag, setFlag] = useState<"VIEW" | "EDIT" | "NEW">(FLAG);
  const { currentUser } = useAuth();
  // const initialCompanyState = { name: "", logo: "", address: "" };
  // const initialExperienceState = { poste: "", company: initialCompanyState, startDate: "", endDate: "", description: "" };
  const [selectedCompany, setSelectedCompany] = useState<string>(
    object?.company || ""
  );
  const [experience, setExperience] = useState<Experience>(
    object || ({} as Experience)
  );
  const {
    companies,
    getCompanies,
    createExperience,
    updateExperience,
    deleteExperience,
    isUserProfile,
  } = useUser();

  useEffect(() => {
    getCompanies();
  }, []);
  useEffect(() => {
    if (flag === "EDIT") {
      setSelectedCompany(experience?.company);
      if (experience?.description) {
        setShowEditor(true);
      }
    }
  }, [flag, experience?.description, experience?.company]);

  useEffect(()=>{
    companies.push(
      ...universitiesSchools.map<Company>((school) => ({
        id: school.name,
        name: school.name,
        location: { latitude: 0, longitude: 0 },
        description: "",
        ice: "",
        blocked: false,
        blockedAt: null,
        internships: [],
        links: {},
        tel: "",
        email: "",
        role: Role.COMPANY,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },[companies])

  const handleSelectCombobox = (value: string) => {
    console.log("value : ", value);
    setSelectedCompany(value);
    setExperience({
      ...experience,
      company: value,
    });
  };

  const handleSave = async () => {
    try {
      if (flag === "NEW") {
        await createExperience(experience);
      } else {
        await updateExperience(experience);
      }
      setFlag("VIEW");
    } catch (error) {
      toast.error("Failed to save experience : " + error);
    } finally {
      if (setWantToAdd) setWantToAdd(false);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setExperience(object || ({} as Experience));
    setFlag("VIEW");
    if (setWantToAdd) setWantToAdd(false);
  };

  return (
    <Accordion
      type="single"
      collapsible={flag === "VIEW" ? true : false}
      defaultValue={flag === "VIEW" ? undefined : "item-1"}
    >
      <AccordionItem
        value="item-1"
        className="border-[2px] divide-y-2 rounded-lg py-1 px-4"
      >
        <AccordionTrigger
          className="[&>svg]:hidden focus:ring-0 focus:outline-none hover:no-underline"
          onClick={(e) => {
            if (flag !== "VIEW") {
              e.stopPropagation();
            }
          }}
        >
          <div className="w-full flex justify-between">
            <div className="flex gap-4 justify-center items-center">
              <div className="w-14 h-14">
                <Building2 className="w-full h-full" />
              </div>
              <div className="h-full space-y-1 text-start">
                {flag === "VIEW" ? (
                  <>
                    <p>{experience?.poste}</p>
                    <p className="flex font-normal text-gray-700">
                      {experience?.company}
                    </p>
                  </>
                ) : (
                  <>
                    <InputField
                      value={experience?.poste}
                      type="text"
                      placeholder="Title..."
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setExperience({
                          ...experience,
                          poste: e.target.value,
                        })
                      }
                      className="border border-gray-300 focus:bg-gray-100/50 hover:bg-gray-100/50 focus:text-gray-700 hover:text-gray-700"
                    />
                    <p className="flex font-normal text-gray-700">
                      <SearchableCombobox
                        defaultValue={experience?.company || ""}
                        options={companies}
                        onSelect={handleSelectCombobox}
                        classNameButton="bg-background border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700"
                      />
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              {flag === "VIEW" ? (
                <>
                  {experience?.startDate} - {experience?.endDate}
                  <div className="flex gap-2">
                    {isUserProfile && (
                      <Pencil
                        className="text-primary h-6 w-6 hover:text-primary-hover cursor-pointer"
                        onClick={() => setFlag("EDIT")}
                      />
                    )}
                    {isUserProfile && (
                      <Trash2
                        className="text-primary h-6 w-6 hover:text-primary-hover cursor-pointer"
                        onClick={() => {
                          deleteExperience(experience);
                          toast.success("Experience deleted successfully");
                          setExperiences((prev) =>
                            prev.filter((exp) => exp?.id !== experience?.id)
                          );
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <DatePicker
                    value={experience?.startDate}
                    setDateValue={(value: string) =>
                      setExperience({ ...experience, startDate: value })
                    }
                    className="bg-background border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700"
                  />
                  <span className="mt-2">-</span>
                  <div
                    className={`flex gap-1 ${
                      experience?.endDate === "PRESENT"
                        ? "flex-col-reverse"
                        : "flex-col"
                    }`}
                  >
                    <DatePicker
                      value={
                        experience?.endDate === "PRESENT"
                          ? ""
                          : experience?.endDate
                      }
                      setDateValue={(value: string) =>
                        setExperience({ ...experience, endDate: value })
                      }
                      resetDate={experience?.endDate === "PRESENT"}
                      className="bg-background border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700"
                    />
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        setExperience({ ...experience, endDate: "PRESENT" })
                      }
                      className="rounded-md bg-background border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700 text-black py-2 px-4 font-medium text-sm cursor-pointer"
                    >
                      PRESENT
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 text-base flex flex-col">
          {flag === "VIEW" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: experience?.description || "No description provided",
              }}
            />
          ) : (
            <>
              {showEditor ? (
                <TextEditor
                  value={experience?.description || ""}
                  onChange={(value: string) =>
                    setExperience({ ...experience, description: value })
                  }
                  style={{ minHeight: "400px", maxHeight: "900px" }}
                  modules={{ toolbar: true }}
                  className="bg-background w-full h-full"
                />
              ) : (
                <span
                  className="bg-background rounded-lg py-4 w-full h-full text-center cursor-text border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700"
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
                  {flag === "NEW" ? "Save" : "Edit"}
                </button>
                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded opacity-75 hover:bg-gray-400 hover:bg-opacity-60"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExperienceInfos;
