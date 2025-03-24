"use client"
import { Pencil, Plus } from "lucide-react";
import React, { useState } from "react";
import PlusButton from "../PlusButton";
import { Experience } from "@/types/types";
import CustomAccordion from "../CustomAccordion";

const ExperienceCard = () => {
  const initialExperiences : Experience[] = [
    {
      poste: "Software Developer",
      startDate: "Jan 2024",
      endDate: "PRESENT",
      company: {
        address: "Agadir",
        logo: "https://imgs.search.brave.com/AtwSiN4R1HWHuQ8ufel7QsF-fatKfuSV000El5av_O0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi01MTJ4NTEy/LXRxYzllbDNyLnBu/Zw",
        name: "Google",
      },
      description:
        "Développement d’une application bureau from scratch pour surveiller le processus de fabrication en temps réel des puces électroniques à travers toutes les étapes. \n Le projet a inclus la conception de l’UI/UX, le web scraping et le traitement de fichiers Excel avec PyQt, Selenium, Openpyxl et Python.",
    },
    {
      poste: "Software Engineer",
      startDate: "Feb 2023",
      endDate: "May 2023",
      company: {
        address: "France",
        logo: "https://imgs.search.brave.com/SaJEFkC6CkHpv_F2fJqFC5PB1NSDKGGr8LWLC8FZb88/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9vcmFjbGUt/b3JpZ2luYWwtaWNv/bi0yMDQ4eDI2Ni02/eDJwOWZjby5wbmc",
        name: "Oracle",
      },
      description:
        "Responsable du développement de toute la partie Front-End et de la conception UI/UX. \n Technologies : AngularJS, Bootstrap CSS.",
    },
  ];

  const [experiences , setExperiences] = useState(initialExperiences);
  const [wantToAdd, setWantToAdd] = useState<boolean>(false);

  return (
    <div className="bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[90%] mx-auto space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-gray-800 font-medium">Experience</h2>
      </div>
      <div className="px-4 space-y-4">
        {experiences.map((experience, index) => (
          <CustomAccordion
            key={index}
            object={experience}
            setWantToAdd={setWantToAdd}
            FLAG="VIEW"
          />
        ))}
        {wantToAdd ? (
          <CustomAccordion
            setWantToAdd={setWantToAdd}
            setter={setExperiences}
            FLAG="NEW"
          />
        ) : (
          <PlusButton onClick={() => setWantToAdd(true)} />
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
