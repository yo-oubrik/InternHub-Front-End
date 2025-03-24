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
import { Company } from "@/types/types";

interface RemoveCompanyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  companyToRemove: Company;
}

export function RemoveCompanyDialog({
  isOpen,
  onOpenChange,
  companyToRemove,
}: RemoveCompanyDialogProps) {
  const handleRemove = () => {
    // Implement remove logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Company</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {companyToRemove.name}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleRemove}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
