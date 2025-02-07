"use client";
import Filters from "@/Components/Filters";
import JobCard from "@/Components/JobItem/JobCard";
import SearchForm from "@/Components/SearchForm";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { grip, list, table } from "@/utils/Icons";
import Image from "next/image";
import React from "react";

function page() {
  const { jobs, filters } = useJobsContext();
  const [columns, setColumns] = React.useState(2); 

  const getIcon = ( col : number ) => {
    if (col === 2) return table;
    return list;
  };

  const filetredJobs =
    filters.remote || filters.onSite || filters.hybrid
      ? jobs.filter((job: Job) => {
          if (filters.remote && job.jobType === "Remote")
            return true;
          if (filters.onSite && job.jobType === "On-site")
            return true;
          if (filters.hybrid && job.jobType === "Hybrid")
            return true;

          if (filters.pfa && job.tags.includes("PFA")) return true;
          if (filters.pfe && job.tags.includes("PFE")) return true;
          if (filters.initiation && job.tags.includes("Initiation")) return true;

          if (filters.renumerated && job.renumerated) return true;
        })
      : jobs;

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
              jobs.length > 0 ?
              columns === 2
                ? "grid-cols-2"
                : "grid-cols-1"
              : 'w-full'
            }`}
          >
            {jobs.length > 0 ? (
              filetredJobs.map((job: Job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <div className="mx-24 flex items-center flex-col">
                <img src="notFound.png" alt="Not Found" width={'600rem'} height={'600rem'}/>
                <p className="text-3xl font-bold text-[#ff5a31]">No Jobs Found!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;