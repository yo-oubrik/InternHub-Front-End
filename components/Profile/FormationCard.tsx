import React from "react";
import FormationContent from "./FormationContent";

const FormationCard = () => {
  const formations = [
    {
      domain: "Software Engineer",
      startDate: "Jan 2024",
      endDate: "PRESENT",
      company: {
        logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGtcwAc6qRA0w/company-logo_100_100/company-logo_100_100/0/1644231566716/ensa_agadir_logo?e=1747872000&v=beta&t=PA1fUwEusomUhMnrb4S73Pl2zzn2zno2wktXTzueHBc",
        name: "Ecole Nationale des Sciences Appliquees de Agadir",
      },
      diploma : "Cycle Ingenieur"
    },
    {
      domain: "Computer Science Student",
      startDate: "Fev 2023",
      endDate: "Mai 2023",
      company: {
        logo: "https://imgs.search.brave.com/SaJEFkC6CkHpv_F2fJqFC5PB1NSDKGGr8LWLC8FZb88/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9vcmFjbGUt/b3JpZ2luYWwtaWNv/bi0yMDQ4eDI2Ni02/eDJwOWZjby5wbmc",
        name: "Faculte de Sciences et Techniques de Mohammedia",
      },
      diploma : "License ST"
    },
  ];

  return (
    <div className="bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[90%] mx-auto space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-gray-800 font-medium">Education</h2>
      </div>
      <div className="px-4 space-y-4">
        {
            formations.map(( formation , index ) => (
                <FormationContent key={index} {...formation} />
            ))
        }
      </div>
    </div>
  );
};

export default FormationCard;
