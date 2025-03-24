"use client";

import { IgnoreFlagDialog } from "@/components/Dialogs/IgnoreFlagDialog";
import { WarnStudentDialog } from "@/components/Dialogs/WarnStudentDialog";
import { RemoveStudentDialog } from "@/components/Dialogs/RemoveStudentDialog";
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
import { FlaggedStudent, severityMap } from "@/types/types";
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { ColumnDef } from "@tanstack/react-table";
import { Bell, Flag, Info, MoreHorizontal, Trash2, User } from "lucide-react";
import { useState } from "react";
import { StudentFlagDetails } from "./StudentFlagDetails";

const sortSeverityColumn = (rowA: any, rowB: any, columnId: string): number => {
  const severityOrder = { low: 1, medium: 2, high: 3 };
  const severityA = rowA.getValue(columnId) as "low" | "medium" | "high";
  const severityB = rowB.getValue(columnId) as "low" | "medium" | "high";

  return severityOrder[severityA] - severityOrder[severityB];
};

export const flaggedStudentColumns = (): ColumnDef<FlaggedStudent>[] => [
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
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "severity",
    header: ({ column }) => <SortableHeader column={column} label="Severity" />,
    cell: ({ row }) => {
      const severity = row.original.severity;
      return (
        <Badge variant={severityMap[severity] as BadgeProps["variant"]}>
          {severity.toUpperCase()}
        </Badge>
      );
    },
    sortingFn: sortSeverityColumn,
  },
  {
    accessorKey: "flaggedAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Flagged At" />
    ),
    cell: ({ row }) => {
      const date = row.original.flaggedAt;
      const formattedDate = date.toLocaleDateString("en-GB");
      return <div>{formattedDate}</div>;
    },
    sortingFn: sortDateColumn,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const flaggedStudent = row.original;
      const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
      const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
      const [showIgnoreConfirm, setShowIgnoreConfirm] = useState(false);
      const [showNotifyConfirm, setShowNotifyConfirm] = useState(false);
      const handleNotifyStudent = () => {
        alert("Notification sent to student");
        setShowNotifyConfirm(false);
      };

      const handleIgnoreFlag = () => {
        alert("Flag has been ignored");
        setShowIgnoreConfirm(false);
      };

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
                onClick={() => setIsDetailsOpen(true)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Info className="h-4 w-4" />
                Show Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  window.open(`/students/${flaggedStudent.id}`, "_blank");
                }}
              >
                <User /> View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
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
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RemoveStudentDialog
            studentToRemove={{
              firstName: flaggedStudent.firstName,
              lastName: flaggedStudent.lastName,
              id: flaggedStudent.id,
            }}
            isOpen={isRemoveOpen}
            setIsOpen={setIsRemoveOpen}
          />
          <StudentFlagDetails
            isOpen={isDetailsOpen}
            setIsOpen={setIsDetailsOpen}
            flaggedStudent={flaggedStudent}
          />
          <WarnStudentDialog
            isOpen={showNotifyConfirm}
            onOpenChange={setShowNotifyConfirm}
            onConfirm={handleNotifyStudent}
            flaggedStudent={flaggedStudent}
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
