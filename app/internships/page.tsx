"use client";
import HorizontalFilters from "@/components/HorizontalFilters";
import InternshipItem from "@/components/InternshipItem/InternshipItem";
import { useFilters } from "@/context/FiltersContext";
import { useInternship } from "@/context/internshipContext";
import { Internship, InternshipType, WorkMode } from "@/types/types";
import { list, table } from "@/utils/Icons";
import { motion } from "framer-motion";
import React from "react";

function page() {
  const { internships } = useInternship();
  const { filters } = useFilters();
  const [columns, setColumns] = React.useState(2);

  const getIcon = (col: number) => {
    if (col === 2) return table;
    return list;
  };

  const filetredJobs =
    filters.remote ||
    filters.onSite ||
    filters.hybrid ||
    filters.pfa ||
    filters.pfe ||
    filters.initiation ||
    filters.paid
      ? internships?.filter((internship) => {
          if (filters.remote && internship?.workMode === WorkMode.REMOTE)
            return true;
          if (filters.onSite && internship?.workMode === WorkMode.ON_SITE)
            return true;
          if (filters.hybrid && internship?.workMode === WorkMode.HYBRID)
            return true;

          if (filters.pfa && internship?.tags.includes(InternshipType.PFA))
            return true;
          if (filters.pfe && internship?.tags.includes(InternshipType.PFE))
            return true;
          if (
            filters.initiation &&
            internship?.tags.includes(InternshipType.INITIATION)
          )
            return true;

          if (filters.paid && internship?.paid) return true;
        })
      : internships;

  return (
    <main className="px-14">
      <div className="w-full mb-14">
        {/* Horizontal Filters */}
        <HorizontalFilters />

        {/* <div className="flex justify-end mb-4">
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
        </div> */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full"
        >
          <div
            className={`grid gap-8
            ${
              internships?.length > 0
                ? columns === 2
                  ? "grid-cols-3"
                  : "grid-cols-1"
                : "w-full"
            }`}
          >
            {internships?.length > 0 ? (
              filetredJobs.map((internship: Internship) => (
                <InternshipItem key={internship?.id} internship={internship} />
              ))
            ) : (
              <div className="mx-auto flex items-center flex-col">
                <img
                  src="notFound.png"
                  alt="Not Found"
                  width={"600rem"}
                  height={"600rem"}
                />
                <p className="text-3xl font-bold text-[#ff5a31]">
                  No Internships Found!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default page;
