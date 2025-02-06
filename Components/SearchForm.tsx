"use client";
import { useJobsContext } from "@/context/jobsContext";
import { location } from "@/utils/Icons";
import { Search } from "lucide-react";
import React from "react";

function SearchForm() {
  const { searchJobs, handleSearchChange, searchQuery } = useJobsContext();
  return (
    <form
      className="relative flex items-center justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
      }}
    >
      <div className="flex bg-white rounded-full px-2 items-stretch w-[60%]">
        <div className="flex flex-row items-center w-[45%]">
          <span>
            <Search
              size={30}
              className="text-gray-400 text-2xl"
            />
          </span>
          <input
            type="text"
            id="job-title"
            name="title"
            value={searchQuery.title}
            onChange={(e) => handleSearchChange("title", e.target.value)}
            placeholder="Job Title or Keywords"
            className="w-full py-4 text-xl text-black pl-[0.7rem] pr-3 rounded-tl-full rounded-bl-full focus:outline-none"
          />
        </div>
        <div className="w-[2px] h-11 bg-gray-300 mr-2 mt-2"></div>
        <div className="flex flex-row items-center w-[55%]">
          <span className="text-gray-400 text-3xl ml-2">
            {location}
          </span>
          <input
            type="text"
            id="location"
            name="location"
            value={searchQuery.location}
            onChange={(e) => handleSearchChange("location", e.target.value)}
            placeholder="Enter Location"
            className="w-full py-4 text-xl text-black pl-[1rem] pr-3 rounded-tr-full rounded-br-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#7263F3] hover:bg-[#7263F3]/90 text-white text-xl px-10 rounded-3xl h-[calc(100%-0.7rem)]"
          >
            Search
          </button>
        </div>





      </div>
    </form>
  );
}

export default SearchForm;
