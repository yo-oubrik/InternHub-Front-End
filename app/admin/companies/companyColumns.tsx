"use client";

import { EditCompanyDialog } from "@/components/Dialogs/EditCompanyDialog";
import { RemoveCompanyDialog } from "@/components/Dialogs/RemoveCompanyDialog";
import { CompanyInformationDialog } from "@/components/Dialogs/CompanyInformationDialog";
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
import {
  MoreHorizontal,
  PenBox,
  Trash2,
  Building,
  Info,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

export const companyColumns: ColumnDef<Company>[] = [
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Created At" />
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
      const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
      const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
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
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  window.open(`/companies/${row.original.id}`, "_blank");
                }}
              >
                <Building /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsInfoOpen(true)}
              >
                <Info /> Company Informations
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  window.open(
                    `/admin/companies/${row.original.id}/internships`,
                    "_blank"
                  )
                }
              >
                <Briefcase />
                Company Internships
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsEditOpen(true)}
                className="cursor-pointer"
              >
                <PenBox /> Edit Company Info
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsRemoveOpen(true)}
                className="text-red-600 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Remove Company
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditCompanyDialog
            company={company}
            isOpen={isEditOpen}
            onOpenChange={setIsEditOpen}
          />

          <RemoveCompanyDialog
            companyToRemove={company}
            isOpen={isRemoveOpen}
            onOpenChange={setIsRemoveOpen}
          />

          <CompanyInformationDialog
            company={company}
            isOpen={isInfoOpen}
            onOpenChange={setIsInfoOpen}
          />
        </>
      );
    },
  },
];
