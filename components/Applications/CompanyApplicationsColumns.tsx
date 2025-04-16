import {
  Application,
  getColorsByApplicationStatus,
  Internship,
} from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  CheckCheck,
  Eye,
  MoreHorizontal,
  Pencil,
  SquareArrowOutUpRight,
  SquareCheckBig,
  User,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditModal from "../Profile/EditModal";
import PdfViewer from "../PdfViewer";
import PrepareInterview from "./PrepareInterview";
import { SortableHeader } from "../SortableHeader";
import { sortDateColumn } from "@/utils/dates/sortDateColumn";
import { WarnStudentDialog } from "../Dialogs/WarnStudentDialog";
import { AcceptApplicationDialog } from "./AcceptApplicationDialog";
import { AcceptApplication } from "./AcceptApplicationFunction";

export const CompanyApplicationsColumns: ColumnDef<Application>[] = [
  {
    header: "Full Name",
    cell: ({ row }) =>
      row.original.student.firstName + " " + row.original.student.lastName,
  },
  {
    header: "email",
    cell: ({ row }) => row.original.student.email,
  },
  {
    header: "Internship",
    cell: ({ row }) => row.original.internship.title,
  },
  {
    accessorKey: "applicationDate",
    header: ({ column }) => (
      <SortableHeader column={column} label="Application Date" />
    ),
    cell: ({ row }) => {
      const rawDate = row.original.applicationDate;
      const date = new Date(rawDate);
      return (
        <div>
          {date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
      );
    },
    sortingFn: sortDateColumn,
  },
  {
    header: "Status",
    cell: ({ row }) => (
      <Badge className={getColorsByApplicationStatus(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: Application } }) => {
      const router = useRouter();
      const [withInterview, setWithInterview] = useState<boolean>(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/profile/student/${row.original.student.id}`)
                }
              >
                <User strokeWidth={3} className="mr-2 h-4 w-4" />
                Go to Applicant Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SquareArrowOutUpRight
                  strokeWidth={3}
                  className="mr-2 h-4 w-4"
                  onClick={() =>
                    router.push(`/internships/${row.original.internship.id}`)
                  }
                />
                Go to Internship Page
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye strokeWidth={3} className="mr-2 h-4 w-4" />
                <a
                  href={row.original.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 no-underline"
                >
                  View CV
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye strokeWidth={3} className="mr-2 h-4 w-4" />
                <a
                  href={row.original.motivationLetter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 no-underline"
                >
                  View Motivation Letter
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setWithInterview(true)}>
                <CheckCheck
                  strokeWidth={3}
                  className="mr-2 h-4 w-4 hover-text-green-500"
                />
                Accept
              </DropdownMenuItem>
              <DropdownMenuItem>
                <X strokeWidth={3} className="mr-2 h-4" />
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AcceptApplicationDialog
            isOpen={withInterview}
            setIsOpen={setWithInterview}
            onConfirm={AcceptApplication}
            studentAccepted={row.original.student}
          />
        </>
      );
    },
  },
];
