"use client";
import { StatCard } from "@/components/Cards/StatCard";
import { StudentFlagsHistory } from "./StudentFlagsHistory";
import { useEffect, useState } from "react";
import { getValidToken } from "@/utils/auth";
import toast from "react-hot-toast";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [unresolvedFlagsCount, setUnresolvedFlagsCount] = useState(0);
  const [resolvedFlagsCount, setResolvedFlagsCount] = useState(0);
  const [warningsCount, setWarningsCount] = useState(0);
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
        const [
          { data: countOfUnresolvedFlags },
          { data: countOfResolvedFlags },
          { data: countOfWarnings },
        ] = await Promise.all([
          axios.get(`/flagged-students/${id}/unresolved/count`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`flagged-students/${id}/resolved/count`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`flagged-students/${id}/warnings/count`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setUnresolvedFlagsCount(countOfUnresolvedFlags);
        setResolvedFlagsCount(countOfResolvedFlags);
        setWarningsCount(countOfWarnings);
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
    <div>
      <div className="max-w-screen-lg mx-auto flex flex-col gap-10 justify-center pt-10">
        <h1 className="header">Dashboard</h1>
        <div
          className={"bg-primary-dark/75 p-5 rounded-lg flex flex-col gap-5"}
        >
          <div className="stats">
            <StatCard
              count={unresolvedFlagsCount}
              label="Total Unresolved Flags"
              icon={"/admin/pending.png"}
            />
            <StatCard
              count={resolvedFlagsCount}
              label="Total Resolved Flags"
              icon={"/admin/resolved.png"}
            />
            <StatCard
              count={warningsCount}
              label="Total Warnings"
              icon={"/admin/warning.png"}
            />
          </div>
        </div>
      </div>
      <StudentFlagsHistory data={[]} />
    </div>
  );
};

export default Page;
