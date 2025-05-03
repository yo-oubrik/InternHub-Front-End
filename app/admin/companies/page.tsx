"use client";
import { useCompanies } from "@/context/CompaniesContext";
import { companyColumns } from "./companyColumns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Company } from "@/types/types";

export default function Page() {
  const { getCompanies } = useCompanies();
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [getCompanies]);

  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-4">Companies List</h3>
      <DataTable columns={companyColumns} data={companies} />
    </div>
  );
}
