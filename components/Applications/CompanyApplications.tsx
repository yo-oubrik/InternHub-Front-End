"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { CompanyApplicationsColumns } from "@/components/Applications/CompanyApplicationsColumns";
import { useInternship } from "@/context/internshipContext";
import { useUser } from "@/context/userContext";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/Applications/application-table";
import { ColumnFiltersState } from "@tanstack/react-table";

interface CompanyApplicationsProps {
  internshipTitle?: string;
}

const CompanyApplications = ({ internshipTitle }: CompanyApplicationsProps) => {
  const { applications } = useInternship();
  const columns = CompanyApplicationsColumns;

  return (
    <div className="py-10 px-14">
      <h3 className="header mb-4">Manage Applications</h3>

      <DataTable
        columns={columns}
        data={applications}
        defaultInternship={internshipTitle}
      />
    </div>
  );
};

export default CompanyApplications;
