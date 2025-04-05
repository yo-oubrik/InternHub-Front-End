"use client";

import { ImageGallery } from "@/components/ImageGallery";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { reportStatusMap, StudentFlag } from "@/types/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface StudentFlagDetailsProps {
  studentFlag: StudentFlag;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const StudentFlagDetails = ({
  studentFlag,
  isOpen,
  setIsOpen,
}: StudentFlagDetailsProps) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="mb-2">Flagged Student Details</DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                {new Date(studentFlag.date).toLocaleDateString()}
              </span>
              <Badge
                variant={
                  reportStatusMap(
                    studentFlag.reportStatus
                  ) as BadgeProps["variant"]
                }
              >
                {studentFlag.reportStatus}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Flag Reason</h3>
              {studentFlag.reason}
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-1">Company</h3>
              <Button variant="link" size="sm" className="text-sm p-0" asChild>
                <Link
                  href={`/companies/${studentFlag.companyId}`}
                  target="_blank"
                >
                  {studentFlag.companyName}
                </Link>
              </Button>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-sm bg-gray-50 p-2 rounded">
                {studentFlag.description}
              </p>
            </div>

            <ImageGallery images={studentFlag.screenshots} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
