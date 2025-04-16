"use client";
import React, { useState } from "react";
import { mockApplications } from "@/components/ApplicationsItem/ApplicationsList";
import { Input } from "@/components/ui/input";
import { CompanyApplicationsColumns } from "@/components/Applications/CompanyApplicationsColumns";
import { DataTable } from "@/components/Applications/application-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  const applications = mockApplications;
  const columns = CompanyApplicationsColumns;
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter applications by status
  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((app) => app.status.toLowerCase() === statusFilter);

  return (
    <div className="py-10">
      <h3 className="header mb-4">Company Applications</h3>

      <div className="flex items-center py-4">
        <Input placeholder="Internship title..." className="max-w-sm" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="ml-4 w-[180px] bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filteredApplications} />
    </div>
  );
};

export default page;
