"use client";

import { SortableHeader } from "@/components/SortableHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Student } from "@/types/types";
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { ColumnDef } from "@tanstack/react-table";
import {
  InfoIcon,
  MoreHorizontal,
  User,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <SortableHeader column={column} label="First Name" />;
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
    accessorKey: "blocked",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: ({ row }) => {
      const blocked = row.original.blocked;
      return (
        <div className="flex items-center">
          {blocked ? (
            <div className="flex items-center gap-2 text-red-500">
              <ShieldAlert className="h-4 w-4" />
              <span>Blocked</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-500">
              <ShieldCheck className="h-4 w-4" />
              <span>Active</span>
            </div>
          )}
        </div>
      );
    },
    sortingFn: "basic",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
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
                  window.open(`/profile/student/${row.original.id}`, "_blank");
                }}
              >
                <User /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/admin/flagged-students/${row.original.id}`);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <InfoIcon className="h-4 w-4" />
                Flags History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
