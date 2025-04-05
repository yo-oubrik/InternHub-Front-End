"use client";

import { FlaggedStudentOverview, Student } from "@/types/types";
import { deleteWithAuth, RequestWithAuth } from "@/utils/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface StudentsContextType {
  students: Student[];
  flaggedStudentsOverview: FlaggedStudentOverview[];
  isLoading: boolean;
  removeStudent: (studentId: string) => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined
);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [flaggedStudentsOverview, setFlaggedStudentsOverview] = useState<
    FlaggedStudentOverview[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    const data = await RequestWithAuth("/students");
    setLoading(false);
    if (!data) {
      toast.error("Failed to fetch students", { id: "fetch-students" });
      return;
    }
    setStudents(data);
  };

  const fetchFlaggedStudentsOverview = async () => {
    setLoading(true);
    const data = await RequestWithAuth("/flagged-students/overview");
    setLoading(false);
    if (!data) {
      toast.error("Failed to fetch flagged students", {
        id: "fetch-flagged-students",
      });
      return;
    }
    setFlaggedStudentsOverview(data);
  };

  const removeStudent = async (studentId: string) => {
    setLoading(true);
    const result = await deleteWithAuth("/students/" + studentId);
    setLoading(false);
    if (!result) {
      toast.error("Failed to delete student", { id: "delete-student" });
      return;
    }
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
    toast.success("Student deleted successfully", {
      id: "delete-student",
    });
  };

  // Fetch students on mount
  useEffect(() => {
    fetchStudents();
    fetchFlaggedStudentsOverview();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        students,
        isLoading: loading,
        removeStudent,
        flaggedStudentsOverview,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentsProvider");
  }
  return context;
}
