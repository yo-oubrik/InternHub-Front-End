import { CircleDotDashed, Dot, Pencil } from "lucide-react";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface ExperienceContentProps {
    poste : string , 
    address : string , 
    startDate : string , 
    endDate : string , 
    company : { logo : string , name : string } , 
    description : string ,
}

const ExperienceContent = (experience : ExperienceContentProps) => {
 return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-[2px] divide-y-2 rounded-lg py-1 px-4">
        <AccordionTrigger className="[&>svg]:hidden focus:ring-0 focus:outline-none hover:no-underline">
            <div className="w-full flex justify-between">
                <div className="flex gap-4 justify-center items-center">
                    <div className="w-14 h-14">
                        <img src={experience.company.logo} className="object-contain w-full h-full"/>
                    </div>
                    <div className="h-full space-y-1 text-start">
                        <p>{experience.poste}</p>
                        <p className="flex font-normal text-gray-700">
                        {experience.company.name} <Dot width={17}/> {experience.address}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    {experience.startDate} - {experience.endDate}
                    <div>
                        <Pencil className="text-primary h-6 w-6 hover:text-primary-hover cursor-pointer" />
                    </div>
                </div>
            </div>       
        </AccordionTrigger>
        <AccordionContent className="p-4 text-base whitespace-pre-line">
            {experience.description}     
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExperienceContent;
