import { Pencil } from "lucide-react";
import React from "react";
import ExperienceContent from "./ExperienceContent";

const ExperienceCard = () => {
  const experiences = [
    {
      poste: "Software Developer",
      address: "Agadir",
      startDate: "Jan 2024",
      endDate: "PRESENT",
      company: {
        logo: "https://imgs.search.brave.com/AtwSiN4R1HWHuQ8ufel7QsF-fatKfuSV000El5av_O0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi01MTJ4NTEy/LXRxYzllbDNyLnBu/Zw",
        name: "Google",
      },
      description:
        "Développement d’une application bureau from scratch pour surveiller le processus de fabrication en temps réel des puces électroniques à travers toutes les étapes. \n Le projet a inclus la conception de l’UI/UX, le web scraping et le traitement de fichiers Excel avec PyQt, Selenium, Openpyxl et Python.",
    },
    {
      poste: "Software Engineer",
      address: "France",
      startDate: "Fev 2023",
      endDate: "Mai 2023",
      company: {
        logo: "https://imgs.search.brave.com/SaJEFkC6CkHpv_F2fJqFC5PB1NSDKGGr8LWLC8FZb88/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9vcmFjbGUt/b3JpZ2luYWwtaWNv/bi0yMDQ4eDI2Ni02/eDJwOWZjby5wbmc",
        name: "Oracle",
      },
      description:
        "Responsable du développement de toute la partie Front-End et de la conception UI/UX. \n Technologies : AngularJS, Bootstrap CSS.",
    },
  ];

  return (
    <div className="bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[90%] mx-auto space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-gray-800 font-medium">Experience</h2>
      </div>
      <div className="px-4 space-y-4">
        {
            experiences.map(( experience , index ) => (
                <ExperienceContent key={index} {...experience} />
            ))
        }
      </div>
    </div>
  );
};

export default ExperienceCard;
