"use client";

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
import { FlaggedStudentOverview } from "@/types/types";
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { ColumnDef } from "@tanstack/react-table";
import { Info, InfoIcon, MoreHorizontal, User } from "lucide-react";
import { useState } from "react";

// const sortSeverityColumn = (rowA: any, rowB: any, columnId: string): number => {
//   const severityOrder = { low: 1, medium: 2, high: 3 };
//   const severityA = rowA.getValue(columnId) as "low" | "medium" | "high";
//   const severityB = rowB.getValue(columnId) as "low" | "medium" | "high";

//   return severityOrder[severityA] - severityOrder[severityB];
// };

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
        console.log("what i got " + rawDate);
        const date = new Date(rawDate);
        return <div>{date.toLocaleDateString("en-GB")}</div>;
      },
      sortingFn: sortDateColumn,
    },
    // {
    //   accessorKey: "reason",
    //   header: "Reason",
    // },
    // {
    //   accessorKey: "severity",
    //   header: ({ column }) => <SortableHeader column={column} label="Severity" />,
    //   cell: ({ row }) => {
    //     const severity = row.original.severity;
    //     return (
    //       <Badge variant={severityMap[severity] as BadgeProps["variant"]}>
    //         {severity.toUpperCase()}
    //       </Badge>
    //     );
    //   },
    //   sortingFn: sortSeverityColumn,
    // },
    // {
    //   accessorKey: "flaggedAt",
    //   header: ({ column }) => (
    //     <SortableHeader column={column} label="Flagged At" />
    //   ),
    //   cell: ({ row }) => {
    //     const date = row.original.flaggedAt;
    //     const formattedDate = date.toLocaleDateString("en-GB");
    //     return <div>{formattedDate}</div>;
    //   },
    //   sortingFn: sortDateColumn,
    // },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const flaggedStudent = row.original;
        // const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
        // const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
        // const [showIgnoreConfirm, setShowIgnoreConfirm] = useState(false);
        // const [showNotifyConfirm, setShowNotifyConfirm] = useState(false);
        // const handleNotifyStudent = () => {
        //   alert("Notification sent to student");
        //   setShowNotifyConfirm(false);
        // };

        // const handleIgnoreFlag = () => {
        //   alert("Flag has been ignored");
        //   setShowIgnoreConfirm(false);
        // };

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
                  onClick={() => {}}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <InfoIcon className="h-4 w-4" />
                  Show Details
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
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem
                  onClick={() => setIsRemoveOpen(true)}
                  className="flex items-center gap-2 cursor-pointer text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove Student
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setShowNotifyConfirm(true);
                  }}
                >
                  <Bell className="h-4 w-4" />
                  Warn Student
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setShowIgnoreConfirm(true);
                  }}
                >
                  <Flag className="h-4 w-4" />
                  Ignore Flag
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <RemoveStudentDialog
              studentToRemove={{ ...row.original, id: row.original.studentId }}
              isOpen={isRemoveOpen}
              setIsOpen={setIsRemoveOpen}
            /> */}
            {/* <StudentFlagDetails
            isOpen={isDetailsOpen}
            setIsOpen={setIsDetailsOpen}
            flaggedStudent={flaggedStudent}
          /> */}
            {/* <WarnStudentDialog
              isOpen={showNotifyConfirm}
              onOpenChange={setShowNotifyConfirm}
              onConfirm={handleNotifyStudent}
              studentFlag={row.original}
            /> */}

            {/* <IgnoreFlagDialog
              isOpen={showIgnoreConfirm}
              onOpenChange={setShowIgnoreConfirm}
              onConfirm={handleIgnoreFlag}
            /> */}
          </>
        );
      },
    },
  ];
