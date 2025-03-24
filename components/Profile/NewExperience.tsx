"use client"
import { CircleDotDashed, Dot, Pencil } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import TextEditor from "../TextEditor";
import SearchableCombobox from "../SearchableCombobox";
import { DatePicker } from "../DatePicker";
import { Experience } from "@/types/types";
import InputField from "../InputField";

interface Props {
    setExperiences : Dispatch<SetStateAction<Experience[]>>;
    setWantToAdd : Dispatch<SetStateAction<boolean>> ;
}

const NewExperience = ({ setExperiences , setWantToAdd }: Props) => {
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const initialCompanyState = {name : "" , logo : "" , address : ""};
    const [selectedCompany , setSelectedCompany] = useState<{name : string , logo : string , address : string}>(initialCompanyState);
    const initialExperienceState = {
        poste : "" , 
        address : "" , 
        startDate : "" , 
        endDate : "" , 
        company : initialCompanyState , 
        description : "" ,
    }
    const [experience , setExperience] = useState<Experience>(initialExperienceState);

    // this options object will be fetched from an api (companiesDTO)
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

    const handleSelectCombobox = (value: string) => {
        const selectedCompany = options.find((option) => option.name === value) || initialCompanyState;
        setSelectedCompany(selectedCompany);
        setExperience({...experience , company : selectedCompany});
    }

    const handleSave = () => {
        setExperiences(prev => [...prev, experience]);
        setExperience(initialExperienceState);
        setWantToAdd(false);
    }

    const handleCancel = () => {
        setExperience(initialExperienceState);
        setWantToAdd(false);
    }

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
                 src={selectedCompany?.logo || ""}
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
                   options={options}
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