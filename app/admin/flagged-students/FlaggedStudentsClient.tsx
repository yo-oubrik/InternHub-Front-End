"use client";
import { FlaggedStudentsTable } from "@/app/admin/flagged-students/FlaggedStudentsTable";
import { FlaggedStudent } from "@/types/types";
import { useState } from "react";

interface FlaggedStudentsClientProps {
  flaggedStudents: FlaggedStudent[];
}
export const FlaggedStudentsClient: React.FC<FlaggedStudentsClientProps> = ({
  flaggedStudents,
}) => {
  const [flaggedStudentsList, setFlaggedStudentsList] =
    useState<FlaggedStudent[]>(flaggedStudents);
  const handleResolveFlag = async (studentId: string) => {
    console.log(`Resolving flag for student ${studentId}`);

    setFlaggedStudentsList((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status: "resolved" } : student
      )
    );
  };
  return (
    <FlaggedStudentsTable
      data={flaggedStudentsList}
      onResolve={handleResolveFlag}
    />
  );
};
