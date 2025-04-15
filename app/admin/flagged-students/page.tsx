"use client";
import { FlaggedStudentsTable } from "./FlaggedStudentsTable";
import { useStudents } from "@/context/StudentsContext";

const Page = () => {
  const { flaggedStudentsOverview } = useStudents();
  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-5">Flagged Students Overview</h3>
      <p className="mb-3 text-gray-950">
        Manage students who have been flagged for behavioral concerns.
      </p>
      <FlaggedStudentsTable data={flaggedStudentsOverview} />
    </div>
  );
};

export default Page;
