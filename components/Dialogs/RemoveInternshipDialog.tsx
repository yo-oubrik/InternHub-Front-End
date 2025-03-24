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
import { Internship } from "@/types/types";

interface RemoveInternshipDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  internshipToRemove: Internship;
}

export function RemoveInternshipDialog({
  isOpen,
  onOpenChange,
  internshipToRemove,
}: RemoveInternshipDialogProps) {
  const handleRemove = () => {
    // Implement remove logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Internship</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {internshipToRemove.title}? This
            action cannot be undone.
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
