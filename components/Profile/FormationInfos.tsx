import { Building2, Dot, Pencil, School, Trash2 } from "lucide-react";
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
import { Company, Formation, Role } from "@/types/types";
import { useUser } from "@/context/userContext";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import { universitiesSchools } from "@/utils/universities-schools";

interface FormationInfosProps {
  object: Formation | null;
  setFormations: Dispatch<SetStateAction<Formation[]>>;
  setWantToAdd: Dispatch<SetStateAction<boolean>>;
  FLAG: "VIEW" | "EDIT" | "NEW";
}

const FormationInfos = ({
  object,
  setFormations,
  setWantToAdd,
  FLAG = "VIEW",
}: FormationInfosProps) => {
  // const [ showEditor , setShowEditor ] = useState<boolean>(false);
  const [flag, setFlag] = useState<"VIEW" | "EDIT" | "NEW">(FLAG);

  const { currentUser } = useAuth();
  // const [isOpen, setIsOpen] = useState<boolean>(FLAG !== "VIEW");
  // const initialCompanyState = { name: "", logo: "", address: "" };
  // const initialFormationState = { domain: "", company: initialCompanyState, startDate: "", endDate: "", diploma: "" };
  const [selectedCompany, setSelectedCompany] = useState<string>(
    object?.company || ""
  );
  const [formation, setFormation] = useState<Formation>(
    object || ({} as Formation)
  );
  const {
    createFormation,
    updateFormation,
    deleteFormation,
    isUserProfile,
  } = useUser();



  useEffect(() => {
    if (flag === "EDIT") {
      setSelectedCompany(formation?.company);
    }
  }, [flag, formation.company]);

  const handleSelectCombobox = (value: string) => {
    setSelectedCompany(value);
    setFormation({
      ...formation,
      company: value,
    });
  };

  const handleSave = async () => {
    try {
      if (flag === "NEW") {
        await createFormation(formation);
      } else {
        await updateFormation(formation);
      }
      setFlag("VIEW");
      if (setWantToAdd) setWantToAdd(false);
    } catch (error) {
      console.error("Error saving formation:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save formation"
      );
    } finally {
      if (setWantToAdd) setWantToAdd(false);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setFormation(object || ({} as Formation));
    setFlag("VIEW");
    if (setWantToAdd) setWantToAdd(false);
  };

  console.log("formation : ", formation);

  return (
    <Accordion type="single">
      <AccordionItem
        value="item-1"
        className="border-[2px] divide-y-2 rounded-lg py-1 px-4"
      >
        <AccordionTrigger
          className="[&>svg]:hidden flex flex-col gap-4 focus:ring-0 focus:outline-none hover:no-underline"
          onClick={(e) => {
            if (flag !== "VIEW") {
              e.stopPropagation();
            }
          }}
        >
          <div className="w-full flex justify-between">
            <div className="flex gap-4 justify-center items-center">
              <div className="w-14 h-14">
                <School className="w-full h-full" />
              </div>
              <div className="h-full space-y-1 text-start">
                {flag === "VIEW" ? (
                  <>
                    <p>{formation?.company}</p>
                    <p className="flex font-normal text-gray-700">
                      {formation?.domain} <Dot width={17} />{" "}
                      {formation?.diploma}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex font-normal text-gray-700">
                      <SearchableCombobox
                        defaultValue={formation?.company ?? ""}
                        options={universitiesSchools}
                        onSelect={handleSelectCombobox}
                        classNameButton="bg-background border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700"
                      />
                    </p>
                    <div className="flex items-center">
                      <InputField
                        value={formation?.domain}
                        type="text"
                        placeholder="Domain..."
                        className="border border-gray-300 focus:bg-gray-100/50 hover:bg-gray-100/50 focus:text-gray-700 hover:text-gray-700"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormation({
                            ...formation,
                            domain: e.target.value,
                          })
                        }
                      />
                      <Dot width={17} />
                      <InputField
                        value={formation?.diploma}
                        type="text"
                        placeholder="Diploma..."
                        className="border border-gray-300 focus:bg-gray-100/50 hover:bg-gray-100/50 focus:text-gray-700 hover:text-gray-700"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormation({
                            ...formation,
                            diploma: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              {flag === "VIEW" ? (
                <>
                  {formation?.startDate} - {formation?.endDate}
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
                          deleteFormation(formation);
                          toast.success("Formation deleted successfully");
                          setFormations((prev) =>
                            prev.filter((exp) => exp.id !== formation.id)
                          );
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <DatePicker
                    value={formation?.startDate}
                    setDateValue={(value: string) =>
                      setFormation({ ...formation, startDate: value })
                    }
                    className="bg-background border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700"
                  />
                  <span className="mt-2">-</span>
                  <div
                    className={`flex gap-1 ${
                      formation?.endDate === "PRESENT"
                        ? "flex-col-reverse"
                        : "flex-col"
                    }`}
                  >
                    <DatePicker
                      value={
                        formation?.endDate === "PRESENT"
                          ? ""
                          : formation?.endDate
                      }
                      setDateValue={(value: string) =>
                        setFormation({ ...formation, endDate: value })
                      }
                      resetDate={formation?.endDate === "PRESENT"}
                      className="bg-background border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700"
                    />
                    <div
                      onClick={() =>
                        setFormation({ ...formation, endDate: "PRESENT" })
                      }
                      className="rounded-md bg-background border border-gray-300 hover:bg-gray-100/50 hover:text-gray-700 text-black py-2 px-4 font-medium text-sm cursor-pointer"
                    >
                      PRESENT
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {flag !== "VIEW" && (
            <div className="flex justify-center gap-4">
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
          )}
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
};

export default FormationInfos;
