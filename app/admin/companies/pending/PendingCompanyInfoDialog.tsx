"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Company } from "@/types/types";

interface CompanyInformationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company;
}

export function PendingCompanyInfoDialog({
  isOpen,
  onOpenChange,
  company,
}: CompanyInformationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Company Information</DialogTitle>
          <DialogDescription>
            Detailed information about {company.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <p className="mt-1 text-sm text-gray-900">{company.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{company.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(company.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
          {/* Add more fields as necessary */}
        </div>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
