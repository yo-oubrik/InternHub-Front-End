"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Clock,
  Router,
  UserPlus,
  XCircle,
} from "lucide-react";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";

interface CompanyProfileStatsProps {
  applicants: number;
  pendingApplicants: number;
  acceptedApplicants: number;
  rejectedApplicants: number;
}

const CompanyProfileStats = ({
  applicants,
  pendingApplicants,
  acceptedApplicants,
  rejectedApplicants,
}: CompanyProfileStatsProps) => {
  const router = useRouter();
  const { company } = useUser();

  return (
    <div className="grid grid-cols-2 items-center gap-2 bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[75%] mx-auto">
      <div className="w-full bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <UserPlus className="w-6 h-6 text-blue-500" />
          <div className="relative">
            <h3 className="text-lg font-medium">Total Applicants</h3>
          </div>
        </div>
        <div className="text-3xl overflow-hidden font-bold text-blue-500">
          {applicants}
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Clock className="w-6 h-6 text-yellow-500" />
          <div className="relative">
            <h3 className="text-lg font-medium">Pending Applications</h3>
          </div>
        </div>
        <div className="text-3xl overflow-hidden font-bold text-yellow-500">
          {pendingApplicants}
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div className="relative">
            <h3 className="text-lg font-medium">Accepted Applicants</h3>
          </div>
        </div>
        <div className="text-3xl overflow-hidden font-bold text-green-500">
          {acceptedApplicants}
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <XCircle className="w-6 h-6 text-red-500" />
          <div className="relative">
            <h3 className="text-lg font-medium">Rejected Applications</h3>
          </div>
        </div>
        <div className="text-3xl overflow-hidden font-bold text-red-500">
          {rejectedApplicants}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center mt-4">
        <Button
          variant="outline"
          className="text-primary hover:bg-primary hover:text-white group"
          onClick={() =>
            router.push(`/company/${company.id}/applications/filter`)
          }
        >
          <span>Manage Applications</span>
          <ArrowRightIcon className="w-6 h-6 text-primary group-hover:text-white" />
        </Button>
      </div>
    </div>
  );
};

export default CompanyProfileStats;
