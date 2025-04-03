"use client";
import { useCompany } from "@/context/CompaniesContext";
import { companyColumns } from "./companyColumns";
import { DataTable } from "./data-table";

export default function Page() {
  const { companies } = useCompany();
  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-4">Companies List</h3>
      <DataTable columns={companyColumns} data={companies} />
    </div>
  );
}
