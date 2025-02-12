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
import { Internship } from "@/types/types";

interface InternshipProps {
  internship: Internship;
  activeinternship?: boolean;
}

function InternshipCard({ internship, activeinternship }: InternshipProps) {
  const { likeInternship } = useInternship();
  const { userProfile, user, getUser } = useUser();
  const { isAuthenticated } = useAuth(); {/* to check */ }
  const [isLiked, setIsLiked] = React.useState(false);

  const {
    title,
    salaryType,
    salary,
    createdBy,
    applicationIDs,
    workMode,
    createdAt,
    likes,
  } = internship;

  useEffect(() => {
    getUser(createdBy);
  }, [createdBy]);

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeInternship(id);
  };

  useEffect(() => {
    setIsLiked(internship.likes.includes(userProfile?.id));
  }, [internship.likes, userProfile?.id]);

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
      className={`p-8 rounded-xl flex flex-col gap-5
    ${activeinternship
          ? "bg-gray-50 shadow-md border-b-2 border-[#7263f3]"
          : "bg-white"
        }`}
    >
      <div className="flex justify-between">
        <div
          className="group flex gap-1 items-center cursor-pointer"
          onClick={() => axios.get(`/internship/${internship.id}`)}
        > { /* to check */}
          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-2">
            <Image
              src={user?.profilePicture || "/user.png"}
              alt={user?.name || "User"}
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="group-hover:underline font-bold">{title}</h4>
            <p className="text-xs">
              {name}: {applicants.length}{" "}
              {applicants.length > 1 ? "Applicants" : "Applicant"}
            </p>
          </div>
        </div>

        <button
          className={`text-2xl ${isLiked ? "text-primary" : "text-gray-400"
            } `}
          onClick={() => {
            isAuthenticated
              ? handleLike(internship.id)
              : axios.get("http://localhost:3000/api/login"); {/* to check */ }
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
          <span className="font-bold">{formatMoney(salary, "GBP")}</span>
          <span className="font-medium text-gray-400 text-lg">
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
