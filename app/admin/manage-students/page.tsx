"use client";
import { useEffect, useState } from "react";
import { StatCard } from "@/components/Cards/StatCard";
import { LineGraph } from "@/components/LineGraph";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

const Page = () => {
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);
  const [studentsByMonth, setStudentsByMonth] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const [{ data: totalStudents }, { data: monthlyData }] =
          await Promise.all([
            axios.get("/students/count"),
            axios.get("/students/count-by-month"),
          ]);
        setTotalStudentsCount(totalStudents || 0);
        setStudentsByMonth(monthlyData || {});
      } catch (error) {
        console.error("Error fetching statistics:", error);
        toast.error("Failed to fetch statistics", {
          id: "fetch-statistics",
        });
      }
    }
    fetchStatistics();
  }, []);

  const months = Object.keys(studentsByMonth);
  const counts = Object.values(studentsByMonth);

  return (
    <div className="min-h-full-except-header max-w-screen-lg mx-auto flex flex-col gap-10 justify-center py-10">
      <h1 className="header">Dashboard</h1>
      <div className={"bg-primary-dark/75 p-5 rounded-lg flex flex-col gap-5"}>
        <div className="stats">
          <StatCard
            count={totalStudentsCount}
            label="Total Students"
            icon={"/admin/students/icons/total_students.png"}
          />
          <StatCard
            count={0}
            label="Flagged Students"
            icon={"/admin/students/icons/flagged_students.png"}
          />
        </div>
      </div>
      <LineGraph
        xAxis={months}
        yAxis={counts}
        chartLabel="Total Students by Month"
      />
      <div className="flex gap-4 mx-auto">
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/students"}>Registered students</Link>
        </Button>
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/flagged-students"}>Flagged Students</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
