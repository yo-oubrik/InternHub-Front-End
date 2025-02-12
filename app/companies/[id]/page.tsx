"use client";
import formatMoney from "@/utils/formatMoney";
import { formatDates } from "@/utils/fotmatDates";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";
import { useAuth } from "@/context/authContext";
import InternshipCard from "@/components/JobItem/InternshipCard";
import { useInternship } from "@/context/internshipContext";
import { useUser } from "@/context/userContext";
import { Internship, SalaryType } from "@/types/types";

function page() {
  const { internships, likeInternship, applyToInternship } = useInternship();
  const { userProfile } = useUser();
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [isLiked, setIsLiked] = React.useState(false);
  const [isApplied, setIsApplied] = React.useState(false);

  const internship = internships.find((internship: Internship) => internship.id === id);
  const otherJobs = internships.filter((internship: Internship) => internship.id !== id);

  useEffect(() => {
    if (internship && userProfile?.id) {
      setIsApplied(internship.applicants.includes(userProfile?.id)); // TODO
    }
  }, [internship, userProfile?.id]);

  useEffect(() => {
    if (internship) {
      setIsLiked(internship.likes.includes(userProfile?.id));
    }
  }, [internship, userProfile?.id]);

  if (!internship) return null;

  const {
    title,
    location,
    description,
    salary,
    createdBy,
    applicants,
    workMode,
    createdAt,
    salaryType,
    negotiable,
  } = internship;

  const { name, profilePicture } = createdBy;

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeInternship(id);
  };

  return (
    <main>
      <div className="p-8 mb-8 mx-auto w-[90%] rounded-md flex gap-8">
        <div className="w-[26%] flex flex-col gap-8">
          <InternshipCard activeinternship internship={{ ...internship, _id: internship.id, likes: [""], applicants: [""] }} />

          {otherJobs.map((internship) => (
            <InternshipCard internship={internship} key={internship.id} />
          ))}
        </div>

        <div className="flex-1 bg-white p-6 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 relative overflow-hidden rounded-md flex items-center justify-center bg-gray-200">
                  <Image
                    src={profilePicture || "/user.png"}
                    alt={name || "User"}
                    width={45}
                    height={45}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <p className="font-bold">{name}</p>
                  <p className="text-sm">Recruiter</p>
                </div>
              </div>
              <button
                className={`text-2xl  ${isLiked ? "text-[#7263f3]" : "text-gray-400"
                  }`}
                onClick={() => {
                  isAuthenticated
                    ? handleLike(internship.id)
                    : router.push("http://localhost:3000/api/login"); // to check
                }}
              >
                {isLiked ? bookmark : bookmarkEmpty}
              </button>
            </div>

            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="flex gap-4 items-center">
              <p className="text-gray-500">{location}</p>
            </div>

            <div className="mt-2 flex gap-4 justify-between items-center">
              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
                <span className="text-sm">Salary</span>

                <span>
                  <span className="font-bold">
                    {formatMoney(salary, "GBP")}
                  </span>
                  <span className="font-medium text-gray-500 text-lg">
                    /
                    {salaryType
                      ? `${salaryType === SalaryType.YEAR
                        ? "per year"
                        : salaryType === SalaryType.MONTH
                          ? "per month"
                          : "per hour"
                      }`
                      : ""}
                  </span>
                </span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-purple-500/20 rounded-xl">
                <span className="text-sm">Posted</span>
                <span className="font-bold">{formatDates(createdAt)}</span> {/* to check */}
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-blue-500/20 rounded-xl">
                <span className="text-sm">Applicants</span>
                <span className="font-bold">{applicants.length}</span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-yellow-500/20 rounded-xl">
                <span className="text-sm">Job Type</span>
                <span className="font-bold">{workMode}</span>
              </p>
            </div>

            <h2 className="font-bold text-2xl mt-2">Job Description</h2>
          </div>

          <div
            className="wysiwyg mt-2"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>

        <div className="w-[26%] flex flex-col gap-8">
          <button
            className={`text-white py-4 rounded-full hover:bg-[#7263f3]/90 hover:text-white ${isApplied ? "bg-green-500" : "bg-[#7263f3]"
              }`}
            onClick={() => {
              if (isAuthenticated) {
                if (!isApplied) {
                  applyToInternship(internship.id);
                  setIsApplied(true);
                } else {
                  toast.error("You have already applied to this job");
                }
              } else {
                router.push("http://localhost:3000/api/login"); {/* to check */ }
              }
            }}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>

          <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Other Information</h3>

            <div className="flex flex-col gap-2">
              <p>
                <span className="font-bold">Posted:</span>{" "}
                {formatDates(createdAt)} {/* to check */}
              </p>

              <p>
                <span className="font-bold">Salary negotiable: </span>
                <span
                  className={`${negotiable ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {negotiable ? "Yes" : "No"}
                </span>
              </p>

              <p>
                <span className="font-bold">Location:</span> {location}
              </p>

              <p>
                <span className="font-bold">Job Type:</span> {workMode}
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Tags</h3>
            <p>Other relevant tags for the job position.</p>

            <div className="flex flex-wrap gap-4">
              {internship.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-red-500/20 text-red-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Skills</h3>
            <p>
              This is a full-time position. The successful candidate will be
              responsible for the following:
            </p>

            <div className="flex flex-wrap gap-4">
              {internship.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-indigo-500/20 text-[#7263f3]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

export default page;
