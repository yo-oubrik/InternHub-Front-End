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
import { FlaggedCompanyOverview } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { InfoIcon, MoreHorizontal, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const flaggedCompanyColumns =
  (): ColumnDef<FlaggedCompanyOverview>[] => {
    const router = useRouter();

    return [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <SortableHeader column={column} label="Company Name" />
        ),
        sortingFn: "alphanumeric",
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
        accessorKey: "lastFlagDate",
        header: ({ column }) => (
          <SortableHeader column={column} label="Last Flag Date" />
        ),
        cell: ({ row }) => {
          const date = new Date(row.original.lastFlagDate);
          return <div>{date.toLocaleDateString("en-GB")}</div>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const flaggedCompany = row.original;

          return (
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
                      `/admin/flagged-companies/${flaggedCompany.companyId}`
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
                      `/company/${flaggedCompany.companyId}`,
                      "_blank"
                    );
                  }}
                >
                  <Building2 className="h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  };
