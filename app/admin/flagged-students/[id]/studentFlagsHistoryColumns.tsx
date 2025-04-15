"use client";

import { IgnoreFlagDialog } from "@/components/Dialogs/IgnoreFlagDialog";
import { WarnStudentDialog } from "@/components/Dialogs/WarnStudentDialog";
import { SortableHeader } from "@/components/SortableHeader";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { reportStatusMap, StudentFlag } from "@/types/types";
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { ColumnDef } from "@tanstack/react-table";
import { Bell, Flag, InfoIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StudentFlagDetails } from "../StudentFlagDetails";

export const studentFlagsHistoryColumns = (): ColumnDef<StudentFlag>[] => [
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => {
      return (
        <Button variant="link" size="sm" className="text-sm p-0" asChild>
          <Link href={`/companies/${row.original.companyId}`} target="_blank">
            {row.original.companyName}
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader column={column} label="Flag Date" />
    ),
    cell: ({ row }) => {
      const rawDate = row.original.date;
      const date = new Date(rawDate);
      return <div>{date.toLocaleDateString("en-GB")}</div>;
    },
    sortingFn: sortDateColumn,
  },
  {
    accessorKey: "reportStatus",
    header: ({ column }) => (
      <SortableHeader column={column} label="Report Status" />
    ),
    cell: ({ row }) => {
      const reportStatus = row.original.reportStatus;
      return (
        <Badge variant={reportStatusMap(reportStatus) as BadgeProps["variant"]}>
          {reportStatus}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const flaggedStudent = row.original;
      const [isDetailsOpen, setIsDetailsOpen] = useState(false);
      const [showIgnoreConfirm, setShowIgnoreConfirm] = useState(false);
      const [showNotifyConfirm, setShowNotifyConfirm] = useState(false);
      const handleWarnStudent = () => {
        alert("Notification sent to student");
        setShowNotifyConfirm(false);
      };

      const handleIgnoreFlag = () => {
        alert("Flag has been ignored");
        setShowIgnoreConfirm(false);
      };

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
                  setIsDetailsOpen(true);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <InfoIcon className="h-4 w-4" />
                Show Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <StudentFlagDetails
            isOpen={isDetailsOpen}
            setIsOpen={setIsDetailsOpen}
            studentFlag={flaggedStudent}
          />
          <WarnStudentDialog
            isOpen={showNotifyConfirm}
            onOpenChange={setShowNotifyConfirm}
            onConfirm={handleWarnStudent}
            studentFlag={row.original}
          />

          <IgnoreFlagDialog
            isOpen={showIgnoreConfirm}
            onOpenChange={setShowIgnoreConfirm}
            onConfirm={handleIgnoreFlag}
          />
        </>
      );
    },
  },
];
