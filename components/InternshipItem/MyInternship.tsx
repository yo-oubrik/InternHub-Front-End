"use client";
import React, { useEffect, useState } from "react";
import { formatDates } from "@/utils/fotmatDates";
import {
  Pencil,
  Trash,
  Building2,
  MapPin,
  Calendar,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Internship, SalaryType } from "@/types/types";
import formatMoney from "@/utils/formatMoney";
import { cleanAndTruncateHTML } from "@/utils/Formating";
import { Button } from "../ui/button";
import EditModal from "../Profile/EditModal";
import { useInternship } from "@/context/internshipContext";

interface InternshipProps {
  internship: Internship;
}

function Myinternship({ internship }: InternshipProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { countInternshipApplications } = useInternship();
  const [countApplicants, setCountApplications] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await countInternshipApplications(internship.id);
      setCountApplications(count);
    };
    fetchCount();
  }, [internship.id, countInternshipApplications]);

  const handleConfirm = () => {
    // Handle confirmation logic here
    setIsOpen(false);
  };

  // const { isAuthenticated } = useAuth();

  return (
    <div className="p-8 bg-white rounded-xl flex flex-col gap-5">
      <div className="flex justify-between items-start">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => router.push(`/internship/${internship.id}`)}
        >
          <CardTitle className="text-xl font-bold truncate mb-2">
            {internship.title}
          </CardTitle>
        </div>

        <div className="flex gap-2">
          {!internship.isEnded ? (
            <div
              className="flex items-center rounded-md font-medium hover:bg-accent px-3 cursor-pointer gap-1 text-sm text-blue-400"
              onClick={() => setIsOpen(true)}
            >
              Close Application
            </div>
          ) : (
            <div className="flex items-center rounded-md font-medium px-3 gap-1 text-sm text-gray-400">
              Closed
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-500"
          >
            <Trash size={14} />
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        {cleanAndTruncateHTML(internship.description)}
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-blue-50">
          {internship.workMode}
        </Badge>
        {internship.paid && (
          <Badge variant="outline" className="bg-green-50">
            {formatMoney(internship.salary || 0)} /{" "}
            {internship.salaryType.toLowerCase()}
            {internship.negotiable && " (Negotiable)"}
          </Badge>
        )}
      </div>

      <div className="space-x-2">
        {internship.tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="bg-orange-50">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          Posted {formatDates(internship.createdAt)}
        </span>

        <span>{countApplicants} applicant(s)</span>
      </div>

      {isOpen && (
        <EditModal
          isOpenModal={isOpen}
          setIsOpenModal={setIsOpen}
          className="bg-white max-w-xl flex flex-col"
          title="Close Application"
          titleClassName="text-2xl font-medium"
          description="Are you sure you want to close this application? This action cannot be undone."
          descriptionClassName="text-sm text-muted-foreground mb-4"
          cancelButton="Cancel"
          cancelButtonClassName="bg-white text-primary border border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onCancel={() => setIsOpen(false)}
          confirmButton="Close Anyway"
          confirmButtonClassName="bg-primary text-white hover:bg-primary-hover"
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default Myinternship;
