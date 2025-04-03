"use client";
import { useStudents } from "@/context/StudentsContext";
import { DataTable } from "./data-table";
import { studentColumns } from "./studentColumns";

export default function Page() {
  const { students } = useStudents();
  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-4">Students List</h3>
      <DataTable columns={studentColumns} data={students} />
    </div>
  );
}
