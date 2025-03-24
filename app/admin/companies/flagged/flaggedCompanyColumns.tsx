"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Info, AlertCircle } from "lucide-react";
import { useState } from "react";
import { CompanyFlagDetails } from "./CompanyFlagDetails";

type FlaggedCompany = {
  id: string;
  name: string;
  email: string;
  reason: string;
  severity: "high" | "medium" | "low";
  flaggedAt: Date;
  screenshots: string[];
};

const severityMap = {
  high: "destructive",
  medium: "warning",
  low: "secondary",
} as const;

export const flaggedCompanyColumns: ColumnDef<FlaggedCompany>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as keyof typeof severityMap;
      return (
        <Badge variant={severityMap[severity]}>
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "flaggedAt",
    header: "Flagged At",
    cell: ({ row }) => {
      return new Date(row.getValue("flaggedAt")).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original;
      const [isDetailsOpen, setIsDetailsOpen] = useState(false);
      const [showNotifyConfirm, setShowNotifyConfirm] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsDetailsOpen(true)}>
                <Info className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowNotifyConfirm(true)}>
                <AlertCircle className="mr-2 h-4 w-4" />
                Send Warning
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CompanyFlagDetails
            company={company}
            isOpen={isDetailsOpen}
            setIsOpen={setIsDetailsOpen}
          />
        </>
      );
    },
  },
];
