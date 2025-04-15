"use client";

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
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, User } from "lucide-react";
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Joined At" />
    ),
    cell: ({ row }) => {
      const rawDate = row.original.createdAt;
      const date = new Date(rawDate);
      return <div>{date.toLocaleDateString("en-CA")}</div>;
    },
    sortingFn: sortDateColumn,
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
                  window.open(`/student/${row.original.id}`, "_blank");
                }}
              >
                <User /> View Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
