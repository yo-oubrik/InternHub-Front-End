"use client";
import { Calendar } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import formatMoney from "@/utils/formatMoney";
import { formatDates } from "@/utils/fotmatDates";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";
import { useInternship } from "@/context/internshipContext";
import { useUser } from "@/context/userContext";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Internship, SalaryType, WorkMode } from "@/types/types";

interface InternshipProps {
  internship: Internship;
  activeinternship?: boolean;
}

function InternshipCard({ internship, activeinternship }: InternshipProps) {
  const { likeInternship } = useInternship();
  const { student } = useUser() ; 
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = React.useState(false);

  const {
    title,
    salaryType,
    salary,
    applicants,
    workMode,
    createdAt,
    likes,
    company,
  } = internship;

  
  useEffect(() => {
    student && setIsLiked(likes.includes(student.id));
  }, [likes, student?.id]);
  
  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeInternship(id);
  };
  
  const companyDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.";

  const workModeBg = (type: WorkMode) => {
    switch (type) {
      case WorkMode.REMOTE:
        return "bg-green-500/20 text-green-600";
      case WorkMode.ON_SITE:
        return "bg-purple-500/20 text-purple-600";
      case WorkMode.HYBRID:
        return "bg-blue-500/20 text-blue-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  return (
    <div
      className={`p-6 rounded-xl bg-white flex flex-col gap-5
    ${activeinternship && "shadow-md border-b-2 border-primary"}`}
    >
      <div className="flex justify-between">
        <div
          className="group flex gap-1 items-center cursor-pointer"
          onClick={() => axios.get(`/internship/${internship.id}`)}
        > { /* to check */}
          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-2">
            <Image
              src={ company?.profilePicture || "/user.png"}
              alt={ company?.name || "User"}
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <h4 className="text-base font-bold hover:underline">{title}</h4>
            <p className="text-sm">
              {company?.name} : {applicants.length}{" "}
              {applicants.length > 1 ? "Applicants" : "Applicant"}
            </p>
          </div>
        </div>

        <button
          className={`text-2xl ${isLiked ? "text-primary" : "text-gray-400"
            } `}
          onClick={() => {
            // isAuthenticated ?
              handleLike(internship.id)
              // : axios.get("http://localhost:3000/api/login"); {/* to check */ }
          }}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className={`py-1 px-3 text-xs font-medium rounded-md border ${workModeBg(workMode)}`}>
          {workMode}
        </span>
      </div>

      <p>
        {companyDescription.length > 100
          ? `${companyDescription.substring(0, 100)}...`
          : companyDescription}
      </p>

      <Separator />

      <div className="flex justify-between items-center gap-6">
        <p>
          <span className="font-bold text-nowrap">{formatMoney(salary)} MAD</span>
          <span className="font-medium text-gray-400 text-base">
            /
            {salaryType === SalaryType.YEAR
              ? "per year"
              : salaryType === SalaryType.MONTH
                ? "per month"
                : "per hour"}
          </span>
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-400">
          <span className="text-lg">
            <Calendar size={16} />
          </span>
          Posted: {formatDates(createdAt)} {/* to check */}
        </p>
      </div>
    </div>
  );
}

export default InternshipCard;
