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
  const [selectedCompany, setSelectedCompany] = useState<Company>(
    object?.company || ({} as Company)
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

  // const options = [
  //     {
  //         name: "Oracle",
  //         logo: "https://imgs.search.brave.com/SaJEFkC6CkHpv_F2fJqFC5PB1NSDKGGr8LWLC8FZb88/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9vcmFjbGUt/b3JpZ2luYWwtaWNv/bi0yMDQ4eDI2Ni02/eDJwOWZjby5wbmc",
  //         address: "Casablanca",
  //     },
  //     {
  //         name: "Google",
  //         logo: "https://imgs.search.brave.com/AtwSiN4R1HWHuQ8ufel7QsF-fatKfuSV000El5av_O0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi01MTJ4NTEy/LXRxYzllbDNyLnBu/Zw",
  //         address: "USA",
  //     },
  //     {
  //         name: "Vala",
  //         logo: "",
  //         address: "Agadir",
  //     },
  // ];

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

  const handleSelectCombobox = (value: string) => {
    const selectedCompany = companies.find(
      (company) => company.name === value
    ) as Company;
    setSelectedCompany(selectedCompany);
    setExperience({
      ...experience,
      company: selectedCompany,
    });
  };

  const handleSave = async () => {
    try {
      if (flag === "NEW") {
        const newExperience = await createExperience(experience);
        setExperiences((prev: Experience[]) => [...prev, newExperience]);
      } else {
        const updatedExperience = await updateExperience(experience);
        setExperiences((prev: Experience[]) =>
          prev.map((exp) =>
            exp.id === experience.id ? updatedExperience : exp
          )
        );
      }
      console.log("flagged : ", flag);
      setFlag("VIEW");
    } catch (error) {
      toast.error("Failed to save experience : " + error);
    } finally {
      if (setWantToAdd) setWantToAdd(false);
    }
  };

  const handleCancel = () => {
    setExperience(object || ({} as Experience));
    setFlag("VIEW");
    if (setWantToAdd) setWantToAdd(false);
  };

  console.log("companies : ", companies);
  console.log("experience : ", experience);

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
                {selectedCompany?.profilePicture ||
                experience?.company?.profilePicture ? (
                  <img
                    src={
                      flag !== "VIEW"
                        ? selectedCompany?.profilePicture || ""
                        : experience?.company?.profilePicture || ""
                    }
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <Building2 className="w-full h-full" />
                )}
              </div>
              <div className="h-full space-y-1 text-start">
                {flag === "VIEW" ? (
                  <>
                    <p>{experience?.poste}</p>
                    <p className="flex font-normal text-gray-700">
                      {experience?.company.name} <Dot width={17} />{" "}
                      {experience?.company.location?.city +
                        " , " +
                        experience?.company.location?.country}
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
                    />
                    <p className="flex font-normal text-gray-700">
                      <SearchableCombobox
                        defaultValue={experience?.company?.name ?? ""}
                        options={companies}
                        onSelect={handleSelectCombobox}
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
                          setExperiences((prev) =>
                            prev.filter((exp) => exp.id !== experience.id)
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
