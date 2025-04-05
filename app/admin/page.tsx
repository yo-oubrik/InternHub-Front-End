"use client";

import Link from "next/link";

import { StatCard } from "@/components/Cards/StatCard";
import { Button } from "@/components/ui/button";
import { getValidToken } from "@/utils/auth";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const AdminPageClient = () => {
  const [flaggedCompaniesCount, setFlaggedCompaniesCount] = useState(0);
  const [flaggedStudentsCount, setFlaggedStudentsCount] = useState(0);
  useEffect(() => {
    async function fetchStatistics() {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch statistics", {
          id: "fetch-statistics",
        });
        return;
      }
      try {
        const { data: countOfFlaggedCompanies } = await axios.get(
          "/flagged-companies/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFlaggedCompaniesCount(countOfFlaggedCompanies);
        // const [companiesResponse, studentsResponse] = await Promise.all([
        //   axios.get("/flagged-companies/count", {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }),
        //   axios.get("flagged-students/count", {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }),
        // ]);
      } catch (error) {
        toast.error("Failed to fetch statistics", {
          id: "fetch-statistics",
        });
        console.error("Failed to fetch statistics:", error);
      }
    }
    fetchStatistics();
  }, []);

  return (
    <div className="min-h-full-except-header p-8 max-w-screen-lg mx-auto flex flex-col gap-8 justify-center">
      <h1 className="header">Dashboard</h1>
      <div
        className={
          "bg-primary-dark/65 p-5 rounded-lg flex flex-col gap-5 shadow-md"
        }
      >
        <div className="stats">
          <StatCard
            count={flaggedCompaniesCount}
            label="Flagged Companies"
            icon={"/icons/internship_offer.png"}
          />
          <StatCard
            count={0}
            label="Flagged Students"
            icon={"/icons/applications.png"}
          />
        </div>
      </div>
      <div className="flex gap-4 mx-auto">
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/manage-students"}>Manage Students</Link>
        </Button>
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/manage-companies"}>Manage Companies</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminPageClient;
