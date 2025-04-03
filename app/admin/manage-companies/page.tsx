"use client";
import { StatCard } from "@/components/Cards/StatCard";
import { LineGraph } from "@/components/LineGraph";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [totalCompaniesCount, setTotalCompaniesCount] = useState(0);
  const [totalInternshipsCount, setTotalInternshipsCount] = useState(0);
  const [companiesByMonth, setCompaniesByMonth] = useState<{
    [key: string]: number;
  }>({});
  useEffect(() => {
    async function fetchStatistics() {
      try {
        const [
          { data: totalCompanies },
          { data: monthlyData },
          { data: totalInternships },
        ] = await Promise.all([
          axios.get("/companies/count"),
          axios.get("/companies/count-by-month"),
          axios.get("/internships/count"),
        ]);
        setTotalCompaniesCount(totalCompanies || 0);
        setCompaniesByMonth(monthlyData || {});
        setTotalInternshipsCount(totalInternships || 0);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        toast.error("Failed to fetch statistics", {
          id: "fetch-statistics",
        });
      }
    }
    fetchStatistics();
  }, []);
  const months = Object.keys(companiesByMonth);
  const counts = Object.values(companiesByMonth);
  return (
    <div className="min-h-full-except-header max-w-screen-lg mx-auto flex flex-col gap-10 justify-center py-10">
      <h1 className="header">Companies Dashboard</h1>
      <div className={"bg-primary-dark/75 p-5 rounded-lg flex flex-col gap-5"}>
        <div className="stats">
          <StatCard
            count={totalCompaniesCount}
            label="Total Companies"
            icon={"/admin/companies/icons/companies.png"}
          />
          {/* <StatCard
            count={0}
            label="Pending Companies"
            icon={"/admin/companies/icons/pending.png"}
          /> */}
        </div>
        <div className="stats">
          <StatCard
            count={totalInternshipsCount}
            label="Total Internships"
            icon={"/admin/companies/icons/internships.png"}
          />
          <StatCard
            count={0}
            label="Flagged Companies"
            icon={"/admin/companies/icons/flagged_companies.png"}
          />
        </div>
      </div>
      <LineGraph
        xAxis={months}
        yAxis={counts}
        chartLabel="Total Companies by Month"
      />
      <div className="flex gap-4 mx-auto">
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/companies"}> Registered Companies</Link>
        </Button>
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/companies/pending"}>Pending Companies</Link>
        </Button>
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/companies/flagged"}>Flagged Companies</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
