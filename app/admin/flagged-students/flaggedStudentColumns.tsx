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
import { FlaggedStudentOverview } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { InfoIcon, MoreHorizontal, User } from "lucide-react";
import { useRouter } from "next/navigation";

export const flaggedStudentColumns =
  (): ColumnDef<FlaggedStudentOverview>[] => [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <SortableHeader column={column} label="First Name" />
      ),
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <SortableHeader column={column} label="Last Name" />
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "unresolvedFlagsCount",
      header: ({ column }) => (
        <SortableHeader column={column} label="Unresolved Flags Count" />
      ),
      cell: ({ row }) => {
        const unresolvedFlagsCount = row.original.unresolvedFlagsCount;
        return <div className="ml-20">{unresolvedFlagsCount}</div>;
      },
    },
    {
      accessorKey: "lastFlaggedAt",
      header: ({ column }) => (
        <SortableHeader column={column} label="Last Flag Date" />
      ),
      cell: ({ row }) => {
        const rawDate = row.original.lastFlagDate;
        const date = new Date(rawDate);
        return <div>{date.toLocaleDateString("en-GB")}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const flaggedStudent = row.original;

        const router = useRouter();
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-primary data-[state=open]:bg-gray-100 data-[state=open]:text-primary transition-colors rounded-full"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="flex items-center gap-2">
                  Manage Flags
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(
                      `/admin/flagged-students/${flaggedStudent.studentId}`
                    );
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <InfoIcon className="h-4 w-4" />
                  Flags History
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    window.open(
                      `/students/${flaggedStudent.studentId}`,
                      "_blank"
                    );
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
