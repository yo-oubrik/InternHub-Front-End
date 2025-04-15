"use client";
import { StatCard } from "@/components/Cards/StatCard";
import { StudentFlagsHistory } from "./StudentFlagsHistory";
import { useEffect, useState } from "react";
import { getValidToken } from "@/utils/auth";
import toast from "react-hot-toast";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StudentFlag } from "@/types/types";
import { Trash2, User } from "lucide-react";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [unresolvedFlagsCount, setUnresolvedFlagsCount] = useState(0);
  const [resolvedFlagsCount, setResolvedFlagsCount] = useState(0);
  const [warningsCount, setWarningsCount] = useState(0);
  const [studentFlagsHistory, setStudentFlagsHistory] = useState<StudentFlag[]>(
    []
  );

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
          axios.get(`flagged-students/${id}/ignored/count`, {
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
    async function fetchStudentFlagsHistory() {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch statistics", {
          id: "fetch-statistics",
        });
        return;
      }
      try {
        const { data: studentFlagsHistory } = await axios.get(
          `flagged-students/${id}/flags`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudentFlagsHistory(studentFlagsHistory);
        console.log("Student Flags History:", studentFlagsHistory);
      } catch (error) {
        toast.error("Failed to fetch student flags history", {
          id: "fetch-statistics",
        });
        console.error("Failed to fetch student flags history:", error);
      }
    }
    fetchStudentFlagsHistory();
  }, []);
  return (
    <div>
      <div className="max-w-screen-lg mx-auto flex flex-col gap-10 justify-center mt-10">
        <h1 className="header">Student Flags History</h1>
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
              label="Total Ignored Flags"
              icon={"/admin/resolved.png"}
            />
            <StatCard
              count={warningsCount}
              label="Total Warnings"
              icon={"/admin/warning.png"}
            />
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <Button size={"lg"} className="hover:opacity-85 transition w-fit">
            <Link
              href={`/profile/${id}`}
              target="_blank"
              className="flex gap-2"
            >
              <User /> Student Profile
            </Link>
          </Button>
          <Button
            size={"lg"}
            className="hover:opacity-85 transition w-fit flex gap-2"
          >
            <Trash2 /> Block Student
          </Button>
        </div>
      </div>
      <StudentFlagsHistory data={studentFlagsHistory} />
    </div>
  );
};

export default Page;
