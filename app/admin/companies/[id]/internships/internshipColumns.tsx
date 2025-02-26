"use client";

import { EditInternshipDialog } from "@/components/Dialogs/EditInternshipDialog";
import { RemoveInternshipDialog } from "@/components/Dialogs/RemoveInternshipDialog";
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
import { Internship } from "@/types/types";
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PenBox, Trash2, Briefcase } from "lucide-react";
import { useState } from "react";

export const internshipColumns: ColumnDef<Internship>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Title" />;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "company",
    header: "Company",
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
      const internship = row.original;
      const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
      const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);

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
              <DropdownMenuLabel>Manage Internship</DropdownMenuLabel>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  window.open(`/internships/${row.original.id}`, "_blank");
                }}
              >
                <Briefcase /> View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                <PenBox /> Edit Internship Info
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsRemoveOpen(true)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Remove Internship
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditInternshipDialog
            internship={internship}
            isOpen={isEditOpen}
            onOpenChange={setIsEditOpen}
          />

          <RemoveInternshipDialog
            internshipToRemove={internship}
            isOpen={isRemoveOpen}
            onOpenChange={setIsRemoveOpen}
          />
        </>
      );
    },
  },
];
