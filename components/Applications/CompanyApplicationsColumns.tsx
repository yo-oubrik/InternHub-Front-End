import { Application, Internship } from "@/types/types"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CheckCheck, Eye, MoreHorizontal, Pencil, SquareArrowOutUpRight, SquareCheckBig, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditModal from "../Profile/EditModal";
import PdfViewer from "../PdfViewer";
import PrepareInterview from "./PrepareInterview";

export const CompanyApplicationsColumns: ColumnDef<Application>[] = [
  {
    accessorKey: 'student',
    header: 'Applicants',
    cell: ({ row }: { row: { original: Application } }) => row.original.student.firstName + " " + row.original.student.lastName,
  },
{
    accessorKey: 'internship',
    header: 'Internship',
    cell: ({ row }: { row: { original: Application } }) => row.original.internship.title,
  },
  {
    accessorKey: 'ApplicationDate',
    header: 'Application Date',
    cell: ({ row }: { row: { original:  Application} }) =>
      new Date(row.original.applicationDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: { original:  Application} }) => 
            <Badge className={row.original.status === 'ACCEPTED' ? 'bg-green-500 hover:bg-green-600' : row.original.status === 'REJECTED' ? 'bg-red-500 hover:bg-red-600' : row.original.status === 'INTERVIEW' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'}>
              {row.original.status === 'ACCEPTED' ? 'Accepted' : row.original.status === 'REJECTED' ? 'Rejected' : row.original.status === 'INTERVIEW' ? 'interview' : 'Pending'}
            </Badge>
  },
  {
    accessorKey: 'InterviewDate',
    header: 'Interview Date',
    cell: ({ row }: { row: { original:  Application} }) =>
      row.original.interviewDate ? new Date(row.original.interviewDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }) : 'Not scheduled',
  },
  {
    id: 'actions',
    cell: ({ row }: { row: { original: Application } }) => {
      const router = useRouter();
      const [withInterview , setWithInterview] = useState<boolean>(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild >
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer hover:border-l-2 hover:border-l-primary hover:bg-gradient-to-r hover:from-orange-100/60 hover:to-orange-100/20" onClick={() => router.push(`/student/${row.original.student.id}`)}>
                <User strokeWidth={3} className="mr-2 h-4 w-4" />
                Go to Applicant Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:border-l-2 hover:border-l-primary hover:bg-gradient-to-r hover:from-orange-100/60 hover:to-orange-100/20">
                <SquareArrowOutUpRight strokeWidth={3} className="mr-2 h-4 w-4" onClick={() => router.push(`/internships/${row.original.internship.id}`)} />
                Go to Internship Page
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:border-l-2 hover:border-l-blue-500 hover:bg-gradient-to-r hover:from-blue-100/60 hover:to-blue-100/30"
              >
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
              <DropdownMenuItem
                className="cursor-pointer hover:border-l-2 hover:border-l-blue-500 hover:bg-gradient-to-r hover:from-blue-100/60 hover:to-blue-100/30"
              >
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
              <DropdownMenuItem className="cursor-pointer hover:border-l-2 hover:border-l-green-500 hover:bg-gradient-to-r hover:from-green-100/60 hover:to-green-100/20">
                <SquareCheckBig strokeWidth={3} className="mr-2 h-4 w-4"/>
                Accept Definitly
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:border-l-2 hover:border-l-green-500 hover:bg-gradient-to-r hover:from-green-100/60 hover:to-green-100/20" onClick={() => setWithInterview(true)}>
                <CheckCheck strokeWidth={3} className="mr-2 h-4 w-4 hover-text-green-500" />
                Accept With Interview
              </DropdownMenuItem>            
              <DropdownMenuItem className="cursor-pointer hover:border-l-2 hover:border-l-red-500 hover:bg-gradient-to-r hover:from-red-100/80 hover:to-red-100/50">
                <X strokeWidth={3} className="mr-2 h-4" />
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditModal
            title="Schedule Interview"
            description="Please fill in the details for the interview."
            isOpenModal={withInterview}
            setIsOpenModal={setWithInterview}
            className="min-w-[600px] min-h-[70vh] flex flex-col"
            onConfirm={() => {}}
            onCancel={() => setWithInterview(false)}
            confirmButton="Schedule"
            cancelButton="Cancel"
            cancelButtonClassName="border border-primary text-primary bg-transparent hover:text-primary-hover"
            body={
              <PrepareInterview interviewDate="" setInterviewDate={() => {}} interviewDescription="" setInterviewDescription={() => {}} />
            }
          />
        </>
      );
    },
  },
];