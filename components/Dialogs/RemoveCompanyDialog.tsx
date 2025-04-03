"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCompany } from "@/context/CompaniesContext";
import { Company } from "@/types/types";

interface RemoveCompanyDialogProps {
  companyToRemove: Company;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function RemoveCompanyDialog({
  isOpen,
  setIsOpen,
  companyToRemove,
}: RemoveCompanyDialogProps) {
  const { isLoading, removeCompany } = useCompany();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Company</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {companyToRemove.name}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              removeCompany(companyToRemove.id);
              setIsOpen(false);
            }}
          >
            {isLoading ? "Removing..." : "Remove Company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
