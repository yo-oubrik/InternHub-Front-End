"use client";

import { FlaggedStudentOverview, Student, StudentFlag } from "@/types/types";
import {
  deleteWithAuth,
  RequestWithAuth,
  getValidToken,
  putWithAuth,
} from "@/utils/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

interface StudentsContextType {
  students: Student[];
  removeStudent: (studentId: string) => void;
  fetchStudent: (studentId: string) => Promise<Student | null>;
  fetchStudentFlagsHistory: (studentId: string) => Promise<StudentFlag[]>;
  resolveFlag: (flagId: string) => Promise<boolean>;
  warnStudent: (
    flagId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => Promise<boolean>;
  blockStudent: (
    studentId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => Promise<boolean>;
  unblockStudent: (
    studentId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => Promise<boolean>;
  fetchUnresolvedFlagsCount: (studentId: string) => Promise<number>;
  fetchResolvedFlagsCount: (studentId: string) => Promise<number>;
  fetchWarningsCount: (studentId: string) => Promise<number>;
  fetchFlaggedStudentsOverview: () => Promise<FlaggedStudentOverview[]>;
}

const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined
);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
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

  const fetchStudent = async (studentId: string): Promise<Student | null> => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch student details");
        return null;
      }
      const { data } = await axios.get(`/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch student details:", error);
      return null;
    }
  };

  const fetchFlaggedStudentsOverview = async () => {
    setLoading(true);
    const data = await RequestWithAuth("/flagged-students/overview");
    console.log("Flagged students overview data:", data);
    setLoading(false);
    if (!data) {
      toast.error("Failed to fetch flagged students", {
        id: "fetch-flagged-students",
      });
      return [];
    }
    return data;
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

  const fetchUnresolvedFlagsCount = async (
    studentId: string
  ): Promise<number> => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch unresolved flags count", {
          id: "fetch-unresolved-flags-count",
        });
        return 0;
      }
      const { data: count } = await axios.get(
        `/flagged-students/${studentId}/unresolved/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return count;
    } catch (error) {
      console.error("Failed to fetch unresolved flags count:", error);
      return 0;
    }
  };

  const fetchResolvedFlagsCount = async (
    studentId: string
  ): Promise<number> => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch resolved flags count", {
          id: "fetch-resolved-flags-count",
        });
        return 0;
      }
      const { data: count } = await axios.get(
        `/flagged-students/${studentId}/resolved/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return count;
    } catch (error) {
      console.error("Failed to fetch resolved flags count:", error);
      return 0;
    }
  };

  const fetchWarningsCount = async (studentId: string): Promise<number> => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch warnings count", {
          id: "fetch-warnings-count",
        });
        return 0;
      }
      const { data: count } = await axios.get(
        `/flagged-students/${studentId}/warnings/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return count;
    } catch (error) {
      console.error("Failed to fetch warnings count:", error);
      return 0;
    }
  };

  const fetchStudentFlagsHistory = async (studentId: string) => {
    setLoading(true);
    const token = getValidToken();
    if (!token) {
      toast.error("Failed to fetch student flags history", {
        id: "fetch-flags-history",
      });
      setLoading(false);
      return [];
    }

    try {
      const { data: flagsHistory } = await axios.get(
        `/flagged-students/${studentId}/flags`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return flagsHistory;
    } catch (error) {
      toast.error("Failed to fetch student flags history", {
        id: "fetch-flags-history",
      });
      console.error("Failed to fetch student flags history:", error);
    } finally {
      setLoading(false);
    }
  };

  const resolveFlag = async (flagId: string) => {
    setLoading(true);
    const result = await putWithAuth(
      `/flagged-students/${flagId}/resolve`,
      null,
      "Error resolving flag",
      "Flag resolved successfully"
    );
    setLoading(false);

    if (result) {
      return true;
    }

    return false;
  };

  const warnStudent = async (
    flagId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => {
    setLoading(true);
    const token = getValidToken();
    if (!token) {
      toast.error("Failed to warn student", { id: "warn-student" });
      setLoading(false);
      return false;
    }

    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("subject", subject);
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await axios.post(`/flagged-students/${flagId}/warn`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Warning sent successfully");
      return true;
    } catch (error) {
      console.error("Failed to warn student:", error);
      toast.error("Failed to warn student");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const blockStudent = async (
    studentId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => {
    setLoading(true);
    const token = getValidToken();
    if (!token) {
      toast.error("Failed to block student", { id: "block-student" });
      setLoading(false);
      return false;
    }

    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("subject", subject);
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await axios.post(`/students/${studentId}/block`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Student blocked successfully");
      return true;
    } catch (error) {
      console.error("Failed to block student:", error);
      toast.error("Failed to block student");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unblockStudent = async (
    studentId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => {
    setLoading(true);
    const token = getValidToken();
    if (!token) {
      toast.error("Failed to unblock student", { id: "unblock-student" });
      setLoading(false);
      return false;
    }

    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("subject", subject);
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await axios.post(`/students/${studentId}/unblock`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Student unblocked successfully");
      return true;
    } catch (error) {
      console.error("Failed to unblock student:", error);
      toast.error("Failed to unblock student");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        fetchFlaggedStudentsOverview,
        students,
        removeStudent,
        fetchStudent,
        fetchUnresolvedFlagsCount,
        fetchResolvedFlagsCount,
        fetchWarningsCount,
        fetchStudentFlagsHistory,
        resolveFlag,
        warnStudent,
        blockStudent,
        unblockStudent,
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
