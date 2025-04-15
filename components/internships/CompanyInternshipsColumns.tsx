import { Internship } from "@/types/types"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlertCircle, Eye, Info, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";

export const CompanyInternshipsColumns: ColumnDef<Internship>[] = [
  { accessorKey: 'title', header: 'Title' },
  {
    accessorKey: 'applicants',
    header: 'Applicants',
    cell: ({ row }: { row: { original: Internship } }) => row.original.applicants.length,
  },
  {
    accessorKey: 'createdAt',
    header: 'Posted At',
    cell: ({ row }: { row: { original: Internship } }) =>
      new Date(row.original.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }: { row: { original: Internship } }) =>
      new Date(row.original.updatedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
  },
  {
    id: 'actions',
    cell: ({ row }: { row: { original: Internship } }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Eye strokeWidth={3} className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Pencil strokeWidth={3} className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 hover:!text-red-500 cursor-pointer">
              <Trash  strokeWidth={3} className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];