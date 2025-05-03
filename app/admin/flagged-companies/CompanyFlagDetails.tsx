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
import { CompanyFlag, reportStatusMap } from "@/types/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface CompanyFlagDetailsProps {
  companyFlag: CompanyFlag;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CompanyFlagDetails = ({
  companyFlag,
  isOpen,
  setIsOpen,
}: CompanyFlagDetailsProps) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="mb-2">Flagged Company Details</DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                {new Date(companyFlag.createdAt).toLocaleDateString()}
              </span>
              <Badge
                variant={
                  reportStatusMap(
                    companyFlag.reportStatus
                  ) as BadgeProps["variant"]
                }
              >
                {companyFlag.reportStatus}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Flag Reason</h3>
              {companyFlag.reason}
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-1">Student</h3>
              <Button variant="link" size="sm" className="text-sm p-0" asChild>
                <Link
                  href={`/student/${companyFlag.studentId}`}
                  target="_blank"
                >
                  {companyFlag.studentName}
                </Link>
              </Button>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-1">Description</h3>
              {companyFlag.description}
            </div>

            {companyFlag.screenshots && companyFlag.screenshots.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Screenshots</h3>
                <ImageGallery images={companyFlag.screenshots} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
