"use client";
import Filters from "@/Components/Filters";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
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
    filters.remote || filters.onSite
      ? jobs.filter((job: Job) => {
          if (filters.remote && job.jobType.includes("Remote"))
            return true;
          if (filters.onSite && job.jobType.includes("On-site"))
            return true;

          if (filters.pfa && job.tags.includes("PFA")) return true;
          if (filters.pfe && job.tags.includes("PFE")) return true;
          if (filters.initiation && job.tags.includes("Initiation")) return true;
        })
      : jobs;

  return (
    <main>
      <Header />

      <div className="relative px-10 pt-28 bg-[#D7DEDC] overflow-hidden flex flex-col justify-end">
        <h1 className="py-8 text-black text-center font-bold text-4xl">
          Find Your Next Job Here
        </h1>

        <div className="pb-8 relative z-10">
          <SearchForm />
        </div>
{/* 
        <Image
          src="/woman-on-phone.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path w-[15rem] absolute z-0 top-[0] right-[10rem] h-full object-cover"
        />

        <Image
          src="/team.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path-2 rotate-6 w-[15rem] absolute z-0 top-[0] right-[32rem] h-full object-cover"
        /> */}
      </div>

      <div className="w-[90%] mx-auto mb-14">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-black py-8">Recent Jobs</h2>

          <div className="flex flex-row">
            <button
              onClick={() => setColumns(2)}
              className="flex items-center gap-4 border border-gray-400 px-5 py-2 rounded-l-full font-medium"
            >
              <span className="text-lg">{getIcon(2)}</span>
            </button>
            <button
              onClick={() => setColumns(1)}
              className="flex items-center gap-4 border border-gray-400 px-5 py-2 rounded-r-full font-medium"
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
              : 'w-full h-full'
            }`}
          >
            {jobs.length > 0 ? (
              filetredJobs.map((job: Job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <div className="ml-24 flex items-center flex-col w-[80%] h-[80%]">
                <img src="notFound.png" alt="Not Found" />
                <p className="text-3xl font-bold text-[#ff5a31]">No Jobs Found!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default page;