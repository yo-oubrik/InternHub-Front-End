"use client";
import Footer from "@/components/Footer";
import MyJob from "@/components/JobItem/MyJob";
import { useAuth } from "@/context/authContext";
import { useInternship } from "@/context/internshipContext";
import { useUser } from "@/context/userContext";
import axios from "axios";
import { Internship } from "@/types/types";
import React, { useEffect } from "react";

function page() {
  const { userInternships, internships } = useInternship();
  const { userProfile } = useUser();
  const { isAuthenticated, loading } = useAuth(); {/* to check for loading */ }

  const [activeTab, setActiveTab] = React.useState("posts");

  let userId : string = "" // TODO
  // useEffect(() => {
  //   if (!userProfile) {
  //     axios.get("/");
  //   }else{
  //     userId = userProfile.id;
  //   }
  // }, [userProfile]);

  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     axios.get("http://localhost:3000/api/login"); {/* to check */}
  //   }
  // }, [isAuthenticated]);

  const likedJobs = internships.filter((internship: Internship) => {
    return internship.likes.includes(userId);
  });

  if (loading) {
    return null;
  }

  return (
    <div>
      <div className="mt-8 w-[90%] mx-auto flex flex-col">
        <div className="self-center flex items-center gap-6">
          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium
          ${activeTab === "posts"
                ? "border-transparent bg-[#7263F3] text-white"
                : "border-gray-400"
              }`}
            onClick={() => setActiveTab("posts")}
          >
            My Job Posts
          </button>
          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium
          ${activeTab === "likes"
                ? "border-transparent bg-[#7263F3] text-white"
                : "border-gray-400"
              }`}
            onClick={() => setActiveTab("likes")}
          >
            Liked Jobs
          </button>
        </div>

        {activeTab === "posts" && userInternships.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold">No job posts found.</p>
          </div>
        )}

        {activeTab === "likes" && likedJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold">No liked jobs found.</p>
          </div>
        )}

        <div className="my-8 grid grid-cols-2 gap-6">
          {activeTab === "posts" &&
            userInternships.map((internship: Internship) => <MyJob key={internship.id} internship={internship} />)}

          {activeTab === "likes" &&
            likedJobs.map((internship: Internship) => <MyJob key={internship.id} internship={internship} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default page;
