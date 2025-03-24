import { Dot, Pencil, Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import InputField from "../InputField";
import SearchableCombobox from "../SearchableCombobox";
import { DatePicker } from "../DatePicker";
import { CompanyDTO, Formation } from "@/types/types";

interface FormationInfosProps {
    object?: Formation;
    setter?: Dispatch<SetStateAction<Formation[]>>;
    setWantToAdd: Dispatch<SetStateAction<boolean>>;
    FLAG?: "VIEW" | "EDIT" | "NEW";
}

const FormationInfos = ({ object, setter, setWantToAdd, FLAG = "VIEW" }: FormationInfosProps) => {
    const [flag, setFlag] = useState<"VIEW" | "EDIT" | "NEW">(FLAG);
    const [isOpen, setIsOpen] = useState<boolean>(FLAG !== "VIEW");
    const initialCompanyState = { name: "", logo: "", address: "" };
    const initialFormationState = { domain: "", company: initialCompanyState, startDate: "", endDate: "", diploma: "" };
    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO>(initialCompanyState);
    const [formation, setFormation] = useState<Formation>(object || initialFormationState);
    
    const options = [
        {
            name: "Oracle",
            logo: "https://imgs.search.brave.com/SaJEFkC6CkHpv_F2fJqFC5PB1NSDKGGr8LWLC8FZb88/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9vcmFjbGUt/b3JpZ2luYWwtaWNv/bi0yMDQ4eDI2Ni02/eDJwOWZjby5wbmc",
            address: "Casablanca",
        },
        {
            name: "Google",
            logo: "https://imgs.search.brave.com/AtwSiN4R1HWHuQ8ufel7QsF-fatKfuSV000El5av_O0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi01MTJ4NTEy/LXRxYzllbDNyLnBu/Zw",
            address: "USA",
        },
        {
            name: "Vala",
            logo: "",
            address: "Agadir",
        },
    ];

    useEffect(() => {
        if (flag === "EDIT"){
            setSelectedCompany(formation?.company || initialCompanyState);
            setIsOpen(true);
        }
    }, [flag, formation.company]);

    const handleSelectCombobox = (value: string) => {
        const selectedCompany = options.find((option) => option.name === value) || initialCompanyState;
        setSelectedCompany(selectedCompany);
        setFormation({ ...formation, company: selectedCompany });
    }

    const handleSave = () => {
        if (setter) {
            setter((prev: Formation[]) => [...prev, formation]);
        }
        if (setWantToAdd) setWantToAdd(false);
    }

    const handleCancel = () => {
        setFormation(object || initialFormationState);
        setFlag("VIEW");
        setIsOpen(false);
        if (setWantToAdd) setWantToAdd(false);
    }

    return (
      <Accordion
        type="single"
        collapsible={flag === "VIEW"}
        value={isOpen ? "item-1" : undefined}
        onValueChange={(value) => setIsOpen(value === "item-1")}
      >
        <AccordionItem
          value="item-1"
          className="border-[2px] divide-y-2 rounded-lg py-1 px-4"
        >
          <AccordionTrigger
            className="[&>svg]:hidden flex flex-col gap-4 focus:ring-0 focus:outline-none hover:no-underline"
            onClick={(e) => {
                if(flag !== "VIEW") {
                    e.stopPropagation();
                }
            }}
          >
            <div className="w-full flex justify-between">
              <div className="flex gap-4 justify-center items-center">
                <div className="w-14 h-14">
                  <img
                    src={
                      flag !== "VIEW"
                        ? selectedCompany?.logo || ""
                        : formation?.company.logo
                    }
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="h-full space-y-1 text-start">
                  {flag === "VIEW" ? (
                    <>
                      <p>{formation?.domain}</p>
                      <p className="flex font-normal text-gray-700">
                        {formation?.company.name} <Dot width={17} /> {formation?.diploma}
                      </p>
                    </>
                  ) : (
                    <>
                        <p className="flex font-normal text-gray-700">
                            <SearchableCombobox
                            defaultValue={formation?.company.name}
                            options={options}
                            onSelect={handleSelectCombobox}
                            />
                        </p>
                        <div className="flex items-center">
                            <InputField
                                value={formation?.domain}
                                type="text"
                                placeholder="Domain..."
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
                      <Pencil
                        className="text-primary h-6 w-6 hover:text-primary-hover cursor-pointer"
                        onClick={() => setFlag("EDIT")}
                      />
                      <Trash2 className="text-primary h-6 w-6 hover:text-primary-hover cursor-pointer" />
                    </div>
                  </>
                ) : (
                  <>
                    <DatePicker
                      value={formation?.startDate}
                      setDateValue={(value: string) =>
                        setFormation({ ...formation, startDate: value })
                      }
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
                      />
                      <div
                        onClick={() =>
                          setFormation({ ...formation, endDate: "PRESENT" })
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
            {
                FLAG !== "VIEW" &&
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
            }
          </AccordionTrigger>
          
        </AccordionItem>
      </Accordion>
    );
};

export default FormationInfos; 