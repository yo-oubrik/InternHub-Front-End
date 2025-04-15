"use client";
import formatMoney from "@/utils/formatMoney";
import { formatDates } from "@/utils/fotmatDates";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";
import { useAuth } from "@/context/authContext";
import InternshipCard from "@/components/InternshipItem/InternshipCard";
import { useInternship } from "@/context/internshipContext";
import { useUser } from "@/context/userContext";
import {
  Internship,
  Role,
  SalaryType,
  Student,
} from "@/types/types";
import EditModal from "@/components/Profile/EditModal";
import ApplicationProcess from "@/components/internships/ApplicationProcess";

export default function page() {
  const { internships, likeInternship, applyToInternship } = useInternship();
  const { student } = useUser();
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [cv , setCV] = useState<File | null>(null);
  const [motivationLetter , setMotivationLetter] = useState<File | null>(null);

  const currentInternship = internships.find((internship: Internship) => internship.id === id);
  const otherJobs = internships.filter((internship: Internship) => internship.id !== id);

  if (!currentInternship) return null;

  useEffect(() => {
    student && setIsLiked(currentInternship.likes.includes(student.id));
  }, [currentInternship.likes, student?.id]);

  useEffect(() => {
    student && setIsApplied(currentInternship.applicants.map((student: Student) => student.id).includes(student.id));
  }, [currentInternship.applicants, student?.id]);

  
  // useEffect(()=> {
  //   getCompany(createdBy);
  // },[createdBy]);

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeInternship(id);
  };

  const handleConfirm = () => {
    setShowApplication(false);
    applyToInternship(currentInternship.id);
    setIsApplied(true);
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
                    src={currentInternship.company?.profilePicture || "/user.png"}
                    alt={currentInternship.company?.name || "User"}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <p className="font-bold text-xl">{currentInternship.company?.name}</p>
                  <p className="text-lg">Recruiter</p>
                </div>
              </div>
              <button
                className={`text-2xl  ${
                  isLiked ? "text-primary" : "text-gray-400"
                }`}
                onClick={() => {
                  handleLike(currentInternship.id)
                }}
              >
                {isLiked ? bookmark : bookmarkEmpty}
              </button>
            </div>
            {/* <Separator/> */}

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">{currentInternship.title}</h1>
              <p className="text-gray-500">{currentInternship.company?.location?.address}</p>
            </div>

            <div className="mt-2 flex gap-4 justify-between items-stretch">
              <p className="flex-1 p-4 text-center flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
                <span className="text-lg">Salary</span>

                <span>
                  <span className="font-bold text-nowrap">
                    {formatMoney(currentInternship.salary)} MAD
                  </span>
                  <span className="font-medium text-gray-500 text-base">
                    /
                    {currentInternship.salaryType
                      ? `${
                          currentInternship.salaryType === SalaryType.YEAR
                            ? "per year"
                            : currentInternship.salaryType === SalaryType.MONTH
                            ? "per month"
                            : "per hour"
                        }`
                      : ""}
                  </span>
                </span>
              </p>

              <p className="flex-1 p-4 text-center flex flex-col items-center justify-center gap-1 bg-purple-500/20 rounded-xl">
                <span className="text-lg">Posted</span>
                <span className="font-bold">{formatDates(currentInternship.createdAt)}</span>{" "}
                {/* to check */}
              </p>

              <p className="flex-1 p-4 flex flex-col items-center justify-center gap-1 bg-blue-500/20 rounded-xl">
                <span className="text-lg">Applicants</span>
                <span className="font-bold ">{currentInternship.applicants?.length}</span>
              </p>

              <p className="flex-1 p-4 flex flex-col items-center justify-center gap-1 bg-yellow-500/20 rounded-xl">
                <span className="text-lg">Work Mode</span>
                <span className="font-bold">{currentInternship.workMode}</span>
              </p>
            </div>
            {/* <Separator/> */}
            <h2 className="font-bold text-2xl mt-2">Description</h2>
          </div>

          <div
            className="wysiwyg mt-2 whitespace-pre"
            // dangerouslySetInnerHTML={{ __html: description }}
          >
            {currentInternship.description}
          </div>
        </div>

        <div className="w-[26%] flex flex-col gap-8">
          <button
            className={`text-white py-4  hover:bg-primary-hover hover:text-white ${
              isApplied
                ? "bg-green-500 rounded-full"
                : "bg-primary rounded-xl hover:rounded-full"
            }`}
            onClick={() => {
              // if (isAuthenticated) {
              if (!isApplied) {
                // applyToInternship(internship.id);
                setShowApplication(true);
                // setIsApplied(true);
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
            <InternshipCard activeinternship internship={{ ...currentInternship }} />

            {otherJobs.map((internship) => (
            <InternshipCard internship={internship} key={internship.id} />
          ))}
          </div>

          <div className="p-6 flex flex-col gap-2 bg-white shadow-md border-b-2 border-primary rounded-xl">
            <h3 className="text-lg font-semibold">Tags</h3>
            <p>Other relevant tags for the internship position.</p>

            <div className="flex flex-wrap gap-4">
              {currentInternship.tags.map((tag: string, index: number) => (
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
              {currentInternship.skills.map((skill: string, index: number) => (
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
      {
        showApplication &&
        <EditModal
          isOpenModal={showApplication}
          setIsOpenModal={setShowApplication}
          className="bg-white max-w-xl flex flex-col"
          title="Add New Project"
          titleClassName="text-2xl font-medium"
          cancelButton="Cancel"
          cancelButtonClassName="bg-gray-200 text-black hover:bg-gray-300"
          onCancel={() => setShowApplication(false)}
          confirmButton="Add"
          confirmButtonClassName="bg-primary w-20 text-white hover:bg-primary-hover"
          onConfirm={handleConfirm}
          body={
          <ApplicationProcess
            setCV={setCV}
            setMotivationLetter={setMotivationLetter}
          />
          }
        />
      }
    </main>
  );
}