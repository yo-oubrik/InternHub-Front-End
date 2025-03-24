"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "@/components/ImageGallery";
import { severityMap, flagSeverity } from "@/types/types";

interface CompanyFlagDetailsProps {
  company: {
    name: string;
    email: string;
    reason: string;
    severity: flagSeverity;
    screenshots: string[];
  };
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function CompanyFlagDetails({
  company,
  isOpen,
  setIsOpen,
}: CompanyFlagDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Flag Details</DialogTitle>
          <DialogDescription>
            Details about the flag for {company.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="font-medium text-gray-500 mb-1">Severity</h3>
            <Badge variant={severityMap[company.severity]}>
              {company.severity.charAt(0).toUpperCase() +
                company.severity.slice(1)}
            </Badge>
          </div>

          <div>
            <h3 className="font-medium text-gray-500 mb-1">Reason</h3>
            <p className="text-sm bg-gray-50 p-2 rounded">{company.reason}</p>
          </div>

          <ImageGallery images={company.screenshots} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
