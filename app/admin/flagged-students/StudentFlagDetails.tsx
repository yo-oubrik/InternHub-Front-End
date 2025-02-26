"use client";

import { ImageGallery } from "@/components/ImageGallery";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FlaggedStudent, severityMap } from "@/types/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface StudentFlagDetailsProps {
  flaggedStudent: FlaggedStudent;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const StudentFlagDetails = ({
  flaggedStudent,
  isOpen,
  setIsOpen,
}: StudentFlagDetailsProps) => {
  const severityColor = severityMap[
    flaggedStudent.severity
  ] as BadgeProps["variant"];

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="mb-2">Flagged Student Details</DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                {new Date(flaggedStudent.flaggedAt).toLocaleDateString()}
              </span>
              <Badge variant={severityColor}>
                {flaggedStudent.severity.toUpperCase()}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Flag Reason</h3>
              {flaggedStudent.reason}
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-1">Company</h3>
              <Button variant="link" size="sm" className="text-sm p-0" asChild>
                <Link
                  href={`/companies/${flaggedStudent.companyId}`}
                  target="_blank"
                >
                  {flaggedStudent.company}
                </Link>
              </Button>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-1">
                Internship Details
              </h3>
              <Button variant="link" size="sm" className="p-0 text-sm" asChild>
                <Link
                  href={`/internships/${flaggedStudent.internshipId}`}
                  target="_blank"
                >
                  {flaggedStudent.internshipTitle}
                </Link>
              </Button>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-sm bg-gray-50 p-2 rounded">
                {flaggedStudent.description}
              </p>
            </div>

            <ImageGallery images={flaggedStudent.screenshots} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
