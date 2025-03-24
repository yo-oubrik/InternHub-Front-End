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
import { Company, Internship, InternshipType, Role, SalaryType, User, WorkMode } from "@/types/types";
import { Separator } from "@/components/ui/separator";

function page(){
  const { internships, likeInternship, applyToInternship } = useInternship();
  // const { userProfile , company , getCompany } = useUser();
  // const { isAuthenticated } = useAuth();
  // const params = useParams();
  // const router = useRouter();
  // const { id } = params;

  const [isLiked, setIsLiked] = React.useState(false);
  const [isApplied, setIsApplied] = React.useState(false);

  // const internship = internships.find((internship: Internship) => internship.id === id);
  // const otherJobs = internships.filter((internship: Internship) => internship.id !== id);

  // if (!internship) return null;
  
  const userProfile : User = {id : "1" , email : "achrafbnr2406@gmail.com" , role : Role.STUDENT , joinedAt : new Date("2024-06-24T22:30:00")};
  const company: Company = {
    id: "1",
    role: Role.COMPANY,
    email: "google@gmail.com",
    address: "US",
    description: "Google Company",
    ice: "12345",
    rc: "e1e1",
    domain : "IT" , 
    name : "Google" ,
    logo : "" , 
    createdAt : new Date("2024-06-24T22:30:00"),
    updatedAt : new Date(Date.now()),
    phone : "+313 39 21 21 34 54",
    website : "www.google.com",
    size : "500 000",
    applicationDate: new Date("2024-06-24T22:30:00"),
    joinedAt: new Date("2024-06-24T22:30:00")
  };
  const internship: Internship = {
    id: "1",
    company: company,
    createdAt: new Date("2024-12-25T14:30:00"),
    updatedAt: new Date(Date.now()),
    description: "Hiring new developers , \nNews : New Offer",
    domain: "IT",
    duration: 3,
    location: "US , Los Angeles , Google Company",
    salary: 5000,
    salaryType: SalaryType.MONTH,
    tags: [InternshipType.PFA, InternshipType.PFE],
    title: "Software Engineer",
    renumerated: true,
    workMode: WorkMode.REMOTE,
    negotiable: true,
    skills: [
      "Problem Solving",
      "DevOps",
      "Jenkins",
      "JUnit",
      "FullStack Dev",
      "Reactjs",
      "Spring Boot",
      "GraphQL",
    ],
    likes : ["1","2","3"],
    applicants : ["1","2"]
  };
  const {
    title,
    location,
    description,
    salary,
    applicants,
    workMode,
    createdAt,
    salaryType,
    negotiable,
    likes,
    skills ,
  } = internship;

  console.log("user Profile : " ,userProfile);
  console.log("company : ",company);
  console.log("Internships : ",internship);
  // console.log("other jobs : ",otherJobs);
  
  useEffect(() => {
    userProfile && setIsLiked(likes.includes(userProfile.id));
  }, [likes, userProfile?.id]);

  useEffect(() => {
    userProfile && setIsApplied(applicants.includes(userProfile.id));
  }, [applicants, userProfile?.id]);

  // useEffect(()=> {
  //   getCompany(createdBy);
  // },[createdBy]);

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeInternship(id);
  };

  return (
    <main>
      <div className="px-14 py-8 mb-8 w-[100%] rounded-md flex gap-8">
        <div className="flex-1 bg-white p-6 rounded-md">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 relative overflow-hidden rounded-md flex items-center justify-center bg-gray-200">
                  <Image
                    src={company?.logo || "/user.png"}
                    alt={company?.name || "User"}
                    width={60}  
                    height={60}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <p className="font-bold text-xl">{company?.name}</p>
                  <p className="text-lg">Recruiter</p>
                </div>
              </div>
              <button
                className={`text-2xl  ${
                  isLiked ? "text-primary" : "text-gray-400"
                }`}
                onClick={() => {
                  // isAuthenticated ?
                  // handleLike(internship.id)
                  // : router.push("http://localhost:3000/api/login"); // to check
                }}
              >
                {isLiked ? bookmark : bookmarkEmpty}
              </button>
            </div>
            {/* <Separator/> */}

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">{title}</h1>
              <p className="text-gray-500">{location}</p>
            </div>

            <div className="mt-2 flex gap-4 justify-between items-stretch">
              <p className="flex-1 p-4 text-center flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
                <span className="text-lg">Salary</span>

                <span>
                  <span className="font-bold text-nowrap">
                    {formatMoney(salary)} MAD
                  </span>
                  <span className="font-medium text-gray-500 text-base">
                    /
                    {salaryType
                      ? `${
                          salaryType === SalaryType.YEAR
                            ? "per year"
                            : salaryType === SalaryType.MONTH
                            ? "per month"
                            : "per hour"
                        }`
                      : ""}
                  </span>
                </span>
              </p>

              <p className="flex-1 p-4 text-center flex flex-col items-center justify-center gap-1 bg-purple-500/20 rounded-xl">
                <span className="text-lg">Posted</span>
                <span className="font-bold">{formatDates(createdAt)}</span>{" "}
                {/* to check */}
              </p>

              <p className="flex-1 p-4 flex flex-col items-center justify-center gap-1 bg-blue-500/20 rounded-xl">
                <span className="text-lg">Applicants</span>
                <span className="font-bold ">{applicants.length}</span>
              </p>

              <p className="flex-1 p-4 flex flex-col items-center justify-center gap-1 bg-yellow-500/20 rounded-xl">
                <span className="text-lg">Work Mode</span>
                <span className="font-bold">{workMode}</span>
              </p>
            </div>
            {/* <Separator/> */}
            <h2 className="font-bold text-2xl mt-2">Description</h2>
          </div>

          <div
            className="wysiwyg mt-2 whitespace-pre"
            // dangerouslySetInnerHTML={{ __html: description }}
          >{description}</div>
        </div>

        <div className="w-[26%] flex flex-col gap-8">
          <button
            className={`text-white py-4  hover:bg-primary-hover hover:text-white ${
              isApplied ? "bg-green-500 rounded-full" : "bg-primary rounded-xl hover:rounded-full"
            }`}
            onClick={() => {
              // if (isAuthenticated) {
              if (!isApplied) {
                // applyToInternship(internship.id);
                setIsApplied(true);
              } else {
                toast.error("You have already applied to this internship");
              }
              // } else {
              //   router.push("http://localhost:3000/api/login"); {/* to check */ }
              // }
            }}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>

          <div className="flex flex-col gap-2 rounded-md">
              <InternshipCard activeinternship internship={{ ...internship }} />

              {/* {otherJobs.map((internship) => (
            <InternshipCard internship={internship} key={internship.id} />
          ))} */}
          </div>

          <div className="p-6 flex flex-col gap-2 bg-white shadow-md border-b-2 border-primary rounded-xl">
            <h3 className="text-lg font-semibold">Tags</h3>
            <p>Other relevant tags for the internship position.</p>

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

          <div className="p-6 flex flex-col gap-2 bg-white shadow-md border-b-2 border-primary rounded-xl">
            <h3 className="text-lg font-semibold">Skills</h3>
            <p>
              This is a full-time position. The successful candidate will be
              responsible for the following:
            </p>

            <div className="flex flex-wrap gap-4">
              {skills.map((skill: string, index: number) => (
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
