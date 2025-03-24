"use client";

import { AcceptCompanyDialog } from "@/components/Dialogs/AcceptCompanyDialog";
import { DenyCompanyDialog } from "@/components/Dialogs/DenyCompanyDialog";
import { SortableHeader } from "@/components/SortableHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Company } from "@/types/types";
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Info, MoreHorizontal, XCircle } from "lucide-react";
import { useState } from "react";
import { PendingCompanyInfoDialog } from "./PendingCompanyInfoDialog";

export const pendingCompanyColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Company Name" />;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "applicationDate",
    header: ({ column }) => (
      <SortableHeader column={column} label="Application Date" />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = date.toLocaleDateString("en-GB");
      return <div>{formattedDate}</div>;
    },
    sortingFn: sortDateColumn,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original;
      const [isAcceptOpen, setIsAcceptOpen] = useState<boolean>(false);
      const [isDenyOpen, setIsDenyOpen] = useState<boolean>(false);
      const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Manage Company</DropdownMenuLabel>
              {/* Company Details */}
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsInfoOpen(true)}
              >
                <Info /> Company Informations
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsAcceptOpen(true)}
              >
                <CheckCircle className="h-4 w-4" />
                Accept
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-500"
                onClick={() => setIsDenyOpen(true)}
              >
                <XCircle className="h-4 w-4" />
                Deny
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AcceptCompanyDialog
            company={company}
            isOpen={isAcceptOpen}
            onOpenChange={setIsAcceptOpen}
          />

          <DenyCompanyDialog
            company={company}
            isOpen={isDenyOpen}
            onOpenChange={setIsDenyOpen}
          />

          <PendingCompanyInfoDialog
            company={company}
            isOpen={isInfoOpen}
            onOpenChange={setIsInfoOpen}
          />
        </>
      );
    },
  },
];
