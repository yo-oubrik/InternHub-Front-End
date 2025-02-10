"use client";
import Filters from "@/Components/Filters";
import InternshipCard from "@/Components/JobItem/InternshipCard";
import SearchForm from "@/Components/SearchForm";
import { useFilters } from "@/context/FiltersContext";
import { useInternship } from "@/context/internshipContext";
import { list, table } from "@/utils/Icons";
import { Internship, InternshipType, WorkMode } from "@prisma/client";
import React from "react";

function page() {
  const { internships } = useInternship();
  const { filters } = useFilters() ;
  const [columns, setColumns] = React.useState(2); 

  const getIcon = ( col : number ) => {
    if (col === 2) return table;
    return list;
  };

  const filetredJobs =
    filters.remote || filters.onSite || filters.hybrid
      ? internships.filter((internship) => {
          if (filters.remote && internship.workMode === WorkMode.REMOTE)
            return true;
          if (filters.onSite && internship.workMode === WorkMode.ON_SITE)
            return true;
          if (filters.hybrid && internship.workMode === WorkMode.HYBRID)
            return true;

          if (filters.pfa && internship.tags.includes(InternshipType.PFA)) return true;
          if (filters.pfe && internship.tags.includes(InternshipType.PFE)) return true;
          if (filters.initiation && internship.tags.includes(InternshipType.INITIATION)) return true;

          if (filters.renumerated && internship.renumerated) return true;
        })
      : internships;

  return (
    <main>
      <div className="w-[90%] mx-auto mb-14">
          <div className="flex items-center justify-end py-10 ml-72">
            <div className="relative px-2 overflow-hidden flex justify-center w-full">
              <SearchForm />
            </div>
            <div className="flex flex-row h-[3.1rem]">
              <button
                onClick={() => setColumns(2)}
                className="flex items-center hover:text-primary-hover gap-4 border border-gray-400 px-5 py-2 rounded-l-full font-medium"
              >
                <span className="text-lg">{getIcon(2)}</span>
              </button>
              <button
                onClick={() => setColumns(1)}
                className="flex items-center hover:text-primary-hover gap-4 border border-gray-400 px-5 py-2 rounded-r-full font-medium"
              >
                <span className="text-lg">{getIcon(1)}</span>
              </button>
            </div>
        </div>

        <div className="flex gap-8">
          <Filters />

          <div
            className={`self-start flex-1 grid gap-8 
            ${
              internships.length > 0 ?
              columns === 2
                ? "grid-cols-2"
                : "grid-cols-1"
              : 'w-full'
            }`}
          >
            {internships.length > 0 ? (
              filetredJobs.map((internship : Internship) => (
                <InternshipCard key={internship.id} internship={{...internship , likes : [""] , applicants : [""] ,  }}  />
              ))
            ) : (
              <div className="mx-24 flex items-center flex-col">
                <img src="notFound.png" alt="Not Found" width={'600rem'} height={'600rem'}/>
                <p className="text-3xl font-bold text-[#ff5a31]">No Internships Found!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;