"use client";
import { useInternship } from "@/context/internshipContext";
import { location } from "@/utils/Icons";
import { Search } from "lucide-react";
import React from "react";

function SearchForm() {
  const { searchJobs, handleSearchChange, searchQuery } = useInternship();
  return (
    <form
      className="relative flex items-center justify-end mr-4"
      onSubmit={(e) => {
        e.preventDefault();
        searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
      }}
    >
      <div className="flex bg-white rounded-full px-2 items-stretch h-[3.3rem] w-[50rem]">
        <div className="flex flex-row items-center w-[45%]">
          <span>
            <Search
              size={30}
              className="text-primary-hover text-2xl"
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
        <div className="w-[2px] h-11 bg-gray-300 my-auto"></div>
        <div className="flex flex-row items-center w-[55%]">
          <span className="text-primary text-3xl ml-2">
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
            className="bg-primary hover:bg-primary-hover text-white text-xl px-10 rounded-full h-[calc(100%-0.6rem)]"
          >
            Search
          </button>
        </div>





      </div>
    </form>
  );
}

export default SearchForm;
