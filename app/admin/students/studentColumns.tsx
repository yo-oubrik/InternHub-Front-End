"use client";

import { EditStudentDialog } from "@/components/Dialogs/EditStudentDialog";
import { RemoveStudentDialog } from "@/components/Dialogs/RemoveStudentDialog";
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
import { Student } from "@/types/types";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pen, PenBox, Trash2, User } from "lucide-react";
import { useState } from "react";

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Last Name" />;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Last Name" />;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "joinedAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Joined At" />
    ),
    cell: ({ row }) => {
      const date = row.original.joinedAt;
      const formattedDate = date.toLocaleDateString("en-GB");
      return <div>{formattedDate}</div>;
    },
    sortingFn: sortDateColumn,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
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
              <DropdownMenuLabel>Manage Flagges</DropdownMenuLabel>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  window.open(`/students/${row.original.id}`, "_blank");
                }}
              >
                <User /> View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setIsRemoveOpen(true)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Remove Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <RemoveStudentDialog
            studentToRemove={student}
            isOpen={isRemoveOpen}
            setIsOpen={setIsRemoveOpen}
          />
        </>
      );
    },
  },
];
